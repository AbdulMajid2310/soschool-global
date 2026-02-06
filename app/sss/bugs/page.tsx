"use client";
import React from 'react';
import { BsBugFill } from 'react-icons/bs';
import {  FiTerminal, FiLayers, FiAlertTriangle, FiCode } from 'react-icons/fi';

const BugTrackerPage = () => {
  return (
    <div className="p-6 md:p-10 bg-[#050810] min-h-screen text-slate-200">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-black italic uppercase text-white">Dev <span className="text-rose-500">Bug Tracker</span></h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Technical Debt & System Glitches</p>
        </div>
        <button className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase italic transition-all flex items-center gap-2">
          <BsBugFill /> New Bug Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-4xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/2 border-b border-white/5">
              <tr className="text-[9px] font-black text-slate-500 uppercase italic">
                <th className="p-6">Bug Detail</th>
                <th className="p-6">Severity</th>
                <th className="p-6">Module</th>
                <th className="p-6">Environment</th>
                <th className="p-6">Fix Version</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-white/1 group">
                  <td className="p-6">
                    <p className="text-[11px] font-black text-white uppercase italic">Stack Trace Error on Payout</p>
                    <p className="text-[9px] text-rose-500 mt-1 uppercase font-bold">Escalated from TKT-8821</p>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[8px] font-black rounded-full uppercase">Blocker</span>
                  </td>
                  <td className="p-6">
                    <span className="flex items-center gap-2 text-[10px] text-slate-400 font-bold"><FiCode /> Financial_v2</span>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] text-slate-400 font-bold italic">iOS 17.2 / Safari</span>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] font-mono text-emerald-500">v2.4.1-rc</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BugTrackerPage;