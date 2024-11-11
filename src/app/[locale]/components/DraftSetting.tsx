"use client";

import {
  ToggleSwitch,
  Label,
  Modal,
  TextInput,
  Select,
  Checkbox,
  Radio,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { InAnimations } from "@/jianying/effects/animations";
import { useTranslations } from "next-intl";

export default function DraftSetting() {
  const t = useTranslations("DraftSetting");

  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  const videoRatioOptions = [
    { id: "ratio_auto", value: "auto", label: t("Auto") },
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
  const inKeyframeTypeOptions = [{ value: "scaleDown", label: t("LargeToSmall") }, { value: "scaleUp", label: t("SmallToLarge") }, { value: "leftToRight", label: t("LeftToRight") }, { value: "rightToLeft", label: t("RightToLeft") }, { value: "topToBottom", label: t("TopToBottom") }, { value: "bottomToTop", label: t("BottomToTop") }];
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

  // 入场动画开关
  const [isInAnimation, setIsInAnimation] = useState(true);
  useEffect(() => {
    // 只在浏览器端访问 localStorage
    const storedIsInAnimation = localStorage.getItem("isInAnimation");
    if (storedIsInAnimation) {
      setIsInAnimation(storedIsInAnimation === "false" ? false : true);
    }
  }, []);

  // 是否清理动画
  const [isClearAnimations, setIsClearAnimations] = useState(true);
  useEffect(() => {
    // 只在浏览器端访问 localStorage
    const storedIsClearAnimations = localStorage.getItem("isClearAnimations");
    if (storedIsClearAnimations) {
      setIsClearAnimations(storedIsClearAnimations === "false" ? false : true);
    }
  }, []);

  // 随机入场动画开关
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
      localStorage.setItem("isInAnimation", isInAnimation.toString());
      localStorage.setItem("isClearAnimations", isClearAnimations.toString());
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
          isInAnimation,
          isClearAnimations,
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

  return (
    <>
      <div className="mt-3">
        <a
          href="#"
          onClick={() => setOpenModal(true)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {t("DraftSetting")}
        </a>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {t("DraftSetting")}
              </h3>

              {/* 视频比例 */}
              <div>
                <div className="mb-2 block">
                  <Label value={t("VideoRatio")} />
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
                      <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 关键帧速度 */}
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="keyframeSpeed"
                    value={t("keyframeSpeed")}
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
                    value={t("inKeyframeType")}
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
                        className="flex"
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
                    value={t("isClearKeyframes")}
                  />
                </div>
                <ToggleSwitch
                  checked={isClearKeyframes}
                  onChange={setIsClearKeyframes}
                />
              </div>

              {/* 入场动画开关 */}
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="isInAnimation"
                    value={t("isInAnimation")}
                  />
                </div>
                <ToggleSwitch
                  checked={isInAnimation}
                  onChange={setIsInAnimation}
                />
              </div>

              {/* 清理动画开关 */}
              {!isInAnimation && (
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="isClearAnimations"
                      value={t("isClearAnimations")}
                    />
                  </div>
                  <ToggleSwitch
                    checked={isClearAnimations}
                    onChange={setIsClearAnimations}
                  />
                </div>
              )}

              {/* 随机入场动画开关 */}
              {isInAnimation && (
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="isRandomInAnimation"
                      value={t("isRandomInAnimation")}
                    />
                  </div>
                  <ToggleSwitch
                    checked={isRandomInAnimation}
                    onChange={setIsRandomInAnimation}
                  />
                </div>
              )}

              {/* 入场动画选择，如果是随机入场动画，则不显示 */}
              {!isRandomInAnimation && isInAnimation ? (
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="inAnimation" value={t("inAnimation")} />
                  </div>
                  <Select
                    onChange={(value) => setInAnimation(value.target.value)}
                  >
                    <option value="">-- {t("PleaseSelectInAnimation")} --</option>
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

              {isRandomInAnimation && isInAnimation ? (
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="inAnimation" value={t("inAnimation")} />
                  </div>
                  <div className="flex max-w-md gap-2 flex-wrap">
                    {inAnimationsOptions.map((option) => (
                      <div
                        key={option.resource_id}
                        className="flex items-center gap-1 w-1/4"
                      >
                        <Checkbox
                          checked={
                            inAnimationCheckedList.indexOf(option.id) != -1
                          }
                          id={"animation" + option.id}
                          value={option.id}
                          onChange={inAnimationCheckedChangeHandle}
                        />
                        <Label
                          htmlFor={"animation" + option.id}
                          className="flex"
                        >
                          {option.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* 入场动画速度 */}
              {isInAnimation ? (
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="inAnimationSpeed"
                      value={t("inAnimationSpeed")}
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
              ) : null}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
