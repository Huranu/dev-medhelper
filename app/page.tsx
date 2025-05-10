"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [stage, setStage] = useState<"roll" | "pause" | "grow" | "split" | "done">("roll");

  useEffect(() => {
    if (stage === "roll") {
      setTimeout(() => setStage("pause"), 1500); 
    } else if (stage === "pause") {
      setTimeout(() => setStage("grow"), 500); 
    } else if (stage === "grow") {
      setTimeout(() => setStage("split"), 1000); 
    } else if (stage === "split") {
      setTimeout(() => setStage("done"), 500); 
    }
  }, [stage]);

  const variants = {
    roll: {
      x: "50vw", 
      rotate: 360,
      transition: { duration: 1.5, ease: "easeInOut" },
    },
    pause: {
      x: "50vw",
      rotate: 360,
      transition: { duration: 0.6},
    },
    grow: {
      scale: 12,
      transition: { duration: 1 },
    },
    split: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-10 overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-blue-100 rounded-full blur-[120px] opacity-30 z-[-1] animate-pulse"></div>

      <AnimatePresence>
        {stage !== "done" && (
          <motion.div
            className="fixed top-1/2 left-0 transform -translate-y-1/2 w-24 h-24 bg-blue-600 rounded-full z-50"
            animate={stage}
            variants={variants}
            initial="roll"
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {stage === "done" && (
        <>
          <motion.header
            className="flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-xl mb-12 border"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-2xl font-extrabold text-blue-700">MedHelper</div>
          </motion.header>

          <motion.section
            className="text-center space-y-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-800"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="block">
                Таны <span role="img" aria-label="doctor">🧑‍⚕️</span>{" "}
                <span className="text-blue-600">Эрүүл мэнд</span>
              </span>
              <span className="block mt-2 text-black">Бидний үйлчилгээ</span>
            </motion.h1>

            <motion.p
              className="text-md md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Таны эрүүл мэндийн мэдээллийг бид хамгаална...
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button
                className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-xl"
                onClick={() => router.push("/lab-test")}
              >
                🧪 Шинжилгээний хариу
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-6 py-3 rounded-xl"
                onClick={() => router.push("/advice")}
              >
                💬 Зөвлөгөө авах
              </Button>
            </motion.div>
          </motion.section>

          <motion.footer
            className="text-center text-gray-600 mt-70 pt-10 border-t"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            © 2025 MedHelper. Эрүүл мэнд таны гарт.
          </motion.footer>
        </>
      )}
    </main>
  );
}
