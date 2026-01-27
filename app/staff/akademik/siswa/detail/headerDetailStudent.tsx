import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function HeaderDetailStudent() {
    const router = useRouter();
    return (
        <div className="max-w-6xl mx-auto">
            {/* Back */}
            <button
                onClick={() => router.back()}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
            >
                <IoArrowBack className="mr-2 text-xl" />
                Kembali ke Daftar Siswa
            </button>

            {/* Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex gap-6 mb-2">
                <img
                    src="https://i.pravatar.cc/150"
                    className="w-28 h-28 rounded-full object-cover border"
                    alt="Foto Siswa"
                />

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Detail Siswa
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Informasi lengkap siswa
                    </p>
                </div>
            </div>


        </div>
    )
}