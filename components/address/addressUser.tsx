'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useParams } from 'next/navigation'; // Jika userId dari URL
import { AppDispatch, RootState } from '@/redux/store';
import { clearAddressError } from '@/redux/features/address/slice';
import { 
  createAddress, 
  updateAddress, 
  fetchAddressByUserId 
} from '@/redux/features/address/thunk';
import { FaChevronCircleLeft, FaEdit } from 'react-icons/fa';
import { LuMapPinPlus } from 'react-icons/lu';
import { toast } from 'react-hot-toast';
import { FaMapLocationDot } from 'react-icons/fa6';

export default function AddUserAddress() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams(); // Asumsi: URL-nya /admin/user/address/[userId]
  
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

  const [targetUserId, setTargetUserId] = useState<string | null>(null);
  const [existingAddressId, setExistingAddressId] = useState<string | null>(null);

  // 1. Ambil userId (bisa dari params URL atau Session)
  useEffect(() => {
    const userId = params.userId as string || sessionStorage.getItem("editUserId");
    
    if (!userId) {
      toast.error("User ID tidak ditemukan");
      router.back();
    } else {
      setTargetUserId(userId);
      dispatch(fetchAddressByUserId(userId));
    }

    return () => {
      dispatch(clearAddressError());
    };
  }, [dispatch, params.userId, router]);

  // 2. Sync data ke Form jika sudah ada alamat terdaftar
  useEffect(() => {
    if (address) {
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
    if (!targetUserId) return;

    const payload = {
      ...formData,
      userId: targetUserId, // Gunakan userId, bukan schoolId
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude)
    };

    try {
      if (existingAddressId) {
        await dispatch(updateAddress({ id: existingAddressId, data: payload })).unwrap();
        toast.success("Alamat user diperbarui!");
      } else {
        await dispatch(createAddress(payload)).unwrap();
        toast.success("Alamat user berhasil disimpan!");
      }
      router.back();
    } catch (err) {
      console.error("Gagal simpan alamat user:", err);
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
          Kembali
        </button>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-slate-200 dark:border-gray-800 overflow-hidden">
          {/* Header Theme - Hijau/Emerald biasanya cocok untuk data personal/user */}
          <div className={`${existingAddressId ? 'bg-emerald-900' : 'bg-slate-900'} p-8 text-white relative transition-all`}>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2.5 ${existingAddressId ? 'bg-emerald-500' : 'bg-blue-600'} rounded-xl shadow-lg`}>
                  {existingAddressId ? <FaEdit className="w-6 h-6" /> : <FaMapLocationDot  className="w-6 h-6" />}
                </div>
                <h1 className="text-2xl font-bold">
                  {existingAddressId ? 'Edit Alamat Tinggal' : 'Tambah Alamat Tinggal'}
                </h1>
              </div>
              <p className="text-slate-400 text-sm">
                Pastikan alamat sesuai dengan KTP atau domisili aktif user.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-7">
            {serverError && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 text-red-600 text-sm rounded-2xl flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                {serverError}
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block ml-1">Alamat Lengkap</label>
              <textarea 
                name="street" required value={formData.street} onChange={handleChange} rows={2}
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 focus:bg-white outline-none transition-all text-slate-800 dark:text-gray-200"
                placeholder="Nama jalan, blok, nomor rumah..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Kelurahan', name: 'village' },
                { label: 'Kecamatan', name: 'district' },
                { label: 'Kota', name: 'city' },
                { label: 'Provinsi', name: 'province' },
                { label: 'Kode Pos', name: 'postalCode' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block ml-1">{f.label}</label>
                  <input 
                    name={f.name} required value={(formData as any)[f.name]} onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800 dark:text-gray-100 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              ))}
            </div>

            {/* Geo Section */}
            <div className="p-6 bg-slate-900 dark:bg-gray-800 rounded-3xl text-white">
              <div className="flex items-center gap-2 mb-5 text-emerald-400">
                <LuMapPinPlus className="w-5 h-5" />
                <h3 className="font-bold uppercase text-sm">Titik Koordinat (Opsional)</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Lat"
                  className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:bg-white focus:text-slate-900 outline-none transition-all"
                />
                <input 
                  type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Long"
                  className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:bg-white focus:text-slate-900 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                existingAddressId ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
              } text-white shadow-xl disabled:opacity-50`}
            >
              {loading ? "Memproses..." : existingAddressId ? 'Simpan Perubahan' : 'Simpan Alamat User'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}