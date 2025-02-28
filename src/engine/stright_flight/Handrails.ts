import BaseHandrails from '../base/BaseHandrails';
import StrightFlight from '../StraightFlight';
import { ILower, IUpper } from '../../@types/position';
import {
  IMaterialType,
  ISideDirection,
  ISPINDLETYPE,
  IThreadMode,
} from '../../@types/params';

export default class Handrails extends BaseHandrails {
  parent: StrightFlight;

  constructor(parent: StrightFlight) {
    super(parent);

    this.parent = parent;
  }

  draw(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    checkMode: { rightCheckMode: boolean; leftCheckMode: boolean },
    post_info: {
      left: { lower: ILower; upper: IUpper };
      right: { lower: ILower; upper: IUpper };
    },
    stair_handrails: {
      direction: ISideDirection;
      type: ISPINDLETYPE;
      material: IMaterialType;
      baseMaterial: IMaterialType;
    },
    treadMode: IThreadMode
  ) {
    this.setBaseData(stair_width, floor_height, stair_going);

    const stair_height = this.getStairHeight();
    const tread_distance = this.parent.getTheadDistance(treadMode);
    const this_post_height = stair_height * 1.5;

    // Right Side Handrails
    if (stair_handrails.direction.right) {
      this._createRightHandrail(
        this_post_height,
        stair_height,
        tread_distance,
        checkMode.rightCheckMode,
        post_info.right,
        stair_handrails
      );
    }

    // Left Side Handrails
    if (stair_handrails.direction.left) {
      this._createLeftHandrail(
        this_post_height,
        stair_height,
        tread_distance,
        checkMode.leftCheckMode,
        post_info.left,
        stair_handrails
      );
    }
  }

  _createLeftHandrail(
    this_post_height: number,
    stair_height: number,
    tread_distance: { left: number; right: number },
    checkerMode: boolean,
    post_info: { lower: ILower; upper: IUpper },
    stair_handrails: {
      direction: ISideDirection;
      type: ISPINDLETYPE;
      material: IMaterialType;
      baseMaterial: IMaterialType;
    }
  ) {
    const pos_start = this.parent.pos_left_start;
    const pos_end = this.parent.pos_left_end;

    console.log(pos_start, pos_end);
    pos_start.y = this.start_position.y + tread_distance.right * stair_height;
    pos_end.y = this.start_position.y + stair_height * this.stair_number;

    pos_start.y = this.start_position.y + tread_distance.left * stair_height;
    pos_end.y = this.start_position.y + stair_height * this.stair_number;
    if (checkerMode) {
      pos_start.x = pos_start.x + 1.5;
      pos_start.z = pos_start.z + 0.8;
      pos_end.z = pos_end.z + 0.8;
    }
    this.create_railing_func(
      pos_start,
      pos_end,
      'front',
      this.stair_going / 2,
      stair_height / 2,
      stair_handrails.material,
      stair_handrails.type
    );
    const start = {
      x: tread_distance.left * this.stair_going,
      y: tread_distance.left * stair_height,
    };
    const end = {
      x: (this.stair_number - 1) * this.stair_going,
      y: (this.stair_number - 1) * stair_height,
    };
    const pos = {
      x: this.start_position.x + tread_distance.left * this.stair_going,
      y: this.start_position.y + tread_distance.left * stair_height,
      z: this.start_position.z - this.stair_width / 2,
    };
    this.create_stair_rail_hand(
      start,
      end,
      stair_height,
      0,
      pos,
      stair_handrails.material
    );
  }

  _createRightHandrail(
    this_post_height: number,
    stair_height: number,
    tread_distance: { left: number; right: number },
    checkerMode: boolean,
    post_info: { lower: ILower; upper: IUpper },
    stair_handrails: {
      direction: ISideDirection;
      type: ISPINDLETYPE;
      material: IMaterialType;
    }
  ) {
    const pos_start = this.parent.pos_right_start;
    const pos_end = this.parent.pos_right_end;
    pos_start.y = this.start_position.y + tread_distance.left * stair_height;
    pos_end.y = this.start_position.y + stair_height * this.stair_number;

    pos_start.y = this.start_position.y + tread_distance.right * stair_height;
    pos_end.y = this.start_position.y + stair_height * this.stair_number;
    if (checkerMode) {
      pos_start.x = pos_start.x + 1.5;
      pos_start.z = pos_start.z - 0.8;
      pos_end.z = pos_end.z - 0.8;
    }
    this.create_railing_func(
      pos_start,
      pos_end,
      'front',
      this.stair_going / 2,
      stair_height / 2,
      stair_handrails.material,
      stair_handrails.type
    );
    const start = {
      x: tread_distance.right * this.stair_going,
      y: tread_distance.right * stair_height,
    };
    const end = {
      x: (this.stair_number - 1) * this.stair_going,
      y: (this.stair_number - 1) * stair_height,
    };
    const pos = {
      x: this.start_position.x + tread_distance.right * this.stair_going,
      y: this.start_position.y + tread_distance.right * stair_height,
      z: this.start_position.z + this.stair_width / 2 - 4,
    };
    this.create_stair_rail_hand(
      start,
      end,
      stair_height,
      0,
      pos,
      stair_handrails.material
    );
  }
}
