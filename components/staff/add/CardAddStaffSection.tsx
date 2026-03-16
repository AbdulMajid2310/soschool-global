import React from "react";
import {
  HiOutlineCheck,
  HiOutlinePlus,
  HiOutlineBriefcase,
  HiOutlineChevronDown,
  HiOutlineFingerPrint,
  HiOutlineIdentification,
} from "react-icons/hi";

interface UserData {
  userId: string;
  username: string;
  avatar?: string;
  registrationNumber?: string;
}

interface StaffForm {
  position: string;
  nip: string;
  employeeId: string;
}

interface CardAddStaffSectionProps {
  user: UserData;
  isSelected: boolean;
  isOpen: boolean;
  data: StaffForm;
  toggleUser: (userId: string) => void;
  setActivePopup: (userId: string | null) => void;
  updateData: (userId: string, field: keyof StaffForm, value: string) => void;
}

const CardAddStaffSection: React.FC<CardAddStaffSectionProps> = ({
  user,
  isSelected,
  isOpen,
  data,
  toggleUser,
  setActivePopup,
  updateData,
}) => {
  const avatarUrl =
    user.avatar ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`;

  return (
    <div className="relative">
      <div
        className={`flex flex-col items-center p-5 transition-all rounded-[2.5rem] border-2 ${
          isSelected
            ? "bg-white dark:bg-slate-900 border-emerald-500 shadow-xl"
            : "bg-slate-50/50 dark:bg-slate-800/20 border-transparent"
        }`}
      >
        <div className="absolute right-3 top-3">
          <button
            onClick={() => toggleUser(user.userId)}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
              isSelected
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white dark:bg-slate-800 text-slate-300 border hover:border-emerald-300"
            }`}
          >
            {isSelected ? (
              <HiOutlineCheck size={20} strokeWidth={3} />
            ) : (
              <HiOutlinePlus size={18} />
            )}
          </button>
        </div>

        <img
          src={avatarUrl}
          className="w-20 h-20 rounded-3xl object-cover mb-4 border-2 border-white shadow-sm"
          alt={user.username}
        />

        <div className="text-center w-full">
          <h4 className="text-sm font-black uppercase truncate px-2">
            {user.username}
          </h4>
          <p className="text-[9px] font-bold text-slate-400 mb-4 tracking-tighter">
            REG : {user.registrationNumber || "-"}
          </p>

          {isSelected && (
            <button
              onClick={() => setActivePopup(isOpen ? null : user.userId)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-[9px] font-black uppercase text-emerald-600 transition-colors hover:bg-emerald-100"
            >
              <HiOutlineBriefcase size={14} />
              {data?.position ? data.position : `Set Jabatan`}
              <HiOutlineChevronDown
                size={12}
                className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardAddStaffSection;
