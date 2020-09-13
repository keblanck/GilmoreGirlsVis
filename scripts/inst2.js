// create our SVG canvas and give it the height and width we want
var i2Svg = d3.select('#inst2').append('svg')
    .attr('class', 'first')
    .attr('width', window.innerWidth)
    .attr('height', 120)
    .attr('text-anchor', 'middle')
    .style("font", "10px sans-serif");
// height and width of our chart

var inst2 = i2Svg.append('g')
        .attr('fill', '#585858')
        .attr('font-weight', 'light')
        .attr('text-anchor', 'start')
        .attr('transform', 'translate(0, 0)');

    inst2.append('text')
        .attr('x', 25)
        .attr('y', 15)
        .attr('font-size', '16px')
        .text('Lines by Episode');

    inst2.append('text')
        .attr('x', 25)
        .attr('y', 30)
        //.attr('font-size', '10px')
        .text('This chart shows the number of lines each of the characters has per episode though seasons 1-5');

    inst2.append('text')
        .attr('x', 25)
        .attr('y', 42)
        //.attr('font-size', '10px')
        .text('Use the chord diagram or the legend at the top to filter characters and see their episode occurences specifically.');

    inst2.append('text')
        .attr('x', 25)
        .attr('y', 54)
        //.attr('font-size', '10px')
        .text('Hover over the lines to see which episode is being show at a certain point.');

    inst2.append('text')
        .attr('x', 25)
        .attr('y', 66)
        //.attr('font-size', '10px')
        .text('Interesting selections to make include:');
    inst2.append('text')
        .attr('x', 35)
        .attr('y', 78)
        //.attr('font-size', '10px')
        .text('Lorelai\'s love interests: Max -> Christopher -> Jason -> Luke');
    inst2.append('text')
        .attr('x', 35)
        .attr('y', 90)
        //.attr('font-size', '10px')
        .text('Rory\'s love interests: Dean -> Jess -> Logan');
    inst2.append('text')
        .attr('x', 25)
        .attr('y', 102)
        //.attr('font-size', '10px')
        .text('Other duos: Luke & Jess (uncle and nephew), Richard & Jason (business partners), Taylor & Jackson (townspeople)');
    inst2.append('text')
        .attr('x', 25)
        .attr('y', 114)
        .attr('font-weight', 'bold')
        .text('To see the sentamentality of a particular character towards other characters every episode as a scatter plot, click on their line at the point where the tool tip shows the character you would like to see.')
function show() {
   inst2.append('text')
        .attr('x', window.innerWidth-45)
        .attr('y', 25)
        .attr('text-anchor', 'end')
        .text('Try choosing an episode-character pair that actually has lines.');
}
