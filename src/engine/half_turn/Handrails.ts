import BaseMode from '../BaseMode';
import {
  IBoxQuarterTurnParam,
  IControl,
  ISectionQuarterTurnParam,
  IThreadMode,
} from '../../@types/params';
import BaseHandrails from '../base/BaseHandrails';
import HalfTurn, { ISideHalf } from '../HalfTurn';

export default class Handrails extends BaseHandrails {
  constructor(parent: BaseMode) {
    super(parent);
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
    if (control.lower === 1 && control.upper > 0 && control.railing) {
      const { stair_height, start_position, pos_start, pos_end, stair_number } =
        (this.parent as HalfTurn).getSide9Info(
          stair_width,
          floor_height,
          stair_going,
          section1,
          section2,
          section3,
          box1,
          treadMode
        );
      const tread_distance = this.parent.getTheadDistance(treadMode);

      pos_start.y = start_position.y + tread_distance.left * stair_height;
      pos_end.y = pos_start.y + section1.num * stair_height;

      this.create_railing_func(
        pos_start,
        pos_end,
        'front',
        stair_going / 2,
        stair_height / 2,
        section3.handrails.material,
        section3.handrails.type,
        mirror_mode
      );

      const start = {
        x: tread_distance.left * stair_going,
        y: tread_distance.left * stair_height,
      };
      const end = {
        x: section1.num * stair_going,
        y: section1.num * stair_height,
      };
      const pos = {
        x: start_position.x + tread_distance.left * stair_going,
        y: start_position.y + tread_distance.left * stair_height,
        z: start_position.z - section1.width / 2 - 0.5,
      };

      this.create_stair_rail_hand(
        start,
        end,
        stair_height,
        0,
        pos,
        section1.handrails.material,
        mirror_mode
      );
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
    if (control.lower === 1 && control.upper > 0 && control.railing) {
      const {
        stair_height,
        start_position,
        tread_distance,
        pos_start,
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

      pos_start.y = start_position.y + tread_distance.right * stair_height;
      pos_end.y = pos_start.y + section1.num * stair_height;

      pos_start.z -= 1;
      pos_end.z -= 1;

      this.create_railing_func(
        pos_start,
        pos_end,
        'front',
        stair_going / 2,
        stair_height / 2,
        section3.handrails.material,
        section3.handrails.type,
        mirror_mode
      );
      const start = {
        x: tread_distance.right * stair_going,
        y: tread_distance.right * stair_height,
      };
      const end = {
        x: section1.num * stair_going,
        y: section1.num * stair_height,
      };
      const pos = {
        x: start_position.x + tread_distance.right * stair_going,
        y: start_position.y + tread_distance.right * stair_height,
        z: start_position.z + section1.width / 2 - 2,
      };

      this.create_stair_rail_hand(
        start,
        end,
        stair_height,
        0,
        pos,
        section1.handrails.material,
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
    if (control.lower === 1 && control.upper > 0 && control.railing) {
      const { stair_height, start_position, tread_distance } = (
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

      const temp_post_height = stair_height * 1.5 + section1.num * stair_height;
      const temp_x =
        start_position.x + section1.num * stair_going + section2.width;
      const pos_end = {
        x: temp_x,
        y: start_position.y + temp_post_height / 2,
        z: start_position.z + section1.width / 2,
      };

      const pos_start = {
        x: start_position.x + section1.num * stair_going,
        y: start_position.y + section1.num * stair_height,
        z: start_position.z + section1.width / 2,
      };
      pos_start.y = start_position.y + section1.num * stair_height;
      pos_end.y = pos_start.y + stair_height;
      pos_start.z -= 0.5;
      pos_end.z -= 0.5;

      const step_number = section2.width / (stair_going / 2);
      const step_y = (box1.tnum * stair_height) / 2 / step_number;

      this.create_railing_func(
        pos_start,
        pos_end,
        'front',
        stair_going / 2,
        box1.tnum === 1 ? 0 : step_y,
        section3.handrails.material,
        section3.handrails.type,
        mirror_mode
      );
      const start = { x: 0, y: 0 };
      const end =
        box1.tnum === 1
          ? {
              x: section2.width,
              y: 0,
            }
          : box1.tnum === 2
          ? {
              x: section2.width,
              y: stair_height,
            }
          : {
              x: section2.width,
              y: box1.tnum === 1 ? 0 : (stair_height * box1.tnum) / 2,
            };

      const pos = {
        x: start_position.x + section1.num * stair_going,
        y: start_position.y + section1.num * stair_height,
        z: start_position.z + section1.width / 2 - 2,
      };

      this.create_stair_rail_hand(
        start,
        end,
        stair_height,
        0,
        pos,
        section1.handrails.material,
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
    if (control.lower === 1 && control.upper > 0 && control.railing) {
      const {
        temp_post_height,
        stair_height,
        start_position,
        pos_end,
        this_position,
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

      // const pos_start = {
      //   x: this_position.x + 1.5,
      //   y: start_position.y + temp_post_height / 2,
      //   z: start_position.z + section1.width / 2,
      // };

      const pos_start = {
        x: this_position.x + 1.5,
        y:
          box1.tnum === 1
            ? start_position.y + section1.num * stair_height
            : box1.tnum === 2
            ? start_position.y + section1.num * stair_height + stair_height
            : start_position.y +
              section1.num * stair_height +
              (stair_height * box1.tnum) / 2,
        z: start_position.z + section1.width / 2,
      };
      pos_end.y = pos_start.y + stair_height;
      pos_start.x += 0.5;
      pos_end.x += 0.5;

      const step_number = section2.width / (stair_going / 2);
      const step_y = (box1.tnum * stair_height) / 2 / step_number;

      this.create_railing_func(
        pos_start,
        pos_end,
        'left',
        stair_going / 2,
        box1.tnum === 1 ? 0 : step_y,
        section3.handrails.material,
        section3.handrails.type,
        mirror_mode
      );
      const start = { x: 0, y: 0 };
      const end = {
        x: section1.width,
        y:
          box1.tnum === 1
            ? 0
            : box1.tnum === 2
            ? stair_height
            : (stair_height * box1.tnum) / 2,
      };
      const pos = {
        x: start_position.x + section1.num * stair_going + section2.width,
        y:
          box1.tnum === 1
            ? start_position.y + section1.num * stair_height
            : box1.tnum === 2
            ? start_position.y + (section1.num + 1) * stair_height
            : start_position.y + (section1.num + box1.tnum / 2) * stair_height,
        z: start_position.z + section1.width / 2,
      };
      this.create_stair_rail_hand(
        start,
        end,
        stair_height,
        90,
        pos,
        section1.handrails.material,
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
    if (control.lower === 1 && control.upper > 0 && control.railing) {
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

      const pos_start = {
        x: this_position.x + 2,
        y: start_position.y + (section1.num + box1.tnum) * stair_height,
        z: start_position.z - section1.width / 2,
      };
      const pos_end = {
        x: this_position.x + 2,
        y:
          start_position.y +
          (section1.num + box1.tnum + section2.num) * stair_height,
        z: start_position.z - section1.width / 2 - section2.num * stair_going,
      };

      this.create_railing_func(
        pos_start,
        pos_end,
        'left',
        stair_going / 2,
        stair_height / 2,
        section3.handrails.material,
        section3.handrails.type,
        mirror_mode
      );
      const start = { x: 0, y: 0 };
      const end = {
        x: section2.num * stair_going,
        y: section2.num * stair_height,
      };
      const pos = {
        x: this_position.x + 2,
        y: start_position.y + (section1.num + box1.tnum) * stair_height,
        z: start_position.z - section1.width / 2,
      };
      this.create_stair_rail_hand(
        start,
        end,
        stair_height,
        90,
        pos,
        section1.handrails.material,
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
    if (control.lower === 1 && control.upper > 0 && control.railing) {
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

      const pos_start = {
        x: this_position.x + 2,
        y: start_position.y + (section1.num + box1.tnum) * stair_height,
        z: start_position.z - section1.width / 2,
      };
      const pos_end = {
        x: this_position.x + 2,
        y:
          start_position.y +
          (section1.num + box1.tnum + section2.num) * stair_height,
        z: start_position.z - section1.width / 2 - section2.num * stair_going,
      };

      this.create_railing_func(
        pos_start,
        pos_end,
        'left',
        stair_going / 2,
        stair_height / 2,
        section3.handrails.material,
        section3.handrails.type,
        mirror_mode
      );
      const start = { x: 0, y: 0 };
      const end = {
        x: section2.num * stair_going,
        y: section2.num * stair_height,
      };
      const pos = {
        x: this_position.x + 2,
        y: start_position.y + (section1.num + box1.tnum) * stair_height,
        z: start_position.z - section1.width / 2,
      };
      this.create_stair_rail_hand(
        start,
        end,
        stair_height,
        90,
        pos,
        section1.handrails.material,
        mirror_mode
      );
    }
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
    if (control.lower === 1 && control.upper > 0 && control.railing) {
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

      const base_height =
        start_position.y +
        (section1.num + box1.tnum + section2.num) * stair_height;

      const pos_start = {
        x: start_position.x + section1.num * stair_going + section2.width,
        y:
          box2.tnum === 0 && section2.num === 0
            ? base_height - stair_height
            : base_height,
        z: start_position.z - section1.width / 2 - section2.num * stair_going,
      };

      pos_end.y =
        box2.tnum === 0 && section2.num === 0
          ? pos_start.y
          : pos_start.y + 1.5 * stair_height;

      pos_start.z = pos_start.z - 1.2;
      pos_end.z = pos_end.z - 1.2;
      pos_start.x -= 0.5;
      pos_end.x -= 0.5;

      const stepP =
        box2.tnum === 0
          ? 0
          : box2.tnum === 1
          ? 0
          : box2.tnum === 2
          ? 1
          : box2.tnum === 3
          ? 1.5
          : 2;

      const step_y =
        (stepP * stair_height) / (section3.width / (stair_going / 2));

      this.create_railing_func(
        pos_start,
        pos_end,
        'left',
        stair_going / 2,
        step_y,
        section3.handrails.material,
        section3.handrails.type,
        mirror_mode
      );
      const start = { x: 0, y: 0 };
      const end = {
        x: section3.width,
        y:
          box2.tnum === 0
            ? section2.num === 0
              ? 0
              : 0
            : box2.tnum === 1
            ? 0
            : box2.tnum === 2
            ? stair_height
            : box2.tnum === 3
            ? 1.5 * stair_height
            : 2 * stair_height,
      };
      const cap_base_height =
        start_position.y +
        (section1.num + box1.tnum + section2.num) * stair_height;
      const pos = {
        x: start_position.x + section1.num * stair_going + section2.width,
        y:
          box2.tnum === 0 && section2.num === 0
            ? cap_base_height - stair_height
            : cap_base_height,
        z: start_position.z - section1.width / 2 - stair_going * section2.num,
      };

      this.create_stair_rail_hand(
        start,
        end,
        stair_height,
        90,
        pos,
        section1.handrails.material,
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
    if (control.lower === 1 && control.upper > 0 && control.railing) {
      const { stair_height, this_position, temp_post_height, start_position } =
        (this.parent as HalfTurn).getSide16Info(
          stair_width,
          floor_height,
          stair_going,
          section1,
          section2,
          section3,
          box1,
          box2
        );

      const base_height =
        start_position.y +
        (section1.num + box1.tnum + section2.num) * stair_height;

      const pos_start = {
        x: this_position.x + section2.width,
        y:
          box2.tnum === 0
            ? section2.num === 0
              ? base_height - stair_height
              : base_height
            : box2.tnum === 1
            ? base_height
            : box2.tnum === 2
            ? base_height + stair_height
            : box2.tnum === 3
            ? base_height + 1.5 * stair_height
            : base_height + 2 * stair_height,
        z: this_position.z + 2,
      };

      const pos_end = {
        x: this_position.x,
        y:
          start_position.y +
          (section1.num + section2.num + box1.tnum + 4) * stair_height,
        z: this_position.z + 2,
      };

      const stepP =
        box2.tnum === 0
          ? 0
          : box2.tnum === 1
          ? 0
          : box2.tnum === 2
          ? 1
          : box2.tnum === 3
          ? 1.5
          : 2;

      const step_y =
        (stepP * stair_height) / (section3.width / (stair_going / 2));

      this.create_railing_func(
        pos_start,
        pos_end,
        'back',
        stair_going / 2,
        step_y,
        section3.handrails.material,
        section3.handrails.type,
        mirror_mode
      );
      const start = {
        x: 0,
        y:
          box2.tnum === 0
            ? 0
            : box2.tnum === 1
            ? 0
            : box2.tnum === 2
            ? stair_height
            : box2.tnum === 3
            ? 1.5 * stair_height
            : 2 * stair_height,
      };
      const end = { x: section2.width, y: 0 };
      const pos = {
        x: this_position.x,
        y:
          box2.tnum === 0
            ? section2.num === 0
              ? this_position.y - 2 * stair_height
              : this_position.y - stair_height
            : box2.tnum === 1
            ? this_position.y - stair_height
            : box2.tnum === 2
            ? this_position.y + stair_height
            : box2.tnum === 3
            ? this_position.y + 2 * stair_height
            : this_position.y + 3 * stair_height,
        z: this_position.z - 0.5,
      };
      this.create_stair_rail_hand(
        start,
        end,
        stair_height,
        0,
        pos,
        section3.handrails.material,
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
    if (control.lower === 1 && control.upper > 0 && control.railing) {
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

      const pos_start = {
        x: this_position.x + 0.5,
        y:
          start_position.y +
          (section1.num + box1.tnum + section2.num + box2.tnum) * stair_height,
        z: this_position.z - section3.width / 2,
      };
      const pos_end = {
        x: this_position.x + 0.5 - (section3.num - 1) * stair_going,
        y: start_position.y + (stair_number - 1) * stair_height,
        z: this_position.z - section3.width / 2,
      };

      this.create_railing_func(
        pos_start,
        pos_end,
        'back',
        stair_going / 2,
        stair_height / 2,
        section3.handrails.material,
        section3.handrails.type,
        mirror_mode
      );
      const start = { x: 0, y: 0 };
      const end = {
        x: (section3.num - 1) * stair_going,
        y: (section3.num - 1) * stair_height,
      };
      const pos = {
        x: this_position.x,
        y:
          start_position.y +
          (section1.num + box1.tnum + section2.num + box2.tnum) * stair_height,
        z: this_position.z - section3.width / 2 - 2,
      };
      this.create_stair_rail_hand(
        start,
        end,
        stair_height,
        180,
        pos,
        section1.handrails.material,
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
    if (control.lower === 1 && control.upper > 0 && control.railing) {
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

      const pos_start = {
        x: this_position.x + 0.5,
        y:
          start_position.y +
          (section1.num + box1.tnum + section2.num + box2.tnum) * stair_height,
        z: this_position.z + section3.width / 2,
      };
      const pos_end = {
        x: this_position.x + 0.5 - (section3.num - 1) * stair_going,
        y: start_position.y + (stair_number - 1) * stair_height,
        z: this_position.z + section3.width / 2,
      };
      this.create_railing_func(
        pos_start,
        pos_end,
        'back',
        stair_going / 2,
        stair_height / 2,
        section3.handrails.material,
        section3.handrails.type,
        mirror_mode
      );
      const start = { x: 0, y: 0 };
      const end = {
        x: (section3.num - 1) * stair_going,
        y: (section3.num - 1) * stair_height,
      };
      const pos = {
        x: this_position.x,
        y:
          start_position.y +
          (section1.num + box1.tnum + section2.num + box2.tnum) * stair_height,
        z: this_position.z + section3.width / 2 - 2,
      };
      this.create_stair_rail_hand(
        start,
        end,
        stair_height,
        180,
        pos,
        section1.handrails.material,
        mirror_mode
      );
    }
  }
}
