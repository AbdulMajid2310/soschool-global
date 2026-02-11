'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch, RootState } from '@/redux/store';
import { clearAddressError } from '@/redux/features/address/slice';
import { 
  createAddress, 
  updateAddress, 
  fetchAddressBySchoolId // Gunakan thunk spesifik schoolId agar lebih akurat
} from '@/redux/features/address/thunk';
import { FaChevronCircleLeft, FaMapMarkedAlt, FaSave, FaEdit } from 'react-icons/fa';
import { LuMapPinPlus } from 'react-icons/lu';
import { toast } from 'react-hot-toast';

export default function AddSchoolAddress() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  // Pastikan selector mengarah ke slice yang tepat (sesuaikan jika nama di store berbeda)
  const { loading, error: serverError, address } = useSelector((state: RootState) => state.schoolAddress);

  const [formData, setFormData] = useState({
    street: '',
    village: '',
    district: '',
    city: '',
    province: '',
    postalCode: '',
    latitude: '',
    longitude: '',
  });

  const [schoolId, setSchoolId] = useState<string | null>(null);
  const [existingAddressId, setExistingAddressId] = useState<string | null>(null);

  // 1. Inisialisasi: Ambil schoolId dan trigger fetch data spesifik
  useEffect(() => {
    const id = sessionStorage.getItem("schoolId");
    if (!id) {
      toast.error("Sesi sekolah berakhir, silakan pilih sekolah kembali.");
      router.push('/sss/schools');
    } else {
      setSchoolId(id);
      // Fetch data alamat yang sudah ada untuk sekolah ini
      dispatch(fetchAddressBySchoolId(id));
    }

    return () => {
      dispatch(clearAddressError());
    };
  }, [dispatch, router]);

  // 2. Auto-fill Form: Jika data alamat ditemukan di state
  useEffect(() => {
    if (address) {
      // Sesuai interface Address: addressId
      setExistingAddressId(address.addressId);
      setFormData({
        street: address.street || '',
        village: address.village || '',
        district: address.district || '',
        city: address.city || '',
        province: address.province || '',
        postalCode: address.postalCode || '',
        latitude: address.latitude?.toString() || '',
        longitude: address.longitude?.toString() || '',
      });
    }
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolId) return;

    // Persiapan Payload (Konversi string ke number untuk koordinat)
    const payload = {
      ...formData,
      schoolId,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude)
    };

    try {
      if (existingAddressId) {
        // Mode UPDATE: Perlu ID Alamat
        await dispatch(updateAddress({ id: existingAddressId, data: payload })).unwrap();
        toast.success("Alamat instansi diperbarui!");
      } else {
        // Mode CREATE
        await dispatch(createAddress(payload)).unwrap();
        toast.success("Alamat instansi berhasil disimpan!");
      }
      
      router.push(`/sss/schools/detail`);
    } catch (err) {
      // Error ditangani oleh rejected case di slice & ditampilkan lewat serverError
      console.error("Submission failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-gray-950 p-4 md:p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all mb-6 group text-sm font-medium"
        >
          <FaChevronCircleLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Detail Sekolah
        </button>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-slate-200 dark:border-gray-800 overflow-hidden">
          {/* Visual Header */}
          <div className={`${existingAddressId ? 'bg-indigo-900' : 'bg-slate-900'} p-8 text-white relative transition-all`}>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2.5 ${existingAddressId ? 'bg-indigo-500' : 'bg-blue-600'} rounded-xl shadow-lg`}>
                  {existingAddressId ? <FaEdit className="w-6 h-6" /> : <FaMapMarkedAlt className="w-6 h-6" />}
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                  {existingAddressId ? 'Perbarui Lokasi Sekolah' : 'Daftarkan Lokasi Sekolah'}
                </h1>
              </div>
              <p className="text-slate-400 text-sm max-w-md">
                {existingAddressId ? 'Anda sedang mengubah data alamat yang sudah ada.' : 'Lengkapi data alamat untuk sekolah ini.'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-7">
            {serverError && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-2xl flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                {serverError}
              </div>
            )}

            {/* Street Input */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block ml-1">Jalan & Nomor</label>
              <textarea 
                name="street" required value={formData.street} onChange={handleChange} rows={2}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-800 dark:text-gray-200 placeholder:text-slate-400"
                placeholder="Jl. Merdeka No. 123..."
              />
            </div>

            {/* Grid Detail Alamat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Kelurahan / Desa', name: 'village' },
                { label: 'Kecamatan', name: 'district' },
                { label: 'Kota / Kabupaten', name: 'city' },
                { label: 'Provinsi', name: 'province' },
                { label: 'Kode Pos', name: 'postalCode' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block ml-1">{field.label}</label>
                  <input 
                    name={field.name} required value={(formData as any)[field.name]} onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 dark:text-gray-100 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              ))}
            </div>

            {/* Geo-location (Dark Section) */}
            <div className="p-6 bg-slate-900 dark:bg-gray-800 rounded-3xl text-white border border-gray-700">
              <div className="flex items-center gap-2 mb-5 text-blue-400">
                <LuMapPinPlus className="w-5 h-5" />
                <h3 className="font-bold uppercase text-sm tracking-wider">Koordinat Geografis</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Latitude</label>
                  <input 
                    type="number" step="any" name="latitude" required value={formData.latitude} onChange={handleChange} placeholder="-6.1234"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:bg-white focus:text-slate-900 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Longitude</label>
                  <input 
                    type="number" step="any" name="longitude" required value={formData.longitude} onChange={handleChange} placeholder="106.1234"
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:bg-white focus:text-slate-900 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl ${
                existingAddressId ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {existingAddressId ? <FaSave className="w-5 h-5" /> : <FaMapMarkedAlt className="w-5 h-5" />}
                  {existingAddressId ? 'Simpan Perubahan' : 'Daftarkan Lokasi'}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}