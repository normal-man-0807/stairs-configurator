import QuarterTurn from '../QuarterTurn';
import {
  IBoxQuarterTurnParam,
  ISectionQuarterTurnParam,
  IThreadMode,
} from '../../@types/params';
import * as THREE from 'three';
import BaseStairs from '../base/BaseStairs';

export default class Stairs extends BaseStairs {
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
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    this.drawSection1(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      mirror_mode,
      treadMode
    );
    this.drawTurn(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      mirror_mode
    );
    this.drawSection2(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      mirror_mode
    );
  }

  drawSection1(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    const stair_height = 20;
    const centerPoint = this.parent.getCenterPoint();
    let end_position = { x: 0, y: 0, z: 0 };

    for (let i = 1; i <= section1.num; i++) {
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
          new THREE.BoxGeometry(2, stair_height, section1.width),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height / 2,
            end_position.z
          ),
          mirror_mode
        )
      );

      // Top of stair - Tread
      const st_going = stair_going + 3;
      const st_x = stair_going / 2 - 0.5;

      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(st_going, 2, section1.width),
          new THREE.Vector3(
            end_position.x + st_x,
            end_position.y + stair_height,
            end_position.z
          ),
          mirror_mode
        )
      );
    }
  }

  drawSection2(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    mirror_mode: boolean
  ) {
    const stair_height = 20;

    const centerPointForWhole = this.parent.getCenterPoint();
    const section2CenterPoint = { x: 0, y: 0, z: 0 };
    section2CenterPoint.x =
      centerPointForWhole.x + section1.num * stair_going + section2.width / 2;
    section2CenterPoint.y =
      centerPointForWhole.y + (section1.num + box.tnum) * stair_height;
    section2CenterPoint.z = centerPointForWhole.z - section1.width / 2;

    let end_position = { x: 0, y: 0, z: 0 };

    for (let i = 1; i <= section2.num; i++) {
      end_position.x = section2CenterPoint.x;
      end_position.y = section2CenterPoint.y + (i - 1) * stair_height;
      end_position.z = section2CenterPoint.z - (i - 1) * stair_going;
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(section2.width, stair_height, 2),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height / 2,
            end_position.z
          ),
          mirror_mode
        )
      );

      if (i == section2.num) {
      } else {
        this.parent.scene?.addObject(
          this.createRaise(
            new THREE.BoxGeometry(section2.width, 2, stair_going + 2),
            new THREE.Vector3(
              end_position.x,
              end_position.y + stair_height,
              end_position.z - stair_going / 2 + 1
            ),
            mirror_mode
          )
        );
      }
    }
  }

  drawTurn(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    mirror_mode: boolean
  ) {
    const stair_height = 20;
    let center = this.parent.getCenterPoint();
    let end_position = {
      x: center.x + section1.num * stair_going,
      y: center.y + section1.num * stair_height,
      z: center.z,
    };

    if (box.tnum === 1) {
      const geometryRiser = new THREE.BoxGeometry(
        2,
        stair_height,
        section1.width
      );
      const cubeRiser = this.createRaise(
        geometryRiser,
        new THREE.Vector3(
          end_position.x,
          end_position.y + stair_height / 2,
          end_position.z
        ),
        mirror_mode
      );
      this.parent.scene?.addObject(cubeRiser);

      const geometryTread = new THREE.BoxGeometry(
        section2.width + 3,
        2,
        section1.width
      );
      const cubeTread = this.createTread(
        geometryTread,
        new THREE.Vector3(
          end_position.x + section2.width / 2 - 0.5,
          end_position.y + stair_height,
          end_position.z
        ),
        mirror_mode
      );
      this.parent.scene?.addObject(cubeTread);
    } else if (box.tnum === 2) {
      let end_position = {
        x: center.x + section1.num * stair_going,
        y: center.y + section1.num * stair_height,
        z: center.z,
      };
      this.parent.scene?.addObject(
        this.createTread(
          new THREE.BoxGeometry(2, stair_height, section1.width),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height / 2 + 1,
            end_position.z
          ),
          mirror_mode
        )
      );
      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape([
              { x: -1, y: -section1.width },
              { x: section2.width + 3, y: 0 - section1.width },
              { x: 4, y: 0 },
              { x: -1, y: 0 },
            ]),
            2
          ),
          new THREE.Vector3(
            end_position.x - 1,
            end_position.y + stair_height,
            end_position.z - section1.width / 2
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );

      end_position = {
        x: center.x + section1.num * stair_going,
        y: center.y + (section1.num + 1) * stair_height,
        z: center.z,
      };
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(
            2,
            stair_height,
            Math.sqrt(Math.pow(section1.width, 2) + Math.pow(section2.width, 2))
          ),
          new THREE.Vector3(
            end_position.x + section2.width / 2,
            end_position.y + stair_height / 2,
            end_position.z
          ),
          mirror_mode,
          new THREE.Vector3(0, Math.atan(section2.width / section1.width), 0)
        )
      );
      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape([
              { x: section2.width, y: 0 },
              { x: section2.width, y: 0 - section1.width },
              { x: -1 + section2.width, y: -section1.width },
              { x: -1, y: 0 },
            ]),
            2
          ),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height,
            end_position.z - section1.width / 2
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );
    } else if (box.tnum === 3) {
      // Ensure turn stair is static 3 now.
      const vt_1 = section1.width / 0.866;
      const vt_2 = section2.width / 0.866;

      const sin_1 = vt_1 / 2;
      const sin_2 = vt_2 / 2;

      // Step 1
      let end_position = {
        x: center.x + section1.num * stair_going,
        y: center.y + section1.num * stair_height,
        z: center.z,
      };
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, section1.width),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height / 2 + 1,
            end_position.z
          ),
          mirror_mode,
          new THREE.Vector3(0, 0, 0)
        )
      );
      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape([
              { x: -1, y: 0 - section1.width },
              { x: sin_1 + 3, y: 0 - section1.width },
              { x: 4, y: 0 },
              { x: -1, y: 0 },
            ]),
            2
          ),
          new THREE.Vector3(
            end_position.x - 1,
            end_position.y + stair_height,
            end_position.z - section1.width / 2
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );

      // Step-2
      end_position = {
        x: center.x + section1.num * stair_going,
        y: center.y + center.y + (section1.num + 1) * stair_height,
        z: center.z,
      };
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, vt_1),
          new THREE.Vector3(
            end_position.x + sin_1 / 2 + 1,
            end_position.y + stair_height / 2,
            end_position.z
          ),
          mirror_mode,
          new THREE.Vector3(0, THREE.MathUtils.degToRad(30), 0)
        )
      );
      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape([
              { x: 0, y: 0 },
              { x: sin_1, y: 0 - section1.width },
              { x: section2.width, y: 0 - section1.width },
              { x: section2.width, y: 0 - sin_2 },
              { x: -1, y: 0 },
            ]),
            2
          ),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height,
            end_position.z - section1.width / 2
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );

      // Step-3
      end_position = {
        x: center.x + section1.num * stair_going,
        y: center.y + center.y + (section1.num + 2) * stair_height,
        z: center.z,
      };
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, vt_2),
          new THREE.Vector3(
            end_position.x + section2.width / 2 + 1,
            end_position.y + stair_height / 2,
            end_position.z - (section1.width - sin_2) / 2
          ),
          mirror_mode,
          new THREE.Vector3(
            0,
            Math.atan(
              section2.width / (Math.sin(THREE.MathUtils.degToRad(30)) * vt_2)
            ),
            0
          )
        )
      );
      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape(
              [
                { x: section2.width, y: 0 - sin_2 },
                { x: section2.width, y: 0 },
                { x: 0, y: 0 },
              ],
              { x: 0, y: 0 }
            ),
            2
          ),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height,
            end_position.z - section1.width / 2 + 1
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );
    } else if (box.tnum === 4) {
      const vt_1 = section1.width / 0.92;
      const sin_1 = vt_1 * 0.38;
      const vt_2 = section2.width / 0.92;
      const sin_2 = vt_2 * 0.38;

      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, section1.width),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height / 2 + 1,
            end_position.z
          ),
          mirror_mode
        )
      );
      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape([
              { x: -1, y: 0 - section1.width },
              { x: sin_1 + 3, y: 0 - section1.width },
              { x: 4, y: 0 },
              { x: -1, y: 0 },
            ]),
            2
          ),
          new THREE.Vector3(
            end_position.x - 1,
            end_position.y + stair_height,
            end_position.z - section1.width / 2
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );

      // Second Stair
      end_position = {
        x: center.x + section1.num * stair_going,
        y: center.y + (section1.num + 1) * stair_height,
        z: center.z,
      };
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, vt_1),
          new THREE.Vector3(
            end_position.x + sin_1 / 2 + 1,
            end_position.y + stair_height / 2,
            end_position.z
          ),
          mirror_mode,
          new THREE.Vector3(0, THREE.MathUtils.degToRad(22.5), 0)
        )
      );

      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape([
              { x: 0, y: 0 },
              { x: sin_1, y: 0 - section1.width },
              { x: section2.width, y: 0 - section1.width },
              { x: -1, y: 0 },
            ]),
            2
          ),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height,
            end_position.z - section1.width / 2
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );

      // Third Stair
      end_position = {
        x: center.x + section1.num * stair_going,
        y: center.y + (section1.num + 2) * stair_height,
        z: center.z,
      };
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(
            2,
            stair_height,
            Math.sqrt(Math.pow(section1.width, 2) + Math.pow(section2.width, 2))
          ),
          new THREE.Vector3(
            end_position.x + section2.width / 2 + 1,
            end_position.y + stair_height / 2,
            end_position.z
          ),
          mirror_mode,
          new THREE.Vector3(0, Math.atan(section2.width / section1.width), 0)
        )
      );

      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape([
              { x: 0, y: 0 },
              { x: section2.width, y: 0 - section1.width },
              { x: section2.width, y: 0 - sin_2 },
              { x: -1, y: 0 },
            ]),
            2
          ),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height,
            end_position.z - section1.width / 2
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );

      end_position = {
        x: center.x + section1.num * stair_going,
        y: center.y + (section1.num + 3) * stair_height,
        z: center.z,
      };
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, vt_2),
          new THREE.Vector3(
            end_position.x + section2.width / 2 + 1,
            end_position.y + stair_height / 2,
            end_position.z - (section1.width - sin_2) / 2
          ),
          mirror_mode,
          new THREE.Vector3(0, THREE.MathUtils.degToRad(67.5), 0)
        )
      );
      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape(
              [
                { x: section2.width, y: -sin_2 },
                { x: section2.width, y: 0 },
                { x: 0, y: 0 },
              ],
              { x: 0, y: 0 }
            ),
            2
          ),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height,
            end_position.z - section1.width / 2 + 1
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );
    }
  }
}
