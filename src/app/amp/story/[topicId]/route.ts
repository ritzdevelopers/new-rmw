import { NextResponse } from "next/server";
import WebStoryModel from "@/models/WebStory.Schema";
import TopicModel from "@/models/Story.Topic";
import { connectMongoDB } from "@/lib/mongo/dbConntect";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: { topicId: string } }) {
  await connectMongoDB();
  const topic = await TopicModel.findOne({ slug: params.topicId });
  const pages = await WebStoryModel.find({ topic: topic?._id });

  if (!pages || pages.length === 0) {
    return new NextResponse("No pages found", { status: 404 });
  }

  const ampHtml = `
    <!doctype html>
    <html ⚡ lang="en">
      <head>
        <meta charset="utf-8">
        <title>${pages[0].title}</title>
        <link rel="canonical" href="https://yourdomain.com/amp/story/${params.topicId}">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <meta name="description" content="${pages[0].metaDescription}">
        <meta name="keywords" content="${pages[0].metaKeyWords}">
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-story" src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
        <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>

        <style amp-boilerplate>
          body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}
        </style>
        <noscript><style amp-boilerplate>body{-webkit-animation:none;animation:none}</style></noscript>

        <style amp-custom>
          amp-story {
            font-family: 'Poppins', sans-serif;
            color: white;
          }


          .content-bottom {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
            text-align: left;
            width: 100%;
            height: 100%;
            // padding: 20px;
            box-sizing: border-box;
            z-index: 2;
          }

          .text-wrapper {
            background: rgba(0, 0, 0, 0.6);
            // border-radius: 12px;
            padding: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(4px);
            width: 100%;
          }

          .story-title {
            font-family: 'Playfair Display', serif;
            font-size: 1rem;
            font-weight: 700;
            margin: 0 0 10px;
            color: #fff;
          }

          .story-desc {
            font-family: 'Roboto', sans-serif;
            // font-size: 0.5rem;
            margin: 0 0 12px;
            color: #ddd;
          }

          .btn {
            padding: 10px 20px;
            border-radius: 24px;
            text-decoration: none;
            font-weight: 600;
            display: inline-block;
            margin-top: 10px;
            border: none;
            font-size: 0.8rem;
            background-color: #fff;
            color: #000;
            transition: transform 0.2s ease;
          }

          .btn:active {
            transform: scale(0.96);
          }

          .btn:hover {
            background-color: #eee;
          }

          .like-section {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .like-btn {
            background: transparent;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
          }

          .like-count {
            font-size: 0.9rem;
            color: #ccc;
            margin-top: 4px;
          }

          @media (max-width: 480px) {
            .text-wrapper {
              padding: 16px;
            }

            .story-title {
              font-size: 1.3rem;
            }

            .story-desc {
              font-size: 0.95rem;
            }

            .btn {
              padding: 8px 16px;
              font-size: 0.9rem;
            }
          }
        </style>

        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet">
      </head>
      <body>
        <amp-story
          standalone
          title="${pages[0].title}"
          publisher="Your Publisher"
          publisher-logo-src="/logo.png"
          poster-portrait-src="${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images/${pages[0].img.split("images")[1]}"
        >
          ${pages
            .map((page, index) => {
              const fullImgPath = `${process.env.NEXT_PUBLIC_SERVER_IMG_PATH}/api/images/${page.img.split("images")[1]}`;
              return `
                <amp-story-page id="page-${index}">
                  <amp-story-grid-layer template="fill">
                    <amp-img src="${fullImgPath}" width="720" height="1280" layout="responsive" alt="${page.title}"></amp-img>
                    <div class="image-darken"></div>
                  </amp-story-grid-layer>

                  <amp-story-grid-layer template="fill">
                    <div class="content-bottom">
                      <div class="text-wrapper">
                        <h1 class="story-title">${page.title}</h1>
                        <p class="story-desc">${page.description}</p>
                        ${
                          page.buttonCTA?.btnTxt
                            ? `<a href="${page.buttonCTA.btnLink}" class="btn" style="background-color:${page.buttonCTA.btnColor};color:${page.buttonCTA.btnTxtColor};">${page.buttonCTA.btnTxt}</a>`
                            : ""
                        }
                    
                      </div>
                    </div>
                  </amp-story-grid-layer>
                </amp-story-page>
              `;
            })
            .join("")}
        </amp-story>
      </body>
    </html>
  `;
  
  return new NextResponse(ampHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}