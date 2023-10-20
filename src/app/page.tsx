"use client";
import { useRef } from "react";

export default function Home() {
  const inputFileRef = useRef<HTMLInputElement>(null);

  async function handleUploadDraft() {
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
    try {
      const response = await fetch(`/api/generate?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      console.log("response", response);

      if (!response.ok) {
        console.log("errMsg", await response.json());
        throw new Error("处理失败，请检查文件是否正确");
      }

      // 前端下载文件
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // 执行下载 for react
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "draft_info.json");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
      alert("处理失败，请检查文件是否正确");
    }
  }

  return (
    <header className="relative">
      <div className="flex justify-center items-center min-h-screen">
        <img
          src="https://uploads-ssl.webflow.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26e_Background%20Hero.svg"
          alt=""
          className="absolute -z-10 inline-block h-full w-full object-cover"
        />
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 pb-4 text-4xl font-bold text-white md:text-6xl">
              剪映一键关键帧
            </h1>
            <div className="mx-auto mb-3 max-w-[528px] md:mb-6 lg:mb-8">
              <p className="text-xl text-[#636262]">
                一键设定剪映视频关键帧，轻松添加转场动画。
              </p>
            </div>

            <a
              href="#"
              className="inline-block rounded-full bg-[#c9fd02] px-8 py-4 text-center font-bold text-black transition hover:border-black hover:bg-white relative"
            >
              <span>选择剪映草稿文件</span>
              <input
                type="file"
                className="opacity-0 absolute inset-x-0 inset-y-0"
                accept="application/json, .*"
                ref={inputFileRef}
                onChange={handleUploadDraft}
              />
            </a>
          </div>

          <section className="relative">
            <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-24">
              <div className="mx-auto mb-8 max-w-3xl text-center md:mb-12 lg:mb-16">
                <p className="text-sm font-bold uppercase text-[#c9fd02]">
                  只 需 三 步
                </p>
                <h2 className="mb-4 mt-6 text-3xl font-extrabold text-white md:text-5xl">
                  怎么使用
                </h2>
                {/* <p className="mx-auto mt-4 max-w-[528px] text-[#aeaeae]">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit ut
                  aliquam,purus sit amet luctus magna fringilla urna
                </p> */}
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                <div className="grid grid-cols-1 gap-4 rounded-xl bg-[#131313] p-8">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-[#c9fd02]">
                    <p className="text-xl font-bold">1</p>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    点击“选择剪映草稿文件”按钮
                  </p>
                  <p className="text-sm text-[#636262]">
                    点击上方的“选择剪映草稿文件”按钮，选择你的剪映草稿文件。
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 rounded-xl bg-[#131313] p-8">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-[#c9fd02]">
                    <p className="text-xl font-bold">2</p>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    选择你的剪映草稿文件
                  </p>
                  <p className="text-sm text-[#636262]">
                    在你的操作系统中找到草稿文件夹，选择 `draft_info.json`
                    文件。
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 rounded-xl bg-[#131313] p-8">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full bg-[#c9fd02]">
                    <p className="text-xl font-bold">3</p>
                  </div>
                  <p className="text-xl font-semibold text-white">
                    等待自动下载到电脑中
                  </p>
                  <p className="text-sm text-[#636262]">
                    等待处理完成后，会自动下载到你的电脑中。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <footer
            className="bg-center text-white"
          >
            <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
              <div className="flex flex-col items-center">
                {/* <a href="#" className="mb-8 inline-block max-w-full">
                  <img
                    src="https://assets.website-files.com/63904f663019b0d8edf8d57c/6399728d302d2471f18b229f_Group%2047874%20(2).svg"
                    alt=""
                    className="inline-block max-h-10"
                  />
                </a> */}
                {/* <div className="text-center font-semibold max-[991px]:ml-0 max-[991px]:mr-0 max-[991px]:py-1">
                  <a
                    href="#"
                    className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
                  >
                    Works
                  </a>
                  <a
                    href="#"
                    className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
                  >
                    Support
                  </a>
                  <a
                    href="#"
                    className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
                  >
                    Help
                  </a>
                </div> */}
                <div className="mb-8 mt-8 w-48 border-b border-solid border-b-white"></div>
                {/* <div className="mb-12 grid w-full max-w-[208px] grid-flow-col grid-cols-4 gap-3">
                  <a
                    href="#"
                    className="ifont-bold mx-auto flex max-w-[24px] flex-col"
                  >
                    <img
                      src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639972bc5e36f4a882999413_Frame%205479.svg"
                      alt=""
                      className="inline-block"
                    />
                  </a>
                  <a
                    href="#"
                    className="mx-auto flex max-w-[24px] flex-col font-bold"
                  >
                    <img
                      src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639972bf093252f2b2114050_Frame%205480.svg"
                      alt=""
                      className="inline-block"
                    />
                  </a>
                  <a
                    href="#"
                    className="ifont-bold mx-auto flex max-w-[24px] flex-col"
                  >
                    <img
                      src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639972bde1a389ee15d86fc6_Frame%205481-1.svg"
                      alt=""
                      className="inline-block"
                    />
                  </a>
                  <a
                    href="#"
                    className="mx-auto flex max-w-[24px] flex-col font-bold"
                  >
                    <img
                      src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639972bf10337117b26b8e51_Frame%205481.svg"
                      alt=""
                      className="inline-block"
                    />
                  </a>
                </div> */}
                <p className="max-[479px]:text-sm">
                  Made with 😆 by <a href="https://twitter.com/HunterZhuo" target="_blank">HunterZhuo</a>. Powered by <a href="https://vercel.com/" target="_blank">Vercel</a>, <a href="https://www.cloudflare.com/" target="_blank">Cloudflare</a>.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </header>
  );
}
