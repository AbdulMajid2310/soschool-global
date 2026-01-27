// pages/KepegawaianPage.tsx
import React from "react";
import { FaIdBadge, FaCalendarAlt, FaMoneyCheckAlt, FaFileInvoice, FaBriefcase, FaClipboardList, FaRegCalendarCheck, FaUserGraduate } from "react-icons/fa";

const guru_employment = {
  NIP: "4546575116787",
  NIY: "GY123456",
  NUPTK: "1234567890123456",
  Status_Kepegawaian: "PNS",
  Pangkat_Golongan: "III/b",
  TMT_Pengangkatan: "2010-08-15",
  NPWP: "12.345.678.9-012.345",
  No_BPJS_Kesehatan: "1234567890123",
  No_BPJS_Ketenagakerjaan: "9876543210123",
};

const calculateMasaKerja = (tmt: string) => {
  const tmtDate = new Date(tmt);
  const now = new Date();
  let years = now.getFullYear() - tmtDate.getFullYear();
  const monthDiff = now.getMonth() - tmtDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < tmtDate.getDate())) years--;
  return years;
};

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "PNS": return "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100";
    case "PPPK": return "bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100";
    case "GTY": case "GTT": return "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100";
    case "Guru Honor": return "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100";
    default: return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100";
  }
};

const KepegawaianPage: React.FC = () => {
  const masaKerja = calculateMasaKerja(guru_employment.TMT_Pengangkatan);

  return (
    <div className="min-h-screen flex justify-center ">
      <div className="w-full ">

<div className="px-6 py-4 ">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FaUserGraduate /> Kepegawaian
                    </h1>
                    <p className="text-green-100 text-sm mt-1">
                       Informasi identitas, status kepegawaian, dan legalitas
                    </p>
                </div>
        <div className="space-y-8">

          {/* Identitas */}
          <Section title="Identitas Pegawai">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard icon={<FaIdBadge />} label="NIP / NIY" value={`${guru_employment.NIP} / ${guru_employment.NIY}`} />
              <InfoCard icon={<FaClipboardList />} label="NUPTK" value={guru_employment.NUPTK} />
            </div>
          </Section>

          {/* Kepegawaian */}
          <Section title="Kepegawaian">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard 
                icon={<FaBriefcase />} 
                label="Status Kepegawaian" 
                value={guru_employment.Status_Kepegawaian} 
                badge={getStatusBadgeColor(guru_employment.Status_Kepegawaian)}
              />
              <InfoCard 
                icon={<FaFileInvoice />} 
                label="Pangkat / Golongan" 
                value={guru_employment.Pangkat_Golongan} 
                badge="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              />
              <InfoCard icon={<FaCalendarAlt />} label="TMT Pengangkatan" value={guru_employment.TMT_Pengangkatan} />
              <InfoCard icon={<FaRegCalendarCheck />} label="Masa Kerja (Tahun)" value={`${masaKerja} Tahun`} />
            </div>
          </Section>

          {/* Legal */}
          <Section title="Legal / Pajak & Asuransi">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard icon={<FaMoneyCheckAlt />} label="NPWP" value={guru_employment.NPWP} />
              <InfoCard icon={<FaIdBadge />} label="No. BPJS Kesehatan" value={guru_employment.No_BPJS_Kesehatan} />
              <InfoCard icon={<FaIdBadge />} label="No. BPJS Ketenagakerjaan" value={guru_employment.No_BPJS_Ketenagakerjaan} />
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
};

// Section reusable
const Section: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
  <section>
    <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">{title}</h2>
    {children}
  </section>
);

// InfoCard reusable
const InfoCard: React.FC<{icon: React.ReactNode, label: string, value: string, badge?: string}> = ({ icon, label, value, badge }) => {
  return (
    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
      <div className="text-2xl text-blue-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        {badge ? (
          <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${badge}`}>{value}</span>
        ) : (
          <p className="font-medium">{value}</p>
        )}
      </div>
    </div>
  );
};

export default KepegawaianPage;
