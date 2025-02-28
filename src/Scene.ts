import * as THREE from 'three';

import StairSimulator from './StairSimulation';
import SimulationObject from './objects/SimulationObject';

class Scene {
  app: StairSimulator;
  scene: THREE.Scene;

  meshs: Array<THREE.Mesh> = [];

  constructor(app: StairSimulator) {
    this.app = app;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf5f5f5);
  }

  addModel(object: SimulationObject) {
    if (object.mesh) this.scene.add(object.mesh);
  }

  addObject(mesh: THREE.Mesh) {
    this.meshs.push(mesh);
    this.scene.add(mesh);
  }

  reset() {
    this.meshs.forEach((m) => {
      this.scene.remove(m);
      m.geometry.dispose();
    });
  }
}

export default Scene;
