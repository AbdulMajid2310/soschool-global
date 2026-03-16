"use client";

import ButtonBackUI from "@/components/ui/button/ButtonBack";
import CreateStaffModal from "@/components/staff/add/CreateStaffModal";

export default function AddStaffPage() {
  return (
    <div>
      <section>
        <ButtonBackUI />
      </section>
      <section>
        <CreateStaffModal />
      </section>
    </div>
  );
}
