import * as THREE from 'three';

import { IPosition } from '../../@types/position';
import Base from './Base';

export default class BaseLines extends Base {
  radians_to_degrees(radians: number) {
    const pi = Math.PI;
    return radians * (180 / pi);
  }

  create_plan_line(
    length: number,
    rotate: number,
    pos: IPosition,
    mirror_mode: boolean = false
  ) {
    const geometry = new THREE.BoxGeometry(1, 1, length);
    const material = new THREE.MeshPhongMaterial({
      color: 0x000000,
      flatShading: true,
    });
    const line = new THREE.Mesh(geometry, material);
    line.rotation.y = THREE.MathUtils.degToRad(rotate);
    line.position.x = pos.x;
    line.position.y = pos.y;
    line.position.z = pos.z;
    if (mirror_mode) line.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));

    this.parent.scene?.addObject(line);
  }

  create_plan_v_line(
    length: number,
    pos: IPosition,
    mirror_mode: boolean = false
  ) {
    const geometry = new THREE.BoxGeometry(1, length, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0x000000,
      flatShading: true,
    });
    const line = new THREE.Mesh(geometry, material);
    line.position.x = pos.x;
    line.position.y = pos.y;
    line.position.z = pos.z;
    if (mirror_mode) line.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));

    this.parent.scene?.addObject(line);
  }
}
