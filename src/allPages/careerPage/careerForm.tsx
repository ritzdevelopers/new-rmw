"use client";

import React, { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#C99237] focus:ring-1 focus:ring-[#C99237]";

const CareerForm = () => {
  const captchaRef = useRef<HCaptcha>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please complete the captcha");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const resumeFile = formData.get("resume") as File;

    if (!resumeFile) {
      toast.error("Please upload your resume.");
      return;
    }

    try {
      const resumeUploaded = await uploadResume(resumeFile);
      if (!resumeUploaded.success) {
        toast.error("Resume upload failed: " + resumeUploaded.error);
        return;
      }

      formData.append("resumePath", resumeUploaded.filePath);
      formData.delete("resume");

      const formSubmitted = await submitFormFields(formData);
      if (!formSubmitted.success) {
        toast.error("Form submission failed: " + formSubmitted.error);
        return;
      }

      toast.success("Form submitted successfully!");
      form.reset();
      setCaptchaToken(null);
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const submitFormFields = async (formData: FormData) => {
    try {
      formData.append("etype", "career");
      const response = await fetch("/api/system-settings/contact-enquiry", {
        method: "POST",
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error("Error submitting form fields:", error);
      return { success: false, error: "Failed to submit form fields" };
    }
  };

  const uploadResume = async (resumeFile: File) => {
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error("Error uploading resume:", error);
      return { success: false, error: "Failed to upload resume" };
    }
  };

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-[#F7F7F7] p-5 shadow-sm sm:p-6 md:p-8">
      <h3
        className="mb-6 text-center text-xl font-bold text-[#0F1640] sm:text-2xl"
        style={{ fontFamily: "MontserratBold" }}
      >
        Apply Now
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            name="name"
            type="text"
            className={inputClass}
            placeholder="Full Name"
            required
          />
          <input
            name="email"
            type="email"
            className={inputClass}
            placeholder="Email"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            name="phone"
            type="tel"
            className={inputClass}
            placeholder="Mobile Number"
            required
          />
          <select
            name="category"
            className={inputClass}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Applying For...
            </option>
            <option value="uiux">UI/UX Designer</option>
            <option value="frontend">Frontend Developer</option>
            <option value="backend">Backend Developer</option>
            <option value="marketing">Marketing Executive</option>
            <option value="content-creator-lifestyle">
              Content Creator Lifestyle
            </option>
            <option value="video-editor-cgi">Video Editor - CGI Specialist</option>
            <option value="social-media-executive-spoc">
              Social Media Executive Spoc
            </option>
            <option value="md-personal-secretary">
              Managing Director&apos;s Personal Secretary
            </option>
            <option value="senior-video-editors">Senior Video Editors</option>
            <option value="full-stack-developer">Full Stack Developer</option>
            <option value="ai-video-generation-artist">
              AI Video Generation Artist
            </option>
            <option value="sales-executive-media-agency">
              Sales Executive - Media Agency
            </option>
            <option value="media-sales-manager">Media Sales Manager</option>
            <option value="media-influencer-coordinator">
              Media Influencer Coordinator
            </option>
            <option value="seo-executive">SEO Executive</option>
            <option value="seo-intern">SEO Intern</option>
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-gray-600"
            style={{ fontFamily: "OpenSansRegular" }}
          >
            Upload Resume
          </label>
          <input
            name="resume"
            type="file"
            className={`${inputClass} file:mr-4 file:rounded-md file:border-0 file:bg-[#C99237] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white`}
            required
          />
        </div>

        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          name="message"
          rows={4}
          placeholder="Your Message or Query"
        />

        <div className="flex justify-center">
          <HCaptcha
            sitekey="e4a44c7a-13c4-4534-b210-d41242d2d262"
            onVerify={(token) => setCaptchaToken(token)}
            ref={captchaRef}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#0F1640] py-3 text-sm font-semibold text-white transition hover:bg-[#1a2260]"
          style={{ fontFamily: "OpenSansSemiBold" }}
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default CareerForm;
