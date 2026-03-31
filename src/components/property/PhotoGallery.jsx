import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Grid2x2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function PhotoGallery({ images }) {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const displayImages = images?.length > 0
    ? images
    : [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
      ];

  return (
    <>
      {/* Grid Gallery */}
      <div className="relative rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 max-h-[460px]">
          <div
            className="md:col-span-2 md:row-span-2 cursor-pointer"
            onClick={() => setLightboxIndex(0)}
          >
            <img
              src={displayImages[0]}
              alt="Main"
              className="w-full h-full object-cover hover:brightness-90 transition-all"
            />
          </div>
          {displayImages.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className="hidden md:block cursor-pointer"
              onClick={() => setLightboxIndex(i + 1)}
            >
              <img
                src={img}
                alt={`Photo ${i + 2}`}
                className="w-full h-full object-cover hover:brightness-90 transition-all"
              />
            </div>
          ))}
        </div>

        {displayImages.length > 5 && (
          <Button
            variant="outline"
            className="absolute bottom-4 right-4 bg-white font-medium text-sm rounded-lg gap-2"
            onClick={() => setShowAll(true)}
          >
            <Grid2x2 className="h-4 w-4" />
            Show all photos
          </Button>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[100] flex flex-col"
          >
            <div className="flex justify-between items-center p-4">
              <span className="text-white text-sm">
                {lightboxIndex + 1} / {displayImages.length}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLightboxIndex(null)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-1 flex items-center justify-center relative px-16">
              <img
                src={displayImages[lightboxIndex]}
                alt=""
                className="max-h-[80vh] max-w-full object-contain"
              />
              {lightboxIndex > 0 && (
                <button
                  onClick={() => setLightboxIndex(lightboxIndex - 1)}
                  className="absolute left-4 bg-white/20 hover:bg-white/30 rounded-full p-2"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
              )}
              {lightboxIndex < displayImages.length - 1 && (
                <button
                  onClick={() => setLightboxIndex(lightboxIndex + 1)}
                  className="absolute right-4 bg-white/20 hover:bg-white/30 rounded-full p-2"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}