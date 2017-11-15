function load() {

	// define margins 
	var margin = { top: 20, right: 10, bottom: 100, left: 40 },
		width = 700 - margin.right - margin.left,
		height = 500 - margin.top - margin.bottom;

	// define svg
	var svg = d3.select("body")
		.append("svg")
		// group attributes together
		.attr ({
			"width": width + margin.right + margin.left,
			"height":height + margin.top + margin.bottom
		})
			.append("g")
				.attr("transform", "translate(" + margin.left + ',' + margin.right + ')');

	// define the x y scales
	var xScale = d3.scale.ordinal()
		.rangeRoundBands([0,width], 0.2, 0.2);
		
	var yScale = d3.scale.linear()
		// make sure the height goes upwards in stead of top to bottom
		.range([height, 0]);

	// define x and y axis
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");


	//import the data
	d3.csv("KNMIDATA2016.csv", function(error, data){
		
		// check for errors
		if(error) console.log("Error: data not loaded")

		// convert data in proper format
		data.forEach(function(d) {
			d.temp = +d.temp;
			d.month = d.month;
		});

		// sort the data for design purposes
		data.sort(function(a,b) {
			return b.temp - a.temp;

		});

		// the data loaded one empty "NaN" value at the end of my array
		// I couldn't find the reason why this happened so I just popped it
		data.pop();		

		// specify the domains of xscale yscale
		xScale.domain(data.map(function(d) { return d.month; }) );
		yScale.domain([0, d3.max(data, function(d) { return d.temp; }) ] );

		// draw the bars
		svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr({
				"x": function(d) { return xScale(d.month); },
				"y": function(d) { return yScale (d.temp); },
				"width": xScale.rangeBand(),
				"height": function(d) { return height - yScale(d.temp); }
			})
			.attr("class", "barcolor");

		// lable the bars
		svg.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.text(function (d) { return d.temp; })
			.attr("x", function(d) { return xScale(d.month) + xScale.rangeBand() / 2; })
			.attr("y", function(d) { return yScale (d.temp) + 20; })
			.style("fill", "#005e49")
			.style("text-anchor", "middle");

		// draw xAxis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.style("font-size", "13px")
			.style("fill", "#fff");

		// draw yAxis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.style("font-size", "13px")
			.style("fill", "#fff")
			// name the yAxis
			.append("text")
			.attr("transform", "rotate(-90)")
			.style("text-anchor", "end")
			.attr("y", 30)
			.attr("x", -70)
			.style("font-size", "12px")
			.style("fill", "#005e49")
			.text("Average Temperature");

	});
}