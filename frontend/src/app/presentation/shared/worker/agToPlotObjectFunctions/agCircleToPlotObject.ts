import {AngemCircle} from "../../../../core/domain/entities/angem/angem-circle";
import {PlotObject} from "../../../../core/domain/entities/plot-object";
import {Projection} from "../../../../core/domain/entities/projection";
import {Vector3} from "@amandaghassaei/vector-math";
import {ScreenPoint} from "../../../../core/domain/entities/screen/screen-point";
import {AngemPoint} from "../../../../core/domain/entities/angem/angem-point";
import {AG_CIRCLE_TYPE} from "../agTypes";
import {SCREEN_CONNECTION_TYPE, SCREEN_POINT_TYPE, SCREEN_SEGMENT_TYPE} from "../screenTypes";
import {agXToScreenX, agYToScreenY, agZToScreenY} from "../coordinates";

const CIRCLE_COUNT: number = 20;

export function agCircleToPlotObject(agCircle: AngemCircle): PlotObject {
  let xy: Projection[] = [];
  let xz: Projection[] = [];
  let connections: Projection[] = [];

  if (agCircle.radius) {
    const normal: Vector3 = new Vector3(agCircle.normal.x, agCircle.normal.y, agCircle.normal.z);

    let perpendicular: Vector3;
    if (agCircle.normal.y || agCircle.normal.z)
      perpendicular = normal.clone().cross(new Vector3(1, 0, 0));
    else
      perpendicular = normal.clone().cross(new Vector3(0, 1, 1));

    let vectorSin: Vector3 = perpendicular.normalize().multiplyScalar(agCircle.radius);
    let vectorCos: Vector3 = vectorSin.clone().cross(normal).normalize().multiplyScalar(agCircle.radius);

    let xyScreenPoints: ScreenPoint[] = [];
    let xzScreenPoints: ScreenPoint[] = [];

    for (let i: number = 0; i < CIRCLE_COUNT; i++) {
      const vectorSinClone: Vector3 = vectorSin.clone().multiplyScalar(Math.sin(2 * Math.PI * (i + 1) / CIRCLE_COUNT));
      const vectorCosClone: Vector3 = vectorCos.clone().multiplyScalar(Math.cos(2 * Math.PI * (i + 1) / CIRCLE_COUNT));
      const agPoint: AngemPoint = {
        x: agCircle.center.x + vectorSinClone.x + vectorCosClone.x,
        y: agCircle.center.y + vectorSinClone.y + vectorCosClone.y,
        z: agCircle.center.z + vectorSinClone.z + vectorCosClone.z
      };

      const pointXy: ScreenPoint = {
        x: agXToScreenX(agPoint.x),
        y: agYToScreenY(agPoint.y)
      };
      const pointXz: ScreenPoint = {
        x: agXToScreenX(agPoint.x),
        y: agZToScreenY(agPoint.z)
      };

      xyScreenPoints.push(pointXy);
      xzScreenPoints.push(pointXz);
    }

    for (let i: number = 1; i < xyScreenPoints.length; i++) {
      xy.push({
        type: SCREEN_SEGMENT_TYPE,
        data: {
          p1: xyScreenPoints[i - 1],
          p2: xyScreenPoints[i]
        }
      });
      xz.push({
        type: SCREEN_SEGMENT_TYPE,
        data: {
          p1: xzScreenPoints[i - 1],
          p2: xzScreenPoints[i]
        }
      });
    }
    xy.push({
      type: SCREEN_SEGMENT_TYPE,
      data: {
        p1: xyScreenPoints[xyScreenPoints.length - 1],
        p2: xyScreenPoints[0]
      }
    });
    xz.push({
      type: SCREEN_SEGMENT_TYPE,
      data: {
        p1: xzScreenPoints[xzScreenPoints.length - 1],
        p2: xzScreenPoints[0]
      }
    });
  } else {
    const pointXy: ScreenPoint = {
      x: agXToScreenX(agCircle.center.x),
      y: agYToScreenY(agCircle.center.y)
    };
    const pointXz: ScreenPoint = {
      x: agXToScreenX(agCircle.center.x),
      y: agZToScreenY(agCircle.center.z)
    };
    xy.push({
      type: SCREEN_POINT_TYPE,
      data: pointXy
    });
    xz.push({
      type: SCREEN_POINT_TYPE,
      data: pointXz
    });
    connections.push({
      type: SCREEN_CONNECTION_TYPE,
      data: {
        p1: pointXy,
        p2: pointXz
      }
    });
  }

  return {
    type: AG_CIRCLE_TYPE,
    xy: xy,
    xz: xz,
    connections: connections
  };
}
