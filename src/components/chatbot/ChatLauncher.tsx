import { motion } from "framer-motion";
import { MessageCircle, Sparkles, X } from "lucide-react";

interface Props {
  open: boolean;
  onClick: () => void;
}

export function ChatLauncher({ open, onClick }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      className="group relative flex h-[60px] w-[60px] items-center justify-center rounded-full text-white shadow-[0_10px_40px_-10px_rgba(37,99,235,0.55)] backdrop-blur-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{
        background:
          "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 22, delay: 0.6 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-70"
        style={{
          background:
            "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
          filter: "blur(14px)",
          zIndex: -1,
        }}
      />
      {!open && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full border border-white/40"
          animate={{ scale: [1, 1.35, 1.6], opacity: [0.55, 0.15, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <motion.div
        key={open ? "close" : "open"}
        initial={{ rotate: -45, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="relative"
      >
        {open ? (
          <X size={22} strokeWidth={2.2} />
        ) : (
          <div className="relative">
            <MessageCircle size={24} strokeWidth={2} />
            <Sparkles
              size={11}
              strokeWidth={2.4}
              className="absolute -right-1 -top-1 text-white drop-shadow"
            />
          </div>
        )}
      </motion.div>
    </motion.button>
  );
}
