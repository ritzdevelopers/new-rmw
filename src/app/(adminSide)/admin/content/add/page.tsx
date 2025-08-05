"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";

interface ParentService {
  id: string;
  title: string;
}

const Page = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [parentServices, setParentServices] = useState<ParentService[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    service2_id: "",
    image: null as File | null,
  });

  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const objectUrl = URL.createObjectURL(file);
      setPreviewURL(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image || !formData.title || !formData.service2_id) {
      alert("Please fill all required fields.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("service2_id", formData.service2_id);
    data.append("image_url", formData.image);

    try {
      const {status} = await axios.post("/api/your-endpoint", data);
      console.log(status);
      alert("Card successfully created!");
    } catch (error) {
      console.error("Failed to submit:", error);
      alert("Error occurred while submitting.");
    }
  };

  const getAllServiceSecondIDs = async () => {
    try {
      const { data } = await axios.get("/api/sql-single-page-card/get-service-scnd-ids");
      setParentServices(data.data[0]);
      // console.log(data.data);
      
    } catch (error) {
      console.error("Error fetching service IDs:", error);
    }
  };

  useEffect(() => {
    getAllServiceSecondIDs();
    return () => {
      // Clean up object URLs
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, []);

  return (
    <div className={styles.cardContainer}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.cardForm}>
        <div className={styles.imageSection} onClick={() => fileRef.current?.click()}>
          {previewURL ? (
            <Image
              src={previewURL}
              alt="Preview"
              width={300}
              height={200}
              className={styles.previewImage}
            />
          ) : (
            <div className={styles.imagePlaceholder}>Click to Upload Image</div>
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileRef}
            onChange={handleImageChange}
          />
        </div>

        <input
          type="text"
          name="title"
          placeholder="Title"
          className={styles.input}
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className={styles.textarea}
          value={formData.description}
          onChange={handleChange}
        />

        {parentServices.length > 0 ? (
          <select
            name="service2_id"
            value={formData.service2_id}
            onChange={handleChange}
            className={styles.input}
            required
          >
            <option value="">Select Parent Service</option>
            {parentServices.map((ser) => (
              <option key={ser.id} value={ser.id}>
                {ser.title}
              </option>
            ))}
          </select>
        ) : (
          <p className={styles.loadingText}>Loading services...</p>
        )}

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;