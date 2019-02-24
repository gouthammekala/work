
			var margin = {top: 30, right: 50, bottom: 160, left: 50},
				width = 890 - margin.left - margin.right,
				height = 600 - margin.top - margin.bottom,
				// grid
				h = 34, // each row height
				w = 3; // each column width

			// get mounth name
			var monthName = d3.time.format('%B');

			// colors
			var colors = ['#5e4fa4', '#3288bd', '#66c2a5', '#abdda4', '#e6f598', '#ffffbf', '#fee08b', '#fdae61', '#f46d43', '#d53e4f', '#9e0142'];

			var zoom = d3.behavior.zoom()
				//.x(xScale)
				//.y(yScale)
				.scaleExtent([1, 32])
				.on('zoom', zoomed);

			/* zoom */
			function zoomed(container) {
			  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
			}

			// loader	
			var radius = Math.min(width, height) / 3,
				tau = 2 * Math.PI;

			// create d3 arc
			var arc = d3.svg.arc()
				        .innerRadius(radius*0.5)
				        .outerRadius(radius*0.4)
				        .startAngle(0);

			// setup x
			var xVal = function(d){return d.year;},
				xScale = d3.scale.linear().range([0, width]),
				xMap = function(d){return xScale(xVal(d))},
				xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(35).tickFormat(function(d){return d;});

			// setup y
			var yVal = function(d){return d.month},
				yScale = d3.time.scale().range([height, 0]),
				yMap = function(d){return yScale(yVal(d))},
				yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(d3.time.months).tickSize(16, 0).tickFormat(d3.time.format('%B'));

			// add the graph canvas
			var svg = d3.select('#svg')
				.append("svg")
				.attr("class", 'loader')
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append('g')
				.attr('transform', 'translate(' + margin.left + "," + margin.top + ")");

			// add graph loader
			var loader = svg.append("g")
				.attr("transform", "translate(" + (width / 2 - margin.left) + "," + (height / 2 + margin.top) + ")")
				.append("path")
				.datum({endAngle: 0.33*tau})
				.style("fill", "#6f0000")
				.attr("d", arc)
			    .call(spin, 1500);

			// add tooltip
			var tip = d3.select('body')
					.append('div')
					.attr('class', 'tooltip')
					.style('opacity', 0);

			// add headings
			var headings = svg.append('g')
				.attr('class', 'head')
				.attr("transform", "translate(" + width / 2 + ", 5)")
				.style('text-anchor', 'middle');

			headings.append('text')
				.style('font-size', '20px')
				.text('Monthly Global Land-Surface Temperature');

			headings.append('text')
				.attr('y', 22)
				.style('font-size', '15px')
				.style('fill', '#353535')
				.style('font-weight', 'bold')
				.html('1753 - 2015');

			headings.append('text')
				.attr('y', 40)
				.style('font-size', '13px')
					.text("Temperatures are in Celsius and reported as anomalies relative to the Jan 1951-Dec 1980 average.");
			headings.append('text')
				.attr('y', 55)
				.style('font-size', '13px')
				.text("Estimated Jan 1951-Dec 1980 absolute temperature ℃: 8.66 +/- 0.07");

			// load data
			d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json', function(err, res){

				if(err){
					return console.error(err)
				}

					// remove loader
					loader.remove();

					var baseTemp = res.baseTemperature;
					res = res.monthlyVariance;

					// new g ele to handle graph
					svg = svg.append('g').attr('transform', 'translate(' + 30 + ',' + (margin.top+50) + ')');
						

					xScale.domain(d3.extent(res, xVal));
					yScale.domain([new Date(2012, 11, 31), new Date(2012, 0, 1)]);

					//x-axis
					svg.append('g')
					   .attr('class', 'x axis')
					   .attr('transform', 'translate(0, ' + height + ')')
					   .call(xAxis)
					   .append('text')
					   .attr('class', 'label')
					   .attr('x', width/2)
					   .attr('y', 40)
					   .text("Years");

					// y axis
					svg.append('g')
					   .attr('class', 'y axis')
					   .call(yAxis)
					   .append('text')
					   .attr('transform', 'rotate(-90)')
					   .attr('class', 'label')
					   .attr('x', -height/2)
					   .attr('y', -72)
					   .attr('dy', '.71em')
					   .text('Months');

					// draw chart
					var cards = svg.selectAll('.heat-map')
					   .data(res, function(d){return d.month + ":" + (d.year -1753);})
					   .enter()
					   .append('svg:rect')
					   .attr('class', 'heat-map')
					   .attr('x', function(d){
					   	  return (d.year -1753) *w;
					   })
					   .attr('y', function(d){
					   	  return (d.month -1) *h;
					   })
					   .on('mouseover', function(d){
					   	  tip.transition()
					   	  	 .duration(200)
					   	  	 .style('opacity', '.9');

					   	  var temp = baseTemp + d.variance;
					   	  	  temp = temp.toFixed(3);

					   	  tip.html("<h3>" + d.year + " - " + monthName(new Date(2012, d.month -1, 1)) + "<br/>" + temp + ' &deg;C<br/>' + d.variance + ' &deg;C' + "</h3>")
					   	     .style('left', (d3.event.pageX -55) + 'px')
					   	     .style('top', (d3.event.pageY -100) + 'px');
					   })
					   .on('mouseout', function(d){
					   	  tip.transition()
					   	  	 .duration(300)
					   	  	 .style('opacity', 0);
					   })
					   .attr('fill', function(d){
					   	  var t = baseTemp + d.variance;
					   	  if(t < 2.7){
					   	  	return colors[0];
					   	  }
					   	  else if(t < 3.9 && t >= 2.7){
					   	  	return colors[1];
					   	  }
					   	  else if(t < 5 && t >= 3.9){
					   	  	return colors[2];
					   	  }
					   	  else if(t < 6.1 && t >= 5){
					   	  	return colors[3];
					   	  }
					   	  else if(t < 7.2 && t >= 6.1){
					   	  	return colors[4];
					   	  }
					   	  else if(t < 8.3 && t >= 7.2){
					   	  	return colors[5];
					   	  }
					   	  else if(t < 9.4 && t >= 8.3){
					   	  	return colors[6];
					   	  }
					   	  else if(t < 10.5 && t >= 9.4){
					   	  	return colors[7];
					   	  }
					   	  else if(t < 11.6 && t >= 10.5){
					   	  	return colors[8];
					   	  }
					   	  else if(t < 12.7 && t >= 11.6){
					   	  	return colors[9];
					   	  }
					   	  else if(t >= 12.7){
					   	  	return colors[10];
					   	  }
					   	  else{
					   	  	return colors[0];
					   	  }
					   })
					   .transition()
					   .delay(function(d, i){
					   	  return i *4;
					   })
					   .attr('width', w)
					   .attr('height', h);

					// draw legend
					var legend = svg.selectAll('.legend')
						.data(colors.reverse())
						.enter()
						.append('g')
						.attr('class', 'legend');

					legend.append('rect')
						.attr('class', 'legends')
						.attr('x', function(d, i){
							return width -(i *33) - 20;
						})
						.attr('y', height + margin.top + 15)
						.attr('width', 30)
						.attr('height', 15)
						.attr('fill', function(d, i){
							return colors[i];
						});

					legend.append('text')
						.attr('x', function(d, i){
							return width -(i *33) - 16;
						})
						.attr('y', height + margin.top + 45)
						.text(function(d, i){
							var arr = [0, 2.7, 3.9, 5, 6.1, 7.2, 8.3, 9.4, 10.5, 11.6, 12.7].reverse();
							return arr[i];
						});
			});
		/* Helpers */

		/* spin svg path */
		function spin(selection, duration) {
		    selection.transition()
		        .ease("linear")
		        .duration(duration)
		        .attrTween("transform", function() {
		            return d3.interpolateString("rotate(0)", "rotate(360)");
		        });

		    setTimeout(function() { spin(selection, duration); }, duration);
		}