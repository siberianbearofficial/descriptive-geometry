import {Projection} from "./projection";

export interface PlotObject {
  type: string;
  xy: Array<Projection>;
  xz: Array<Projection>;
  connections: Array<Projection>;
}
