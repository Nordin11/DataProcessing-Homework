/*******************************/
/* Nordin Bouchrit 11050608 ***/
/*****************************/
function load() {

	// define margins 
	var margin = { top: 20, right: 20, bottom: 30, left: 40 },
                  width  = 960 - margin.left - margin.right,
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

	var rect = svg.append("rect")
				.attr("width", 100)
				.attr("height", 100)
				.attr("fill", "blue");
		
	// Define our scales
    var colorScale = d3.scale.category10();

	// define the x y scales
	var xScale = d3.scale.linear()
		.range([0, width]);
			
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
	d3.csv("World_Happiness_GDP_2017.csv", function(error, data){

		// check for errors
		if(error) console.log("Error: data not loaded")

		// convert data in proper format
		data.forEach(function(d) {
			d.Score = +d.Score;
			d.GDP = +d.GDP;
		});

	// specify the domains of xscale yscale
	xScale.domain([0, d3.max(data, function(d) { return d.GDP; }) ] );
	yScale.domain([0, d3.max(data, function(d) { return d.Score; }) ] );

	// Add x-axis to the canvas            
    svg.append("g")
    	.attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")") 
        .call(xAxis)
       // add x axis label
       .append("text")
        .attr("class", "label")
        .attr("x", width) 
        .attr("y", -6)    
        .style("text-anchor", "end") 
        .text("GDP");
        
};
