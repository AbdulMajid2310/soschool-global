'use client';

interface Role {
  userRoleId: string;
  name: string;
  url: string;
}

interface AccessDetail {
  userAccessId: string;
  role: Role;
}

interface SchoolAccess {
  schoolId: string;
  schoolName: string;
  accessDetails: AccessDetail[];
}

interface RoleSelectorProps {
  availableAccess: SchoolAccess[];
  onSelectRole: (userAccessId: string) => void;
  onBack: () => void;
  loading: boolean;
}

export default function RoleSelector({ availableAccess, onSelectRole, onBack, loading }: RoleSelectorProps) {
  return (
    <div className="mt-8 space-y-6 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
      {availableAccess.map((school) => (
        <div key={school.schoolId} className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
            <span className="text-[10px] font-black text-slate-400 dark:text-white uppercase tracking-widest text-center px-2">
              {school.schoolName}
            </span>
            <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
          </div>

          <div className="grid grid-cols-1 gap-2">
            {school.accessDetails.map((detail) => (
              <button
                key={detail.userAccessId}
                onClick={() => onSelectRole(detail.userAccessId)}
                disabled={loading}
                className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 rounded-2xl transition-all cursor-pointer text-left disabled:opacity-50"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 capitalize">
                    {detail.role.name}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-white">
                    Klik untuk masuk sebagai {detail.role.name}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <span className="text-lg">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={onBack}
        className="w-full py-3 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
      >
        ← Kembali ke Login
      </button>
    </div>
  );
}