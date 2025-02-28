import BaseSides from '../base/BaseSides';
import QuarterTurn from '../QuarterTurn';
import {
  IBoxQuarterTurnParam,
  IControl,
  ISectionQuarterTurnParam,
  IThreadMode,
} from '../../@types/params';

export default class Sides extends BaseSides {
  constructor(parent: QuarterTurn) {
    super(parent);

    this.parent = parent;
  }

  draw(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    controls: Record<string, IControl>,
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    this.drawSide3(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      controls['side3'],
      mirror_mode,
      treadMode
    );
    this.drawSide4(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      controls['side4'],
      mirror_mode,
      treadMode
    );
    this.drawSide5(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      controls['side5'],
      mirror_mode
    );
    this.drawSide6(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      controls['side6'],
      mirror_mode
    );
    this.drawSide7(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      controls['side7'],
      mirror_mode
    );
    this.drawSide8(
      stair_width,
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      controls['side8'],
      mirror_mode
    );
  }

  drawSide3(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    const stair_height = 20;
    const stair_number = 13;
    const side_number = 3;
    const tread_distance = this.parent.getTheadDistance(treadMode);
    const lastMode = true; // This is for checking lastest Side on top

    const center = (this.parent as QuarterTurn).getCenterPoint();
    const start_position = { x: center.x, y: center.y, z: center.z };

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

    if (section1.num != 0) {
      // test case 1
      // pos.z = pos.z + 1.1;
      // this.create_normal_stair_cut_string(
      //   start,
      //   end,
      //   pos,
      //   0,
      //   param.stair_going,
      //   param.stair_height,
      //   tread_distance.left,
      //   side_info_3,
      //   param.side_material,
      //   param.q1_num,
      //   side_number
      // );

      // test case 2
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
        tread_distance.left,
        control,
        side_number,
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
          stair_going,
          stair_height,
          material_type: section1.handrails.baseMaterial,
        },
        tread_distance.left,
        control,
        mirror_mode
      );
    }
  }

  drawSide4(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean,
    treadMode: IThreadMode
  ) {
    const stair_height = 20;
    const side_number = 4;
    const tread_distance = this.parent.getTheadDistance(treadMode);
    const center = (this.parent as QuarterTurn).getCenterPoint();
    const start_position = { x: center.x, y: center.y, z: center.z };

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
    if (section1.num != 0) {
      // test case 2
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
        side_number,
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
          stair_going,
          stair_height,
          material_type: section1.handrails.baseMaterial,
        },
        tread_distance.right,
        control,
        mirror_mode
      );
    }
  }

  // turn number is 3.
  drawSide5(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const stair_height = 20;
    const side_number = 5;
    const start = { x: 0, y: 0 };
    const end = {
      x: section2.width,
      y: (box.tnum * stair_height) / 2,
    };

    let center = this.parent.getCenterPoint();
    const start_position = { x: center.x, y: center.y, z: center.z };

    let end_position = { x: 0, y: 0, z: 0 };
    end_position.x = center.x + section1.num * stair_going;
    end_position.y = center.y + (section1.num + 2) * stair_height;
    end_position.z = center.z;

    const pos = {
      x: end_position.x,
      y: start_position.y + section1.num * stair_height,
      z: end_position.z + section1.width / 2 - 2.5,
    };

    // if(param.construction=="cut" && (param.cut_side=="right" || param.cut_side=="both")) {
    //   pos.z = pos.z - 0.1;
    //   create_normal_stair_cut_string(start,end,pos,0,param.q2_width,param.stair_height,0,
    //     side_info_5,param.side_material,1,side_number);
    // }
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
      side_number,
      false,
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

  // turn number is 3.
  drawSide6(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const stair_height = 20;
    const { this_position } = (
      this.parent as QuarterTurn
    ).getStartEndPointsForSide6(
      floor_height,
      stair_going,
      section1,
      section2,
      box,
      control
    );

    const side_number = 6;
    const start = { x: 0, y: 0 };
    const end = {
      x: section1.width,
      y: (box.tnum * stair_height) / 2,
    };
    const pos = { x: this_position.x, y: this_position.y, z: this_position.z };

    this.create_normal_stair_string(
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
      side_number,
      false,
      mirror_mode
    );
    pos.x = pos.x + 0.1;
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

  drawSide7(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const stair_height = 20;
    const stair_number = 13;
    const lastMode = true; // This is for checking lastest Side on top

    const center = (this.parent as QuarterTurn).getCenterPoint();
    const start_position = { x: center.x, y: center.y, z: center.z };

    const this_position = {
      x: start_position.x + section1.num * stair_going + section2.width - 1.5,
      y:
        start_position.y +
        section1.num * stair_height +
        box.tnum * stair_height,
      z: start_position.z,
    };

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

    // test case 2
    pos.z = pos.z + 0;
    this.create_stair_string(
      start,
      end,
      pos,
      90,
      stair_going,
      stair_height,
      section1.handrails.baseMaterial,
      lastMode,
      control,
      8,
      mirror_mode
    );
    pos.x = pos.x + 0.1;
    const new_end = end;
    new_end.x = new_end.x - stair_going;
    new_end.y = new_end.y - stair_height;
    this.create_base_line(
      start,
      new_end,
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

  drawSide8(
    stair_width: number,
    floor_height: number,
    stair_going: number,
    section1: ISectionQuarterTurnParam,
    section2: ISectionQuarterTurnParam,
    box: IBoxQuarterTurnParam,
    control: IControl,
    mirror_mode: boolean
  ) {
    const stair_height = 20;
    const side_info_8 = 0;
    const center = (this.parent as QuarterTurn).getCenterPoint();
    const lastMode = true; // This is for checking lastest Side on top

    const start_position = { x: center.x, y: center.y, z: center.z };

    const this_position = {
      x: start_position.x + section1.num * stair_going - 1,
      y:
        start_position.y +
        section1.num * stair_height +
        box.tnum * stair_height,
      z: start_position.z,
    };

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

    // test case 1
    // pos.z = pos.z + 0;
    // pos.x = pos.x - 1;
    // this.create_stair_cut_string(
    //   start,
    //   end,
    //   pos,
    //   90,
    //   stair_going,
    //   stair_height,
    //   0,
    //   {
    //     lower: 0,
    //     upper: 0,
    //   },
    //   newel_material,
    //   true,
    //   section2.num,
    //   2
    // );

    // test case 2
    pos.z = pos.z + 0;
    this.create_stair_string(
      start,
      end,
      pos,
      90,
      stair_going,
      stair_height,
      section1.handrails.baseMaterial,
      lastMode,
      control,
      8,
      mirror_mode
    );

    pos.x = pos.x + 0.1;
    const new_end = end;
    new_end.x = new_end.x - stair_going;
    new_end.y = new_end.y - stair_height;
    this.create_base_line(
      start,
      new_end,
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
}
