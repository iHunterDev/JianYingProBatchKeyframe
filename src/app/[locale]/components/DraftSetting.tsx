"use client";

import {
  ToggleSwitch,
  Label,
  Modal,
  TextInput,
  Select,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { InAnimations } from "@/jianying/effects/animations";

export default function DraftSetting() {
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  const [isRandomInAnimation, setIsRandomInAnimation] = useState(localStorage.getItem("isRandomInAnimation") === 'false' ? false : true);

  const inAnimationsOptions = Object.values(InAnimations);
  const [inAnimation, setInAnimation] = useState(localStorage.getItem("inAnimation") ?? "");
  const [inAnimationSpeed, setInAnimationSpeed] = useState(localStorage.getItem("inAnimationSpeed") ?? 500);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("isRandomInAnimation", isRandomInAnimation);
      localStorage.setItem("inAnimation", inAnimation);
      localStorage.setItem("inAnimationSpeed", inAnimationSpeed);

      localStorage.setItem("draftOptions", JSON.stringify({
        isRandomInAnimation,
        inAnimation,
        inAnimationSpeed,
      }));
    }, 500)

    return () => {
      clearInterval(timer);
    };
  }, [isRandomInAnimation, inAnimation, inAnimationSpeed]);

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
                    value="入场动画速度（单位：毫秒）"
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
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
