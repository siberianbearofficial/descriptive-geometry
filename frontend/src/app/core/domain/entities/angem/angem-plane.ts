import {AngemVector} from "./angem-vector";
import {AngemPoint} from "./angem-point";

export interface AngemPlane {
  normal: AngemVector;
  point: AngemPoint;
}
