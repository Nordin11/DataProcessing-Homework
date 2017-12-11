function load(){

	///// define variables for the map /////
	var margin = {top: 50, right: 15, bottom: 20, left: 20},
	            width = 1300 - margin.left - margin.right,
	            height = 750 - margin.top - margin.bottom;

	var color = d3.scale.threshold()
	    .domain([10000,100000,500000,1000000,5000000,10000000,50000000,100000000,500000000,1500000000])
	    .range(["rgb(214, 206, 201)", "rgb(214, 193, 179", "rgb(214, 179, 156)", "rgb(209, 166, 138)", "rgb(193, 152, 125)", "rgb(206, 132, 72)","rgb(214, 125, 53)","rgb(158, 102, 18)","rgb(114, 72, 9)","rgb(145, 97, 24)"]);

	var path = d3.geo.path();

	var svg = d3.select("body")
	            .append("svg")
	            .attr("width", width)
	            .attr("height", height)
	            .append('g');

	var projection = d3.geo.mercator()
	                   .scale(150)
	                  .translate( [width / 2, height / 1.5]);

	var path = d3.geo.path().projection(projection);

	///// DEFINE VARIABLES FOR SCATTER /////

	// define margin for scatter
	var scatter_margin = { top: 20, right: 20, bottom: 30, left: 40 },
					scatter_width = 800 - scatter_margin.left - scatter_margin.right,
					scatter_height = 900 - scatter_margin.top - scatter_margin.bottom;

	// define the x y scales
  	var xScale = d3.scale.linear()
    	.range([0, scatter_width]);
      
  	var yScale = d3.scale.linear()
    	// make sure the height goes upwards in stead of top to bottom
    	.range([scatter_height, 0]);

  	// define x and y axis
  	var xAxis = d3.svg.axis()
    	.scale(xScale)
    	.orient("bottom");

  	var yAxis = d3.svg.axis()
    	.scale(yScale)
    	.orient("left");

	// define svg for scatter
	var scatter_svg = d3.select("#main-container")
	  .append("svg")
	    // group attributes together
	    .attr ({
	      "width": scatter_width + scatter_margin.right + scatter_margin.left,
	      "height": scatter_height + scatter_margin.top + scatter_margin.bottom
	    })
	      .append("g")
	        .attr("transform", "translate(" + scatter_margin.left + ',' + scatter_margin.right + ')');

	queue()
	    .defer(d3.json, "world_countries.json")
	    .defer(d3.tsv, "world_population.tsv")
	    .defer(d3.csv, "world_happiness.csv")
	    .await(ready);

	function ready(error, data, population, happy) {
	  
		if (error) throw error;

		var populationById = {};

		population.forEach(function(d) { populationById[d.id] = +d.population; });

		happy.forEach(function(d) {
			d.GDP = +d.GDP
		  	d.score = +d.score
		});

		// Set tooltips
		var tip = d3.tip()
	          .attr('class', 'd3-tip')
	          .offset([-10, 0])
	          .html(function(d) {
	            return "<strong>Country: </strong><span class='tip-content'>" + d.properties.name + 
	              "<br></span>";
	        });

	   	svg.call(tip);

		// draw world map
		svg.append("g")
		    .attr("class", "countries")
		   .selectAll("path")
		    .data(data.features)
		   .enter().append("path")
		    .attr("d", path)
		    .style("fill", function(d) { return color(populationById[d.id]); })
		    .style('stroke', 'white')
		    .style('stroke-width', 1.5)
		    .style("opacity",0.8)
		      // tooltips
		      .style("stroke","white")
		      .style('stroke-width', 0.3)
		        .on('mouseover',function(d){
		          d3.select(this)
		          	.attr("fill", "orange")
		            .style("opacity", 1)
		            .style("stroke","white")
		            .style("stroke-width",3);
		            tip.show(d);
		        })
		        .on('mouseout', function(d){
		          d3.select(this)
		          	.style("fill", function(d) { return color(populationById[d.id]); })
		            .style("opacity", 0.8)
		            .style("stroke","white")
		            .style("stroke-width",0.3);
		            tip.hide(d);

		        });

	    // specify the domains of xscale yscale
	    xScale.domain([0, d3.max(happy, function(d) { return d.GDP; }) + 0.2 ] );
	    yScale.domain([0, d3.max(happy, function(d) { return d.score; }) + 1 ] );

	    // Add xAxis to svg       
	    scatter_svg.append("g")
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
	    scatter_svg.append("g")
	        .attr("class", "y axis")
	        .call(yAxis)
	        .style("font-size", "11px")
	        // add x axis label
	       .append("text")
	        .attr("class", "label")
	        .attr("transform", "rotate(-90)")
	        .attr("y", 15) 
	        .style("text-anchor", "end")
	        .text("Happiness Score");

	    // Add path
		svg.append("path")
		    .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
		    // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
		    .attr("class", "names")
		    .attr("d", path);
		};
};
	 
