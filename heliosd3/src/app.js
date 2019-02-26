import React, { PureComponent } from 'react';
import * as d3 from 'd3';

const DATA = [10, 20, 40, 70, 50, 30, 90, 120, 5, 65, 75];
const WIDTH = 400;
const HEIGHT = 200;
const INNER_HEIGHT = HEIGHT - 20;
const BAR_WIDTH = 24;
const BAR_GAP = 2;
const preprocess = (data) => {
    data = d3.shuffle([...data]);
    return data.map((d, i) => ({ id: i, value: d }));
}

const y = (d) => {
    const scale = d3.scaleLinear();
    return HEIGHT - scale(d.value);
  }

const  height= (d) => {
    const scale = d3.scaleLinear();
    return scale(d.value);
}

export class BarChat1 extends PureComponent {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.createForceLayout =  this.createForceLayout.bind(this);
      }

      componentDidMount() {
        const {data } = this.props;
        console.log(data);
        this.createForceLayout();
      }
      componentWillReceiveProps(newProps) {
        const {data } = newProps;
        console.log(data);        
      }
      createForceLayout() {
        const scale = d3.scaleLinear()
        .domain([0, d3.max(DATA)])
        .range([0, INNER_HEIGHT]);
        const svg = d3.select("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
      .append("g");
    
    function update(data) {
      const t = d3.transition()
          .duration(750);
      
      const bar = svg.selectAll("g")
        .data(data, d => d.id);
      
      // EXIT section
      bar
        .exit()
          .remove();
      
      // UPDATE section
      bar
        .transition(t)
          .attr("transform", (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${y(d)})`);
      
      bar.select("rect")
        .transition(t)
          .attr("height", height);
      
      bar.select("text")
        .transition(t)
          .tween("text", function(d) {
            const v0 = this.textContent || "0";
            const v1 = d.value;
            const i = d3.interpolateRound(v0, v1);
            return t => this.textContent = i(t);
          });
      
      // ENTER section
      const barEnter = bar
        .enter().append("g")
          .attr("transform", (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${INNER_HEIGHT})`);
    
      barEnter
        .transition(t)
          .attr("transform", (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${y(d)})`);
      
      const rect = barEnter.append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", BAR_WIDTH)
          .attr("height", 0);
      
      rect
        .transition(t)
          .attr("height", height);
      
      const text = barEnter.append("text")
          .text(d => d.value)
          .attr("text-anchor", "middle")
          .attr("dx", BAR_WIDTH / 2)
          .attr("dy", -2);
    }
    
    d3.interval(() => {
      update(preprocess(DATA));
    }, 2000);
      }
      render() {
        const {data } = this.props;
        console.log(data);
        return (
            <div className="viz">
                <svg style={{"height" : "100%", "width" : "50%"}}>
                    <use xlinkHref='/svg/svg-sprite#my-icon' />
                </svg>
            </div>
        );
    }

}


