// pages/BiodataPage.tsx
import React from "react";
import { FaPhone, FaEnvelope, FaBirthdayCake, FaMapMarkerAlt, FaVenusMars, FaUser, FaIdCard, FaCross } from "react-icons/fa";

const data = {
    nip: "4546575116787",
    NIK: "3201123456789012",
    Tempat_Lahir: "Jakarta",
    Tanggal_Lahir: "1980-05-12",
    Jenis_Kelamin: "L",
    Agama: "Islam",
    Golongan_Darah: "O",
    Status_Perkawinan: "Kawin",
    Alamat: {
        Jalan: "Jl. Merdeka No. 45",
        desa: "kampung rambutan",
        Kecamatan: "Gambir",
        Kota: "Jakarta Pusat",
        Provinsi: "DKI Jakarta",
        Kode_Pos: "10110",
    },
    Kontak: {
        Telepon: "+62 812 3456 7890",
        Email: "budi.santoso@example.com",
    },
};

const BiodataPage: React.FC = () => {
    return (
        <div className="min-h-screen   ">

            <div className="px-6 py-4 ">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FaUser /> Biodata 
                </h1>
                <p className="text-green-100 text-sm mt-1">
                    Ringkasan identitas, alamat, dan kontak 
                </p>
            </div>

            {/* Konten Utama */}
            <div className="p-6 md:p-8 w-full  text-gray-900 dark:text-gray-100">

                {/* Informasi Pribadi */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">Informasi Pribadi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <FaIdCard className="text-blue-500 text-xl" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">NIK</p>
                                <p className="font-medium">{data.NIK}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaBirthdayCake className="text-blue-500 text-xl" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Tempat, Tanggal Lahir</p>
                                <p className="font-medium">{data.Tempat_Lahir}, {data.Tanggal_Lahir}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaVenusMars className="text-blue-500 text-xl" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Jenis Kelamin</p>
                                <p className="font-medium">{data.Jenis_Kelamin === "L" ? "Laki-laki" : "Perempuan"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FaCross className="text-blue-500 text-xl" />
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Agama</p>
                                <p className="font-medium">{data.Agama}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Golongan Darah</p>
                            <span className="inline-block bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 text-xs font-semibold px-2.5 py-0.5 rounded">
                                {data.Golongan_Darah}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Status Perkawinan</p>
                            <span className="inline-block bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-xs font-semibold px-2.5 py-0.5 rounded">
                                {data.Status_Perkawinan}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Alamat */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">Alamat</h2>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex items-start gap-3">
                        <FaMapMarkerAlt className="text-red-500 text-xl mt-1" />
                        <p>
                            {data.Alamat.Jalan}, {data.Alamat.desa}, Kec. {data.Alamat.Kecamatan}, {data.Alamat.Kota}, {data.Alamat.Provinsi} - {data.Alamat.Kode_Pos}
                        </p>
                    </div>
                </section>

                {/* Kontak */}
                <section className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 dark:border-gray-700 pb-2">Kontak</h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href={`tel:${data.Kontak.Telepon}`} className="flex-1 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-200 p-4 rounded-lg flex items-center gap-3 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                            <FaPhone className="text-xl" />
                            <div>
                                <p className="text-xs">Telepon</p>
                                <p className="font-medium">{data.Kontak.Telepon}</p>
                            </div>
                        </a>
                        <a href={`mailto:${data.Kontak.Email}`} className="flex-1 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-200 p-4 rounded-lg flex items-center gap-3 hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
                            <FaEnvelope className="text-xl" />
                            <div>
                                <p className="text-xs">Email</p>
                                <p className="font-medium">{data.Kontak.Email}</p>
                            </div>
                        </a>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default BiodataPage;
