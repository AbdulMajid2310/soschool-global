"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import { FiSearch, FiList, FiGrid, FiUser, FiInfo, FiEdit2, FiTrash2 } from "react-icons/fi";
import { HiOutlineStatusOnline } from "react-icons/hi";

// Dummy data Guru & Staff
const staffs = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  nip: `19800${i + 1}`,
  name: `Staff ${i + 1}`,
  image: `https://i.pravatar.cc/150?img=${i + 10}`,
  role: i % 2 === 0 ? "Guru" : "Staff",
  department: i % 2 === 0 ? `Matematika` : `Administrasi`,
  gender: i % 2 === 0 ? "Laki-laki" : "Perempuan",
  status: i % 5 === 0 ? "Nonaktif" : "Aktif",
}));

export default function DataStaffPage() {
  const route = useRouter();
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");

  const roles = ["all", ...new Set(staffs.map((s) => s.role))];
  const statuses = ["all", "Aktif", "Nonaktif"];
  const genders = ["all", "Laki-laki", "Perempuan"];

  const filteredStaffs = staffs.filter((s) => {
    const matchQuery =
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.nip.includes(query);

    const matchRole = selectedRole === "all" || s.role === selectedRole;
    const matchStatus = selectedStatus === "all" || s.status === selectedStatus;
    const matchGender = selectedGender === "all" || s.gender === selectedGender;

    return matchQuery && matchRole && matchStatus && matchGender;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Data Guru & Staff</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 shadow">
          + Tambah Staff
        </button>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Staff</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{staffs.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Aktif</p>
          <p className="text-2xl font-bold text-green-600">
            {staffs.filter((s) => s.status === "Aktif").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Nonaktif</p>
          <p className="text-2xl font-bold text-red-600">
            {staffs.filter((s) => s.status === "Nonaktif").length}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex justify-between items-center space-y-4 flex-col md:flex-row">
        {/* Role Filter */}
        <div className="flex items-center gap-2">
         
          <div className="flex gap-2">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition
                  ${selectedRole === r ? "bg-blue-600 text-white shadow" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"}
                `}
              >
                {r === "all" ? "Semua" : r}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama atau NIP..."
            className="pl-9 pr-3 py-2 w-56 border rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* View Switch */}
        <div className="flex border rounded-lg overflow-hidden border-gray-300 dark:border-gray-700">
          <button
            onClick={() => setView("list")}
            className={`px-3 py-2 transition ${view === "list" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
          >
            <FiList />
          </button>
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-2 transition ${view === "grid" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
          >
            <FiGrid />
          </button>
        </div>
      </div>

      {/* List View */}
      {view === "list" && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-x-auto">
          <div className="w-full text-sm">
            <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300">
              <div className="col-span-2">Nama</div>
              <div>NIP</div>
              <div>Role</div>
              <div>Status</div>
              <div className="text-right">Aksi</div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStaffs.map((s) => (
                <div
                  key={s.id}
                  className="grid grid-cols-6 gap-4 px-4 py-3 items-center text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <div className="col-span-2 flex items-center gap-3">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                    />
                    <span className="font-medium text-gray-800 dark:text-gray-100">{s.name}</span>
                  </div>
                  <div className="text-gray-800 dark:text-gray-100">{s.nip}</div>
                  <div className="text-gray-700 dark:text-gray-300">{s.role}</div>
                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                        ${s.status === "Aktif" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                      `}
                    >
                      {s.status}
                    </span>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => route.push("/staff/akademik/guru-staff/detail/bio")}
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
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredStaffs.map((s) => (
            <div key={s.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 hover:shadow-lg transition flex flex-col">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                    ${s.status === "Aktif" ? "bg-green-500" : "bg-red-500"}`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.nip}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{s.role}</p>
                </div>
                <div className="flex items-center gap-1 text-lg">
                  {s.gender === "Laki-laki" ? <FaMale className="text-blue-500" /> : <FaFemale className="text-pink-500" />}
                </div>
              </div>
              <p className="font-semibold p-3 text-gray-800 dark:text-gray-100 text-base leading-tight">{s.name}</p>
              <div className="my-1 border-t border-gray-200 dark:border-gray-700" />
              <div className="flex items-center justify-between">
                <span
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                    ${s.status === "Aktif" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                  `}
                >
                  <HiOutlineStatusOnline />
                  {s.status}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => route.push("/staff/akademik/guru-staff/detail/bio")}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
