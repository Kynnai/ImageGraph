System.register("image-graph", ["angular2/core"], function($__export) {
  "use strict";
  var Component,
      View,
      ImageGraph;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      View = $__m.View;
    }],
    execute: function() {
      ImageGraph = function() {
        function ImageGraph() {
          var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
          },
              width = 960 - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;
          var x = d3.scale.linear().range([0, width]);
          var y = d3.scale.linear().range([height, 0]);
          var color = d3.scale.category10();
          var xAxis = d3.svg.axis().scale(x).orient("bottom");
          var yAxis = d3.svg.axis().scale(y).orient("left");
          var svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          d3.tsv("data.tsv", function(error, data) {
            if (error)
              throw error;
            data.forEach(function(d) {
              d.sepalLength = +d.sepalLength;
              d.sepalWidth = +d.sepalWidth;
            });
            x.domain(d3.extent(data, function(d) {
              return d.sepalWidth;
            })).nice();
            y.domain(d3.extent(data, function(d) {
              return d.sepalLength;
            })).nice();
            svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).append("text").attr("class", "label").attr("x", width).attr("y", -6).style("text-anchor", "end").text("Sepal Width (cm)");
            svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Sepal Length (cm)");
            svg.selectAll(".dot").append("svg:image").attr("xlink:href", "http://www.clker.com/cliparts/1/4/5/a/1331068897296558865Sitting%20Racoon.svg").attr("width", 200).attr("height", 200);
            var legend = svg.selectAll(".legend").data(color.domain()).enter().append("g").attr("class", "legend").attr("transform", function(d, i) {
              return "translate(0," + i * 20 + ")";
            });
            legend.append("rect").attr("x", width - 18).attr("width", 18).attr("height", 18).style("fill", color);
            legend.append("text").attr("x", width - 24).attr("y", 9).attr("dy", ".35em").style("text-anchor", "end").text(function(d) {
              return d;
            });
          });
          console.info('ImageGraph Component Mounted Successfully');
        }
        return ($traceurRuntime.createClass)(ImageGraph, {}, {});
      }();
      $__export("ImageGraph", ImageGraph);
      Object.defineProperty(ImageGraph, "annotations", {get: function() {
          return [new Component({selector: 'image-graph'}), new View({templateUrl: 'image-graph.html'})];
        }});
    }
  };
});
