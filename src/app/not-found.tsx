// app/not-found.tsx

'use client'


import React from "react";
import styles from "./not-found.module.css";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={`${styles.stars} ${styles.bgPurple}`}>
    <div className={styles.centralBody}>
      <Image
        className={styles.image404}
        src="http://salehriaz.com/404Page/img/404.svg"
        alt="404"
        width={300}
        height={200}
      />
      <Link
        href="/"
        className={styles.btnGoHome}
      >
        GO BACK HOME
      </Link>
    </div>

    <div className={styles.objects}>
      <Image
        className={styles.objectRocket}
        src="http://salehriaz.com/404Page/img/rocket.svg"
        alt="rocket"
        width={40}
        height={40}
      />

      <div className={styles.earthMoon}>
        <Image
          className={styles.objectEarth}
          src="http://salehriaz.com/404Page/img/earth.svg"
          alt="earth"
          width={100}
          height={100}
        />
        <Image
          className={styles.objectMoon}
          src="http://salehriaz.com/404Page/img/moon.svg"
          alt="moon"
          width={80}
          height={80}
        />
      </div>

      <div className={styles.boxAstronaut}>
        <Image
          className={styles.objectAstronaut}
          src="http://salehriaz.com/404Page/img/astronaut.svg"
          alt="astronaut"
          width={140}
          height={140}
        />
      </div>
    </div>

    <div className={styles.glowingStars}>
      <div className={styles.star}></div>
      <div className={styles.star}></div>
      <div className={styles.star}></div>
      <div className={styles.star}></div>
      <div className={styles.star}></div>
    </div>
  </div>
  )
}
