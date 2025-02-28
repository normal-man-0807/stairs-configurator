import * as THREE from "three";

import StairSimulator from "./StairSimulation";

class Renderer extends THREE.WebGLRenderer {
  app: StairSimulator;

  constructor(app: StairSimulator) {
    super({
      antialias: true,
      canvas: app.canvas,
    });

    this.app = app;

    this.setPixelRatio(window.devicePixelRatio);
    this.setSize(this.app.width, this.app.height);
    this.shadowMap.enabled = true;
  }

  // Render Webgl
  renderScene() {
    this.render(this.app.scene.scene, this.app.camera);
  }
}

export default Renderer;
