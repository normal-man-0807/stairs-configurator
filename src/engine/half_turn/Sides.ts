import BaseSides from '../base/BaseSides';
import HalfTurn, { ISideHalf } from '../HalfTurn';
import {
  IBoxQuarterTurnParam,
  IControl,
  ISectionQuarterTurnParam,
  IThreadMode,
} from '../../@types/params';

export default class Sides extends BaseSides {
  constructor(parent: HalfTurn) {
    super(parent);

    this.parent = parent;
  }

  draw(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: Record<ISideHalf, IControl>,
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    this.drawSide9(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side9,
      mirror_mode,
      treadMode
    );

    this.drawSide10(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side10,
      mirror_mode,
      treadMode
    );

    this.drawSide11(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side11,
      mirror_mode
    );

    this.drawSide12(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side12,
      mirror_mode
    );

    this.drawSide13(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side13,
      mirror_mode
    );

    this.drawSide14(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side14,
      mirror_mode
    );

    this.drawSide15(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side15,
      mirror_mode
    );

    this.drawSide16(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side16,
      mirror_mode
    );

    this.drawSide17(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side17,
      mirror_mode
    );

    this.drawSide18(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2,
      control.side18,
      mirror_mode
    );
  }

  drawSide9(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    const { stair_height, start_position } = (
      this.parent as HalfTurn
    ).getSide9Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      treadMode
    );
    const tread_distance = this.parent.getTheadDistance(treadMode);

    const start = {
      x: tread_distance.left * stair_going,
      y: tread_distance.left * stair_height,
    };
    const end = {
      x: section1.num * stair_going,
      y: section1.num * stair_height,
    };
    const pos = {
      x: start_position.x,
      y: start_position.y,
      z: start_position.z - section1.width / 2 - 0.5,
    };

    this.create_normal_stair_string(
      start,
      end,
      pos,
      0,
      {
        stair_going,
        stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      tread_distance.right,
      control,
      10,
      true,
      mirror_mode
    );

    pos.z = pos.z + 0.1;

    this.create_base_line(
      start,
      end,
      pos,
      0,
      {
        stair_going: stair_going,
        stair_height: stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      0,
      control,
      mirror_mode
    );
  }

  drawSide10(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    const { stair_height, start_position } = (
      this.parent as HalfTurn
    ).getSide10Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      treadMode
    );
    const tread_distance = this.parent.getTheadDistance(treadMode);

    const start = {
      x: tread_distance.right * stair_going,
      y: tread_distance.right * stair_height,
    };
    const end = {
      x: section1.num * stair_going,
      y: section1.num * stair_height,
    };
    const pos = {
      x: start_position.x,
      y: start_position.y,
      z: start_position.z + section1.width / 2 - 2.5,
    };

    this.create_normal_stair_string(
      start,
      end,
      pos,
      0,
      {
        stair_going,
        stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      tread_distance.right,
      control,
      10,
      true,
      mirror_mode
    );

    pos.z += 0.1;
    this.create_base_line(
      start,
      end,
      pos,
      0,
      {
        stair_going: stair_going,
        stair_height: stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      0,
      control,
      mirror_mode
    );
  }

  drawSide11(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const {
      stair_height,
      tread_distance,
      center,
      start_position,
      this_post_height,
    } = (this.parent as HalfTurn).getSide11Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2
    );
    const end_position = {
      x: center.x + section1.num * stair_going,
      y: center.y + section1.num * stair_height,
      z: center.z,
    };

    const start = { x: 0, y: 0 };
    const end = {
      x: section2.width,
      y:
        box1.tnum === 1
          ? 0
          : box1.tnum === 2
          ? stair_height
          : (box1.tnum * stair_height) / 2,
    };
    const pos = {
      x: end_position.x,
      y: end_position.y,
      z: end_position.z + section1.width / 2 - 2.5,
    };

    this.create_normal_stair_string(
      start,
      end,
      pos,
      0,
      {
        stair_going,
        stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      tread_distance.right,
      control,
      10,
      false,
      mirror_mode
    );

    pos.z += 0.1;
    this.create_base_line(
      start,
      end,
      pos,
      0,
      {
        stair_going: stair_going,
        stair_height: stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      0,
      control,
      mirror_mode
    );
  }

  drawSide12(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const { stair_height, this_position, tread_distance } = (
      this.parent as HalfTurn
    ).getSide12Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2
    );

    const start = { x: 0, y: 0 };
    // const end = { x: section1.width, y: box1.tnum === 1 ? 0 : stair_height };
    const end = {
      x: section2.width,
      y:
        box1.tnum === 1
          ? 0
          : box1.tnum === 2
          ? stair_height
          : (box1.tnum * stair_height) / 2,
    };

    const pos = { x: this_position.x, y: this_position.y, z: this_position.z };
    this.create_normal_stair_string(
      start,
      end,
      pos,
      90,
      {
        stair_going,
        stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      tread_distance.right,
      control,
      10,
      false,
      mirror_mode
    );

    pos.x += 0.1;
    this.create_base_line(
      start,
      end,
      pos,
      90,
      {
        stair_going: stair_going,
        stair_height: stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      0,
      control,
      mirror_mode
    );
  }

  drawSide13(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const { stair_height, this_position, tread_distance } = (
      this.parent as HalfTurn
    ).getSection2Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1
    );

    const start = { x: 0, y: 0 };
    const end = {
      x: stair_going * section2.num,
      y: section2.num * stair_height,
    };
    const pos = {
      x: this_position.x,
      y: this_position.y,
      z: this_position.z - section1.width / 2,
    };

    this.create_normal_stair_string(
      start,
      end,
      pos,
      90,
      {
        stair_going,
        stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      tread_distance.right,
      control,
      10,
      false,
      mirror_mode
    );

    pos.x += 0.1;
    this.create_base_line(
      start,
      end,
      pos,
      90,
      {
        stair_going: stair_going,
        stair_height: stair_height,
        material_type: section2.handrails.baseMaterial,
      },
      0,
      control,
      mirror_mode
    );
  }

  drawSide14(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const { stair_height, this_position, tread_distance } = (
      this.parent as HalfTurn
    ).getSection2Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1
    );
    this_position.x = this_position.x - section2.width;

    const start = { x: 0, y: 0 };
    const end = {
      x: stair_going * section2.num,
      y: section2.num * stair_height,
    };
    const pos = {
      x: this_position.x,
      y: this_position.y,
      z: this_position.z - section1.width / 2,
    };

    this.create_normal_stair_string(
      start,
      end,
      pos,
      90,
      {
        stair_going,
        stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      tread_distance.right,
      control,
      10,
      false,
      mirror_mode
    );

    pos.x += 0.1;
    this.create_base_line(
      start,
      end,
      pos,
      90,
      {
        stair_going: stair_going,
        stair_height: stair_height,
        material_type: section2.handrails.baseMaterial,
      },
      0,
      control,
      mirror_mode
    );
  }

  drawSide15(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const { stair_height, tread_distance, end_position } = (
      this.parent as HalfTurn
    ).getSide15Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2
    );

    const start = { x: 0, y: 0 };
    const end = {
      x: section3.width,
      y:
        box2.tnum === 0
          ? 0
          : box2.tnum === 1
          ? 0
          : box2.tnum === 2
          ? stair_height
          : box2.tnum === 3
          ? 1.5 * stair_height
          : 2 * stair_height,
    };

    const pos = {
      x: end_position.x + section2.width / 2 - 2.5,
      y:
        box2.tnum === 0 && section2.num === 0
          ? end_position.y - stair_height
          : end_position.y,
      z: end_position.z,
    };

    this.create_normal_stair_string(
      start,
      end,
      pos,
      90,
      {
        stair_going,
        stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      0,
      control,
      10,
      false,
      mirror_mode
    );
    pos.x += 0.1;
    this.create_base_line(
      start,
      end,
      pos,
      90,
      {
        stair_going: stair_going,
        stair_height: stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      0,
      control,
      mirror_mode
    );
  }

  drawSide16(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const { stair_height, tread_distance, this_position } = (
      this.parent as HalfTurn
    ).getSide16Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2
    );

    const start = {
      x: 0,
      y:
        box2.tnum === 0
          ? 0
          : box2.tnum === 1
          ? 0
          : box2.tnum === 2
          ? stair_height
          : box2.tnum === 3
          ? 1.5 * stair_height
          : 2 * stair_height,
    };
    const end = {
      x: section2.width,
      y: 0,
    };

    const pos = {
      x: this_position.x,
      y:
        box2.tnum === 0
          ? section2.num != 0
            ? this_position.y - stair_height
            : this_position.y - stair_height * 2
          : box2.tnum === 1
          ? this_position.y - stair_height
          : box2.tnum === 2
          ? this_position.y
          : box2.tnum === 3
          ? this_position.y + 0.5 * stair_height
          : this_position.y + stair_height,
      z: this_position.z,
    };

    this.create_normal_stair_string(
      start,
      end,
      pos,
      0,
      {
        stair_going,
        stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      0,
      control,
      10,
      false,
      mirror_mode
    );

    pos.z += 0.1;

    this.create_base_line(
      start,
      end,
      pos,
      0,
      {
        stair_going: stair_going,
        stair_height: stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      0,
      control,
      mirror_mode
    );
  }

  drawSide17(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const lastMode = true;
    const { stair_height, this_position } = (
      this.parent as HalfTurn
    ).getSection3Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2
    );

    const start = { x: 0, y: 0 };
    const end = {
      x: stair_going * section3.num,
      y: section3.num * stair_height,
    };
    const pos = {
      x: this_position.x + 1,
      y: this_position.y,
      z: this_position.z - section3.width / 2 + 2,
    };

    this.create_stair_string(
      start,
      end,
      pos,
      180,
      stair_going,
      stair_height,
      section3.handrails.baseMaterial,
      lastMode,
      control,
      8,
      mirror_mode
    );
    pos.z += 0.1;
    end.y -= stair_height;
    end.x -= stair_going;
    this.create_base_line(
      start,
      end,
      pos,
      180,
      {
        stair_going: stair_going,
        stair_height: stair_height,
        material_type: section1.handrails.baseMaterial,
      },
      0,
      control,
      mirror_mode
    );
  }

  drawSide18(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    section3: ISectionQuarterTurnParam,
    box1: IBoxQuarterTurnParam,
    box2: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const lastMode = true;
    const { stair_height, this_position } = (
      this.parent as HalfTurn
    ).getSection3Info(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      section3,
      box1,
      box2
    );
    const start = { x: 0, y: 0 };
    const end = {
      x: stair_going * section3.num,
      y: section3.num * stair_height,
    };
    const pos = {
      x: this_position.x + 1,
      y: this_position.y,
      z: this_position.z + section3.width / 2 + 2,
    };

    this.create_stair_string(
      start,
      end,
      pos,
      180,
      stair_going,
      stair_height,
      section3.handrails.baseMaterial,
      lastMode,
      control,
      8,
      mirror_mode
    );
    pos.z += 0.1;
    end.y -= stair_height;
    end.x -= stair_going;

    this.create_base_line(
      start,
      end,
      pos,
      180,
      {
        stair_going: stair_going,
        stair_height: stair_height,
        material_type: section3.handrails.baseMaterial,
      },
      0,
      control,
      mirror_mode
    );
  }
}
