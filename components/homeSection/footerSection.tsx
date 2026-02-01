import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">

              <div>

                <div className='lg:h-40 lg:w-40 h-28 w-28'>
                  <img src="/images/logo.png" alt="logo" className='h-full w-full object-contain' />
                </div>
              </div>
              <div>

                <h1 className="text-2xl lg:text-4xl lg:mb-2 font-bold">SoSchool</h1>
                <p className="text-gray-400 hidden lg:inline ">
                  Platform edukasi terdepan di Indonesia yang mengintegrasikan teknologi AI untuk
                  transformasi digital ekosistem pendidikan.
                </p>
                <div className="flex space-x-4 mt-2 md:text-xs  text-lg lg:hidden">
                  <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <FaTwitter />
                  </a>
                  <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <FaInstagram />
                  </a>
                  <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>

            <p className="text-gray-400 lg:hidden  ">
              Platform edukasi terdepan di Indonesia yang mengintegrasikan teknologi AI untuk
              transformasi digital ekosistem pendidikan.
            </p>
            <div className=" hidden lg:inline">

              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <FaFacebookF />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <FaTwitter />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <FaInstagram />
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Produk</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Digital Classroom</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AI Learning</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Collaboration</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Perusahaan</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Karir</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2026 SoSchool. All rights reserved.
          </p>
          <div className="flex space-x-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}