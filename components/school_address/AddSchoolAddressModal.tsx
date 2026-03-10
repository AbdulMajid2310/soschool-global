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
import {
  createSchoolAddress,
  updateSchoolAddress,
} from "@/redux/features/school-address/thunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSchoolId } from "@/hooks/useSchoolId";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Props {
  initialData?: SchoolAddress | null;
  onSubmit?: SubmitHandler<CreateSchoolAddressDto>; // Tambahin props ini biar fleksibel
  loading?: boolean;
}

const LocationPicker = ({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const AddSchoolAddressForm: React.FC<Props> = ({
  initialData,
  onSubmit: externalSubmit,
  loading: externalLoading,
}) => {
  const dispatch = useAppDispatch();
  const schoolId = useSchoolId();
  const { loading: reduxLoading } = useAppSelector(
    (state) => state.schoolAddress,
  );
  const loading = externalLoading ?? reduxLoading;

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
        schoolId: schoolId ?? "",
        province: initialData.province ?? "",
        city: initialData.city ?? "",
        district: initialData.district ?? "",
        village: initialData.village ?? "",
        street: initialData.street ?? "",
        postalCode: initialData.postalCode ?? "",
        latitude: initialData.latitude,
        longitude: initialData.longitude,
      });
      setMapCenter([initialData.latitude, initialData.longitude]);
    }
  }, [initialData, reset, schoolId]);

  const handleReverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
        {
          headers: { "Accept-Language": "id" },
        },
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

  const internalSubmit: SubmitHandler<CreateSchoolAddressDto> = (data) => {
    const { schoolAddressId, school, createdAt, updatedAt, ...cleanData } =
      data as any;

    if (initialData?.schoolAddressId) {
      dispatch(
        updateSchoolAddress({
          id: initialData.schoolAddressId,
          dto: cleanData,
        }),
      );
    } else {
      dispatch(createSchoolAddress(cleanData));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-4xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
      <form
        onSubmit={handleSubmit(externalSubmit || internalSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <div className="lg:col-span-5 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Provinsi
              </label>
              <input
                {...register("province", { required: true })}
                className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white p-3.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Kota/Kabupaten
              </label>
              <input
                {...register("city", { required: true })}
                className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white p-3.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Kecamatan
              </label>
              <input
                {...register("district", { required: true })}
                className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white p-3.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Desa/Kelurahan
              </label>
              <input
                {...register("village", { required: true })}
                className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white p-3.5 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Alamat Jalan
            </label>
            <textarea
              {...register("street", { required: true })}
              rows={3}
              className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white p-3.5 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Kodepos
              </label>
              <input
                {...register("postalCode", { required: true })}
                className="w-full rounded-2xl border border-gray-200 dark:border-slate-700 bg-transparent dark:text-white p-3.5"
              />
            </div>
            <div className="space-y-1 text-center">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Lat
              </label>
              <div className="p-3.5 bg-gray-50 dark:bg-slate-800 rounded-2xl text-[10px] font-mono">
                {Number(currentLat).toFixed(5)}
              </div>
            </div>
            <div className="space-y-1 text-center">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Lng
              </label>
              <div className="p-3.5 bg-gray-50 dark:bg-slate-800 rounded-2xl text-[10px] font-mono">
                {Number(currentLng).toFixed(5)}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 h-100 rounded-3xl overflow-hidden border-8 border-gray-50 dark:border-slate-800 relative z-0">
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[currentLat, currentLng]} icon={markerIcon} />
            <LocationPicker
              onLocationSelect={(lat, lng) => {
                setValue("latitude", lat);
                setValue("longitude", lng);
                handleReverseGeocode(lat, lng);
              }}
            />
          </MapContainer>
        </div>

        <div className="lg:col-span-12 flex justify-end gap-4 pt-6 border-t border-gray-100 dark:border-slate-800">
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xl transition-all active:scale-95 disabled:opacity-50"
          >
            {loading
              ? "Menyimpan..."
              : initialData
                ? "Perbarui Alamat"
                : "Simpan Alamat"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSchoolAddressForm;
