"use client";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

export default function SelectDraft() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("Home");
  const [processing, setProcessing] = useState(false);

  async function handleUploadDraft() {
    try {
      setProcessing(true);
      if (!inputFileRef.current?.files) {
        throw new Error("No file selected");
      }

      const file = inputFileRef.current.files[0];

      const fileReader = new FileReader();

      const fileContent = await new Promise<string>((resolve, reject) => {
        fileReader.onload = (event) => {
          try {
            const result = event.target?.result;
            if (typeof result === "string") {
              resolve(result);
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

        fileReader.readAsText(file);
      });

      const jsonData = JSON.parse(fileContent);

      const options = JSON.parse(localStorage.getItem("draftOptions") || "{}");

      const response = await fetch(`/api/generate?filename=${file.name}`, {
        method: "POST",
        body: JSON.stringify({
          options: { ...options },
          draft: jsonData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("response", response);

      if (!response.ok) {
        console.log("errMsg", await response.json());
        throw new Error(
          "处理失败，请检查文件是否正确（注意：如果你的剪映升级到了 6.0 以上版本草稿被剪映加密了，必须要降低版本才能使用，目前测试 5.8 版本可以使用。滑动到首页下面的常见问题中有 5.8 版本的下载地址"
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setProcessing(false);
    } catch (error: any) {
      setProcessing(false);
      console.log(error);
      alert(error.message);
    }
  }

  return (
    <button className="inline-block rounded-full bg-brand px-8 py-4 text-center font-bold text-black transition hover:border-black hover:bg-white relative">
      {processing && <Loader2 className="inline-block mr-2 h-5 w-5 animate-spin" />}
      <span>{t("SelectDraft")}</span>
      <input
        type="file"
        className="opacity-0 absolute inset-x-0 inset-y-0"
        accept="application/json, .*"
        ref={inputFileRef}
        onChange={handleUploadDraft}
      />
    </button>
  );
}
