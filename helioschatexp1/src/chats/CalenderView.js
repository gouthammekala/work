import React, { Component } from "react";
import * as d3 from "d3";
import filepath from "./file1.csv";
const margin = { left:80, right:20, top:50, bottom:100 };

const width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
class CalenderView extends Component {
  constructor(props) {
    super(props);
    this.createForceLayout = this.createForceLayout.bind(this);
  }
  componentDidMount() {
    this.createForceLayout();
  }
  createForceLayout() {
    const weekday ='weekday';
    const cellSize = 17;
    const timeWeek = weekday === "sunday" ? d3.utcSunday : d3.utcMonday;
    const countDay = weekday === "sunday" ? d => new Date(d).getUTCDay() : d => (new Date(d).getUTCDay() + 6) % 7;
    const format = d3.format("+.2%")
    const formatDate = d3.utcFormat("%x");
    const formatDay = d => "SMTWTFS"[new Date(d).getUTCDay()];
    const formatMonth = d3.utcFormat("%b");
    const color = d3.scaleSequential(d3.interpolatePiYG).domain([-0.05, 0.05]);
    function pathMonth(t) {
        const n = weekday === "weekday" ? 5 : 7;
        const d = Math.max(0, Math.min(n, countDay(t)));
        const w = timeWeek.count(d3.utcYear(t), t);
        return `${d === 0 ? `M${w * cellSize},0`
            : d === n ? `M${(w + 1) * cellSize},0`
            : `M${(w + 1) * cellSize},0V${d * cellSize}H${w * cellSize}`}V${n * cellSize}`;
      }

    d3.csv(
      "https://gist.githubusercontent.com/mbostock/354a9c93174a17eb6b80f4678e3d3ae9/raw/9d20ec96a40cc3fd5b8ddc9a306bd7397d5cfd16/dji.csv"
    ).then(function(tdata, error) {
        //console.log(tdata);
        tdata.forEach(function(d) {
            d.open = +d.open;
            d.close = +d.close;
            d.low=+d.low;
            d.high=+d.high;
            d.volume=+d.volume;
        });
        let data = tdata.map((da)=>{ 

            return {
  
                value: (da.close - da.open) / da.open,
                date:da.date,
            };
          
        });
       // console.log(data);
    
        const years = d3
            .nest()
            .key(d => {
                // console.log(new Date(d.date).getUTCFullYear());
                return new Date(d.date).getUTCFullYear()
            })
            .entries(data)
            .reverse();

      const svg = d3.select("#chart-area")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
        .style("font", "10px sans-serif")
        .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


      const year = svg
        .selectAll("g")
        .data(years)
        .join("g")
        .attr(
          "transform",
          (d, i) => `translate(40,${height * i + cellSize * 1.5})`
        );

      year
        .append("text")
        .attr("x", -5)
        .attr("y", -5)
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(d => d.key);

      year
        .append("g")
        .attr("text-anchor", "end")
        .selectAll("text")
        .data(
          (weekday === "weekday" ? d3.range(2, 7) : d3.range(7)).map(
            i => new Date(1995, 0, i)
          )
        )
        .join("text")
        .attr("x", -5)
        .attr("y", d => {
            // console.log(d);
            return (countDay(d) + 0.5) * cellSize
        })
        .attr("dy", "0.31em")
        .text(formatDay);

      year
        .append("g")
        .selectAll("rect")
        .data(d => d.values)
        .join("rect")
        .attr("width", cellSize - 1)
        .attr("height", cellSize - 1)
        .attr(
          "x",
          d => {
              //console.log(d3.timeYear(new Date(d.date)));
               // console.log(d3.timeWeek.count(d3.timeYear(new Date(d.date)),d.date), d.date);
              //d3.timeWeek.count(d3.timeYear(d),d) * cellSize;
              var now = new Date(d.date);
            d3.timeWeek.range(d3.timeMonth.floor(now), d3.timeMonth.ceil(now));

              return d3.timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 0.5
            }
        )
        .attr("y", d => countDay(d.date) * cellSize + 0.5)
        .attr("fill", d => color(d.value))
        .append("title")
        .text(d => `${formatDate(d.date)}: ${format(d.value)}`);

      const month = year
        .append("g")
        .selectAll("g")
        .data(d =>
          d3.utcMonths(
            d3.utcMonth(d.values[0].date),
            d.values[d.values.length - 1].date
          )
        )
        .join("g");

      month
        .filter((d, i) => i)
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#fff")
        .attr("stroke-width", 3)
        .attr("d", pathMonth);

      month
        .append("text")
        .attr(
          "x",
          d => timeWeek.count(d3.utcYear(d), timeWeek.ceil(d)) * cellSize + 2
        )
        .attr("y", -5)
        .text(formatMonth);
        
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div id="chart-area" />
        </div>
      </div>
    );
  }
}

export default CalenderView;
