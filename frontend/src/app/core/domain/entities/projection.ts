import {ScreenSegment} from "./screen/screen-segment";
import {ScreenPoint} from "./screen/screen-point";

export interface Projection {
  type: string;
  data: ScreenSegment | ScreenPoint;
}
