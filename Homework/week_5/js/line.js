/*******************************/
/* Nordin Bouchrit 11050608 ***/
/*****************************/
function load() {

	// define margins 
	var margin = { top: 20, right: 10, bottom: 100, left: 40 },
		width = 900 - margin.right - margin.left,
		height = 500 - margin.top - margin.bottom;

	// define svg
	var svg = d3.select("#container")
		.append("svg")
		// group attributes together
		.attr ({
			"width": width + margin.right + margin.left,
			"height": height + margin.top + margin.bottom
		})
			.append("g")
				.attr("transform", "translate(" + margin.left + ',' + margin.right + ')');

	// Define color scale
    var color = d3.scaleOrdinal(d3.SchemeCategory10);

    // parse date
	var DateParse = d3.timeParse("%B %Y");

	// define the x y scales
	var xScale = d3.scaleTime()
		.range([0,width]);
		
	var yScale = d3.scaleLinear()
		// make sure the height goes upwards in stead of top to bottom
		.range([height, 0]);

	// Define the lines
	var priceline = d3.line()	
    	.xScale(function(d) { return xScale(d.Date); })
    	.yScale(function(d) { return yScale(d.Price); });

	var highline = d3.line()	
    	.xScale(function(d) { return xScale(d.Date); })
    	.yScale(function(d) { return yScale(d.High); });

    var lowline = d3.line()
    	.xScale(function(d) { return xScale(d.Date); })
    	.yScale(function(d) { return yScale(d.Low); });

	//import the data
	d3.csv("BTC USD Historical Data.csv", function(error, data){
		
		// check for errors
		if(error) console.log("Error: data not loaded")

		// convert data in proper format
		data.forEach(function(d) {
			d.Date = DateParse(d.date);
			d.High = +d.High;
			d.Price = +d.Price;
			d.Low = +d.Low;
		});	

		// specify the domains of xscale yscale
		xScale.domain(d3.extent(date, function(d) { return d.Date; }));
		yScale.domain( [ 0, d3.max(data, function(d) { return d.High; }) ] );

		// Add xAxis to svg       
    	svg.append("g")
	    	.attr("class", "x axis")
	        .attr("transform", "translate(0," + height + ")") 
	        .call(d3.axisBottom(x))

		// Add yAxis to svg 
		svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .style("font-size", "11px")
        	.call(d3.axisLeft(y));

	});
}






