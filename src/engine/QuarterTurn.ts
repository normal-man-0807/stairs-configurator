import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

//@types
import {
  IBoxQuarterTurnParam,
  IControl,
  IQuarterTurnParam,
  ISectionQuarterTurnParam,
  IThreadMode,
} from '../@types/params';

import BaseMode from './BaseMode';
import Scene from '../Scene';

import Stairs from './quarter_turn/Stairs';
import Lines from './quarter_turn/Lines';
import Texts from './quarter_turn/Texts';
import Sides from './quarter_turn/Sides';
import Posts from './quarter_turn/Posts';
import Handrails from './quarter_turn/Handrails';

import Engine, { PRODUCT_SCALE } from './Engine';

export default class QuarterTurn extends BaseMode {
  // Params;
  stair_width: number;
  floor_height: number;
  stair_going: number;
  mirror_mode: boolean; // LEFT is DEFAULT
  section1: ISectionQuarterTurnParam;
  section2: ISectionQuarterTurnParam;
  box: IBoxQuarterTurnParam;

  stairs: Stairs;
  posts: Posts;
  sides: Sides;
  lines: Lines;
  texts: Texts;
  handrails: Handrails;

  treadMode: IThreadMode;

  constructor(
    engine: Engine,
    scene: Scene,
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls
  ) {
    super();
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;
    this.resource = engine.resource;

    this.stair_width = 950 / PRODUCT_SCALE;
    this.floor_height = 2500 / PRODUCT_SCALE;
    this.stair_going = 250 / PRODUCT_SCALE;
    this.mirror_mode = false;

    this.section1 = {
      num: 3,
      width: 950 / PRODUCT_SCALE,

      caps: {
        type: 'PYRAMID',
        material: 'OAK',
        direction: {
          left: false,
          right: false,
        },
      },
      post: {
        type: 'SQUARE',
        material: 'OAK',
        direction: {
          left: false,
          right: false,
        },
      },
      handrails: {
        type: 'CHAMFERED',
        material: 'OAK',
        baseMaterial: 'OAK',
        direction: {
          left: false,
          right: false,
        },
      },
    };
    this.section2 = {
      num: 7,
      width: 950 / PRODUCT_SCALE,
      caps: {
        type: 'PYRAMID',
        material: 'OAK',
        direction: {
          left: true,
          right: true,
        },
      },
      post: {
        type: 'SQUARE',
        material: 'OAK',
        direction: {
          left: false,
          right: false,
        },
      },
      handrails: {
        type: 'CHAMFERED',
        material: 'OAK',
        baseMaterial: 'OAK',
        direction: {
          left: false,
          right: false,
        },
      },
    };

    this.box = {
      tnum: 3,
      post: {
        direction: {
          bottom: false,
          top: false,
          corner: false,
        },
      },
      handrails: {
        direction: {
          left: false,
          right: false,
        },
      },
    };
    this.treadMode = 'lbs';

    this.stairs = new Stairs(this);
    this.posts = new Posts(this);
    this.sides = new Sides(this);
    this.lines = new Lines(this);
    this.texts = new Texts(this);
    this.handrails = new Handrails(this);
  }

  setParams(parameters: IQuarterTurnParam) {
    this.stair_width = parameters.stair_width;
    this.floor_height = parameters.floor_height;
    this.stair_going = parameters.stair_going;
    this.box = parameters.box;
    this.mirror_mode = parameters.direction !== 'LEFT';

    this.section1 = {
      ...parameters.section1,
      width: parameters.stair_width / PRODUCT_SCALE,
    };
    this.section2 = {
      ...parameters.section2,
      width: parameters.stair_width / PRODUCT_SCALE,
    };

    this.treadMode = parameters.feature_turn;
  }

  public draw() {
    const section1 = this.section1;
    const section2 = this.section2;
    const box = this.box;

    const control: Record<
      'side3' | 'side4' | 'side5' | 'side6' | 'side7' | 'side8',
      IControl
    > = this.getControls();

    this.stairs.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10,
      section1,
      section2,
      box,
      this.mirror_mode,
      this.treadMode
    );
    this.sides.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10,
      section1,
      section2,
      box,
      control,
      this.mirror_mode,
      this.treadMode
    );
    this.posts.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10,
      section1,
      section2,
      box,
      control,
      this.mirror_mode,
      this.treadMode
    );
    this.handrails.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10,
      section1,
      section2,
      box,
      control,
      this.mirror_mode,
      this.treadMode
    );
    this.lines.draw(
      this.floor_height / 10,
      this.stair_going / 10,
      section1,
      section2,
      box,
      this.mirror_mode
    );
    this.texts.draw(
      this.floor_height / 10,
      this.stair_going / 10,
      section1,
      section2,
      box,
      this.mirror_mode
    );

    const center = this.getCenterPoint();
    this.controls?.target.setX(center.x);
    this.controls?.target.setZ(center.z);
    this.controls?.update();
  }

  getControls() {
    return {
      side3: {
        lower: this.section1.post.direction.left ? 1 : 0,
        upper: 1,
        railing: this.section1.handrails.direction.left,
      },
      side4: {
        lower: this.section1.post.direction.right ? 1 : 0,
        upper: this.box.post.direction.bottom ? 1 : 0,
        railing: this.section1.handrails.direction.right,
      },
      side5: {
        lower: 1,
        upper: this.box.post.direction.corner ? 1 : 0,
        railing:
          this.box.handrails.direction.left && this.box.post.direction.bottom,
      },
      side6: {
        lower: 1,
        upper: this.box.post.direction.top ? 1 : 0,
        railing:
          this.box.handrails.direction.right && this.box.post.direction.corner,
      },
      side7: {
        lower: this.box.post.direction.top ? 1 : 0,
        upper: this.section2.post.direction.right ? 1 : 0,
        railing: this.section2.handrails.direction.right,
      },
      side8: {
        lower: 1,
        upper: this.section2.post.direction.right ? 1 : 0,
        railing: this.section2.handrails.direction.left,
      },
    } as Record<
      'side3' | 'side4' | 'side5' | 'side6' | 'side7' | 'side8',
      IControl
    >;
  }

  public getCenterPoint() {
    const model_x =
      (this.section1.num * this.stair_going) / 10 + this.section2.width;
    const model_y = this.floor_height / 10;
    const model_z =
      this.section1.width / 10 + (this.section2.num * this.stair_going) / 10;

    return { x: -model_x / 2, y: 0, z: -model_z / 2 };
  }

  public getCenterSection2() {
    const section2CenterPoint = { x: 0, y: 0, z: 0 };
    const centerPointForWhole = this.getCenterPoint();

    section2CenterPoint.x =
      centerPointForWhole.x +
      (this.section1.num * this.stair_going) / 10 +
      this.section2.width / 2;
    section2CenterPoint.y =
      centerPointForWhole.y +
      ((this.section1.num + this.box.tnum) * this.stair_height) / 10;
    section2CenterPoint.z = centerPointForWhole.z - this.section1.width / 2;

    return section2CenterPoint;
  }

  getStartEndPointsForSide3(
    stair_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    tread_distance: { left: number },
    control: IControl
  ) {
    // Repeat code for Side3
    const center = this.getCenterPoint();
    const start_position = { x: center.x, y: center.y, z: center.z };
    let this_post_height = stair_height * 1.5;

    let pos_start = { x: 0, y: 0, z: 0 };
    let pos_end = { x: 0, y: 0, z: 0 };

    if (control.lower === 1) {
      pos_start = {
        x: start_position.x + tread_distance.left * stair_going,
        y:
          start_position.y +
          this_post_height / 2 +
          tread_distance.left * stair_height,
        z: start_position.z - section1.width / 2 + 1.5,
      };

      if (tread_distance.left > 0) {
        pos_start.y = pos_start.y - (tread_distance.left * stair_height) / 2;
        this_post_height =
          this_post_height + tread_distance.left * stair_height;
      }
    }

    if (control.upper === 1 || control.upper === 2) {
      let temp_post_height = 0;

      if (control.upper === 1) {
        temp_post_height =
          stair_height * 1.5 + (section1.num + box.tnum) * stair_height;
        const temp_x = start_position.x + section1.num * stair_going;
        pos_end = {
          x: temp_x,
          y: start_position.y + temp_post_height / 2,
          z: start_position.z - section1.width / 2 + 1.5,
        };
      } else {
        temp_post_height = stair_height * 2 + box.tnum * stair_height;
        const temp_x = start_position.x + section1.num * stair_going;
        pos_end = {
          x: temp_x,
          y:
            start_position.y +
            section1.num * stair_height +
            temp_post_height / 2 -
            stair_height / 2,
          z: start_position.z - section1.width / 2 + 1.5,
        };
      }
    }

    return {
      this_post_height: this_post_height,
      pos_start: pos_start,
      pos_end: pos_end,
    };
  }

  getStartEndPointsForSide4(
    stair_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    tread_distance: { right: number },
    control: IControl
  ) {
    const center = this.getCenterPoint();
    const start_position = { x: center.x, y: center.y, z: center.z };

    let this_post_height = stair_height * 1.5;
    let pos_start = { x: 0, y: 0, z: 0 };
    let pos_end = { x: 0, y: 0, z: 0 };

    if (control.lower === 1) {
      pos_start = {
        x: start_position.x + tread_distance.right * stair_going,
        y:
          start_position.y +
          this_post_height / 2 +
          tread_distance.right * stair_height,
        z: start_position.z + section1.width / 2,
      };

      if (tread_distance.right > 0) {
        pos_start.y = pos_start.y - (tread_distance.right * stair_height) / 2;
        this_post_height =
          this_post_height + tread_distance.right * stair_height;
      }
    }

    if (control.upper === 1 || control.upper === 2) {
      if (control.upper == 1) {
        const temp_post_height =
          stair_height * 1.5 + section1.num * stair_height;
        const temp_x = start_position.x + section1.num * stair_going;
        pos_end = {
          x: temp_x,
          y: start_position.y + temp_post_height / 2,
          z: start_position.z + section1.width / 2,
        };
      } else {
        const temp_post_height = stair_height * 2;
        const temp_x = start_position.x + section1.num * stair_going;
        pos_end = {
          x: temp_x,
          y:
            start_position.y +
            section1.num * stair_height +
            temp_post_height / 2 -
            stair_height / 2,
          z: start_position.z + section1.width / 2,
        };
      }
    }

    return {
      start_position: start_position,
      this_post_height: this_post_height,
      pos_start: pos_start,
      pos_end: pos_end,
    };
  }

  getStartEndPointsForSide5(
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl
  ) {
    const stair_height = 20;
    const center = this.getCenterPoint();
    const start_position = { x: center.x, y: center.y, z: center.z };
    let pos_end = { x: 0, y: 0, z: 0 };

    let temp_post_height = 0;
    if (control.upper == 1) {
      temp_post_height =
        stair_height * 1.5 + (section1.num + box.tnum / 2) * stair_height;
      const temp_x =
        start_position.x + section1.num * stair_going + section2.width;
      pos_end = {
        x: temp_x,
        y: start_position.y + temp_post_height / 2,
        z: start_position.z + section1.width / 2,
      };
    } else {
      temp_post_height = stair_height * 2;
      const temp_x =
        start_position.x + section1.num * stair_going + section2.width;
      pos_end = {
        x: temp_x,
        y:
          start_position.y +
          temp_post_height / 2 +
          (section1.num + box.tnum / 2) * stair_height -
          stair_height / 2,
        z: start_position.z + section1.width / 2,
      };
    }
    return { start_position, pos_end };
  }

  getStartEndPointsForSide6(
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl
  ) {
    let temp_post_height = 0;
    let pos_end = { x: 0, y: 0, z: 0 };
    const stair_height = 20;

    const center = this.getCenterPoint();
    const start_position = { x: center.x, y: center.y, z: center.z };

    const this_position = {
      x: start_position.x + section1.num * stair_going + section2.width - 1.5,
      y: start_position.y + (section1.num + box.tnum / 2) * stair_height,
      z: start_position.z + section1.width / 2,
    };

    if (control.upper == 1) {
      temp_post_height =
        stair_height * 1.5 + (section1.num + box.tnum) * stair_height;
      pos_end = {
        x: this_position.x + 1.5,
        y: start_position.y + temp_post_height / 2,
        z: start_position.z - section1.width / 2,
      };
    } else {
      temp_post_height = stair_height * 2;
      pos_end = {
        x: this_position.x + 1.5,
        y:
          start_position.y +
          temp_post_height / 2 +
          (section1.num + box.tnum) * stair_height -
          stair_height / 2,
        z: start_position.z - section1.width / 2,
      };
    }

    return {
      stair_height,
      temp_post_height,
      this_position,
      start_position,
      pos_end,
    };
  }
}
