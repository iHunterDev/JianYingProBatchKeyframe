"use client";
import { useRef } from "react";
import {useTranslations} from 'next-intl';

export default function SelectDraft() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const t = useTranslations('Home')
  async function handleUploadDraft() {
    try {
      if (!inputFileRef.current?.files) {
        throw new Error("No file selected");
      }

      const file = inputFileRef.current.files[0];
      
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
      <span>{t('SelectDraft')}</span>
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
