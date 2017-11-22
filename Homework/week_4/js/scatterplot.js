/*******************************/
/* Nordin Bouchrit 11050608 ***/
/*****************************/
function load() {

	// define margins 
	var margin = { top: 20, right: 20, bottom: 30, left: 40 },
                  width  = 880 - margin.left - margin.right,
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
	d3.csv("World_Happiness_GDP_2017.csv", function(error, data) {

		// check for errors
		if(error) console.log("Error: data not loaded")

		// convert data in proper format
		data.forEach(function(d) {
			d.Score = +d.Score;
			d.GDP = +d.GDP;
		});

		// specify the domains of xscale yscale
		xScale.domain([0, d3.max(data, function(d) { return d.GDP; }) + 0.2 ] );
		yScale.domain([0, d3.max(data, function(d) { return d.Score; }) + 1 ] );

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
	        .text("GDP per capita");
		
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
            .text("Happiness Score");

        // Add tooltip
        var tooltip = d3.select("#container").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // tooltip Mouse Over info
        var tipMouseover = function(d) {
            var color = colorScale(d.Country);
            var html  = d.Country + "<br/>" +
            			"<span style='color:" + colorScale + ";'>" + d.Continent + "</span><br/>" +
                        "<b>" + d.Score + "</b> Happiness Score, <b/>" + d.GDP + "</b> GDP"; 
            tooltip.html(html)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
               .transition()
                .duration(400) 
                .style("opacity", 1) 
        };
        
        // tooltip mouseout event handler
        var tipMouseout = function(d) {
            tooltip.transition()
                .duration(300)
                .style("opacity", 0);
        };

		// Add data points
        svg.selectAll(".dot")
            .data(data)
           .enter().append("circle")
            .attr("class", "data")
            .attr("r", 5) 
            .attr("cx", function(d) { return xScale( d.GDP ); })   
            .attr("cy", function(d) { return yScale( d.Score ); }) 
            .style("fill", function(d) { return colorScale( d.Continent ); })
            .on("mouseover", tipMouseover)
            .on("mouseout", tipMouseout);
  		
        // Add legend
  		var legend = svg.selectAll(".legend")
      		.data(colorScale.domain())
    		.enter().append("g")
      		.attr("class", "legend")
      		.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
      	
  		legend.append("rect")
      		.attr("x", width - 15)
      		.attr("width", 15)
      		.attr("height", 15)
      		.style("fill", colorScale);

  		legend.append("text")
      		.attr("x", width - 26)
      		.attr("y", 9)
      		.attr("dy", ".35em")
      		.style("text-anchor", "end")
      		.text(function(d) { return d; });
	});

};