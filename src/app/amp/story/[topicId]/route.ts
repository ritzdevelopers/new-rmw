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

  // Convert align info to CSS classes
  const getAlignmentClass = (align: string, isTitle = false) => {
    const base = isTitle ? "title" : "desc";
    switch (align) {
      case "top":
        return `${base}-align-top`;
      case "bottom":
        return `${base}-align-bottom`;
      default:
        return `${base}-align-center`;
    }
  };

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
    
        <style amp-boilerplate>
          body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}
        </style>
        <noscript><style amp-boilerplate>body{-webkit-animation:none;animation:none}</style></noscript>
        <style amp-custom>
          amp-story {
            font-family: 'Poppins', sans-serif;
            color: white;
          }

          .text-wrapper {
            position: relative;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            backdrop-filter: blur(4px);
          }

          h1 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 12px;
            text-shadow: 0 1px 3px rgba(0,0,0,0.5);
          }

          p {
            font-size: 1.1rem;
            margin-bottom: 20px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          }

          .btn {
            padding: 10px 20px;
            border-radius: 24px;
            text-decoration: none;
            font-weight: 600;
            display: inline-block;
            margin-top: 12px;
            border: none;
            font-size: 1rem;
            background-color: #fff;
            color: #000;
            transition: transform 0.2s ease;
          }

          .btn:active {
            transform: scale(0.96);
          }

          .image-darken {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5));
            z-index: 1;
          }

          .content-layer {
            z-index: 2;
            display: flex;
            flex-direction: column;
          }

          /* Title alignments */
          .title-align-top {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            text-align: center;
            width: 100%;
            padding: 10vh 24px 0;
            box-sizing: border-box;
          }

          .title-align-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 100%;
            padding: 0 24px;
            box-sizing: border-box;
          }

          .title-align-bottom {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            text-align: center;
            width: 100%;
            padding: 0 24px 0;
            box-sizing: border-box;
          }

          /* Description alignments */
          .desc-align-top {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            text-align: center;
            width: 100%;
            padding: 5vh 24px 0;
            box-sizing: border-box;
          }

          .desc-align-center {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 100%;
            padding: 0 24px;
            box-sizing: border-box;
          }

          .desc-align-bottom {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            text-align: center;
            width: 100%;
            padding: 0 24px 10vh;
            box-sizing: border-box;
          }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
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

                  <amp-story-grid-layer template="vertical" class="content-layer">
                    <div class="${getAlignmentClass(page.titleAlign, true)}">
                      <div class="text-wrapper">
                        <h1>${page.title}</h1>
                      </div>
                    </div>
                    <div class="${getAlignmentClass(page.descAlign)}">
                      <div class="text-wrapper">
                        <p>${page.description}</p>
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