
interface StatsScheduleProps {
    icon: React.ReactNode;
    label: string;
    value: number | string;
    sub: string;
    color: string;
}
export default function StatsSchedule({ icon, label, value, sub, color }: StatsScheduleProps) {
    return (
        <div className="bg-white text-center dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
            <div className={`flex items-center gap-2 ${color} mb-3 uppercase font-black text-[9px] italic tracking-widest`}>
                {icon} {label}
            </div>
            <h4 className="text-2xl font-black italic tracking-tighter text-slate-900 dark:text-white">{value}</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase italic mt-1">{sub}</p>
        </div>
    )
}