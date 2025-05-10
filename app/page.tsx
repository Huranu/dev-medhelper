"use client";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [stage, setStage] = useState<"roll" | "pause" | "grow" | "split" | "done">("roll");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveringText, setHoveringText] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavigation = (path: string) => {
    setLoading(true);
    setTimeout(() => {
      router.push(path);
    }, 500); 
  };

  useEffect(() => {
    if (stage === "roll") {
      setTimeout(() => setStage("pause"), 100);
    } else if (stage === "pause") {
      setTimeout(() => setStage("grow"), 500);
    } else if (stage === "grow") {
      setTimeout(() => setStage("split"), 1000);
    } else if (stage === "split") {
      setTimeout(() => setStage("done"), 500);
    }
  }, [stage]);


  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const variants = {
  roll: {
    x: ["100vw", "50vw"],
    rotate: 360,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      bounce: 0.4, // adds bounce when reaching center
      duration: 1.5,
    },
  },
  pause: {
    x: "50vw",
    rotate: 360,
    transition: { duration: 0.6 },
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
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-300 px-6 py-10 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-blue-100 rounded-full blur-[120px] opacity-30 z-[-1] animate-pulse"></div>

      {/* Cursor */}
      <motion.div className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-0">
        <motion.div
          className="absolute w-50 h-50 rounded-full bg-purple-700 opacity-20 mix-blend-overlay blur-3xl"
          animate={{ left: mousePos.x - 128, top: mousePos.y - 128 }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
      </motion.div>

      {/* Rolling Ball */}
      <AnimatePresence>
        {stage !== "done" && (
          <motion.div
            className="fixed top-1/2 left-0 transform -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full z-50"
            animate={stage}
            variants={variants}
            initial="x:100"
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {stage === "done" && (
        <>
          <motion.header
            className="flex justify-between items-center px-6 py-4 bg-white shadow-md rounded-xl mb-12"
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
              onMouseEnter={() => setHoveringText(true)}
              onMouseLeave={() => setHoveringText(false)}
              className={`text-5xl md:text-6xl font-extrabold leading-tight text-center transition-colors duration-300 ${
                hoveringText ? "text-blue-700" : "text-gray-800"
              }`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="block">
                Таны <span role="img" aria-label="doctor">🧑‍⚕️</span>{" "}
                <span className="text-blue-600">Эрүүл мэнд</span>
              </span>
              <span className="block mt-2 text-black">бидний эрхэм зорилго</span>
            </motion.h1>

            <motion.p
              className="text-md md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Таны эрүүл мэндийн мэдээллийг бид хамгаалахад бид тусална...
            </motion.p>

            <motion.div
              className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {loading && (
        <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
<div className="fixed inset-0 bg-white flex justify-center items-center z-50">
  <div className="border-8 border-t-8 border-blue-500 border-solid rounded-full w-24 h-24 animate-spin"></div>
</div>
        </div>
      )}
              <Button
                className="bg-blue-600 hover:bg-purple-700 transition duration-300 text-white text-[15px] px-6 py-3 rounded-2xl w-[200px] h-[50px]"
                onClick={() => handleNavigation("/lab-test")}
              >
                🧪 Шинжилгээний хариу
              </Button>
              <Button
                className="bg-blue-600 hover:bg-purple-700 transition duration-300 text-white text-[15px]  px-6 py-3 rounded-2xl w-[200px] h-[50px]"
                onClick={() => handleNavigation("/advice")}
              >
                💬 Зөвлөгөө авах
              </Button>
            </motion.div>
          </motion.section>

          <motion.footer
            className="text-center text-gray-600 mt-20 pt-10 "
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
