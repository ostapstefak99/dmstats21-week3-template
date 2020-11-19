
// SVG Size
var width = 700,
	height = 500;

var regions = [];


// Load CSV file
d3.csv("data/wealth-health-2014.csv", function(data){

	// Analyze the dataset in the web console
	console.log(data);
	console.log("Countries: " + data.length)

	var preparedData = prepareData(data);

	createVisualization(preparedData);

});



var prepareData = function(data) {
	// Step 1: Analyze and prepare the data
	// Use the web console to get a better idea of the dataset
	// Convert numeric values to numbers.
	// Make sure the regions array has the name of each region

	//making sure regions array has name of each region

	data.forEach(
		function (d) {
			if (!(regions.includes(d.Region))) {
				regions.push(d.Region)
			};
			//converting numeric values to numbers
			d.Income = +(d.Income);
			d.LifeExpectancy = +(d.LifeExpectancy);
			d.Population = +(d.Population);
		}
	)

	/*
	for (const elt of data) {
		if (!(regions.includes(elt.Region))) {
			regions.push(elt.Region)
		};
		//converting numeric values to numbers
		elt.Income = +(elt.Income);
		elt.LifeExpectancy = +(elt.LifeExpectancy);
		elt.Population = +(elt.Population);
	};
	*/

	//checking to see all is ok
	console.log(regions);
	console.log(data);
	return (data);
}



var createVisualization = function(data) {
	// Step 2: Append a new SVG area with D3
	// The ID of the target div container in the html file is #chart-area
	// Use the margin convention with 50 px of bottom padding and 30 px of padding on other sides!


	var compFunc = function(a,b) {
		if (a.Population > b.Population) {
			return -1
		} else if (a.Population < b.Population) {
			return 1
		} else {
			return 0
		}
	}

	data.sort(compFunc);

	var margin = {top: 30, right: 30, bottom: 50, left: 30};

	var svg = d3.select("#chart-area")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.bottom + margin.top)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	// Step 3: Create linear scales by using the D3 scale functions
	// You will need an income scale (x-axis) and a scale function for the life expectancy (y-axis).
	// Call them incomeScale and lifeExpectancyScale.
	// Use d3.min() and d3.max() for the input domain
	// Use the variables height and width for the output range


	var incomeScale = d3.scaleLinear()
		.domain([d3.min(data, function (d) {return d.Income})-1000,
				d3.max(data, function (d) {return d.Income})+1000])
		.range([0, width]);


	var lifeExpectancyScale = d3.scaleLinear()
		.domain([d3.min(data, function (d) {return d.LifeExpectancy})-2,
				d3.max(data, function (d) {return d.LifeExpectancy})+2])
		.range([height, 0]);


	var linearColor = d3.scaleOrdinal()
		.domain(regions)
		.range(["darkgreen","lightgreen", "orange", "blue", "violet", "purple"]);


	// Step 4: Try the scale functions
	// You can call the functions with example values and print the result to the web console.

	console.log(lifeExpectancyScale(75));


	// Step 5: Map the countries to SVG circles
	// Use select(), data(), enter() and append()
	// Instead of setting the x- and y-values directly,
	// you have to use your scale functions to convert the data values to pixel measures

	var radiusScale = d3.scaleLinear()
		.domain([d3.min(data, function (d) {return d.Population}),
			d3.max(data, function (d) {return d.Population})])
		.range([4, 30]);


	svg.selectAll("circle").data(data).enter()
		.append("circle")
		.attr("cx", function (d) {return incomeScale(d.Income)})
		.attr("cy", function (d) {return lifeExpectancyScale(d.LifeExpectancy)})
		.attr("r", function (d) {return radiusScale(d.Population)})
		.attr("fill", function (d) {return linearColor(d.Region)})
		.attr("stroke", "white");

	// Step 6: Use your scales (income and life expectancy) to create D3 axis functions

	var xAxis = d3.axisBottom(incomeScale);
	var yAxis = d3.axisLeft(lifeExpectancyScale);


	// Step 7: Append the x- and y-axis to your scatterplot
	// Add the axes to a group element that you add to the SVG drawing area.
	// Use translate() to change the axis position

	svg.append("g")
		.attr("class", "axis")
		.attr("transform",  "translate(0," + (height) + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "axis")
		.call(yAxis);

	// Step 8: Refine the domain of the scales
	// Notice that some of the circles are positioned on the outer edges of the svg area
	// You can include buffer values to widen the domain and to prevent circles and axes from overlapping

	//DONE

	// Step 9: Label your axes

	svg.append("text").attr("x", 600)
		.attr("y", 530).text("Income per Person");


	svg.append("text").attr("x", 20)
		.attr("y", -10).attr("transform", "rotate(90)").text("Life Expectancy");

	// Step 10: Add a scale function for the circle radius
	// Create a population-dependent linear scale function. The radius should be between 4 - 30px.
	// Then use the scale function to specify a dynamic radius

	//DONE IN STEP 5

	// Step 11: Change the drawing order
	// Larger circles should not overlap or cover smaller circles.
	// Sort the countries by population before drawing them.

	//DONE EARLIER

	// Step 12: Color the circles (countries) depending on their regions
	// Use a D3 color scale

	//DONE EARLIER





}
