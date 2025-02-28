import * as THREE from 'three';
import { I2Position, ILower, IPosition, IUpper } from '../../@types/position';
import Base from './Base';
import { IControl, IMaterialType } from '../../@types/params';

export default class BaseSides extends Base {
  create_stair_cut_string(
    start: I2Position,
    end: I2Position,
    pos: IPosition,
    rotate: number,
    stair_going: number,
    stair_height: number,
    jumping: number,
    side_info: { lower: ILower; upper: IUpper },
    material_type: IMaterialType,
    last_mode: boolean,
    stair_number: number,
    j: number
  ) {
    const sh = Math.floor(stair_height) - 0.2;

    const tData = this.parent.resource.getTexture(material_type);
    const material = new THREE.MeshPhongMaterial({
      map: tData.texture.clone(),
    });
    const side = new THREE.Shape();
    stair_number = stair_number - jumping;
    side.moveTo(start.x + stair_height, start.y);
    side.bezierCurveTo(start.x, start.y, start.x, start.y, start.x, start.y);
    for (let i = 0; i < stair_number; i++) {
      if (i == stair_number - 1 && last_mode) {
        if (side_info.upper == 1) break;
        let point_x = start.x + i * stair_going + 0.2;
        let point_y = start.y + i * stair_height;
        side.bezierCurveTo(
          point_x,
          point_y + sh,
          point_x,
          point_y + sh,
          point_x,
          point_y + sh
        );
        side.bezierCurveTo(
          point_x + stair_going / 2 - 0.2,
          point_y + sh,
          point_x + stair_going / 2 - 0.2,
          point_y + sh,
          point_x + stair_going / 2 - 0.2,
          point_y + sh
        );
        end.x = end.x - stair_going / 2;
        break;
      }
      let point_x = start.x + i * stair_going + 0.2;
      let point_y = start.y + i * stair_height;
      side.bezierCurveTo(
        point_x,
        point_y + sh,
        point_x,
        point_y + sh,
        point_x,
        point_y + sh
      );
      side.bezierCurveTo(
        point_x + stair_going,
        point_y + sh,
        point_x + stair_going,
        point_y + sh,
        point_x + stair_going,
        point_y + sh
      );
    }
    if (side_info.upper == 1) {
      const point_x = start.x + (stair_number - 1) * stair_going + 0.2 - 2;
      const point_y =
        start.y + (stair_number - 1) * stair_height - stair_height + 2;
      side.bezierCurveTo(point_x, point_y, point_x, point_y, point_x, point_y);
    } else {
      side.bezierCurveTo(
        end.x,
        end.y - stair_height,
        end.x,
        end.y - stair_height,
        end.x,
        end.y - stair_height
      );
      side.bezierCurveTo(
        start.x + stair_height,
        start.y,
        start.x + stair_height,
        start.y,
        start.x + stair_height,
        start.y
      );
    }

    const extrudeSettings = {
      depth: 2,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 1,
      bevelSize: 1,
      bevelThickness: 1,
    };
    const geometry = new THREE.ExtrudeGeometry(side, extrudeSettings);
    const sideMesh = new THREE.Mesh(geometry, material);
    sideMesh.rotation.y = THREE.MathUtils.degToRad(rotate);
    sideMesh.position.x = pos.x;
    sideMesh.position.y = pos.y;
    sideMesh.position.z = pos.z;
    this.parent.scene?.addObject(sideMesh);
  }

  create_direct_stair_string(
    start: I2Position,
    end: I2Position,
    pos: IPosition,
    rotate: number,
    params: {
      stair_height: number;
      stair_going: number;
      material_type: IMaterialType;
    },
    tread_distance: number,
    post_info: { lower: ILower; upper: IUpper },
    j: number
  ) {
    const sh = Math.floor(params.stair_height) + 10;

    const tData = this.parent.resource.getTexture(params.material_type);
    const material = new THREE.MeshPhongMaterial({
      map: tData.texture.clone(),
    });
    const side = new THREE.Shape();

    if (tread_distance > 0 || post_info.lower == 1) {
      //b
      side.moveTo(start.x, start.y);
    } else {
      //a
      side.moveTo(start.x - params.stair_going / 2, start.y);
      //b
      const middle_point = { x: start.x, y: start.y };
      side.bezierCurveTo(
        middle_point.x,
        middle_point.y,
        middle_point.x,
        middle_point.y,
        middle_point.x,
        middle_point.y
      );
    }
    //c
    const middle_point1 = {
      x: end.x - params.stair_going,
      y: end.y - params.stair_height,
    };
    side.bezierCurveTo(
      middle_point1.x,
      middle_point1.y,
      middle_point1.x,
      middle_point1.y,
      middle_point1.x,
      middle_point1.y
    );
    //d
    const middle_point2 = { x: end.x - params.stair_going, y: end.y };
    side.bezierCurveTo(
      middle_point2.x,
      middle_point2.y,
      middle_point2.x,
      middle_point2.y,
      middle_point2.x,
      middle_point2.y
    );

    if (post_info.upper == 0) {
      //e
      const middle_point3 = { x: end.x - params.stair_going / 2, y: end.y };
      side.bezierCurveTo(
        middle_point3.x,
        middle_point3.y,
        middle_point3.x,
        middle_point3.y,
        middle_point3.x,
        middle_point3.y
      );
      //f
      const middle_point4 = {
        x: end.x - params.stair_going / 2,
        y: end.y + 10,
      };
      side.bezierCurveTo(
        middle_point4.x,
        middle_point4.y,
        middle_point4.x,
        middle_point4.y,
        middle_point4.x,
        middle_point4.y
      );
    }
    //g
    const middle_point5 = { x: end.x - params.stair_going, y: end.y + 10 };
    side.bezierCurveTo(
      middle_point5.x,
      middle_point5.y,
      middle_point5.x,
      middle_point5.y,
      middle_point5.x,
      middle_point5.y
    );
    //h
    const middle_point6 = { x: start.x, y: start.y + sh };
    side.bezierCurveTo(
      middle_point6.x,
      middle_point6.y,
      middle_point6.x,
      middle_point6.y,
      middle_point6.x,
      middle_point6.y
    );
    if (tread_distance == 0 && post_info.lower == 0) {
      //i
      const middle_point7 = {
        x: start.x - params.stair_going / 2,
        y: start.y + sh - params.stair_height / 2,
      };
      side.bezierCurveTo(
        middle_point7.x,
        middle_point7.y,
        middle_point7.x,
        middle_point7.y,
        middle_point7.x,
        middle_point7.y
      );
    }

    const extrudeSettings = {
      depth: 4,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 4,
      bevelSize: 1,
      bevelThickness: 1,
    };
    const geometry = new THREE.ExtrudeGeometry(side, extrudeSettings);
    const sideMesh = new THREE.Mesh(geometry, material);
    sideMesh.rotation.y = THREE.MathUtils.degToRad(rotate);
    sideMesh.position.x = pos.x;
    sideMesh.position.y = pos.y;
    sideMesh.position.z = pos.z;
    sideMesh.castShadow = true;
    sideMesh.receiveShadow = true;

    this.parent.scene?.addObject(sideMesh);
  }

  create_end_base_line(
    start: I2Position,
    end: I2Position,
    pos: IPosition,
    rotate: number,
    params: {
      stair_height: number;
      stair_going: number;
      material_type: IMaterialType;
    },
    tread_distance: number,
    post_info: { lower: ILower; upper: IUpper }
  ) {
    const sh = Math.floor(params.stair_height) + 10;
    const shh = 0.1;

    const tData = this.parent.resource.getTexture(params.material_type);
    const material = new THREE.MeshPhongMaterial({
      map: tData.texture.clone(),
    });

    let start_point = { x: start.x, y: start.y };
    const middle_point = {
      x: end.x - params.stair_going,
      y: end.y - params.stair_height + sh,
    };
    let end_point = { x: end.x, y: end.y + sh };

    const side = new THREE.Shape();

    if (tread_distance > 0 || post_info.lower == 1)
      start_point = { x: start.x, y: start.y + sh };
    else
      start_point = {
        x: start.x - params.stair_going / 2,
        y: start.y - params.stair_height / 2 + sh,
      };

    if (post_info.upper > 0)
      end_point = {
        x: end.x - params.stair_going,
        y: end.y - params.stair_going + sh,
      };
    else
      end_point = {
        x: end.x - params.stair_going / 2,
        y: end.y - params.stair_height + sh,
      };

    side.moveTo(start_point.x, start_point.y);
    side.bezierCurveTo(
      middle_point.x,
      middle_point.y,
      middle_point.x,
      middle_point.y,
      middle_point.x,
      middle_point.y
    );
    side.bezierCurveTo(
      end_point.x,
      end_point.y,
      end_point.x,
      end_point.y,
      end_point.x,
      end_point.y
    );
    side.bezierCurveTo(
      end_point.x,
      end_point.y + shh,
      end_point.x,
      end_point.y + shh,
      end_point.x,
      end_point.y + shh
    );
    side.bezierCurveTo(
      middle_point.x,
      middle_point.y + shh,
      middle_point.x,
      middle_point.y + shh,
      middle_point.x,
      middle_point.y + shh
    );
    side.bezierCurveTo(
      start_point.x,
      start_point.y + shh,
      start_point.x,
      start_point.y + shh,
      start_point.x,
      start_point.y + shh
    );
    side.bezierCurveTo(
      start_point.x,
      start_point.y,
      start_point.x,
      start_point.y,
      start_point.x,
      start_point.y
    );

    const extrudeSettings = {
      depth: 3.8,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 4,
      bevelSize: 1,
      bevelThickness: 1,
    };
    const geometry = new THREE.ExtrudeGeometry(side, extrudeSettings);
    const sideMesh = new THREE.Mesh(geometry, material);
    sideMesh.rotation.y = THREE.MathUtils.degToRad(rotate);
    sideMesh.position.x = pos.x;
    sideMesh.position.y = pos.y + shh / 2 + 1.5;
    sideMesh.position.z = pos.z;

    this.parent.scene?.addObject(sideMesh);
  }

  create_base_line(
    start: I2Position,
    end: I2Position,
    pos: IPosition,
    rotate: number,
    params: {
      stair_going: number;
      stair_height: number;
      material_type: IMaterialType;
    },
    tread_distance: number,
    post_info: IControl,
    mirror_mode = false
  ) {
    const sh = Math.floor(params.stair_height) + 10;
    const shh = 0.2;

    const tData = this.parent.resource.getTexture(params.material_type);
    const material = new THREE.MeshPhongMaterial({
      map: tData.texture.clone(),
    });

    let start_point = { x: start.x, y: start.y };
    const end_point = { x: end.x, y: end.y + sh };

    if (tread_distance > 0 || post_info.lower == 1)
      start_point = { x: start.x, y: start.y + sh };
    else
      start_point = {
        x: start.x - params.stair_going / 2,
        y: start.y - params.stair_height / 2 + sh,
      };

    const side = this.createShapes(start_point, [
      { x: end_point.x, y: end_point.y },
      { x: end_point.x, y: end_point.y + shh },
      { x: start_point.x, y: start_point.y + shh },
      { x: start_point.x, y: start_point.y },
    ]);

    const extrudeSettings = {
      depth: 3.8,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 4,
      bevelSize: 1,
      bevelThickness: 1,
    };
    const geometry = new THREE.ExtrudeGeometry(side, extrudeSettings);
    const baseLineMesh = new THREE.Mesh(geometry, material);
    baseLineMesh.rotation.y = THREE.MathUtils.degToRad(rotate);
    baseLineMesh.position.x = pos.x;
    baseLineMesh.position.y = pos.y + shh / 2 + 0.6;
    baseLineMesh.position.z = pos.z;
    if (mirror_mode)
      baseLineMesh.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));
    this.parent.scene?.addObject(baseLineMesh);
  }

  create_stair_string(
    start: I2Position,
    end: I2Position,
    pos: IPosition,
    rotate: number,
    stair_going: number,
    stair_height: number,
    material_type: IMaterialType,
    last_mode: boolean,
    post_info: IControl,
    j: number,
    mirror_mode: boolean = false
  ) {
    const sh = Math.floor(stair_height) + 10;
    const tData = this.parent.resource.getTexture(material_type);
    const material = new THREE.MeshPhongMaterial({
      map: tData.texture.clone(),
    });
    // const side = new THREE.Shape();
    // side.moveTo(start.x, start.y);
    const startPos = { x: start.x, y: start.y };
    const points = [];

    if (last_mode) {
      const middle_point_1 = {
        x: end.x - stair_going,
        y: end.y - stair_height,
      };
      const middle_point_2 = { x: end.x - stair_going, y: end.y };
      points.push(middle_point_1, middle_point_2);
    }

    if (last_mode && post_info.upper == 0) {
      points.push(
        { x: end.x - stair_going, y: end.y - stair_height },
        { x: end.x - stair_going, y: end.y },
        { x: end.x - stair_going / 2, y: end.y },
        { x: end.x - stair_going / 2, y: end.y + 10 },
        { x: end.x - stair_going, y: end.y + 10 },
        { x: start.x, y: start.y + sh }
      );
    } else {
      points.push(
        { x: end.x - stair_going, y: end.y - stair_height },
        {
          x: end.x - stair_going,
          y: end.y - stair_height + sh,
        },
        { x: start.x, y: start.y + sh }
      );
    }

    const side = this.createShapes(startPos, points);

    const extrudeSettings = {
      depth: 4,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 1,
      bevelSize: 1,
      bevelThickness: 1,
    };
    const geometry = new THREE.ExtrudeGeometry(side, extrudeSettings);
    const stringMesh = new THREE.Mesh(geometry, material);
    stringMesh.rotation.y = THREE.MathUtils.degToRad(rotate);
    stringMesh.position.x = pos.x;
    stringMesh.position.y = pos.y;
    stringMesh.position.z = pos.z;
    if (mirror_mode)
      stringMesh.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));
    stringMesh.castShadow = true;
    stringMesh.receiveShadow = true;

    this.parent.scene?.addObject(stringMesh);
  }

  create_normal_stair_string(
    start: I2Position,
    end: I2Position,
    pos: IPosition,
    rotate: number,
    params: {
      stair_going: number;
      stair_height: number;
      material_type: IMaterialType;
    },
    tread_distance: number,
    post_info: IControl,
    j: number,
    is_starter: boolean,
    mirror_mode: boolean = false
  ) {
    const sh = Math.floor(params.stair_height) + 10;
    const tData = this.parent.resource.getTexture(params.material_type);
    const material = new THREE.MeshPhongMaterial({
      map: tData.texture.clone(),
    });

    const startPos =
      tread_distance > 0 || post_info.lower == 1
        ? { x: start.x, y: start.y }
        : is_starter
        ? { x: start.x - params.stair_going / 2, y: start.y }
        : { x: start.x, y: start.y };

    const points: Array<{ x: number; y: number }> = [];

    if (tread_distance > 0 || post_info.lower == 1) {
    } else {
      const middle_point = { x: start.x, y: start.y };
      points.push(middle_point);
    }
    points.push(
      { x: end.x, y: end.y },
      { x: end.x, y: end.y + sh },
      { x: start.x, y: start.y + sh }
    );

    if (tread_distance == 0 && post_info.lower == 0) {
      if (is_starter) {
        const middle_point = {
          x: start.x - params.stair_going / 2,
          y: start.y + sh - params.stair_height / 2,
        };
        points.push(middle_point);
      }
    }

    const side = this.createShapes(startPos, points);

    const extrudeSettings = {
      depth: 4,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 4,
      bevelSize: 1,
      bevelThickness: 1,
    };
    const geometry = new THREE.ExtrudeGeometry(side, extrudeSettings);
    const sideStringMesh = new THREE.Mesh(geometry, material);
    sideStringMesh.rotation.y = THREE.MathUtils.degToRad(rotate);
    sideStringMesh.position.x = pos.x;
    sideStringMesh.position.y = pos.y;
    sideStringMesh.position.z = pos.z;
    if (mirror_mode)
      sideStringMesh.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));
    sideStringMesh.castShadow = true;
    sideStringMesh.receiveShadow = true;

    this.parent.scene?.addObject(sideStringMesh);
  }

  protected createShapes(
    start_point: { x: number; y: number },
    points: Array<{ x: number; y: number }>
  ) {
    const shape = new THREE.Shape();
    shape.moveTo(start_point.x, start_point.y);

    points.forEach((p) => {
      shape.bezierCurveTo(p.x, p.y, p.x, p.y, p.x, p.y);
      // shape.lineTo(p.x, p.y);
    });
    return shape;
  }
}
