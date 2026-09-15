import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatLauncher } from "./ChatLauncher";
import { ChatWindow, type ChatWindowHandle } from "./ChatWindow";
import { OPEN_ASSISTANT_EVENT, type OpenAssistantDetail } from "@/lib/openAssistant";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const windowRef = useRef<ChatWindowHandle>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<OpenAssistantDetail>).detail ?? {};
      setOpen(true);
      // Wait for the ChatWindow to mount before focusing / sending.
      requestAnimationFrame(() => {
        setTimeout(() => {
          windowRef.current?.focusInput();
          if (detail.prompt) windowRef.current?.sendPrompt(detail.prompt);
        }, 60);
      });
    };
    window.addEventListener(OPEN_ASSISTANT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_ASSISTANT_EVENT, onOpen);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <ChatWindow
            key="window"
            ref={windowRef}
            onClose={() => setOpen(false)}
            onMinimize={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      <div className="pointer-events-auto">
        <ChatLauncher open={open} onClick={() => setOpen((v) => !v)} />
      </div>
    </div>
  );
}
