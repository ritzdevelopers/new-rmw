"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

"use client";
// import { useParams } from "next/navigation";
import React from "react";

function Page() {
    // const params = useParams();
    // const {slug} = params;
    // const getSingleBlog = async ()=>{
    //   try {
    //     const {data} = await axios.get(`/api/blog/${slug}`);
    //      console.log(data);
         
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
    //   } catch (error) {
    //     console.log('====================================');
    //     console.log("There are some errors in fetching the single blog ", error);
    //     console.log('====================================');
    //     alert("Internal Server Error!");
    //   }
    // }
  return <div></div>;
}

export default Page;
