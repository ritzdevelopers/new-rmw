"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, MapPin, Globe, Clock, Users, BookOpen, DollarSign, ChevronLeft, ChevronRight, X, Eye, Plus } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

interface NewspaperData {
  _id: string;
  paperName: string;
  slug: string;
  language: string;
  logoImg: string;
  price: number;
  spendType: string;
  location: {
    city: string;
    area: string;
    state: string;
    country: string;
  };
  areaCovered: string;
  category: string;
  publications: string;
  frequency: string;
  position: string;
  circulation: string;
  readership: string;
  title: string;
  desc: string;
  metaTitle: string;
  metaDesc: string;
}

interface AdvertisementData {
  _id: string;
  adtype: string;
  slug: string;
  adDesc: string;
  imgs: string[];
  baseRate: number;
  quantity: string;
  adLabel: string;
  adTiming: string;
  details: string;
  category: "Top Choice" | "Other Ad Options";
  parentID: string;
  metaTitle: string;
  metaDesc: string;
}

interface ApiResponse {
  newspaper: NewspaperData;
  advertisements: AdvertisementData[];
}

// Image Slider Component
interface ImageSliderProps {
  images: string[];
  adType: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, adType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) return null;

  return (
    <div className={styles.imageSliderContainer}>
      <div 
        className={styles.imageSlider}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/images${img.split("/images")[1]}`}
            alt={`${adType} example ${index + 1}`}
            width={400}
            height={200}
            className={styles.sliderImage}
          />
        ))}
      </div>
      
      {images.length > 1 && (
        <>
          <button 
            className={`${styles.sliderControls} ${styles.sliderPrev}`}
            onClick={prevImage}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className={`${styles.sliderControls} ${styles.sliderNext}`}
            onClick={nextImage}
          >
            <ChevronRight size={20} />
          </button>
          <div className={styles.sliderDots}>
            {images.map((_, index) => (
              <button
                key={index}
                className={`${styles.sliderDot} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const NewspaperDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState<AdvertisementData | null>(null);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/newspaper-ads/${slug}`);
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || "Failed to fetch newspaper data");
        }
      } catch (err) {
        setError("Failed to fetch newspaper data. Please try again.");
        console.error("Error fetching newspaper data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  // Modal handlers
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted:', contactForm);
    setShowContactModal(false);
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const handleSeeMore = (ad: AdvertisementData) => {
    setSelectedAd(ad);
    setShowCardModal(true);
  };

  const handleAddToBag = () => {
    setShowContactModal(true);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading newspaper details...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.errorContainer}>
        <p>Error: {error || "Newspaper not found"}</p>
        <Link href="/services/print-advertising/newspaper-ad-rates" className={styles.backButton}>
          <ArrowLeft size={16} />
          Back to Newspapers
        </Link>
      </div>
    );
  }

  const { newspaper, advertisements } = data;

  // Group advertisements by category
  const topChoiceAds = advertisements.filter(ad => ad.category === "Top Choice");
  const otherAds = advertisements.filter(ad => ad.category === "Other Ad Options");

  return (
    <>
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Link href="/services/print-advertising/newspaper-ad-rates" className={styles.backButton}>
          <ArrowLeft size={20} />
          Back to Newspapers
        </Link>
      </div>

      {/* Newspaper Info Section */}
      <div className={styles.newspaperInfo}>
        <div className={styles.newspaperHeader}>
          <div className={styles.logoContainer}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/images${newspaper.logoImg.split("/images")[1]}`}
              alt={`${newspaper.paperName} logo`}
              width={120}
              height={120}
              className={styles.logo}
            />
          </div>
          <div className={styles.newspaperDetails}>
            <h1 className={styles.newspaperName}>{newspaper.paperName}</h1>
            <div className={styles.newspaperMeta}>
              <div className={styles.metaItem}>
                <MapPin size={16} />
                <span>{newspaper.location.city}, {newspaper.location.state}</span>
              </div>
              <div className={styles.metaItem}>
                <Globe size={16} />
                <span>{newspaper.language}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={16} />
                <span>{newspaper.frequency}</span>
              </div>
              <div className={styles.metaItem}>
                <Users size={16} />
                <span>Circulation: {newspaper.circulation}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.newspaperStats}>
          <div className={styles.statCard}>
            <DollarSign size={24} />
            <div>
              <h3>Starting Price</h3>
              <p>₹ {newspaper.price.toLocaleString('en-IN')}</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <BookOpen size={24} />
            <div>
              <h3>Readership</h3>
              <p>{newspaper.readership}</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <MapPin size={24} />
            <div>
              <h3>Area Covered</h3>
              <p>{newspaper.areaCovered}</p>
            </div>
          </div>
        </div>

        {/* Add To Bag Button */}
        <div className={styles.addToBagSection}>
          <button className={styles.addToBagButton} onClick={handleAddToBag}>
            <Plus size={20} />
            Add To Bag
          </button>
        </div>
      </div>

      {/* Advertisements Section */}
      <div className={styles.advertisementsSection}>
        <h2 className={styles.sectionTitle}>Available Advertisement Options</h2>
        
        {/* Top Choice Advertisements */}
        {topChoiceAds.length > 0 && (
          <div className={styles.adCategory}>
            <h3 className={styles.categoryTitle}>Top Choice</h3>
            <div className={styles.adGrid}>
              {topChoiceAds.map((ad) => (
                <div key={ad._id} className={styles.adCard}>
                  <ImageSlider images={ad.imgs} adType={ad.adtype} />
                  <div className={styles.adCardContent}>
                    <div className={styles.adHeader}>
                      <h4 className={styles.adType}>{ad.adtype}</h4>
                      <span className={styles.adPrice}>₹ {ad.baseRate.toLocaleString('en-IN')}</span>
                    </div>
                    <p className={styles.adDesc}>{ad.adDesc}</p>
                    <div className={styles.adDetails}>
                      <div className={styles.adDetailItem}>
                        <strong>Quantity:</strong> {ad.quantity}
                      </div>
                      <div className={styles.adDetailItem}>
                        <strong>Timing:</strong> {ad.adTiming}
                      </div>
                      {ad.adLabel && (
                        <div className={styles.adDetailItem}>
                          <strong>Label:</strong> {ad.adLabel}
                        </div>
                      )}
                    </div>
                    <div className={styles.cardActions}>
                      <button 
                        className={styles.seeMoreButton}
                        onClick={() => handleSeeMore(ad)}
                      >
                        <Eye size={16} />
                        Read
                      </button>
                      <button className={styles.bookButton}>
                        Book This Ad
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Ad Options */}
        {otherAds.length > 0 && (
          <div className={styles.adCategory}>
            <h3 className={styles.categoryTitle}>Other Ad Options</h3>
            <div className={styles.adGrid}>
              {otherAds.map((ad) => (
                <div key={ad._id} className={styles.adCard}>
                  <ImageSlider images={ad.imgs} adType={ad.adtype} />
                  <div className={styles.adCardContent}>
                    <div className={styles.adHeader}>
                      <h4 className={styles.adType}>{ad.adtype}</h4>
                      <span className={styles.adPrice}>₹ {ad.baseRate.toLocaleString('en-IN')}</span>
                    </div>
                    <p className={styles.adDesc}>{ad.adDesc}</p>
                    <div className={styles.adDetails}>
                      <div className={styles.adDetailItem}>
                        <strong>Quantity:</strong> {ad.quantity}
                      </div>
                      <div className={styles.adDetailItem}>
                        <strong>Timing:</strong> {ad.adTiming}
                      </div>
                      {ad.adLabel && (
                        <div className={styles.adDetailItem}>
                          <strong>Label:</strong> {ad.adLabel}
                        </div>
                      )}
                    </div>
                    <div className={styles.cardActions}>
                      <button 
                        className={styles.seeMoreButton}
                        onClick={() => handleSeeMore(ad)}
                      >
                        <Eye size={16} />
                        Read
                      </button>
                      <button className={styles.bookButton}>
                        Book This Ad
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {advertisements.length === 0 && (
          <div className={styles.noAdsContainer}>
            <p>No advertisements available for this newspaper at the moment.</p>
          </div>
        )}
      </div>

    </div>

    {/* Contact Modal */}
    {showContactModal && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h3>Add To Bag - Contact Us</h3>
            <button 
              className={styles.closeButton}
              onClick={() => setShowContactModal(false)}
            >
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleContactSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                value={contactForm.phone}
                onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                rows={4}
              />
            </div>
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={() => setShowContactModal(false)}>
                Cancel
              </button>
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Card Details Modal */}
    {showCardModal && selectedAd && (
      <div className={styles.modalOverlay}>
        <div className={styles.cardModalContent}>
          <div className={styles.modalHeader}>
            <h3>{selectedAd?.adtype} - Full Details</h3>
            <button 
              className={styles.closeButton}
              onClick={() => setShowCardModal(false)}
            >
              <X size={24} />
            </button>
          </div>
          <div className={styles.cardModalBody}>
            <div className={styles.cardModalImages}>
              <ImageSlider images={selectedAd?.imgs || []} adType={selectedAd?.adtype || ''} />
            </div>
            <div className={styles.cardModalDetails}>
              <div className={styles.cardModalHeader}>
                <h4>{selectedAd?.adtype}</h4>
                <span className={styles.cardModalPrice}>₹ {selectedAd?.baseRate?.toLocaleString('en-IN')}</span>
              </div>
              <p className={styles.cardModalDesc}>{selectedAd?.adDesc}</p>
              <div className={styles.cardModalInfo}>
                <div className={styles.infoItem}>
                  <strong>Quantity:</strong> {selectedAd?.quantity}
                </div>
                <div className={styles.infoItem}>
                  <strong>Timing:</strong> {selectedAd?.adTiming}
                </div>
                {selectedAd?.adLabel && (
                  <div className={styles.infoItem}>
                    <strong>Label:</strong> {selectedAd?.adLabel}
                  </div>
                )}
              </div>
              <div className={styles.cardModalActions}>
                <button className={styles.addToBagButton} onClick={handleAddToBag}>
                  <Plus size={20} />
                  Add To Bag
                </button>
                <button className={styles.bookButton}>
                  Book This Ad
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default NewspaperDetailPage;