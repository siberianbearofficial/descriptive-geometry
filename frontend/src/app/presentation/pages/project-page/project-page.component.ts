import {Component, OnInit} from '@angular/core';
import {PlotObject} from "../../../core/domain/entities/plot-object";
import {GeneralObject} from "../../../core/domain/entities/general-object";
import {G2P, P2G} from "../../shared/worker/constants";


@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  public plotObjects: PlotObject[] = [];
  public generalObjects: GeneralObject[] = [
    {
      type: 'point',
      agObject: {
        x: 100,
        y: 100,
        z: 200
      }
    },
    {
      type: 'segment',
      agObject: {
        p1: {
          x: 200,
          y: 50,
          z: 150
        },
        p2: {
          x: 400,
          y: 300,
          z: 100
        }
      }
    },
    {
      type: 'circle',
      agObject: {
        center: {
          x: 300,
          y: 300,
          z: 300
        },
        radius: 30,
        normal: {
          x: 0,
          y: 0,
          z: 1
        }
      }
    }
  ];

  public ngOnInit(): void {
    if (typeof Worker !== 'undefined') {
      const worker: Worker = new Worker(new URL('../../shared/worker/maths.worker', import.meta.url));
      worker.onmessage = ({data}): void => {
        const parsedData = JSON.parse(data);
        switch (parsedData.action) {
          case G2P: {
            const plotObjects: PlotObject[] = parsedData.objects as PlotObject[];
            console.log(plotObjects);
            if (plotObjects != this.plotObjects)
              this.plotObjects = plotObjects;
            break;
          }
          case P2G: {
            console.warn('Plot to general objects conversion is not supported.');
            break;
          }
        }
      };

      worker.postMessage(JSON.stringify({
        action: G2P,
        objects: this.generalObjects
      }));
    } else {
      console.error('Web workers are not supported in this environment.');
    }
  }
}
