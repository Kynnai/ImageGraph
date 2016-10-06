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
          var config = {
            "avatar_size": 50,
            "patchVersion": "6.19.1"
          };
          var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
          },
              width = 960 - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;
          var svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          var color = d3.scale.category10();
          d3.json("data.json", function(error, data) {
            if (error)
              throw error;
            var x = d3.scale.linear().range([0, width]).domain([d3.min(data, function(d) {
              return d.general.winPercent - 1.5;
            }), d3.max(data, function(d) {
              return d.general.winPercent + 0.5;
            })]);
            var y = d3.scale.linear().range([height, 0]).domain([d3.min(data, function(d) {
              return d.general.playPercent - 1.5;
            }), d3.max(data, function(d) {
              return d.general.playPercent + 0.5;
            })]);
            var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(20).innerTickSize(-height).outerTickSize(0).tickPadding(10);
            var yAxis = d3.svg.axis().scale(y).orient("left").ticks(15).innerTickSize(-width).outerTickSize(0).tickPadding(10);
            svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).append("text").attr("class", "label").attr("x", width).attr("y", -6).style("text-anchor", "end").text("Win (%)");
            svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Play (%)");
            var tip = d3.tip().attr('class', 'd3-tip').offset([-10, 0]).html(function(d) {
              return "<strong> " + d.key + " " + d.role + " </strong>" + "<br>" + "<strong>Win %:</strong> <span>" + d.general.winPercent + "</span> " + "<br>" + "<strong>Play %:</strong> <span>" + d.general.playPercent + "</span> ";
            });
            svg.call(tip);
            var defs = svg.append("defs").attr("id", "imgdefs");
            data.forEach(function(d) {
              var catpattern = defs.append("pattern").attr("id", "champ_avatar_" + d.key).attr("height", 1).attr("width", 1).attr("x", "0").attr("y", "0");
              catpattern.append("image").attr("x", 0).attr("y", 0).attr("height", config.avatar_size).attr("width", config.avatar_size).attr("xlink:href", "//ddragon.leagueoflegends.com/cdn/" + config.patchVersion + "/img/champion/" + d.key + ".png");
            });
            svg.selectAll(".dot").data(data).enter().append("circle").attr("r", config.avatar_size / 2).attr("cx", function(d) {
              return x(d.general.winPercent);
            }).attr("cy", function(d) {
              return y(d.general.playPercent);
            }).style("fill", function(d) {
              return "url(#champ_avatar_" + d.key + ")";
            }).on('mouseover', tip.show).on('mouseout', tip.hide);
          });
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
