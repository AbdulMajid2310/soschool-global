"use client";

import PdfViewer from "@/components/PdfViewer";
import ButtonBackUI from "@/components/ui/button/ButtonBack";
import { useEffect, useState } from "react";

export default function PdfPage() {
  const [fileUrl, setFileUrl] = useState<string>("");

  useEffect(() => {
    const storedHash = sessionStorage.getItem("fileHash");
    if (storedHash) {
      setFileUrl(storedHash);
    }
  }, []);
  return (
    <div>
      <ButtonBackUI />
      <PdfViewer url={fileUrl} title="Modul Kewarganegaraan" />
    </div>
  );
}
