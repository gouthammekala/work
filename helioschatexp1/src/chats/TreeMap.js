import React, { Component } from 'react';
import * as d3 from 'd3';
import filepath from './file1.csv';

   


class TreeMap extends Component {

    constructor(props) {
        super(props);
        // this.myRef = React.createRef();
        this.createForceLayout =  this.createForceLayout.bind(this);
      }
      componentDidMount() {
        this.createForceLayout();
      }
      createForceLayout() {


        var width = 960,
    height = 1060;

var format = d3.format(",d");

var color = d3.scaleOrdinal()
    .range(d3.schemeCategory10
        .map(function(c) { c = d3.rgb(c); c.opacity = 0.6; return c; }));

var stratify = d3.stratify()
    .parentId(function(d) {
      console.log(d);
       return d.id.substring(0, d.id.lastIndexOf("."));
       });

var treemap = d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true);

d3.csv(filepath).then(function(data, error) {
  if (error) console.log(error);
console.log(data);
  var root = stratify(data)
      .sum(function(d) { return d.value; })
      .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

  treemap(root);

  d3.select("#chart-area")
    .selectAll("svg")
    .data(root.leaves())
    .enter().append("div")
      .attr("class", "node")
      .attr("title", function(d) { return d.id + "\n" + format(d.value); })
      .style("left", function(d) { return d.x0+250 + "px"; })
      .style("top", function(d) { return d.y0 +50+ "px"; })
      .style("width", function(d) { return d.x1 - d.x0 + "px"; })
      .style("height", function(d) { return d.y1 - d.y0 + "px"; })
      .style("background", function(d) { while (d.depth > 1) d = d.parent; return color(d.id); })
    .append("div")
      .attr("class", "node-label")
      .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1).split(/(?=[A-Z][^A-Z])/g).join("\n"); })
    .append("div")
      .attr("class", "node-value")
      .text(function(d) { return format(d.value); });
});

function type(d) {
  d.value = +d.value;
  return d;
}
/*
        const w = 1280 - 80,
        h = 800 - 180,
        x = d3.scaleLinear().range([0, w]),
        y = d3.scaleLinear().range([0, h]),
        color = d3.scaleOrdinal(d3.schemeCategory10);
        let node,root;
        
        const  treemap = d3.treemap()
        //.round(false)
        .size([w, h])
        //.sticky(true)
        //.value(function(d) { return d.total; });
        
        
        const svg = d3.select("#chart-area").append("svg")
            .attr("class", "chart")
            .style("width", w + "px")
            .style("height", h + "px")
          .append("svg:svg")
            .attr("width", w)
            .attr("height", h)
          .append("svg:g")
            .attr("transform", "translate(.5,.5)");
        
        //d3.json("party_asset.json").then(function(data) {

            node = root = data;
            console.log(data);
           
            var nodes = treemap(root)
                .filter(function(d) {return !d.children; });
                
           
            var cell = svg.selectAll("g")
                .data(nodes)
              .enter().append("svg:g")
                .attr("class", "cell")
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
                .on("click", function(d) { return zoom(node == d.parent ? root : d.parent); });
          
            cell.append("rect")
                .attr("width", function(d) { return d.dx - 1; })
                .attr("height", function(d) { return d.dy - 1; })
                .style("fill", function(d) {
                  console.log('j');
                  //return color(d.parent.name); 
                });
          
            cell.append("text")
                .attr("x", function(d) { return d.dx / 2; })
                .attr("y", function(d) { return d.dy / 2; })
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .text(function(d) { return d.name; })
                .style("opacity", function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; });
          
            d3.select(window).on("click", function() { zoom(root); });
          
            d3.select("select").on("change", function() {
              //treemap.value(this.value == "size" ? size : count).nodes(root);
              treemap.value((this.value == "total") ? total : (this.value == "building") ? building : (this.value == "ground") ? ground : cash).nodes(root);
              zoom(node);
            });
          //});
          
          function size(d) {
            return d.size;
          }
          
          function total(d) {
            return d.total;
          }
          
          function building(d) {
            return d.building;
          }
          
          function ground(d) {
            return d.ground;
          }
          
          function cash(d) {
            return d.cash;
          }
          
          function count(d) {
            return 1;
          }
          
          function zoom(d) {
            var kx = w / d.dx, ky = h / d.dy;
            x.domain([d.x, d.x + d.dx]);
            y.domain([d.y, d.y + d.dy]);
          const svg ='';
            var t = svg.selectAll("g.cell").transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });
          
            t.select("rect")
                .attr("width", function(d) { return kx * d.dx - 1; })
                .attr("height", function(d) { return ky * d.dy - 1; })
          
            t.select("text")
                .attr("x", function(d) { return kx * d.dx / 2; })
                .attr("y", function(d) { return ky * d.dy / 2; })
                .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; });
          
            node = d;
            d3.event.stopPropagation();
          }
          */
/*
         var width = 420, height = 340;

         var layouts = ['treemapBinary', 'treemapDice', 'treemapSlice', 'treemapSliceDice', 'treemapSquarify'];
         
         var treemapLayout = d3.treemap()
           .size([400, 300])
           .paddingOuter(16);
         
         var rootNode = d3.hierarchy(data)
         rootNode.sum(function(d) {
           return d.size;
         });
         
         function enteringTreemap(d) {
         
           treemapLayout.tile(d3[d])
           treemapLayout(rootNode);
         
           d3.select(this)
             .append('text')
             .text(function(d) {return d})
             .attr('dy', 14)
         
           var nodes = d3.select(this)
             .append('g')
             .attr('transform', 'translate(0, 20)')
             .selectAll('g')
             .data(rootNode.descendants())
             .enter()
             .append('g')
             .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0] + ')'})
         
           nodes
             .append('rect')
             .attr('width', function(d) { return d.x1 - d.x0; })
             .attr('height', function(d) { return d.y1 - d.y0; })
         
           nodes
             .append('text')
             .attr('dx', 4)
             .attr('dy', 14)
             .text(function(d) {
               return d.data.name;
             })
         }
         
         var treemaps = d3.select('#chart-area')
           .selectAll('svg')
           .data(layouts)
           .enter()
           .append('svg')
           .attr('width', width + 'px')
           .attr('height', height + 'px')
           .each(enteringTreemap)
           */
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

}

export default TreeMap;