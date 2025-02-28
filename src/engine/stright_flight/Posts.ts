import BasePosts from '../base/BasePosts';
import { ILower, IUpper } from '../../@types/position';
import StrightFlight from '../StraightFlight';
import {
  ICapType,
  IDirection,
  IMaterialType,
  IPostType,
  IThreadMode,
} from '../../@types/params';

export default class Posts extends BasePosts {
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
      direction: {
        left: { lower: ILower; upper: IUpper };
        right: { lower: ILower; upper: IUpper };
      };
      type: IPostType;
      material: IMaterialType;
    },
    stair_caps_option: {
      direction: IDirection;
      type: ICapType;
      material: IMaterialType;
    },
    treadMode: IThreadMode
  ) {
    this.setBaseData(stair_width, floor_height, stair_going);

    this._createLeftPost(
      post_info.direction.left,
      post_info.type,
      post_info.material,
      stair_caps_option,
      treadMode
    );
    this._createRightPost(
      post_info.direction.right,
      post_info.type,
      post_info.material,
      stair_caps_option,
      treadMode
    );
  }

  _createLeftPost(
    post_info: { lower: ILower; upper: IUpper },
    postType: IPostType,
    postMaterial: IMaterialType,
    stair_caps_option: {
      direction: IDirection;
      type: ICapType;
      material: IMaterialType;
    },
    treadMode: IThreadMode
  ) {
    const tread_distance = this.parent.getTheadDistance(treadMode);
    const stair_height = this.getStairHeight();

    let this_post_height = stair_height * 1.5;
    let pos_start = { x: 0, y: 0, z: 0 };
    let pos_end = { x: 0, y: 0, z: 0 };

    if (post_info.lower == 1) {
      let this_post_height = stair_height * 1.5;
      pos_start = {
        x: this.start_position.x + tread_distance.left * this.stair_going,
        y:
          this.start_position.y +
          this_post_height / 2 +
          tread_distance.left * stair_height,
        z: this.start_position.z - this.stair_width / 2 + 2,
      };

      if (tread_distance.left > 0) {
        pos_start.y = pos_start.y - (tread_distance.left * stair_height) / 2;
        this_post_height =
          this_post_height + tread_distance.left * stair_height;
      }

      this.create_stair_post(
        this_post_height,
        pos_start,
        postMaterial,
        postType
      );

      if (stair_caps_option.direction.leftBottom) {
        let cap_pos = { x: pos_start.x, y: pos_start.y, z: pos_start.z };
        cap_pos.y =
          this.start_position.y + 80 + (tread_distance.left + 1) * stair_height;
        this.create_stair_cap_post(
          this_post_height,
          cap_pos,
          stair_caps_option.material,
          stair_caps_option.type
        );
      }
    }

    if (post_info.upper > 0) {
      let temp_post_height = 0;
      let temp_x = 0;

      if (post_info.upper == 1) {
        temp_post_height =
          stair_height * 0.5 + this.stair_number * stair_height;
        temp_x =
          this.start_position.x + (this.stair_number - 1) * this.stair_going;
        pos_end = {
          x: temp_x,
          y: this.start_position.y + temp_post_height / 2,
          z: this.start_position.z - this.stair_width / 2 + 2,
        };
      } else {
        temp_post_height = stair_height * 2;
        temp_x =
          this.start_position.x + (this.stair_number - 1) * this.stair_going;
        pos_end = {
          x: temp_x,
          y:
            this.start_position.y +
            temp_post_height / 2 +
            stair_height * (this.stair_number - 1) -
            stair_height / 2,
          z: this.start_position.z - this.stair_width / 2 + 2,
        };
      }

      this.parent.pos_left_start = pos_start;
      this.parent.pos_left_end = pos_end;

      this.create_stair_post(temp_post_height, pos_end, postMaterial, postType);

      if (stair_caps_option.direction.leftTop) {
        let cap_pos = { x: pos_end.x, y: pos_end.y, z: pos_end.z };
        cap_pos.y =
          this.start_position.y + 80 + this.stair_number * stair_height;
        this.create_stair_cap_post(
          this_post_height,
          cap_pos,
          stair_caps_option.material,
          stair_caps_option.type
        );
      }
    }
  }

  _createRightPost(
    post_info: { lower: ILower; upper: IUpper },
    postType: IPostType,
    postMaterial: IMaterialType,
    stair_caps_option: {
      direction: IDirection;
      type: ICapType;
      material: IMaterialType;
    },
    treadMode: IThreadMode
  ) {
    const tread_distance = this.parent.getTheadDistance(treadMode);
    const stair_height = this.getStairHeight();

    let pos_start = { x: 0, y: 0, z: 0 };
    let pos_end = { x: 0, y: 0, z: 0 };

    let this_post_height = stair_height * 1.5;
    if (post_info.lower == 1) {
      pos_start = {
        x: this.start_position.x + tread_distance.right * this.stair_going,
        y:
          this.start_position.y +
          this_post_height / 2 +
          tread_distance.right * stair_height,
        z: this.start_position.z + this.stair_width / 2 - 2,
      };
      if (tread_distance.right > 0) {
        pos_start.y = pos_start.y - (tread_distance.right * stair_height) / 2;
        this_post_height =
          this_post_height + tread_distance.right * stair_height;
      }
      this.create_stair_post(
        this_post_height,
        pos_start,
        postMaterial,
        postType
      );

      if (stair_caps_option.direction.rightBottom) {
        let cap_pos = { x: pos_start.x, y: pos_start.y, z: pos_start.z };
        cap_pos.y =
          this.start_position.y +
          80 +
          (tread_distance.right + 1) * stair_height;
        this.create_stair_cap_post(
          this_post_height,
          cap_pos,
          stair_caps_option.material,
          stair_caps_option.type
        );
      }
    }

    if (post_info.upper > 0) {
      let temp_post_height = 0;
      let temp_x = 0;

      if (post_info.upper == 1) {
        temp_post_height =
          stair_height * 0.5 + this.stair_number * stair_height;
        temp_x =
          this.start_position.x + (this.stair_number - 1) * this.stair_going;
        pos_end = {
          x: temp_x,
          y: this.start_position.y + temp_post_height / 2,
          z: this.start_position.z + this.stair_width / 2 - 2,
        };
      } else {
        temp_post_height = stair_height * 2;
        temp_x =
          this.start_position.x + (this.stair_number - 1) * this.stair_going;
        pos_end = {
          x: temp_x,
          y:
            this.start_position.y +
            temp_post_height / 2 +
            stair_height * (this.stair_number - 1) -
            stair_height / 2,
          z: this.start_position.z + this.stair_width / 2 - 2,
        };
      }

      this.parent.pos_right_start = pos_start;
      this.parent.pos_right_end = pos_end;

      this.create_stair_post(temp_post_height, pos_end, postMaterial, postType);
      if (stair_caps_option.direction.rightTop) {
        let cap_pos = { x: pos_end.x, y: pos_end.y, z: pos_end.z };
        cap_pos.y =
          this.start_position.y + 80 + this.stair_number * stair_height;
        this.create_stair_cap_post(
          this_post_height,
          cap_pos,
          stair_caps_option.material,
          stair_caps_option.type
        );
      }
    }
  }

  // // Left Position
  // _createMode1() {
  //   const stair_height = this.getStairHeight();
  //   const this_post_height = stair_height * 1.5;
  //   const tread_distance = { left: 0, right: 0 };

  //   let pos_start = {
  //     x: this.start_position.x + tread_distance.left * this.stair_going,
  //     y:
  //       this.start_position.y +
  //       this_post_height / 2 +
  //       tread_distance.left * stair_height,
  //     z: this.start_position.z - this.stair_width / 2 + 2,
  //   };

  //   // TODO SOMETHING 602

  //   this.create_stair_post(
  //     this_post_height,
  //     pos_start,
  //     newel_material
  //     // newel_style
  //   );

  //   // caps
  //   let cap_pos = pos_start;
  //   cap_pos.y =
  //     this.start_position.y + 80 + (tread_distance.left + 1) * stair_height;
  //   this.create_stair_cap_post(
  //     this_post_height,
  //     cap_pos,
  //     newel_material
  //     // param.cap_style
  //   );
  // }

  // _createMode2() {
  //   const stair_height = this.getStairHeight();
  //   const this_post_height = stair_height * 1.5;

  //   let temp_post_height =
  //     stair_height * 0.5 + this.stair_number * stair_height;
  //   let temp_x =
  //     this.start_position.x + (this.stair_number - 1) * this.stair_going;
  //   let pos_end = {
  //     x: temp_x,
  //     y: this.start_position.y + temp_post_height / 2,
  //     z: this.start_position.z - this.stair_width / 2 + 2,
  //   };

  //   this.create_stair_post(
  //     temp_post_height,
  //     pos_end,
  //     newel_material
  //     // param.newel_style
  //   );

  //   let cap_pos = pos_end;
  //   cap_pos.y = this.start_position.y + 80 + this.stair_number * stair_height;
  //   this.create_stair_cap_post(
  //     this_post_height,
  //     cap_pos,
  //     newel_material
  //     // param.cap_style
  //   );
  // }

  // _createMode3() {
  //   const stair_height = this.getStairHeight();
  //   const this_post_height = stair_height * 1.5;

  //   let temp_post_height = stair_height * 2;
  //   let temp_x =
  //     this.start_position.x + (this.stair_number - 1) * this.stair_going;
  //   let pos_end = {
  //     x: temp_x,
  //     y:
  //       this.start_position.y +
  //       temp_post_height / 2 +
  //       stair_height * (this.stair_number - 1) -
  //       stair_height / 2,
  //     z: this.start_position.z - this.stair_width / 2 + 2,
  //   };

  //   this.create_stair_post(
  //     temp_post_height,
  //     pos_end,
  //     newel_material
  //     // param.newel_style
  //   );

  //   let cap_pos = pos_end;
  //   cap_pos.y = this.start_position.y + 80 + this.stair_number * stair_height;
  //   this.create_stair_cap_post(
  //     this_post_height,
  //     cap_pos,
  //     newel_material
  //     // param.cap_style
  //   );
  // }

  // // Right Posts
  // _createMode4() {
  //   const tread_distance = { left: 0, right: 0 };
  //   const stair_height = this.getStairHeight();

  //   const this_post_height = stair_height * 1.5;

  //   const pos_start = {
  //     x: this.start_position.x + tread_distance.right * this.stair_going,
  //     y:
  //       this.start_position.y +
  //       this_post_height / 2 +
  //       tread_distance.right * stair_height,
  //     z: this.start_position.z + this.stair_width / 2 - 2,
  //   };
  //   // if (tread_distance.right > 0) {
  //   //   pos_start.y = pos_start.y - (tread_distance.right * stair_height) / 2;
  //   //   this_post_height = this_post_height + tread_distance.right * stair_height;
  //   // }
  //   this.create_stair_post(
  //     this_post_height,
  //     pos_start,
  //     newel_material
  //     // param.newel_style
  //   );

  //   let cap_pos = pos_start;
  //   cap_pos.y =
  //     this.start_position.y + 80 + (tread_distance.right + 1) * stair_height;
  //   this.create_stair_cap_post(
  //     this_post_height,
  //     cap_pos,
  //     newel_material
  //     // param.cap_style
  //   );
  // }

  // _createMode5() {
  //   const stair_height = this.getStairHeight();
  //   const this_post_height = stair_height * 1.5;

  //   let temp_post_height =
  //     stair_height * 0.5 + this.stair_number * stair_height;
  //   let temp_x =
  //     this.start_position.x + (this.stair_number - 1) * this.stair_going;
  //   let pos_end = {
  //     x: temp_x,
  //     y: this.start_position.y + temp_post_height / 2,
  //     z: this.start_position.z + this.stair_width / 2 - 2,
  //   };

  //   this.create_stair_post(
  //     temp_post_height,
  //     pos_end,
  //     newel_material
  //     // param.newel_style
  //   );

  //   let cap_pos = pos_end;
  //   cap_pos.y = this.start_position.y + 80 + this.stair_number * stair_height;
  //   this.create_stair_cap_post(
  //     this_post_height,
  //     cap_pos,
  //     newel_material
  //     // param.cap_style
  //   );
  // }

  // _createMode6() {
  //   const stair_height = this.getStairHeight();
  //   const this_post_height = stair_height * 1.5;

  //   let temp_post_height = stair_height * 2;
  //   let temp_x =
  //     this.start_position.x + (this.stair_number - 1) * this.stair_going;
  //   let pos_end = {
  //     x: temp_x,
  //     y:
  //       this.start_position.y +
  //       temp_post_height / 2 +
  //       stair_height * (this.stair_number - 1) -
  //       stair_height / 2,
  //     z: this.start_position.z + this.stair_width / 2 - 2,
  //   };

  //   this.create_stair_post(
  //     temp_post_height,
  //     pos_end,
  //     newel_material
  //     // param.newel_style
  //   );

  //   let cap_pos = pos_end;
  //   cap_pos.y = this.start_position.y + 80 + this.stair_number * stair_height;
  //   this.create_stair_cap_post(
  //     this_post_height,
  //     cap_pos,
  //     newel_material
  //     // param.cap_style
  //   );
  // }
}
