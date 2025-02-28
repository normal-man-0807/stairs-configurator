import * as THREE from "three";

import baseline_material from "../assets/material/baseline_material.jpg";
import StrightFlight from "../engine/StraightFlight";
import SimulationObject from "./SimulationObject";

export default class StraightBaseLine extends SimulationObject {
  parent: StrightFlight;

  constructor(parent: StrightFlight) {
    super();

    this.parent = parent;
  }

  draw(position: THREE.Vector3, rotation: number) {
    const shh = 0.1;

    const texture = new THREE.TextureLoader().load(baseline_material);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // texture.anisotropy = renderer.getMaxAnisotropy();
    texture.repeat.set(0.01, 0.01);
    const material = new THREE.MeshPhongMaterial({ map: texture });

    const side = new THREE.Shape();

    const extrudeSettings = {
      depth: 3.8,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 4,
      bevelSize: 1,
      bevelThickness: 1,
    };
    const geometry = new THREE.ExtrudeGeometry(side, extrudeSettings);

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.y = THREE.MathUtils.degToRad(rotation);
    this.mesh.position.x = position.x;
    this.mesh.position.y = position.y + shh / 2 + 1.5;
    this.mesh.position.z = position.z;
    // if (mirror_mode)
    //   this.mesh.applyMatrix(new THREE.Matrix4().makeScale(1, 1, -1));
    // this.mesh.callback = null;
    // scene.add(this.mesh);
  }
}
