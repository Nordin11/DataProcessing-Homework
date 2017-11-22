/*******************************/
/* Nordin Bouchrit 11050608 ***/
/*****************************/
function load() {

	// define margins 
	var margin = { top: 20, right: 20, bottom: 30, left: 40 },
                  width  = 960 - margin.left - margin.right,
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

		
	// Define color scales
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

		// Add xAxis to svg       
    	svg.append("g")
	    	.attr("class", "x axis")
	        .attr("transform", "translate(0," + height + ")") 
	        .call(xAxis)
	        .style("font-size", "11px")
	       // add x axis label
	       .append("text")
	        .attr("class", "label")
	        .attr("x", width) 
	        .attr("y", -6)    
	        .style("text-anchor", "end") 
	        .text("GDP");
		
		// Add yAxis to svg 
		svg.append("g")
            .attr("class", "y axis")
            .style("font-size", "11px")
            .call(yAxis)
           .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 15) 
            .style("text-anchor", "end")
            .text("Happiness Score");

  		// Add the tooltip container to the vis container
        // it's invisible and its position/contents are defined during mouseover
        var tooltip = d3.select("#vis-container").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // tooltip mouseover event handler
        var tipMouseover = function(d) {
            var color = colorScale(d.Country);
            var html  = d.Country + "<br/>" +
                          "<span style='color:" + color + ";'>" + d.Country + "</span><br/>" +
                          "<b>" + d.Score + "</b> Happiness Score, <b/>" + d.GDP + "</b> GDP";

            tooltip.html(html)
                .style("left", (d3.event.pageX + 15) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
               .transition()
                .duration(200) 
                .style("opacity", 1) 

        };
        
        // tooltip mouseout event handler
        var tipMouseout = function(d) {
            tooltip.transition()
                .duration(300)
                .style("opacity", 0);
        };

		// Add data points!
        svg.selectAll(".dot")
            .data(data)
           .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 5.5) // radius size, could map to another data dimension
            .attr("cx", function(d) { return xScale( d.GDP ); })     // x position
            .attr("cy", function(d) { return yScale( d.Score ); })  // y position
            .style("fill", function(d) { return colorScale(d.Country); })
            .on("mouseover", tipMouseover)
            .on("mouseout", tipMouseout);
	});

}