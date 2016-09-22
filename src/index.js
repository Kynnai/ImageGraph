import {Component, View} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ImageGraph} from 'image-graph';

@Component({
  selector: 'main'
})

@View({
  directives: [ImageGraph],
  template: `
    <image-graph></image-graph>
  `
})

class Main {

}

bootstrap(Main);
