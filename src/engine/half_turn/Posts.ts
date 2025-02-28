import HalfTurn, { ISideHalf } from '../HalfTurn';
import BasePosts from '../base/BasePosts';
import {
  IBoxQuarterTurnParam,
  IControl,
  ISectionQuarterTurnParam,
  IThreadMode,
} from '../../@types/params';

export default class Posts extends BasePosts {
  parent: HalfTurn;

  constructor(parent: HalfTurn) {
    super(parent);

    this.parent = parent;
  }

  draw(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: Record<ISideHalf, IControl>,
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    // Section1
    this.drawSide9(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side9,
      mirror_mode,
      treadMode
    );

    this.drawSide10(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side10,
      mirror_mode,
      treadMode
    );

    this.drawSide11(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side11,
      mirror_mode
    );
    //
    this.drawSide12(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side12,
      mirror_mode
    );
    //
    this.drawSide13(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side13,
      mirror_mode
    );

    this.drawSide14(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side14,
      mirror_mode
    );

    this.drawSide15(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side15,
      mirror_mode
    );

    this.drawSide16(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side16,
      mirror_mode
    );

    // Section3
    this.drawSide17(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side17,
      mirror_mode
    );

    this.drawSide18(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side18,
      mirror_mode
    );
  }

  drawSide9(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    const tread_distance = this.parent.getTheadDistance(treadMode);
    const { stair_height, start_position, stair_number, pos_start, pos_end } = (
      this.parent as HalfTurn
    ).getSide9Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      treadMode
    );

    let this_post_height = stair_height * 1.5;

    if (control.lower == 1) {
      if (tread_distance.left > 0) {
        pos_start.y = pos_start.y - (tread_distance.left * stair_height) / 2;
        this_post_height =
          this_post_height + tread_distance.left * stair_height;
      }

      this.create_stair_post(
        this_post_height,
        pos_start,
        section3.post.material,
        section3.post.type,
        mirror_mode
      );

      const cap_pos = pos_start;
      cap_pos.y =
        start_position.y + 80 + (tread_distance.left + 1) * stair_height;

      this.create_stair_cap_post(
        this_post_height,
        cap_pos,
        section2.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }

    if (control.upper == 1 || control.upper == 2) {
      let temp_post_height = 0;
      if (control.upper === 1) {
        temp_post_height =
          stair_height * 1.5 + (section1.num + box1.tnum) * stair_height;
      } else {
        // TODO?: UPPER 2 case
      }

      if (section2.num > 0) {
        this.create_stair_post(
          temp_post_height,
          pos_end,
          section3.post.material,
          section3.post.type,
          mirror_mode
        );

        const cap_pos = pos_end;
        cap_pos.y =
          start_position.y + 80 + (section1.num + box1.tnum + 1) * stair_height;

        this.create_stair_cap_post(
          this_post_height,
          cap_pos,
          section2.caps.material,
          section1.caps.type,
          mirror_mode
        );
      }
    }
  }

  drawSide10(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    const tread_distance = this.parent.getTheadDistance(treadMode);
    const {
      stair_height,
      start_position,
      this_post_height,
      pos_start,
      temp_post_height,
      pos_end,
    } = (this.parent as HalfTurn).getSide10Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      treadMode
    );

    if (control.lower == 1) {
      this.create_stair_post(
        this_post_height,
        pos_start,
        section3.post.material,
        section3.post.type,
        mirror_mode
      );

      const cap_pos = pos_start;
      cap_pos.y =
        start_position.y + 80 + (tread_distance.right + 1) * stair_height;

      this.create_stair_cap_post(
        this_post_height,
        cap_pos,
        section2.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }

    if (control.upper == 1 || control.upper == 2) {
      // let temp_post_height = 0;
      // let pos_end = { x: 0, y: 0, z: 0 };

      if (control.upper == 1) {
        // temp_post_height = stair_height * 1.5 + section1.num * stair_height;
        // const temp_x = start_position.x + section1.num * stair_going;
        // pos_end = {
        //   x: temp_x,
        //   y: start_position.y + temp_post_height / 2,
        //   z: start_position.z + section1.width / 2,
        // };
      } else {
        // TODO?: UPPER 2 case
      }

      this.create_stair_post(
        temp_post_height,
        pos_end,
        section3.post.material,
        section3.post.type,
        mirror_mode
      );

      const cap_pos = pos_end;
      cap_pos.y = start_position.y + 80 + (section1.num + 1) * stair_height;

      this.create_stair_cap_post(
        this_post_height,
        cap_pos,
        section2.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }
  }

  drawSide11(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    if (control.upper == 1 || control.upper == 2) {
      const { this_post_height, temp_post_height, cap_pos, pos_end } = (
        this.parent as HalfTurn
      ).getSide11Info(
        stair_width,
        floor_height,
        stair_going,
        section1,
        section2,
        section3,
        box1,
        box2
      );

      this.create_stair_post(
        temp_post_height,
        pos_end,
        section3.post.material,
        section3.post.type,
        mirror_mode
      );

      this.create_stair_cap_post(
        this_post_height,
        cap_pos,
        section2.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }
  }

  drawSide12(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    if (control.upper == 1 || control.upper == 2) {
      const {
        stair_height,
        start_position,
        this_post_height,
        temp_post_height,
        pos_end,
      } = (this.parent as HalfTurn).getSide12Info(
        stair_width,
        floor_height,
        stair_going,
        section1,
        section2,
        section3,
        box1,
        box2
      );

      this.create_stair_post(
        temp_post_height,
        pos_end,
        section3.post.material,
        section3.post.type,
        mirror_mode
      );

      const cap_pos = pos_end;
      cap_pos.y =
        start_position.y + 80 + (section1.num + 1 + box1.tnum) * stair_height;

      this.create_stair_cap_post(
        this_post_height,
        cap_pos,
        section2.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }
  }

  drawSide13(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    if (control.upper == 1 || control.upper == 2) {
      // if (control.upper == 1) {
      // }
      const {
        stair_height,
        start_position,
        this_position,
        this_post_height,
        tread_distance,
      } = (this.parent as HalfTurn).getSection2Info(
        stair_width,
        floor_height,
        stair_going,
        section1,
        section2,
        section3,
        box1
      );

      const temp_post_height =
        stair_height * 1.5 +
        (section1.num + box1.tnum + section2.num) * stair_height;

      const pos_end = {
        x: this_position.x + 1.5,
        y: start_position.y + temp_post_height / 2,
        z: start_position.z - section1.width / 2 - section2.num * stair_going,
      };

      this.create_stair_post(
        temp_post_height,
        pos_end,
        section2.post.material,
        section2.post.type,
        mirror_mode
      );

      var cap_pos = pos_end;
      cap_pos.y =
        start_position.y +
        80 +
        (section1.num + box1.tnum + section2.num + 1) * stair_height;

      this.create_stair_cap_post(
        this_post_height,
        cap_pos,
        section2.caps.material,
        section2.caps.type,
        mirror_mode
      );
    }
  }

  drawSide14(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const {
      stair_height,
      start_position,
      this_position,
      this_post_height,
      tread_distance,
    } = (this.parent as HalfTurn).getSection2Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1
    );
    this_position.x = this_position.x - section2.width;

    const temp_post_height =
      stair_height * 1.5 +
      (section1.num + box1.tnum + section2.num + box2.tnum) * stair_height;
    const pos_end = {
      x: this_position.x + 1.5,
      y: start_position.y + temp_post_height / 2,
      z: start_position.z - section1.width / 2 - section2.num * stair_going,
    };

    this.create_stair_post(
      temp_post_height,
      pos_end,
      section2.post.material,
      section2.post.type,
      mirror_mode
    );

    const cap_pos = pos_end;
    cap_pos.y =
      start_position.y +
      80 +
      (section1.num + box1.tnum + section2.num + box2.tnum + 1) * stair_height;

    this.create_stair_cap_post(
      this_post_height,
      cap_pos,
      section2.caps.material,
      section2.caps.type,
      mirror_mode
    );
  }

  drawSide15(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    if (control.upper == 1 || control.upper == 2) {
      const { stair_height, pos_end, temp_post_height, start_position } = (
        this.parent as HalfTurn
      ).getSide15Info(
        stair_width,
        floor_height,
        stair_going,
        section1,
        section2,
        section3,
        box1,
        box2
      );

      this.create_stair_post(
        temp_post_height,
        pos_end,
        section3.post.material,
        section3.post.type,
        mirror_mode
      );
      const cap_pos = pos_end;

      const base_cap_pos =
        start_position.y +
        80 +
        (section1.num + box1.tnum + section2.num) * stair_height;

      cap_pos.y =
        box2.tnum === 0
          ? section2.num !== 0
            ? base_cap_pos + stair_height
            : base_cap_pos
          : box2.tnum === 1
          ? base_cap_pos + box2.tnum * stair_height
          : box2.tnum === 2
          ? base_cap_pos + 2 * stair_height
          : box2.tnum === 3
          ? base_cap_pos + 2.5 * stair_height
          : base_cap_pos + 3 * stair_height;

      this.create_stair_cap_post(
        0,
        cap_pos,
        section2.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }
  }

  drawSide16(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    if (control.upper == 1 || control.upper == 2) {
      const { stair_height, pos_end, temp_post_height, start_position } = (
        this.parent as HalfTurn
      ).getSide16Info(
        stair_width,
        floor_height,
        stair_going,
        section1,
        section2,
        section3,
        box1,
        box2
      );
      this.create_stair_post(
        temp_post_height,
        pos_end,
        section3.post.material,
        section3.post.type,
        mirror_mode
      );

      const cap_pos = pos_end;
      cap_pos.y =
        start_position.y +
        80 +
        (section1.num + box1.tnum + section2.num + box2.tnum + 1) *
          stair_height;

      this.create_stair_cap_post(
        0,
        cap_pos,
        section2.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }
  }

  drawSide17(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const { stair_height, start_position, stair_number, this_position } = (
      this.parent as HalfTurn
    ).getSection3Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2
    );

    if (control.upper == 1 || control.upper == 2) {
      let temp_post_height = 0;
      let pos_end = { x: 0, y: 0, z: 0 };

      if (control.upper === 1) {
        temp_post_height =
          stair_height * 1.5 + (stair_number - 1) * stair_height;
        pos_end = {
          x: this_position.x - (section3.num - 1) * stair_going + 1.5,
          y: start_position.y + temp_post_height / 2,
          z: this_position.z - section3.width / 2,
        };
      } else {
        // TODO?: UPPER 2 CASE
      }

      this.create_stair_post(
        temp_post_height,
        pos_end,
        section3.post.material,
        section3.post.type,
        mirror_mode
      );

      const cap_pos = pos_end;
      cap_pos.y = start_position.y + 80 + stair_number * stair_height;
      this.create_stair_cap_post(
        0,
        cap_pos,
        section2.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }
  }

  drawSide18(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const { stair_height, start_position, stair_number, this_position } = (
      this.parent as HalfTurn
    ).getSection3Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2
    );

    if (control.upper == 1 || control.upper == 2) {
      let temp_post_height = 0;
      let pos_end = { x: 0, y: 0, z: 0 };

      if (control.upper === 1) {
        temp_post_height =
          stair_height * 1.5 + (stair_number - 1) * stair_height;
        pos_end = {
          x: this_position.x - (section3.num - 1) * stair_going + 1.5,
          y: start_position.y + temp_post_height / 2,
          z: this_position.z + section3.width / 2,
        };
      } else {
        // TODO?: UPPER 2 CASE
      }

      this.create_stair_post(
        temp_post_height,
        pos_end,
        section3.post.material,
        section3.post.type,
        mirror_mode
      );

      const cap_pos = pos_end;
      cap_pos.y = start_position.y + 80 + stair_number * stair_height;
      this.create_stair_cap_post(
        0,
        cap_pos,
        section2.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }
  }
}
