import React, { PureComponent } from 'react';
import * as d3 from 'd3';
//import data from './1.csv';
var margin = {top:50, right:0, bottom:100, left:30},
width=960-margin.left-margin.right,
height=430-margin.top-margin.bottom,
gridSize=Math.floor(width/24),
legendElementWidth=gridSize*2.665,
buckets = 10,
colors = ["#f7fcf0","#e0f3db","#ccebc5","#a8ddb5","#7bccc4","#4eb3d3","#2b8cbe","#0868ac","#084081"],
days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
times = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];

var heatmap;
var legend;
export class HeatMap extends PureComponent {

    constructor(props) {
        super(props);

        this.createForceLayout =  this.createForceLayout.bind(this);
        this.updateHeatmap =  this.updateHeatmap.bind(this);
      }
      createForceLayout() {

        var svg = d3.select(".heapmap").append("svg")
		.attr("width",width + margin.left+margin.right)
		.attr("height", height+margin.top+margin.bottom)
		.append("g")
        .attr("transform", "translate("+ margin.left+","+margin.top+")");
        this.updateHeatmap(svg);
        
      }
      updateHeatmap(svg){
          const { data } =  this.props;
        svg.selectAll(".legend").attr("opacity", 0);
        console.log(data);
     
            
    
            colorScale = d3.scale.quantile()
                .domain([0, (d3.max(data, function(d){return d.value;})/2), d3.max(data, function(d){return d.value;})])
                .range(colors);
                
                
            var heatMap = svg.selectAll(".hour")
                .data(data)
                .transition().duration(1000)
                .style("fill", function(d){ return colorScale(d.value);});
                
            heatMap.selectAll("title").text(function(d) {return d.value;});
            
            var legend = svg.selectAll(".legend")
                .data([0].concat(colorScale.quantiles()), function(d) {return d;})
                .enter().append("g")
                .attr("class", "legend");
            
            legend.append("rect")
                .attr("x", function(d, i){ return legendElementWidth * i;})
                .attr("y", height)
                .attr("width", legendElementWidth)
                .attr("height", gridSize/2)
                .style("fill", function(d, i) {return colors[i]; });
            
            legend.append("text")
                .attr("class", "mono")
                .text(function(d) {return "≥ "+d.toString().substr(0,4);})
                .attr("x", function(d, i){ return legendElementWidth *i;})
                .attr("y", height+ gridSize);
                
                
         
    }
    render() {
        const {data } = this.props;
        console.log(data);
        return (
                <div className="heapmap"></div>
        );
    }
}