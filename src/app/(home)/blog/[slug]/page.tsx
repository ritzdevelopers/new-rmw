"use client"
import { useParams } from 'next/navigation';
import React from 'react';


function Page() {
    const params = useParams();
    const {slug} = params;
    alert(slug)
  return (
    <div>
      
    </div>
  )
}

export default Page