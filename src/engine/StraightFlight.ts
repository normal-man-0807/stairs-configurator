import * as THREE from 'three';

import Scene from '../Scene';
// objects
import BaseMode from './BaseMode';
import StraightFlightSide from '../objects/StraightFlightSide';
import StraightBaseLine from '../objects/StraightBaseLine';

import Stairs from './stright_flight/Stairs';
import Lines from './stright_flight/Lines';
import Texts from './stright_flight/Texts';
import Posts from './stright_flight/Posts';
import Handrails from './stright_flight/Handrails';
import Sides from './stright_flight/Sides';
import { ILower, IPosition, IUpper } from '../@types/position';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  ICapType,
  IDirection,
  IMaterialType,
  IPostType,
  ISideDirection,
  ISPINDLETYPE,
  IStraightFlightParam,
  IThreadMode,
} from '../@types/params';
import Engine from './Engine';

export default class StraightFlight extends BaseMode {
  side?: StraightFlightSide;
  endBaseLine?: StraightBaseLine;

  stairs?: Stairs;
  lines?: Lines;
  texts?: Texts;
  posts?: Posts;
  handrails?: Handrails;
  sides?: Sides;

  pos_left_start: IPosition = { x: 0, y: 0, z: 0 };
  pos_left_end: IPosition = { x: 0, y: 0, z: 0 };
  pos_right_start: IPosition = { x: 0, y: 0, z: 0 };
  pos_right_end: IPosition = { x: 0, y: 0, z: 0 };

  // Params
  stair_width: number;
  floor_height: number;
  stair_going: number;
  stair_post: {
    direction: {
      left: { lower: ILower; upper: IUpper };
      right: { lower: ILower; upper: IUpper };
    };
    type: IPostType;
    material: IMaterialType;
  };
  stair_caps: {
    direction: IDirection;
    type: ICapType;
    material: IMaterialType;
  };
  stair_handrails: {
    direction: ISideDirection;
    type: ISPINDLETYPE;
    material: IMaterialType;
    baseMaterial: IMaterialType;
  };
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

    this.mode = 'straight_flight';

    this.stairs = new Stairs(this);
    this.lines = new Lines(this);
    this.texts = new Texts(this);
    this.posts = new Posts(this);
    this.handrails = new Handrails(this);
    this.sides = new Sides(this);
    this.treadMode = 'lbs';

    // set Initial Prams
    this.stair_width = 950;
    this.floor_height = 2500;
    this.stair_going = 202;
    this.stair_post = {
      direction: {
        left: { lower: 0, upper: 0 },
        right: { lower: 0, upper: 0 },
      },
      type: 'CHAMFERED',
      material: 'OAK',
    };
    this.stair_caps = {
      direction: {
        leftTop: false,
        leftBottom: false,
        rightTop: false,
        rightBottom: false,
      },
      type: 'PYRAMID',
      material: 'OAK',
    };
    this.stair_handrails = {
      direction: {
        left: false,
        right: false,
      },
      type: 'CHAMFERED',
      material: 'OAK',
      baseMaterial: 'OAK',
    };
  }

  setParams(parameters: IStraightFlightParam) {
    this.stair_width = parameters.stair_width;
    this.floor_height = parameters.floor_height;
    this.stair_going = parameters.stair_going;
    // this.stair_post = parameters.post;
    this.stair_caps = parameters.caps;
    // this.stair_handrails = parameters.handrails;

    // Combine
    const { posts, handrails } = this.validateParams(
      parameters.post.direction,
      parameters.handrails.direction
    );
    this.stair_post = { ...parameters.post, direction: posts };
    this.stair_handrails = { ...parameters.handrails, direction: handrails };
    this.treadMode = parameters.feature_turn;
  }

  validateParams(post: IDirection, handrail: ISideDirection) {
    let result_posts = {
      left: {
        lower: post.leftBottom ? 1 : 0,
        upper: post.leftTop ? 2 : 0,
      },
      right: {
        lower: post.rightBottom ? 1 : 0,
        upper: post.rightTop ? 2 : 0,
      },
    } as {
      left: { lower: ILower; upper: IUpper };
      right: { lower: ILower; upper: IUpper };
    };

    let result_handrails = handrail;

    if (post.rightTop && post.rightBottom) {
      if (handrail.right) {
        result_posts = { ...result_posts, left: { lower: 1, upper: 1 } };
      }
    } else {
      if (handrail.right) {
        result_handrails = { ...result_handrails, right: false };
      }
    }

    if (post.leftTop && post.leftBottom) {
      if (handrail.left) {
        result_posts = { ...result_posts, left: { lower: 1, upper: 1 } };
      }
    } else {
      if (handrail.left) {
        result_handrails = { ...result_handrails, left: false };
      }
    }

    return {
      posts: result_posts,
      handrails: result_handrails,
    };
  }

  draw() {
    // checer Mode
    // param.construction=='cut' && (param.cut_side=="right" || param.cut_side=="both"
    const rightCheckMode = false;
    // param.construction=='cut' && (param.cut_side=="left" || param.cut_side=="both"
    const leftCheckMode = false;

    // post
    const post_info = this.stair_post.direction;
    // cap
    this.stairs?.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10,
      this.treadMode
    );
    this.lines?.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10,
      this.treadMode
    );
    this.texts?.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10
    );
    this.posts?.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10,
      {
        rightCheckMode,
        leftCheckMode,
      },
      this.stair_post,
      this.stair_caps,
      this.treadMode
    );

    this.handrails?.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10,
      {
        rightCheckMode,
        leftCheckMode,
      },
      post_info,
      this.stair_handrails,
      this.treadMode
    );

    this.sides?.draw(
      this.stair_width / 10,
      this.floor_height / 10,
      this.stair_going / 10,
      {
        rightCheckMode,
        leftCheckMode,
      },
      post_info,
      this.stair_handrails.baseMaterial,
      this.treadMode
    );

    const center = this.getCenterPoint();
    this.controls?.target.setX(center.x);
    this.controls?.target.setZ(center.z);
    this.controls?.update();
  }

  getCenterPoint(): { x: number; y: number; z: number } {
    const stair_number = Math.floor(this.floor_height / this.stair_height);

    const model_x = stair_number * this.stair_going;
    const model_y = this.floor_height;
    const model_z = this.stair_width;

    // return { x: model_x / 2, y: 0, z: model_z / 2 };
    return { x: 0, y: 0, z: 0 };
  }
}
