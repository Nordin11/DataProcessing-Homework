
d3.xml("test.svg", "image/svg+xml", function(error, xml) {

	// check for errors
    if (error) throw error;    
    document.body.appendChild(xml.documentElement);

    console.log(d3.select("svg"))
    d3.select("svg")
    	.append("rect")
    	.attr("id", "kleur4")
    	.attr({
    		"x":13,
    		"y": 138.7,
    		"width":21,
    		"height":29 
    	})
    	.attr("class", "st1")
    	.style("fill", "#41ae76");
});

