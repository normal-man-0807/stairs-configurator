import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Scene from '../Scene';
import HalfTurn from './HalfTurn';
import QuarterTurn from './QuarterTurn';

import StraightFlight from './StraightFlight';
import {
  IHalfTurnParam,
  IQuarterTurnParam,
  IStraightFlightParam,
} from '../@types/params';
import Assets from '../Assets';

export const PRODUCT_SCALE = 10;

export default class Engine {
  scene: Scene;
  resource: Assets;

  strightFlight: StraightFlight;
  guarterTurn: QuarterTurn;
  halfTurn: HalfTurn;

  constructor(
    scene: Scene,
    camera: THREE.PerspectiveCamera,
    controls: OrbitControls
  ) {
    this.scene = scene;
    this.resource = new Assets();

    this.strightFlight = new StraightFlight(this, scene, camera, controls);
    this.guarterTurn = new QuarterTurn(this, scene, camera, controls);
    this.halfTurn = new HalfTurn(this, scene, camera, controls);

    // this.strightFlight.draw();
    // this.guarterTurn.draw();
  }

  drawStraightFlight(parameters: IStraightFlightParam) {
    this.strightFlight.setParams(parameters);
    this.strightFlight.draw();
  }

  drawQuarterTurn(parameters: IQuarterTurnParam) {
    this.guarterTurn.setParams(parameters);
    this.guarterTurn.draw();
  }

  drawHalfTurn(parameters: IHalfTurnParam) {
    this.halfTurn.setParams(parameters);
    this.halfTurn.draw();
  }
}
