"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { ToggleSwitch, Label, TextInput, Select } from "flowbite-react";
import { InAnimations } from "@/jianying/effects/animations";

export default function DashboardComponent() {
  const t = useTranslations("CopilotDashboard");

  // 获取草稿列表
  const [drafts, setDrafts]: any = useState([]);
  useEffect(() => {
    const fetchDrafts = async () => {
      const response = await fetch(
        window.localStorage.getItem("copilot_api_url") + "/api/v1/drafts"
      );
      const data = await response.json();
      console.log("fetchDrafts", data);
      setDrafts(data.data);
    };

    const timer = setTimeout(() => {
      fetchDrafts();
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const [isRandomInAnimation, setIsRandomInAnimation] = useState(
    localStorage.getItem("isRandomInAnimation") === "false" ? false : true
  );

  const inAnimationsOptions = Object.values(InAnimations);
  const [inAnimation, setInAnimation] = useState(
    localStorage.getItem("inAnimation") ?? ""
  );
  const [inAnimationSpeed, setInAnimationSpeed] = useState(
    localStorage.getItem("inAnimationSpeed") ?? 500000
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("isRandomInAnimation", isRandomInAnimation.toString());
      localStorage.setItem("inAnimation", inAnimation);
      localStorage.setItem("inAnimationSpeed", inAnimationSpeed.toString());

      localStorage.setItem(
        "draftOptions",
        JSON.stringify({
          isRandomInAnimation,
          inAnimation,
          inAnimationSpeed,
        })
      );
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [isRandomInAnimation, inAnimation, inAnimationSpeed]);

  // 获取选中的草稿
  const selecDraftRef = useRef<HTMLSelectElement>(null);
  const [selectedDraft, setSelectedDraft] = useState<string>("");
  async function handleSelectDraft() {
    const draftJsonFile = selecDraftRef.current?.value;
    // console.log("draftJsonFile", draftJsonFile);
    if (!draftJsonFile) {
      setSelectedDraft("");
    } else {
      setSelectedDraft(draftJsonFile);
    }
  }

  // 一键处理草稿
  async function handleProcessDraft(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    console.log("handleProcessDraft", event);
    event.preventDefault();

    // 获取选中的草稿内容
    const selectedDraft = selecDraftRef.current?.value;
    console.log("selectedDraft", selectedDraft);
    if (!selectedDraft) {
      Swal.fire({
        title: t("UnselectedDraftTitle"),
        icon: "warning",
      });
      return;
    }

    const response = await fetch(
      window.localStorage.getItem("copilot_api_url") +
        `/api/v1/draft?draft_json_file=${selectedDraft}`
    );
    const result = await response.json();
    // console.log("handleProcessDraft", result.data.draft_info);

    // 获取草稿处理设置
    const options = JSON.parse(localStorage.getItem("draftOptions") || "{}");

    // 处理草稿
    const processedResponse = await fetch(
      `/api/generate?filename=draft_info.json`,
      {
        method: "POST",
        body: JSON.stringify({
          options: {
            ...options,
          },
          draft: result.data.draft_info,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const processedDraft = await processedResponse.json();
    // console.log("processedDraft", processedDraft);
    if (processedDraft.errMsg) {
      Swal.fire({
        title: "Error",
        text: processedDraft.errMsg,
        icon: "error",
      });
      return;
    }

    // 保存处理后的草稿
    const saveResponse = await fetch(
      window.localStorage.getItem("copilot_api_url") + `/api/v1/draft`,
      {
        method: "POST",
        body: JSON.stringify({
          draft_json_file: selectedDraft,
          draft_info: processedDraft,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const saveDraft = await saveResponse.json();
   
    Swal.fire({
      title: t("AddSuccessTitle"),
      text: t("AddSuccessText"),
      icon: "success",
    });

    
  }
  return (
    <div className="max-w-md mx-auto flex flex-col gap-y-10 ">
      <div
        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
        role="alert"
      >
        <span className="font-medium">{t("WarningNotice")}</span>{" "}
        {t("WarningNoticeText")}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-white">
          {t("SelectDraft")}
        </label>
        <select
          ref={selecDraftRef}
          onChange={handleSelectDraft}
          value={selectedDraft}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected value={""}>
            {t("SelectDraft")}
          </option>
          {drafts.map((draft: any) => (
            <option key={draft.draft_json_file} value={draft.draft_json_file}>
              {draft.draft_name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6 text-white">
        <h3 className="text-xl font-medium text-white">草稿处理设置</h3>

        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="isRandomInAnimation"
              value="开启随机入场动画"
              className="text-white"
            />
          </div>
          <ToggleSwitch
            checked={isRandomInAnimation}
            onChange={setIsRandomInAnimation}
          />
        </div>

        {/* 入场动画选择，如果是随机入场动画，则不显示 */}
        {!isRandomInAnimation ? (
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="inAnimation"
                value="选择固定入场动画"
                className="text-white"
              />
            </div>
            <Select onChange={(value) => setInAnimation(value.target.value)}>
              <option value="">-- 请选择入场动画 --</option>
              {inAnimationsOptions.map((option) => (
                <option
                  key={option.resource_id}
                  value={option.id}
                  selected={option.id == inAnimation}
                >
                  {option.name}
                </option>
              ))}
            </Select>
          </div>
        ) : null}

        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="inAnimationSpeed"
              value="入场动画速度（单位：微秒 1s = 1000000µs）"
              className="text-white"
            />
          </div>
          <TextInput
            type="number"
            value={inAnimationSpeed}
            required
            onInput={(e) => setInAnimationSpeed(e.target.value)}
          />
        </div>
      </div>

      <button
        className="inline-block rounded-full bg-[#c9fd02] px-6 py-4 text-center font-bold text-black transition hover:border-black hover:bg-white"
        onClick={handleProcessDraft}
      >
        {t("AddButton")}
      </button>
    </div>
  );
}
