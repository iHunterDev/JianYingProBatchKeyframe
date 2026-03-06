"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { InAnimations } from "@/jianying/effects/animations";

export default function DashboardComponent() {
  const t = useTranslations("CopilotDashboard");
  const tds = useTranslations("DraftSetting");

  const [drafts, setDrafts]: any = useState([]);
  useEffect(() => {
    const fetchDrafts = async () => {
      const response = await fetch(
        window.localStorage.getItem("copilot_api_url") + "/api/v1/drafts"
      );
      const data = await response.json();
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
    { id: "ratio_16_9", value: "16:9", label: "16:9", width: 1920, height: 1080 },
    { id: "ratio_9_16", value: "9:16", label: "9:16", width: 1080, height: 1920 },
    { id: "ratio_4_3", value: "4:3", label: "4:3", width: 1920, height: 1440 },
  ];
  const [videoRatio, setVideoRatio] = useState("auto");
  useEffect(() => {
    const storedVideoRatio = localStorage.getItem("videoRatio");
    if (storedVideoRatio) setVideoRatio(storedVideoRatio);
  }, []);

  const [keyframeSpeed, setKeyframeSpeed] = useState(3);
  useEffect(() => {
    const storedKeyframeSpeed = localStorage.getItem("keyframeSpeed");
    if (storedKeyframeSpeed) setKeyframeSpeed(parseInt(storedKeyframeSpeed));
  }, []);

  const inKeyframeTypeOptions = [
    { value: "scaleDown", label: tds("LargeToSmall") },
    { value: "scaleUp", label: tds("SmallToLarge") },
    { value: "leftToRight", label: tds("LeftToRight") },
    { value: "rightToLeft", label: tds("RightToLeft") },
    { value: "topToBottom", label: tds("TopToBottom") },
    { value: "bottomToTop", label: tds("BottomToTop") },
  ];
  const [inKeyframeTypeCheckedList, setInKeyframeTypeCheckedList] = useState<string[]>([]);
  useEffect(() => {
    const defaultCheckedList = ["scaleDown", "scaleUp", "leftToRight", "rightToLeft", "topToBottom", "bottomToTop"];
    const storedCheckedList = localStorage.getItem("inKeyframeTypeCheckedList");
    if (storedCheckedList) {
      setInKeyframeTypeCheckedList(JSON.parse(storedCheckedList));
    } else {
      setInKeyframeTypeCheckedList(defaultCheckedList);
    }
  }, []);

  const inKeyframeTypeCheckedChangeHandle = (value: string, checked: boolean) => {
    const checkedList = [...inKeyframeTypeCheckedList];
    if (checked) {
      checkedList.push(value);
    } else {
      checkedList.splice(checkedList.indexOf(value), 1);
    }
    setInKeyframeTypeCheckedList(checkedList);
    localStorage.setItem("inKeyframeTypeCheckedList", JSON.stringify(checkedList));
  };

  const [isClearKeyframes, setIsClearKeyframes] = useState(true);
  useEffect(() => {
    const storedIsClearKeyframes = localStorage.getItem("isClearKeyframes");
    if (storedIsClearKeyframes) setIsClearKeyframes(storedIsClearKeyframes !== "false");
  }, []);

  const [isInAnimation, setIsInAnimation] = useState(true);
  useEffect(() => {
    const storedIsInAnimation = localStorage.getItem("isInAnimation");
    if (storedIsInAnimation) setIsInAnimation(storedIsInAnimation !== "false");
  }, []);

  const [isClearAnimations, setIsClearAnimations] = useState(true);
  useEffect(() => {
    const storedIsClearAnimations = localStorage.getItem("isClearAnimations");
    if (storedIsClearAnimations) setIsClearAnimations(storedIsClearAnimations !== "false");
  }, []);

  const [isRandomInAnimation, setIsRandomInAnimation] = useState(true);
  useEffect(() => {
    const storedIsRandomInAnimation = localStorage.getItem("isRandomInAnimation");
    if (storedIsRandomInAnimation) setIsRandomInAnimation(storedIsRandomInAnimation !== "false");
  }, []);

  const inAnimationsOptions = Object.values(InAnimations);
  const [inAnimation, setInAnimation] = useState("");
  const [inAnimationSpeed, setInAnimationSpeed] = useState(500);
  useEffect(() => {
    const storedInAnimation = localStorage.getItem("inAnimation");
    if (storedInAnimation) setInAnimation(storedInAnimation);
  }, []);
  useEffect(() => {
    const storedInAnimationSpeed = localStorage.getItem("inAnimationSpeed");
    if (storedInAnimationSpeed) setInAnimationSpeed(parseInt(storedInAnimationSpeed));
  }, []);

  const [inAnimationCheckedList, setInAnimationCheckedList] = useState<string[]>([]);
  useEffect(() => {
    const defaultCheckedList = Object.keys(InAnimations);
    const storedCheckedList = localStorage.getItem("inAnimationCheckedList");
    if (storedCheckedList) {
      setInAnimationCheckedList(JSON.parse(storedCheckedList));
    } else {
      setInAnimationCheckedList(defaultCheckedList);
    }
  }, []);

  const inAnimationCheckedChangeHandle = (value: string, checked: boolean) => {
    const checkedList = [...inAnimationCheckedList];
    if (checked) {
      checkedList.push(value);
    } else {
      checkedList.splice(checkedList.indexOf(value), 1);
    }
    setInAnimationCheckedList(checkedList);
    localStorage.setItem("inAnimationCheckedList", JSON.stringify(checkedList));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("videoRatio", videoRatio);
      localStorage.setItem("keyframeSpeed", keyframeSpeed.toString());
      localStorage.setItem("inKeyframeTypeCheckedList", JSON.stringify(inKeyframeTypeCheckedList));
      localStorage.setItem("isClearKeyframes", isClearKeyframes.toString());
      localStorage.setItem("isInAnimation", isInAnimation.toString());
      localStorage.setItem("isClearAnimations", isClearAnimations.toString());
      localStorage.setItem("isRandomInAnimation", isRandomInAnimation.toString());
      localStorage.setItem("inAnimation", inAnimation);
      localStorage.setItem("inAnimationSpeed", inAnimationSpeed.toString());
      localStorage.setItem("inAnimationCheckedList", JSON.stringify(inAnimationCheckedList));
      localStorage.setItem(
        "draftOptions",
        JSON.stringify({
          videoRatio: videoRatioOptions.find((option) => option.value === videoRatio),
          keyframeSpeed,
          inKeyframeTypeCheckedList,
          isClearKeyframes,
          isClearAnimations,
          isRandomInAnimation,
          isInAnimation,
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
    isInAnimation,
    isClearAnimations,
    isRandomInAnimation,
    inAnimation,
    inAnimationSpeed,
    inAnimationCheckedList,
  ]);

  const selecDraftRef = useRef<HTMLSelectElement>(null);
  const [selectedDraft, setSelectedDraft] = useState<string>("");
  async function handleSelectDraft() {
    const draftJsonFile = selecDraftRef.current?.value;
    if (!draftJsonFile) {
      setSelectedDraft("");
    } else {
      setSelectedDraft(draftJsonFile);
    }
  }

  const [processing, setProcessing] = useState(false);
  async function handleProcessDraft(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const selectedDraft = selecDraftRef.current?.value;
    if (!selectedDraft) {
      Swal.fire({ title: t("UnselectedDraftTitle"), icon: "warning" });
      return;
    }

    if (processing) return;
    setProcessing(true);

    const response = await fetch(
      window.localStorage.getItem("copilot_api_url") +
        `/api/v1/draft?draft_json_file=${selectedDraft}`
    );
    const result = await response.json();

    const options = JSON.parse(localStorage.getItem("draftOptions") || "{}");

    const processedResponse = await fetch(`/api/generate?filename=draft_info.json`, {
      method: "POST",
      body: JSON.stringify({
        options: { ...options },
        draft: result.data.draft_info,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const processedDraft = await processedResponse.json();
    if (processedDraft.errMsg) {
      Swal.fire({ title: "Error", text: processedDraft.errMsg, icon: "error" });
      setProcessing(false);
      return;
    }

    const saveResponse = await fetch(
      window.localStorage.getItem("copilot_api_url") + `/api/v1/draft`,
      {
        method: "POST",
        body: JSON.stringify({
          draft_json_file: selectedDraft,
          draft_info: processedDraft,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    await saveResponse.json();

    Swal.fire({ title: t("AddSuccessTitle"), text: t("AddSuccessText"), icon: "success" });
    setProcessing(false);
  }

  return (
    <div className="max-w-md mx-auto flex flex-col gap-y-10">
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
          <option value="">{t("SelectDraft")}</option>
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
          <Label className="mb-2 block text-white">{tds("VideoRatio")}</Label>
          <RadioGroup
            value={videoRatio}
            onValueChange={setVideoRatio}
            className="flex flex-wrap gap-4"
          >
            {videoRatioOptions.map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <RadioGroupItem id={option.id} value={option.value} />
                <Label htmlFor={option.id} className="text-white">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* 关键帧速度 */}
        <div>
          <Label htmlFor="keyframeSpeed" className="mb-2 block text-white">
            {tds("keyframeSpeed")}
          </Label>
          <Input
            id="keyframeSpeed"
            type="number"
            value={keyframeSpeed}
            onChange={(e) => setKeyframeSpeed(e.target.value as any)}
          />
        </div>

        {/* 选择关键帧类型 */}
        <div>
          <Label className="mb-2 block text-white">{tds("inKeyframeType")}</Label>
          <div className="flex max-w-md gap-2 flex-wrap">
            {inKeyframeTypeOptions.map((option) => (
              <div key={option.value} className="flex items-center gap-1 w-1/3">
                <Checkbox
                  id={"animation" + option.value}
                  checked={inKeyframeTypeCheckedList.indexOf(option.value) !== -1}
                  onCheckedChange={(checked) =>
                    inKeyframeTypeCheckedChangeHandle(option.value, !!checked)
                  }
                />
                <Label htmlFor={"animation" + option.value} className="flex text-white">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* 清理旧关键帧开关 */}
        <div>
          <Label htmlFor="isClearKeyframes" className="mb-2 block text-white">
            {tds("isClearKeyframes")}
          </Label>
          <Switch
            id="isClearKeyframes"
            checked={isClearKeyframes}
            onCheckedChange={setIsClearKeyframes}
          />
        </div>

        {/* 入场动画开关 */}
        <div>
          <Label htmlFor="isInAnimation" className="mb-2 block text-white">
            {tds("isInAnimation")}
          </Label>
          <Switch
            id="isInAnimation"
            checked={isInAnimation}
            onCheckedChange={setIsInAnimation}
          />
        </div>

        {/* 清理动画开关 */}
        {!isInAnimation && (
          <div>
            <Label htmlFor="isClearAnimations" className="mb-2 block text-white">
              {tds("isClearAnimations")}
            </Label>
            <Switch
              id="isClearAnimations"
              checked={isClearAnimations}
              onCheckedChange={setIsClearAnimations}
            />
          </div>
        )}

        {/* 随机入场动画开关 */}
        {isInAnimation && (
          <div>
            <Label htmlFor="isRandomInAnimation" className="mb-2 block text-white">
              {tds("isRandomInAnimation")}
            </Label>
            <Switch
              id="isRandomInAnimation"
              checked={isRandomInAnimation}
              onCheckedChange={setIsRandomInAnimation}
            />
          </div>
        )}

        {/* 入场动画选择（非随机） */}
        {!isRandomInAnimation && isInAnimation && (
          <div>
            <Label htmlFor="inAnimation" className="mb-2 block text-white">
              {tds("inAnimation")}
            </Label>
            <Select value={inAnimation} onValueChange={setInAnimation}>
              <SelectTrigger id="inAnimation">
                <SelectValue placeholder={`-- ${tds("PleaseSelectInAnimation")} --`} />
              </SelectTrigger>
              <SelectContent>
                {inAnimationsOptions.map((option) => (
                  <SelectItem key={option.resource_id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* 随机入场动画勾选列表 */}
        {isRandomInAnimation && isInAnimation && (
          <div>
            <Label className="mb-2 block text-white">{tds("inAnimation")}</Label>
            <div className="flex max-w-md gap-2 flex-wrap">
              {inAnimationsOptions.map((option) => (
                <div key={option.resource_id} className="flex items-center gap-1 w-1/4">
                  <Checkbox
                    id={"animation" + option.id}
                    checked={inAnimationCheckedList.indexOf(option.id) !== -1}
                    onCheckedChange={(checked) =>
                      inAnimationCheckedChangeHandle(option.id, !!checked)
                    }
                  />
                  <Label htmlFor={"animation" + option.id} className="flex text-white">
                    {option.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 入场动画速度 */}
        {isInAnimation && (
          <div>
            <Label htmlFor="inAnimationSpeed" className="mb-2 block text-white">
              {tds("inAnimationSpeed")}
            </Label>
            <Input
              id="inAnimationSpeed"
              type="number"
              value={inAnimationSpeed}
              onChange={(e) => setInAnimationSpeed(e.target.value as any)}
            />
          </div>
        )}
      </div>

      <button
        className="inline-block rounded-full bg-brand px-6 py-4 text-center font-bold text-black transition hover:border-black hover:bg-white"
        onClick={handleProcessDraft}
      >
        {processing && <Loader2 className="inline-block mr-2 h-5 w-5 animate-spin" />}
        {t("AddButton")}
      </button>
    </div>
  );
}
