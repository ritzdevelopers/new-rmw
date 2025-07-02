// models/Blog.ts

import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    blogTitle: {
      type: String,
      required: true,
    },
    blogBanner: {
      type: String,
      required: true,
    },
    blogBody: [
      {
        metaTitle: {
          type: String,
          required: true,
        },
        metaDescription: {
          type: String,
          required: true,
        },
        innerImg: {
          type: String,
        },
      },
    ],
    metaKeywords: {
      type: String
    },
    blogCategory: {
      type: String,
      required: true,
      enum: ["Case Study", "Performance Marketing Agency", "Print Advertising Agency", "Creating Advertising Agency", "Celebrity Endorsements Agency", "Artist Management Agency", "FM Radio Advertising", "Web Design And Development", "Graphic Design Services", "Digital Marketing Agency", "Best Ad Agency", "All Category"],
      default: "All Category"
    },
    blogStatus : {
      type:Boolean,
      default:true
    }
  },
  {
    timestamps: true,
  }
);

const NewBlogModel = models.NewBlogModel || model("NewBlogModel", BlogSchema);

export default NewBlogModel;