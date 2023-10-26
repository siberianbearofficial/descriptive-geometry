import {Projection} from "./projection";

export interface PlotObject {
  xy: Array<Projection>;
  xz: Array<Projection>;
  connections: Array<Projection>;
}
