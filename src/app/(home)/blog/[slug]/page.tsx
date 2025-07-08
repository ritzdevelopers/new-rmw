"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';


function Page() {
    const params = useParams();
    const {slug} = params;
    const [singleBlog, setSingleBlog] = useState();
    const getSingleBlog = async ()=>{
      try {
        const {data} = await axios.get(`/api/blog/${slug}`);
        setSingleBlog(data.blog);
         
      } catch (error) {
        console.log('====================================');
        console.log("There are some errors in fetching the single blog ", error);
        console.log('====================================');
        alert("Internal Server Error!");
      }
    }
    useEffect(()=>{
      if(slug) {
        getSingleBlog();
      }
    }, [slug]);

    // id, _id, title, blogTitle, 
  return (
    <div>
      
    </div>
  )
}

export default Page