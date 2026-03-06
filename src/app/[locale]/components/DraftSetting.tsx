"use client";

import { useEffect, useState } from "react";
import { InAnimations } from "@/jianying/effects/animations";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

export default function DraftSetting() {
  const t = useTranslations("DraftSetting");

  const [openModal, setOpenModal] = useState(false);

  const videoRatioOptions = [
    { id: "ratio_auto", value: "auto", label: t("Auto") },
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
    { value: "scaleDown", label: t("LargeToSmall") },
    { value: "scaleUp", label: t("SmallToLarge") },
    { value: "leftToRight", label: t("LeftToRight") },
    { value: "rightToLeft", label: t("RightToLeft") },
    { value: "topToBottom", label: t("TopToBottom") },
    { value: "bottomToTop", label: t("BottomToTop") },
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
          isRandomInAnimation,
          isInAnimation,
          isClearAnimations,
          inAnimation,
          inAnimationSpeed,
          inAnimationCheckedList,
        })
      );
    }, 500);
    return () => clearInterval(timer);
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

  return (
    <>
      <div className="mt-3">
        <button
          onClick={() => setOpenModal(true)}
          className="font-medium text-blue-400 hover:underline"
        >
          {t("DraftSetting")}
        </button>

        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t("DraftSetting")}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* 视频比例 */}
              <div>
                <Label className="mb-2 block">{t("VideoRatio")}</Label>
                <RadioGroup
                  value={videoRatio}
                  onValueChange={setVideoRatio}
                  className="flex flex-wrap gap-4"
                >
                  {videoRatioOptions.map((option) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <RadioGroupItem id={option.id} value={option.value} />
                      <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* 关键帧速度 */}
              <div>
                <Label htmlFor="keyframeSpeed" className="mb-2 block">
                  {t("keyframeSpeed")}
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
                <Label className="mb-2 block">{t("inKeyframeType")}</Label>
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
                      <Label htmlFor={"animation" + option.value} className="flex">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 清理旧关键帧开关 */}
              <div>
                <Label htmlFor="isClearKeyframes" className="mb-2 block">
                  {t("isClearKeyframes")}
                </Label>
                <Switch
                  id="isClearKeyframes"
                  checked={isClearKeyframes}
                  onCheckedChange={setIsClearKeyframes}
                />
              </div>

              {/* 入场动画开关 */}
              <div>
                <Label htmlFor="isInAnimation" className="mb-2 block">
                  {t("isInAnimation")}
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
                  <Label htmlFor="isClearAnimations" className="mb-2 block">
                    {t("isClearAnimations")}
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
                  <Label htmlFor="isRandomInAnimation" className="mb-2 block">
                    {t("isRandomInAnimation")}
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
                  <Label htmlFor="inAnimation" className="mb-2 block">
                    {t("inAnimation")}
                  </Label>
                  <Select value={inAnimation} onValueChange={setInAnimation}>
                    <SelectTrigger id="inAnimation">
                      <SelectValue placeholder={`-- ${t("PleaseSelectInAnimation")} --`} />
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
                  <Label className="mb-2 block">{t("inAnimation")}</Label>
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
                        <Label htmlFor={"animation" + option.id} className="flex">
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
                  <Label htmlFor="inAnimationSpeed" className="mb-2 block">
                    {t("inAnimationSpeed")}
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
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
