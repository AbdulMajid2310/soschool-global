"use client";

import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createSchoolAddress } from "@/redux/features/school-address/thunks";
import { resetAddressStatus } from "@/redux/features/school-address/slice";
import { useSchoolId } from "@/hooks/useSchoolId";
import ButtonBackUI from "@/components/ui/button/ButtonBack";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AddressForm = dynamic(() => import("@/components/address/AddressModal"), {
  ssr: false,
});

export default function AddSchoolAddressPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const schoolId = useSchoolId();

  const { loading } = useAppSelector((state) => state.schoolAddress);

  useEffect(() => {
    dispatch(resetAddressStatus());
  }, [dispatch]);

  const handleFinalSubmit = async (formData: any) => {
    if (!schoolId) {
      toast.error("ID Sekolah tidak ditemukan!");
      return;
    }

    const payload = {
      ...formData,
      schoolId: schoolId,
    };

    try {
      await dispatch(createSchoolAddress(payload)).unwrap();
      toast.success("Alamat sekolah berhasil disimpan!");
      router.push("/dashboard/school");
    } catch (err: any) {
      toast.error(err || "Gagal menyimpan alamat sekolah.");
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="max-w-6xl mx-auto">
        <ButtonBackUI />
        <div className="mt-6">
          <AddressForm
            onSubmit={handleFinalSubmit}
            loading={loading}
            initialData={null}
          />
        </div>
      </div>
    </div>
  );
}
