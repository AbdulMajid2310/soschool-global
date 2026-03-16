"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiMoreVertical,
  FiCheckCircle,
  FiShield,
  FiMail,
  FiPhone,
  FiHash,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserById } from "@/redux/features/user/thunk";
import ButtonBackUI from "@/components/ui/button/ButtonBack";

export default function HeaderProfileAdministration() {
  const dispatch = useAppDispatch();
  const [imageError, setImageError] = useState(false);
  const userId = sessionStorage.getItem("userId");

  const { userDetail } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [dispatch, userId]);

  const handleImageError = () => setImageError(true);

  if (!userDetail) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-indigo-200 dark:bg-indigo-900/50 rounded-full"></div>
          <p className="text-gray-400 font-medium">Memuat data profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full transition-all duration-500">
      <div className="flex justify-between items-center mb-6">
        <ButtonBackUI />
        <button
          type="button"
          title="option"
          className="p-2.5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-500 hover:text-indigo-600 shadow-sm transition-all active:scale-95"
        >
          <FiMoreVertical size={20} />
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-indigo-500/5 overflow-hidden border border-gray-100 dark:border-gray-800">
        {/* Banner Area */}
        <div className="h-44 md:h-56 relative overflow-hidden bg-linear-to-br from-indigo-600 via-blue-600 to-violet-700">
          <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

          {/* Decorative shapes */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl"></div>

          <div className="absolute top-6 right-8">
            <div
              className={`px-4 py-1.5 rounded-full backdrop-blur-md border flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                userDetail.isActive
                  ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-400"
                  : "bg-rose-500/10 border-rose-400/20 text-rose-400"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full animate-pulse ${userDetail.isActive ? "bg-emerald-400" : "bg-rose-400"}`}
              />
              {userDetail.isActive ? "Active Status" : "Inactive"}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-6 md:px-10 pb-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-20 md:-mt-24 relative z-10">
            {/* Avatar Container */}
            <div className="relative group">
              <div className="p-1.5 bg-white dark:bg-gray-900 rounded-4xl shadow-2xl">
                {imageError || !userDetail.avatar ? (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-[1.7rem] bg-linear-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 flex items-center justify-center border border-indigo-100 dark:border-gray-700">
                    <span className="text-5xl font-black text-indigo-300 dark:text-indigo-800">
                      {userDetail.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <img
                    src={userDetail.avatar}
                    alt={userDetail.username}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-[1.7rem] object-cover border border-gray-100 dark:border-gray-700 group-hover:scale-[1.02] transition-transform duration-500"
                    onError={handleImageError}
                  />
                )}
              </div>

              {userDetail.isVerified && (
                <div
                  className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-2xl border-4 border-white dark:border-gray-900 shadow-xl"
                  title="Verified Account"
                >
                  <FiShield size={18} />
                </div>
              )}
            </div>

            {/* User Text Info */}
            <div className="flex-1 text-center md:text-left pt-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                <h2 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white uppercase italic tracking-tight">
                  {userDetail.username}
                </h2>
                {userDetail.isApproved && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-tighter rounded-lg border border-blue-500/20 w-fit mx-auto md:mx-0">
                    <FiCheckCircle /> Approved Member
                  </div>
                )}
              </div>

              {/* Badges/Info Row */}
              <div className="flex flex-wrap gap-4 md:gap-6 text-gray-500 dark:text-gray-400 items-center justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-800">
                  <FiHash className="text-indigo-500" />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    {userDetail.registrationNumber || "NO-REG"}
                  </span>
                </div>

                <div className="flex items-center gap-2 group cursor-pointer">
                  <FiMail className="group-hover:text-indigo-500 transition-colors" />
                  <span className="text-sm font-medium group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    {userDetail.email}
                  </span>
                </div>

                <div className="flex items-center gap-2 group cursor-pointer">
                  <FiPhone className="group-hover:text-indigo-500 transition-colors" />
                  <span className="text-sm font-medium group-hover:text-gray-700 dark:group-hover:text-gray-200">
                    {userDetail.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
