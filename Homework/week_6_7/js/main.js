function load(){

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
	            .append('g')
	            .attr('class', 'map');

	var projection = d3.geo.mercator()
	                   .scale(150)
	                  .translate( [width / 2, height / 1.5]);

	var path = d3.geo.path().projection(projection);

	// Set tooltips
	var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='tip-content'>" + d.properties.name + 
              "<br></span>" + "<strong>Population:</strong><span class='tip-content'>" + d.properties.population +"</span>";
            })

	svg.call(tip);

	queue()
	    .defer(d3.json, "world_countries.json")
	    .defer(d3.tsv, "world_population.tsv")
	    .await(ready);

	function ready(error, data, population) {
	  var populationById = {};

	  population.forEach(function(d) { populationById[d.id] = +d.population; });

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

	  svg.append("path")
	      .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
	       // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
	      .attr("class", "names")
	      .attr("d", path);
	}
};
	 
