import * as THREE from "three";

import side_material from "../assets/material/material1.jpg";
import StrightFlight from "../engine/StraightFlight";
import SimulationObject from "./SimulationObject";

export default class StaightFlightSide extends SimulationObject {
  parent: StrightFlight;

  constructor(parent: StrightFlight) {
    super();

    this.parent = parent;
  }

  draw(position: THREE.Vector3, rotation: number) {
    const texture = new THREE.TextureLoader().load(side_material);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // texture.anisotropy = renderer.getMaxAnisotropy();
    texture.repeat.set(0.01, 0.01);
    const material = new THREE.MeshPhongMaterial({ map: texture });

    const side = new THREE.Shape();

    const extrudeSettings = {
      depth: 4,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 4,
      bevelSize: 1,
      bevelThickness: 1,
    };
    const geometry = new THREE.ExtrudeGeometry(side, extrudeSettings);

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.y = THREE.MathUtils.degToRad(rotation);

    // if(mirror_mode) this.mesh.applyMatrix(new THREE.Matrix4().makeScale(1, 1, -1));

    this.mesh.position.x = position.x;
    this.mesh.position.y = position.y;
    this.mesh.position.z = position.z;

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
  }
}
