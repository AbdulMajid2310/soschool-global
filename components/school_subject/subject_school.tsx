"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { fetchSubjects } from "@/redux/features/school_subject/thunks";
import { fetchClassrooms } from "@/redux/features/classroom/thunk";
import { HiOutlineSearch } from "react-icons/hi";
import SubjectList from "./subject_list_school";
import { useSchoolId } from "@/hooks/useSchoolId";
import ButtonAddData from "../ui/button/ButtonAddData";
import { BiAddToQueue } from "react-icons/bi";
import { useRouter } from "next/navigation";

const SubjectPage = () => {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (schoolId) {
      dispatch(fetchClassrooms(schoolId));
      dispatch(fetchSubjects(schoolId));
    }
  }, [dispatch, schoolId]);

  return (
    <div className="min-h-screen p-4 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight italic">
              So<span className="text-blue-600">School</span> Subject
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Kelola kurikulum cerdas berbasis AI per kelas.
            </p>
          </div>
          <ButtonAddData
            label="Tambah Mapel"
            icon={BiAddToQueue}
            onClick={() => router.push("subject/add-subject")}
          />
        </div>

        <div className="relative max-w-md">
          <HiOutlineSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Cari mapel, kode, atau kelas..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <SubjectList searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default SubjectPage;
