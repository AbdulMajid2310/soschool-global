"use client";

import { usePathname, useRouter } from "next/navigation";

const RouteTabSiswa = [
  { fitur: "Biodata", url: "/bio" },
  { fitur: "Akademik", url: "/akademik" },      // Kelas, Jurusan, NIS/NISN
  { fitur: "Orang Tua", url: "/ortu" },         // Kontak darurat & data wali
  { fitur: "Dokumen", url: "/dokumen" },        // Scan KK, Akta, Ijazah
  { fitur: "Bantuan", url: "/bantuan" },        // KIP, PIP, Beasiswa
  { fitur: "Kesehatan", url: "/kesehatan" },    // Riwayat medis & Golongan darah
  { fitur: "Prestasi", url: "/prestasi" },
];

export default function TabsStudentDetail() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      
      

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-3 overflow-x-auto">
        {RouteTabSiswa.map((item, index) => {
          const fullPath = `/staff/akademik/siswa/detail${item.url}`;
          const isActive = pathname === fullPath;

          return (
            <button
              key={index}
              onClick={() => router.push(fullPath)}
              className={
                `px-4 py-2 text-sm font-medium rounded-t-md transition whitespace-nowrap
                isActive
                  ? "bg-white dark:bg-gray-800 border border-b-0 border-gray-200 dark:border-gray-700 text-blue-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-600"
              )`}
            >
              {item.fitur}
            </button>
          );
        })}
      </div>

     
    </div>
  );
}
