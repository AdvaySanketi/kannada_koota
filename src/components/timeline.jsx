"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { PragatiModal } from "@/components/pragatiModal";
import { PragatiSnackbar } from "@/components/snackbar";

export const Timeline = ({ data, currentStage }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const handleStageClick = (index) => {
    if (index === 0 && currentStage === 0) {
      setModalOpen(true);
    } else if (index === currentStage) {
      router.push(`/pragati/play?stage=${data[currentStage].title}`);
    }
  };

  const handleModalSubmit = async () => {
    setModalOpen(false);
    router.push(`/pragati/play?stage=${data[currentStage].title}`);
  };

  const closeSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <div
      className="w-full bg-[hsl(210,100%,12%)] text-[hsl(180,100%,90%)] "
      ref={containerRef}
    >
      {showSnackbar && (
        <PragatiSnackbar
          message={error}
          onClose={closeSnackbar}
          bgColor="black"
        />
      )}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div
                className={`h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center ${
                  index <= currentStage
                    ? "border border-[#00dbde] border-2"
                    : null
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full ${
                    index < currentStage ? "bg-[#00dbde]" : null
                  } border border-neutral-300 dark:border-neutral-700 p-2`}
                  onClick={() => {
                    if (index == currentStage) handleStageClick(index);
                  }}
                />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height:
                currentStage !== 4
                  ? currentStage !== 1
                    ? `${(currentStage / data.length) * 100}%`
                    : "25%"
                  : "78%",
              opacity: (currentStage / data.length) * 100 < 10 ? 0 : 1,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-[#8a00d4] via-[#00dbde] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
      {modalOpen && <PragatiModal onClose={() => handleModalSubmit()} />}
    </div>
  );
};
