// function reload() {
//     location.reload();
// }

// window.addEventListener("resize", reload());




function dimensions() {
    let w = 0;
    let h = 0;
    if ($(window).width() < 500) {
        w = $(window).width();
        h = $(window).height() / 2;
    } else {
        w = $(window).width();
        h = 0.8 * $(window).height();
    }

    w = w - margin.left - margin.right;
    h = h - margin.top - margin.bottom

    return { width: w, height: h }

}

// set margins for graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 };
var plot = dimensions();

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", plot.width + margin.left + margin.right)
    .attr("height", plot.height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
    ;



//Create a rect on top of the svg area: this rectangle recovers mouse position
svg
    .append('rect')
    .attr('z-index', 1)
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', plot.width)
    .attr('height', plot.height)
    .on('mouseover', loc_mouseover)
    .on('mousemove', loc_mousemove)
    .on('mouseout', loc_mouseout)
    ;

var focusText = svg
    .append('g')
    .append('text')
    .style("opacity", 0)
    .style('color', "#30e8bf")
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
        .attr("stroke", "#ff8235")
}

function loc_mouseout() {
    focusText
        .style('opacity', 0);
}

// X Axis
var x = d3.scaleLinear()
    .domain([-100, 100])
    .range([0, plot.width]);

let xAxis = svg.append("g")
    .attr("transform", "translate(0," + (plot.height) / 2 + ")")
    .call(d3.axisBottom(x))

xAxis.selectAll(".tick line")
    .attr("stroke", "#ff8235");

xAxis.selectAll(".tick text")
    .attr("opacity", 0)

xAxis.select(".domain")
    .attr("stroke", "#ff8235")


// Y Axis
var y = d3.scaleLinear()
    .domain([-100, 100])
    .range([plot.height, 0])


let yAxis = svg.append("g")
    .attr("transform", "translate(" + (plot.width) / 2 + ")")
    .call(d3.axisLeft(y));

yAxis.selectAll(".tick line")
    .attr("stroke", "#ff8235");

yAxis.selectAll(".tick text")
    .attr("opacity", 0)

yAxis.select(".domain")
    .attr("stroke", "#ff8235")



var path = svg.append("path");


function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

const numPoints = 1000;
const data = [];
for (let i = 0; i < numPoints; i++) {
    let xi = Math.random() * 100.00 * (Math.round(Math.random()) ? 1 : -1);
    let yi = (Math.sin(0.1 * xi) * 50) - 20
    data.push([parseFloat(xi), parseFloat(yi)]);
}

data.sort(sortFunction);



path
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#ff8235")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function (d) { return x(d[0]) })
        .y(function (d) { return y(d[1]) })
        .curve(d3.curveCatmullRom.alpha(.5))
    )




const length = path.node().getTotalLength();

function repeat() {
    // Animate the path by setting the initial offset and dasharray and then transition the offset to 0
    path.attr("stroke-dasharray", length + " " + length)
        .attr("stroke-dashoffset", length)
        .transition()
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)
        .duration(6000)
        // .on("end", () => setTimeout(repeat, 1000)); // this will repeat the animation after waiting 1 second
        .on("end", () => repeat())
}

repeat();