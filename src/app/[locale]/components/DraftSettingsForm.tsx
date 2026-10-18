"use client";

import {useId} from "react";
import { InAnimations } from "@/jianying/effects/animations";
import { useTranslations } from "next-intl";
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

import {useDraftSettings} from "@/hooks/useDraftSettings";
import {videoRatios, type DraftSettings} from "@/lib/draft/settings";
export default function DraftSettingsForm() {
  const t = useTranslations("DraftSetting");
  const prefix = useId();
  const {settings, updateSettings} = useDraftSettings();
  const {videoRatio, keyframeSpeed, inKeyframeTypeCheckedList, isClearKeyframes, isInAnimation, isClearAnimations, isRandomInAnimation, inAnimation, inAnimationSpeed, inAnimationCheckedList} = settings;
  function set<K extends keyof DraftSettings>(key: K, value: DraftSettings[K]) { updateSettings({[key]: value}); }
  const videoRatioOptions = videoRatios.map(r => ({...r, id: `ratio_${r.value}`, label: r.value === 'auto' ? t('Auto') : r.value}));
  const inKeyframeTypeOptions = [
    {value: "scaleDown", label: t("LargeToSmall")}, {value: "scaleUp", label: t("SmallToLarge")},
    {value: "leftToRight", label: t("LeftToRight")}, {value: "rightToLeft", label: t("RightToLeft")},
    {value: "topToBottom", label: t("TopToBottom")}, {value: "bottomToTop", label: t("BottomToTop")},
  ];
  const inAnimationsOptions = Object.values(InAnimations);
  function toggle(key: 'inKeyframeTypeCheckedList' | 'inAnimationCheckedList', value: string, checked: boolean) {
    set(key, checked ? [...new Set([...settings[key], value])] : settings[key].filter(item => item !== value));
  }
  return (
            <div className="space-y-6">
              {/* 视频比例 */}
              <div>
                <Label className="mb-2 block">{t("VideoRatio")}</Label>
                <RadioGroup
                  value={videoRatio}
                  onValueChange={value => set("videoRatio", value)}
                  className="flex flex-wrap gap-4"
                >
                  {videoRatioOptions.map((option) => (
                    <div key={option.id} className="flex items-center gap-2">
                      <RadioGroupItem id={prefix + option.id} value={option.value} />
                      <Label htmlFor={prefix + option.id}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* 关键帧速度 */}
              <div>
                <Label htmlFor={prefix + "keyframeSpeed"} className="mb-2 block">
                  {t("keyframeSpeed")}
                </Label>
                <Input
                  id={prefix + "keyframeSpeed"}
                  type="number"
                  min={0}
                  step={1}
                  value={keyframeSpeed}
                  onChange={(e) => set("keyframeSpeed", Number(e.target.value))}
                />
              </div>

              {/* 选择关键帧类型 */}
              <div>
                <Label className="mb-2 block">{t("inKeyframeType")}</Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {inKeyframeTypeOptions.map((option) => (
                    <div key={option.value} className="flex min-h-11 items-center gap-2">
                      <Checkbox
                        id={prefix + "animation" + option.value}
                        checked={inKeyframeTypeCheckedList.indexOf(option.value) !== -1}
                        onCheckedChange={(checked) =>
                          toggle("inKeyframeTypeCheckedList", option.value, !!checked)
                        }
                      />
                      <Label htmlFor={prefix + "animation" + option.value} className="flex min-h-11 flex-1 items-center">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 清理旧关键帧开关 */}
              <div>
                <Label htmlFor={prefix + "isClearKeyframes"} className="mb-2 block">
                  {t("isClearKeyframes")}
                </Label>
                <Switch
                  id={prefix + "isClearKeyframes"}
                  checked={isClearKeyframes}
                  onCheckedChange={value => set("isClearKeyframes", value)}
                />
              </div>

              {/* 入场动画开关 */}
              <div>
                <Label htmlFor={prefix + "isInAnimation"} className="mb-2 block">
                  {t("isInAnimation")}
                </Label>
                <Switch
                  id={prefix + "isInAnimation"}
                  checked={isInAnimation}
                  onCheckedChange={value => set("isInAnimation", value)}
                />
              </div>

              {/* 清理动画开关 */}
              {!isInAnimation && (
                <div>
                  <Label htmlFor={prefix + "isClearAnimations"} className="mb-2 block">
                    {t("isClearAnimations")}
                  </Label>
                  <Switch
                    id={prefix + "isClearAnimations"}
                    checked={isClearAnimations}
                    onCheckedChange={value => set("isClearAnimations", value)}
                  />
                </div>
              )}

              {/* 随机入场动画开关 */}
              {isInAnimation && (
                <div>
                  <Label htmlFor={prefix + "isRandomInAnimation"} className="mb-2 block">
                    {t("isRandomInAnimation")}
                  </Label>
                  <Switch
                    id={prefix + "isRandomInAnimation"}
                    checked={isRandomInAnimation}
                    onCheckedChange={value => set("isRandomInAnimation", value)}
                  />
                </div>
              )}

              {/* 入场动画选择（非随机） */}
              {!isRandomInAnimation && isInAnimation && (
                <div>
                  <Label htmlFor={prefix + "inAnimation"} className="mb-2 block">
                    {t("inAnimation")}
                  </Label>
                  <Select value={inAnimation} onValueChange={value => set("inAnimation", value)}>
                    <SelectTrigger id={prefix + "inAnimation"}>
                      <SelectValue placeholder={`-- ${t("PleaseSelectInAnimation")} --`} />
                    </SelectTrigger>
                    <SelectContent>
                      {inAnimationsOptions.map((option) => (
                        <SelectItem key={option.resource_id} value={option.id}>
                          {t(`Animations.${option.id}`)}
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
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {inAnimationsOptions.map((option) => (
                      <div key={option.resource_id} className="flex min-h-11 items-center gap-2">
                        <Checkbox
                          id={prefix + "animation" + option.id}
                          checked={inAnimationCheckedList.indexOf(option.id) !== -1}
                          onCheckedChange={(checked) =>
                            toggle("inAnimationCheckedList", option.id, !!checked)
                          }
                        />
                        <Label htmlFor={prefix + "animation" + option.id} className="flex min-h-11 flex-1 items-center">
                          {t(`Animations.${option.id}`)}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 入场动画速度 */}
              {isInAnimation && (
                <div>
                  <Label htmlFor={prefix + "inAnimationSpeed"} className="mb-2 block">
                    {t("inAnimationSpeed")}
                  </Label>
                  <Input
                    id={prefix + "inAnimationSpeed"}
                    type="number"
                    min={0}
                    step={1}
                    value={inAnimationSpeed}
                    onChange={(e) => set("inAnimationSpeed", Number(e.target.value))}
                  />
                </div>
              )}
            </div>
  );
}
