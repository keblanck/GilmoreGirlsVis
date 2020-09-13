// some margins for our graph (so it fits our SVG viewport nicely)
var margin = {
    top: 20,
    right: 20,
    bottom: 10,
    left: 20
};

// create our SVG canvas and give it the height and width we want
var svg = d3.select('#body1').append('svg')
    .attr('class', 'first')
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight - 95 - (window.innerWidth/7 + 40))
    .attr('text-anchor', 'start')
    .style("font", "10px sans-serif");
// height and width of our chart
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom - 100;

var g = svg.append('g')
            //.attr('transform', 'translate(' + width/2 + ',' + (height/2 + 15) + ')');
            .attr('transform', 'translate(' + (width/4 + 15) + ',' + (height/3) + ')');

var pg = svg.append('g')
            .attr('transform', 'translate(' + (width*.75 + 15) + ',' + (height/3) + ')');
//var script = document.createElement('source');
//script.src = './viz2.js';
//document.head.appendChild(script);



characters = ['Lorelai', 'Rory', 'Emily', 'Richard', 'Luke', 'Christopher', 'Jason', 'Max', 
              'Dean', 'Logan', 'Jess', 'Paris', 'Sookie', 'Jackson', 'Lane', 'Kirk', 'Taylor']


function color(i) { 
    colors = ['#001f3f', '#0074D9', '#B10DC9', '#AAAAAA', '#39CCCC', '#FFDC00', '#FF851B', '#01FF70', 
    '#F012BE', '#7FDBFF', '#3D9970', '#85144b', '#2ECC40', '##FF4136', '#F012BE', "#3366cc", "#dc3912", "#ff9900"]
    cc = d3.scaleLinear()
          .domain([-2, 17])
          .range([1, 0]);

    return d3.interpolateSpectral(cc(i));
}



//
//from http://bl.ocks.org/timvarga/8c45a928dc19a843d7ce30e45540728b
//
function fade(k, o) {
        svg.selectAll('path.chP')
            .filter(function(d, i) {
                return d.source.index != k && d.target.index != k; })
            .transition()
            .style('fill-opacity', o)
            .style('stroke-opacity', o);
        
        svg.selectAll('path.ch')
            .filter(function(d, i) { 
                //console.log(d.source.index + ', ' + d.target.index);
                return d.source.index != k && d.target.index != k; })
            .transition()
            .style('fill-opacity', o)
            .style('stroke-opacity', o);
        svg21.selectAll('path.ch')
            .filter(function(d, i) {
                return d.source.index != k && d.target.index != k; })
            .transition()
            .style('fill-opacity', o)
            .style('stroke-opacity', o);
        svg21.selectAll('text.words21')
            .filter(function(d, i) {
                return i == k; })
            .transition()
            .style('font-weight', function() {
                if (o == 0.05) {
                    return 'bold';
                } else {
                    return 'normal';
                }
            });
}

function fadeCh(k, l, o) {
    svg.selectAll('path.chP')
          .filter(function(d, i) {
              return (d.source.index != k || d.target.index != l) &&
                     (d.source.index != l || d.target.index != k); })
          .transition()
          .style('fill-opacity', o)
          .style('stroke-opacity', o);

    svg.selectAll('path.ch')
          .filter(function(d,  i) {
              return (d.source.index !=k || d.target.index != l) &&
                     (d.source.index !=l || d.target.index != k) ;})
          .transition()
          .style('fill-opacity', o)
          .style('stroke-opacity', o);
    svg21.selectAll('path.ch')
          .filter(function(d,  i) {
              return (d.source.index !=k || d.target.index != l) &&
                     (d.source.index !=l || d.target.index != k) ;})
          .transition()
          .style('fill-opacity', o)
          .style('stroke-opacity', o);
}

async function callThis () { 
    let firstData = await d3.csv('GGmatrixFullnew.csv').then(function(data) {
        const matrix = [];
        var dataSrc = {};
        for (i = 0; i < characters.length; i++) {
            matrix[i] = [];
        }
        count = 0; 
        
        data.forEach(function(datum) {
           datum['Lorelai'] = +datum['Lorelai'];
            matrix[count][0] = datum['Lorelai'];
            datum['Rory'] = +datum['Rory'];
               matrix[count][1] = datum['Rory'];
            datum['Emily'] = +datum['Emily'];
            matrix[count][2] = datum['Emily'];
            datum['Richard'] = +datum['Richard'];
            matrix[count][3] = datum['Richard'];
            datum['Luke'] = +datum['Luke'];
            matrix[count][4] = datum['Luke'];
            datum['Christopher'] = +datum['Christopher'];
            matrix[count][5] = datum['Christopher'];
            datum['Jason'] = +datum['Jason'];
            matrix[count][6] = datum['Jason'];
            datum['Max'] = +datum['Max'];
            matrix[count][7] = datum['Max'];
            datum['Dean'] = +datum['Dean'];
            matrix[count][8] = datum['Dean'];
            datum['Logan'] = +datum['Logan'];
            matrix[count][9] = datum['Logan'];
            datum['Jess'] = +datum['Jess'];
            matrix[count][10] = datum['Jess'];
            datum['Paris'] = +datum['Paris'];
            matrix[count][11] = datum['Paris'];
            datum['Sookie'] = +datum['Sookie'];
            matrix[count][12] = datum['Sookie'];
            datum['Jackson'] = +datum['Jackson'];
            matrix[count][13] = datum['Jackson'];
            datum['Lane'] = +datum['Lane'];
            matrix[count][14] = datum['Lane'];
            datum['Kirk'] = +datum['Kirk'];
            matrix[count][15] = datum['Kirk'];
            datum['Taylor'] = +datum['Taylor'];
            matrix[count][16] = datum['Taylor'];
        
            dataSrc[count] = datum;
        
            count += 1;
            });  
        console.log(matrix);
        return matrix;
    });
    console.log(firstData);
    return firstData;
}
//drawMe(firstData);

async function drawMe() {
    //console.log(dataSrc);
    //console.log(matrix);
    //
    //from https://beta.observablehq.com/@mbostock/d3-chord-dependency-diagram
    //
    //
    let matrix = await callThis();
    console.log(matrix);
    var indexByName = new Map;
    var nameByIndex = new Map;
    
    for (i = 0; i < matrix.length; i++) {
        indexByName.set(characters[i], i);
        nameByIndex.set(i, characters[i]); 
    }
    console.log(indexByName);
    console.log(nameByIndex);
    console.log('inside1');
    
    var prop = [];
    for (i=0; i < matrix.length; i++) {
        var sum = 0;
        prop[i] = [];
        for (j=0; j < matrix.length; j++) {
            //if (matrix[i][j] > max) {
                sum += matrix[i][j];
            //}
        }
        for (j=0; j <matrix.length; j++) {
            prop[i][j] = matrix[i][j]/sum;
        }
    }

    console.log('prop');
    console.log(prop);

    var innerRadius = (height - height21)/2.5;
    
    var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(innerRadius + 15);
    console.log('inside2');
     
    var chordFunc = d3.chord()
        .padAngle(.04)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending);
    
    const chords = chordFunc(matrix);
    const chordsP = chordFunc(prop);


    console.log('inside3'); 
    console.log(chords);
    console.log(chords.groups);
        
    var group = g.append('g')
        .selectAll('g')
        .data(chords.groups)
        .enter().append('g');
    
    var groupP = pg.append('g')
        .selectAll('g')
        .data(chordsP.groups)
        .enter().append('g');

    var yon = 0;
    group.append('path')
        .attr('fill', d=> color(d.index))
        .attr('stroke', d=> color(d.index))
        .attr('d', arc)
        //.on('mouseover', d=> groupHigh(d.index))
        .on('mouseover', d=>fade(d.index, .05))
        .on('mouseout', d=>fade(d.index, .7))
        .on('click', function(d) { yon++; 
                                   //return drawThis(yon, d.index); } );
                                  return highlight(d.index); } );
    
    groupP.append('path')
        .attr('fill', d=>color(d.index))
        .attr('stroke', d=>color(d.index))
        .attr('d', arc)
        .on('mouseover', d=>fade(d.index, .05))
        .on('mouseout', d=>fade(d.index, .7))
        .on('click', function(d) { yon++;
                                   return highlight(d.index); } );
    
    group.append('text')
        .each(d => { d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr('dy', '.35em')
          .attr("transform", d => `
            rotate(${(d.angle * 180 / Math.PI - 90)})
            translate(${innerRadius + 20})
            ${d.angle > Math.PI ? "rotate(180)" : ""}
          `)
        .attr('text-anchor', d=>d.angle > Math.PI ? 'end' : null)
        .text(d=>nameByIndex.get(d.index));

    groupP.append('text')
        .each(d=> {d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr('dy', '.35em')
          .attr("transform", d => `
            rotate(${(d.angle * 180 / Math.PI - 90)})
            translate(${innerRadius + 20})
            ${d.angle > Math.PI ? "rotate(180)" : ""}
          `)
        .attr('text-anchor', d=>d.angle > Math.PI ? 'end' : null)
        .text(d=>nameByIndex.get(d.index));
    
    var chordDiaP = pg.append('g')
        .attr('fill-opacity', 0.7)
        .selectAll('path')
        .data(chordsP)
        .enter().append('path')
            .attr('stroke', d=>d3.rgb(color(d.source.index)).darker())
            .attr('fill', d=>color(d.source.index))
            .attr('d', d3.ribbon().radius(innerRadius))
            .attr('class', 'chP');
            
            
    //chordDiaP.append('title')
    //    .text(function(d, i) { console.log('here'); return indexToName.get(d.source.index) + ' and ' + indexToName.get(d.target.index) + ': ' + prop[d.source.index][d.target.index];});
                
    chordDiaP.on('mouseover', function (d, i) {
            fadeCh(d.source.index, d.target.index, 0.05);
            chordDiaP.append('title')
                .text(function(d, i) {return nameByIndex.get(d.source.index) 
                + ' to ' + nameByIndex.get(d.target.index) + ': ' 
                + Number.parseFloat(prop[d.source.index][d.target.index]).toFixed(3) + '\n'
                + nameByIndex.get(d.target.index) + ' to ' + nameByIndex.get(d.source.index) + ': '
                + Number.parseFloat(prop[d.target.index][d.source.index]).toFixed(3)
                ;});
        })
        .on('mouseout', function(d, i) {
            fadeCh(d.source.index, d.target.index, 0.7);
            chordDiaP.selectAll('title').remove();
        });

    var chordDia = g.append('g')
        .attr('fill-opacity', 0.7)
        .selectAll('path')
        .data(chords)
        .enter().append('path')
            .attr('stroke', d => d3.rgb(color(d.source.index)).darker())
            .attr('fill', d => color(d.source.index))
            .attr('d', d3.ribbon().radius(innerRadius))
            .attr('class', 'ch')
            .on('click', function(d) { 
                console.log(nameByIndex.get(d.source.index)
                 + ', ' + nameByIndex.get(d.source.subindex));
                });
    
    chordDia.on('mouseover', function (d, i) {
            fadeCh(d.source.index, d.target.index, 0.05);
            chordDia.append('title')
                .text(function(d, i) {return nameByIndex.get(d.source.index) 
                + ' to ' + nameByIndex.get(d.target.index) + ': ' 
                + matrix[d.source.index][d.target.index] + '\n'
                + nameByIndex.get(d.target.index) + ' to ' + nameByIndex.get(d.source.index) + ': '
                + matrix[d.target.index][d.source.index]
                ;});
        })
        .on('mouseout', function(d, i) {
            fadeCh(d.source.index, d.target.index, 0.7);
            chordDia.selectAll('title').remove();
        });
    
    
    console.log('inside7'); 

//    drawThis();
}
    //return matrix;

drawMe();
//drawThis();
console.log('hi');
