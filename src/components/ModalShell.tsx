import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

interface ModalShellProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}

export function ModalShell({ open, title, onClose, children, wide = false }: ModalShellProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-end bg-black/70 p-0 backdrop-blur-md sm:place-items-center sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`modal-shell max-h-[88dvh] w-full overflow-hidden rounded-t-[2rem] border border-white/10 bg-[#111] shadow-2xl sm:rounded-[2rem] ${wide ? 'sm:max-w-4xl' : 'sm:max-w-xl'}`}
            initial={{ y: 48, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 32, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          >
            <header className="modal-shell-header sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#111]/95 px-5 py-4 backdrop-blur-xl">
              <h2 className="modal-shell-title text-lg font-black tracking-tight text-white">{title}</h2>
              <button className="icon-button" type="button" onClick={onClose} aria-label={`Close ${title}`}>
                <X size={20} />
              </button>
            </header>
            <div className="modal-shell-body max-h-[calc(88dvh-72px)] overflow-y-auto p-5">{children}</div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
