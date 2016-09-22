import {Component, View} from 'angular2/core';

@Component({
  selector: 'image-graph'
})

@View({
  templateUrl: 'image-graph.html'
})

export class ImageGraph {

  constructor() {
    console.info('ImageGraph Component Mounted Successfully');
  }

}
