"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { HiOutlineSparkles, HiOutlineHome } from "react-icons/hi";
import { TbListDetails } from "react-icons/tb";
import { Subject } from "@/redux/features/school_subject/types";

interface SubjectListProps {
  searchTerm: string;
}

const SubjectList = ({ searchTerm }: SubjectListProps) => {
  const { subjects, loading } = useAppSelector((state) => state.schoolSubject);

  const filteredSubjects = subjects.filter((s) => {
    const searchStr = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(searchStr) ||
      s.code.toLowerCase().includes(searchStr) ||
      s.classroomConfig?.classroom?.name.toLowerCase().includes(searchStr)
    );
  });

  const groupedByConfig = filteredSubjects.reduce(
    (acc, subject) => {
      const configId = subject.classroomConfig?.classroomConfigId || "global";
      if (!acc[configId]) acc[configId] = [];
      acc[configId].push(subject);
      return acc;
    },
    {} as Record<string, Subject[]>,
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      {Object.entries(groupedByConfig).map(([configId, list]) => (
        <div key={configId} className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-2xl shadow-sm">
              <HiOutlineHome size={18} />
              <span className="text-sm font-black uppercase tracking-wider">
                {list[0].classroomConfig?.classroom?.name ||
                  "Mata Pelajaran Umum"}
              </span>
            </div>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((subject) => (
              <div
                key={subject.subjectId}
                className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                      {subject.code}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                      {subject.name}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-500 italic line-clamp-2 mb-6">
                    "
                    {subject.description ||
                      "Digital footprint belum tersedia..."}
                    "
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-1 text-purple-600">
                      <HiOutlineSparkles size={14} />
                      <span className="text-[10px] font-bold uppercase">
                        AI Analyzed
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        sessionStorage.setItem(
                          "schoolSubjectId",
                          subject.subjectId,
                        );
                        sessionStorage.setItem("classroomConfigId", configId);
                        window.location.href = "/sf/academic/subject/detail";
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white rounded-xl text-slate-600 dark:text-slate-300 text-xs font-bold transition-all"
                    >
                      <TbListDetails size={16} />
                      Detail Footprint
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubjectList;
