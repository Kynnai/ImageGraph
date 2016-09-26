System.register("index", ["angular2/core", "angular2/platform/browser", "image-graph"], function($__export) {
  "use strict";
  var Component,
      View,
      bootstrap,
      ImageGraph,
      Main;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      View = $__m.View;
    }, function($__m) {
      bootstrap = $__m.bootstrap;
    }, function($__m) {
      ImageGraph = $__m.ImageGraph;
    }],
    execute: function() {
      Main = function() {
        function Main() {}
        return ($traceurRuntime.createClass)(Main, {}, {});
      }();
      Object.defineProperty(Main, "annotations", {get: function() {
          return [new Component({selector: 'main'}), new View({
            directives: [ImageGraph],
            template: "<image-graph></image-graph>"
          })];
        }});
      bootstrap(Main);
    }
  };
});
