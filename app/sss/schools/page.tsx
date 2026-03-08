"use client";

import { setSelectedSchool } from "@/redux/features/school/slice";
import { fetchSchools } from "@/redux/features/school/thunk";
import { School } from "@/redux/features/school/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import {
  FiSearch,
  FiLayers,
  FiActivity,
  FiGlobe,
  FiCpu,
  FiPlus,
  FiBox,
  FiZap,
  FiUsers,
  FiArrowRight,
  FiSliders,
} from "react-icons/fi";

export default function SchoolDirectory() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { schools, loading } = useAppSelector((state) => state.school);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("All Plans");

  useEffect(() => {
    dispatch(fetchSchools());
  }, [dispatch]);

  const filteredSchools = useMemo(() => {
    return schools.filter((s) => {
      const matchQuery =
        s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.domain?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchPlan = filterPlan === "All Plans" || s.plan === filterPlan;
      return matchQuery && matchPlan;
    });
  }, [searchTerm, filterPlan, schools]);

  const handleGoToDetail = (school: School) => {
    sessionStorage.setItem("schoolId", school.schoolId);
    dispatch(setSelectedSchool(school));
    router.push("/sss/schools/detail");
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 p-4 md:p-12 font-sans selection:bg-indigo-500 selection:text-white">
      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40">
              <FiCpu className="text-white text-2xl animate-pulse" />
            </div>
            <h1 className="text-4xl font-black tracking-[-0.05em] uppercase italic">
              Core<span className="text-indigo-600">Nexus</span>
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.3em] opacity-70">
            Enterprise School Management System • 2026 Edition
          </p>
        </div>

        <button
          type="button"
          title="add"
          onClick={() => router.push("/sss/schools/add")}
          className="group flex items-center gap-4 bg-slate-900 dark:bg-white text-white dark:text-black px-10 py-5 rounded-2xl font-black uppercase italic text-xs transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] active:scale-95"
        >
          <FiPlus className="text-lg" /> Register School
        </button>
      </div>

      {/* --- SEARCH & FILTER --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-10">
        <div className="lg:col-span-8 relative group">
          <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search nexus database..."
            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl py-6 pl-16 pr-6 text-sm font-bold focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="lg:col-span-4 relative">
          {/* Main Toggle Button */}
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl py-6 px-8 text-xs font-black uppercase italic outline-none cursor-pointer focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
          >
            <div className="flex items-center gap-4">
              <FiSliders
                className={`${isFilterOpen ? "text-indigo-500" : "text-slate-400"} transition-colors`}
              />
              <span className="text-slate-400">Plan:</span>
              <span className="text-slate-900 dark:text-white">
                {filterPlan}
              </span>
            </div>
            {/* Arrow Icon Indicator */}
            <div
              className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : "rotate-0"}`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </button>

          {/* Custom Dropdown Menu */}
          {isFilterOpen && (
            <>
              {/* Overlay untuk menutup saat klik di luar */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsFilterOpen(false)}
              />

              <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-[#15181E] border border-slate-200 dark:border-white/10 rounded-4xl shadow-2xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-2">
                  {["All Plans", "Enterprise", "Premium", "Basic"].map(
                    (plan) => (
                      <button
                        key={plan}
                        type="button"
                        onClick={() => {
                          setFilterPlan(plan);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase italic transition-all
                        ${
                          filterPlan === plan
                            ? "bg-indigo-600 text-white"
                            : "text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-indigo-500"
                        }`}
                      >
                        {plan}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* --- DATA ROWS (CUSTOM GRID) --- */}
      <div className="space-y-2">
        {/* --- MINIMALIST HEADER --- */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          <div className="col-span-5">Institutional Identity</div>
          <div className="col-span-3">Network Domain</div>
          <div className="col-span-2 text-center">License Plan</div>
          <div className="col-span-2 text-right">System Access</div>
        </div>

        {/* --- CLEAN DATA ROWS --- */}
        {filteredSchools.map((school) => (
          <div
            key={school.schoolId}
            className="group relative bg-white dark:bg-[#1c202a] border border-slate-100 dark:border-white/5 rounded-2xl lg:rounded-full p-4 lg:px-8 lg:py-3 transition-all duration-200 hover:bg-slate-50 dark:hover:bg-white/2 hover:shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* SECTION 1: IDENTITY (Fokus pada Legibilitas) */}
              <div className="col-span-1 lg:col-span-5 flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
                  <img
                    src={school.avatar}
                    alt=""
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm tracking-tight group-hover:text-indigo-600 transition-colors">
                    {school.name}
                  </h3>
                  <span className="text-[10px] font-medium text-slate-400 font-mono tracking-tighter uppercase">
                    NISP: {school.nisp}
                  </span>
                </div>
              </div>

              {/* SECTION 2: NETWORK (Lebih Minimalis) */}
              <div className="col-span-1 lg:col-span-3 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <FiGlobe size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {school.domain}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    {school.address?.province || "Main Cluster"}
                  </span>
                </div>
              </div>

              {/* SECTION 3: PLAN (Pill Style) */}
              <div className="col-span-1 lg:col-span-2 flex items-center lg:justify-center">
                <span
                  className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
                  ${
                    school.plan === "Enterprise"
                      ? "bg-indigo-500 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                      : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-transparent"
                  }`}
                >
                  {school.plan}
                </span>
              </div>

              {/* SECTION 4: ACTIONS (Sleek Button) */}
              <div className="col-span-1 lg:col-span-2 text-right">
                <button
                  type="button"
                  onClick={() => handleGoToDetail(school)}
                  className="w-full lg:w-10 lg:h-10 inline-flex items-center justify-center bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 rounded-xl lg:rounded-full transition-all hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-black group/btn"
                >
                  <span className="lg:hidden text-[10px] font-black uppercase tracking-[0.2em] mr-2">
                    Open Dashboard
                  </span>
                  <FiArrowRight className="text-lg group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
