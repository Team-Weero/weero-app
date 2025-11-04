import { useEffect } from "react";

export type ModalType = "error" | "confirm" | "info";

interface ModalProps {
  isOpen: boolean;
  type: ModalType;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  isOpen,
  type,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "확인",
  cancelText = "취소",
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const showCancel = type === "confirm" && onCancel;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && onCancel) {
          onCancel();
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-[270px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Content */}
        <div className="px-4 py-5 text-center">
          {/* Title */}
          <h3 className="text-[17px] font-semibold text-gray-900 mb-2">
            {title}
          </h3>

          {/* Message */}
          <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        </div>

        {/* Divider */}
        <div className="h-[0.5px] bg-gray-300" />

        {/* Actions */}
        <div className={`flex ${showCancel ? "divide-x" : ""} divide-gray-300`}>
          {showCancel && (
            <button
              onClick={onCancel}
              className="flex-1 py-3 text-[17px] font-normal text-blue-500 active:bg-gray-100 transition-colors"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={() => {
              onConfirm?.();
              if (type !== "confirm") onCancel?.();
            }}
            className={`flex-1 py-3 text-[17px] ${
              type === "error"
                ? "font-semibold text-red-500"
                : "font-semibold text-blue-500"
            } active:bg-gray-100 transition-colors`}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s cubic-bezier(0.36, 0.66, 0.04, 1);
        }
      `}</style>
    </div>
  );
}
