import {Component, ElementRef, ViewChild} from '@angular/core';
import {ScreenSegment} from "../../../../core/domain/entities/screen/screen-segment";
import {ScreenPoint} from "../../../../core/domain/entities/screen/screen-point";
import {PlotObject} from "../../../../core/domain/entities/plot-object";


@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent {
  @ViewChild('plot') plotRef?: ElementRef;

  public segment = {
    p1: {
      x: 10,
      y: 10,
      z: 20
    },
    p2: {
      x: 100,
      y: 20,
      z: 50
    }
  };

  public objects: Array<PlotObject> = [
    {
      xy: [
        {
          type: 'segment',
          data: {
            p1: {
              x: 10,
              y: 50
            },
            p2: {
              x: 200,
              y: 180
            }
          }
        },
        {
          type: 'point',
          data: {
            x: 50,
            y: 120
          }
        }
      ],
      xz: [],
      connections: []
    }
  ]

  public getScreenPoint(data: any): ScreenPoint {
    return data as ScreenPoint;
  }

  public getScreenSegment(data: any): ScreenSegment {
    return data as ScreenSegment;
  }
}
