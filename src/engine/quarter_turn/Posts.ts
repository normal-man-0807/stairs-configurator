import BasePosts from '../base/BasePosts';
import QuarterTurn from '../QuarterTurn';
import {
  IBoxQuarterTurnParam,
  IControl,
  ISectionQuarterTurnParam,
  IThreadMode,
} from '../../@types/params';

export default class Posts extends BasePosts {
  parent: QuarterTurn;

  constructor(parent: QuarterTurn) {
    super(parent);

    this.parent = parent;
  }

  draw(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    controls: Record<string, IControl>,
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    this.drawSide3(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      controls['side3'],
      mirror_mode,
      treadMode
    );
    this.drawSide4(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      controls['side4'],
      mirror_mode,
      treadMode
    );
    this.drawSide5(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      controls['side5'],
      mirror_mode
    );
    this.drawSide6(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      controls['side6'],
      mirror_mode
    );
    this.drawSide7(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      controls['side7'],
      mirror_mode
    );
    this.drawSide8(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      controls['side8'],
      mirror_mode
    );
  }

  drawSide3(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    const stair_height = 20;
    const tread_distance = this.parent.getTheadDistance(treadMode);

    // Repeat code for Side3
    const center = (this.parent as QuarterTurn).getCenterPoint();
    const start_position = { x: center.x, y: center.y, z: center.z };

    const { this_post_height, pos_start, pos_end } = (
      this.parent as QuarterTurn
    ).getStartEndPointsForSide3(
      stair_height,
      stair_going,
      section1,
      section2,
      box,
      tread_distance,
      control
    );

    if (control.lower === 1) {
      this.create_stair_post(
        this_post_height,
        pos_start,
        section1.post.material,
        section1.post.type,
        mirror_mode
      );
      const cap_pos = pos_start;
      cap_pos.y =
        start_position.y + 80 + (tread_distance.left + 1) * stair_height;
      this.create_stair_cap_post(
        this_post_height,
        cap_pos,
        section1.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }

    if (control.upper === 1 || control.upper === 2) {
      let temp_post_height = 0;
      if (control.upper === 1) {
        temp_post_height =
          stair_height * 1.5 + (section1.num + box.tnum) * stair_height;
      } else {
        temp_post_height = stair_height * 2 + box.tnum * stair_height;
      }

      this.create_stair_post(
        temp_post_height,
        pos_end,
        section1.post.material,
        section1.post.type,
        mirror_mode
      );
      const cap_pos = pos_end;
      cap_pos.y =
        start_position.y + 80 + (section1.num + box.tnum + 1) * stair_height;
      this.create_stair_cap_post(
        this_post_height,
        cap_pos,
        section1.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }
  }

  drawSide4(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    const stair_height = 20;
    const tread_distance = this.parent.getTheadDistance(treadMode);

    // Repeat code for Side3
    const center = (this.parent as QuarterTurn).getCenterPoint();
    const start_position = { x: center.x, y: center.y, z: center.z };

    const { this_post_height, pos_start, pos_end } = (
      this.parent as QuarterTurn
    ).getStartEndPointsForSide4(
      stair_height,
      stair_going,
      section1,
      tread_distance,
      control
    );

    if (control.lower === 1) {
      this.create_stair_post(
        this_post_height,
        pos_start,
        section1.post.material,
        section1.post.type,
        mirror_mode
      );
      const cap_pos = pos_start;
      console.log(tread_distance);
      cap_pos.y =
        start_position.y + 80 + (tread_distance.right + 1) * stair_height;
      this.create_stair_cap_post(
        this_post_height,
        cap_pos,
        section1.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }

    if (control.upper === 1 || control.upper === 2) {
      let temp_post_height = 0;

      if (control.upper === 1) {
        temp_post_height = stair_height * 1.5 + section1.num * stair_height;
      } else {
        temp_post_height = stair_height * 2;
      }

      this.create_stair_post(
        temp_post_height,
        pos_end,
        section1.post.material,
        section1.post.type,
        mirror_mode
      );
      const cap_pos = pos_end;
      cap_pos.y = start_position.y + 80 + (section1.num + 1) * stair_height;
      this.create_stair_cap_post(
        this_post_height,
        cap_pos,
        section1.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }
  }

  drawSide5(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    if (control.upper == 1 || control.upper == 2) {
      let temp_post_height = 0;
      const stair_height = 20;
      const { start_position, pos_end } = (
        this.parent as QuarterTurn
      ).getStartEndPointsForSide5(
        floor_height,
        stair_going,
        section1,
        section2,
        box,
        control
      );

      if (control.upper == 1) {
        temp_post_height =
          stair_height * 1.5 + (section1.num + box.tnum / 2) * stair_height;
      } else {
        temp_post_height = stair_height * 2;
      }

      this.create_stair_post(
        temp_post_height,
        pos_end,
        section1.post.material,
        section2.post.type,
        mirror_mode
      );
      const cap_pos = pos_end;
      cap_pos.y =
        box.tnum === 1
          ? start_position.y + 80 + (section1.num + 1.5) * stair_height
          : box.tnum === 2
          ? start_position.y + 80 + (section1.num + 2) * stair_height
          : box.tnum === 3
          ? start_position.y + 80 + (section1.num + 2.5) * stair_height
          : start_position.y + 80 + (section1.num + 3) * stair_height;

      this.create_stair_cap_post(
        0,
        cap_pos,
        section1.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }
  }

  drawSide6(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    if (control.upper === 1 || control.upper === 2) {
      const { stair_height, temp_post_height, start_position, pos_end } = (
        this.parent as QuarterTurn
      ).getStartEndPointsForSide6(
        floor_height,
        stair_going,
        section1,
        section2,
        box,
        control
      );

      this.create_stair_post(
        temp_post_height,
        pos_end,
        section1.post.material,
        section1.post.type,
        mirror_mode
      );
      const cap_pos = pos_end;
      cap_pos.y =
        start_position.y + 80 + (section1.num + box.tnum + 1) * stair_height;
      this.create_stair_cap_post(
        0,
        cap_pos,
        section1.caps.material,
        section1.caps.type,
        mirror_mode
      );
    }
  }

  drawSide7(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const stair_height = 20;
    const stair_number = section2.num + section1.num + box.tnum;

    // Repeat for Side7
    const center = (this.parent as QuarterTurn).getCenterPoint();
    const start_position = { x: center.x, y: center.y, z: center.z };
    const this_position = {
      x: start_position.x + section1.num * stair_going + section2.width - 1.5,
      y:
        start_position.y +
        section1.num * stair_height +
        box.tnum * stair_height,
      z: start_position.z,
    };

    if (control.upper === 1 || control.upper === 2) {
      let temp_post_height = 0;
      let pos_end = { x: 0, y: 0, z: 0 };

      if (control.upper === 1) {
        temp_post_height =
          stair_height * 1.5 + (stair_number - 1) * stair_height;
        pos_end = {
          x: this_position.x + 1.5,
          y: start_position.y + temp_post_height / 2,
          z:
            start_position.z -
            section1.width / 2 -
            (section2.num - 1) * stair_going,
        };
      } else {
        temp_post_height = stair_height * 2;
        pos_end = {
          x: this_position.x + 1.5,
          y:
            start_position.y +
            (section1.num + box.tnum + section2.num) * stair_height +
            temp_post_height / 2 -
            1.5 * stair_height,
          z:
            start_position.z -
            section1.width / 2 -
            (section2.num - 1) * stair_going,
        };
      }

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
        (section1.num + box.tnum + section2.num) * stair_height;
      this.create_stair_cap_post(
        0,
        cap_pos,
        section2.caps.material,
        section2.caps.type,
        mirror_mode
      );
    }
  }

  drawSide8(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const stair_height = 20;
    const stair_number = section2.num + section1.num + box.tnum;

    // Repeat
    const center = (this.parent as QuarterTurn).getCenterPoint();
    const start_position = { x: center.x, y: center.y, z: center.z };
    const this_position = {
      x: start_position.x + section1.num * stair_going - 1,
      y:
        start_position.y +
        section1.num * stair_height +
        box.tnum * stair_height,
      z: start_position.z,
    };

    if (control.upper === 1 || control.upper === 2) {
      let temp_post_height = 0;
      let pos_end = { x: 0, y: 0, z: 0 };

      if (control.upper === 1) {
        temp_post_height =
          stair_height * 1.5 + (stair_number - 1) * stair_height;
        pos_end = {
          x: this_position.x + 1.5,
          y: start_position.y + temp_post_height / 2,
          z:
            start_position.z -
            section1.width / 2 -
            (section2.num - 1) * stair_going,
        };
      } else {
        // TODO: upper = 2
      }
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
        (section1.num + box.tnum + section2.num) * stair_height;
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
