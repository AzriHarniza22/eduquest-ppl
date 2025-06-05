'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-[#2196F3] text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img src="/eduquest-logo.svg" alt="EduQuest" className="h-8 w-8 mr-2" />
            <div className="text-2xl font-bold">EduQuest</div>
          </div>
          <nav className="space-x-6">
            <Link href="/" className="hover:text-blue-200">Beranda</Link>
            <Link href="#features" className="hover:text-blue-200">Fitur</Link>
            <Link href="#guide" className="hover:text-blue-200">Panduan</Link>
            <Link href="#contact" className="hover:text-blue-200">Kontak</Link>
            <Link href="/auth/login" className="bg-white text-[#2196F3] px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Masuk
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#E3F2FD] to-white">
        <div className="container mx-auto px-4 py-12 flex items-center justify-between">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Jelajahi Dunia SDGs Melalui Petualangan Interaktif</h1>
            <p className="text-gray-600 mb-8">
              Platform pembelajaran interaktif tentang SDGs yang mengintegrasikan edukasi, gamifikasi, dan tantangan menarik!
            </p>
            <div className="space-x-4">
              <Link href="/auth/register">
                <button className="bg-[#2196F3] text-white px-6 py-2 rounded-lg hover:bg-[#1976D2] transition-colors">
                  Mulai Petualangan
                </button>
              </Link>
              <Link href="#features">
                <button className="border-2 border-[#2196F3] text-[#2196F3] px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  Pelajari Lebih Lanjut
                </button>
              </Link>
            </div>
          </div>
          <div className="w-1/2">
            <img src="/hero-image.svg" alt="SDGs Adventure" className="w-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Fitur Utama</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#E3F2FD] p-6 rounded-lg shadow-md mb-4 transform hover:scale-105 transition-transform">
                <img src="/map-icon.svg" alt="Peta" className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-800">Peta Perjalanan SDGs</h3>
              <p className="text-sm text-gray-600">Ikuti 17 tujuan SDGs melalui peta interaktif yang menarik</p>
            </div>
            <div className="text-center">
              <div className="bg-[#E8F5E9] p-6 rounded-lg shadow-md mb-4 transform hover:scale-105 transition-transform">
                <img src="/interactive-icon.svg" alt="Materi" className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-800">Materi Interaktif</h3>
              <p className="text-sm text-gray-600">Pelajari konsep SDGs yang dikemas dengan cara menyenangkan</p>
            </div>
            <div className="text-center">
              <div className="bg-[#FFF3E0] p-6 rounded-lg shadow-md mb-4 transform hover:scale-105 transition-transform">
                <img src="/badge-icon.svg" alt="Badge" className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-800">Sistem Badge</h3>
              <p className="text-sm text-gray-600">Kumpulkan badge untuk setiap capaian pembelajaran</p>
            </div>
            <div className="text-center">
              <div className="bg-[#F3E5F5] p-6 rounded-lg shadow-md mb-4 transform hover:scale-105 transition-transform">
                <img src="/leaderboard-icon.svg" alt="Leaderboard" className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-800">Leaderboard</h3>
              <p className="text-sm text-gray-600">Bandingkan pencapaianmu dengan pemain lainnya</p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section id="guide" className="bg-gradient-to-br from-[#E3F2FD] to-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Lacak Progressmu</h2>
          <div className="flex items-center justify-between">
            <div className="w-1/3">
              <img src="/progress-image.svg" alt="Progress Tracking" className="w-full" />
            </div>
            <div className="w-1/2">
              <p className="text-gray-600 mb-8">Pantau perkembangan belajarmu, kumpulkan badge, dan bersaing di leaderboard global</p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2196F3]">1000+</div>
                  <div className="text-sm text-gray-600">Pengguna Aktif</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2196F3]">17</div>
                  <div className="text-sm text-gray-600">SDG Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#2196F3]">100+</div>
                  <div className="text-sm text-gray-600">Tantangan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1A237E] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EduQuest</h3>
              <p className="text-blue-200">Platform pembelajaran interaktif untuk SDGs</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigasi</h4>
              <ul className="space-y-2 text-blue-200">
                <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
                <li><Link href="#features" className="hover:text-white transition-colors">Fitur</Link></li>
                <li><Link href="#guide" className="hover:text-white transition-colors">Panduan</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">Kontak</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sosial Media</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-blue-200">
                <li>info@eduquest.com</li>
                <li>+62 (021) 1234 5678</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800 text-center text-blue-200">
            © 2024 EduQuest. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
} 