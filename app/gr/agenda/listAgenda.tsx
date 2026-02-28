import { fetchSchedulesByTeacher } from "@/redux/features/school_schedule/thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";


const AGENDA_CLASSES = [
    {
        id: 'C1', name: '10-IPA-1', subject: 'Informatika',
        session: 'Sesi 1-2', time: '08:00 - 09:30', room: 'Lab Komputer 1',
        topic: 'Struktur Data Dasar', progress: 100, status: 'Completed'
    },
    {
        id: 'C2', name: '11-RPL-2', subject: 'Basis Data',
        session: 'Sesi 4-5', time: '10:30 - 12:00', room: 'Ruang Teori 4',
        topic: 'Relational Database', progress: 45, status: 'Ongoing'
    },
    {
        id: 'C3', name: '12-RPL-1', subject: 'Web Dev',
        session: 'Sesi 7-8', time: '13:30 - 15:00', room: 'Lab Komputer 3',
        topic: 'React Hooks & State', progress: 0, status: 'Upcoming'
    },
];
export default function AgendaList() {

    const dispatch = useAppDispatch();
    const { currentTeacherProfile } = useAppSelector((state) => state.teacher);
    const teacherId = currentTeacherProfile?.teacherId
    const { schedules } = useAppSelector((state) => state.schoolSchedule);
    const router = useRouter()


    useEffect(() => {
        if (teacherId) {
            dispatch(fetchSchedulesByTeacher(teacherId));
        }
    }, [teacherId, dispatch]);

    const handleDetail = (subjectId: string) => {
        sessionStorage.setItem('schoolSubjectId', subjectId);
        router.push('/guru/agenda/detail');
    }
    return (
        <div className="">



            <div className="space-y-4 relative before:absolute before:left-8 before:top-0 before:bottom-0 before:w-px before:bg-slate-100 dark:before:bg-white/5">
                {schedules.map((item, index) => (
                    <div key={index} className="relative pl-16 group">
                        {/* Timeline Dot */}
                        <div className={`absolute left-7.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-[#0a0f1d] z-10 transition-all duration-500 group-hover:scale-150
                          ${item.subject.code === 'Completed' ? 'bg-emerald-500' : item.subject.code === 'Ongoing' ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'}`}
                        />

                        <div className="bg-white dark:bg-[#0a0f1d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm group-hover:border-amber-500/50 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">

                                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{item.classroom}</span>
                                    </div>
                                    <h4 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">{item.classroom} <span className="text-slate-300 mx-2">/</span> {item.subject.name}</h4>
                                    {/* <p className="text-[10px] font-medium text-slate-500 italic">Topik: {item.topic}</p> */}
                                </div>

                                <div className="flex items-center gap-6">
                                    {/* <div className="text-right">
                                        <p className="text-[8px] font-black text-slate-400 uppercase italic">Progress Materi</p>
                                        <p className="text-sm font-black text-slate-900 dark:text-white italic">{item.progress}%</p>
                                    </div> */}
                                    <button onClick={() => handleDetail(item.subject.subjectId)} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-slate-400 group-hover:bg-amber-500 group-hover:text-white transition-all">
                                        <FiArrowRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>




    )
}