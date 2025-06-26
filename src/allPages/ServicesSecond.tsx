'use client';

import React, { useEffect, useState } from 'react';
import SwiperHome from "./Homepage/SwiperHome";
import Service from "./Homepage/Service";
import Footer from "@/components/footer/Footer";
import ServiceFirst from "./serviceSecondPage/ServiceFirst";
import ServiceImg from "./serviceSecondPage/ServiceImg";
import Feedback from './Homepage/Feedback';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ServiceEndTag from "@/components/endTag/serviceEndTag";
import Loader from '@/components/loader/Loader';


type CardItem = {
  title: string;
  imgSrc: string;
  description: string;
  link: string;
};

const ServicesSecondPage = () => {
  const [card, setCard] = useState<CardItem[]>([]);
  const [head, setHead] = useState<string | null>(null);
  const [img1, setImg1] = useState<string | null>(null);
  const [img2, setImg2] = useState<string | null>(null);
  const [para, setPara] = useState<string | null>(null);
  const [endTag, setEndTag] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const serviceSecond = params?.secondPage as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/services/${serviceSecond}`);
        
        const updatedCards: CardItem[] = response.data.cards.map((item: CardItem) => ({
          ...item,
          link: `${serviceSecond}/${item.link}`,
        }));
        setCard(updatedCards);
        setHead(response.data.s2heading)
        setPara(response.data.s2para)
        setEndTag(response.data.s2endtag)
        setImg1(response.data.img1)
        setImg2(response.data.img2)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceSecond]);

  if (loading) return <div><Loader /></div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <>
      <ServiceFirst heading={head} image1={img1} image2={img2}/>
      <SwiperHome />
      <p style={{
              position: "relative",
              padding: "20px 10px",
              maxWidth: "950px",
              fontSize: "19px",
              left: "50%",
              transform: "translate(-50%)",
              textAlign: "center"
            }}>{para}</p>
      <Service data={card} />
      <ServiceImg />
      <Feedback />
      <ServiceEndTag endtag={endTag}/>
      <Footer />
    </>
  );
};

export default ServicesSecondPage;
