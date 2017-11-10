
// Name: Nordin Bouchrit
// Student number: 11050608

// call function load when body is loaded compeletely
function load() {
    
    // load the textarea data
	var rawdata = document.getElementById('rawdata').value

	// split data over the enters
	var rawdata = rawdata.split("\n");

	// remove the empty row
	rawdata.splice(rawdata.lenght-1, 1);

	// create two arrays
	var date = []
	var temperature = []

	// split after comma and push to array
	for (var i = 0; i < rawdata.length; i++)
	{
		var splitdata = rawdata[i].split(",");
		// fill array's
		date.push(splitdata[0]);
		temperature.push(splitdata[1]);
		// remove spaces from date
		date[i] = date[i].trim();
	};

	// convert string to number
	for (var i = 0; i < temperature.length; i++)
	{
		temperature[i] = parseFloat(temperature[i]);
	};

    // count days
 	var days_counter = 0;
 	for (var i = 0; i < date.length; i++)
 	{
 		days_counter++;
 	}
	
 	// initialize canvas
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	
	// initialize max and min of both array's
	var temp_MAX = 254;
	var temp_MIN = -33; 
	var date_MIN = 0;
	var date_MAX = days_counter;

	// initialize x range and y range
	var y_range_MAX = 500;
	var y_range_MIN = 0;
	var x_range_MIN = 0;
	var x_range_MAX = 800;

	// declare domain and range for yaxis and xaxis
	var y_domain = [temp_MIN, temp_MAX];
	var y_range = [y_range_MIN, y_range_MAX];
	var x_domain = [0, days_counter]
	var x_range = [x_range_MIN, x_range_MAX]
	
	//create a layer
	var layer = 50

	// the width and height of the plot
	var plot_width = days_counter + 2*layer;
    var plot_height = y_range_MAX - y_range_MIN + 2*layer;

    canvas.width = plot_width 
    canvas.height = plot_height 

	// call function as the navigator 
	y_axis = createTransform(y_domain, y_range);
	x_axis = createTransform(x_domain, x_range);

	// write the plot
    for (var i = 0; i < temperature.length; i++)
    {
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 0.7;
    ctx.moveTo(i + layer, plot_height - layer - y_axis(temperature[i]));
    ctx.lineTo(i + layer, plot_height - layer - y_axis(temperature[i + 1]));
    ctx.stroke(); 
	};

    // write the x axis
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(layer, y_range_MAX);
    ctx.lineTo(plot_width - layer, y_range_MAX);
    ctx.stroke();

    // write the y axis
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(layer, layer);
    ctx.lineTo(layer, plot_height - layer);
    ctx.stroke();

    ////////////////FUNCTIONS/////////////////

	// create a transform function
	function createTransform(domain, range){
	// domain is a two-element array of the data bounds [domain_min, domain_max]
	// range is a two-element array of the screen bounds [range_min, range_max]
	// this gives you two equations to solve:
	// range_min = alpha * domain_min + beta
	// range_max = alpha * domain_max + beta
 	// a solution would be:

    var domain_min = domain[0]
    var domain_max = domain[1]
    var range_min = range[0]
    var range_max = range[1]

    // formulas to calculate the alpha and the beta
   	var alpha = (range_max - range_min) / (domain_max - domain_min)
    var beta = range_max - alpha * domain_max

    // returns the function for the linear transformation (y= a * x + b)
    return function(x)
    {
    	return alpha * x + beta;
    };
}

};