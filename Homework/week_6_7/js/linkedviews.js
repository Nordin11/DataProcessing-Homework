/*******************************/
/* Nordin Bouchrit 11050608 ***/
/*****************************/
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

	/* d3.queue()
	.defer(d3.csv, "Werkloosheid.csv")
	.defer(d3.csv, "Economische activiteit.csv")
	.await(firstready) */

	d3.csv("Werkloosheid.csv", function (error, data) {

		// check for errors
		if(error) console.log("Error: data not loaded")

		data.forEach(function(d) {
			d.Werklozen = +d.Werklozen
		});

		// specify the domains of xscale yscale
		xScale.domain(data.map(function(d) { return d.Perioden; }) );
		yScale.domain([0, d3.max(data, function(d) { return d.Werklozen; }) ] );

		// Add tooltip
        var tooltip = d3.select("#container").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // tooltip Mouse Over info
        var tipMouseover = function(d) {
            var html  = d.Country + "<br/>" +
            			"<span style='color:'red';'>" + d.Perioden + "</span><br/>" +
                        "<b>" + d.Werklozen + "</b>"; 
            tooltip.html(html)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
               .transition()
                .duration(400) 
                .style("opacity", 1); 
        };

        // tooltip mouseout event handler
        var tipMouseout = function(d) {
            tooltip.transition()
                .duration(300)
                .style("opacity", 0); 
        };

        // draw the bars
		svg.selectAll("rect")
			.data(data)
			.enter()
			.append("rect")
			.attr({
				"x": function(d) { return xScale(d.Perioden); },
				"y": function(d) { return yScale (d.Werklozen); },
				"width": xScale.rangeBand(),
				"height": function(d) { return height - yScale(d.Werklozen); }
			})
			.attr("class", "barcolor")
			.on("mouseover", tipMouseover)
            .on("mouseout", tipMouseout);

		// draw xAxis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.style("font-size", "13px")
			.style("fill", "#000");

		// draw yAxis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.style("font-size", "13px")
			.style("fill", "#000")

		// lable the bars
		svg.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.text(function (d) { return d.Werklozen; })
			.attr("x", function(d) { return xScale(d.Perioden) + xScale.rangeBand() / 2; })
			.attr("y", function(d) { return yScale (d.Werklozen) + 20; })
			.attr("class", "lable")
			.style("text-anchor", "middle")
			.style("color", "#000");


	});
};