import * as THREE from 'three';

import BaseMode from './BaseMode';
import Scene from '../Scene';
import {
  IBoxQuarterTurnParam,
  IControl,
  IHalfTurnParam,
  ISectionQuarterTurnParam,
  IThreadMode,
} from '../@types/params';
import Engine, { PRODUCT_SCALE } from './Engine';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Stairs from './half_turn/Stairs';
import Posts from './half_turn/Posts';
import Lines from './half_turn/Lines';
import Texts from './half_turn/Texts';
import Sides from './half_turn/Sides';
import Handrails from './half_turn/Handrails';

export type ISideHalf =
  | 'side9'
  | 'side10'
  | 'side11'
  | 'side12'
  | 'side13'
  | 'side14'
  | 'side15'
  | 'side16'
  | 'side17'
  | 'side18';

export default class HalfTurn extends BaseMode {
  stair_width: number;
  floor_height: number;
  stair_going: number;
  mirror_mode: boolean; // LEFT is DEFAULT
  section1: ISectionQuarterTurnParam;
  section2: ISectionQuarterTurnParam;
  section3: ISectionQuarterTurnParam;
  box1: IBoxQuarterTurnParam;
  box2: IBoxQuarterTurnParam;

  private stairs: Stairs;
  private posts: Posts;
  private lines: Lines;
  private texts: Texts;
  private sides: Sides;
  private handrails: Handrails;

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

    this.section1 =
      this.section2 =
      this.section3 =
        {
          num: 3,
          width: 900 / PRODUCT_SCALE,
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

    this.box1 = this.box2 = {
      tnum: 2,
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

  public draw() {
    const section1 = this.section1;
    const section2 = this.section2;
    const section3 = this.section3;
    const box1 = this.box1;
    const box2 = this.box2;

    const control: Record<ISideHalf, IControl> = this.getControls();
    //
    this.stairs.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10,
      section1,
      section2,
      section3,
      box1,
      box2,
      this.mirror_mode,
      this.treadMode
    );

    this.sides.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10,
      section1,
      section2,
      section3,
      box1,
      box2,
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
      section3,
      box1,
      box2,
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
      section3,
      box1,
      box2,
      control,
      this.mirror_mode,
      this.treadMode
    );

    this.lines.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10,
      section1,
      section2,
      section3,
      box1,
      box2,
      this.mirror_mode
    );

    this.texts.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10,
      section1,
      section2,
      section3,
      box1,
      box2,
      this.mirror_mode
    );
  }

  getCenterPoint(): { x: number; y: number; z: number } {
    const model_x =
      (Math.max(this.section1.num, this.section3.num) * this.stair_going) / 10 +
      this.section2.width;
    const model_y = this.floor_height / 10;
    const model_z =
      this.section1.width +
      (this.section2.num * this.stair_going) / 10 +
      this.section3.width;

    // return { x: -model_x / 2, y: 0, z: -model_z / 2 };
    return { x: -model_x / 2, y: 0, z: 0 };
  }

  // Drawing Stairs
  getCenterSection2() {}

  setParams(parameters: IHalfTurnParam) {
    this.stair_width = parameters.stair_width;
    this.floor_height = parameters.floor_height;
    this.stair_going = parameters.stair_going;
    this.box1 = parameters.box1;
    this.box2 = parameters.box2;
    this.mirror_mode = parameters.direction !== 'LEFT';

    this.section1 = {
      ...parameters.section1,
      width: parameters.section1.width / PRODUCT_SCALE,
    };
    this.section2 = {
      ...parameters.section2,
      width: parameters.section2.width / PRODUCT_SCALE,
    };
    this.section3 = {
      ...parameters.section3,
      width: parameters.section3.width / PRODUCT_SCALE,
    };

    this.treadMode = parameters.feature_turn;
  }

  // Side9 and 10
  getSide9Info(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    treadMode: IThreadMode
  ) {
    const stair_height = 20;
    const stair_number = Math.floor(floor_height / stair_height);
    const centerWhole = this.getCenterPoint();
    const start_position = {
      x: centerWhole.x,
      y: centerWhole.y,
      z: centerWhole.z,
    };
    const tread_distance = this.getTheadDistance(treadMode);
    let this_post_height = stair_height * 1.5;

    const pos_start = {
      x: start_position.x + tread_distance.left * stair_going,
      y:
        start_position.y +
        this_post_height / 2 +
        tread_distance.left * stair_height,
      z: start_position.z - section1.width / 2 + 1.5,
    };

    let temp_post_height =
      stair_height * 1.5 + (section1.num + box1.tnum) * stair_height;
    const temp_x = start_position.x + section1.num * stair_going;
    const pos_end = {
      x: temp_x,
      y: start_position.y + temp_post_height / 2,
      z: start_position.z - section1.width / 2 + 1.5,
    };

    return {
      start_position,
      this_post_height,
      stair_height,
      stair_number,
      pos_start,
      pos_end,
    };
  }

  getSide10Info(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    treadMode: IThreadMode
  ) {
    const stair_height = 20;
    const tread_distance = this.getTheadDistance(treadMode);

    const stair_number = Math.floor(floor_height / stair_height);
    const centerWhole = this.getCenterPoint();
    const start_position = {
      x: centerWhole.x,
      y: centerWhole.y,
      z: centerWhole.z,
    };
    let this_post_height = stair_height * 1.5;

    const pos_start = {
      x: start_position.x + tread_distance.right * stair_going,
      y:
        start_position.y +
        this_post_height / 2 +
        tread_distance.right * stair_height,
      z: start_position.z + section1.width / 2,
    };

    if (tread_distance.right > 0) {
      pos_start.y = pos_start.y - (tread_distance.right * stair_height) / 2;
      this_post_height = this_post_height + tread_distance.right * stair_height;
    }

    let temp_post_height = stair_height * 1.5 + section1.num * stair_height;
    const temp_x = start_position.x + section1.num * stair_going;

    const pos_end = {
      x: temp_x,
      y: start_position.y + temp_post_height / 2,
      z: start_position.z + section1.width / 2,
    };

    return {
      start_position,
      this_post_height,
      stair_height,
      stair_number,
      pos_start,
      pos_end,
      temp_post_height,
      tread_distance,
    };
  }

  getSection2Info(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam
  ) {
    const stair_height = 20;
    const stair_number = Math.floor(floor_height / stair_height);
    const tread_distance = { left: 0, right: 0 };

    const centerWhole = this.getCenterPoint();
    const start_position = {
      x: centerWhole.x,
      y: centerWhole.y,
      z: centerWhole.z,
    };

    const this_post_height = stair_height * 1.5;

    // for section13
    const this_position = {
      x: start_position.x + section1.num * stair_going + section2.width - 1.5,
      y:
        start_position.y +
        section1.num * stair_height +
        box1.tnum * stair_height,
      z: start_position.z,
    };

    return {
      stair_height,
      stair_number,
      start_position,
      this_position,
      tread_distance,
      this_post_height,
    };
  }

  getSide11Info(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam
  ) {
    const stair_height = 20;
    const stair_number = Math.floor(floor_height / stair_height);
    const tread_distance = { left: 0, right: 0 };
    const centerWhole = this.getCenterPoint();
    const start_position = {
      x: centerWhole.x,
      y: centerWhole.y,
      z: centerWhole.z,
    };
    const earth_y = centerWhole.y;
    const this_post_height = stair_height * 1.5;

    const this_position = {
      x: start_position.x + section1.num * stair_going + section2.width - 1.5,
      y: start_position.y + (section1.num + 1) * stair_height,
      z: start_position.z + section1.width / 2,
    };

    const temp_post_height =
      box1.tnum === 1
        ? stair_height * 1.5 + section1.num * stair_height
        : box1.tnum === 2
        ? stair_height * 1.5 + (section1.num + 1) * stair_height
        : box1.tnum === 3
        ? stair_height * 1.5 + (section1.num + box1.tnum / 2) * stair_height
        : stair_height * 1.5 + (section1.num + box1.tnum / 2) * stair_height;

    // Posts
    const temp_x =
      start_position.x + section1.num * stair_going + section2.width;
    const pos_end = {
      x: temp_x,
      y: start_position.y + temp_post_height / 2,
      z: start_position.z + section1.width / 2,
    };

    // Caps
    const cap_pos = { x: pos_end.x, y: pos_end.y, z: pos_end.z };
    cap_pos.y =
      box1.tnum === 1
        ? start_position.y + 80 + (section1.num + box1.tnum) * stair_height
        : box1.tnum === 2
        ? start_position.y + 80 + (section1.num + 2) * stair_height
        : box1.tnum === 3
        ? start_position.y + 80 + (section1.num + 2.5) * stair_height
        : start_position.y + 80 + (section1.num + 3) * stair_height;

    return {
      stair_height,
      start_position,
      center: centerWhole,
      this_post_height,
      tread_distance,
      this_position,
      temp_post_height,
      pos_end,
      cap_pos,
      earth_y,
    };
  }

  getSide12Info(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam
  ) {
    const stair_height = 20;
    const stair_number = Math.floor(floor_height / stair_height);
    const tread_distance = { left: 0, right: 0 };
    const centerWhole = this.getCenterPoint();
    const earth_y = centerWhole.y;
    const start_position = {
      x: centerWhole.x,
      y: centerWhole.y,
      z: centerWhole.z,
    };

    const this_post_height = stair_height * 1.5;

    const this_position = {
      x: start_position.x + section1.num * stair_going + section2.width - 1.5,
      y:
        box1.tnum === 1
          ? start_position.y + section1.num * stair_height
          : box1.tnum === 2
          ? start_position.y + (section1.num + 1) * stair_height
          : start_position.y + (section1.num + box1.tnum / 2) * stair_height,
      z: start_position.z + section1.width / 2,
    };

    const temp_post_height =
      stair_height * 1.5 + (section1.num + box1.tnum) * stair_height;

    const pos_end = {
      x: this_position.x + 1.5,
      y: start_position.y + temp_post_height / 2,
      z: start_position.z - section1.width / 2,
    };

    return {
      stair_height,
      start_position,
      center: centerWhole,
      this_post_height,
      tread_distance,
      this_position,
      temp_post_height,
      pos_end,
      earth_y,
    };
  }

  getSide13Info(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam
  ) {
    const stair_height = 20;
    let center = this.getCenterPoint();
    const earth_y = center.y;

    const start_position = {
      x: center.x,
      y: center.y,
      z: center.z,
    };

    center.x = center.x + section1.num * stair_going + section2.width / 2;
    center.y = center.y + (section1.num + box1.tnum) * stair_height;
    center.z = center.z - section1.width / 2;

    let end_position = {
      x: center.x,
      y: center.y + section2.num * stair_height,
      z: center.z - section2.num * stair_going,
    };

    return { stair_height, end_position, earth_y, start_position };
  }

  getSide15Info(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam
  ) {
    const stair_height = 20;
    const tread_distance = { left: 0, right: 0 };

    let center = this.getCenterPoint();
    const earth_y = center.y;

    const start_position = {
      x: center.x,
      y: center.y,
      z: center.z,
    };

    center.x = center.x + section1.num * stair_going + section2.width / 2;
    center.y = center.y + (section1.num + box1.tnum) * stair_height;
    center.z = center.z - section1.width / 2;

    let end_position = {
      x: center.x,
      y: center.y + section2.num * stair_height,
      z: center.z - section2.num * stair_going,
    };

    const base_post_height =
      stair_height * 1.5 +
      (section1.num + box1.tnum + section2.num) * stair_height;

    const temp_post_height =
      box2.tnum === 0
        ? section2.num !== 0
          ? base_post_height
          : base_post_height - stair_height
        : box2.tnum === 1
        ? base_post_height
        : box2.tnum === 2
        ? base_post_height + stair_height
        : box2.tnum === 3
        ? base_post_height + 1.5 * stair_height
        : base_post_height + 2 * stair_height;

    const temp_x =
      start_position.x + section1.num * stair_going + section2.width;

    const pos_end = {
      x: temp_x,
      y: start_position.y + temp_post_height / 2,
      z:
        start_position.z -
        section1.width / 2 -
        section2.num * stair_going -
        section3.width,
    };

    return {
      stair_height,
      tread_distance,
      temp_post_height,
      start_position,
      end_position,
      pos_end,
      earth_y,
    };
  }

  getSide16Info(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam
  ) {
    const stair_height = 20;
    const tread_distance = { left: 0, right: 0 };

    let center = this.getCenterPoint();
    var earth_y = center.y;
    const start_position = {
      x: center.x,
      y: center.y,
      z: center.z,
    };

    center.x = center.x + section1.num * stair_going + section2.width / 2;
    center.y = center.y + (section1.num + box1.tnum) * stair_height;
    center.z = center.z - section1.width / 2;

    let end_position = {
      x: center.x,
      y: center.y + section2.num * stair_height,
      z: center.z - section2.num * stair_going,
    };

    const this_position = {
      x: start_position.x + section1.num * stair_going,
      y:
        start_position.y +
        (section1.num + box1.tnum + section2.num + 1) * stair_height,
      z:
        start_position.z -
        section1.width / 2 -
        section2.num * stair_going -
        section3.width -
        1.5,
    };

    const temp_post_height =
      stair_height * 1.5 +
      (section1.num + box1.tnum + section2.num + box2.tnum) * stair_height;

    const pos_end = {
      x: this_position.x,
      y: start_position.y + temp_post_height / 2,
      z: this_position.z + 1.5,
    };

    return {
      earth_y,
      end_position,
      stair_height,
      tread_distance,
      start_position,
      this_position,
      temp_post_height,
      pos_end,
    };
  }

  // Side17 and 18
  getSection3Info(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam
  ) {
    const stair_height = 20;
    const stair_number = Math.floor(floor_height / stair_height);

    const centerWhole = this.getCenterPoint();
    const start_position = {
      x: centerWhole.x,
      y: centerWhole.y,
      z: centerWhole.z,
    };
    const center = {
      x: start_position.x + section1.num * stair_going,
      y: start_position.y + (stair_number - section3.num) * stair_height,
      z:
        start_position.z -
        section1.width / 2 -
        stair_going * section2.num -
        section3.width / 2,
    };
    const this_position = { x: center.x, y: center.y, z: center.z };

    return {
      start_position,
      stair_height,
      stair_number,
      this_position,
    };
  }

  getControls() {
    return {
      side9: {
        lower: this.section1.post.direction.left ? 1 : 0,
        upper: 1,
        railing: this.section1.handrails.direction.left,
      },
      side10: {
        lower: this.section1.post.direction.right ? 1 : 0,
        upper: this.box1.post.direction.bottom ? 1 : 0,
        railing: this.section1.handrails.direction.right,
      },
      side11: {
        lower: 1,
        upper: this.box1.post.direction.corner ? 1 : 0,
        railing:
          this.box1.handrails.direction.left && this.box1.post.direction.bottom,
      },
      side12: {
        lower: 1,
        upper: this.box1.post.direction.top ? 1 : 0,
        railing:
          this.box1.handrails.direction.right &&
          this.box1.post.direction.corner,
      },
      side13: {
        lower: this.box1.post.direction.top ? 1 : 0,
        upper: this.section2.post.direction.right ? 1 : 0,
        railing: this.section2.handrails.direction.right,
      },
      side14: {
        lower: 1,
        upper: 1,
        railing:
          this.section2.handrails.direction.left &&
          this.box2.post.direction.bottom &&
          this.section2.post.direction.left,
      },
      side15: {
        lower: 1,
        upper: this.box2.post.direction.corner ? 1 : 0,
        railing:
          this.box2.handrails.direction.left && this.box2.post.direction.bottom,
      },
      side16: {
        lower: this.box2.post.direction.corner ? 1 : 0,
        upper: this.box2.post.direction.top ? 1 : 0,
        railing: this.box2.handrails.direction.right,
      },
      side17: {
        lower: 1,
        upper: this.section3.post.direction.right ? 1 : 0,
        railing:
          this.section3.handrails.direction.right &&
          this.box2.post.direction.top,
      },
      side18: {
        lower: 1,
        upper: this.section3.post.direction.left ? 1 : 0,
        railing: this.section3.handrails.direction.left,
      },
    } as Record<ISideHalf, IControl>;
  }
}
