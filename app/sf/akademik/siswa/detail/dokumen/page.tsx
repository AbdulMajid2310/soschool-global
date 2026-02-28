"use client";

import {
  FaFileAlt,
  FaIdCard,
  FaCertificate,
  FaFileMedical,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

/* ================= TYPES ================= */

interface StudentDocument {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  status: "Verified" | "Pending";
  uploadedAt: string;
}

/* ================= DATA ================= */

const studentDocuments: StudentDocument[] = [
  {
    id: 1,
    title: "Birth Certificate",
    description: "Official birth certificate issued by civil registry.",
    imageUrl: "https://picsum.photos/400/300?doc1",
    status: "Verified",
    uploadedAt: "12 January 2024",
  },
  {
    id: 2,
    title: "Family Card (KK)",
    description: "Family identity document listing family members.",
    imageUrl: "https://picsum.photos/400/300?doc2",
    status: "Verified",
    uploadedAt: "15 January 2024",
  },
  {
    id: 3,
    title: "Student ID Card",
    description: "Official student identification card.",
    imageUrl: "https://picsum.photos/400/300?doc3",
    status: "Pending",
    uploadedAt: "20 January 2024",
  },
  {
    id: 4,
    title: "Medical Record",
    description: "Student health and immunization record.",
    imageUrl: "https://picsum.photos/400/300?doc4",
    status: "Pending",
    uploadedAt: "22 January 2024",
  },
];

/* ================= PAGE ================= */

export default function StudentDocumentPage() {
  return (
    <div className="min-h-screen   flex justify-center">
      <div className="w-full  bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="px-8 py-6 bg-linear-to-r from-indigo-600 to-blue-600">
          <h1 className="text-2xl flex items-center gap-2 font-semibold text-white">
           <IoDocumentText /> Dokumen siswa
          </h1>
          <p className="text-indigo-200 text-sm">
            Official documents uploaded by the student
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {studentDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {/* DOCUMENT IMAGE */}
              <img
                src={doc.imageUrl}
                alt={doc.title}
                className="w-full h-44 object-cover"
              />

              {/* BODY */}
              <div className="p-5 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    <FaFileAlt />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {doc.uploadedAt}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-xs">
                  {doc.description}
                </p>

                {/* STATUS */}
                <div className="flex items-center justify-between pt-3 border-t dark:border-gray-600">
                  <div className="flex items-center gap-2">
                    {doc.status === "Verified" ? (
                      <>
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-green-600 text-xs font-medium">
                          Verified
                        </span>
                      </>
                    ) : (
                      <>
                        <FaClock className="text-yellow-500" />
                        <span className="text-yellow-600 text-xs font-medium">
                          Pending Review
                        </span>
                      </>
                    )}
                  </div>

                  <button className="text-indigo-600 text-xs font-medium hover:underline">
                    View Document
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
