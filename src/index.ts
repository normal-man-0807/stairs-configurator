import './styles.css';
import StairSimulator from './StairSimulation';

import {
  ICapType,
  IMaterialType,
  IPostType,
  ISPINDLETYPE,
  IStairDirection,
  IThreadMode,
} from './@types/params';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const simulator = new StairSimulator(canvas);
document.getElementById('straightflight-tab')?.addEventListener('click', () => {
  drawStraightFlight();
});

document
  .getElementById('create_straight_stair')
  ?.addEventListener('click', () => {
    drawStraightFlight();
  });

document.getElementById('quarterturn-tab')?.addEventListener('click', () => {
  drawQuarterTurn();
});

document
  .getElementById('create_quarter_turn_stair')
  ?.addEventListener('click', () => {
    drawQuarterTurn();
  });

document.getElementById('halfturn-tab')?.addEventListener('click', () => {
  drawHalfTurn();
});

document
  .getElementById('create_half_turn_stair')
  ?.addEventListener('click', () => {
    drawHalfTurn();
  });

// How to call lib.
function drawStraightFlight() {
  const straightWidth = (
    document.getElementById('straight_width') as HTMLInputElement
  ).value;

  const floorHeight = (
    document.getElementById('straight_height') as HTMLInputElement
  ).value;

  const straightGoing = (
    document.getElementById('straight_going') as HTMLInputElement
  ).value;

  const isLeftTopPost = (
    document.getElementById('posts_top_left_straight') as HTMLInputElement
  ).checked;
  const isRightTopPost = (
    document.getElementById('posts_top_right_straight') as HTMLInputElement
  ).checked;
  const isLeftBottomPost = (
    document.getElementById('posts_bottom_left_straight') as HTMLInputElement
  ).checked;
  const isRightBottomPost = (
    document.getElementById('posts_bottom_right_straight') as HTMLInputElement
  ).checked;

  const isLeftTopCap = (
    document.getElementById('caps_top_left_straight') as HTMLInputElement
  ).checked;
  const isRightTopCap = (
    document.getElementById('caps_top_right_straight') as HTMLInputElement
  ).checked;
  const isLeftBottomCap = (
    document.getElementById('caps_bottom_left_straight') as HTMLInputElement
  ).checked;
  const isRightBottomCap = (
    document.getElementById('caps_bottom_right_straight') as HTMLInputElement
  ).checked;

  const isLeftHandrail = (
    document.getElementById('spindle_left_straight') as HTMLInputElement
  ).checked;
  const isRightHandrail = (
    document.getElementById('spindle_right_straight') as HTMLInputElement
  ).checked;

  const postType = (
    document.getElementById('post_type_straight') as HTMLInputElement
  ).value as IPostType;

  const postMaterialType = (
    document.getElementById('post_material_straight') as HTMLInputElement
  ).value as IMaterialType;

  const capType = (
    document.getElementById('caps_type_straight') as HTMLInputElement
  ).value as ICapType;

  const capMaterialType = (
    document.getElementById('cap_material_straight') as HTMLInputElement
  ).value as IMaterialType;

  const spindleType = (
    document.getElementById('spindle_type_straight') as HTMLInputElement
  ).value as ISPINDLETYPE;

  const spindleMaterialType = (
    document.getElementById('spindle_material_straight') as HTMLInputElement
  ).value as IMaterialType;

  const baseRailMaterialType = (
    document.getElementById('base_rail_material_straight') as HTMLInputElement
  ).value as IMaterialType;

  const featureTurnStraight = (
    document.getElementById('feature_tread_straight') as HTMLInputElement
  ).value as IThreadMode;

  simulator.drawStraightFlight({
    stair_width: parseFloat(straightWidth),
    floor_height: parseFloat(floorHeight),
    stair_going: parseFloat(straightGoing),
    feature_turn: featureTurnStraight,
    post: {
      direction: {
        leftTop: isLeftTopPost,
        leftBottom: isLeftBottomPost,
        rightTop: isRightTopPost,
        rightBottom: isRightBottomPost,
      },
      type: postType,
      material: postMaterialType,
    },
    caps: {
      direction: {
        leftTop: isLeftTopCap,
        leftBottom: isLeftBottomCap,
        rightTop: isRightTopCap,
        rightBottom: isRightBottomCap,
      },
      type: capType,
      material: capMaterialType,
    },
    handrails: {
      direction: {
        left: isLeftHandrail,
        right: isRightHandrail,
      },
      type: spindleType,
      material: spindleMaterialType,
      baseMaterial: baseRailMaterialType,
    },
  });
}

function drawQuarterTurn() {
  // Quarter turn
  const quarterStairWidth = (
    document.getElementById('quarter_turn_width') as HTMLInputElement
  ).value;

  const quarterFloorHeight = (
    document.getElementById('quarter_turn_height') as HTMLInputElement
  ).value;

  const quarterStairGoing = (
    document.getElementById('quarter_turn_going') as HTMLInputElement
  ).value;

  const quarterDirection = (
    document.getElementById('direction_quarter') as HTMLInputElement
  ).value as IStairDirection;

  // Box Section
  const countTurnBoxQuarterTurn = (
    document.getElementById('turn_quarter') as HTMLInputElement
  ).value;

  const isPostTopOutsideBoxQuarterTurn = (
    document.getElementById('posts_top_outside_box_quarter') as HTMLInputElement
  ).checked;
  const isPostBottomOutsideBoxQuarterTurn = (
    document.getElementById(
      'posts_bottom_outside_box_quarter'
    ) as HTMLInputElement
  ).checked;
  const isPostCornerBoxQuarterTurn = (
    document.getElementById('posts_corner_box_quarter') as HTMLInputElement
  ).checked;

  const isCapTopOutsideBoxQuarterTurn = (
    document.getElementById('caps_top_outside_box_quarter') as HTMLInputElement
  ).checked;
  const isCapBottomOutsideBoxQuarterTurn = (
    document.getElementById(
      'caps_bottom_outside_box_quarter'
    ) as HTMLInputElement
  ).checked;
  const isCapCornerBoxQuarterTurn = (
    document.getElementById('caps_corner_box_quarter') as HTMLInputElement
  ).checked;

  const isHandrailLeftBoxQuarterTurn = (
    document.getElementById('spindles_left_box_quarter') as HTMLInputElement
  ).checked;
  const isHandrailRightBoxQuarterTurn = (
    document.getElementById('spindles_right_box_quarter') as HTMLInputElement
  ).checked;

  // Section 1
  const countStartSection1QuarterTurn = (
    document.getElementById('quarter_start_num') as HTMLInputElement
  ).value;

  const isPostLeftSection1QuarterTurn = (
    document.getElementById('posts_left_section1_quarter') as HTMLInputElement
  ).checked;
  const isPostRightSection1QuarterTurn = (
    document.getElementById('posts_right_section1_quarter') as HTMLInputElement
  ).checked;

  const isCapLeftSection1QuarterTurn = (
    document.getElementById('caps_left_section1_quarter') as HTMLInputElement
  ).checked;
  const isCapRightSection1QuarterTurn = (
    document.getElementById('caps_right_section1_quarter') as HTMLInputElement
  ).checked;

  const isHandrailLeftSection1QuarterTurn = (
    document.getElementById(
      'spindles_left_section1_quarter'
    ) as HTMLInputElement
  ).checked;
  const isHandrailRightSection1QuarterTurn = (
    document.getElementById(
      'spindles_right_section1_quarter'
    ) as HTMLInputElement
  ).checked;

  // Section 2
  const isPostLeftSection2QuarterTurn = (
    document.getElementById('posts_left_section2_quarter') as HTMLInputElement
  ).checked;
  const isPostRightSection2QuarterTurn = (
    document.getElementById('posts_right_section2_quarter') as HTMLInputElement
  ).checked;

  const isCapLeftSection2QuarterTurn = (
    document.getElementById('caps_left_section2_quarter') as HTMLInputElement
  ).checked;
  const isCapRightSection2QuarterTurn = (
    document.getElementById('caps_right_section2_quarter') as HTMLInputElement
  ).checked;

  const isHandrailLeftSection2QuarterTurn = (
    document.getElementById(
      'spindles_left_section2_quarter'
    ) as HTMLInputElement
  ).checked;
  const isHandrailRightSection2QuarterTurn = (
    document.getElementById(
      'spindles_right_section2_quarter'
    ) as HTMLInputElement
  ).checked;

  // Quarter Stair Style
  const postType = (
    document.getElementById('post_type_quarter') as HTMLInputElement
  ).value as IPostType;

  const postMaterialType = (
    document.getElementById('post_material_quarter') as HTMLInputElement
  ).value as IMaterialType;

  const capType = (
    document.getElementById('caps_type_quarter') as HTMLInputElement
  ).value as ICapType;

  const capMaterialType = (
    document.getElementById('cap_material_quarter') as HTMLInputElement
  ).value as IMaterialType;

  const spindleType = (
    document.getElementById('spindle_type_quarter') as HTMLInputElement
  ).value as ISPINDLETYPE;

  const spindleMaterialType = (
    document.getElementById('spindle_material_quarter') as HTMLInputElement
  ).value as IMaterialType;

  const baseRailMaterialType = (
    document.getElementById('base_rail_material_quarter') as HTMLInputElement
  ).value as IMaterialType;

  const featureTurnQuarter = (
    document.getElementById('feature_tread_quarter') as HTMLInputElement
  ).value as IThreadMode;

  simulator.drawQuarterTurn({
    stair_width: parseFloat(quarterStairWidth),
    floor_height: parseFloat(quarterFloorHeight),
    stair_going: parseFloat(quarterStairGoing),
    direction: quarterDirection,
    feature_turn: featureTurnQuarter,
    section1: {
      num: parseInt(countStartSection1QuarterTurn),
      width: parseFloat(quarterStairWidth),
      caps: {
        type: capType,
        material: capMaterialType,
        direction: {
          left: isCapLeftSection1QuarterTurn,
          right: isCapRightSection1QuarterTurn,
        },
      },
      post: {
        type: postType,
        material: postMaterialType,
        direction: {
          left: isPostLeftSection1QuarterTurn,
          right: isPostRightSection1QuarterTurn,
        },
      },
      handrails: {
        type: spindleType,
        material: spindleMaterialType,
        baseMaterial: baseRailMaterialType,
        direction: {
          left: isHandrailLeftSection1QuarterTurn,
          right: isHandrailRightSection1QuarterTurn,
        },
      },
    },
    section2: {
      num:
        Math.floor(parseFloat(quarterFloorHeight) / 200) -
        parseInt(countTurnBoxQuarterTurn) -
        parseInt(countStartSection1QuarterTurn),
      width: parseFloat(quarterStairWidth),
      caps: {
        type: capType,
        material: capMaterialType,
        direction: {
          left: isCapLeftSection2QuarterTurn,
          right: isCapRightSection2QuarterTurn,
        },
      },
      post: {
        type: postType,
        material: postMaterialType,
        direction: {
          left: isPostLeftSection2QuarterTurn,
          right: isPostRightSection2QuarterTurn,
        },
      },
      handrails: {
        type: spindleType,
        material: spindleMaterialType,
        baseMaterial: baseRailMaterialType,
        direction: {
          left: isHandrailLeftSection2QuarterTurn,
          right: isHandrailRightSection2QuarterTurn,
        },
      },
    },
    box: {
      tnum: parseInt(countTurnBoxQuarterTurn),
      post: {
        direction: {
          bottom: isPostBottomOutsideBoxQuarterTurn,
          top: isPostTopOutsideBoxQuarterTurn,
          corner: isPostCornerBoxQuarterTurn,
        },
      },
      handrails: {
        direction: {
          left: isHandrailLeftBoxQuarterTurn,
          right: isHandrailRightBoxQuarterTurn,
        },
      },
    },
  });
}

function drawHalfTurn() {
  const halfStairWidth = (
    document.getElementById('half_turn_width') as HTMLInputElement
  ).value;
  const halfFloorHeight = (
    document.getElementById('half_turn_height') as HTMLInputElement
  ).value;

  const halfStairGoing = (
    document.getElementById('half_turn_going') as HTMLInputElement
  ).value;

  const halfDirection = (
    document.getElementById('direction_half') as HTMLInputElement
  ).value as IStairDirection;

  // Section 1
  const countStartSection1Half = (
    document.getElementById('half_section1_num') as HTMLInputElement
  ).value;

  const isPostLeftSection1HalfTurn = (
    document.getElementById('posts_left_section1_half') as HTMLInputElement
  ).checked;
  const isPostRightSection1HalfTurn = (
    document.getElementById('posts_right_section1_half') as HTMLInputElement
  ).checked;

  const isCapLeftSection1HalfTurn = (
    document.getElementById('caps_left_section1_half') as HTMLInputElement
  ).checked;
  const isCapRightSection1HalfTurn = (
    document.getElementById('caps_right_section1_half') as HTMLInputElement
  ).checked;

  const isHandrailLeftSection1HalfTurn = (
    document.getElementById('spindles_left_section1_half') as HTMLInputElement
  ).checked;
  const isHandrailRightSection1HalfTurn = (
    document.getElementById('spindles_right_section1_half') as HTMLInputElement
  ).checked;

  // Box1 Section
  const countTurnBox1Half = (
    document.getElementById('turn_box1_half') as HTMLInputElement
  ).value;
  const isPostTopOutsideBoxHalfTurn = (
    document.getElementById('posts_top_outside_box1_half') as HTMLInputElement
  ).checked;
  const isPostBottomOutsideBox1HalfTurn = (
    document.getElementById(
      'posts_bottom_outside_box1_half'
    ) as HTMLInputElement
  ).checked;
  const isPostCornerBox1HalfTurn = (
    document.getElementById('posts_corner_box1_half') as HTMLInputElement
  ).checked;

  const isCapTopOutsideBox1HalfTurn = (
    document.getElementById('caps_top_outside_box1_half') as HTMLInputElement
  ).checked;
  const isCapBottomOutsideBox1HalfTurn = (
    document.getElementById('caps_bottom_outside_box1_half') as HTMLInputElement
  ).checked;
  const isCapCornerBox1HalfTurn = (
    document.getElementById('caps_corner_box1_half') as HTMLInputElement
  ).checked;

  const isHandrail1OutsideBox1HalfTurn = (
    document.getElementById('spindles_left_box1_turn') as HTMLInputElement
  ).checked;
  const isHandrail2OutsideBox1HalfTurn = (
    document.getElementById('spindles_right_box1_turn') as HTMLInputElement
  ).checked;

  // Section 2
  const countStartSection2Half = (
    document.getElementById('half_section2_num') as HTMLInputElement
  ).value;

  const isPostLeftSection2HalfTurn = (
    document.getElementById('posts_left_section2_half') as HTMLInputElement
  ).checked;
  const isPostRightSection2HalfTurn = (
    document.getElementById('posts_right_section2_half') as HTMLInputElement
  ).checked;

  const isCapLeftSection2HalfTurn = (
    document.getElementById('caps_left_section2_half') as HTMLInputElement
  ).checked;
  const isCapRightSection2HalfTurn = (
    document.getElementById('caps_right_section2_half') as HTMLInputElement
  ).checked;

  const isHandrailLeftSection2HalfTurn = (
    document.getElementById('spindles_left_section2_half') as HTMLInputElement
  ).checked;
  const isHandrailRightSection2HalfTurn = (
    document.getElementById('spindles_right_section2_half') as HTMLInputElement
  ).checked;

  // Box2 Section
  const countTurnBox2Half = (
    document.getElementById('turn_box2_half') as HTMLInputElement
  ).value;

  const isPostTopOutsideBox2HalfTurn = (
    document.getElementById('posts_top_outside_box2_half') as HTMLInputElement
  ).checked;
  const isPostBottomOutsideBox2HalfTurn = (
    document.getElementById(
      'posts_bottom_outside_box2_half'
    ) as HTMLInputElement
  ).checked;
  const isPostCornerBox2HalfTurn = (
    document.getElementById('posts_corner_box2_half') as HTMLInputElement
  ).checked;

  const isCapTopOutsideBox2HalfTurn = (
    document.getElementById('caps_top_outside_box2_half') as HTMLInputElement
  ).checked;
  const isCapBottomOutsideBox2HalfTurn = (
    document.getElementById('caps_bottom_outside_box2_half') as HTMLInputElement
  ).checked;
  const isCapCornerBox2HalfTurn = (
    document.getElementById('caps_corner_box2_half') as HTMLInputElement
  ).checked;

  const isHandrail1OutsideBox2HalfTurn = (
    document.getElementById('spindles_left_box2_turn') as HTMLInputElement
  ).checked;
  const isHandrail2OutsideBox2HalfTurn = (
    document.getElementById('spindles_right_box2_turn') as HTMLInputElement
  ).checked;

  // Section 3
  const countStartSection3Half =
    Math.floor(parseInt(halfFloorHeight) / 200) -
    parseInt(countStartSection1Half) -
    parseInt(countStartSection2Half) -
    parseInt(countTurnBox1Half) -
    parseInt(countTurnBox2Half);

  (document.getElementById('half_section3_num') as HTMLInputElement).value =
    countStartSection3Half.toString();

  const isPostLeftSection3HalfTurn = (
    document.getElementById('posts_left_section3_half') as HTMLInputElement
  ).checked;
  const isPostRightSection3HalfTurn = (
    document.getElementById('posts_right_section3_half') as HTMLInputElement
  ).checked;

  const isCapLeftSection3HalfTurn = (
    document.getElementById('caps_left_section3_half') as HTMLInputElement
  ).checked;
  const isCapRightSection3HalfTurn = (
    document.getElementById('caps_right_section3_half') as HTMLInputElement
  ).checked;

  const isHandrailLeftSection3HalfTurn = (
    document.getElementById('spindles_left_section3_half') as HTMLInputElement
  ).checked;
  const isHandrailRightSection3HalfTurn = (
    document.getElementById('spindles_right_section3_half') as HTMLInputElement
  ).checked;

  // Stair Style
  const postType = (
    document.getElementById('post_type_half') as HTMLInputElement
  ).value as IPostType;

  const postMaterialType = (
    document.getElementById('post_material_half') as HTMLInputElement
  ).value as IMaterialType;

  const capType = (
    document.getElementById('caps_type_half') as HTMLInputElement
  ).value as ICapType;

  const capMaterialType = (
    document.getElementById('cap_material_half') as HTMLInputElement
  ).value as IMaterialType;

  const spindleType = (
    document.getElementById('spindle_type_half') as HTMLInputElement
  ).value as ISPINDLETYPE;

  const spindleMaterialType = (
    document.getElementById('spindle_material_half') as HTMLInputElement
  ).value as IMaterialType;

  const baseRailMaterialType = (
    document.getElementById('base_rail_material_half') as HTMLInputElement
  ).value as IMaterialType;

  const featureTurnHalf = (
    document.getElementById('feature_tread_half') as HTMLInputElement
  ).value as IThreadMode;

  simulator.drawHalfTurn({
    stair_width: parseFloat(halfStairWidth),
    floor_height: parseFloat(halfFloorHeight),
    stair_going: parseFloat(halfStairGoing),
    direction: halfDirection,
    feature_turn: featureTurnHalf,
    section1: {
      num: parseInt(countStartSection1Half),
      width: parseFloat(halfStairWidth),
      caps: {
        type: capType,
        material: capMaterialType,
        direction: {
          left: isCapLeftSection1HalfTurn,
          right: isCapRightSection1HalfTurn,
        },
      },
      post: {
        type: postType,
        material: postMaterialType,
        direction: {
          left: isPostLeftSection1HalfTurn,
          right: isPostRightSection1HalfTurn,
        },
      },
      handrails: {
        type: spindleType,
        material: spindleMaterialType,
        baseMaterial: baseRailMaterialType,
        direction: {
          left: isHandrailLeftSection1HalfTurn,
          right: isHandrailRightSection1HalfTurn,
        },
      },
    },
    section2: {
      num: parseInt(countStartSection2Half),
      width: parseFloat(halfStairWidth),
      caps: {
        type: capType,
        material: capMaterialType,
        direction: {
          left: isCapLeftSection2HalfTurn,
          right: isCapRightSection2HalfTurn,
        },
      },
      post: {
        type: postType,
        material: postMaterialType,
        direction: {
          left: isPostLeftSection2HalfTurn,
          right: isPostRightSection2HalfTurn,
        },
      },
      handrails: {
        type: spindleType,
        material: spindleMaterialType,
        baseMaterial: baseRailMaterialType,
        direction: {
          left: isHandrailLeftSection2HalfTurn,
          right: isHandrailRightSection2HalfTurn,
        },
      },
    },
    section3: {
      num: countStartSection3Half,
      width: parseFloat(halfStairWidth),
      caps: {
        type: capType,
        material: capMaterialType,
        direction: {
          left: isCapLeftSection3HalfTurn,
          right: isCapRightSection3HalfTurn,
        },
      },
      post: {
        type: postType,
        material: postMaterialType,
        direction: {
          left: isPostLeftSection3HalfTurn,
          right: isPostRightSection3HalfTurn,
        },
      },
      handrails: {
        type: spindleType,
        material: spindleMaterialType,
        baseMaterial: baseRailMaterialType,
        direction: {
          left: isHandrailLeftSection3HalfTurn,
          right: isHandrailRightSection3HalfTurn,
        },
      },
    },
    box1: {
      tnum: parseInt(countTurnBox1Half),
      post: {
        direction: {
          bottom: isPostTopOutsideBoxHalfTurn,
          top: isPostBottomOutsideBox1HalfTurn,
          corner: isPostCornerBox1HalfTurn,
        },
      },
      handrails: {
        direction: {
          left: isHandrail1OutsideBox1HalfTurn,
          right: isHandrail2OutsideBox1HalfTurn,
        },
      },
    },
    box2: {
      tnum: parseInt(countTurnBox2Half),
      post: {
        direction: {
          bottom: isPostBottomOutsideBox2HalfTurn,
          top: isPostTopOutsideBox2HalfTurn,
          corner: isPostCornerBox2HalfTurn,
        },
      },
      handrails: {
        direction: {
          left: isHandrail1OutsideBox2HalfTurn,
          right: isHandrail2OutsideBox2HalfTurn,
        },
      },
    },
  });
}

simulator.on('started', () => {
  // drawStraightFlight();
  // drawQuarterTurn();
  drawHalfTurn();
});
