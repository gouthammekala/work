import React, { Component } from 'react';
import * as d3 from 'd3';
import sunburst from './data/sunburst.json';

class Circle1 extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.createForceLayout =  this.createForceLayout.bind(this);
      }
      componentDidMount() {
        this.createForceLayout();
      }
      createForceLayout() {
        var width = 960,
        height = 700,
        radius = (Math.min(width, height) / 2) - 10;

    var formatNumber = d3.format(",d");

    var x = d3.scaleLinear()
        .range([0, 2 * Math.PI]);

    var y = d3.scaleSqrt()
        .range([0, radius]);

    var color = d3.scaleOrdinal().range(["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"]);

    var partition = d3.partition();

    // These values will be provided by d3.partition() 
    var arc = d3.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y1)); });


    var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

    // d3.json("data/sunburst.json", function(error, root) {
        // if (error) throw error;
        let  root = sunburst;
        console.log(root);
        root = d3.hierarchy(root)
            .sum(function(d) { return d.size; });

        // Add an arc for each of the nodes in our hierarchy. partition(root) adds x0, x1, y0, and y1 values to each node.
        svg.selectAll("path")
            .data(partition(root).descendants())
            .enter().append("path")
            .attr("d", arc)
            .style("fill", function(d) { return color((d.children ? d : d.parent).data.name); })
            .on("click", click)
            .append("title")
            .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });
    // });

    function click(d) {
        // Redraw the arcs when one of them is clicked to zoom in on a section
        svg.transition()
            .duration(750)
            .tween("scales", function() {
                var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                    yd = d3.interpolate(y.domain(), [d.y0, 1]),
                    yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
                return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
            })
            .selectAll("path")
                .attrTween("d", function(d) { return function() { return arc(d); }; });

    }
      }
      render() {

        return (

                <svg>
                    <use xlinkHref='/svg/svg-sprite#my-icon' />
                </svg>

        );
    }
}

export default Circle1;