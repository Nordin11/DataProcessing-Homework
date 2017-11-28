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

	// define the x y scales
	var x = d3.scaleTime()
		.range([0, width]);
		
	var y = d3.scaleLinear()
		// make sure the height goes upwards in stead of top to bottom
		.range([height, 0]);

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
		
		data.forEach(function(d){
			console.log(typeof(d.Price))
		});
		

		// define lines
		var priceline = d3.line()
			.x(function(d) { return x(d.Date); })
			.y(function(d) { return y(d.Price); });

		var lowline = d3.line()
			.x(function(d) { return x(d.Date); })
			.y(function(d) { return y(d.Low); });

		var highline = d3.line()
			.x(function(d) { return x(d.Date); })
			.y(function(d) { return y(d.High); });

		// specify the domains of xscale yscale
		x.domain(d3.extent(data, function(d) { return d.Date; }) );
		y.domain([0, d3.max(data, function(d) {
			return Math.max(d.High) })]);

        // add lines
        svg.append("path")
        	.data([data])
        	.attr("class", "line")
        	.style("stroke", "blue")
        	.attr("d", priceline);

        // add lines
        svg.append("path")
        	.data([data])
        	.attr("class", "line")
        	.style("stroke", "green")
        	.attr("d", highline);

        // add lines
        svg.append("path")
        	.data([data])
        	.attr("class", "line")
        	.style("stroke", "red")
        	.attr("d", lowline);

		// Add xAxis to svg       
    	svg.append("g")
	    	.attr("class", "x axis")
	        .attr("transform", "translate(0," + height + ")") 
	        .call(d3.axisBottom(x))
	        .style("font-size", "11px");
		
		// Add yAxis to svg 
		svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y))
            .style("font-size", "11px")
           .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 15) 
            .style("text-anchor", "end")
            .text("Price ($)");


	});
}






