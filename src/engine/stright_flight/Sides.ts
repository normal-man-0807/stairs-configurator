import BaseMode from '../BaseMode';
import BaseSides from '../base/BaseSides';
import { ILower, IUpper } from '../../@types/position';
import { IMaterialType, IThreadMode } from '../../@types/params';

export default class Sides extends BaseSides {
  constructor(parent: BaseMode) {
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
    material_type: IMaterialType,
    treadMode: IThreadMode
  ) {
    this.setBaseData(stair_width, floor_height, stair_going);

    const stair_height = this.getStairHeight();
    const tread_distance = this.parent.getTheadDistance(treadMode);
    const this_post_height = stair_height * 1.5;

    // param.construction == "cut" && (param.cut_side == "left" || param.cut_side == "both")
    // param.construction=="cut" && (param.cut_side=="right" || param.cut_side=="both")
    // const checkMode = false;

    // Left Side
    this._createLeftSide(
      this_post_height,
      stair_height,
      tread_distance,
      checkMode.leftCheckMode,
      post_info.left,
      material_type
    );

    // Right Side
    this._createRightSide(
      this_post_height,
      stair_height,
      tread_distance,
      checkMode.rightCheckMode,
      post_info.right,
      material_type
    );
  }

  _createLeftSide(
    this_post_height: number,
    stair_height: number,
    tread_distance: { left: number; right: number },
    checkMode: boolean,
    post_info: { lower: ILower; upper: IUpper },
    material_type: IMaterialType
  ) {
    let start = {
      x: tread_distance.left * this.stair_going,
      y: tread_distance.left * stair_height,
    };
    let end = {
      x: this.stair_number * this.stair_going,
      y: this.stair_number * stair_height,
    };
    let pos = {
      x: this.start_position.x,
      y: this.start_position.y,
      z: this.start_position.z - this.stair_width / 2 - 0.2,
    };

    if (checkMode) {
      pos.z = pos.z + 1.2;
      this.create_stair_cut_string(
        start,
        end,
        pos,
        0,
        this.stair_going,
        stair_height,
        tread_distance.left,
        post_info,
        material_type,
        true,
        this.stair_number,
        1
      );
    } else {
      this.create_direct_stair_string(
        start,
        end,
        pos,
        0,
        {
          stair_height: stair_height,
          material_type: material_type,
          stair_going: this.stair_going,
        },
        tread_distance.left,
        post_info,
        1
      );
      pos.z = pos.z + 0.1;
      this.create_end_base_line(
        start,
        end,
        pos,
        0,
        {
          stair_height: stair_height,
          material_type: material_type,
          stair_going: this.stair_going,
        },
        tread_distance.left,
        post_info
      );
    }
  }

  _createRightSide(
    this_post_height: number,
    stair_height: number,
    tread_distance: { left: number; right: number },
    checkMode: boolean,
    post_info: { lower: ILower; upper: IUpper },
    material_type: IMaterialType
  ) {
    console.log('_createRightSide');
    const start = {
      x: 0 + tread_distance.right * this.stair_going,
      y: 0 + tread_distance.right * stair_height,
    };
    const end = {
      x: this.stair_number * this.stair_going,
      y: this.stair_number * stair_height,
    };
    const pos = {
      x: this.start_position.x,
      y: this.start_position.y,
      z: this.start_position.z + this.stair_width / 2 - 3.8,
    };

    if (checkMode) {
      pos.z = pos.z + 0.8;
      this.create_stair_cut_string(
        start,
        end,
        pos,
        0,
        this.stair_going,
        stair_height,
        tread_distance.right,
        post_info,
        material_type,
        true,
        this.stair_number,
        2
      );
    } else {
      pos.z = pos.z + 0.8;

      this.create_direct_stair_string(
        start,
        end,
        pos,
        0,
        {
          stair_height: stair_height,
          material_type: material_type,
          stair_going: this.stair_going,
        },
        tread_distance.right,
        post_info,
        2
      );
      pos.z = pos.z + 0.1;
      this.create_end_base_line(
        start,
        end,
        pos,
        0,
        {
          stair_height: stair_height,
          material_type: material_type,
          stair_going: this.stair_going,
        },
        tread_distance.right,
        post_info
      );
      //    	create_stair_string(start,end,pos,0,param.stair_going,param.stair_height,param.side_material,true,right_side_info,2);
    }
  }
}
