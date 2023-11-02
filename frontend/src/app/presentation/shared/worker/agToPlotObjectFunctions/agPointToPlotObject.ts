import {AngemPoint} from "../../../../core/domain/entities/angem/angem-point";
import {PlotObject} from "../../../../core/domain/entities/plot-object";
import {ScreenPoint} from "../../../../core/domain/entities/screen/screen-point";
import {ScreenSegment} from "../../../../core/domain/entities/screen/screen-segment";
import {SCREEN_CONNECTION_TYPE, SCREEN_POINT_TYPE} from "../screenTypes";
import {AG_POINT_TYPE} from "../agTypes";
import {agXToScreenX, agYToScreenY, agZToScreenY} from "../coordinates";

export function agPointToPlotObject(agPoint: AngemPoint): PlotObject {
  const pointXy: ScreenPoint = {
    x: agXToScreenX(agPoint.x),
    y: agYToScreenY(agPoint.y)
  };
  const pointXz: ScreenPoint = {
    x: agXToScreenX(agPoint.x),
    y: agZToScreenY(agPoint.z)
  };
  const connection: ScreenSegment = {
    p1: pointXy,
    p2: pointXz
  };

  return {
    type: AG_POINT_TYPE,
    xy: [{
      type: SCREEN_POINT_TYPE,
      data: pointXy
    }],
    xz: [{
      type: SCREEN_POINT_TYPE,
      data: pointXz
    }],
    connections: [{
      type: SCREEN_CONNECTION_TYPE,
      data: connection
    }]
  };
}
