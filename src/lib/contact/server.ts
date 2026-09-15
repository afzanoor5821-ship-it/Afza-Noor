import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  projectType: z.string().trim().min(1, "Please choose a project type").max(120),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell me a little more").max(1500),
  source: z
    .enum(["Portfolio Contact Form", "AI Portfolio Assistant"])
    .default("Portfolio Contact Form"),
});

export const submitPortfolioContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const destination = process.env.CONTACT_EMAIL ?? "afzanoor344@gmail.com";
    const fromAddress = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    if (!apiKey) {
      throw new Error("Email service is not configured. Please add RESEND_API_KEY.");
    }

    const resend = new Resend(apiKey);
    const sentAt = new Date().toISOString();
    const text = [
      `Visitor Name: ${data.name}`,
      `Visitor Email: ${data.email}`,
      data.company ? `Company: ${data.company}` : "Company: N/A",
      data.projectType ? `Project Type: ${data.projectType}` : "Project Type: N/A",
      data.budget ? `Budget: ${data.budget}` : "Budget: N/A",
      "",
      "Message:",
      data.message,
      "",
      `Date/Time: ${sentAt}`,
      `Source: ${data.source}`,
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #161616;">
        <h2 style="margin: 0 0 16px; font-size: 24px;">New portfolio enquiry</h2>
        <p style="margin: 0 0 12px;"><strong>Visitor Name:</strong> ${data.name}</p>
        <p style="margin: 0 0 12px;"><strong>Visitor Email:</strong> ${data.email}</p>
        <p style="margin: 0 0 12px;"><strong>Company:</strong> ${data.company || "N/A"}</p>
        <p style="margin: 0 0 12px;"><strong>Project Type:</strong> ${data.projectType}</p>
        <p style="margin: 0 0 12px;"><strong>Budget:</strong> ${data.budget || "N/A"}</p>
        <p style="margin: 0 0 12px;"><strong>Date/Time:</strong> ${sentAt}</p>
        <p style="margin: 0 0 12px;"><strong>Source:</strong> ${data.source}</p>
        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e8e3da;">
          <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
          <div style="white-space: pre-wrap;">${data.message}</div>
        </div>
      </div>
    `;

    const response = await resend.emails.send({
      from: fromAddress,
      to: [destination],
      replyTo: data.email,
      subject: `New portfolio enquiry from ${data.name}`,
      text,
      html,
    });

    if (response.error) {
      throw new Error(response.error.message ?? "Unable to send the email.");
    }

    return { ok: true };
  });
