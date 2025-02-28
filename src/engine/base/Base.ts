import { IPosition, IRotation } from '../../@types/position';
import BaseMode from '../BaseMode';
import * as THREE from 'three';

export default class Base {
  parent: BaseMode;

  stair_width: number;
  floor_height: number;
  stair_going: number;
  stair_number: number;
  centerPoint: IPosition;
  start_position: IPosition;
  end_position: IPosition;

  constructor(parent: BaseMode) {
    this.parent = parent;

    this.stair_width = 1;
    this.floor_height = 1;
    this.stair_going = 1;
    this.stair_number = 0;
    this.centerPoint = { x: 0, y: 0, z: 0 };
    this.start_position = { x: 0, y: 0, z: 0 };
    this.end_position = { x: 0, y: 0, z: 0 };
  }

  setBaseData(stair_width: number, floor_height: number, stair_going: number) {
    this.stair_width = stair_width;
    this.floor_height = floor_height;
    this.stair_going = stair_going;

    this.stair_number = Math.floor(floor_height / this.getStairHeight());

    const modelSize = this.getModelSize();
    this.centerPoint = { x: -modelSize.x / 2, y: 0, z: -modelSize.z / 2 };
    this.start_position = {
      x: this.centerPoint.x,
      y: this.centerPoint.y,
      z: this.centerPoint.z,
    };

    this.end_position = { x: 0, y: 0, z: 0 };
  }

  getAssets() {
    this.parent.getCenterPoint();
  }

  getStairHeight(): number {
    return 20;
  }

  getModelSize() {
    const model_x = this.stair_number * this.stair_going;
    const model_y = this.floor_height;
    const model_z = this.stair_width;

    return { x: model_x, y: model_y, z: model_z };
  }

  copy_newel(
    obj: any,
    pos: IPosition,
    material: THREE.Material,
    mirror_mode: boolean = false
  ) {
    var object = obj.clone();
    object.material = material;
    object.material.needsUpdate = true;

    object.position.x = pos.x;
    object.position.y = pos.y;
    object.position.z = pos.z;
    if (mirror_mode)
      object.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));
    object.castShadow = true;
    object.receiveShadow = true;
    // object.callback = null;
    // scene.add(object);
    this.parent.scene?.addObject(object);
  }

  copy_rail_hand(
    obj: any,
    length: number,
    pos: IPosition,
    rotate: IRotation,
    material: THREE.Material,
    mirror_mode: boolean
  ) {
    const object = obj.clone();
    object.material = material;
    object.position.x = pos.x;
    object.position.y = pos.y + 90;
    object.position.z = pos.z + 2;
    object.rotation.x = THREE.MathUtils.degToRad(rotate.x);
    object.rotation.y = THREE.MathUtils.degToRad(rotate.y);
    object.rotation.z = THREE.MathUtils.degToRad(rotate.z);
    object.scale.y = length;
    object.callback = null;
    object.castShadow = true;
    object.receiveShadow = true;
    if (mirror_mode)
      object.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));
    this.parent.scene?.addObject(object);
  }
}
