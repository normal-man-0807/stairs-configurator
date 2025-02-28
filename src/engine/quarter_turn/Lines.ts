import BaseLines from '../base/BaseLines';
import BaseMode from '../BaseMode';

import {
  IBoxQuarterTurnParam,
  ISectionQuarterTurnParam,
} from '../../@types/params';
import QuarterTurn from '../QuarterTurn';

export default class Lines extends BaseLines {
  constructor(parent: BaseMode) {
    super(parent);
  }

  draw(
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    mirror_mode: boolean
  ) {
    this.drawSection1(stair_going, section1, section2, mirror_mode);
    this.drawTurn(
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      mirror_mode
    );
    this.drawSection2(
      floor_height,
      stair_going,
      section1,
      section2,
      mirror_mode
    );
  }

  drawSection1(
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    mirror_mode: boolean
  ) {
    const stair_height = this.getStairHeight();

    //!c Need to check
    const tread_distance = { left: 0, right: 0 };

    const centerPoint = this.parent.getCenterPoint();

    let end_position = { x: 0, y: 0, z: 0 };

    for (let i = 1; i <= section1.num; i++) {
      end_position.x = centerPoint.x + (i - 1) * stair_going;
      end_position.y = centerPoint.y + (i - 1) * stair_height;
      end_position.z = centerPoint.z;

      const pos = {
        x: end_position.x + stair_going,
        y: centerPoint.y,
        z: end_position.z,
      };
      this.create_plan_line(section1.width, 0, pos, mirror_mode);
    }
    const left_line = {
      length: stair_going * (section1.num - tread_distance.left),
      x:
        centerPoint.x +
        (stair_going * (section1.num - tread_distance.left)) / 2 +
        tread_distance.left * stair_going,
    };

    const posL = {
      x: left_line.x,
      y: centerPoint.y,
      z: end_position.z - section1.width / 2,
    };
    this.create_plan_line(left_line.length, 90, posL, mirror_mode);

    const right_line = {
      length: stair_going * (section1.num - tread_distance.right),
      x:
        centerPoint.x +
        (stair_going * (section1.num - tread_distance.right)) / 2 +
        tread_distance.right * stair_going,
    };
    const posR = {
      x: right_line.x,
      y: centerPoint.y,
      z: end_position.z + section1.width / 2,
    };
    this.create_plan_line(right_line.length, 90, posR, mirror_mode);
  }

  drawTurn(
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    mirror_mode: boolean
  ) {
    // const stair_height = this.getStairHeight();
    const stair_height = 20;
    let center = this.parent.getCenterPoint();
    const earth_y = center.y;

    let end_position = {
      x: center.x + section1.num * stair_going,
      y: center.y + section1.num * stair_height,
      z: center.z,
    };

    if (box.tnum === 1) {
    } else if (box.tnum === 2) {
      end_position = {
        x: center.x + section1.num * stair_going,
        y: center.y + (section1.num + 1) * stair_height,
        z: center.z,
      };

      const pos = {
        x: end_position.x + section2.width / 2,
        y: earth_y,
        z: end_position.z,
      };
      const degree = this.radians_to_degrees(
        Math.atan(section2.width / section1.width)
      );

      this.create_plan_line(
        Math.sqrt(Math.pow(section1.width, 2) + Math.pow(section2.width, 2)),
        degree,
        pos
      );
    } else if (box.tnum === 3) {
      end_position = {
        x: center.x + section1.num * stair_going,
        y: center.y + center.y + (section1.num + 2) * stair_height,
        z: center.z,
      };

      const l_size1 = 0.5773 * section1.width;
      const pos1 = {
        x: end_position.x + l_size1 / 2,
        y: earth_y,
        z: end_position.z,
      };
      this.create_plan_line(
        Math.sqrt(Math.pow(section1.width, 2) + Math.pow(l_size1, 2)),
        30,
        pos1
      );

      const l_size2 = 0.5773 * section1.width;
      const pos2 = {
        x: end_position.x + section2.width / 2,
        y: earth_y,
        z: end_position.z - section1.width / 2 + l_size2 / 2,
      };
      const degree = this.radians_to_degrees(
        Math.atan(section2.width / l_size2)
      );
      this.create_plan_line(
        Math.sqrt(Math.pow(section2.width, 2) + Math.pow(l_size2, 2)),
        degree,
        pos2
      );
    } else if (box.tnum === 4) {
      const vt_1 = section1.width / 0.92;
      const sin_1 = vt_1 * 0.38;
      const vt_2 = section2.width / 0.92;
      const sin_2 = vt_2 * 0.38;

      end_position = {
        x: center.x + section1.num * stair_going,
        y: center.y + (section1.num + 3) * stair_height,
        z: center.z,
      };

      const l_size1 = 0.4142 * section1.width;
      const pos1 = {
        x: end_position.x + l_size1 / 2,
        y: earth_y,
        z: end_position.z,
      };
      this.create_plan_line(
        Math.sqrt(Math.pow(section1.width, 2) + Math.pow(l_size1, 2)),
        22.5,
        pos1
      );

      const l_size2 = 0.4142 * section1.width;
      let degree2 = this.radians_to_degrees(Math.atan(sin_2 / section2.width));
      degree2 = 90 - degree2;
      const pos2 = {
        x: end_position.x + section2.width / 2,
        y: earth_y,
        z: end_position.z - section1.width / 2 + sin_2 / 2,
      };
      this.create_plan_line(
        Math.sqrt(Math.pow(section2.width, 2) + Math.pow(l_size2, 2)),
        degree2,
        pos2
      );

      const degree3 = Math.atan(section2.width / section1.width);
      const pos3 = {
        x: end_position.x + section2.width / 2,
        y: earth_y,
        z: end_position.z,
      };
      this.create_plan_line(
        Math.sqrt(Math.pow(section1.width, 2) + Math.pow(section2.width, 2)),
        this.radians_to_degrees(degree3),
        pos3
      );
    }

    const pos11 = {
      x: end_position.x + section2.width,
      y: earth_y,
      z: end_position.z,
    };
    this.create_plan_line(section1.width, 0, pos11);

    const pos12 = {
      x: end_position.x + section2.width / 2,
      y: earth_y,
      z: end_position.z - section1.width / 2,
    };
    this.create_plan_line(section2.width, 90, pos12);

    const pos13 = {
      x: end_position.x + section2.width / 2,
      y: earth_y,
      z: end_position.z + section1.width / 2,
    };
    this.create_plan_line(section2.width, 90, pos13);

    const stair_middle = box.tnum <= 1 ? 1 : 2;
    const line_h = stair_height * (section1.num + stair_middle);
    const pos = {
      x: end_position.x + section2.width,
      y: earth_y + line_h / 2,
      z: end_position.z + section1.width / 2,
    };
    this.create_plan_v_line(line_h, pos);
  }

  drawSection2(
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    mirror_mode: boolean
  ) {
    const stair_height = this.getStairHeight();
    const centerPointForWhole = this.parent.getCenterPoint();
    const section2CenterPoint = (
      this.parent as QuarterTurn
    ).getCenterSection2();

    const earth_y = centerPointForWhole.y;
    let end_position = { x: 0, y: 0, z: 0 };

    for (let i = 1; i <= section2.num; i++) {
      end_position.x = section2CenterPoint.x;
      end_position.y = section2CenterPoint.y + (i - 1) * stair_height;
      end_position.z = section2CenterPoint.z - (i - 1) * stair_going;

      if (i === section2.num) {
        // Last case
      } else {
        let pos1 = {
          x: end_position.x,
          y: earth_y,
          z: end_position.z - stair_going,
        };
        this.create_plan_line(section2.width, 90, pos1, mirror_mode);
        let pos2 = {
          x: end_position.x + section2.width / 2,
          y: earth_y,
          z: end_position.z - stair_going / 2,
        };
        this.create_plan_line(stair_going, 0, pos2, mirror_mode);
        let pos3 = {
          x: end_position.x - section2.width / 2,
          y: earth_y,
          z: end_position.z - stair_going / 2,
        };
        this.create_plan_line(stair_going, 0, pos3, mirror_mode);
      }
    }

    const posV = {
      x: end_position.x + section2.width / 2,
      y: earth_y + floor_height / 2,
      z: end_position.z,
    };
    this.create_plan_v_line(floor_height, posV, mirror_mode);
  }
}
