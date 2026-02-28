"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

// Teacher data
const teacherData = {
  nip: "642564653725",
  firstName: "Budi",
  lastName: "Santoso",
  titlePrefix: "Dr.",
  titleSuffix: "M.Si.",
  image: "https://i.pravatar.cc/150?img=12",
  background:
    "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80",
  contact: {
    phone: "+62 812 3456 7890",
    email: "budi.santoso@example.com",
  },
};

export default function HeaderDetailTeacherAndStaff() {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const data = teacherData;

  // Handle error gambar
  const handleImageError = () => setImageError(true);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Back Button */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
        >
          <FaChevronLeft className="mr-2 text-xl transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm">
            <FiMoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
        {/* Background Image */}
        <div
          className="h-48 relative"
          style={{
            backgroundImage: `url(${data.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Profile Header */}
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16">
            {/* Photo */}
            <div className="relative group">
              {imageError ? (
                <div className="w-32 h-32 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-500 dark:text-gray-400">
                    {data.firstName.charAt(0)}
                  </span>
                </div>
              ) : (
                <img
                  src={data.image}
                  alt={`${data.firstName} ${data.lastName}`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow"
                  onError={handleImageError}
                />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left mb-2 md:mb-0 ">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                {data.titlePrefix ? data.titlePrefix + " " : ""}
                {data.firstName} {data.lastName}
                {data.titleSuffix ? ", " + data.titleSuffix : ""}
              </h2>

              {/* ID / Contact */}
              <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400 items-center justify-center md:justify-start">
                <p>NIP: <span>{data.nip}</span></p>
           
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
