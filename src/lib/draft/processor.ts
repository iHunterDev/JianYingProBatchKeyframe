import {InAnimations} from '@/jianying/effects/animations';
import type {DraftSettings} from './settings';

type EntranceAnimation = (typeof InAnimations)[keyof typeof InAnimations];
const animations: Record<string, EntranceAnimation> = InAnimations;
interface KeyframeDot {curveType:string; graphID:string; id:string; left_control:{x:number;y:number};right_control:{x:number;y:number};time_offset:number;values:number[]}
interface Keyframe {id:string;keyframe_list:KeyframeDot[];material_id:string;property_type:string}
interface MaterialAnimation {animations:EntranceAnimation[];id:string;multi_language_current:string;type:string}
interface Dot {timeOffset:number;value:number}
export interface Draft {
  canvas_config: {width:number;height:number;ratio:string;[key:string]:unknown};
  materials: {videos:{width:number;height:number;[key:string]:unknown}[];material_animations:(MaterialAnimation | [])[];[key:string]:unknown};
  tracks: {segments:{source_timerange:{duration:number;[key:string]:unknown};clip:{scale:{x:number;y:number;[key:string]:unknown};[key:string]:unknown};common_keyframes:Keyframe[];extra_material_refs:string[];[key:string]:unknown}[];[key:string]:unknown}[];
  [key:string]:unknown;
}
export type ProcessorOptions = Partial<Omit<DraftSettings,'videoRatio'>> & {videoRatio?:{value:string;width?:number;height?:number}};

export function handleDraft(data: Draft, options: ProcessorOptions) {
  if (options && options.videoRatio && options.videoRatio.value !== "auto") {
    data.canvas_config.width = options.videoRatio.width ?? data.canvas_config.width;
    data.canvas_config.height = options.videoRatio.height ?? data.canvas_config.height;
    data.canvas_config.ratio = options.videoRatio.value;
  }

  for (let i = 0; i < data.tracks[0].segments.length; i++) {
    const currentSegments = data.tracks[0].segments[i];

    const canvasWidth = data.canvas_config.width;
    const canvasHeight = data.canvas_config.height;

    const videoWidth = data.materials.videos[i].width;
    const videoHeight = data.materials.videos[i].height;

    const duration = data.tracks[0].segments[i].source_timerange.duration;

    const scaleRatio = calculateScale(
      canvasWidth,
      canvasHeight,
      videoWidth,
      videoHeight
    );
    let scaleBase = 1.3; // 关键帧缩放基础倍数（前端展示名字是 关键帧速度）
    if (options && options.keyframeSpeed) {
      scaleBase = 1 + Number(options.keyframeSpeed) / 10;
    }
    currentSegments.clip.scale.x = scaleRatio * scaleBase;
    currentSegments.clip.scale.y = scaleRatio * scaleBase;

    const scaleWidth = canvasWidth * scaleBase;
    const scaleHeight = canvasHeight * scaleBase;

    const x_left = (scaleWidth - canvasWidth) / canvasWidth;
    const x_right = -x_left;
    const y_top = -(scaleHeight - canvasHeight) / canvasHeight;
    const y_bottom = -y_top;

    const KFTypePositionData = generateKeyFrames(
      x_left,
      x_right,
      y_top,
      y_bottom,
      duration,
      scaleRatio,
      scaleBase,
      options.inKeyframeTypeCheckedList
    );

    if (options.isClearKeyframes) {
      currentSegments.common_keyframes = [];
    }
    KFTypePositionData.forEach((data) => {
      currentSegments.common_keyframes.push(data);
    });

    if (options && options.isInAnimation) {
      let inAnimation;

      if (options.isRandomInAnimation) {
        const whiteList = options.inAnimationCheckedList ?? [];
        inAnimation = getRandomMaterialAnimations(whiteList);
      } else if (options.inAnimation) {
        inAnimation = getMaterialAnimations(options.inAnimation);
      } else {
        throw new Error("缺少入场动画参数");
      }

      if (options.inAnimationSpeed) {
        inAnimation.duration = Number(options.inAnimationSpeed) * 1000;
      }

      const materialAnimation = getMaterialAnimationLayout();
      data.materials.material_animations[i] = materialAnimation;
      materialAnimation.animations.push(inAnimation);

      currentSegments.extra_material_refs.splice(
        1,
        0,
        materialAnimation.id
      );
    } else if (options && options.isClearAnimations) {
      data.materials.material_animations[i] = [];
    }
  }

  return data;
}

function getKeyFrames(type: string): Keyframe {
  return {
    id: crypto.randomUUID().toUpperCase(),
    keyframe_list: [],
    material_id: "",
    property_type: type,
  };
}

function getKeyFramesDotForPosition(time_offset: number, value: number) {
  return {
    curveType: "Line",
    graphID: "",
    id: crypto.randomUUID().toUpperCase(),
    left_control: {
      x: 0,
      y: 0,
    },
    right_control: {
      x: 0,
      y: 0,
    },
    time_offset: time_offset,
    values: [value],
  };
}

function generateKeyFrames(
  xLeft: number,
  xRight: number,
  yTop: number,
  yBottom: number,
  timeOffset: number,
  scaleRatio: number,
  scaleBase: number,
  directionOptions: string[] | undefined
) {
  const keyframeTypes: Record<string, {x: Dot[]; y: Dot[]; scale?: Dot[]}> = {
    scaleDown: {
      x: [
        { timeOffset: 0, value: 0 },
        { timeOffset: timeOffset, value: 0 },
      ],
      y: [
        { timeOffset: 0, value: 0 },
        { timeOffset: timeOffset, value: 0 },
      ],
      scale: [
        { timeOffset: 0, value: scaleRatio * scaleBase },
        { timeOffset: timeOffset, value: scaleRatio },
      ],
    },
    scaleUp: {
      x: [
        { timeOffset: 0, value: 0 },
        { timeOffset: timeOffset, value: 0 },
      ],
      y: [
        { timeOffset: 0, value: 0 },
        { timeOffset: timeOffset, value: 0 },
      ],
      scale: [
        { timeOffset: 0, value: scaleRatio },
        { timeOffset: timeOffset, value: scaleRatio * scaleBase },
      ],
    },
    leftToRight: {
      x: [
        { timeOffset: 0, value: xLeft },
        { timeOffset: timeOffset, value: xRight },
      ],
      y: [
        { timeOffset: 0, value: 0 },
        { timeOffset: timeOffset, value: 0 },
      ],
    },
    rightToLeft: {
      x: [
        { timeOffset: 0, value: xRight },
        { timeOffset: timeOffset, value: xLeft },
      ],
      y: [
        { timeOffset: 0, value: 0 },
        { timeOffset: timeOffset, value: 0 },
      ],
    },
    topToBottom: {
      x: [
        { timeOffset: 0, value: 0 },
        { timeOffset: timeOffset, value: 0 },
      ],
      y: [
        { timeOffset: 0, value: yTop },
        { timeOffset: timeOffset, value: yBottom },
      ],
    },
    bottomToTop: {
      x: [
        { timeOffset: 0, value: 0 },
        { timeOffset: timeOffset, value: 0 },
      ],
      y: [
        { timeOffset: 0, value: yBottom },
        { timeOffset: timeOffset, value: yTop },
      ],
    },
  };

  if (directionOptions == undefined) {
    directionOptions = Object.keys(keyframeTypes);
  }
  const randomIndex = Math.floor(Math.random() * directionOptions.length);
  const selectedType = keyframeTypes[directionOptions[randomIndex]];
  const selectedKey = directionOptions[randomIndex];

  if (["scaleUp", "scaleDown"].includes(selectedKey)) {
    const KFTypeScale = getKeyFrames("KFTypeScaleX");
    const scaleStartKey = getKeyFramesDotForPosition(
      selectedType.scale![0].timeOffset,
      selectedType.scale![0].value
    );
    const scaleEndKey = getKeyFramesDotForPosition(
      selectedType.scale![1].timeOffset,
      selectedType.scale![1].value
    );
    KFTypeScale.keyframe_list.push(scaleStartKey);
    KFTypeScale.keyframe_list.push(scaleEndKey);
    return [KFTypeScale];
  } else if (
    ["leftToRight", "rightToLeft", "topToBottom", "bottomToTop"].includes(
      selectedKey
    )
  ) {
    const KFTypePositionX = getKeyFrames("KFTypePositionX");
    const KFTypePositionY = getKeyFrames("KFTypePositionY");

    const xStart = getKeyFramesDotForPosition(
      selectedType.x[0].timeOffset,
      selectedType.x[0].value
    );
    const xEnd = getKeyFramesDotForPosition(
      selectedType.x[1].timeOffset,
      selectedType.x[1].value
    );
    const yStart = getKeyFramesDotForPosition(
      selectedType.y[0].timeOffset,
      selectedType.y[0].value
    );
    const yEnd = getKeyFramesDotForPosition(
      selectedType.y[1].timeOffset,
      selectedType.y[1].value
    );

    KFTypePositionX.keyframe_list.push(xStart);
    KFTypePositionX.keyframe_list.push(xEnd);
    KFTypePositionY.keyframe_list.push(yStart);
    KFTypePositionY.keyframe_list.push(yEnd);
    return [KFTypePositionX, KFTypePositionY];
  } else {
    return [];
  }
}

function calculateScale(targetWidth: number, targetHeight: number, sourceWidth: number, sourceHeight: number) {
  let scaledWidth, scaledHeight;
  let scale;

  if (targetHeight < targetWidth) {
    scaledWidth = (targetHeight / sourceHeight) * sourceWidth;
    scaledHeight = targetHeight;
  } else {
    scaledHeight = (targetWidth / sourceWidth) * sourceHeight;
    scaledWidth = targetWidth;
  }

  if (scaledWidth < targetWidth) {
    scale = Math.ceil((targetWidth / scaledWidth) * 10) / 10;
  } else {
    scale = Math.ceil((targetHeight / scaledHeight) * 10) / 10;
  }

  return scale;
}

function getMaterialAnimationLayout(): MaterialAnimation {
  return {
    animations: [],
    id: crypto.randomUUID().toUpperCase(),
    multi_language_current: "none",
    type: "sticker_animation",
  };
}

function getMaterialAnimations(effect_id: string) {
  const animation = animations[effect_id];
  if (!animation) throw new Error("Unknown entrance animation");
  return structuredClone(animation);
}

function getRandomMaterialAnimations(whiteList: string[] | undefined) {
  const InAnimationsArr = Object.values(InAnimations);
  const filteredInAnimationsArr = InAnimationsArr.filter((animation) => {
    if (whiteList?.length) {
      return whiteList.indexOf(animation.id) != -1;
    } else {
      return true;
    }
  });
  const randomAnimations =
    filteredInAnimationsArr[
    Math.floor(Math.random() * filteredInAnimationsArr.length)
    ];
  if (!randomAnimations) throw new Error("No matching entrance animation");
  return structuredClone(randomAnimations);
}
