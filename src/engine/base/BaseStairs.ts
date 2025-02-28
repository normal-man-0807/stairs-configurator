import * as THREE from 'three';
import Base from './Base';

export default class BaseStairs extends Base {
  createShape(
    points: Array<{ x: number; y: number }>,
    startPos: { x: number; y: number } = { x: -1, y: 0 }
  ) {
    const shape = new THREE.Shape();
    shape.moveTo(startPos.x, startPos.y);
    points.forEach((p) => {
      shape.bezierCurveTo(p.x, p.y, p.x, p.y, p.x, p.y);
    });
    return shape;
  }

  createExtrudeGeometry(shape: THREE.Shape, depth: number) {
    const extrudeSettings = {
      depth: depth,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 1,
      bevelSize: 1,
      bevelThickness: 1,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }

  createRaise(
    geometry: THREE.BufferGeometry,
    position: THREE.Vector3,
    mirror_mode: boolean,
    rotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  ) {
    const tData = this.parent.resource.getTexture('RISER');
    const materialRaiser = new THREE.MeshPhongMaterial({
      map: tData.texture.clone(),
    });

    const meshRiser = new THREE.Mesh(geometry, materialRaiser);
    meshRiser.position.copy(position);
    meshRiser.rotation.setFromVector3(rotation);
    meshRiser.castShadow = true;
    meshRiser.receiveShadow = true;
    if (mirror_mode)
      meshRiser.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));
    return meshRiser;
  }

  createTread(
    geometry: THREE.BufferGeometry,
    position: THREE.Vector3,
    mirror_mode: boolean,
    rotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  ) {
    const tData = this.parent.resource.getTexture('RISER');
    const materialTread = new THREE.MeshPhongMaterial({
      map: tData.texture.clone(),
    });
    const meshTread = new THREE.Mesh(geometry, materialTread);
    meshTread.position.copy(position);
    meshTread.rotation.setFromVector3(rotation);
    meshTread.castShadow = true;
    meshTread.receiveShadow = true;
    if (mirror_mode)
      meshTread.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));
    return meshTread;
  }

  create_tread_stair(
    tread_mode:
      | 'lbs'
      | 'rbs'
      | 'dbs'
      | 'lds'
      | 'rds'
      | 'dds'
      | 'lcs'
      | 'rcs'
      | 'dcs',
    pos: { x: number; y: number; z: number },
    stair_width: number,
    stair_going: number,
    stair_height: number,
    mirror_mode: boolean
  ) {
    let floor_shape: THREE.Shape;
    let h_shape: THREE.Shape;

    const hw = 1;
    const ds = stair_going / 2;

    switch (tread_mode) {
      case 'lbs':
        floor_shape = this.createCurveShape(
          [
            [stair_width, 0, stair_width, 0, stair_width, 0],
            [
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [
              stair_going,
              -stair_going,
              stair_going,
              -stair_going,
              stair_going,
              -stair_going,
            ],
            [0, -stair_going, 0, 0, 0, 0],
          ],
          [0, 0]
        );
        h_shape = this.createCurveShape(
          [
            [
              0,
              -stair_going,
              stair_going,
              -stair_going,
              stair_going,
              -stair_going,
            ],
            [
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [
              stair_width,
              -stair_going + hw,
              stair_width,
              -stair_going + hw,
              stair_width,
              -stair_going + hw,
            ],
            [
              stair_going,
              -stair_going + hw,
              stair_going,
              -stair_going + hw,
              stair_going,
              -stair_going + hw,
            ],
            [0, 0, 0, 0, 0, 0],
          ],
          [0, 0]
        );
        break;
      case 'rbs':
        floor_shape = this.createCurveShape(
          [
            [stair_width, 0, stair_width, 0, stair_width, 0],
            [
              stair_width,
              -stair_going,
              stair_width - stair_going,
              -stair_going,
              stair_width - stair_going,
              -stair_going,
            ],
            [0, -stair_going, 0, -stair_going, 0, -stair_going],
            [0, -stair_going, 0, 0, 0, 0],
          ],
          [0, 0]
        );

        h_shape = this.createCurveShape(
          [
            [
              stair_width,
              -stair_going,
              stair_width - stair_going,
              -stair_going,
              stair_width - stair_going,
              -stair_going,
            ],
            [0, -stair_going, 0, -stair_going, 0, -stair_going],
            [0, -stair_going - hw, 0, -stair_going - hw, 0, -stair_going - hw],
            [
              stair_width - stair_going,
              -stair_going - hw,
              stair_width - stair_going,
              -stair_going - hw,
              stair_width - stair_going,
              -stair_going - hw,
            ],
            [stair_width - hw, 0, stair_width - hw, 0, stair_width - hw, 0],
            [stair_width, 0, stair_width, 0, stair_width, 0],
          ],
          [stair_width, 0]
        );

        break;
      case 'dbs':
        floor_shape = this.createCurveShape(
          [
            [stair_width, 0, stair_width, 0, stair_width, 0],
            [
              stair_width,
              -stair_going,
              stair_width - stair_going,
              -stair_going,
              stair_width - stair_going,
              -stair_going,
            ],
            [
              stair_going,
              -stair_going,
              stair_going,
              -stair_going,
              stair_going,
              -stair_going,
            ],
            [0, -stair_going, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          [0, 0]
        );

        h_shape = this.createCurveShape(
          [
            [
              0,
              -stair_going,
              stair_going,
              -stair_going,
              stair_going,
              -stair_going,
            ],
            [
              stair_width - stair_going,
              -stair_going,
              stair_width - stair_going,
              -stair_going,
              stair_width - stair_going,
              -stair_going,
            ],
            [stair_width, -stair_going, stair_width, 0, stair_width, 0],
            [stair_width - hw, 0, stair_width - hw, 0, stair_width - hw, 0],
            [
              stair_width - stair_going,
              -stair_going + hw,
              stair_width - stair_going,
              -stair_going + hw,
              stair_width - stair_going,
              -stair_going + hw,
            ],
            [
              stair_going,
              -stair_going + hw,
              stair_going,
              -stair_going + hw,
              stair_going,
              -stair_going + hw,
            ],
          ],
          [0, 0]
        );
        break;
      case 'lds':
        floor_shape = this.createCurveShape(
          [
            [-ds, 0, -ds, -stair_going, 0, -stair_going],
            [
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [stair_width, 0, stair_width, 0, stair_width, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          [0, 0]
        );

        h_shape = this.createCurveShape(
          [
            [-ds, 0, -ds, -stair_going, 0, -stair_going],
            [
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [
              stair_width,
              -stair_going + hw,
              stair_width,
              -stair_going + hw,
              stair_width,
              -stair_going + hw,
            ],
            [
              hw,
              -stair_going + hw,
              hw,
              -stair_going + hw,
              hw,
              -stair_going + hw,
            ],
            [-ds + hw, -stair_going + hw, -ds + hw, hw, hw, hw],
            [0, 0, 0, 0, 0, 0],
          ],
          [0, 0]
        );
        break;
      case 'rds':
        floor_shape = this.createCurveShape(
          [
            [
              stair_width + ds,
              0,
              stair_width + ds,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [0, -stair_going, 0, -stair_going, 0, -stair_going],
            [0, 0, 0, 0, 0, 0],
          ],
          [stair_width, 0]
        );

        h_shape = this.createCurveShape(
          [
            [
              stair_width + ds,
              0,
              stair_width + ds,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [0, -stair_going, 0, -stair_going, 0, -stair_going],
            [0, -stair_going + hw, 0, -stair_going + hw, 0, -stair_going + hw],
            [
              stair_width,
              -stair_going + hw,
              stair_width,
              -stair_going + hw,
              stair_width,
              -stair_going + hw,
            ],
            [
              stair_width + ds - hw,
              -stair_going,
              stair_width + ds - hw,
              -hw,
              stair_width,
              -hw,
            ],
            [stair_width, 0, stair_width, 0, stair_width, 0],
          ],
          [stair_width, 0]
        );
        break;
      case 'dds':
        floor_shape = this.createCurveShape(
          [
            [-ds, 0, -ds, -stair_going, 0, -stair_going],
            [
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [
              stair_width + ds,
              -stair_going,
              stair_width + ds,
              0,
              stair_width,
              0,
            ],
            [0, 0, 0, 0, 0, 0],
          ],
          [0, 0]
        );

        h_shape = this.createCurveShape(
          [
            [-ds, 0, -ds, -stair_going, 0, -stair_going],
            [
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [
              stair_width + ds,
              -stair_going,
              stair_width + ds,
              0,
              stair_width,
              0,
            ],
            [stair_width - hw, 0, stair_width - hw, 0, stair_width - hw, 0],
            [
              stair_width - hw + ds,
              0,
              stair_width - hw + ds,
              -stair_going + hw,
              stair_width - hw,
              -stair_going + hw,
            ],
            [
              hw,
              -stair_going + hw,
              hw,
              -stair_going + hw,
              hw,
              -stair_going + hw,
            ],
            [hw - ds, -stair_going + hw, hw - ds, hw, hw, hw],
            [0, 0, 0, 0, 0, 0],
          ],
          [0, 0]
        );
        break;
      case 'lcs':
        floor_shape = this.createCurveShape(
          [
            [0, stair_going, 0, stair_going, 0, stair_going],
            [
              -stair_going,
              stair_going,
              -stair_going,
              -stair_going,
              0,
              -stair_going,
            ],
            [
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [stair_width, 0, stair_width, 0, stair_width, 0],
            [stair_going, 0, stair_going, 0, stair_going, 0],
          ],
          [stair_going, 0]
        );

        h_shape = this.createCurveShape(
          [
            [
              -stair_going,
              stair_going,
              -stair_going,
              -stair_going,
              0,
              -stair_going,
            ],
            [
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [
              stair_width - hw,
              -stair_going + hw,
              stair_width - hw,
              -stair_going + hw,
              stair_width - hw,
              -stair_going + hw,
            ],
            [
              hw,
              -stair_going + hw,
              hw,
              -stair_going + hw,
              hw,
              -stair_going + hw,
            ],
            [
              -stair_going + hw,
              -stair_going + hw,
              -stair_going + hw,
              stair_going + hw,
              hw,
              stair_going + hw,
            ],
            [0, stair_going, 0, stair_going, 0, stair_going],
          ],
          [0, stair_going]
        );
        break;
      case 'rcs':
        floor_shape = this.createCurveShape(
          [
            [0, -stair_going, 0, -stair_going, 0, -stair_going],
            [
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [
              stair_width + stair_going,
              -stair_going,
              stair_width + stair_going,
              stair_going,
              stair_width,
              stair_going,
            ],
            [
              stair_width - stair_going,
              0,
              stair_width - stair_going,
              0,
              stair_width - stair_going,
              0,
            ],
            [0, 0, 0, 0, 0, 0],
          ],
          [0, 0]
        );

        h_shape = this.createCurveShape(
          [
            [
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [
              stair_width + stair_going,
              -stair_going,
              stair_width + stair_going,
              stair_going,
              stair_width,
              stair_going,
            ],
            [
              stair_width - hw,
              stair_going,
              stair_width - hw,
              stair_going,
              stair_width - hw,
              stair_going,
            ],
            [
              stair_width - hw + stair_going,
              stair_going - hw,
              stair_width - hw + stair_going,
              -stair_going + hw,
              stair_width - hw,
              -stair_going + hw,
            ],
            [0, -stair_going + hw, 0, -stair_going + hw, 0, -stair_going + hw],
            [0, -stair_going, 0, -stair_going, 0, -stair_going],
          ],
          [0, -stair_going]
        );
        break;
      case 'dcs':
        floor_shape = this.createCurveShape(
          [
            [0, stair_going, 0, stair_going, 0, stair_going],
            [
              -stair_going,
              stair_going,
              -stair_going,
              -stair_going,
              0,
              -stair_going,
            ],
            [
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [
              stair_width + stair_going,
              -stair_going,
              stair_width + stair_going,
              stair_going,
              stair_width,
              stair_going,
            ],
            [
              stair_width - stair_going,
              0,
              stair_width - stair_going,
              0,
              stair_width - stair_going,
              0,
            ],
            [stair_going, 0, stair_going, 0, stair_going, 0],
          ],
          [stair_going, 0]
        );

        h_shape = this.createCurveShape(
          [
            [
              -stair_going,
              stair_going,
              -stair_going,
              -stair_going,
              0,
              -stair_going,
            ],
            [
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
              stair_width,
              -stair_going,
            ],
            [
              stair_width + stair_going,
              -stair_going,
              stair_width + stair_going,
              stair_going,
              stair_width,
              stair_going,
            ],
            [
              stair_width - hw,
              stair_going,
              stair_width - hw,
              stair_going,
              stair_width - hw,
              stair_going,
            ],
            [
              stair_width - hw + stair_going,
              stair_going - hw,
              stair_width - hw + stair_going,
              -stair_going + hw,
              stair_width - hw,
              -stair_going + hw,
            ],
            [
              hw,
              -stair_going + hw,
              hw,
              -stair_going + hw,
              hw,
              -stair_going + hw,
            ],
            [
              -stair_going + hw,
              -stair_going + hw,
              -stair_going + hw,
              stair_going + hw,
              hw,
              stair_going + hw,
            ],
            [0, stair_going, 0, stair_going, 0, stair_going],
          ],
          [0, stair_going]
        );
        break;
    }

    const tData = this.parent.resource.getTexture('RISER');
    const materialRaiser = new THREE.MeshPhongMaterial({
      map: tData.texture.clone(),
    });

    const extrudeSettings = {
      depth: 2,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 1,
      bevelSize: 1,
      bevelThickness: 1,
    };
    const geometry = new THREE.ExtrudeGeometry(floor_shape, extrudeSettings);
    const mesh = new THREE.Mesh(geometry, materialRaiser);
    mesh.rotation.x = THREE.MathUtils.degToRad(-90);
    mesh.rotation.z = THREE.MathUtils.degToRad(-90);
    mesh.position.x = pos.x + stair_going - 0.5;
    mesh.position.y = pos.y + stair_height;
    mesh.position.z = pos.z - stair_width / 2;
    if (mirror_mode) mesh.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.parent?.scene?.addObject(mesh);

    const extrude2Settings = {
      depth: stair_height,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 1,
      bevelSize: 1,
      bevelThickness: 1,
    };
    const geometry2 = new THREE.ExtrudeGeometry(h_shape, extrude2Settings);
    const mesh2 = new THREE.Mesh(geometry2, materialRaiser);
    mesh2.rotation.x = THREE.MathUtils.degToRad(-90);
    mesh2.rotation.z = THREE.MathUtils.degToRad(-90);
    mesh2.position.x = pos.x + stair_going;
    mesh2.position.y = pos.y;
    mesh2.position.z = pos.z - stair_width / 2;
    if (mirror_mode) mesh.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));
    mesh2.castShadow = true;
    mesh2.receiveShadow = true;
    this.parent?.scene?.addObject(mesh2);
  }

  private createCurveShape(
    points: Array<Array<number>>,
    startPos: Array<number>
  ) {
    const shape = new THREE.Shape();
    shape.moveTo(startPos[0], startPos[1]);
    points.forEach((p) => {
      shape.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
    });
    return shape;
  }
}
