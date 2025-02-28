import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Engine from './engine/Engine';
import Ground from './objects/Ground';

import Renderer from './Renderer';
import Scene from './Scene';

import {
  IHalfTurnParam,
  IQuarterTurnParam,
  IStraightFlightParam,
} from './@types/params';
import EventEmitter from 'events';

export class StairSimulator extends EventEmitter {
  canvas: HTMLCanvasElement;

  width: number;
  height: number;

  scene: Scene;
  renderer: Renderer;
  controls: OrbitControls;
  camera: THREE.PerspectiveCamera;

  engine: Engine;
  canStart: boolean;

  constructor(canvas: HTMLCanvasElement) {
    super();

    this.canvas = canvas;

    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;

    this.scene = new Scene(this);
    this.renderer = new Renderer(this);
    this.camera = new THREE.PerspectiveCamera(
      60,
      this.width / this.height,
      1,
      50000
    );
    this.camera.position.set(-300, 400, -350);

    this.controls = new OrbitControls(this.camera, this.canvas);
    // this.controls.addEventListener("change", update_text);
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;
    this.controls.minDistance = 100;
    this.controls.maxDistance = 700;
    this.controls.maxPolarAngle = Math.PI / 2 - Math.PI / 45;

    this.scene.scene.add(new THREE.AmbientLight(0x333333));

    const lightDirectional1 = new THREE.DirectionalLight(0x333333, 1);
    lightDirectional1.position.set(-200, 0, -200);
    this.scene.scene.add(lightDirectional1);

    const lightDirectional2 = new THREE.DirectionalLight(0x111111, 1);
    lightDirectional2.position.set(200, 0, 0);
    this.scene.scene.add(lightDirectional2);

    const light = new THREE.DirectionalLight(0xf4f4f4, 1);
    light.position.set(-100, 400, 200);
    light.position.multiplyScalar(1.3);
    light.castShadow = true;
    light.shadow.mapSize.width = 2000;
    light.shadow.mapSize.height = 2000;
    const d = 600;
    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;
    light.shadow.camera.far = 1000;
    this.scene.scene.add(light);

    this.engine = new Engine(this.scene, this.camera, this.controls);

    this.animate = this.animate.bind(this);

    this.canStart = false;

    this.engine.resource.on('loaded', () => {
      this.canStart = true;

      this.start();
    });

    this.addEvents();
  }

  start() {
    this.scene.addModel(new Ground());
    this.animate();

    this.emit('started');
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.renderScene();
  }

  addEvents() {
    // window.onresize = () => {
    //   this.width = this.canvas.clientWidth;
    //   this.height = this.canvas.clientHeight;
    // };
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  drawStraightFlight(parameters: IStraightFlightParam) {
    this.resetScene();
    this.engine.drawStraightFlight(parameters);
  }

  drawQuarterTurn(parameters: IQuarterTurnParam) {
    this.resetScene();
    this.engine.drawQuarterTurn(parameters);
  }

  drawHalfTurn(parameters: IHalfTurnParam) {
    this.resetScene();
    this.engine.drawHalfTurn(parameters);
  }

  resetScene() {
    this.scene.reset();
  }
}

export default StairSimulator;
