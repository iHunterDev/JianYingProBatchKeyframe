"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function SelectDraft() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("Home");
  async function handleUploadDraft() {
    try {
      if (!inputFileRef.current?.files) {
        throw new Error("No file selected");
      }

      const file = inputFileRef.current.files[0];

      // 使用 FileReader 读取文件
      const fileReader = new FileReader();

      const fileContent = await new Promise<string>((resolve, reject) => {
        fileReader.onload = (event) => {
          try {
            const result = event.target?.result;
            if (typeof result === "string") {
              resolve(result); // 成功读取文件内容
            } else {
              reject("FileReader result is not a string");
            }
          } catch (err) {
            reject(err);
          }
        };

        fileReader.onerror = () => {
          reject("Error reading file");
        };

        fileReader.readAsText(file); // 将文件读取为文本
      });

      // 解析读取到的 JSON 数据
      const jsonData = JSON.parse(fileContent);

      // 获取草稿处理设置
      const options = JSON.parse(localStorage.getItem("draftOptions") || "{}");

      // 将 JSON 数据通过 fetch 发送到后端
      const response = await fetch(`/api/generate?filename=${file.name}`, {
        method: "POST",
        body: JSON.stringify({
          options: {
            ...options
          },
          draft: jsonData, // 发送解析后的 JSON 数据
        }),
        headers: {
          "Content-Type": "application/json", // 确保是 JSON 类型
        },
      });

      console.log("response", response);

      if (!response.ok) {
        console.log("errMsg", await response.json());
        throw new Error(
          "处理失败，请检查文件是否正确（注意：如果你的剪映升级到了 6.0 以上版本草稿被剪映加密了，必须要降低版本才能使用，目前测试 5.8 版本可以使用。滑动到首页下面的常见问题中有 5.8 版本的下载地址"
        );
      }

      // 前端下载文件
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // 执行下载 for react
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      console.log(error);
      alert(error.message);
    }
  }

  return (
    <a
      href="#"
      className="inline-block rounded-full bg-[#c9fd02] px-8 py-4 text-center font-bold text-black transition hover:border-black hover:bg-white relative"
    >
      <span>{t("SelectDraft")}</span>
      <input
        type="file"
        className="opacity-0 absolute inset-x-0 inset-y-0"
        accept="application/json, .*"
        ref={inputFileRef}
        onChange={handleUploadDraft}
      />
    </a>
  );
}
