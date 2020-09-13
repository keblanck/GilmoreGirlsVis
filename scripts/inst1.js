var margin = {
    top: 10,
    right: 20,
    bottom: 20,
    left: 20
};

// create our SVG canvas and give it the height and width we want
var i1Svg = d3.select('#inst1').append('svg')
    .attr('class', 'first')
    .attr('width', window.innerWidth)
    .attr('height', 80)
    .attr('text-anchor', 'middle')
    .style("font", "10px sans-serif");
// height and width of our chart

var inst1 = i1Svg.append('g')
        .attr('fill', '#585858')
        .attr('font-weight', 'light')
        .attr('text-anchor', 'start')
        .attr('transform', 'translate(0, 0)');

    inst1.append('text')
        .attr('x', 25)
        .attr('y', 25)
        .attr('font-size', '28px')
        .text('\"Gilmore girls\" Character Connectivity');

    inst1.append('text')
        .attr('x', 25)
        .attr('y', 45)
        .attr('font-size', '16px')
        .text('Diagram Illustrating Character Co-occurence in Scripted Line');

    inst1.append('text')
        .attr('x', 25)
        .attr('y', 60)
        .attr('font-size', '10px')
        .text('Hover over a character\'s outside arc to see their connections to other characters.');

    inst1.append('text')
        .attr('x', 25)
        .attr('y', 72)
        .attr('font-size', 10)
        .text('Click on a character\'s outside arc to highlight their data in Character Lines per Episode');
