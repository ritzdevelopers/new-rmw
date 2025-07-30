"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Editor from "@/components/Editor/Editor";
import { useParams } from "next/navigation";
import axios from "axios";

interface TOPICINTERFACE {
  _id: string;
  topicTitle: string;
  description: string;
  metaKeyWords: string;
  metaDescription: string;
  topicImg: string;
  pages: number;
  isActive: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

function Page() {
  const [topic, setTopic] = useState<TOPICINTERFACE | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const params = useParams();
  const slug = params.slug as string;

  const getTopicInfo = async () => {
    try {
      const { data } = await axios.get(
        `/api/ritz_webStoryTopics/get-single-topic/${slug}`
      );
      setTopic(data.singleStoryTopic);

      // Show image preview
      const imgPath = `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images/${
        data.singleStoryTopic.topicImg.split("images")[1]
      }`;
      setImagePreview(imgPath);
    } catch (error) {
      console.error("Error fetching topic:", error);
    }
  };

  useEffect(() => {
    if (slug) getTopicInfo();
  }, [slug]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic) return;

    const formData = new FormData();
    formData.append("topicTitle", topic.topicTitle);
    formData.append("description", topic.description);
    formData.append("metaKeyWords", topic.metaKeyWords);
    formData.append("metaDescription", topic.metaDescription);
    formData.append("slug", topic.slug);

    if (imageFile) {
      formData.append("topicImg", imageFile);
    }

    try {
      const { status } = await axios.patch(
        `/api/ritz_webStoryTopics/update-story-topic/${topic._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (status === 200) {
        alert("Topic updated successfully!");
      }
    } catch (error) {
      console.error("Error updating topic:", error);
      alert("Update failed!");
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Update Topic</h1>

      {topic && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Topic Title</label>
          <input
            className={styles.input}
            type="text"
            name="topicTitle"
            value={topic.topicTitle}
            onChange={(e) => setTopic({ ...topic, topicTitle: e.target.value })}
            required
          />

          <label className={styles.label}>Description</label>
          <Editor
            value={topic.description}
            onChange={(val: string) => setTopic({ ...topic, description: val })}
          />
          <input type="hidden" name="description" value={topic.description} />

          <label className={styles.label}>Meta Keywords</label>
          <input
            className={styles.input}
            type="text"
            name="metaKeyWords"
            value={topic.metaKeyWords}
            onChange={(e) =>
              setTopic({ ...topic, metaKeyWords: e.target.value })
            }
            required
          />

          <label className={styles.label}>Meta Description</label>
          <input
            className={styles.input}
            type="text"
            name="metaDescription"
            value={topic.metaDescription}
            onChange={(e) =>
              setTopic({ ...topic, metaDescription: e.target.value })
            }
            required
          />

          <label className={styles.label}>Upload Topic Image</label>
          <input
            className={styles.input}
            type="file"
            name="topicImg"
            accept="image/*"
            onChange={handleImageChange}
          />

          {imagePreview && (
            <img src={imagePreview} alt="Preview" className={styles.topicImg} />
          )}

          <button type="submit" className={styles.button}>
            Update Topic
          </button>
        </form>
      )}
    </section>
  );
}

export default Page;
