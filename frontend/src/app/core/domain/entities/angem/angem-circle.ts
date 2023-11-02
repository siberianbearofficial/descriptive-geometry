import {AngemPoint} from "./angem-point";
import {AngemVector} from "./angem-vector";

export interface AngemCircle {
  center: AngemPoint;
  radius: number;
  normal: AngemVector;
}
