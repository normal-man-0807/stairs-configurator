import BaseLines from '../base/BaseLines';
import BaseMode from '../BaseMode';
import {
  IBoxQuarterTurnParam,
  ISectionQuarterTurnParam,
} from '../../@types/params';
import HalfTurn from '../HalfTurn';

export default class Lines extends BaseLines {
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

    this.drawSection3(
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

    this.drawBox2(
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
    const tread_distance = { left: 0, right: 0 };

    const center = this.parent.getCenterPoint();
    let end_position = { x: 0, y: 0, z: 0 };

    for (let i = 1; i <= section1.num; i++) {
      end_position.x = center.x + i * stair_going;
      end_position.y = center.y + i * stair_height;
      end_position.z = center.z;

      const pos = {
        x: end_position.x + this.stair_going,
        y: center.y,
        z: end_position.z,
      };
      this.create_plan_line(section1.width, 0, pos, mirror_mode);
    }

    const left_line = {
      length: stair_going * (section1.num - tread_distance.left),
      x:
        center.x +
        (stair_going * (section1.num - tread_distance.left)) / 2 +
        tread_distance.left * stair_going,
    };
    const posL = {
      x: left_line.x,
      y: center.y,
      z: end_position.z - section1.width / 2,
    };
    this.create_plan_line(left_line.length, 90, posL);

    const right_line = {
      length: stair_going * (section1.num - tread_distance.right),
      x:
        center.x +
        (stair_going * (section1.num - tread_distance.right)) / 2 +
        tread_distance.right * stair_going,
    };
    const posR = {
      x: right_line.x,
      y: center.y,
      z: end_position.z + section1.width / 2,
    };
    this.create_plan_line(right_line.length, 90, posR, mirror_mode);
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
    const stair_height = 20;

    const centerPointForWhole = this.parent.getCenterPoint();
    const section2CenterPoint = {
      x:
        centerPointForWhole.x + section1.num * stair_going + section2.width / 2,
      y: centerPointForWhole.y + (section1.num + box1.tnum) * stair_height,
      z: centerPointForWhole.z - section1.width / 2,
    };

    const earth_y = centerPointForWhole.y;
    let end_position = { x: 0, y: 0, z: 0 };

    for (let i = 1; i <= section2.num; i++) {
      end_position.x = section2CenterPoint.x;
      end_position.y = section2CenterPoint.y + (i - 1) * stair_height;
      end_position.z = section2CenterPoint.z - (i - 1) * stair_going;

      this.create_plan_line(
        section2.width,
        90,
        {
          x: end_position.x,
          y: earth_y,
          z: end_position.z - stair_going,
        },
        mirror_mode
      );
      this.create_plan_line(
        stair_going,
        0,
        {
          x: end_position.x + section2.width / 2,
          y: earth_y,
          z: end_position.z - stair_going / 2,
        },
        mirror_mode
      );
      this.create_plan_line(
        stair_going,
        0,
        {
          x: end_position.x - section2.width / 2,
          y: earth_y,
          z: end_position.z - stair_going / 2,
        },
        mirror_mode
      );
    }

    this.create_plan_v_line(
      (section1.num + box1.tnum + section2.num + box2.tnum / 2) * stair_height,
      {
        x: end_position.x + section2.width / 2,
        y:
          earth_y +
          ((section1.num + box1.tnum + section2.num + box2.tnum / 2) *
            stair_height) /
            2,
        z: end_position.z - stair_going - section3.width,
      },
      mirror_mode
    );
  }

  drawSection3(
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
    const stair_number = Math.floor(floor_height / stair_height);
    const centerWhole = this.parent.getCenterPoint();
    const start_position = {
      x: centerWhole.x,
      y: centerWhole.y,
      z: centerWhole.z,
    };
    const earth_y = centerWhole.y;

    const center = {
      x: start_position.x + section1.num * stair_going,
      y: start_position.y + (stair_number - section3.num) * stair_height,
      z:
        start_position.z -
        section1.width / 2 -
        stair_going * section2.num -
        section3.width / 2,
    };

    const end_position = { x: 0, y: 0, z: 0 };
    for (let i = 1; i <= section3.num; i++) {
      end_position.x = center.x - (i - 1) * stair_going;
      end_position.y = center.y + (i - 1) * stair_height;
      end_position.z = center.z;

      if (i < section3.num) {
        this.create_plan_line(
          section3.width,
          0,
          {
            x: end_position.x - stair_going,
            y: earth_y,
            z: end_position.z,
          },
          mirror_mode
        );
        this.create_plan_line(
          stair_going,
          90,
          {
            x: end_position.x - stair_going / 2,
            y: earth_y,
            z: end_position.z + section3.width / 2,
          },
          mirror_mode
        );
        this.create_plan_line(
          stair_going,
          90,
          {
            x: end_position.x - stair_going / 2,
            y: earth_y,
            z: end_position.z - section3.width / 2,
          },
          mirror_mode
        );
      } else {
        this.create_plan_line(
          section3.width,
          0,
          {
            x: end_position.x - stair_going / 2,
            y: earth_y,
            z: end_position.z,
          },
          mirror_mode
        );
        this.create_plan_line(
          stair_going / 2,
          90,
          {
            x: end_position.x - stair_going / 4,
            y: earth_y,
            z: end_position.z + section3.width / 2,
          },
          mirror_mode
        );
        this.create_plan_line(
          stair_going / 2,
          90,
          {
            x: end_position.x - stair_going / 4,
            y: earth_y,
            z: end_position.z - section3.width / 2,
          },
          mirror_mode
        );
      }
    }
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

    if (box1.tnum === 0) {
    } else if (box1.tnum === 1) {
    } else if (box1.tnum === 2) {
      this.create_plan_line(
        Math.sqrt(Math.pow(section1.width, 2) + Math.pow(section2.width, 2)),
        45,
        {
          x: end_position.x + section2.width / 2,
          y: earth_y,
          z: end_position.z,
        }
      );
    } else if (box1.tnum === 3) {
      const l_size = 0.5773 * section1.width;
      this.create_plan_line(
        Math.sqrt(Math.pow(section1.width, 2) + Math.pow(l_size, 2)),
        30,
        {
          x: end_position.x + l_size / 2,
          y: earth_y,
          z: end_position.z,
        }
      );

      // const l_size = 0.5773 * param.h1_width;
      this.create_plan_line(
        Math.sqrt(Math.pow(section2.width, 2) + Math.pow(l_size, 2)),
        60,
        {
          x: end_position.x + section2.width / 2,
          y: earth_y,
          z: end_position.z - section1.width / 2 + l_size / 2,
        }
      );
    } else if (box1.tnum === 4) {
      const l_size = 0.4142 * section1.width;
      this.create_plan_line(
        Math.sqrt(Math.pow(section1.width, 2) + Math.pow(l_size, 2)),
        22.5,
        {
          x: end_position.x + l_size / 2,
          y: earth_y,
          z: end_position.z,
        }
      );

      // var l_size = 0.4142 * param.h1_width;
      this.create_plan_line(
        Math.sqrt(Math.pow(section2.width, 2) + Math.pow(l_size, 2)),
        67.5,
        {
          x: end_position.x + section2.width / 2,
          y: earth_y,
          z: end_position.z - section1.width / 2 + l_size / 2,
        }
      );

      this.create_plan_line(
        Math.sqrt(Math.pow(section1.width, 2) + Math.pow(section2.width, 2)),
        45,
        {
          x: end_position.x + section2.width / 2,
          y: earth_y,
          z: end_position.z,
        }
      );
    }

    this.create_plan_line(section1.width, 0, {
      x: end_position.x + section2.width,
      y: earth_y,
      z: end_position.z,
    });
    this.create_plan_line(section2.width, 90, {
      x: end_position.x + section2.width / 2,
      y: earth_y,
      z: end_position.z - section1.width / 2,
    });
    this.create_plan_line(section2.width, 90, {
      x: end_position.x + section2.width / 2,
      y: earth_y,
      z: end_position.z + section1.width / 2,
    });

    const stair_middle = box1.tnum <= 1 ? 1 : 2;
    const line_h = stair_height * section1.num + stair_middle;
    this.create_plan_v_line(line_h, {
      x: end_position.x + section2.width,
      y: earth_y + line_h / 2,
      z: end_position.z + section1.width / 2,
    });
  }

  drawBox2(
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
    const { start_position, end_position, this_position, earth_y } = (
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

    if (box2.tnum === 0) {
    } else if (box2.tnum === 1) {
    } else if (box2.tnum === 2) {
      const pos = {
        x: end_position.x,
        y: earth_y,
        z: this_position.z + section3.width / 2,
      };
      this.create_plan_line(
        Math.sqrt(Math.pow(section2.width, 2) + Math.pow(section3.width, 2)),
        -45,
        pos,
        mirror_mode
      );
    } else if (box2.tnum === 3) {
      const vt_1 = section2.width / 0.866;
      const sin_1 = vt_1 / 2;
      const vt_2 = section3.width / 0.866;
      const sin_2 = vt_1 / 2;

      const start_z =
        start_position.z - section1.width / 2 - stair_going * section2.num;

      this.create_plan_line(
        vt_1,
        -60,
        {
          x: end_position.x,
          y: earth_y,
          z: start_z - sin_1 / 2,
        },
        mirror_mode
      );

      this.create_plan_line(
        vt_2,
        -30,
        {
          x: end_position.x - section2.width / 2 + sin_2 / 2,
          y: earth_y,
          z: start_z - section3.width / 2,
        },
        mirror_mode
      );
    } else if (box2.tnum === 4) {
      const vt_1 = section2.width / 0.92;
      const sin_1 = vt_1 * 0.38;
      const vt_2 = section3.width / 0.92;
      const sin_2 = vt_2 * 0.38;

      const start_z =
        start_position.z - section1.width / 2 - stair_going * section2.num;

      this.create_plan_line(
        vt_1,
        -77.5,
        {
          x: end_position.x,
          y: earth_y,
          z: start_z - sin_1 / 2,
        },
        mirror_mode
      );

      this.create_plan_line(
        Math.sqrt(Math.pow(section2.width, 2) + Math.pow(section3.width, 2)),
        -45,
        {
          x: end_position.x,
          y: earth_y,
          z: start_z - section3.width / 2,
        },
        mirror_mode
      );

      this.create_plan_line(
        vt_2,
        -22.5,
        {
          x: end_position.x - section2.width / 2 + sin_2 / 2,
          y: earth_y,
          z: start_z - section3.width / 2,
        },
        mirror_mode
      );
    }

    this.create_plan_line(
      section3.width,
      0,
      {
        x: start_position.x + section1.num * stair_going + section2.width,
        y: earth_y,
        z:
          start_position.z -
          section1.width / 2 -
          section2.num * stair_going -
          section3.width / 2,
      },
      mirror_mode
    );
    this.create_plan_line(
      section3.width,
      0,
      {
        x: start_position.x + section1.num * stair_going,
        y: earth_y,
        z:
          start_position.z -
          section1.width / 2 -
          section2.num * stair_going -
          section3.width / 2,
      },
      mirror_mode
    );
    this.create_plan_line(
      section3.width,
      90,
      {
        x: start_position.x + section1.num * stair_going + section2.width / 2,
        y: earth_y,
        z:
          start_position.z -
          section1.width / 2 -
          section2.num * stair_going -
          section3.width,
      },
      mirror_mode
    );
  }
}
