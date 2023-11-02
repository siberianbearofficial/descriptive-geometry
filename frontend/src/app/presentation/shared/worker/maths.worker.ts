/// <reference lib="webworker" />

import {GeneralObject} from "../../../core/domain/entities/general-object";
import {AngemPoint} from "../../../core/domain/entities/angem/angem-point";
import {PlotObject} from "../../../core/domain/entities/plot-object";
import {AngemSegment} from "../../../core/domain/entities/angem/angem-segment";
import {AngemCircle} from "../../../core/domain/entities/angem/angem-circle";

import {AG_CIRCLE_TYPE, AG_POINT_TYPE, AG_SEGMENT_TYPE} from "./agTypes";
import {agPointToPlotObject} from "./agToPlotObjectFunctions/agPointToPlotObject";
import {agSegmentToPlotObject} from "./agToPlotObjectFunctions/agSegmentToPlotObject";
import {agCircleToPlotObject} from "./agToPlotObjectFunctions/agCircleToPlotObject";
import {G2P, P2G} from "./constants";

addEventListener('message', ({data}): void => {
  const parsedData = JSON.parse(data);
  switch (parsedData.action) {
    case G2P: {
      let plotObjects: PlotObject[] = [];
      const generalObjects: GeneralObject[] = parsedData.objects as GeneralObject[];
      generalObjects.forEach((generalObject: GeneralObject): void => {
        const plotObject: PlotObject | undefined = generalToPlot(generalObject);
        if (plotObject)
          plotObjects.push(plotObject);
      });

      postMessage(JSON.stringify({
        action: G2P,
        objects: plotObjects
      }));
      break;
    }
    case P2G: {
      let generalObjects: GeneralObject[] = [];
      const plotObjects: PlotObject[] = parsedData.objects as PlotObject[];
      plotObjects.forEach((plotObject: PlotObject): void => {
        const generalObject: GeneralObject | undefined = plotToGeneral(plotObject);
        if (generalObject)
          generalObjects.push(generalObject);
      });

      postMessage(JSON.stringify({
        action: P2G,
        objects: generalObjects
      }));
      break;
    }
  }
});

function generalToPlot(generalObject: GeneralObject): PlotObject | undefined {
  if (generalObject.type == AG_POINT_TYPE)
    return agPointToPlotObject(generalObject.agObject as AngemPoint);
  if (generalObject.type == AG_SEGMENT_TYPE)
    return agSegmentToPlotObject(generalObject.agObject as AngemSegment);
  if (generalObject.type == AG_CIRCLE_TYPE)
    return agCircleToPlotObject(generalObject.agObject as AngemCircle);
  return undefined;
}

function plotToGeneral(plotObject: PlotObject): GeneralObject | undefined {
  return undefined;
}
