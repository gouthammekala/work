import React, { Component } from 'react';
import Heatmap from './components/Heatmap';
import { nestByWeekDayHour } from './lib';
import timeSeriesData from './fixture/data';

class HeatMap extends Component {

    render () {
      return (
        <div className="flex flex-column items-center">
          <div className="flex justify-center bounce-in-top mt5">
            <Heatmap data={nestByWeekDayHour(timeSeriesData)} />
          </div>
          <h1
            className="flicker-in-1">
             It's a Heatmap.
          </h1>
        </div>
      );
    }
  }
  
  export default HeatMap;