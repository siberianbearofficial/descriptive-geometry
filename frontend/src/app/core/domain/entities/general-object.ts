import {AngemPoint} from "./angem/angem-point";
import {AngemSegment} from "./angem/angem-segment";
import {AngemCircle} from "./angem/angem-circle";

export interface GeneralObject {
  type: string;
  agObject: AngemPoint | AngemSegment | AngemCircle;
}
