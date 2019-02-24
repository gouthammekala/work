import React, { Component } from 'react';
import * as d3 from 'd3';
import icon from './resources/icon.svg';
import data from './data/worldcup.csv';
import nodelist from './data/nodelist.csv';
import edgelist from './data/edgelist.csv';
const PromiseWrapper = d => new Promise(resolve => d3.csv(d, p => resolve(p)));
const nodeHashAry = [];
const edjeHashAry = [];

class Circle extends Component {


    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.createForceLayout =  this.createForceLayout.bind(this);
      }
      componentDidMount() {

         d3.csv(nodelist,node=>this.nodelist(node));
         d3.csv(edgelist,edge=>this.edgelist(edge));
         setTimeout(() => {
            this.createForceLayout(nodeHashAry,edjeHashAry);              
         }, 100);
        
      }
      nodelist(node) {
        nodeHashAry.push(node);
      }
      edgelist(edge) {
        edjeHashAry.push(edge);
      }
      rowScale(role) {
        const roleScale = d3.scaleOrdinal()
        .domain(["contractor", "employee", "manager"])
        .range(["#75739F", "#41A368", "#FE9922"]);
        return roleScale;
      }
      createForceLayout(nodes,edges) {
        console.log(nodes,edges);
        var marker = d3.select("svg").append('defs')
          .append('marker')
            .attr("id", "Triangle")
            .attr("refX", 12)
            .attr("refY", 6)
            .attr("markerUnits", 'userSpaceOnUse')
            .attr("markerWidth", 12)
            .attr("markerHeight", 18)
            .attr("orient", 'auto')
          .append('path')
            .attr("d", 'M 0 0 12 6 0 12 3 6');
        
        var nodeHash = {};
        nodes.forEach(node => {
          nodeHash[node.id] = node;
        });
        
        edges.forEach(edge => {
          edge.weight = parseInt(edge.weight);
          edge.source = nodeHash[edge.source];
          edge.target = nodeHash[edge.target];
        });
        
        nodes.forEach(d => {
          d.degreeCentrality = edges.filter(
          p => p.source === d || p.target === d).length
        });
        
        console.log(nodes);
        
        var linkForce = d3.forceLink().strength(d => d.weight * .1);
        
        var simulation = d3.forceSimulation()
          .force("charge", d3.forceManyBody().strength(-500))
          .force("x", d3.forceX(250))
          .force("y", d3.forceY(250))
          .force("link", linkForce)
          .nodes(nodes)
          .on("tick", forceTick);
        
        simulation.force("link").links(edges);
        
        d3.select("svg").selectAll("line.link")
          .data(edges, d => `${d.source.id}-${d.target.id}`)
          .enter()
          .append("line")
            .attr("class", "link")
            .style("opacity", .5)
            .style("stroke-width", d => d.weight);
        
        d3.selectAll("line").attr("marker-end", "url(#Triangle)");
        
        var nodeEnter = d3.select("svg").selectAll("g.node")
          .data(nodes, d => d.id)
          .enter()
          .append("g")
            .attr("class", "node");
        nodeEnter.append("circle")
            .attr("r", d => d.degreeCentrality * 2)
            .style("fill", d => this.rowScale(d.role));
        
        nodeEnter.append("text")
            .style("text-anchor", "middle")
            .attr("y", 15)
            .text(d => d.id);
        
        d3.select("svg")
            .on("click", manuallyPositionNodes);
        
        function manuallyPositionNodes() {
        	
          var xExtent = d3.extent(simulation.nodes(), d => parseInt(d.degreeCentrality));
          var yExtent = d3.extent(simulation.nodes(), d => parseInt(d.salary));
          var xScale = d3.scaleLinear().domain(xExtent).range([50,450]);
          var yScale = d3.scaleLinear().domain(yExtent).range([450,50]);
          
          simulation.stop();
          
          d3.selectAll("g.node")
            .transition()
              .duration(1000)
              .attr("transform", d => `translate(${xScale(d.degreeCentrality)} , ${yScale(d.salary) })`);
          
          d3.selectAll("line.link")
            .transition()
              .duration(1000)
              .attr("x1", d => xScale(d.source.degreeCentrality))
              .attr("y1", d => yScale(d.source.salary))
              .attr("x2", d => xScale(d.target.degreeCentrality))
              .attr("y2", d => yScale(d.target.salary));
          
          var xAxis = d3.axisBottom().scale(xScale).tickSize(4);
          var yAxis = d3.axisRight().scale(yScale).tickSize(4);
          
          d3.select("svg").append("g").attr("transform", "translate(0,460)").call(xAxis);
          
          d3.select("svg").append("g").attr("transform", "translate(460,0)").call(yAxis);
          
          d3.selectAll("g.node").each(d => {
            d.x = xScale(d.degreeCentrality);
            d.vx = 0;
            d.y = yScale(d.salary);
            d.vy = 0;
          });
        }
        
        function forceTick() {
          d3.selectAll("line.link")
              .attr("x1", d => d.source.x)
              .attr("x2", d => d.target.x)
              .attr("y1", d => d.source.y)
              .attr("y2", d => d.target.y);
          
          d3.selectAll("g.node")
          	  .attr("transform", d => `translate(${d.x},${d.y})`);
        }
      }

    render() {
        var useTag = '<use xlink:href="/svg/svg-sprite#my-icon" />';
        return (
            <div className="viz">
                <svg style={{"height" : "500px", "width" : "500px"}}>
                    <use xlinkHref='/svg/svg-sprite#my-icon' />
                </svg>
            </div>
        );
    }
}

export default Circle;