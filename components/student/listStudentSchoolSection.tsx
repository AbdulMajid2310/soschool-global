"use client"

import { useSchoolId } from "@/hooks/useSchoolId";
import { fetchStudents } from "@/redux/features/student/thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import { FiSearch, FiList, FiGrid, FiUser, FiInfo, FiEdit2, FiTrash2 } from "react-icons/fi";
import { HiOutlineStatusOnline } from "react-icons/hi";

const students = Array.from({ length: 40 }).map((_, i) => ({
  id: i + 1,
  nis: `20240${i + 1}`,
  name: `Siswa ${i + 1}`,
  image: `https://i.pravatar.cc/150`,
  class: `X-${(i % 3) + 1}`,
  gender: i % 2 === 0 ? "Laki-laki" : "Perempuan",
  status: i % 6 === 0 ? "Nonaktif" : "Aktif",
}));

export default function ListStudentSection() {
  const route = useRouter()
  const [query, setQuery] = useState("");
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const dispatch = useAppDispatch();


  // 1. Ambil schoolId dari state auth (User yang login)
  const schoolId = useSchoolId();
  // 2. Ambil data students dari state student
  const { students: data, loading, error } = useAppSelector((state) => state.student);

  console.log('siswa', data)

  // 3. Trigger fetch saat halaman dimuat
  useEffect(() => {
    if (schoolId) {
      dispatch(fetchStudents(schoolId));
    }
  }, [dispatch, schoolId]);


  const classes = ["all", ...new Set(students.map(s => s.class))];
  const statuses = ["all", "Aktif", "Nonaktif"];
  const genders = ["all", "Laki-laki", "Perempuan"];

  const filteredStudents = students.filter((s) => {
    const matchQuery =
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.nis.includes(query);

    const matchClass =
      selectedClass === "all" || s.class === selectedClass;

    const matchStatus =
      selectedStatus === "all" || s.status === selectedStatus;

    const matchGender =
      selectedGender === "all" || s.gender === selectedGender;


    return matchQuery && matchClass && matchStatus;
  });


  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold  tracking-tight">Manajemen Siswa</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola data Siswa akademik SoSchool</p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Siswa</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{students.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Siswa Aktif</p>
          <p className="text-2xl font-bold text-green-600">
            {students.filter(s => s.status === 'Aktif').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Siswa Nonaktif</p>
          <p className="text-2xl font-bold text-red-600">
            {students.filter(s => s.status === 'Nonaktif').length}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">

        {/* Filter Buttons */}
        <div className=" space-y-2 w-full">
          <div className="flex justify-between items-center w-full">

            {/* Kelas */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Kelas
              </span>
              <div className="flex flex-wrap gap-2">
                {classes.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition
            ${selectedClass === cls
                        ? "bg-blue-600 text-white shadow"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    {cls === "all" ? "Semua" : cls}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-end">
              {/* Search */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari siswa atau NIS..."
                  className="pl-9 pr-3 py-2 w-56 border rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* View Switch */}
              <div className="flex border rounded-lg overflow-hidden border-gray-300 dark:border-gray-700">
                <button
                  onClick={() => setView("list")}
                  className={`px-3 py-2 transition ${view === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                  <FiList />
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`px-3 py-2 transition ${view === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                  <FiGrid />
                </button>
              </div>


            </div>
          </div>

          <div className="flex gap-4">
            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Status
              </span>
              <div className="flex flex-wrap gap-2">
                {statuses.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition
            ${selectedStatus === st
                        ? st === "Aktif"
                          ? "bg-green-600 text-white shadow"
                          : st === "Nonaktif"
                            ? "bg-red-600 text-white shadow"
                            : "bg-gray-700 text-white shadow"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    <HiOutlineStatusOnline className="w-3 h-3" />
                    {st === "all" ? "Semua" : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Gender
              </span>
              <div className="flex flex-wrap gap-2">
                {genders.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition
            ${selectedGender === g
                        ? g === "Laki-laki"
                          ? "bg-blue-600 text-white shadow"
                          : g === "Perempuan"
                            ? "bg-pink-600 text-white shadow"
                            : "bg-gray-700 text-white shadow"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                  >
                    {g === "Laki-laki" && <FaMale />}
                    {g === "Perempuan" && <FaFemale />}
                    {g === "all" ? "Semua" : g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>



      </div>

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-x-auto">
          <div className="w-full text-sm">
            <div className="grid grid-cols-7 gap-4 px-4 py-3 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300">
              <div className="col-span-2">Nama</div>
              <div>NIS</div>
              <div>Kelas</div>
              <div>Jenis Kelamin</div>
              <div>Status</div>
              <div className="text-right">Aksi</div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStudents.map((s) => (
                <div
                  key={s.id}
                  className="grid grid-cols-7 gap-4 px-4 py-3 items-center text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  {/* Avatar + Nama */}
                  <div className="col-span-2 flex items-center gap-3">
                    <img
                      src={"https://i.pravatar.cc/150"}
                      alt={s.name}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                    />
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      {s.name}
                    </span>
                  </div>
                  {/* NIS */}
                  <div className="text-gray-800 dark:text-gray-100">
                    {s.nis}
                  </div>



                  {/* Kelas */}
                  <div className="text-gray-700 dark:text-gray-300">
                    {s.class}
                  </div>

                  {/* Gender */}
                  <div className="text-gray-700 dark:text-gray-300">
                    {s.gender}
                  </div>

                  {/* Status */}
                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
            ${s.status === "Aktif"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {s.status}
                    </span>
                  </div>

                  {/* Aksi */}
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => route.push('/staff/akademik/siswa/detail/bio')}
                      title="Detail"
                      className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                    >
                      <FiInfo size={16} />
                    </button>

                    <button
                      title="Edit"
                      className="p-2 rounded-lg text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900 transition"
                    >
                      <FiEdit2 size={16} />
                    </button>

                    <button
                      title="Hapus"
                      className="p-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredStudents.map((s) => (
            <div
              key={s.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 hover:shadow-lg transition flex flex-col"
            >
              <div>
                <div
                  key={s.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src="https://i.pravatar.cc/150"
                        alt="user"
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                      />
                      {/* Status Dot */}
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
          ${s.status === "Aktif" ? "bg-green-500" : "bg-red-500"}`}
                      />
                    </div>

                    <div className="flex-1">

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        NIS {s.nis}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Kelas {s.class}
                      </p>
                    </div>

                    {/* Gender */}
                    <div className="flex items-center gap-1 text-lg">
                      {s.gender === "Laki-laki" ? (
                        <FaMale className="text-blue-500" />
                      ) : (
                        <FaFemale className="text-pink-500" />
                      )}
                    </div>

                  </div>
                  <p className="font-semibold p-3 text-gray-800 dark:text-gray-100 text-base leading-tight">
                    {s.name}
                  </p>
                  {/* Divider */}
                  <div className="my-1 border-t border-gray-200 dark:border-gray-700" />

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    {/* Status */}
                    <span
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
        ${s.status === "Aktif"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      <HiOutlineStatusOnline />
                      {s.status}
                    </span>

                    <div className="flex items-center gap-3">
                      {/* Detail */}
                      <button
                        onClick={() => route.push('/staff/akademik/siswa/detail/bio')}
                        title="Detail"
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                      >
                        <FiInfo size={16} />
                      </button>

                      {/* Edit */}
                      <button
                        title="Edit"
                        className="p-2 rounded-lg text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900 transition"
                      >
                        <FiEdit2 size={16} />
                      </button>

                      {/* Delete */}
                      <button
                        title="Hapus"
                        className="p-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>

                  </div>
                </div>
              </div>


            </div>

          ))}
        </div>
      )}
    </div>
  );
}
