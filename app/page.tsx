"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 px-6 py-10">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-xl mb-12 border">
        <div className="text-2xl font-extrabold text-purple-700">CureSync</div>
        <nav className="hidden md:flex space-x-6">
          {["Home", "Doctors", "About", "Department", "Pricing", "Join Doctor"].map((link) => (
            <a key={link} href="#" className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">
              {link}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex space-x-4">
          <Button className="bg-purple-600 hover:bg-purple-700 transition duration-300 text-white px-5">
          Шинжилгээний хариу
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 transition duration-300 text-white px-5">
          Зөвлөгөө авах
        </Button>
        </div>
        
      </header>

      <motion.section
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-800">
          <span className="block">Таны <span role="img" aria-label="doctor">🧑‍⚕️</span> <span className="text-purple-600">Эрүүл мэнд</span></span>
          <span className="block mt-2 text-black">Бидний үйлчилгээ</span>
        </h1>

        <p className="text-md md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
       Таны эрүүл мэндийн мэдээллийг бид хамгаална. Та зөвлөгөө авч шинжилгээний хариугаа аваарай . Бид таны эрүүл мэндийг хамгаалах үүднээс хамгийн сүүлийн үеийн технологиудыг ашиглан танд туслах болно.
        </p>

        <motion.div whileHover={{ scale: 1.05 }}>
           <div className="hidden md:flex space-x-4 justify-center mt-10">
          <Button className="bg-purple-600 hover:bg-purple-700 transition duration-300 text-white px-5">
          Шинжилгээний хариу
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 transition duration-300 text-white px-5">
          Зөвлөгөө авах
        </Button>
        </div>
        </motion.div>

        <div className="flex items-center justify-center mt-10 space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <Avatar key={i} className="-ml-2 border-2 border-white shadow-md">
              <AvatarImage src={`https://i.pravatar.cc/150?img=${i}`} />
            </Avatar>
          ))}
          <div className="text-sm text-gray-700 ml-3 text-left">
            <span className="font-bold text-lg">1.2M+</span><br />
            <span className="text-xs">Идэвхтэй хэрэглэгчид<br />дэлхий даяар</span>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
