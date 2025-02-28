import BaseLines from '../base/BaseLines';
import BaseMode from '../BaseMode';
import { IThreadMode } from '../../@types/params';

export default class Lines extends BaseLines {
  constructor(parent: BaseMode) {
    super(parent);
  }

  draw(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    treadMode: IThreadMode
  ) {
    const stair_height = 20; // 200
    const stair_number = Math.floor(floor_height / stair_height);

    const h1_width = 500;
    const model_x = stair_number * stair_going;
    const model_y = floor_height;
    const model_z = stair_width;

    const centerPoint = { x: -model_x / 2, y: 0, z: -model_z / 2 };
    const start_position = {
      x: centerPoint.x,
      y: centerPoint.y,
      z: centerPoint.z,
    };

    let end_position = { x: 0, y: 0, z: 0 };

    for (let i = 1; i <= stair_number; i++) {
      end_position.x = centerPoint.x + (i - 1) * stair_going;
      end_position.y = centerPoint.y + (i - 1) * floor_height;
      end_position.z = centerPoint.z;

      // Line
      if (i != stair_number) {
        let pos = {
          x: end_position.x + stair_going,
          y: centerPoint.y,
          z: end_position.z,
        };
        this.create_plan_line(stair_width, 0, pos);
      }
    }

    const tread_distance = this.parent.getTheadDistance(treadMode);

    const left_line = {
      length: stair_going * (stair_number - 1 - tread_distance.left),
      x:
        centerPoint.x +
        (stair_going * (stair_number - 1 - tread_distance.left)) / 2 +
        tread_distance.left * stair_going,
    };

    const pos1 = {
      x: left_line.x,
      y: centerPoint.y,
      z: end_position.z - stair_width / 2,
    };

    this.create_plan_line(left_line.length, 90, pos1);

    const right_line = {
      length: stair_going * (stair_number - 1 - tread_distance.right),
      x:
        centerPoint.x +
        (stair_going * (stair_number - 1 - tread_distance.right)) / 2 +
        tread_distance.right * stair_going,
    };
    const pos2 = {
      x: right_line.x,
      y: centerPoint.y,
      z: end_position.z + stair_width / 2,
    };
    this.create_plan_line(right_line.length, 90, pos2);

    const pos3 = {
      x: centerPoint.x + stair_going * (stair_number - 1),
      y: centerPoint.y + (stair_height * stair_number) / 2,
      z: end_position.z + stair_width / 2,
    };
    this.create_plan_v_line(stair_height * stair_number, pos3);
  }
}
