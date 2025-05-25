"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAllLabtests } from "../test/queries";

const History: React.FC = () => {
  const [result, setResult] = useState<any>();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [labtests, setLabtests] = useState<any>();

  useEffect(() => {
    const fetchALL = async () => {
                const result = await getAllLabtests();
                console.log(result)
                setLabtests(result);
            };
            fetchALL();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="flex flex-col relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-300 px-6 py-4 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-0">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-blue-300 opacity-20 mix-blend-overlay blur-3xl"
          animate={{ left: mousePos.x - 128, top: mousePos.y - 128 }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        />
      </motion.div>
    </div>
  );
};

export default History;