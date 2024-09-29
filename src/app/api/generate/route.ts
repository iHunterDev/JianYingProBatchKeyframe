// @ts-nocheck
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { InAnimations } from "@/jianying/effects/animations";
import { Transitions } from "@/jianying/effects/transitions";

export async function POST(request: NextRequest) {
  const chunks: Uint8Array[] = [];
  const reader = request.body?.getReader();
  try {
    while (true) {
      const { done, value } = await reader?.read();
      if (done) break;
      chunks.push(value);
    }

    const mergedChunk = new Uint8Array(
      chunks.reduce((acc, curr) => [...acc, ...curr], [])
    );
    // console.log("mergedChunk", mergedChunk)
    const requestBody = new TextDecoder("utf-8").decode(mergedChunk);
    console.log("requestBody", requestBody);

    // Draft processor data
    const draftProcessorData = JSON.parse(requestBody);
    // console.log(draftProcessorData)

    const generateDraft = handleDraft(
      draftProcessorData.draft,
      draftProcessorData.options
    );
    // console.log("generateDraft", generateDraft);
    return NextResponse.json(generateDraft, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        errMsg: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

function handleDraft(data, options) {
  // 视频比例设置
  if (options && options.videoRatio && options.videoRatio.value !== "auto") {
    data.canvas_config.width = options.videoRatio.width;
    data.canvas_config.height = options.videoRatio.height;
    data.canvas_config.ratio = options.videoRatio.value;
  }

  for (let i = 0; i < data.tracks[0].segments.length; i++) {
    // 获取主轴上的视频片段
    let currentSegments = data.tracks[0].segments[i];

    // 画布大小
    let canvasWidth = data.canvas_config.width;
    let canvasHeight = data.canvas_config.height;

    // 获取素材宽高
    let videoWidth = data.materials.videos[i].width;
    let videoHeight = data.materials.videos[i].height;

    // 获取视频长度 视频中获取的 10800000000
    // 从关键帧获取到 time_offset 10000000
    let duration = data.materials.videos[i].duration;

    // 放大倍速
    let scaleRatio = calculateScale(
      canvasWidth,
      canvasHeight,
      videoWidth,
      videoHeight
    );
    let scaleBase = 1.3; // 关键帧缩放基础倍数（前端展示名字是 关键帧速度）
    if (options && options.keyframeSpeed) {
      scaleBase = 1 + Number(options.keyframeSpeed) / 10;
    }
    console.log("scaleBase", scaleBase);
    currentSegments.clip.scale.x = scaleRatio * scaleBase;
    currentSegments.clip.scale.y = scaleRatio * scaleBase;

    // 计算缩放后的宽高
    let scaleWidth = canvasWidth * scaleBase;
    let scaleHeight = canvasHeight * scaleBase;

    //+-----------------------
    // 添加 position 关键帧
    //+-----------------------
    // 计算关键帧需要用到的xy偏移数据
    let x_left = (scaleWidth - canvasWidth) / canvasWidth;
    let x_right = -x_left;
    let y_top = -(scaleHeight - canvasHeight) / canvasHeight;
    let y_bottom = -y_top;

    // print data
    // console.log("scaleWidth", scaleWidth);
    // console.log("scaleHeight", scaleHeight);
    // console.log("videoWidth", videoWidth);
    // console.log("videoHeight", videoHeight);
    // console.log("canvasWidth", canvasWidth);
    // console.log("canvasHeight", canvasHeight);
    // console.log("x_left", x_left);
    // console.log("x_right", x_right);
    // console.log("y_top", y_top);
    // console.log("y_bottom", y_bottom);

    // 生成xy关键帧数据
    let KFTypePositionData = generateKeyFrames(
      x_left,
      x_right,
      y_top,
      y_bottom,
      duration / 1000,
      scaleRatio,
      scaleBase,
      options.inKeyframeTypeCheckedList
    );

    // 组合关键帧数据
    // 移除原来所有的关键帧数据
    if (options.isClearKeyframes) {
      currentSegments.common_keyframes = [];
    }
    // 遍历所有关键帧数据
    KFTypePositionData.forEach((data) => {
      currentSegments.common_keyframes.push(data);
    });

    //+-----------------------
    // 添加 Transition 关键帧
    //+-----------------------
    // let transitionData = getTransition(11387229);
    // transitionData.id;

    // 添加到素材中
    // data.materials.transitions.push(transitionData);

    // 将转场添加到视频片段中
    // currentSegments.extra_material_refs.splice(1, 0, transitionData.id);

    //+-----------------------
    // 添加入场 material_animations 关键帧
    //+-----------------------
    let inAnimation;

    if (options && options.isRandomInAnimation) {
      const whiteList = options.inAnimationCheckedList ?? [];
      inAnimation = getRandomMaterialAnimations(whiteList);
    } else if (options && options.inAnimation) {
      inAnimation = getMaterialAnimations(options.inAnimation);
    } else {
      throw new Error("缺少入场动画参数");
    }

    // 如果有设置入场动画速度，则使用设置的入场动画速度
    if (options && options.inAnimationSpeed) {
      inAnimation.duration = Number(options.inAnimationSpeed) * 1000;
    }

    /**
// 没有设置过入场动画的数据
[]

// 已经存在过入场动画的数据
[
    {
        "animations": [
            {
                "anim_adjust_params": null,
                "category_id": "in",
                "category_name": "入场",
                "duration": 500000,
                "id": "624705",
                "material_type": "video",
                "name": "渐显",
                "panel": "video",
                "path": "/Users/wenzhuo/Library/Containers/com.lemon.lvpro/Data/Movies/JianyingPro/User Data/Cache/effect/624705/ee269b77e45a2466bd3e9cab0cff7137",
                "platform": "all",
                "request_id": "2024091516421720A619E8C1381BFF2B23",
                "resource_id": "6798320778182922760",
                "start": 0,
                "type": "in"
            }
        ],
        "id": "D5B4CCEA-82BE-4295-8404-C33208A78B7D",
        "multi_language_current": "none",
        "type": "sticker_animation"
    }
]

// 存在过动画但是又删除了入场动画
[
    {
        "animations": [],
        "id": "D5B4CCEA-82BE-4295-8404-C33208A78B7D",
        "multi_language_current": "none",
        "type": "sticker_animation"
    }
]
*/
    // 添加到素材中
    // 初始化结构
    data.materials.material_animations[i] = getMaterialAnimationLayout();
    // console.log("data.materials.material_animations[i]", data.materials.material_animations[i]);

    data.materials.material_animations[i].animations.push(inAnimation);
    // console.log("data.materials.material_animations[i].animations.push", data.materials.material_animations[i]);

    currentSegments.extra_material_refs.splice(
      1,
      0,
      data.materials.material_animations[i].id
    );
  }

  return data;
}

// 获取关键帧基本结构
function getKeyFrames(type) {
  // KFTypePositionY Y轴
  // KFTypePositionX X轴
  // KFTypeScaleX X轴缩放
  return {
    id: uuidv4().toLocaleUpperCase(),
    keyframe_list: [],
    material_id: "",
    property_type: type,
  };
}

// 获取 xy 坐标的关键帧配置数据
function getKeyFramesDotForPosition(time_offset, value) {
  return {
    curveType: "Line",
    graphID: "",
    id: uuidv4().toLocaleUpperCase(),
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
  xLeft,
  xRight,
  yTop,
  yBottom,
  timeOffset,
  scaleRatio,
  scaleBase,
  directionOptions
) {
  const keyframeTypes = {
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
      selectedType.scale[0].timeOffset,
      selectedType.scale[0].value
    );
    const scaleEndKey = getKeyFramesDotForPosition(
      selectedType.scale[1].timeOffset,
      selectedType.scale[1].value
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

// 随机数
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 获取转场
function getTransition(effect_id) {
  let transitionList = Transitions;
  return transitionList[effect_id];
}

/**
 * 计算缩放比例倍
 * @param {number} targetWidth - 目标宽度
 * @param {number} targetHeight - 目标高度
 * @param {number} sourceWidth - 素材宽度
 * @param {number} sourceHeight - 素材高度
 * @returns {number} 缩放比例
 */
function calculateScale(targetWidth, targetHeight, sourceWidth, sourceHeight) {
  let scaledWidth, scaledHeight;
  let scale;

  // 判断目标的宽高哪个是短边
  if (targetHeight < targetWidth) {
    // 高度是短边，等比例缩放素材到目标高度
    scaledWidth = (targetHeight / sourceHeight) * sourceWidth;
    scaledHeight = targetHeight;
  } else {
    // 宽度是短边，等比例缩放素材到目标宽度
    scaledHeight = (targetWidth / sourceWidth) * sourceHeight;
    scaledWidth = targetWidth;
  }

  // 根据短边计算宽或高的放大比例，进1取整并保留一位小数
  if (scaledWidth < targetWidth) {
    // 如果宽是短边，则计算宽度的放大比例
    scale = Math.ceil((targetWidth / scaledWidth) * 10) / 10;
  } else {
    // 如果高是短边，则计算高度的放大比例
    scale = Math.ceil((targetHeight / scaledHeight) * 10) / 10;
  }

  return scale;
}

// 示例调用
// console.log(calculateScale(500, 300, 400, 200)); // 输出类似：1.7

// 获取动画结构
function getMaterialAnimationLayout() {
  return {
    animations: [],
    id: uuidv4().toLocaleUpperCase(),
    multi_language_current: "none",
    type: "sticker_animation",
  };
}

// 获取入场动画
function getMaterialAnimations(effect_id) {
  return InAnimations[effect_id];
}

// 随机获取入场动画
function getRandomMaterialAnimations(whiteList: string[] | undefined) {
  const InAnimationsArr = Object.values(InAnimations);
  const filteredInAnimationsArr = InAnimationsArr.filter((animation) => {
    if (whiteList?.length) {
      return whiteList.indexOf(animation.id) != -1;
    } else {
      return true;
    }
  });
  let randomAnimations =
    filteredInAnimationsArr[
      Math.floor(Math.random() * filteredInAnimationsArr.length)
    ];
  return randomAnimations;
}
