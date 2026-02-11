import toast from 'react-hot-toast';
import { HiOutlineTrash, HiOutlineExclamationTriangle } from "react-icons/hi2";

interface ConfirmToastProps {
  title: string;
  message: string;
  onConfirm: () => Promise<void>;
  confirmText?: string;
  variant?: 'danger' | 'warning';
}

export const confirmActionToast = ({
  title,
  message,
  onConfirm,
  confirmText = 'Ya, Hapus',
  variant = 'danger'
}: ConfirmToastProps) => {
  toast((t) => (
    <div className="flex  text-gray-700 flex-col gap-4 p-1">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${variant === 'danger'
          ? 'bg-rose-100 dark:bg-rose-900 text-rose-600'
          : 'bg-amber-100 dark:bg-amber-900 text-amber-600'
          }`}>
          {variant === 'danger' ? <HiOutlineTrash size={20} /> : <HiOutlineExclamationTriangle size={20} />}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800 ">{title}</p>
          <p className="text-[11px] text-slate-700">{message}</p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
        >
          Batal
        </button>

        <button
          onClick={async () => {
            toast.dismiss(t.id);
            const loadingToast = toast.loading('Sedang memproses...');
            try {
              await onConfirm();
              // Notifikasi sukses dihandle di dalam onConfirm atau setelah unwrap
              toast.dismiss(loadingToast);
            } catch (err: any) {
              const errorMessage = typeof err === 'string' ? err : (err?.message || 'Gagal memproses data');
              toast.error(errorMessage, { id: loadingToast });
            }
          }}
          className={`px-4 py-2 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg cursor-pointer active:scale-95 ${variant === 'danger'
            ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200/50'
            : 'bg-amber-600 hover:bg-amber-700 shadow-amber-200/50'
            }`}
        >
          {confirmText}
        </button>
      </div>
    </div>
  ), {
    duration: 6000,
    position: 'top-center',
    style: {
      minWidth: '350px',
      borderRadius: '24px',
      padding: '16px',
      background: '#ffffff',
    }
  });
};