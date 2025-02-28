import BaseStairs from '../base/BaseStairs';
import HalfTurn from '../HalfTurn';
import {
  IBoxQuarterTurnParam,
  ISectionQuarterTurnParam,
  IThreadMode,
} from '../../@types/params';
import * as THREE from 'three';

export default class Stairs extends BaseStairs {
  parent: HalfTurn;

  constructor(parent: HalfTurn) {
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
    mirror_mode: boolean,
    treadMode: IThreadMode
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
      mirror_mode,
      treadMode
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
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    const stair_height = 20;

    const center = this.parent.getCenterPoint();
    let end_position = { x: 0, y: 0, z: 0 };

    for (let i = 1; i <= section1.num; i++) {
      end_position.x = center.x + (i - 1) * stair_going;
      end_position.y = center.y + (i - 1) * stair_height;
      end_position.z = center.z;

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

      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, section3.width),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height / 2,
            end_position.z
          ),
          mirror_mode
        )
      );

      if (i < section3.num) {
        this.parent.scene?.addObject(
          this.createRaise(
            new THREE.BoxGeometry(stair_going + 2, 2, section3.width),
            new THREE.Vector3(
              end_position.x - stair_going / 2 + 1,
              end_position.y + stair_height,
              end_position.z
            ),
            mirror_mode
          )
        );
      } else {
        this.parent.scene?.addObject(
          this.createRaise(
            new THREE.BoxGeometry(stair_going / 2 + 2, 2, section3.width),
            new THREE.Vector3(
              end_position.x - stair_going / 4 + 1,
              end_position.y + stair_height,
              end_position.z
            ),
            mirror_mode
          )
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
    const stair_height = 20;
    let center = this.parent.getCenterPoint();
    let end_position = {
      x: center.x + section1.num * stair_going,
      y: center.y + section1.num * stair_height,
      z: center.z,
    };

    if (box1.tnum === 1) {
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
    } else if (box1.tnum === 2) {
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
    } else if (box1.tnum === 3) {
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
    } else if (box1.tnum === 4) {
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
    const stair_height = 20;
    let center = this.parent.getCenterPoint();
    center.x = center.x + section1.num * stair_going + section2.width / 2;
    center.y = center.y + (section1.num + box1.tnum) * stair_height;
    center.z = center.z - section1.width / 2;

    let end_position = {
      x: center.x,
      y: center.y + section2.num * stair_height,
      z: center.z - section2.num * stair_going,
    };

    if (box2.tnum === 0) {
      this.parent.scene?.addObject(
        this.createTread(
          new THREE.BoxGeometry(section3.width, 2, section2.width),
          new THREE.Vector3(
            end_position.x,
            end_position.y,
            end_position.z - section3.width / 2 + 1.5
          ),
          mirror_mode,
          new THREE.Vector3(0, THREE.MathUtils.degToRad(90), 0)
        )
      );

      if (section2.num !== 0) {
      } else {
      }
    } else if (box2.tnum === 1) {
      const geometryRiser = new THREE.BoxGeometry(
        2,
        stair_height,
        section2.width
      );
      const cubeRiser = this.createRaise(
        geometryRiser,
        new THREE.Vector3(
          end_position.x,
          end_position.y + stair_height / 2,
          end_position.z
        ),
        mirror_mode,
        new THREE.Vector3(0, THREE.MathUtils.degToRad(90), 0)
      );
      this.parent.scene?.addObject(cubeRiser);

      const geometryTread = new THREE.BoxGeometry(
        section3.width + 3,
        2,
        section2.width
      );
      const cubeTread = this.createTread(
        geometryTread,
        new THREE.Vector3(
          end_position.x,
          end_position.y + stair_height,
          end_position.z - section3.width / 2 + 1.5
        ),
        mirror_mode,
        new THREE.Vector3(0, THREE.MathUtils.degToRad(90), 0)
      );

      this.parent.scene?.addObject(cubeTread);
    } else if (box2.tnum === 2) {
      // Step-1
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, section2.width),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height / 2 + 1,
            end_position.z
          ),
          mirror_mode,
          new THREE.Vector3(0, THREE.MathUtils.degToRad(90), 0)
        )
      );

      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape(
              [
                { x: section2.width, y: 0 },
                { x: section2.width, y: section3.width },
                { x: 0, y: 0 },
              ],
              { x: 0, y: 0 }
            ),
            2
          ),
          new THREE.Vector3(
            end_position.x - section2.width / 2,
            end_position.y + stair_height,
            end_position.z + 1
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );

      // step2
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(
            2,
            stair_height,
            Math.sqrt(Math.pow(section2.width, 2) + Math.pow(section3.width, 2))
          ),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height * 1.5,
            end_position.z - section3.width / 2
          ),
          mirror_mode,
          new THREE.Vector3(0, THREE.MathUtils.degToRad(-45), 0)
        )
      );

      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape(
              [
                { x: section2.width, y: 0 },
                { x: 0, y: -section3.width },
                { x: 0, y: 0 },
              ],
              { x: 0, y: 0 }
            ),
            2
          ),
          new THREE.Vector3(
            end_position.x - section2.width / 2,
            end_position.y + stair_height * 2,
            end_position.z - section3.width
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );
    } else if (box2.tnum === 3) {
      const vt_1 = section2.width / 0.866;
      const sin_1 = vt_1 / 2;
      const vt_2 = section3.width / 0.866;
      const sin_2 = vt_1 / 2;

      // Step1
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, section2.width),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height / 2,
            end_position.z
          ),
          mirror_mode,
          new THREE.Vector3(0, THREE.MathUtils.degToRad(90), 0)
        )
      );

      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape(
              [
                { x: section2.width, y: 0 },
                { x: section2.width, y: sin_1 },
                { x: 0, y: 0 },
              ],
              { x: 0, y: 0 }
            ),
            2
          ),
          new THREE.Vector3(
            end_position.x - section2.width / 2,
            end_position.y + stair_height,
            end_position.z + 0.5
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );

      // step-2
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, vt_1),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height * 1.5,
            end_position.z - sin_1 / 2
          ),
          mirror_mode,
          new THREE.Vector3(0, THREE.MathUtils.degToRad(120), 0)
        )
      );

      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape(
              [
                { x: section2.width, y: sin_1 },
                { x: section2.width, y: section3.width },
                { x: sin_2, y: section3.width },
                { x: 0, y: 0 },
              ],
              { x: 0, y: 0 }
            ),
            2
          ),
          new THREE.Vector3(
            end_position.x - section2.width / 2,
            end_position.y + stair_height * 2,
            end_position.z + 0.5
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );

      // step-3
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, vt_2),
          new THREE.Vector3(
            end_position.x - section2.width / 2 + sin_2 / 2,
            end_position.y + stair_height * 2.5,
            end_position.z - section3.width / 2
          ),
          mirror_mode,
          new THREE.Vector3(0, THREE.MathUtils.degToRad(150), 0)
        )
      );

      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape(
              [
                { x: sin_2, y: 0 },
                { x: 0, y: -section3.width },
                { x: 0, y: 0 },
              ],
              { x: 0, y: 0 }
            ),
            2
          ),
          new THREE.Vector3(
            end_position.x - section2.width / 2,
            end_position.y + stair_height * 3,
            end_position.z - section3.width
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );
    } else if (box2.tnum === 4) {
      const vt = Math.sqrt(
        Math.pow(section2.width, 2) + Math.pow(section3.width, 2)
      );
      let deg = Math.atan(section3.width / section2.width);
      deg = deg * (180 / Math.PI);

      const vt_1 = section2.width / 0.92;
      const sin_1 = vt_1 * 0.38;
      const vt_2 = section3.width / 0.92;
      const sin_2 = vt_1 * 0.38;

      // Step-1
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, section2.width),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height / 2,
            end_position.z
          ),
          mirror_mode,
          new THREE.Vector3(0, THREE.MathUtils.degToRad(90), 0)
        )
      );

      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape(
              [
                { x: section2.width, y: 0 },
                { x: section2.width, y: sin_1 },
                { x: 0, y: 0 },
              ],
              { x: 0, y: 0 }
            ),
            2
          ),
          new THREE.Vector3(
            end_position.x - section2.width / 2,
            end_position.y + stair_height,
            end_position.z + 0.5
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );

      // Step-2
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, vt_1),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height * 1.5,
            end_position.z - sin_1 / 2
          ),
          mirror_mode,
          new THREE.Vector3(0, THREE.MathUtils.degToRad(112.5), 0)
        )
      );
      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape(
              [
                { x: section2.width, y: sin_1 },
                { x: section2.width, y: section3.width },
                { x: 0, y: 0 },
              ],
              { x: 0, y: 0 }
            ),
            2
          ),
          new THREE.Vector3(
            end_position.x - section2.width / 2,
            end_position.y + 2 * stair_height,
            end_position.z + 0.5
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );
      // Step-3
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, vt),
          new THREE.Vector3(
            end_position.x,
            end_position.y + stair_height * 2.5,
            end_position.z - section3.width / 2
          ),
          mirror_mode,
          new THREE.Vector3(0, THREE.MathUtils.degToRad(90 + deg), 0)
        )
      );
      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape(
              [
                { x: section2.width, y: section3.width },
                { x: sin_2, y: section3.width },
                { x: 0, y: 0 },
              ],
              { x: 0, y: 0 }
            ),
            2
          ),
          new THREE.Vector3(
            end_position.x - section2.width / 2,
            end_position.y + 3 * stair_height,
            end_position.z + 0.5
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );
      // Step-4
      this.parent.scene?.addObject(
        this.createRaise(
          new THREE.BoxGeometry(2, stair_height, vt_2),
          new THREE.Vector3(
            end_position.x - section2.width / 2 + sin_2 / 2,
            end_position.y + stair_height * 3.5,
            end_position.z - section3.width / 2
          ),
          mirror_mode,
          new THREE.Vector3(0, THREE.MathUtils.degToRad(157.5), 0)
        )
      );
      this.parent.scene?.addObject(
        this.createTread(
          this.createExtrudeGeometry(
            this.createShape(
              [
                { x: sin_2, y: 0 },
                { x: 0, y: -section3.width },
                { x: 0, y: 0 },
              ],
              { x: 0, y: 0 }
            ),
            2
          ),
          new THREE.Vector3(
            end_position.x - section2.width / 2,
            end_position.y + 4 * stair_height,
            end_position.z - section3.width
          ),
          mirror_mode,
          new THREE.Vector3(THREE.MathUtils.degToRad(-90), 0, 0)
        )
      );
    }
  }
}
