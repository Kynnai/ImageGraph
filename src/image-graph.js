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


    //Set base chart
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category10();



    //Set Axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5);


    //Load data
    d3.json("data.json", function(error, data) {
      if (error) throw error;

      x.domain(d3.extent(data, function(d) { return d.Weight; })).nice();
      y.domain(d3.extent(data, function(d) { return d.Height; })).nice();


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
          .text("Weight (lbs)");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Height (foot)");


      //Load tip
      var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return "<strong> " + d.Name + " </strong>" +
                   "<br>" +
                   "<strong>Weight:</strong> <span>" + d.Weight + "</span> " +
                   "<br>" +
                   "<strong>Height:</strong> <span>" + d.Height + "</span> ";
          });

      svg.call(tip);

      var defs = svg.append('svg:defs');

      data.forEach(function(d, i) {
        defs.append("svg:pattern")
            .attr("id", "grump_avatar" + i)
            .attr("width", config.avatar_size)
            .attr("height", config.avatar_size)
            .append("svg:image")
            .attr("xlink:href", d.image)
            .attr("width", config.avatar_size)
            .attr("height", config.avatar_size);
      });

      svg.selectAll(".dot")
          .data(data)
          .enter().append("circle")
          .attr("cx", function(d) { return x(d.Weight); })
          .attr("cy", function(d) { return y(d.Height); })
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

      var legend = svg.selectAll(".legend")
          .data(color.domain())
          .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });

    });
  }

}
