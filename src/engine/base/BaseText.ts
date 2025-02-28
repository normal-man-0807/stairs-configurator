import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import Roboto_Regular from 'three/examples/fonts/helvetiker_regular.typeface.json';
import { IPosition, IRotation } from '../../@types/position';

import Base from './Base';

export default class BaseText extends Base {
  create_text(
    text: string,
    pos: IPosition,
    rotate: IRotation,
    index: number,
    mirror_mode: boolean = false
  ) {
    const loader = new FontLoader();
    loader.load(Roboto_Regular, (font) => {
      //   const textGeo = new TextGeometry(text, {
      //     font: font,
      //     size: 7,
      //     height: 1,
      //     curveSegments: 0,
      //     bevelEnabled: false,
      //     bevelThickness: 0,
      //     bevelSize: 1,
      //     bevelOffset: 0,
      //     bevelSegments: 0,
      //   });

      const textGeo = new TextGeometry(text, {
        font: font,
        size: 8,
        height: 1.5,
        curveSegments: 1,
        bevelEnabled: false,
        bevelThickness: 2,
        bevelSize: 2,
        bevelOffset: 0,
        bevelSegments: 0,
      });
      const materials = new THREE.MeshPhongMaterial({
        color: 0x000000,
        flatShading: true,
      });

      const textMesh = new THREE.Mesh(textGeo, materials);
      textMesh.position.x = pos.x;
      textMesh.position.y = pos.y;
      textMesh.position.z = pos.z;
      textMesh.rotation.x = THREE.MathUtils.degToRad(rotate.x);
      textMesh.rotation.y = THREE.MathUtils.degToRad(rotate.y);
      textMesh.rotation.z = THREE.MathUtils.degToRad(rotate.z);

      if (mirror_mode)
        textMesh.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));
      this.parent.scene?.addObject(textMesh);
    });
  }
}
