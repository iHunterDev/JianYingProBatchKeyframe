"use client";

import { ToggleSwitch, Label, Modal, TextInput, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { InAnimations } from "@/jianying/effects/animations";

export default function DraftSetting() {
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  const [keyframeSpeed, setKeyframeSpeed] = useState(
    localStorage.getItem("keyframeSpeed") ?? 3
  );

  const [isRandomInAnimation, setIsRandomInAnimation] = useState(
    localStorage.getItem("isRandomInAnimation") === "false" ? false : true
  );

  const inAnimationsOptions = Object.values(InAnimations);
  const [inAnimation, setInAnimation] = useState(
    localStorage.getItem("inAnimation") ?? ""
  );
  const [inAnimationSpeed, setInAnimationSpeed] = useState(
    localStorage.getItem("inAnimationSpeed") ?? 500
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("keyframeSpeed", keyframeSpeed.toString());
      localStorage.setItem(
        "isRandomInAnimation",
        isRandomInAnimation.toString()
      );
      localStorage.setItem("inAnimation", inAnimation);
      localStorage.setItem("inAnimationSpeed", inAnimationSpeed.toString());

      localStorage.setItem(
        "draftOptions",
        JSON.stringify({
          keyframeSpeed,
          isRandomInAnimation,
          inAnimation,
          inAnimationSpeed,
        })
      );
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [keyframeSpeed, isRandomInAnimation, inAnimation, inAnimationSpeed]);

  return (
    <>
      <div className="mt-3">
        <a
          href="#"
          onClick={() => setOpenModal(true)}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          草稿处理设置
        </a>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                草稿处理设置
              </h3>

              {/* 关键帧速度 */}
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="keyframeSpeed"
                    value="关键帧速度（建议范围 1-10）"
                  />
                </div>
                <TextInput
                  type="number"
                  value={keyframeSpeed}
                  required
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setKeyframeSpeed(e.target.value)
                  }
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="isRandomInAnimation"
                    value="开启随机入场动画"
                  />
                </div>
                <ToggleSwitch
                  checked={isRandomInAnimation}
                  label={isRandomInAnimation ? "开启" : "关闭"}
                  onChange={setIsRandomInAnimation}
                />
              </div>

              {/* 入场动画选择，如果是随机入场动画，则不显示 */}
              {!isRandomInAnimation ? (
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="inAnimation" value="选择固定入场动画" />
                  </div>
                  <Select
                    onChange={(value) => setInAnimation(value.target.value)}
                  >
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
                    value="入场动画速度（单位：毫秒 1s = 1000ms）"
                  />
                </div>
                <TextInput
                  type="number"
                  value={inAnimationSpeed}
                  required
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInAnimationSpeed(e.target.value)
                  }
                />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
