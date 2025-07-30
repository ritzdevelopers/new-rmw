"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import Editor from "@/components/Editor/Editor";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface WebStory {
  title: string;
  description: string;
  titleAlign: string;
  buttonCTA: {
    btnTxt: string;
    btnLink: string;
    btnColor: string;
    btnTxtColor: string;
  };
  img: string;
  metaDescription: string;
  metaKeyWords: string;
  topic: string;
  descAlign: string;
}
interface TOPICS {
  topicTitle: string;
  _id: string;
}

const Page = () => {
  // const router = useRouter();
  const [story, setStory] = useState<WebStory>();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [previewImg, setPreviewImg] = useState<string>("");
  const params = useParams();
  const [imgFile, setImageFile] = useState<File | null>(null);
  const [topics, setTopics] = useState<TOPICS[]>([]);
  const { slug } = params;

  const getSingleStoryPage = async () => {
    try {
      const { data, status } = await axios.get(
        `/api/rizt_webStories/get-single-page/${slug}`
      );
      if (status === 200) {
        setLoading(false);
        setStory(data.singleStoryPage);
      }
    } catch (error) {
      console.log(
        "Internal Server Errors in get singleblog controller ",
        error
      );
    }
  };

  const getAllTopics = async () => {
    try {
      const { data, status } = await axios.get(
        "/api/ritz_webStoryTopics/get-all-topics"
      );
      if (status === 200) {
        setTopics(data.allTopics);
      }
    } catch (error) {
      console.log("There are some errors in fetching all topics ", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (slug) {
      getSingleStoryPage();
      getAllTopics();
    }
  }, [slug]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!story) return;

    try {
      const formData = new FormData();

      // Append primitive fields
      formData.append("title", story.title);
      formData.append("description", story.description);
      formData.append("titleAlign", story.titleAlign);
      formData.append("descAlign", story.descAlign);
      formData.append("metaDescription", story.metaDescription);
      formData.append("metaKeyWords", story.metaKeyWords);
      formData.append("topic", story.topic);

      // Append nested buttonCTA fields
      formData.append("buttonCTA[btnTxt]", story.buttonCTA.btnTxt);
      formData.append("buttonCTA[btnLink]", story.buttonCTA.btnLink);
      formData.append("buttonCTA[btnColor]", story.buttonCTA.btnColor);
      formData.append("buttonCTA[btnTxtColor]", story.buttonCTA.btnTxtColor);

      // Append image (assuming story.img is a string URL)
      if (imgFile) {
        formData.append("img", imgFile);
      }

      const { status, data } = await axios.patch(
        `/api/rizt_webStories/update-webStoryPage/${slug}`,
        formData
      );
      if (status === 200) {
        alert(data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while updating.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setStory((prev) =>
            prev && typeof reader.result === "string"
              ? { ...prev, img: reader.result }
              : prev
          );
          setPreviewImg(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!story) return <p className={styles.loading}>Story not found</p>;

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>Update Web Story</h1>
      {message && <p className={styles.message}>{message}</p>}

      <form
        onSubmit={handleUpdate}
        encType="multipart/formData"
        className={styles.form}
      >
        <label className={styles.label}>Title</label>
        <input
          className={styles.input}
          type="text"
          value={story.title}
          onChange={(e) => setStory({ ...story, title: e.target.value })}
          required
        />

        <label className={styles.label}>Description</label>
        <Editor
          value={story.description}
          onChange={(val: string) =>
            setStory((prev) => prev && { ...prev, description: val })
          }
        />

        <label className={styles.label}>Upload Image</label>
        <input
          className={styles.input}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {(previewImg || story.img) && (
          <img
            src={
              previewImg
                ? previewImg
                : `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images/${
                    story.img.split("images")[1]
                  }`
            }
            alt="Preview"
            className={styles.previewImg}
          />
        )}

        <label className={styles.label}>Meta Keywords</label>
        <input
          className={styles.input}
          type="text"
          value={story.metaKeyWords}
          onChange={(e) => setStory({ ...story, metaKeyWords: e.target.value })}
        />

        <label className={styles.label}>Meta Description</label>
        <input
          className={styles.input}
          type="text"
          value={story.metaDescription}
          onChange={(e) =>
            setStory({ ...story, metaDescription: e.target.value })
          }
        />

        <label className={styles.label}>Topic</label>
        <select
          name="topic"
          id="topic"
          className={styles.input}
          onChange={(e) => setStory({ ...story, topic: e.target.value })}
        >
          {topics &&
            topics
              .filter((topic) => topic._id === story.topic)
              .map((fTopic) => {
                return <option value={fTopic._id} key={fTopic._id}>{fTopic.topicTitle}</option>;
              })}
          {topics.map((topic) => {
            return <option value={topic._id} key={topic._id}>{topic.topicTitle}</option>;
          })}
        </select>

        <label className={styles.label}>Title Alignment</label>
        <select
          className={styles.select}
          value={story.titleAlign}
          onChange={(e) =>
            setStory({ ...story, titleAlign: e.target.value as string })
          }
        >
          <option value="top">Top</option>
          <option value="center">Center</option>
          <option value="bottom">Bottom</option>
        </select>

        <label className={styles.label}>Description Alignment</label>
        <select
          className={styles.select}
          value={story.descAlign}
          onChange={(e) =>
            setStory({ ...story, descAlign: e.target.value as string })
          }
        >
          <option value="top">Top</option>
          <option value="center">Center</option>
          <option value="bottom">Bottom</option>
        </select>

        <label className={styles.label}>Button Text</label>
        <input
          className={styles.input}
          type="text"
          value={story.buttonCTA.btnTxt}
          onChange={(e) =>
            setStory({
              ...story,
              buttonCTA: { ...story.buttonCTA, btnTxt: e.target.value },
            })
          }
        />

        <label className={styles.label}>Button Link</label>
        <input
          className={styles.input}
          type="text"
          value={story.buttonCTA.btnLink}
          onChange={(e) =>
            setStory({
              ...story,
              buttonCTA: { ...story.buttonCTA, btnLink: e.target.value },
            })
          }
        />

        <label className={styles.label}>Button Background Color</label>
        <input
          className={styles.input}
          type="color"
          value={story.buttonCTA.btnColor}
          onChange={(e) =>
            setStory({
              ...story,
              buttonCTA: { ...story.buttonCTA, btnColor: e.target.value },
            })
          }
        />

        <label className={styles.label}>Button Text Color</label>
        <input
          className={styles.input}
          type="color"
          value={story.buttonCTA.btnTxtColor}
          onChange={(e) =>
            setStory({
              ...story,
              buttonCTA: { ...story.buttonCTA, btnTxtColor: e.target.value },
            })
          }
        />

        <Button className={styles.button} type="submit">
          Update Web Story
        </Button>
      </form>
    </section>
  );
};

export default Page;
