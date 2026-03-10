"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getSchoolAddressBySchoolId,
  updateSchoolAddress,
} from "@/redux/features/school-address/thunks";
import { resetAddressStatus } from "@/redux/features/school-address/slice";
import { useSchoolId } from "@/hooks/useSchoolId";
import ButtonBackUI from "@/components/ui/button/ButtonBack";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddressForm = dynamic(() => import("@/components/address/AddressModal"), {
  ssr: false,
});

export default function UpdateSchoolAddressPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const schoolId = useSchoolId();

  const { loading, address } = useAppSelector((state) => state.schoolAddress);

  useEffect(() => {
    dispatch(resetAddressStatus());
    if (schoolId) {
      dispatch(getSchoolAddressBySchoolId(schoolId));
    }
  }, [dispatch, schoolId]);

  const handleUpdateSubmit = async (formData: any) => {
    if (!schoolId || !address?.schoolAddressId) {
      toast.error("Data tidak lengkap untuk melakukan pembaruan");
      return;
    }

    // Buang semua properti yang dilarang backend
    const {
      schoolAddressId,
      school,
      createdAt,
      updatedAt,
      schoolId: existingSchoolId, // Buang schoolId dari body jika backend sensitif
      ...cleanData
    } = formData;

    try {
      // Kirim ID lewat parameter, dan data murni lewat body
      await dispatch(
        updateSchoolAddress({
          id: address.schoolAddressId,
          dto: cleanData, // Coba kirim tanpa schoolId di dalam body
        }),
      ).unwrap();

      toast.success("Alamat sekolah berhasil diperbarui!");
      router.back();
    } catch (err: any) {
      toast.error(err || "Gagal memperbarui alamat");
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <ButtonBackUI />
        <div className="mt-6">
          {loading && !address ? (
            <div className="w-full h-64 flex items-center justify-center bg-white dark:bg-slate-900 rounded-4xl border border-gray-100 dark:border-slate-800">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-bold text-gray-500">
                  Mengambil data alamat...
                </p>
              </div>
            </div>
          ) : (
            <AddressForm
              onSubmit={handleUpdateSubmit}
              loading={loading}
              initialData={address}
            />
          )}
        </div>
      </div>
    </div>
  );
}
