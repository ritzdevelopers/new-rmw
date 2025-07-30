"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Editor from "@/components/Editor/Editor";
import axios, { AxiosError } from "axios";

const Page = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [formValues, setFormValues] = useState({
    topicTitle: "",
    metaKeyWords: "",
    metaDescription: "",
    isActive: "true",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("topicTitle", formValues.topicTitle);
    formData.append("description", description);
    formData.append("metaKeyWords", formValues.metaKeyWords);
    formData.append("metaDescription", formValues.metaDescription);
    formData.append("isActive", formValues.isActive);
    if (selectedImage) {
      formData.append("topicImg", selectedImage);
    }
    try {
      const { status } = await axios.post(
        "/api/ritz_webStoryTopics/add-story-topic",
        formData
      );
      console.log(status);

      if (status === 201) {
        alert("Web story posted successfully!");
        setFormValues({
          topicTitle: "",
          metaKeyWords: "",
          metaDescription: "",
          isActive: "true",
        });
        setDescription("");
        setImagePreview(null);
      }
    } catch (error) {
      const err = error as AxiosError;


      console.log("There are some errors in add web story topic", err);
    }
  };

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.heading}>Create New Story Topic</h1>

        <input
          type="text"
          name="topicTitle"
          className={styles.input}
          placeholder="Topic Title"
          required
          value={formValues.topicTitle}
          onChange={handleInputChange}
        />

        <Editor value={description} onChange={setDescription} />

        <input
          type="text"
          name="metaKeyWords"
          className={styles.input}
          placeholder="Meta Keywords"
          required
          value={formValues.metaKeyWords}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="metaDescription"
          className={styles.input}
          placeholder="Meta Description"
          required
          value={formValues.metaDescription}
          onChange={handleInputChange}
        />

        <select
          name="isActive"
          className={styles.select}
          value={formValues.isActive}
          onChange={handleInputChange}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <label className={styles.imageLabel}>
          Upload Topic Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
        </label>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className={styles.previewImage}
          />
        )}

        <button type="submit" className={styles.button}>
          Save Topic
        </button>
      </form>
    </section>
  );
};

export default Page;
