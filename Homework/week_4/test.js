
d3.xml("test.svg", "image/svg+xml", function(error, xml) {

	// check for errors
    if (error) throw error;    
    document.body.appendChild(xml.documentElement);
 
    d3.select("svg")
    	.append("rect")
    	.attr("id", "kleur1")
    	.attr({
    		"x":13,
    		"y": 13.5,
    		"width":21,
    		"height":29 
    	})
    	.attr("class", "st1")
    	.style("fill", "#ccece6")

    d3.select("svg")
    	.append("rect")
    	.attr("id", "kleur2")
    	.attr({
    		"x":13,
    		"y": 57,
    		"width":21,
    		"height":29 
    	})
    	.attr("class", "st1")
    	.style("fill", "#99d8c9")

    d3.select("svg")
    	.append("rect")
    	.attr("id", "kleur3")
    	.attr({
    		"x":13,
    		"y": 96.8,
    		"width":21,
    		"height":29 
    	})
    	.attr("class", "st1")
    	.style("fill", "#66c2a4")

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
    
    d3.select("svg")
    	.append("rect")
    	.attr("id", "kleur5")
    	.attr({
    		"x":13,
    		"y": 178.6,
    		"width":21,
    		"height":29 
    	})
    	.attr("class", "st1")
    	.style("fill", "#238b45");

   	d3.select("svg")
    	.append("rect")
    	.attr({
    		"x":46.5,
    		"y": 178.6,
    		"width":119.1,
    		"height":29 
    	})
    	.attr("class", "st1");

    d3.select("svg")
    	.append("rect")
    	.attr("id", "kleur6")
    	.attr({
    		"x":13,
    		"y": 218.5,
    		"width":21,
    		"height":29 
    	})
    	.attr("class", "st1")
    	.style("fill", "#005824");


   	d3.select("svg")
    	.append("rect")
    	.attr({
    		"x":46.5,
    		"y": 218.5,
    		"width":119.1,
    		"height":29 
    	})
    	.attr("class", "st1");

	d3.select("svg")
    	.append("rect")
    	.attr("id", "kleur7")
    	.attr({
    		"x":13,
    		"y": 257.5,
    		"width":21,
    		"height":29 
    	})
    	.attr("class", "st1")
    	.style("fill", "#7f847f");


   	d3.select("svg")
    	.append("rect")
    	.attr({
    		"x":46.5,
    		"y": 257.5,
    		"width":119.1,
    		"height":29 
    	})
    	.attr("class", "st1");

	d3.select("svg")
    	.append("text")
    	.attr("id", "tekst1")
    	.attr({
    		"x":60,
    		"y": 35,
    	})
    	.text("100");

	d3.select("svg")
    	.append("text")
    	.attr("id", "tekst2")
    	.attr({
    		"x":60,
    		"y": 76,
    	})
    	.text("1000");

	d3.select("svg")
    	.append("text")
    	.attr("id", "tekst1")
    	.attr({
    		"x":60,
    		"y": 118,
    	})
    	.text("10000");

	d3.select("svg")
    	.append("text")
    	.attr("id", "tekst1")
    	.attr({
    		"x":60,
    		"y": 158,
    	})
    	.text("100000");

	d3.select("svg")
    	.append("text")
    	.attr("id", "tekst1")
    	.attr({
    		"x":60,
    		"y": 199,
    	})
    	.text("1000000");

   	d3.select("svg")
    	.append("text")
    	.attr("id", "tekst1")
    	.attr({
    		"x":60,
    		"y": 240,
    	})
    	.text("10000000");

	d3.select("svg")
    	.append("text")
    	.attr("id", "tekst1")
    	.attr({
    		"x":60,
    		"y": 279,
    	})
    	.text("Unknown Data");
});

