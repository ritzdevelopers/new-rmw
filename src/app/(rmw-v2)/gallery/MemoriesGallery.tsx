"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GALLERY_FEATURE_STRIP,
  GALLERY_FILTER_OPTIONS,
  GALLERY_HERO,
  GALLERY_IMAGES,
  GALLERY_MARQUEE_ITEMS,
  GALLERY_STATS,
  type GalleryCategory,
  type GalleryImage,
} from "./gallery-images";
import "./memories-gallery.css";

type FilterId = "all" | GalleryCategory;

export default function MemoriesGallery() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>(GALLERY_IMAGES);

  const visibleImages = useMemo(() => {
    if (activeFilter === "all") return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = useCallback((images: GalleryImage[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const navLightbox = useCallback(
    (dir: -1 | 1) => {
      setLightboxIndex(
        (prev) => (prev + dir + lightboxImages.length) % lightboxImages.length
      );
    },
    [lightboxImages.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navLightbox(1);
      if (e.key === "ArrowLeft") navLightbox(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen, closeLightbox, navLightbox]);

  const marqueeItems = [...GALLERY_MARQUEE_ITEMS, ...GALLERY_MARQUEE_ITEMS];

  return (
    <div className="memories-gallery">
      <div className="mg-page-bg" aria-hidden>
        <div className="mg-page-bg-mesh" />
        <div className="mg-page-bg-vignette" />
      </div>

      {/* Hero */}
      <section className="mg-hero">
        <div
          className="mg-hero-bg"
          style={{ backgroundImage: `url('${GALLERY_HERO.src}')` }}
          role="img"
          aria-label={GALLERY_HERO.label}
          title={GALLERY_HERO.title}
        />
        <div className="mg-hero-vignette" aria-hidden />
        <div className="mg-hero-content">
          <h1 className="mg-hero-heading">
            <span className="mg-hero-heading-white">Ritz Media World </span>
            <span className="mg-hero-heading-golden">Memories Gallery ✨</span>
            <span className="mg-hero-heading-white"> - Reliving Our Best Moments</span>
          </h1>
        </div>
        <div className="mg-hero-scroll" aria-hidden>
          <div className="mg-hero-scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* Stats */}
      <div className="mg-stats">
        {GALLERY_STATS.map((stat) => (
          <div key={stat.label} className="mg-stat-item">
            <div
              className="mg-stat-number"
            >
              {stat.number}
            </div>
            <div className="mg-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Feature strip */}
      <div className="mg-feature-strip">
        {GALLERY_FEATURE_STRIP.map((item) => {
          const globalIndex = GALLERY_IMAGES.findIndex((img) => img.src === item.src);
          return (
            <button
              key={item.src}
              type="button"
              className="mg-feature-item"
              onClick={() =>
                openLightbox(GALLERY_IMAGES, globalIndex >= 0 ? globalIndex : 0)
              }
              aria-label={`View ${item.label}`}
            >
              <Image
                src={item.src}
                alt={item.label}
                title={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="mg-feature-overlay">
                <span className="mg-feature-label">{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Marquee */}
      <div className="mg-marquee-wrap" aria-hidden>
        <div className="mg-marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={`${item}-${i}`} className="mg-marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mg-filter-bar">
        <h2 className="mg-filter-title">
          All <span>Memories</span>
        </h2>
        <div className="mg-filters" role="tablist" aria-label="Filter gallery">
          {GALLERY_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === opt.id}
              className={`mg-filter-btn${activeFilter === opt.id ? " active" : ""}`}
              onClick={() => setActiveFilter(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <section className="mg-gallery-section" aria-label="Photo gallery">
        <div className="mg-gallery-grid">
          {visibleImages.map((img, idx) => (
            <GalleryGridItem
              key={img.src}
              image={img}
              index={idx}
              onOpen={() => openLightbox(visibleImages, idx)}
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mg-divider">
        <div
          className="mg-divider-line"
          style={{
            background: "linear-gradient(to left, rgba(201,146,55,0.25), transparent)",
          }}
        />
        <span className="mg-divider-text">End of Gallery</span>
        <div className="mg-divider-line" />
      </div>

      {/* Lightbox */}
      <div
        className={`mg-lightbox${lightboxOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
      >
        <button
          type="button"
          className="mg-lightbox-close"
          onClick={closeLightbox}
          aria-label="Close viewer"
        >
          ✕
        </button>
        <button
          type="button"
          className="mg-lightbox-nav mg-lightbox-prev"
          onClick={() => navLightbox(-1)}
          aria-label="Previous image"
        >
          ‹
        </button>
        <div className="mg-lightbox-inner">
          {lightboxOpen && lightboxImages[lightboxIndex] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lightboxImages[lightboxIndex].src}
              alt={lightboxImages[lightboxIndex].label}
              title={lightboxImages[lightboxIndex].title}
            />
          )}
        </div>
        <button
          type="button"
          className="mg-lightbox-nav mg-lightbox-next"
          onClick={() => navLightbox(1)}
          aria-label="Next image"
        >
          ›
        </button>
      </div>
    </div>
  );
}

function GalleryGridItem({
  image,
  index,
  onOpen,
}: {
  image: GalleryImage;
  index: number;
  onOpen: () => void;
}) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <button
      type="button"
      className="mg-gallery-item"
      style={{ animationDelay: `${(index % 12) * 60}ms` }}
      onClick={onOpen}
      aria-label={`View ${image.label}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.label}
        title={image.title}
        loading="lazy"
        onError={() => setHidden(true)}
      />
      <div className="mg-gallery-item-label">
        <span>{image.label}</span>
      </div>
    </button>
  );
}
