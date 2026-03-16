"use client";

import { useAppSelector } from "@/redux/hooks";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiInfo,
  FiHash,
  FiShield,
  FiActivity,
} from "react-icons/fi";

export default function BiografiUserPage() {
  const { userDetail } = useAppSelector((state) => state.users);

  if (!userDetail) return null;

  const infoGroups = [
    {
      title: "Informasi Pribadi",
      icon: <FiUser className="text-blue-500" />,
      fields: [
        { label: "Nama Lengkap", value: userDetail.username, icon: <FiUser /> },
        {
          label: "Nomor Registrasi",
          value: userDetail.registrationNumber || "---",
          icon: <FiHash />,
        },
        {
          label: "Jenis Kelamin",
          value: userDetail.gender === "M" ? "Laki-laki" : "Perempuan",
          icon: <FiInfo />,
        },
        {
          label: "Bergabung Sejak",
          value: new Date(userDetail.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          icon: <FiCalendar />,
        },
      ],
    },
    {
      title: "Kontak & Akses",
      icon: <FiMail className="text-emerald-500" />,
      fields: [
        { label: "Email", value: userDetail.email, icon: <FiMail /> },
        {
          label: "Nomor Telepon",
          value: userDetail.phone || "---",
          icon: <FiPhone />,
        },
        {
          label: "Status Verifikasi",
          value: userDetail.isVerified ? "Terverifikasi" : "Belum Verifikasi",
          icon: <FiShield />,
        },
        {
          label: "Status Akun",
          value: userDetail.isActive ? "Aktif" : "Nonaktif",
          icon: <FiActivity />,
        },
      ],
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {infoGroups.map((group, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-500/5"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                {group.icon}
              </div>
              <h3 className="text-xl font-black italic uppercase tracking-tight text-gray-800 dark:text-white">
                {group.title}
              </h3>
            </div>

            <div className="space-y-6">
              {group.fields.map((field, fIdx) => (
                <div key={fIdx} className="group">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-gray-400 group-hover:text-blue-500 transition-colors">
                      {field.icon}
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {field.label}
                      </p>
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                        {field.value}
                      </p>
                    </div>
                  </div>
                  {fIdx !== group.fields.length - 1 && (
                    <div className="ml-10 mt-4 border-b border-gray-50 dark:border-gray-800/50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Full Width Section: Alamat */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-500/5">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-orange-500">
            <FiMapPin />
          </div>
          <h3 className="text-xl font-black italic uppercase tracking-tight text-gray-800 dark:text-white">
            Detail Lokasi & Alamat
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Alamat Lengkap
            </p>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-200 leading-relaxed">
              {userDetail.address?.street || "Detail jalan belum diisi"}, ,
              Desa/Kel. {userDetail.address?.village || "-"}, Kec.{" "}
              {userDetail.address?.district || "-"}
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Kota/Kabupaten
              </p>
              <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                {userDetail.address?.city || "-"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Provinsi
              </p>
              <p className="text-sm font-bold text-gray-700 dark:text-gray-200">
                {userDetail.address?.province || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
