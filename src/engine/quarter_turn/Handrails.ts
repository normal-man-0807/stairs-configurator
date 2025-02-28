import BaseHandrails from '../base/BaseHandrails';
import BaseMode from '../BaseMode';
import {
  IBoxQuarterTurnParam,
  IControl,
  ISectionQuarterTurnParam,
  IThreadMode,
} from '../../@types/params';
import QuarterTurn from '../QuarterTurn';

export default class Handrails extends BaseHandrails {
  constructor(parent: BaseMode) {
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
    control: Record<string, IControl>,
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
      control['side3'],
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
      control['side4'],
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
      control['side5'],
      mirror_mode
    );
    this.drawSide6(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      control['side6'],
      mirror_mode
    );
    this.drawSide7(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      control['side7'],
      mirror_mode
    );
    this.drawSide8(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      control['side8'],
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
    if (control.lower == 1 && control.upper > 0 && control.railing) {
      // Repeat code for Side3
      const stair_height = 20;
      const tread_distance = this.parent.getTheadDistance(treadMode);

      const { pos_start, pos_end } = (
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

      const center = (this.parent as QuarterTurn).getCenterPoint();
      const start_position = { x: center.x, y: center.y, z: center.z };

      pos_start.y = start_position.y + tread_distance.left * stair_height;
      pos_end.y = pos_start.y + section1.num * stair_height;

      this.create_railing_func(
        pos_start,
        pos_end,
        'front',
        stair_going / 2,
        stair_height / 2,
        section1.handrails.material,
        section1.handrails.type,
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
        z: start_position.z - section1.width / 2,
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
    if (control.lower == 1 && control.upper > 0 && control.railing) {
      // Repeat code for Side3
      const stair_height = 20;
      const tread_distance = this.parent.getTheadDistance(treadMode);
      const { start_position, pos_start, pos_end } = (
        this.parent as QuarterTurn
      ).getStartEndPointsForSide4(
        stair_height,
        stair_going,
        section1,
        tread_distance,
        control
      );

      pos_start.y = start_position.y + tread_distance.right * stair_height;
      pos_end.y = pos_start.y + section1.num * stair_height;

      // if(param.construction=='cut' && (param.cut_side=="right" || param.cut_side=="both")) {
      //   pos_start.x = pos_start.x + 1.5;
      //   pos_start.z = pos_start.z - 1.5;
      //   pos_end.z = pos_end.z - 1.5;
      // }

      pos_start.z = pos_start.z - 0.5;
      pos_end.z = pos_end.z - 0.5;

      this.create_railing_func(
        pos_start,
        pos_end,
        'front',
        stair_going / 2,
        stair_height / 2,
        section1.handrails.material,
        section1.handrails.type,
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
    if (control.lower == 1 && control.upper > 0 && control.railing) {
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

      const pos_start = {
        x: start_position.x + section1.num * stair_going,
        y: start_position.y + section1.num * stair_height,
        z: start_position.z + section1.width / 2,
      };
      pos_start.y = start_position.y + section1.num * stair_height;
      pos_end.y = pos_start.y + (box.tnum * stair_height) / 2;
      // if (
      //   param.construction == 'cut' &&
      //   (param.cut_side == 'right' || param.cut_side == 'both')
      // ) {
      //   pos_start.x = pos_start.x + 0;
      //   pos_start.z = pos_start.z - 1.6;
      //   pos_end.z = pos_end.z - 1.6;
      // }
      pos_start.z = pos_start.z - 0.5;
      pos_end.z = pos_end.z - 0.5;

      const step_number = section2.width / (stair_going / 2);
      const step_y = (box.tnum * stair_height) / 2 / step_number;
      this.create_railing_func(
        pos_start,
        pos_end,
        'front',
        stair_going / 2,
        step_y,
        section1.handrails.material,
        section1.handrails.type,
        mirror_mode
      );
      const start = { x: 0, y: 0 };
      const end = {
        x: section2.width,
        y: (stair_height * box.tnum) / 2,
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
    if (control.lower == 1 && control.upper > 0 && control.railing) {
      const {
        stair_height,
        this_position,
        temp_post_height,
        start_position,
        pos_end,
      } = (this.parent as QuarterTurn).getStartEndPointsForSide6(
        floor_height,
        stair_going,
        section1,
        section2,
        box,
        control
      );

      const pos_start = {
        x: this_position.x + 1.5,
        y: start_position.y + temp_post_height / 2 + stair_height,
        z: start_position.z + section1.width / 2,
      };
      pos_start.y =
        start_position.y +
        section1.num * stair_height +
        (stair_height * box.tnum) / 2;
      pos_end.y = pos_start.y + stair_height;
      // if (
      //   param.construction == 'cut' &&
      //   (param.cut_side == 'right' || param.cut_side == 'both')
      // ) {
      //   pos_start.x = pos_start.x - 1.5;
      //   pos_end.x = pos_end.x - 1.5;
      // }
      pos_start.x = pos_start.x + 0.5;
      pos_end.x = pos_end.x + 0.5;

      const step_number = section1.width / (stair_going / 2);
      const step_y = (stair_height * box.tnum) / 2 / step_number;
      this.create_railing_func(
        pos_start,
        pos_end,
        'left',
        stair_going / 2,
        step_y,
        section2.handrails.material,
        section2.handrails.type,
        mirror_mode
      );
      const start = { x: 0, y: 0 };
      const end = {
        x: section1.width,
        y: (stair_height * box.tnum) / 2,
      };
      const pos = {
        x: start_position.x + section1.num * stair_going + section2.width,
        y: start_position.y + (section1.num + box.tnum / 2) * stair_height,
        z: start_position.z + section1.width / 2,
      };
      this.create_stair_rail_hand(
        start,
        end,
        stair_height,
        90,
        pos,
        section2.handrails.material,
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
    if (control.lower == 1 && control.upper > 0 && control.railing) {
      // Repeat for Side7
      const stair_height = 20;
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

      const pos_start = {
        x: this_position.x + 2.5,
        y: start_position.y + (section1.num + box.tnum) * stair_height,
        z: start_position.z - section1.width / 2,
      };
      const pos_end = {
        x: this_position.x + 2.5,
        y:
          start_position.y +
          (section1.num + box.tnum + section2.num) * stair_height,
        z:
          start_position.z -
          section1.width / 2 -
          (section2.num - 1) * stair_going,
      };

      // if (
      //   param.construction == 'cut' &&
      //   (param.cut_side == 'right' || param.cut_side == 'both')
      // ) {
      //   pos_start.x = pos_start.x - 1.8;
      //   pos_end.x = pos_end.x - 1.8;
      // }
      this.create_railing_func(
        pos_start,
        pos_end,
        'left',
        stair_going / 2,
        stair_height / 2,
        section2.handrails.material,
        section2.handrails.type,
        mirror_mode
      );
      const start = { x: 0, y: 0 };
      const end = {
        x: (section2.num - 1) * stair_going,
        y: (section2.num - 1) * stair_height,
      };
      const pos = {
        x: this_position.x + 1.5,
        y: start_position.y + (section1.num + box.tnum) * stair_height,
        z: start_position.z - section1.width / 2,
      };
      this.create_stair_rail_hand(
        start,
        end,
        stair_height,
        90,
        pos,
        section2.handrails.material,
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
    if (control.lower == 1 && control.upper > 0 && control.railing) {
      // Repeat
      const stair_height = 20;

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

      const pos_start = {
        x: this_position.x + 2.2,
        y: start_position.y + (section1.num + box.tnum) * stair_height,
        z: start_position.z - section1.width / 2,
      };
      const pos_end = {
        x: this_position.x + 2.2,
        y:
          start_position.y +
          (section1.num + box.tnum + section2.num) * stair_height,
        z:
          start_position.z -
          section1.width / 2 -
          (section2.num - 1) * stair_going,
      };

      // console.log(pos_start, pos_end, stair_going, stair_height);
      this.create_railing_func(
        pos_start,
        pos_end,
        'left',
        stair_going / 2,
        stair_height / 2,
        section2.handrails.material,
        section2.handrails.type,
        mirror_mode
      );

      const startRailHand = { x: 0, y: 0 };
      const endRailHand = {
        x: (section2.num - 1) * stair_going,
        y: (section2.num - 1) * stair_height,
      };
      const posRailHand = {
        x: this_position.x + 1.5,
        y: start_position.y + (section1.num + box.tnum) * stair_height,
        z: start_position.z - section1.width / 2,
      };
      this.create_stair_rail_hand(
        startRailHand,
        endRailHand,
        stair_height,
        90,
        posRailHand,
        section2.handrails.material,
        mirror_mode
      );
    }
  }
}
