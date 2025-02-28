import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

import { I2Position, IPosition } from '../../@types/position';
import { radians_to_degrees } from '../../utils';
import Base from './Base';

// function get_decimal(value: number) {
//   return parseFloat(Math.round(value * 100) / 100).toFixed(2);
// }
import crown_handrail from '../../assets/models/crown_handrail.obj';
import { IMaterialType, ISPINDLETYPE } from '../../@types/params';

export default class BaseHandrails extends Base {
  // spindle
  create_railing_func(
    start: IPosition,
    end: IPosition,
    direction: 'front' | 'left' | 'right' | 'back',
    step_direct: number,
    step_height: number,
    material_type: IMaterialType,
    spindle_style: ISPINDLETYPE = 'CHAMFERED',
    mirror_mode: boolean = false
  ) {
    let i = 1;
    let current_position = { x: start.x, y: start.y, z: start.z };

    while (true) {
      if (direction == 'front') current_position.x = start.x + i * step_direct;
      if (direction == 'left') current_position.z = start.z - i * step_direct;
      if (direction == 'back') current_position.x = start.x - i * step_direct;

      current_position.y = start.y + 50 + i * step_height;
      i++;

      if (direction == 'front' && current_position.x >= end.x) break;
      if (direction == 'left' && current_position.z <= end.z) break;
      if (direction == 'back' && current_position.x <= end.x) break;

      current_position.y -= 43;

      const tData = this.parent.resource.getTexture(material_type);
      const material = new THREE.MeshPhongMaterial({ map: tData.texture });

      const data = this.parent.resource.getModel('SPINDLE', spindle_style);
      const obj = data.obj;

      this.copy_newel(obj.children[0], current_position, material, mirror_mode);

      // const geometry = new THREE.BoxGeometry(3, 85, 3);
      //
      // const texture = new THREE.TextureLoader().load(texture_ur);
      // texture.wrapS = THREE.RepeatWrapping;
      // texture.wrapT = THREE.RepeatWrapping;
      // const material = new THREE.MeshPhongMaterial({ map: texture });
      //
      // const cube = new THREE.Mesh(geometry, material);
      // cube.position.x = current_position.x;
      // cube.position.y = current_position.y - 2;
      // cube.position.z = current_position.z;
      // cube.castShadow = true;
      // cube.receiveShadow = true;
      //
      // this.parent.scene?.addObject(cube);
    }
  }

  // rail hand
  async create_stair_rail_hand(
    start: I2Position,
    end: I2Position,
    stair_height: number,
    rotate: number,
    pos: IPosition,
    material_type: IMaterialType,
    mirror_mode: boolean = false
  ) {
    const xx = end.x - start.x;
    const yy = end.y - start.y;
    const rotate_z = radians_to_degrees(Math.atan(yy / xx));
    const len = Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2));

    const tData = this.parent.resource.getTexture(material_type);
    const material = new THREE.MeshPhongMaterial({ map: tData.texture });
    const rotation = { x: 0, y: rotate, z: -(90 - rotate_z) };
    // for (var i = 0; i < newel_objects.length; i++) {
    //   if (newel_objects[i][0] == options.handrail_style) {
    //     copy_rail_hand(newel_objects[i][1], len, pos, rotate, material);
    //   }
    // }
    const loader = new OBJLoader();
    const obj = await loader.loadAsync(crown_handrail);
    this.copy_rail_hand(
      obj.children[0],
      len,
      pos,
      rotation,
      material,
      mirror_mode
    );
  }
}
