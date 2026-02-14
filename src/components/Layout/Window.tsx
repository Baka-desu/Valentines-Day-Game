import { type ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

interface WindowProps {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  width?: string;
  height?: string;
  icon?: string;
}

export default function Window({ title, children, onClose, width = '600px', height = '500px', icon = '💕' }: WindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: isMinimized ? 0.01 : 1, opacity: isMinimized ? 0 : 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="flex flex-col bg-[#C0C0C0] win98-border shadow-2xl"
      style={{ width, height, maxWidth: '95vw', maxHeight: '85vh' }}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-1 py-0.5 bg-gradient-to-r from-[#000080] to-[#1084d0] select-none shrink-0">
        <div className="flex items-center gap-1">
          <span className="text-sm">{icon}</span>
          <span className="text-white text-sm font-bold truncate" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
            {title}
          </span>
        </div>
        <div className="flex gap-0.5">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-4 h-4 bg-[#C0C0C0] win98-border text-[10px] leading-none flex items-center justify-center hover:brightness-110 active:win98-border-inset"
          >
            _
          </button>
          <button
            className="w-4 h-4 bg-[#C0C0C0] win98-border text-[10px] leading-none flex items-center justify-center hover:brightness-110 active:win98-border-inset"
          >
            □
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="w-4 h-4 bg-[#C0C0C0] win98-border text-[10px] leading-none flex items-center justify-center hover:brightness-110 active:win98-border-inset"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Menu Bar */}
      <div className="flex gap-4 px-2 py-0.5 text-[11px] bg-[#C0C0C0] border-b border-[#808080]" style={{ fontFamily: 'Tahoma, sans-serif' }}>
        <span className="hover:underline cursor-pointer">File</span>
        <span className="hover:underline cursor-pointer">Edit</span>
        <span className="hover:underline cursor-pointer">View</span>
        <span className="hover:underline cursor-pointer">Help</span>
      </div>

      {/* Content */}
      <div className="flex-1 m-0.5 p-3 bg-white win98-border-inset overflow-auto">
        {children}
      </div>
    </motion.div>
  );
}
