import {Component, ElementRef, Input, ViewChild} from '@angular/core';
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

  @Input() objects?: PlotObject[];

  // public objects: Array<PlotObject> = [
  //   {
  //     type: 'point',
  //     xy: [
  //       {
  //         type: 'point',
  //         data: {
  //           x: 50,
  //           y: 120
  //         }
  //       },
  //       {
  //         type: 'point',
  //         data: {
  //           x: 50,
  //           y: 120
  //         }
  //       },
  //       {
  //         type: 'segment',
  //         data: {
  //           p1: {
  //             x: 10,
  //             y: 50
  //           },
  //           p2: {
  //             x: 200,
  //             y: 180
  //           }
  //         }
  //       }
  //     ],
  //     xz: [],
  //     connections: []
  //   }
  // ]

  public getScreenPoint(data: any): ScreenPoint {
    return data as ScreenPoint;
  }

  public getScreenSegment(data: any): ScreenSegment {
    return data as ScreenSegment;
  }
}
