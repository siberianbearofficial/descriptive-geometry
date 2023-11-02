import {AngemSegment} from "../../../../core/domain/entities/angem/angem-segment";
import {PlotObject} from "../../../../core/domain/entities/plot-object";
import {ScreenPoint} from "../../../../core/domain/entities/screen/screen-point";
import {ScreenSegment} from "../../../../core/domain/entities/screen/screen-segment";
import {AG_SEGMENT_TYPE} from "../agTypes";
import {SCREEN_CONNECTION_TYPE, SCREEN_POINT_TYPE, SCREEN_SEGMENT_TYPE} from "../screenTypes";
import {agXToScreenX, agYToScreenY, agZToScreenY} from "../coordinates";

export function agSegmentToPlotObject(agSegment: AngemSegment): PlotObject {
  const point1Xy: ScreenPoint = {
    x: agXToScreenX(agSegment.p1.x),
    y: agYToScreenY(agSegment.p1.y)
  };
  const point1Xz: ScreenPoint = {
    x: agXToScreenX(agSegment.p1.x),
    y: agZToScreenY(agSegment.p1.z)
  };
  const point2Xy: ScreenPoint = {
    x: agXToScreenX(agSegment.p2.x),
    y: agYToScreenY(agSegment.p2.y)
  };
  const point2Xz: ScreenPoint = {
    x: agXToScreenX(agSegment.p2.x),
    y: agZToScreenY(agSegment.p2.z)
  };
  const connection1: ScreenSegment = {
    p1: point1Xy,
    p2: point1Xz
  };
  const connection2: ScreenSegment = {
    p1: point2Xy,
    p2: point2Xz
  };

  return {
    type: AG_SEGMENT_TYPE,
    xy: [
      {
        type: SCREEN_POINT_TYPE,
        data: point1Xy
      },
      {
        type: SCREEN_POINT_TYPE,
        data: point2Xy
      },
      {
        type: SCREEN_SEGMENT_TYPE,
        data: {
          p1: point1Xy,
          p2: point2Xy
        }
      }
    ],
    xz: [
      {
        type: SCREEN_POINT_TYPE,
        data: point1Xz
      },
      {
        type: SCREEN_POINT_TYPE,
        data: point2Xz
      },
      {
        type: SCREEN_SEGMENT_TYPE,
        data: {
          p1: point1Xz,
          p2: point2Xz
        }
      }
    ],
    connections: [
      {
        type: SCREEN_CONNECTION_TYPE,
        data: connection1
      },
      {
        type: SCREEN_CONNECTION_TYPE,
        data: connection2
      }
    ]
  };
}
