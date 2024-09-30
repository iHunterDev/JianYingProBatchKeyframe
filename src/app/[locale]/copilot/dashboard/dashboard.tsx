"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import {
  ToggleSwitch,
  Label,
  TextInput,
  Select,
  Checkbox,
  Radio,
} from "flowbite-react";
import { InAnimations } from "@/jianying/effects/animations";

export default function DashboardComponent() {
  const t = useTranslations("CopilotDashboard");
  const tds = useTranslations("DraftSetting");


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

  const videoRatioOptions = [
    { id: "ratio_auto", value: "auto", label: tds("Auto") },
    {
      id: "ratio_16_9",
      value: "16:9",
      label: "16:9",
      width: 1920,
      height: 1080,
    },
    {
      id: "ratio_9_16",
      value: "9:16",
      label: "9:16",
      width: 1080,
      height: 1920,
    },
    { id: "ratio_4_3", value: "4:3", label: "4:3", width: 1920, height: 1440 },
  ];
  const [videoRatio, setVideoRatio] = useState("auto");
  useEffect(() => {
    // 只在浏览器端访问 localStorage
    const storedVideoRatio = localStorage.getItem("videoRatio");
    if (storedVideoRatio) {
      setVideoRatio(storedVideoRatio);
    }
  }, []);
  
  const videoRatioCheckedChangeHandle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRatio = event.target.value;
    setVideoRatio(newRatio);
  };

  const [keyframeSpeed, setKeyframeSpeed] = useState(3);
  useEffect(() => {
    // 只在浏览器端访问 localStorage
    const storedKeyframeSpeed = localStorage.getItem("keyframeSpeed");
    if (storedKeyframeSpeed) {
      setKeyframeSpeed(parseInt(storedKeyframeSpeed));
    }
  }, []);

  // 关键帧类型
  const inKeyframeTypeOptions = [{value: "scaleDown", label: tds("LargeToSmall")}, {value: "scaleUp", label: tds("SmallToLarge")}, {value: "leftToRight", label: tds("LeftToRight")}, {value: "rightToLeft", label: tds("RightToLeft")}, {value: "topToBottom", label: tds("TopToBottom")}, {value: "bottomToTop", label: tds("BottomToTop")}];
  const [inKeyframeTypeCheckedList, setInKeyframeTypeCheckedList] = useState<string[]>(
    []
  );
  useEffect(() => {
    const defaultCheckedList = ["scaleDown", "scaleUp", "leftToRight", "rightToLeft", "topToBottom", "bottomToTop"];
    const storedCheckedList = localStorage.getItem("inKeyframeTypeCheckedList");
    if (storedCheckedList) {
      setInKeyframeTypeCheckedList(JSON.parse(storedCheckedList));
    } else {
      setInKeyframeTypeCheckedList(defaultCheckedList);
    }
  }, []); // 空数组确保只在组件挂载时执行
  
  const inKeyframeTypeCheckedChangeHandle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checkedList = [...inKeyframeTypeCheckedList];
    if (event.target.checked) {
      checkedList.push(event.target.value);
    } else {
      checkedList.splice(checkedList.indexOf(event.target.value), 1);
    }
    setInKeyframeTypeCheckedList(checkedList);

    // 更新 localStorage
    localStorage.setItem("inKeyframeTypeCheckedList", JSON.stringify(checkedList));
  };

  const [isClearKeyframes, setIsClearKeyframes] = useState(true);
  useEffect(() => {
    // 只在浏览器端访问 localStorage
    const storedIsClearKeyframes = localStorage.getItem("isClearKeyframes");
    if (storedIsClearKeyframes) {
      setIsClearKeyframes(storedIsClearKeyframes === "false" ? false : true);
    }
  }, []);

  const [isRandomInAnimation, setIsRandomInAnimation] = useState(true);
  useEffect(() => {
    // 只在浏览器端访问 localStorage
    const storedIsRandomInAnimation = localStorage.getItem("isRandomInAnimation");
    if (storedIsRandomInAnimation) {
      setIsRandomInAnimation(storedIsRandomInAnimation === "false" ? false : true);
    }
  }, []);

  const inAnimationsOptions = Object.values(InAnimations);
  const [inAnimation, setInAnimation] = useState("");
  const [inAnimationSpeed, setInAnimationSpeed] = useState(500);
  useEffect(() => {
    // 只在浏览器端访问 localStorage
    const storedInAnimation = localStorage.getItem("inAnimation");
    if (storedInAnimation) {
      setInAnimation(storedInAnimation);
    }
  }, []);
  useEffect(() => {
    // 只在浏览器端访问 localStorage
    const storedInAnimationSpeed = localStorage.getItem("inAnimationSpeed");
    if (storedInAnimationSpeed) {
      setInAnimationSpeed(parseInt(storedInAnimationSpeed));
    }
  }, []);

  const [inAnimationCheckedList, setInAnimationCheckedList] = useState<string[]>(
    []
  );

  useEffect(() => {
    const defaultCheckedList = Object.keys(InAnimations);
    const storedCheckedList = localStorage.getItem("inAnimationCheckedList");
    if (storedCheckedList) {
      setInAnimationCheckedList(JSON.parse(storedCheckedList));
    } else {
      setInAnimationCheckedList(defaultCheckedList);
    }
  }, []); // 空数组确保只在组件挂载时执行

  const inAnimationCheckedChangeHandle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checkedList = [...inAnimationCheckedList];
    if (event.target.checked) {
      checkedList.push(event.target.value);
    } else {
      checkedList.splice(checkedList.indexOf(event.target.value), 1);
    }
    setInAnimationCheckedList(checkedList);

    // 更新 localStorage
    localStorage.setItem("inAnimationCheckedList", JSON.stringify(checkedList));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("videoRatio", videoRatio);
      localStorage.setItem("keyframeSpeed", keyframeSpeed.toString());
      localStorage.setItem("inKeyframeTypeCheckedList", JSON.stringify(inKeyframeTypeCheckedList));
      localStorage.setItem("isClearKeyframes", isClearKeyframes.toString());
      localStorage.setItem(
        "isRandomInAnimation",
        isRandomInAnimation.toString()
      );
      localStorage.setItem("inAnimation", inAnimation);
      localStorage.setItem("inAnimationSpeed", inAnimationSpeed.toString());
      localStorage.setItem(
        "inAnimationCheckedList",
        JSON.stringify(inAnimationCheckedList)
      );

      localStorage.setItem(
        "draftOptions",
        JSON.stringify({
          videoRatio: videoRatioOptions.find(
            (option) => option.value === videoRatio
          ),
          keyframeSpeed,
          inKeyframeTypeCheckedList,
          isClearKeyframes,
          isRandomInAnimation,
          inAnimation,
          inAnimationSpeed,
          inAnimationCheckedList,
        })
      );
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [
    videoRatio,
    keyframeSpeed,
    inKeyframeTypeCheckedList,
    isClearKeyframes,
    isRandomInAnimation,
    inAnimation,
    inAnimationSpeed,
    inAnimationCheckedList,
  ]);

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
        <h3 className="text-xl font-medium text-white">{tds("DraftSetting")}</h3>

        {/* 视频比例 */}
        <div>
          <div className="mb-2 block">
            <Label
              value={tds("VideoRatio")}
              className="text-white"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            {videoRatioOptions.map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <Radio
                  id={option.id}
                  name="ratio"
                  value={option.value}
                  checked={videoRatio === option.value}
                  onChange={videoRatioCheckedChangeHandle}
                />
                <Label htmlFor={option.id} className="text-white">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* 关键帧速度 */}
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="keyframeSpeed"
              value={tds("keyframeSpeed")}
              className="text-white"
            />
          </div>
          <TextInput
            type="number"
            value={keyframeSpeed}
            required
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setKeyframeSpeed(e.target.value as any)
            }
          />
        </div>

        {/* 选择关键帧类型，至少选择一个 */}
        <div>
            <div className="mb-2 block">
              <Label
                htmlFor="inKeyframeType"
                value={tds("inKeyframeType")}
                className="text-white"
              />
            </div>
            <div className="flex max-w-md gap-2 flex-wrap">
              {inKeyframeTypeOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center gap-1 w-1/3"
                >
                  <Checkbox
                    checked={inKeyframeTypeCheckedList.indexOf(option.value) != -1}
                    id={"animation" + option.value}
                    value={option.value}
                    onChange={inKeyframeTypeCheckedChangeHandle}
                  />
                  <Label
                    htmlFor={"animation" + option.value}
                    className="flex text-white"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

        {/* 清理旧关键帧开关 */}
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="isClearKeyframes"
              value={tds("isClearKeyframes")}
              className="text-white"
            />
          </div>
          <ToggleSwitch
            checked={isClearKeyframes}
            onChange={setIsClearKeyframes}
          />
        </div>

        {/* 随机入场动画开关 */}
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="isRandomInAnimation"
              value={tds("isRandomInAnimation")}
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
                value={tds("inAnimation")}
                className="text-white"
              />
            </div>
            <Select onChange={(value) => setInAnimation(value.target.value)}>
              <option value="">-- {tds("PleaseSelectInAnimation")} --</option>
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
        ) : (
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="inAnimation"
                value={tds("inAnimation")}
                className="text-white"
              />
            </div>
            <div className="flex max-w-md gap-2 flex-wrap">
              {inAnimationsOptions.map((option) => (
                <div
                  key={option.resource_id}
                  className="flex items-center gap-1 w-1/4"
                >
                  <Checkbox
                    checked={inAnimationCheckedList.indexOf(option.id) != -1}
                    id={"animation" + option.id}
                    value={option.id}
                    onChange={inAnimationCheckedChangeHandle}
                  />
                  <Label
                    htmlFor={"animation" + option.id}
                    className="flex text-white"
                  >
                    {option.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="inAnimationSpeed"
              value={tds("inAnimationSpeed")}
              className="text-white"
            />
          </div>
          <TextInput
            type="number"
            value={inAnimationSpeed}
            required
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInAnimationSpeed(e.target.value as any)
            }
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
