


// $(window).on("resize", function () {
//     if ($(window).width() < 600) {
//         d3.select("svg").remove();

//         changeGraph();
//     }
// });


// function makeSVG(w, h){
//     var margin = { top: 10, right: 10, bottom: 10, left: 10 },
//     width = w - margin.left - margin.right,
//     height = h - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz")
//     // .attr("preserveAspectRatio", "xMinYMin meet")
//     // .attr("viewBox", "0 0 400 400")
//     // .classed("svg-content", true)
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")")

//     return svg
// }

// svg = makeSVG()



///-----------------------------------------------------------------------------------------------------------------------------------------------------
// set the dimensions and margins of the graph
let w = 0;
let h = 0;
if ($(window).width() < 500) {
    w = 300;
    h = 300;
} else {
    w = 400;
    h = 400;
}

var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    // .attr("preserveAspectRatio", "xMinYMin meet")
    // .attr("viewBox", "0 0 400 400")
    // .classed("svg-content", true)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")


    ;


//Create a rect on top of the svg area: this rectangle recovers mouse position
svg
    .append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', loc_mouseover)
    .on('mousemove', loc_mousemove)
    .on('mouseout', loc_mouseout)
    ;

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



    //let coord = [x.invert(d3.mouse(this)[0]).toFixed(2), y.invert(d3.mouse(this)[1]).toFixed(2)]


    focusText
        .html("x:" + xco + "  ,  " + "y:" + yco)
        .attr("x", d3.mouse(this)[0] + 15)
        .attr("y", d3.mouse(this)[1] + 15)
}

function loc_mouseout() {
    focusText
        .style('opacity', 0);
}


function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

// X Axis
var x = d3.scaleLinear()
    .domain([-100, 100])
    .range([0, width]);

svg.append("g")
    .attr("transform", "translate(0," + (height) / 2 + ")")
    .call(d3.axisBottom(x));


// Y Axis
var y = d3.scaleLinear()
    .domain([-100, 100])
    .range([height, 0]);

svg.append("g")
    .attr("transform", "translate(" + (width) / 2 + ")")
    .call(d3.axisLeft(y));



var path = svg.append("path")

var pos = document.getElementById('positive')
pos.checked = true;


var shiftX = document.getElementById("sliderX");
var shiftY = document.getElementById("sliderY");
var exponent = document.getElementById("sliderExp");
var multVal = document.getElementById("sliderMult");
var output = document.getElementById("sliderVals");

//------------------------------------------------------Update Transofrmation Graph---------------------------------------------------//
function changeGraph() {


    let xShift = document.getElementById("sliderX").value,
        yShift = document.getElementById("sliderY").value,
        xMult = document.getElementById("sliderMult").value,
        exp = document.getElementById("sliderExp").value,
        signVal = 0;

    if (pos.checked == true) {
        signVal = 1;
    } else { signVal = -1; }


    const numPoints = 1000;
    const data = [];
    for (let i = 0; i < numPoints; i++) {
        let xi = Math.random() * 100.0 * (Math.round(Math.random()) ? 1 : -1);
        let yi = signVal * ((((parseFloat(xi) * parseFloat(xMult)) + (parseFloat(xShift))) ** parseFloat(exp)) + parseFloat(yShift));

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

    output.innerHTML = `Function: $$ y = (${xMult}x ${sign1} ${xShift})^${exp} ${sign2} ${yShift}$$`;

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