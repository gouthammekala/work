import React, { Component } from "react";

class Onechat extends Component {
  render() {
    return (
      <div class="row">
        <div id="left-charts" class="col-sm-12 col-md-8">
          <div class="row">
            <div class="col-md-4">
              <label>
                Dates: <span id="dateLabel1">01/01/2017</span> -{" "}
                <span id="dateLabel2">10/12/2017</span>
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <select id="var-select" class="form-control">
                <option selected value="call_revenue">
                  Revenue (USD)
                </option>
                <option value="call_duration">Call Time (seconds)</option>
                <option value="units_sold">Units Sold</option>
              </select>
            </div>
          </div>
          <div id="stacked-area" />
          <div id="timeline" />
        </div>
        <div id="right-charts" class="col-md-4 col-sm-12">
          <div class="row">
            <div class="col-sm-6 col-md-12" id="company-size" />
            <div class="col-sm-6 col-md-12" id="units-sold" />
            <div class="col-sm-6 col-md-12" id="revenue" />
            <div class="col-sm-6 col-md-12" id="call-duration" />
          </div>
        </div>
      </div>
    );
  }
}
export default Onechat;
