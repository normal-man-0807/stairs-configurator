export interface IBaseParam {
  stair_width: number;
  floor_height: number;
  stair_going: number;
  feature_turn: IThreadMode;
}

export type IDirection = {
  leftTop: boolean;
  leftBottom: boolean;
  rightTop: boolean;
  rightBottom: boolean;
};

export type ISideDirection = {
  left: boolean;
  right: boolean;
};

export type IControl = {
  upper: 0 | 1 | 2;
  lower: 0 | 1 | 2;
  railing: boolean;
};

export type IThreadMode =
  | 'lbs'
  | 'rbs'
  | 'dbs'
  | 'lds'
  | 'rds'
  | 'dds'
  | 'lcs'
  | 'rcs'
  | 'dcs'
  | 'lcbs'
  | 'rcbs'
  | 'dcbs';

export interface IStraightFlightParam extends IBaseParam {
  post: {
    direction: IDirection;
    type: IPostType;
    material: IMaterialType;
  };
  caps: { direction: IDirection; type: ICapType; material: IMaterialType };
  handrails: {
    direction: ISideDirection;
    type: ISPINDLETYPE;
    material: IMaterialType;
    baseMaterial: IMaterialType;
  };
}

export type ISectionQuarterTurnParam = {
  num: number; // stair number
  width: number; // stair width
  caps: {
    type: ICapType;
    material: IMaterialType;
    direction: ISectionItemDirection;
  };
  post: {
    type: IPostType;
    material: IMaterialType;
    direction: ISectionItemDirection;
  };
  handrails: {
    type: ISPINDLETYPE;
    material: IMaterialType;
    baseMaterial: IMaterialType;
    direction: ISectionItemDirection;
  };
};

export type IBoxQuarterTurnParam = {
  tnum: number; // stair count on turn part: 1 | 2 | 3 | 4;
  post: {
    direction: IBoxItemDirection;
  };
  handrails: {
    direction: ISectionItemDirection;
  };
};

export interface IQuarterTurnParam extends IBaseParam {
  direction: IStairDirection;
  section1: ISectionQuarterTurnParam;
  section2: ISectionQuarterTurnParam;
  box: IBoxQuarterTurnParam;
}

export interface IHalfTurnParam extends IBaseParam {
  direction: IStairDirection;
  box1: IBoxQuarterTurnParam;
  box2: IBoxQuarterTurnParam;
  section1: ISectionQuarterTurnParam;
  section2: ISectionQuarterTurnParam;
  section3: ISectionQuarterTurnParam;
}

export type ICapType = 'BALL' | 'PYRAMID';

export type IPostType = 'SQUARE' | 'CHAMFERED' | 'TURNED' | 'BASE';

export type IMaterialType = 'OAK' | 'PINE' | 'RISER';

export type ISPINDLETYPE =
  | 'CHAMFERED'
  | 'EDWARDIAN'
  | 'TWIST'
  | 'FLUTED'
  | 'TULIP'
  | 'VICTORIAN'
  | 'PROVINCIAL';

export type IStairDirection = 'LEFT' | 'RIGHT';

export type ISectionItemDirection = {
  left: boolean;
  right: boolean;
};

export type IBoxItemDirection = {
  bottom: boolean;
  top: boolean;
  corner: boolean;
};
