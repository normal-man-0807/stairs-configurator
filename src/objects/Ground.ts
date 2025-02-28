import * as THREE from "three";

import SimulationObject from "./SimulationObject";

import groundImage from "../assets/images/watermark.jpg";
class Ground extends SimulationObject {
  constructor() {
    super();

    const loader = new THREE.TextureLoader();
    const groundTexture = loader.load(groundImage);

    const groundMaterial = new THREE.MeshLambertMaterial({
      map: groundTexture,
    });
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(25, 25);
    groundTexture.anisotropy = 16;

    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(8000, 8000),
      groundMaterial
    );
    this.mesh.position.y = -0.2;
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
  }
}

export default Ground;
