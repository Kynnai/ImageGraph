import {Component, View} from 'angular2/core';

@Component({
  selector: 'image-graph'
})

@View({
  templateUrl: 'image-graph.html'
})

export class ImageGraph {

  constructor() {

    //Initialize variables
    var config = {
      "avatar_size": 50
    };

    var patchVersion = "6.19.1";

    //Set base chart
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var color = d3.scale.category10();


    //Load data
    d3.json("data.json", function(error, data) {
      if (error) throw error;

      console.log(width);
      console.log(height);

      var x = d3.scale.linear()
          .range([0, width])
          .domain([d3.min(data, function(d) { return d.general.winPercent - 5; }),
            d3.max(data, function(d) { return d.general.winPercent + 5; })]);

      var y = d3.scale.linear()
          .range([height, 0])
          .domain([d3.min(data, function(d) { return d.general.playPercent - 5; }),
            d3.max(data, function(d) { return d.general.playPercent + 5; })]);

      //Set Axis
      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(5);

      //Load axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Win (%)");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Play (%)");


      //Load tip
      var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return "<strong> " + d.key + " </strong>" +
                "<br>" +
                "<strong>winPercent:</strong> <span>" + d.general.winPercent + "</span> " +
                "<br>" +
                "<strong>playPercent:</strong> <span>" + d.general.playPercent + "</span> ";
          });

      svg.call(tip);


      //Place Data
      var defs = svg.append('svg:defs');

      data.forEach(function(d, i) {
        defs.append("svg:pattern")
            .attr("id", "grump_avatar" + i)
            .attr("width", config.avatar_size)
            .attr("height", config.avatar_size)
            .append("svg:image")
            .attr("xlink:href", "//ddragon.leagueoflegends.com/cdn/" + patchVersion + "/img/champion/" + d.key + ".png")
            .attr("width", config.avatar_size)
            .attr("height", config.avatar_size);
      });

      svg.selectAll(".dot")
          .data(data)
          .enter().append("circle")
          .attr("cx", function(d) { return x(d.general.winPercent); })
          .attr("cy", function(d) { return y(d.general.playPercent); })
          .attr("r", config.avatar_size/2)
          //.style("fill", function(d){
          //  return "url(pictures/WHE120992.png)";
          //})
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);

      //svg.selectAll(".dot")
      //    .data(data)
      //    .enter().append("image")
      //    .attr('width', config.avatar_size)
      //    .attr('height', config.avatar_size)
      //    .attr("x", function(d) { return x(d.Weight); })
      //    .attr("y", function(d) { return y(d.Height); })
      //    .attr("xlink:href", function(d) {
      //      return d.image;
      //    })
      //    .on('mouseover', tip.show)
      //    .on('mouseout', tip.hide);

    });
  }

}
