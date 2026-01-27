"use client";

import {
  FaUserGraduate,
  FaIdCard,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaVenusMars,
  FaPrayingHands,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
} from "react-icons/fa";

interface StudentBiodata {
  profilePhoto: string;
  firstName: string;
  lastName: string;
  nisn: string;
  nik: string;
  birthPlace: string;
  birthDate: string;
  gender: "Male" | "Female";
  religion: string;
  address: string;
  phone: string;
  email: string;
}

const studentBiodata: StudentBiodata = {
  profilePhoto: "https://i.pravatar.cc/150",
  firstName: "Muhammad Rizki",
  lastName: "Fahrezi",
  nisn: "0087654321",
  nik: "3201012345678901",
  birthPlace: "Bandung",
  birthDate: "15 January 2006",
  gender: "Male",
  religion: "Islam",
  address:
    "Jl. Merdeka No. 123, Sukajadi, Coblong, Bandung, West Java",
  phone: "0812-3456-7890",
  email: "rizki.fahrezi.siswa@email.com",
};

export default function BiodataPage() {
  return (
    <div className="  flex items-center justify-center ">
      <div className="w-full  bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-center items-center gap-3 py-8 bg-linear-to-r from-indigo-600 to-blue-600">
          <img
            src={studentBiodata.profilePhoto}
            alt="Profile"
            className="w-40 h-40  rounded-2xl object-contain"
          />
          <div>
 <span className="text-indigo-200 text-xl tracking-wide">
           Informasi Siswa
          </span>
          <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
            <FaUserGraduate />
            {studentBiodata.firstName} {studentBiodata.lastName}
          </h1>
         
          </div>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">

          {/* NISN */}
          <div className="group flex gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-md transition">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600">
              <FaIdCard />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wide">
                NISN
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {studentBiodata.nisn}
              </p>
            </div>
          </div>

          {/* NIK */}
          <div className="group flex gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-md transition">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600">
              <FaIdCard />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wide">
                NIK
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {studentBiodata.nik}
              </p>
            </div>
          </div>

          {/* Birth Place */}
          <div className="group flex gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-md transition">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600">
              <FaMapMarkerAlt />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wide">
                Birth Place
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {studentBiodata.birthPlace}
              </p>
            </div>
          </div>

          {/* Birth Date */}
          <div className="group flex gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-md transition">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600">
              <FaBirthdayCake />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wide">
                Birth Date
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {studentBiodata.birthDate}
              </p>
            </div>
          </div>

          {/* Gender */}
          <div className="group flex gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-md transition">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600">
              <FaVenusMars />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wide">
                Gender
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {studentBiodata.gender}
              </p>
            </div>
          </div>

          {/* Religion */}
          <div className="group flex gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-md transition">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600">
              <FaPrayingHands />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wide">
                Religion
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {studentBiodata.religion}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="group flex gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-md transition">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600">
              <FaPhoneAlt />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wide">
                Phone
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {studentBiodata.phone}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="group flex gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-md transition">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 text-orange-600">
              <FaEnvelope />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wide">
                Email
              </p>
              <p className="font-medium text-gray-900 dark:text-white break-all">
                {studentBiodata.email}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2 group flex gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-md transition">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 text-red-600">
              <FaHome />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300 text-xs uppercase tracking-wide">
                Address
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {studentBiodata.address}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
