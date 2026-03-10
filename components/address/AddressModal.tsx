"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  CreateSchoolAddressDto,
  SchoolAddress,
} from "@/redux/features/school-address/types";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface AddressFormProps {
  onSubmit: SubmitHandler<CreateSchoolAddressDto>;
  initialData?: SchoolAddress | null;
  loading?: boolean;
}

const LocationPicker = ({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const AddressForm: React.FC<AddressFormProps> = ({
  onSubmit,
  initialData,
  loading = false,
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    -6.2, 106.816666,
  ]);
  const [locLoading, setLocLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<CreateSchoolAddressDto>();

  const currentLat = watch("latitude") || -6.2;
  const currentLng = watch("longitude") || 106.816666;

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        province: initialData.province ?? "",
        city: initialData.city ?? "",
        district: initialData.district ?? "",
        village: initialData.village ?? "",
        street: initialData.street ?? "",
        postalCode: initialData.postalCode ?? "",
      });
      setMapCenter([initialData.latitude, initialData.longitude]);
    } else {
      reset({
        latitude: -6.2,
        longitude: 106.816666,
        province: "",
        city: "",
        district: "",
        village: "",
        street: "",
        postalCode: "",
      });
    }
  }, [initialData, reset]);

  const handleReverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        { headers: { "Accept-Language": "id" } },
      );
      const data = await response.json();
      if (data.address) {
        const addr = data.address;
        setValue("province", addr.state || addr.region || "");
        setValue(
          "city",
          addr.city || addr.town || addr.city_district || addr.county || "",
        );
        setValue(
          "district",
          addr.suburb || addr.municipality || addr.district || "",
        );
        setValue(
          "village",
          addr.village || addr.neighbourhood || addr.hamlet || "",
        );
        setValue("postalCode", addr.postcode || "");
        setValue("street", data.display_name || "");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) return;
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setValue("latitude", latitude);
        setValue("longitude", longitude);
        setMapCenter([latitude, longitude]);
        await handleReverseGeocode(latitude, longitude);
        setLocLoading(false);
      },
      () => setLocLoading(false),
    );
  };

  return (
    <div className="w-full rounded-4xl bg-white dark:bg-slate-900 lg:p-8 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 dark:border-slate-800 pb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            {initialData ? "Perbarui Lokasi" : "Lokasi Baru"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            {initialData
              ? "Ubah koordinat untuk pembaruan data pemetaan."
              : "Tentukan lokasi sekarang untuk akurasi data pemetaan."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={handleGetCurrentLocation}
            disabled={locLoading}
            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-500 hover:text-white transition-all duration-300 disabled:opacity-50 active:scale-95 shadow-lg shadow-emerald-100 dark:shadow-none"
          >
            <svg
              className={`h-5 w-5 ${locLoading ? "animate-spin" : "group-hover:rotate-12 transition-transform"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{locLoading ? "Mendeteksi..." : "Lokasi Sekarang"}</span>
          </button>

          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black shadow-2xl shadow-blue-200 dark:shadow-none transition-all duration-300 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Menyimpan...</span>
              </>
            ) : (
              "Simpan Alamat"
            )}
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <div className="lg:col-span-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="province"
                className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase ml-1"
              >
                Provinsi
              </label>
              <input
                id="province"
                {...register("province", { required: true })}
                placeholder="Provinsi"
                className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white p-3.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="city"
                className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase ml-1"
              >
                Kota/Kabupaten
              </label>
              <input
                id="city"
                {...register("city", { required: true })}
                placeholder="Kota/Kabupaten"
                className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white p-3.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="district"
                className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase ml-1"
              >
                Kecamatan
              </label>
              <input
                id="district"
                {...register("district", { required: true })}
                placeholder="Kecamatan"
                className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white p-3.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="village"
                className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase ml-1"
              >
                Desa/Kelurahan
              </label>
              <input
                id="village"
                {...register("village", { required: true })}
                placeholder="Desa/Kelurahan"
                className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white p-3.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="street"
              className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase ml-1"
            >
              Alamat Jalan
            </label>
            <textarea
              id="street"
              {...register("street", { required: true })}
              placeholder="Nama jalan, RT/RW, dan detail lainnya"
              rows={3}
              className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white p-3.5 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="postalCode"
                className="text-xs font-bold text-gray-500 dark:text-slate-500 uppercase"
              >
                Kodepos
              </label>
              <input
                id="postalCode"
                {...register("postalCode")}
                placeholder="Kodepos"
                className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white p-3.5"
              />
            </div>
            <div className="space-y-1 text-center">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Lat
              </label>
              <div className="p-3.5 bg-gray-50 dark:bg-slate-800 rounded-2xl text-[10px] font-mono dark:text-slate-400 border border-gray-100 dark:border-slate-700">
                {Number(currentLat || 0).toFixed(5)}
              </div>
            </div>
            <div className="space-y-1 text-center">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Lng
              </label>
              <div className="p-3.5 bg-gray-50 dark:bg-slate-800 rounded-2xl text-[10px] font-mono dark:text-slate-400 border border-gray-100 dark:border-slate-700">
                {Number(currentLng || 0).toFixed(5)}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 h-100 min-h-100 rounded-3xl overflow-hidden border-8 border-gray-50 dark:border-slate-800 relative z-0">
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              key="openstreetmap-layer"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[currentLat, currentLng]} icon={markerIcon} />
            <LocationPicker
              onSelect={(lat, lng) => {
                setValue("latitude", lat);
                setValue("longitude", lng);
                handleReverseGeocode(lat, lng);
              }}
            />
          </MapContainer>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
