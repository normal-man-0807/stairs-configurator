import * as THREE from 'three';
import { IPosition } from '../../@types/position';
import Base from './Base';
import { IMaterialType, IPostType } from '../../@types/params';

const POST_SIZE = 6;

export default class BasePosts extends Base {
  async create_stair_post(
    post_height: number,
    pos: IPosition,
    material_type: IMaterialType,
    postType: IPostType = 'BASE',
    mirror_mode: boolean = false
  ) {
    if (postType === 'SQUARE') {
      post_height = post_height + 72;
      pos.y = pos.y + 36;
    }

    const post_size = POST_SIZE;
    const geometry = new THREE.BoxGeometry(post_size, post_height, post_size);
    // const texture = new THREE.TextureLoader().load(texture_url);
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(0.1, 0.1);
    const tData = this.parent.resource.getTexture(material_type);
    const material = new THREE.MeshPhongMaterial({
      map: tData.texture.clone(),
    });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = pos.x;
    cube.position.y = pos.y;
    cube.position.z = pos.z;
    cube.castShadow = true;
    cube.receiveShadow = true;
    if (mirror_mode) cube.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, -1));
    this.parent.scene?.addObject(cube);

    if (postType != 'SQUARE') {
      const data = this.parent.resource.getModel('POST', postType);
      const obj = data.obj;
      pos.y = pos.y + post_height / 2;
      this.copy_newel(obj.children[0], pos, material, mirror_mode);
    }
  }

  async create_stair_cap_post(
    post_height: number,
    pos: IPosition,
    material_type: IMaterialType,
    cap_type: string,
    mirror_mode: boolean = false
  ) {
    const tData = this.parent.resource.getTexture(material_type);

    const material = new THREE.MeshPhongMaterial({
      map: tData.texture.clone(),
    });

    const data = this.parent.resource.getModel('CAP', cap_type);
    const obj = data.obj;
    this.copy_newel(obj.children[0], pos, material, mirror_mode);
  }
}
