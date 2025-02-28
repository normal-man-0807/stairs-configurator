import * as THREE from 'three';

import BaseMode from '../BaseMode';
import BaseStairs from '../base/BaseStairs';
import { IThreadMode } from '../../@types/params';

export default class Stairs extends BaseStairs {
  parent: BaseMode;

  constructor(parent: BaseMode) {
    super(parent);
    this.parent = parent;
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
      end_position.y = centerPoint.y + (i - 1) * stair_height;
      end_position.z = centerPoint.z;

      if (i === 1 && treadMode.length === 3) {
        this.create_tread_stair(
          treadMode as any,
          end_position,
          stair_width,
          stair_going,
          stair_height,
          false
        );
        continue;
      }

      if (i === 1 && treadMode.length === 4) {
        this.create_tread_stair(
          (treadMode.charAt(0) + 'cs') as any,
          end_position,
          stair_width,
          stair_going,
          stair_height,
          false
        );
        continue;
      }

      if (i === 2 && treadMode.length === 4) {
        this.create_tread_stair(
          (treadMode.charAt(0) + 'bs') as any,
          end_position,
          stair_width,
          stair_going,
          stair_height,
          false
        );
        continue;
      }

      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, stair_width),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height / 2,
            end_position.z
          ),
          false
        )
      );

      const st_going = stair_going + 3;
      const st_x = stair_going / 2 - 0.5;

      this.parent.scene?.addObject(
        this.createTread(
          new THREE.BoxGeometry(st_going, 2, stair_width),
          new THREE.Vector3(
            end_position.x + st_x,
            end_position.y + stair_height,
            end_position.z
          ),
          false
        )
      );
      // top of stair
    }
  }
}
