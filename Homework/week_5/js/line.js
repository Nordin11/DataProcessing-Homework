/*******************************/
/* Nordin Bouchrit 11050608 ***/
/*****************************/
function load() {

	// define margins 
	var margin = { top: 20, right: 20, bottom: 30, left: 50 },
		width = 960 - margin.right - margin.left,
		height = 500 - margin.top - margin.bottom;

	// define svg
	var svg = d3.select("#container").append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)	
	  .append("g")
		.attr("transform", 
			  "translate(" + margin.left + ',' + margin.right + ')');

	var parseTime = d3.timeParse("%b-%y");

	// Define color scales
    var colorScale = d3.scale.category10();

	// define the x y scales
	var xScale = d3.scaleTime()
		.range([0, width]);
		
	var yScale = d3.scaleLinear()
		// make sure the height goes upwards in stead of top to bottom
		.range([height, 0]);

	// define lines
	var priceline = d3.line()
		.xScale(function(d) { return xScale(d.Date); })
		.yScale(function(d) { return yScale(d.Price); });

	var lowline = d3.line()
		.xScale(function(d) { return xScale(d.Date); })
		.yScale(function(d) { return yScale(d.Low); });

	var highline = d3.line()
		.xScale(function(d) { return xScale(d.Date); })
		.yScale(function(d) { return yScale(d.High); });

	//import the data
	d3.csv("BTC USD Historical Data.csv", function(error, data){
		// check for errors
		if(error) console.log("Error: data not loaded")

		// convert data in proper format
		data.forEach(function(d) {
			d.Date = parseTime(d.Date);
			d.High = +d.High;
			d.Price = +d.Price;
			d.Low = +d.Low;
		});	

	
		console.log(d.Date);

		// specify the domains of xscale yscale
		xScale.domain(d3.extent(data, function(d) { return d.Date; }) );
		yScale.domain([ 
			d3.min(data, function(d) { return d.Low; }),
			d3.max(data, function(d) { return d.High; })
		]);

		// Add xAxis to svg       
    	svg.append("g")
	    	.attr("class", "x axis")
	        .attr("transform", "translate(0," + height + ")") 
	        .call(xAxis)
	        .style("font-size", "11px")
		
		// Add yAxis to svg 
		svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .style("font-size", "11px")
           .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 15) 
            .style("text-anchor", "end")
            .text("Price ($)");

	});
}






