import BaseMode from '../BaseMode';
import {
  IBoxQuarterTurnParam,
  ISectionQuarterTurnParam,
} from '../../@types/params';
import BaseText from '../base/BaseText';
import QuarterTurn from '../QuarterTurn';

export default class Texts extends BaseText {
  constructor(parent: BaseMode) {
    super(parent);

    this.parent = parent;
  }

  draw(
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    mirror_mode: boolean
  ) {
    const centerPoint = this.parent.getCenterPoint();
    const earth_y = centerPoint.y;
    const stair_height = 20; // 200

    let start_position = {
      x: centerPoint.x,
      y: centerPoint.y,
      z: centerPoint.z,
    };

    // Bottom-Right Text
    let text1 =
      Math.round(stair_going * section1.num + section2.width) * 10 + ' mm';

    let pos1 = {
      x: start_position.x + (stair_going * section1.num + section2.width) / 2,
      y: earth_y,
      z: start_position.z + section1.width / 2 + 20,
    };
    let rotate1 = { x: 0, y: 0, z: 0 };
    this.create_text(text1, pos1, rotate1, 1, mirror_mode);
    // console.log(pos1);
    // if (mirror_mode) {
    //   pos1 = {
    //     x: start_position.x + (stair_going * section1.num + section2.width) / 2,
    //     y: earth_y,
    //     z: start_position.z - section1.width - section1.width / 2 - 20,
    //   };
    //   rotate1 = { x: 0, y: 0, z: 0 };
    //   this.create_text(text1, pos1, rotate1, 1);
    // }
    // console.log(pos1);
    // this.create_text(text1, pos1, rotate1, 1);

    // Bottom-Right Text
    const centerPointSection2 = (
      this.parent as QuarterTurn
    ).getCenterSection2();
    const end_position = {
      x: centerPointSection2.x,
      y: centerPointSection2.y + (section2.num - 1) * stair_height,
      z: centerPointSection2.z - (section2.num - 1) * stair_going,
    };

    // Draw Behind Height Text
    const textBH =
      section1.width + Math.round((section2.num - 1) * stair_going * 10);
    // const pos_z_BH = mirror_mode
    //   ? end_position.z + section1.width + (section2.num * stair_going) / 2
    //   : end_position.z + (section2.num * stair_going) / 2;

    const pos_z_BH = end_position.z + (section2.num * stair_going) / 2;
    const posBH = {
      x: end_position.x + section2.width / 2 + 20,
      y: earth_y,
      z: pos_z_BH,
    };
    const rotateBH = { x: 0, y: 0, z: 0 };
    this.create_text(textBH + 'mm', posBH, rotateBH, 5, mirror_mode);

    // Draw Behind Width Text
    const textBW = floor_height * 10 + ' mm';
    // const pos_z = mirror_mode
    //   ? end_position.z + section1.width + section2.num * stair_going
    //   : end_position.z + 20;
    const pos_z = end_position.z + 20;
    const posBW = {
      x: end_position.x + section2.width / 2,
      y: earth_y + floor_height / 2,
      z: pos_z,
    };
    const rotateBW = { x: 0, y: 0, z: 0 };
    this.create_text(textBW, posBW, rotateBW, 6, mirror_mode);

    // draw Middle Height
    const pos_zh2 = centerPoint.z + section1.width / 2;
    const stair_middle = box.tnum <= 1 ? 1 : 2;
    const textH2 =
      Math.round(stair_height * (section1.num + stair_middle)) * 10 + ' mm';
    const pos = {
      x: centerPoint.x + section1.num * stair_going + section2.width,
      y: earth_y + (stair_height * (section1.num + 1)) / 2,
      z: pos_zh2,
    };
    const rotate = { x: 0, y: 0, z: 0 };
    this.create_text(textH2, pos, rotate, 4, mirror_mode);
  }
}
