"use client";

import CreateStaffModal from "@/components/staff/add/CreateStaffModal";
import ButtonBackUI from "@/components/ui/button/ButtonBack";

export default function CreateStaffSchoolPage() {
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
