// models/Blog.ts

import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    blogTitle: {
      type: String,
      required: true,
      unique: true,
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
      type: String,
    },
    blogCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "RitzCats",
      required: true,
    },
    blogStatus: {
      type: Boolean,
      default: true,
    },
    // It will be generate from backend api :
    blogSlug: {
      type: String,
      required: true,
      unique: true,
    },
    blogDescription: {
      type: String,
      required: true,
    },
    mtDesc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const RitzBlogModel =
  models.RitzBlogModel || model("RitzBlogModel", BlogSchema);

export default RitzBlogModel;
