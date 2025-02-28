import EventEmitter from 'events';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

import ball from './assets/models/ball.obj';
import chamfered from './assets/models/chamfered.obj';
import crown_handrail from './assets/models/crown_handrail.obj';
import hdr_handrail from './assets/models/hdr_handrail.obj';
import hole from './assets/models/hole.obj';
import pyramid from './assets/models/pyramid.obj';
import spindle_chamfered from './assets/models/spindle_chamfered.obj';
import spindle_edwardian from './assets/models/spindle_edwardian.obj';
import spindle_fluted from './assets/models/spindle_fluted.obj';
import spindle_provincial from './assets/models/spindle_provincial.obj';
import spindle_tulip from './assets/models/spindle_tulip.obj';
import spindle_twist from './assets/models/spindle_twist.obj';
import spindle_victorian from './assets/models/spindle_victorian.obj';
import turning from './assets/models/turning.obj';
import {
  ICapType,
  IMaterialType,
  IPostType,
  ISPINDLETYPE,
} from './@types/params';

// TEXTURES
import OakImage from './assets/material/Oak.jpg';
import PineImage from './assets/material/Pine.jpg';
import riser_material from './assets/material/riser_material.jpg';

export type IMediaType = 'MODEL' | 'TEXTURE';
export type IResourceType = 'CAP' | 'POST' | 'SPINDLE';

const fileLists: Array<{
  type: IMediaType;
  url: string;
  resource: IResourceType;
  name: ICapType | IPostType | ISPINDLETYPE;
}> = [
  {
    type: 'MODEL',
    url: ball,
    resource: 'CAP',
    name: 'BALL',
  },
  {
    type: 'MODEL',
    url: pyramid,
    resource: 'CAP',
    name: 'PYRAMID',
  },
  {
    type: 'MODEL',
    url: turning,
    resource: 'POST',
    name: 'TURNED',
  },
  {
    type: 'MODEL',
    url: chamfered,
    resource: 'POST',
    name: 'CHAMFERED',
  },
  {
    type: 'MODEL',
    url: hole,
    resource: 'POST',
    name: 'BASE',
  },
  {
    type: 'MODEL',
    url: crown_handrail,
    resource: 'CAP',
    name: 'PYRAMID',
  },
  {
    type: 'MODEL',
    url: hdr_handrail,
    resource: 'CAP',
    name: 'PYRAMID',
  },

  {
    type: 'MODEL',
    url: spindle_chamfered,
    resource: 'SPINDLE',
    name: 'CHAMFERED',
  },
  {
    type: 'MODEL',
    url: spindle_edwardian,
    resource: 'SPINDLE',
    name: 'EDWARDIAN',
  },
  {
    type: 'MODEL',
    url: spindle_fluted,
    resource: 'SPINDLE',
    name: 'FLUTED',
  },
  {
    type: 'MODEL',
    url: spindle_provincial,
    resource: 'SPINDLE',
    name: 'PROVINCIAL',
  },
  {
    type: 'MODEL',
    url: spindle_tulip,
    resource: 'SPINDLE',
    name: 'TULIP',
  },
  {
    type: 'MODEL',
    url: spindle_twist,
    resource: 'SPINDLE',
    name: 'TWIST',
  },
  {
    type: 'MODEL',
    url: spindle_victorian,
    resource: 'SPINDLE',
    name: 'VICTORIAN',
  },
];

const textures = [
  {
    type: 'TEXTURE',
    url: OakImage,
    name: 'OAK',
  },
  {
    type: 'TEXTURE',
    url: PineImage,
    name: 'PINE',
  },
  {
    type: 'TEXTURE',
    url: riser_material,
    name: 'RISER',
  },
];

export default class Assets extends EventEmitter {
  modelList: Array<{
    type: IMediaType;
    url: string;
    resource: IResourceType;
    name: ICapType;
    obj: THREE.Object3D;
  }> = [];

  textureList: Array<{
    type: IMediaType;
    url: string;
    name: IMaterialType;
    texture: THREE.Texture;
  }> = [];

  constructor() {
    super();

    (async () => {
      console.log('start');
      await this.loadModels();
      console.log('loadModels');
      await this.loadTextures();
      console.log('loadTextures');
      this.emit('loaded');
    })();
  }

  async loadModels() {
    const modelList = (await Promise.all(
      fileLists.map(
        (f) =>
          new Promise((resolve, reject) => {
            const loader = new OBJLoader();
            // const obj = await loader.loadAsync(crown_handrail);
            loader.load(f.url, (obj) => {
              resolve({ ...f, obj });
            });
          })
      )
    )) as Array<{
      type: IMediaType;
      url: string;
      resource: IResourceType;
      name: ICapType;
      obj: THREE.Object3D;
    }>;

    // console.log(modelList);
    this.modelList = modelList;
  }

  async loadTextures() {
    const textureList = (await Promise.all(
      textures.map(
        (f) =>
          new Promise((resolve, reject) => {
            const loader = new THREE.TextureLoader();
            loader.load(f.url, (texture) => {
              texture.wrapS = THREE.RepeatWrapping;
              texture.wrapT = THREE.RepeatWrapping;
              texture.repeat.set(0.1, 0.1);
              resolve({ ...f, texture });
            });
          })
      )
    )) as Array<{
      type: IMediaType;
      url: string;
      name: IMaterialType;
      texture: THREE.Texture;
    }>;
    this.textureList = textureList;
  }

  getModel(type: IResourceType, name: string) {
    const i = this.modelList.findIndex(
      (m) => m.resource === type && m.name === name
    );

    return this.modelList[i];
  }

  getTexture(name: IMaterialType) {
    const i = this.textureList.findIndex((m) => m.name === name);
    return this.textureList[i];
  }
}
