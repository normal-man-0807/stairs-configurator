import * as THREE from 'three';

import Scene from '../Scene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PRODUCT_SCALE } from './Engine';
import Assets from '../Assets';
import { IThreadMode } from '../@types/params';

export type IStairMode = 'straight_flight' | 'quarter_turn';

export default abstract class BaseMode {
  mode: IStairMode;
  scene?: Scene;
  camera?: THREE.PerspectiveCamera;
  controls?: OrbitControls;
  resource!: Assets;

  stair_height: number;

  constructor() {
    this.mode = 'straight_flight';

    this.stair_height = 200 / PRODUCT_SCALE;
  }

  getTheadDistance(mode: IThreadMode) {
    const tread_distance = { left: 0, right: 0 };

    if (mode.length === 3) {
      if (mode[0] == 'l' || mode[0] == 'd') tread_distance.left = 1;
      if (mode[0] == 'r' || mode[0] == 'd') tread_distance.right = 1;
    } else {
      if (mode[0] == 'l' || mode[0] == 'd') tread_distance.left = 2;
      if (mode[0] == 'r' || mode[0] == 'd') tread_distance.right = 2;
    }

    return tread_distance;
  }

  abstract getCenterPoint(): { x: number; y: number; z: number };
}
