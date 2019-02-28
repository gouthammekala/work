import React, { Component } from 'react';
import * as d3 from 'd3';
import revenues from './data/revenues.json';

const margin = { left:80, right:20, top:50, bottom:100 };

const width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

class BarChat extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.createForceLayout =  this.createForceLayout.bind(this);
      }
      componentDidMount() {
        this.createForceLayout();
      }
      createForceLayout() {
        var g = d3.select("#chart-area")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    
    // X Label
    g.append("text")
        .attr("y", height + 50)
        .attr("x", width / 2)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .text("Month");
    
    // Y Label
    g.append("text")
        .attr("y", -60)
        .attr("x", -(height / 2))
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Revenue");
    console.log(revenues);
    //d3.json(revenues).then(function(data){
        console.log(revenues);
    
        // Clean data
        revenues.forEach(function(d) {
            d.revenue = +d.revenue;
        });
    
        // X Scale
        var x = d3.scaleBand()
            .domain(revenues.map(function(d){ return d.month }))
            .range([0, width])
            .padding(0.2);
    
        // Y Scale
        var y = d3.scaleLinear()
            .domain([0, d3.max(revenues, function(d) { return d.revenue })])
            .range([height, 0]);
    
        // X Axis
        var xAxisCall = d3.axisBottom(x);
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height +")")
            .call(xAxisCall);
    
        // Y Axis
        var yAxisCall = d3.axisLeft(y)
            .tickFormat(function(d){ return "$" + d; });
        g.append("g")
            .attr("class", "y axis")
            .call(yAxisCall);
    
        // Bars
        var rects = g.selectAll("rect")
            .data(revenues)
            
        rects.enter()
            .append("rect")
                .attr("y", function(d){ return y(d.revenue); })
                .attr("x", function(d){ return x(d.month) })
                .attr("height", function(d){ return height - y(d.revenue); })
                .attr("width", x.bandwidth)
                .attr("fill", "grey");
    /*}).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });*/
      }
      render() {
        return (
            <div className="container">
            <div className="row">
                <div id="chart-area"></div>
            </div>
        </div>
        );
    }
};

export default BarChat;