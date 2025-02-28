import BaseText from '../base/BaseText';
import {
  IBoxQuarterTurnParam,
  ISectionQuarterTurnParam,
} from '../../@types/params';
import BaseMode from '../BaseMode';
import HalfTurn from '../HalfTurn';

export default class Texts extends BaseText {
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
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    mirror_mode: boolean
  ) {
    this.drawSection1(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      mirror_mode
    );

    this.drawBox1(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      mirror_mode
    );

    this.drawSection2(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      mirror_mode
    );
  }

  drawSection1(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    mirror_mode: boolean
  ) {
    const stair_height = 20;
    const center = (this.parent as HalfTurn).getCenterPoint();
    const earth_y = center.y;
    const start_position = {
      x: center.x,
      y: center.y,
      z: center.z,
    };
    const end_position = {
      x: center.x + (section1.num - 1) * stair_going,
      y: center.y + (section1.num - 1) * stair_height,
      z: center.z,
    };
    const text =
      (Math.round(stair_going * section1.num) + section2.width) * 10 + ' mm';
    const pos_z = mirror_mode
      ? end_position.z - section1.width / 2 - 20
      : end_position.z + section1.width / 2 + 20;
    const pos = {
      x: start_position.x + (stair_going * section1.num + section2.width) / 2,
      y: earth_y,
      z: pos_z,
    };
    const rotate = { x: 0, y: 0, z: 0 };
    this.create_text(text, pos, rotate, 1);
  }

  drawSection2(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    mirror_mode: boolean
  ) {
    const { stair_height, start_position, earth_y, end_position } = (
      this.parent as HalfTurn
    ).getSide13Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2
    );

    const text1 =
      (section1.width +
        Math.round(section2.num * stair_going) +
        section3.width) *
      10;
    const pos_z1 = mirror_mode
      ? start_position.z + section1.width / 2 + (section2.num * stair_going) / 2
      : end_position.z + (section2.num * stair_going) / 2;
    const rotate1 = { x: 0, y: 0, z: 0 };
    this.create_text(
      text1 + 'mm',
      {
        x: end_position.x + section2.width / 2 + 20,
        y: earth_y,
        z: pos_z1,
      },
      rotate1,
      5
    );

    const text2 =
      (section1.num + box1.tnum + section2.num) * stair_height * 10 + ' mm';
    const pos_z2 = !mirror_mode
      ? start_position.z -
        section1.width / 2 -
        section2.num * stair_going -
        section3.width -
        20
      : start_position.z +
        section1.width / 2 +
        section2.num * stair_going +
        section3.width;
    const pos2 = {
      x: end_position.x + section2.width / 2,
      y:
        earth_y +
        ((section1.num + box1.tnum + section2.num) * stair_height) / 2,
      z: pos_z2,
    };
    const rotate2 = { x: 0, y: 0, z: 0 };
    this.create_text(text2, pos2, rotate2, 6);
  }

  drawBox1(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    mirror_mode: boolean
  ) {
    const { stair_height, center, earth_y } = (
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

    const end_position = {
      x: center.x + section1.num * stair_going,
      y: center.y + section1.num * stair_height,
      z: center.z,
    };

    const stair_middle = box1.tnum <= 1 ? 1 : 2;

    const text =
      Math.round(stair_height * (section1.num + stair_middle)) * 10 + ' mm';
    const pos_z = mirror_mode
      ? end_position.z - section1.width / 2 - 20
      : end_position.z + section1.width / 2 + 20;

    const pos = {
      x: end_position.x + section2.width,
      y: earth_y + (stair_height * (section1.num + 1)) / 2,
      z: pos_z,
    };
    const rotate = { x: 0, y: 0, z: 0 };
    this.create_text(text, pos, rotate, 4);
  }
}
