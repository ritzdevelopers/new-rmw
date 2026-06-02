"use client";

import Image from "next/image";
import { useGesture } from "@use-gesture/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY_IMAGES } from "./gallery-images";
import "./vision-orbit-gallery.css";

const CARD_ANGLE = 48;
const CARD_SPACING_EXTRA = 56;
const ALL_PHOTOS_ANIM_MS = 480;
const DRAG_THRESHOLD = 0.22;

function preloadImages(sources: readonly string[]): Promise<void> {
  if (sources.length === 0) return Promise.resolve();
  return new Promise((resolve) => {
    let done = 0;
    const tick = () => {
      done += 1;
      if (done >= sources.length) resolve();
    };
    sources.forEach((src) => {
      const img = new window.Image();
      img.onload = tick;
      img.onerror = tick;
      img.src = src;
    });
  });
}

function WindowsLoadingDots() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5"
      role="status"
      aria-live="polite"
      aria-label="Loading gallery"
    >
      <div className="flex items-end gap-[5px]" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="carousel-3d-loader-dot h-2 w-2 rounded-full bg-[#0078D4] sm:h-2.5 sm:w-2.5"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
      <p className="text-sm text-white/55">Loading gallery</p>
    </div>
  );
}

function shortestOffset(i: number, center: number, count: number) {
  let offset = i - center;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;
  return offset;
}

function getCardStyle(offset: number, gapPx: number) {
  const abs = Math.abs(offset);
  const x = offset * gapPx;
  const rotateY = offset * -CARD_ANGLE;
  const scale = abs < 0.05 ? 1 : Math.max(0.82, 1 - abs * 0.09);
  const opacity = abs > 2.6 ? 0 : Math.max(0.35, 1 - abs * 0.18);
  const zIndex = Math.round(20 - abs * 4);

  return {
    transform: `translateX(${x}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex,
    pointerEvents: (abs < 1.2 ? "auto" : "none") as React.CSSProperties["pointerEvents"],
    className: abs < 0.55 ? "is-center" : "",
  };
}

export default function VisionOrbitGallery() {
  const count = GALLERY_IMAGES.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [allPhotosOpen, setAllPhotosOpen] = useState(false);
  const [allPhotosClosing, setAllPhotosClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [gapPx, setGapPx] = useState(280);
  const [portalReady, setPortalReady] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const movedRef = useRef(false);

  activeRef.current = activeIndex;
  dragOffsetRef.current = dragOffset;

  const centerOffset = activeIndex + dragOffset;

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    preloadImages(GALLERY_IMAGES).then(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const syncGap = () => {
      const w = el.clientWidth;
      const cardW = Math.min(360, Math.max(240, w * 0.42));
      setGapPx(Math.min(440, Math.max(300, cardW + CARD_SPACING_EXTRA)));
    };
    syncGap();
    const ro = new ResizeObserver(syncGap);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isLoading]);

  const snapTo = useCallback((index: number) => {
    setActiveIndex(((index % count) + count) % count);
    setDragOffset(0);
    dragOffsetRef.current = 0;
  }, [count]);

  const go = useCallback(
    (dir: 1 | -1) => {
      snapTo(activeRef.current + dir);
    },
    [snapTo]
  );

  const openModal = useCallback(
    (index: number) => {
      const i = ((index % count) + count) % count;
      setModalIndex(i);
      snapTo(i);
    },
    [count, snapTo]
  );

  const closeModal = useCallback(() => setModalIndex(null), []);

  const openAllPhotos = useCallback(() => {
    setAllPhotosClosing(false);
    setAllPhotosOpen(true);
  }, []);

  const closeAllPhotos = useCallback(() => {
    if (!allPhotosOpen || allPhotosClosing) return;
    setAllPhotosClosing(true);
    window.setTimeout(() => {
      setAllPhotosOpen(false);
      setAllPhotosClosing(false);
    }, ALL_PHOTOS_ANIM_MS);
  }, [allPhotosOpen, allPhotosClosing]);

  const modalGo = useCallback(
    (dir: 1 | -1) => {
      setModalIndex((prev) => {
        if (prev === null) return null;
        const next = (prev + dir + count) % count;
        snapTo(next);
        return next;
      });
    },
    [count, snapTo]
  );

  const visibleIndices = useMemo(() => {
    const center = Math.round(centerOffset);
    const set = new Set<number>();
    for (let d = -3; d <= 3; d++) {
      set.add(((center + d) % count + count) % count);
    }
    return Array.from(set);
  }, [centerOffset, count]);

  useGesture(
    {
      onDragStart: () => {
        setIsDragging(true);
        movedRef.current = false;
      },
      onDrag: ({ movement: [mx], last }) => {
        const offset = -mx / gapPx;
        if (Math.abs(offset - dragOffsetRef.current) > 0.05) movedRef.current = true;
        dragOffsetRef.current = offset;
        setDragOffset(offset);

        if (last) {
          setIsDragging(false);
          const total = activeRef.current + dragOffsetRef.current;
          const next = Math.round(total);
          const frac = total - next;
          if (Math.abs(frac) > DRAG_THRESHOLD) {
            snapTo(next + (frac > 0 ? 1 : -1));
          } else {
            snapTo(next);
          }
          setTimeout(() => {
            movedRef.current = false;
          }, 120);
        }
      },
    },
    { target: stageRef, eventOptions: { passive: true } }
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (modalIndex !== null) closeModal();
        else if (allPhotosOpen || allPhotosClosing) closeAllPhotos();
        return;
      }
      if (modalIndex !== null) {
        if (e.key === "ArrowLeft") modalGo(-1);
        if (e.key === "ArrowRight") modalGo(1);
        return;
      }
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalIndex, allPhotosOpen, allPhotosClosing, closeModal, closeAllPhotos, modalGo, go]);

  useEffect(() => {
    if (modalIndex === null && !allPhotosOpen && !allPhotosClosing) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalIndex, allPhotosOpen, allPhotosClosing]);

  const handleCardClick = (index: number) => {
    if (movedRef.current) return;
    openModal(index);
  };

  if (isLoading) {
    return (
      <section className="carousel-3d-root">
        <WindowsLoadingDots />
      </section>
    );
  }

  const modalSrc =
    modalIndex !== null ? GALLERY_IMAGES[modalIndex] : null;

  const allPhotosMounted = allPhotosOpen || allPhotosClosing;

  const allPhotosModal =
    portalReady && allPhotosMounted ? (
      <div
        className={`carousel-3d-all-modal ${allPhotosClosing ? "is-closing" : "is-open"}`}
        role="dialog"
        aria-modal="true"
        aria-label="All gallery photos"
        onClick={closeAllPhotos}
      >
        <div
          className="carousel-3d-all-modal-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="carousel-3d-all-modal-header">
            <button
              type="button"
              className="carousel-3d-all-modal-close"
              onClick={closeAllPhotos}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="carousel-3d-all-modal-scroll">
            <div className="carousel-3d-grid">
              {GALLERY_IMAGES.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className="carousel-3d-grid-item"
                  onClick={() => openModal(i)}
                  aria-label={`Open photo ${i + 1} of ${count}`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, 280px"
                    className="carousel-3d-card-img"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    ) : null;

  const lightboxModal =
    portalReady && modalSrc !== null && modalIndex !== null ? (
      <div
        className="carousel-3d-modal carousel-3d-modal--lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Full size photo"
        onClick={closeModal}
      >
        <div
          className="carousel-3d-modal-toolbar carousel-3d-modal-toolbar--end"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="carousel-3d-modal-close"
            onClick={closeModal}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="carousel-3d-modal-body"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="carousel-3d-modal-nav carousel-3d-modal-nav--left"
            onClick={() => modalGo(-1)}
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="carousel-3d-modal-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={modalSrc} alt="" />
          </div>

          <button
            type="button"
            className="carousel-3d-modal-nav carousel-3d-modal-nav--right"
            onClick={() => modalGo(1)}
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    ) : null;

  return (
    <section className="carousel-3d-root" aria-label="3D carousel gallery">
      <div className="carousel-3d-bg" aria-hidden>
        <div className="carousel-3d-bg-mesh" />
        <div className="carousel-3d-bg-orb carousel-3d-bg-orb--1" />
        <div className="carousel-3d-bg-orb carousel-3d-bg-orb--2" />
        <div className="carousel-3d-bg-orb carousel-3d-bg-orb--3" />
        <div className="carousel-3d-bg-vignette" />
      </div>

      <div className="carousel-3d-content">
      <div className="carousel-3d-wrap">
        <div className="carousel-3d-inner">
        <button
          type="button"
          className="carousel-3d-arrow carousel-3d-arrow--left"
          onClick={() => go(-1)}
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </button>

        <div ref={stageRef} className="carousel-3d-stage">
          <div className="carousel-3d-track">
            {visibleIndices.map((i) => {
              const src = GALLERY_IMAGES[i];
              const offset = shortestOffset(i, centerOffset, count);
              const style = getCardStyle(offset, gapPx);

              return (
                <div
                  key={src}
                  className={`carousel-3d-card ${style.className} ${isDragging ? "is-dragging" : ""}`}
                  style={{
                    transform: style.transform,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                    pointerEvents: style.pointerEvents,
                  }}
                >
                  <button
                    type="button"
                    className="carousel-3d-card-inner"
                    onClick={() => handleCardClick(i)}
                    aria-label={`Open photo ${i + 1} of ${count}`}
                    aria-current={i === activeIndex ? "true" : undefined}
                  >
                    <div className="carousel-3d-card-media">
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 85vw, 360px"
                        className="carousel-3d-card-img"
                        draggable={false}
                        priority={Math.abs(offset) < 1}
                      />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="carousel-3d-arrow carousel-3d-arrow--right"
          onClick={() => go(1)}
          aria-label="Next photo"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </button>
        </div>
      </div>

      <div className="carousel-3d-view-all-wrap">
        <button
          type="button"
          className="carousel-3d-view-all-btn"
          onClick={openAllPhotos}
        >
          View all photos
        </button>
      </div>

      {portalReady &&
        createPortal(
          <>
            {allPhotosModal}
            {lightboxModal}
          </>,
          document.body
        )}
      </div>
    </section>
  );
}
