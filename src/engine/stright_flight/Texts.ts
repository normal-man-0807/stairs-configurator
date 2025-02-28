import BaseText from '../base/BaseText';
import BaseMode from '../BaseMode';

// import Roboto_Regular from "../assets/fonts/Roboto_Regular.json";

export default class Texts extends BaseText {
  parent: BaseMode;

  constructor(parent: BaseMode) {
    super(parent);

    this.parent = parent;
  }

  draw(stair_width: number, floor_height: number, stair_going: number) {
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
    }

    let textH = (floor_height * 10).toFixed(2) + ' mm';
    let posH = {
      x: centerPoint.x + stair_going * (stair_number - 1),
      y: centerPoint.y + (stair_height * stair_number) / 2,
      z: end_position.z + stair_width / 2 + 20,
    };
    let rotateH = {
      x: 0,
      y: 0,
      z: 0,
    };

    this.create_text(textH, posH, rotateH, 1);

    let textW = (stair_going * (stair_number - 1) * 10).toFixed(2) + ' mm';
    let posW = {
      x: centerPoint.x + (stair_number * stair_going) / 3,
      y: centerPoint.y,
      z: end_position.z + stair_width / 2 + 20,
    };
    let rotateW = {
      x: 0,
      y: 0,
      z: 0,
    };

    this.create_text(textW, posW, rotateW, 2);
  }
}
