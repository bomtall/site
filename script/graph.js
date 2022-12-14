
//-----------------------------------------------------------Small Functions-------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function selectPlot() {

    let plot = document.querySelector('input[name="selectPlot"]:checked').value
    if (plot == "line") {
        changeGraph();
    } else if (plot == "circle") {
        drawCircle()
    } else { oneOverX() }

}

function getSignVals() {
    signVal = 1;
    xSignVal = 1

    if (neg.checked == true) {
        signVal = -1;
    }

    if (xNeg.checked == true) {
        xSignVal = -1
    }

    if (doubleNeg.checked == true) {
        signVal = -1
        xSignVal = -1
    }

    return [signVal, xSignVal]
}

function plotArea(radio) {
    if (radio.value == "show") {
        circle
            .style('fill', 'lightgreen')
    } else {
        circle
            .style('fill', 'none')

    }
}

//---------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------SVG Initialisation---------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//

// set margins and size of plot
var margin = { top: 10, right: 10, bottom: 10, left: 10 };
var plot = { width: 700, height: 700 };

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("viewBox", `0 0 ${plot.width + margin.left + margin.right} ${plot.height + margin.top + margin.bottom}`)
    // .attr("width", plot.width + margin.left + margin.right)
    // .attr("height", plot.height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
    ;

//Create a rect on top of the svg area: this rectangle recovers mouse position
svg
    .append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', plot.width)
    .attr('height', plot.height)
    .on('mouseover', loc_mouseover)
    .on('mousemove', loc_mousemove)
    .on('mouseout', loc_mouseout)
    ;



//------------------------------------------------------------Tooltips-------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//


var focusText = svg
    .append('g')
    .append('text')
    .style("opacity", 0)
    .attr("text-anchor", "left")
    .attr("alignment-baseline", "middle")
    ;

var tooltip = d3.select('body')
    .append('div')
    .style('position', 'absolute')
    .style('padding', '1px, 10px')
    .style('background', 'white')
    .style('opacity', 0)
    ;

function loc_mouseover() {
    focusText
        .style('opacity', 1)
}

function loc_mousemove() {

    let xco, yco;

    if (x.invert(d3.mouse(this)[0]) != undefined) {
        xco = x.invert(d3.mouse(this)[0]).toFixed(2);
    } else { xco = 0; }

    if (y.invert(d3.mouse(this)[1]) != undefined) {
        yco = y.invert(d3.mouse(this)[1]).toFixed(2);
    } else { yco = 0; }


    focusText
        .html("x:" + xco + "  ,  " + "y:" + yco)
        .attr("x", d3.mouse(this)[0] + 15)
        .attr("y", d3.mouse(this)[1] + 15)
}

function loc_mouseout() {
    focusText
        .style('opacity', 0);
}

//-------------------------------------------------------Scales & Axes-------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//

// X scale function
var x = d3.scaleLinear()
    .domain([-100, 100])
    .range([0, plot.width]);

// Adding the x axis
svg.append("g")
    .attr("transform", "translate(0," + (plot.height) / 2 + ")")
    .call(d3.axisBottom(x));

// Y scale function
var y = d3.scaleLinear()
    .domain([-100, 100])
    .range([plot.height, 0]);

// Adding the y axis
svg.append("g")
    .attr("transform", "translate(" + (plot.width) / 2 + ")")
    .call(d3.axisLeft(y));


//-----------------------------------------------------------Grid------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//

const xAxisGrid = d3.axisBottom(x).tickSize(-plot.width).tickFormat('').ticks(10);
const yAxisGrid = d3.axisLeft(y).tickSize(-plot.height).tickFormat('').ticks(10);

svg.append('g')
    .attr('class', 'axis-grid')
    .attr('transform', 'translate(0,' + plot.height + ')')
    .call(xAxisGrid)
    .attr('opacity', 0.05)
svg.append('g')
    .attr('class', 'axis-grid')
    .attr('opacity', 0.05)
    .call(yAxisGrid);


//-----------------------------------------------------------Global Variables------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//

var path = svg.append("path");
var path2 = svg.append("path");
var circle = svg.append("circle");

var pos = document.getElementById('positive')
var neg = document.getElementById('negative')
var xNeg = document.getElementById('xNegative')
var doubleNeg = document.getElementById("doubleNegative")
pos.checked = true;

var shiftX = document.getElementById("sliderX");
var shiftY = document.getElementById("sliderY");
var exponent = document.getElementById("sliderExp");
var multVal = document.getElementById("sliderMult");
var output = document.getElementById("plottedFunction");

rScale = d3.scaleLinear()
    .domain([0, 200])
    .range([0, plot.width]);


//---------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------Draw Functions-------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//


//-----------------------------------------------------------Plot Circles----------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//

function drawCircle() {

    $("#lineControls").hide()
    $("#shifts").show();
    $("#circleControls").show("slow", "swing");

    path
        .attr("fill", "none")
        .attr("stroke", "none")
    path2
        .attr("fill", "none")
        .attr("stroke", "none")

    let r = document.getElementById("sliderR").value
    let xCentre = document.getElementById("xCentre").value
    let yCentre = document.getElementById("yCentre").value

    if (xCentre > 0) {
        signVal1 = "";
    } else { signVal1 = " + " }

    if (yCentre > 0) {
        signVal2 = "";
    } else { signVal2 = " + " }



    circle
        .attr('cx', x(xCentre))
        .attr('cy', y(yCentre))
        .attr('r', rScale(r))
        .style('fill', 'none')
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        ;

    output.innerHTML = `$$f(x) = (x ${signVal1}${xCentre * -1})^2 + (y ${signVal2}${yCentre * -1})^2 = ${r}^2$$`;

    MathJax.typeset();

    let area = document.getElementById("showArea")

    if (area.checked == true) {
        plotArea(area)
    }


}

//------------------------------------------------------Plot Lines-----------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//
function changeGraph() {

    $("#circleControls").hide();
    $("#shifts").show();
    $("#lineControls").show("slow", "swing")


    svg.select('circle')
        .attr("fill", "none")
        .attr("stroke", "none")
    path2
        .attr("fill", "none")
        .attr("stroke", "none")

    let xShift = document.getElementById("sliderX").value,
        yShift = document.getElementById("sliderY").value,
        xMult = document.getElementById("sliderMult").value,
        exp = document.getElementById("sliderExp").value,

        signs = getSignVals();

    // Number of coordinate pairs to generate    
    const numPoints = 1000;

    // 2d array to hold coordinate pairs
    const data = [];

    // loop to generate random x values and apply function f(x) to give y values
    for (let i = 0; i < numPoints; i++) {

        let xi = Math.random() * 100.00 * (Math.round(Math.random()) ? 1 : -1);

        let yi = signs[0] * (((((signs[1] * parseFloat(xi)) * parseFloat(xMult)) + (parseFloat(xShift))) ** parseFloat(exp)) + parseFloat(yShift));

        data.push([parseFloat(xi), parseFloat(yi)]);
    }

    let sign1 = ""
    let sign2 = ""

    if (xShift >= 0) {
        sign1 = "+"
    }

    if (yShift >= 0) {
        sign2 = "+"
    }

    output.innerHTML = `$$ f(x) = (${xMult}x ${sign1} ${xShift})^${exp} ${sign2} ${yShift}$$`;

    MathJax.typeset();



    data.sort(sortFunction);

    path
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return x(d[0]) })
            .y(function (d) { return y(d[1]) })
        )
        .on('mouseover', function (d) {
            d3.select(this)
                .style('stroke', "red")
                .attr("stroke-width", 3)
            tooltip
                .html(d3.mouse(d3.select('g')))
                .style('left', d3.event.pageX + 'px')
                .style('top', d3.event.pageY + 'px')
                .style('opacity', .9)


        })
        .on('mouseout', function (d) {
            d3.select(this)

                .transition()
                .delay(400)
                .duration(1000)
                .style('stroke', "steelblue")
                .attr("stroke-width", 1.5)
            tooltip
                .transition()
                .delay(400)
                .duration(1000)
                .style('opacity', 0)

        })

    d3.select('path').on('mouseover', function (d) {
        tooltip.html(d)
            .style('left', d3.event.pageX + 'px')
            .style('top', d3.event.pageY + 'px')
            .style('opacity', .9)
    })
}

//------------------------------------------------------------1/x------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//

function oneOverX() {
    $("#circleControls").hide();
    $("#lineControls").show("slow", "swing");
    $("#shifts").hide();


    svg.select('circle')
        .attr("fill", "none")
        .attr("stroke", "none")


    let xMult = document.getElementById("sliderMult").value,
        exp = document.getElementById("sliderExp").value,

        signs = getSignVals();

    const numPoints = 10000;
    const data1 = [];
    const data2 = [];
    for (let i = 0; i < numPoints; i++) {
        let xi = Math.random() * 100.0
        let yi1 = signs[0] * (1 / (xMult * (signs[1] * -xi)) ** parseFloat(exp))
        let yi2 = signs[0] * (1 / (xMult * (signs[1] * xi)) ** parseFloat(exp))

        data1.push([parseFloat(-xi), parseFloat(yi1)]);
        data2.push([parseFloat(xi), parseFloat(yi2)]);
    }

    data1.sort(sortFunction);
    data2.sort(sortFunction);

    path
        .datum(data1)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return x(d[0]) })
            .y(function (d) { return y(d[1]) })
        )

    path2
        .datum(data2)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d) { return x(d[0]) })
            .y(function (d) { return y(d[1]) })
        )

    let xm = xMult
    if (xMult == 1) {
        xm = ""
    }

    let xSign = ""
    let fSign = ""
    if (signs[1] < 0) {
        xSign = "-"
    }
    if (signs[0] < 0) {
        fSign = "-"
    }
    output.innerHTML = `$$ f(x) = ${fSign}\\frac{1} { ${xSign}${xm}x^${exp} } $$`;

    MathJax.typeset();

}


//------------------------------------------------------------Initial State--------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------//

$(document).ready(function () {

    $("#circleControls").hide();

    d3.select("#plotLineButton")
        .style("background", "lightgreen")
        ;

    $("#selectLine").prop("checked", "true");

    document.getElementById("1/xLabel").innerHTML = "\\( \\frac{1}{x} \\)"

    MathJax.typeset();

    changeGraph();

})


