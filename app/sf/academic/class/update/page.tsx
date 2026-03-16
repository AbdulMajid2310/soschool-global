import UpdateClassroomConfigModal from "@/components/classroom-config/update/page";
import ButtonBackUI from "@/components/ui/button/ButtonBack";

export default function UpdateClaassroomCOnfig() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center gap-5 mb-10">
        <ButtonBackUI />
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">
            Update Konfigurasi
          </h1>
          <p className="text-slate-500 font-medium text-sm italic">
            Edit wali kelas, lokasi, dan daftar siswa aktif
          </p>
        </div>
      </div>
      <UpdateClassroomConfigModal />
    </div>
  );
}
