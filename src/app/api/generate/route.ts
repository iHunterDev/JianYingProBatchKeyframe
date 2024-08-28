// @ts-nocheck
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  // const body = await request.body?.getReader().read()
  // const draftInfoJson = new TextDecoder("utf-8").decode(body.value)
  // console.log(draftInfoJson)
  // const draftInfoData = JSON.parse(draftInfoJson);
  // console.log(draftInfoData)
  // const response = new NextResponse(request.body)
  // return response

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
    // console.log("requestBody", requestBody)

    const draftInfoData = JSON.parse(requestBody);
    // console.log(draftInfoData)

    const generateDraft = handleDraft(draftInfoData);
    console.log("generateDraft", generateDraft);
    return NextResponse.json(generateDraft, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      errMsg: error.message,
    }, {
      status: 500
    });
  }

  
}

function handleDraft(data) {
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
    currentSegments.clip.scale.x = 1.3;
    currentSegments.clip.scale.y = 1.3;

    // 计算缩放后的宽高
    let scaleWidth = videoWidth * currentSegments.clip.scale.x;
    let scaleHeight = videoHeight * currentSegments.clip.scale.y;

    //+-----------------------
    // 添加 position 关键帧
    //+-----------------------
    // 计算关键帧需要用到的xy偏移数据
    let x_left = ((scaleWidth - videoWidth)) / canvasWidth;
    let x_right = -x_left;
    let y_top = (-(scaleHeight - videoHeight)) / canvasHeight;
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

    // todo: add transform to the keyframe data

    // 生成xy关键帧数据
    let KFTypePositionDaata = generateKeyFrames(
      x_left,
      x_right,
      y_top,
      y_bottom,
      duration / 1000
    );

    // 组合关键帧数据
    currentSegments.common_keyframes.push(KFTypePositionDaata[0]);
    currentSegments.common_keyframes.push(KFTypePositionDaata[1]);

    //+-----------------------
    // 添加 Transition 关键帧
    //+-----------------------
    let transitionData = getTransition(11387229);
    transitionData.id;

    // 添加到素材中
    data.materials.transitions.push(transitionData);

    // 将转场添加到视频片段中
    currentSegments.extra_material_refs.splice(1, 0, transitionData.id);
  }

  return data;
}

// 获取关键帧基本结构
function getKeyFrames(type) {
  // KFTypePositionY Y轴
  // KFTypePositionX X轴
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

// 生成关键帧数据
function generateKeyFrames(
  x_left,
  x_right,
  y_top,
  y_bottom,
  time_offset,
  direction
) {
  // xy 的关键帧是要一起添加的
  // 构造关键帧数据
  let KFTypePositionX = getKeyFrames("KFTypePositionX");
  let KFTypePositionY = getKeyFrames("KFTypePositionY");

  // 上 右 下 左
  let directionEnum = [
    // 上
    {
      x: [
        {
          time_offset: 0,
          value: 0,
        },
        {
          time_offset: time_offset,
          value: 0,
        },
      ],
      y: [
        {
          time_offset: 0,
          value: y_top,
        },
        {
          time_offset: time_offset,
          value: y_bottom,
        },
      ],
    },

    // 右
    {
      x: [
        {
          time_offset: 0,
          value: x_right,
        },
        {
          time_offset: time_offset,
          value: x_left,
        },
      ],
      y: [
        {
          time_offset: 0,
          value: 0,
        },
        {
          time_offset: time_offset,
          value: 0,
        },
      ],
    },

    // 下
    {
      x: [
        {
          time_offset: 0,
          value: 0,
        },
        {
          time_offset: time_offset,
          value: 0,
        },
      ],
      y: [
        {
          time_offset: 0,
          value: y_bottom,
        },
        {
          time_offset: time_offset,
          value: y_top,
        },
      ],
    },

    // 左
    {
      x: [
        {
          time_offset: 0,
          value: x_left,
        },
        {
          time_offset: time_offset,
          value: x_right,
        },
      ],
      y: [
        {
          time_offset: 0,
          value: 0,
        },
        {
          time_offset: time_offset,
          value: 0,
        },
      ],
    },
  ];

  if (direction == undefined) {
    direction = getRandomInt(0, 3);
  }

  let currentDirection = directionEnum[direction];

  let x_start = getKeyFramesDotForPosition(
    currentDirection.x[0].time_offset,
    currentDirection.x[0].value
  );
  let x_end = getKeyFramesDotForPosition(
    currentDirection.x[1].time_offset,
    currentDirection.x[1].value
  );
  let y_start = getKeyFramesDotForPosition(
    currentDirection.y[0].time_offset,
    currentDirection.y[0].value
  );
  let y_end = getKeyFramesDotForPosition(
    currentDirection.y[1].time_offset,
    currentDirection.y[1].value
  );

  KFTypePositionX.keyframe_list.push(x_start);
  KFTypePositionX.keyframe_list.push(x_end);
  KFTypePositionY.keyframe_list.push(y_start);
  KFTypePositionY.keyframe_list.push(y_end);

  return [KFTypePositionX, KFTypePositionY];
}

// 随机数
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 获取转场
function getTransition(effect_id) {
  let transitionList = {
    "11387229": {
      category_id: "40427",
      category_name: "叠化",
      duration: 1200000,
      effect_id: "11387229",
      id: uuidv4().toLocaleUpperCase(),
      is_overlap: true,
      name: "雾化",
      // path: "/Users/wenzhuo/Library/Containers/com.lemon.lvpro/Data/Movies/JianyingPro/User Data/Cache/effect/11387229/37f78b14efd59eacef1a2090ab81e785",
      platform: "all",
      request_id: "202309291644056EE2BA652126078C5561",
      resource_id: "7216171159589491259",
      type: "transition",
    },
  };
  return transitionList[effect_id];
}
