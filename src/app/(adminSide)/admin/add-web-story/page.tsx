"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Editor from "@/components/Editor/Editor";
import axios from "axios";

// allTopics
interface ALLTOPICS {
  topicTitle: "This is demo testing story topic.";
  _id: "68884fcf53150586719733ab";
}
function Page() {
  const [allTopics, setAllTopics] = useState<ALLTOPICS[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    titleAlign: "top",
    descriptionAlign: "bottom",
    metaDescription: "",
    metaKeywords: "",
    topicID: "",
  });
  const [btnCTA, setBtnCTA] = useState({
    btnTxt: "",
    btnLink: "",
    btnColor: "#000000",
    btnTxtColor: "#ffffff",
  });
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgFile(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("titleAlign", form.titleAlign);
    formData.append("descAlign", form.descriptionAlign);
    formData.append("metaDescription", form.metaDescription);
    formData.append("metaKeyWords", form.metaKeywords);
    formData.append("topicID", form.topicID);

    // formData.append("buttonCTA[btnTxt]", form.btnTxt);
    // formData.append("buttonCTA[btnLink]", form.btnLink);
    // formData.append("buttonCTA[btnColor]", form.btnColor);
    formData.append("buttonCTA", JSON.stringify(btnCTA));

    if (imgFile) {
      formData.append("img", imgFile);
    }
    try {
      const { status } = await axios.post(
        "/api/rizt_webStories/addWebStory",
        formData
      );
      if (status === 201) {
        alert("Story uploded successfully!.");
        setForm({
          title: "",
          description: "",
          titleAlign: "top",
          descriptionAlign: "bottom",
          metaDescription: "",
          metaKeywords: "",
          topicID: "",
        });
        setBtnCTA({
          btnTxt: "",
          btnLink: "",
          btnColor: "#000000",
          btnTxtColor: "#ffffff",
        });
        setImgPreview(null);
      }
    } catch (err) {
      console.log("Error submitting form:", err);
    }
  };

  const getAllWebStoryTopics = async () => {
    try {
      const { data } = await axios.get(
        "/api/ritz_webStoryTopics/get-all-topics"
      );
      setAllTopics(data?.allTopics);
    } catch (error) {
      console.log(
        "There are some errors in your get all web story topics controller plz fix the bug first ", error
      );
    }
  };

  useEffect(() => {
    getAllWebStoryTopics();
  }, []);
  return (
    <section className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Create Web Story</h1>

      <div className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            id="title"
            placeholder="Enter story title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label>Title Alignment</label>
          <select
            name="titleAlign"
            value={form.titleAlign}
            onChange={handleChange}
          >
            <option value="top">Top</option>
            <option value="center">Center</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Description</label>
          <Editor
            value={form.description}
            onChange={(val: string) => setForm({ ...form, description: val })}
          />
        </div>

        <div className={styles.field}>
          <label>Description Alignment</label>
          <select
            name="descriptionAlign"
            value={form.descriptionAlign}
            onChange={handleChange}
          >
            <option value="top">Top</option>
            <option value="center">Center</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="btnTxt">Button Text</label>
          <input
            name="btnTxt"
            id="btnTxt"
            placeholder="Read More"
            value={btnCTA.btnTxt}
            onChange={(e) =>
              setBtnCTA((prev) => ({
                ...prev,
                btnTxt: e.target.value,
              }))
            }
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="btnLink">Button Link</label>
          <input
            name="btnLink"
            id="btnLink"
            placeholder="https://example.com/story"
            value={btnCTA.btnLink}
            onChange={(e) => {
              setBtnCTA((prev) => ({
                ...prev,
                btnLink: e.target.value,
              }));
            }}
          />
        </div>

        <div className={styles.colorRow}>
          <div className={styles.colorField}>
            <label>Button Background</label>
            <input
              name="btnColor"
              type="color"
              value={btnCTA.btnColor}
              onChange={(e) => {
                setBtnCTA((prev) => ({
                  ...prev,
                  btnColor: e.target.value,
                }));
              }}
            />
          </div>
          <div className={styles.colorField}>
            <label>Button Text Color</label>
            <input
              name="btnTxtColor"
              type="color"
              value={btnCTA.btnTxtColor}
              onChange={(e) => {
                setBtnCTA((prev) => ({
                  ...prev,
                  btnTxtColor: e.target.value,
                }));
              }}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="metaDescription">Meta Description</label>
          <input
            name="metaDescription"
            id="metaDescription"
            placeholder="Short SEO description"
            value={form.metaDescription}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="metaKeywords">Meta Keywords</label>
          <input
            name="metaKeywords"
            id="metaKeywords"
            placeholder="story, blog, keywords"
            value={form.metaKeywords}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="topicID">Select Topic</label>
          <select name="topicID" id="topicID" onChange={handleChange}>
            {allTopics ? (
              allTopics.map((topic) => {
                return <option value={topic._id} key={topic._id}>{topic.topicTitle}</option>;
              })
            ) : (
              <p>No Topics Available Right Now!</p>
            )}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="img">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imgPreview && (
            <img src={imgPreview} alt="Preview" className={styles.imgPreview} />
          )}
        </div>

        <button className={styles.submitButton} onClick={handleSubmit}>
          Submit Web Story
        </button>
      </div>
    </section>
  );
}

export default Page;
