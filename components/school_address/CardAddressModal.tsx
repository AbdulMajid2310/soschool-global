"use client";

import { useSchoolId } from "@/hooks/useSchoolId";
import { getSchoolAddressBySchoolId } from "@/redux/features/school-address/thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaMapMarkedAlt, FaPlus } from "react-icons/fa";

export default function CardAddressModule() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { address } = useAppSelector((state) => state.schoolAddress);
  const schoolId = useSchoolId();

  useEffect(() => {
    if (schoolId) {
      dispatch(getSchoolAddressBySchoolId(schoolId));
    }
  }, [dispatch, schoolId]);

  return (
    <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-6 group">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-[0.2em]">
            Alamat Fisik & Lokasi
          </p>
          <div className="h-1 w-8 bg-blue-500 rounded-full transition-all group-hover:w-12" />
        </div>
        {address && (
          <button
            type="button"
            onClick={() => router.push("address/update")}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 active:scale-95 shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <span>Update Data</span>
          </button>
        )}
      </div>

      {address ? (
        <div className="space-y-4">
          <div className="relative p-6 bg-slate-50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-gray-700">
            <p className="text-slate-600 dark:text-slate-300 text-md leading-relaxed italic">
              &quot;{address.street}, {address.village}, {address.district},{" "}
              {address.city}, {address.province} - {address.postalCode}&quot;
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-amber-50/50 dark:bg-amber-900/10 rounded-3xl border border-dashed border-amber-200 dark:border-amber-900/30 text-center">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-2xl mb-4">
            <FaMapMarkedAlt className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
            Alamat Belum Dikonfigurasi
          </h4>
          <p className="text-xs text-slate-500 dark:text-gray-400 mb-6 max-w-70">
            Instansi ini belum memiliki data lokasi fisik yang terdaftar di
            sistem SoSchool.
          </p>

          <button
            onClick={() => router.push("address/add")}
            className="flex items-center gap-2 bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            <FaPlus className="w-3 h-3" />
            Lengkapi Alamat Sekarang
          </button>
        </div>
      )}
    </div>
  );
}
