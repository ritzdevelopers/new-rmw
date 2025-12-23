import S1 from '@/components/home-v3/S1';
import S2 from '@/components/home-v3/S2';
import S3 from '@/components/home-v3/S3';
import S4 from '@/components/home-v3/S4';
import S5 from '@/components/home-v3/S5';
import S6 from '@/components/home-v3/S6';
import S7 from '@/components/home-v3/S7';
import S8 from '@/components/home-v3/S8';
import React from 'react';
import styles from './page.module.css';

function page() {
  return (
    <>
      {/* Hero Section - Full Width */}
      <S1></S1>
      
      {/* Other Sections - Fixed Width Above 1440px */}
      <div className={styles.container}>
        <S2></S2>
        <S3></S3>
        <S4></S4>
        <S5></S5>
        <S6></S6>
        <S7></S7>
        <S8></S8>
      </div>
    </>
  )
}

export default page;