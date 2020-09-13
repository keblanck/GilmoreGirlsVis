// some margins for our graph (so it fits our SVG viewport nicely)
var margin = {
    top: 20,
    right: 20,
    bottom: 10,
    left: 20
};

// create our SVG canvas and give it the height and width we want
var svg21 = d3.select('#body2_1').append('svg')
    .attr('class', 'first')
    .attr('width', window.innerWidth)
    .attr('height', window.innerWidth/7 + 40)
    .attr('text-anchor', 'middle')
    .style("font", "10px sans-serif");
// height and width of our chart
var width21 = window.innerWidth - margin.left - margin.right;
var height21 = window.innerHeight/7 + 40;

var g211 = svg21.append('g')
            .attr('transform', 'translate(' + (width*(1/14) + 15) + ',' + (height21 - 20) + ')');

var g212 = svg21.append('g')
            .attr('transform', 'translate(' + (width*(3/14) + 15) + ',' + (height21 - 20) + ')');

var g213 = svg21.append('g')
            .attr('transform', 'translate(' + (width*(5/14) + 15) + ',' + (height21 - 20) + ')');

var g214 = svg21.append('g')
            .attr('transform', 'translate(' + (width*(7/14) + 15) + ',' + (height21 - 20) + ')');

var g215 = svg21.append('g')
            .attr('transform', 'translate(' + (width*(9/14) + 15) + ',' + (height21 - 20) + ')');

var g216 = svg21.append('g')
            .attr('transform', 'translate(' + (width*(11/14) + 15) + ',' + (height21 - 20) + ')');

var g217 = svg21.append('g')
            .attr('transform', 'translate(' + (width*(13/14) + 15) + ',' + (height21 - 20) + ')');

var ll21;
//characters = ['Lorelai', 'Rory', 'Emily', 'Richard', 'Luke', 'Christopher', 'Jason', 'Max', 
//              'Dean', 'Logan', 'Jess', 'Paris', 'Sookie', 'Jackson', 'Lane', 'Kirk', 'Taylor']


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
function fade21(k, o) {
        svg21.selectAll('path.ch')
            .filter(function(d, i) { 
                return d.source.index != k && d.target.index != k; })
            .transition()
            .style('fill-opacity', o)
            .style('stroke-opacity', o);
        svg.selectAll('path.ch')
            .filter(function(d, i) {
                return d.source.index != k && d.target.index != k; })
            .transition()
            .style('fill-opacity', o)
            .style('stroke-opacity', o);
        svg.selectAll('path.chP')
            .filter(function(d, i) {
                return d.source.index != k && d.target.index != k; })
            .transition()
            .style('fill-opacity', o)
            .style('stroke-opacity', o);
        
        svg21.selectAll('text.words21')
            .filter(function(d, i) {
                return i == k; 
            })
            .transition()
            .style('font-weight', function() {
                if (o == 0.05) {
                    return 'bold';
                } else { 
                    return 'normal'; 
                } 
            });
}

//function fadeCh21(k, l, o) {
//    svg.selectAll('path.chP')
//          .filter(function(d, i) {
//              return (d.source.index != k || d.target.index != l) &&
//                     (d.source.index != l || d.target.index != k); })
//          .transition()
//          .style('fill-opacity', o)
//          .style('stroke-opacity', o);
//
//    svg21.selectAll('path.ch')
//          .filter(function(d,  i) {
//              return (d.source.index !=k || d.target.index != l) &&
//                     (d.source.index !=l || d.target.index != k) ;})
//          .transition()
//          .style('fill-opacity', o)
//          .style('stroke-opacity', o);
//}

async function callThis (file) { 
    let firstData = await d3.csv(file).then(function(data) {
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
    
    let matrix211 = await callThis('GGmatrixS1new.csv');
    let matrix212 = await callThis('GGmatrixS2new.csv');
    let matrix213 = await callThis('GGmatrixS3new.csv');
    let matrix214 = await callThis('GGmatrixS4new.csv');
    let matrix215 = await callThis('GGmatrixS5new.csv');
    let matrix216 = await callThis('GGmatrixS6new.csv');
    let matrix217 = await callThis('GGmatrixS7new.csv');
    
    //console.log(matrix);
    var indexByName = new Map;
    var nameByIndex = new Map;
    
    for (i = 0; i < matrix211.length; i++) {
        indexByName.set(characters[i], i);
        nameByIndex.set(i, characters[i]); 
    }
    console.log(indexByName);
    console.log(nameByIndex);
    console.log('inside1');
    
    //var prop = [];
    //for (i=0; i < matrix.length; i++) {
    //    var sum = 0;
    //    prop[i] = [];
    //    for (j=0; j < matrix.length; j++) {
    //        //if (matrix[i][j] > max) {
    //            sum += matrix[i][j];
    //        //}
    //    }
    //    for (j=0; j <matrix.length; j++) {
    //        prop[i][j] = matrix[i][j]/sum;
    //    }
    //}

    //console.log('prop');
    //console.log(prop);

    var innerRadius = width/14 - 20;
    
    var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(innerRadius + 10);
    console.log('inside2');
     
    var chordFunc = d3.chord()
        .padAngle(.04)
        .sortSubgroups(d3.descending)
        .sortChords(d3.descending);
    
    const chords211 = chordFunc(matrix211);
    const chords212 = chordFunc(matrix212);
    const chords213 = chordFunc(matrix213);
    const chords214 = chordFunc(matrix214);
    const chords215 = chordFunc(matrix215);
    const chords216 = chordFunc(matrix216);
    const chords217 = chordFunc(matrix217);

    //console.log('inside3'); 
    //console.log(chords);
    //console.log(chords.groups);
    var dataL = -width/14;
    var offset = width/20;
    ll21 = g211.selectAll('lineLeg21')
        .data(characters)
        .enter().append('g')
        .attr('class', 'lineLeg21')
        //.attr('cursor', 'pointer')
        .on('mouseover', (d, i)=>fade21(i, 0.05))
        .on('mouseout', (d, i)=>fade21(i, 0.7))
        .on('click', (d, i)=>highlight(i))
        .attr('transform', function(d, i) {
            if (i == 0) {
                dataL = d.length + offset;
                return 'translate(' + (-width/14) + ', '+ (-height21/1.3)+')';
            } else {
                var temp = dataL;
                dataL += d.length + offset;
                return 'translate(' + (temp-(width/14)) + ',' + (-height21/1.3) +')';
            }
        });
    
    
    ll21.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 10)
        .attr('height', 10)
        .attr('class', 'box21')
        .style('fill', function(d, i) {
            return lineColor(i);
        });
    
    ll21.append('text')
        .attr('class', 'words21')
        .attr('x', 15)
        .attr('y', 9)
        .text( function (d, i) {
            return d;
        })
        .style('font', '10px sans-serif')
        .style('text-anchor', 'start');

    var group211 = g211.append('g')
        .selectAll('g')
        .data(chords211.groups)
        .enter().append('g');
    
    var group212 = g212.append('g')
        .selectAll('g')
        .data(chords212.groups)
        .enter().append('g');

    var group213 = g213.append('g')
        .selectAll('g')
        .data(chords213.groups)
        .enter().append('g');
    
    var group214 = g214.append('g')
        .selectAll('g')
        .data(chords214.groups)
        .enter().append('g');

    var group215 = g215.append('g')
        .selectAll('g')
        .data(chords215.groups)
        .enter().append('g');
    
    var group216 = g216.append('g')
        .selectAll('g')
        .data(chords216.groups)
        .enter().append('g');

    var group217 = g217.append('g')
        .selectAll('g')
        .data(chords217.groups)
        .enter().append('g');
    
    
    //var yon = 0;
    group211.append('path')
        .attr('fill', d=> color(d.index))
        .attr('stroke', d=> color(d.index))
        .attr('d', arc)
        .on('mouseover', d=>fade21(d.index, .05))
        .on('mouseout', d=>fade21(d.index, .7))
        .on('click', function(d) { return highlight(d.index); } );
    
    group212.append('path')
        .attr('fill', d=> color(d.index))
        .attr('stroke', d=> color(d.index))
        .attr('d', arc)
        .on('mouseover', d=>fade21(d.index, .05))
        .on('mouseout', d=>fade21(d.index, .7))
        .on('click', function(d) { return highlight(d.index); } );
    
    group213.append('path')
        .attr('fill', d=> color(d.index))
        .attr('stroke', d=> color(d.index))
        .attr('d', arc)
        .on('mouseover', d=>fade21(d.index, .05))
        .on('mouseout', d=>fade21(d.index, .7))
        .on('click', function(d) { return highlight(d.index); } );
    
    group214.append('path')
        .attr('fill', d=> color(d.index))
        .attr('stroke', d=> color(d.index))
        .attr('d', arc)
        .on('mouseover', d=>fade21(d.index, .05))
        .on('mouseout', d=>fade21(d.index, .7))
        .on('click', function(d) { return highlight(d.index); } );
    
    group215.append('path')
        .attr('fill', d=> color(d.index))
        .attr('stroke', d=> color(d.index))
        .attr('d', arc)
        .on('mouseover', d=>fade21(d.index, .05))
        .on('mouseout', d=>fade21(d.index, .7))
        .on('click', function(d) { return highlight(d.index); } );
    
    group216.append('path')
        .attr('fill', d=> color(d.index))
        .attr('stroke', d=> color(d.index))
        .attr('d', arc)
        .on('mouseover', d=>fade21(d.index, .05))
        .on('mouseout', d=>fade21(d.index, .7))
        .on('click', function(d) { return highlight(d.index); } );
    
    group217.append('path')
        .attr('fill', d=> color(d.index))
        .attr('stroke', d=> color(d.index))
        .attr('d', arc)
        .on('mouseover', d=>fade21(d.index, .05))
        .on('mouseout', d=>fade21(d.index, .7))
        .on('click', function(d) { return highlight(d.index); } );
    
    
    //groupP.append('path')
    //    .attr('fill', d=>color(d.index))
    //    .attr('stroke', d=>color(d.index))
    //    .attr('d', arc)
    //    .on('mouseover', d=>fade(d.index, .05))
    //    .on('mouseout', d=>fade(d.index, .7))
    //    .on('click', function(d) { yon++;
    //                               return highlight(d.index); } );
    
    //group.append('text')
    //    .each(d => { d.angle = (d.startAngle + d.endAngle) / 2; })
    //    .attr('dy', '.35em')
    //      .attr("transform", d => `
    //        rotate(${(d.angle * 180 / Math.PI - 90)})
    //        translate(${innerRadius + 28})
    //        ${d.angle > Math.PI ? "rotate(180)" : ""}
    //      `)
    //    .attr('text-anchor', d=>d.angle > Math.PI ? 'end' : null)
    //    .text(d=>nameByIndex.get(d.index));

    //groupP.append('text')
    //    .each(d=> {d.angle = (d.startAngle + d.endAngle) / 2; })
    //    .attr('dy', '.35em')
    //      .attr("transform", d => `
    //        rotate(${(d.angle * 180 / Math.PI - 90)})
    //        translate(${innerRadius + 28})
    //        ${d.angle > Math.PI ? "rotate(180)" : ""}
    //      `)
    //    .attr('text-anchor', d=>d.angle > Math.PI ? 'end' : null)
    //    .text(d=>nameByIndex.get(d.index));
    
    //var chordDiaP = pg.append('g')
    //    .attr('fill-opacity', 0.7)
    //    .selectAll('path')
    //    .data(chordsP)
    //    .enter().append('path')
    //        .attr('stroke', d=>d3.rgb(color(d.source.index)).darker())
    //        .attr('fill', d=>color(d.source.index))
    //        .attr('d', d3.ribbon().radius(innerRadius))
    //        .attr('class', 'chP');
            
            
    //chordDiaP.on('mouseover', function (d, i) {
    //        fadeCh(d.source.index, d.target.index, 0.05);
    //        chordDiaP.append('title')
    //            .text(function(d, i) {return nameByIndex.get(d.source.index) 
    //            + ' to ' + nameByIndex.get(d.target.index) + ': ' 
    //            + Number.parseFloat(prop[d.source.index][d.target.index]).toFixed(3) + '\n'
    //            + nameByIndex.get(d.target.index) + ' to ' + nameByIndex.get(d.source.index) + ': '
    //            + Number.parseFloat(prop[d.target.index][d.source.index]).toFixed(3)
    //            ;});
    //    })
    //    .on('mouseout', function(d, i) {
    //        fadeCh(d.source.index, d.target.index, 0.7);
    //        chordDiaP.selectAll('title').remove();
    //    });

    var chordDia211 = g211.append('g')
        .attr('fill-opacity', 0.7)
        .selectAll('path')
        .data(chords211)
        .enter().append('path')
            .attr('stroke', d => d3.rgb(color(d.source.index)).darker())
            .attr('fill', d => color(d.source.index))
            .attr('d', d3.ribbon().radius(innerRadius))
            .attr('class', 'ch')
            .on('click', function(d) { 
                console.log(nameByIndex.get(d.source.index)
                 + ', ' + nameByIndex.get(d.source.subindex));
                });
    
    chordDia211.on('mouseover', function (d, i) {
            fadeCh(d.source.index, d.target.index, 0.05);
            chordDia211.append('title')
                .text(function(d, i) {return nameByIndex.get(d.source.index) 
                + ' to ' + nameByIndex.get(d.target.index) + ': ' 
                + matrix211[d.source.index][d.target.index] + '\n'
                + nameByIndex.get(d.target.index) + ' to ' + nameByIndex.get(d.source.index) + ': '
                + matrix211[d.target.index][d.source.index]
                ;});
        })
        .on('mouseout', function(d, i) {
            fadeCh(d.source.index, d.target.index, 0.7);
            chordDia211.selectAll('title').remove();
        });
    
    var chordDia212 = g212.append('g')
        .attr('fill-opacity', 0.7)
        .selectAll('path')
        .data(chords212)
        .enter().append('path')
            .attr('stroke', d => d3.rgb(color(d.source.index)).darker())
            .attr('fill', d => color(d.source.index))
            .attr('d', d3.ribbon().radius(innerRadius))
            .attr('class', 'ch')
            .on('click', function(d) { 
                console.log(nameByIndex.get(d.source.index)
                 + ', ' + nameByIndex.get(d.source.subindex));
                });
    
    chordDia212.on('mouseover', function (d, i) {
            fadeCh(d.source.index, d.target.index, 0.05);
            chordDia212.append('title')
                .text(function(d, i) {return nameByIndex.get(d.source.index) 
                + ' to ' + nameByIndex.get(d.target.index) + ': ' 
                + matrix212[d.source.index][d.target.index] + '\n'
                + nameByIndex.get(d.target.index) + ' to ' + nameByIndex.get(d.source.index) + ': '
                + matrix212[d.target.index][d.source.index]
                ;});
        })
        .on('mouseout', function(d, i) {
            fadeCh(d.source.index, d.target.index, 0.7);
            chordDia212.selectAll('title').remove();
        });
    
    
    var chordDia213 = g213.append('g')
        .attr('fill-opacity', 0.7)
        .selectAll('path')
        .data(chords213)
        .enter().append('path')
            .attr('stroke', d => d3.rgb(color(d.source.index)).darker())
            .attr('fill', d => color(d.source.index))
            .attr('d', d3.ribbon().radius(innerRadius))
            .attr('class', 'ch')
            .on('click', function(d) { 
                console.log(nameByIndex.get(d.source.index)
                 + ', ' + nameByIndex.get(d.source.subindex));
                });
    
    chordDia213.on('mouseover', function (d, i) {
            fadeCh(d.source.index, d.target.index, 0.05);
            chordDia213.append('title')
                .text(function(d, i) {return nameByIndex.get(d.source.index) 
                + ' to ' + nameByIndex.get(d.target.index) + ': ' 
                + matrix213[d.source.index][d.target.index] + '\n'
                + nameByIndex.get(d.target.index) + ' to ' + nameByIndex.get(d.source.index) + ': '
                + matrix213[d.target.index][d.source.index]
                ;});
        })
        .on('mouseout', function(d, i) {
            fadeCh(d.source.index, d.target.index, 0.7);
            chordDia213.selectAll('title').remove();
        });
    
    var chordDia214 = g214.append('g')
        .attr('fill-opacity', 0.7)
        .selectAll('path')
        .data(chords214)
        .enter().append('path')
            .attr('stroke', d => d3.rgb(color(d.source.index)).darker())
            .attr('fill', d => color(d.source.index))
            .attr('d', d3.ribbon().radius(innerRadius))
            .attr('class', 'ch')
            .on('click', function(d) { 
                console.log(nameByIndex.get(d.source.index)
                 + ', ' + nameByIndex.get(d.source.subindex));
                });
    
    chordDia214.on('mouseover', function (d, i) {
            fadeCh(d.source.index, d.target.index, 0.05);
            chordDia214.append('title')
                .text(function(d, i) {return nameByIndex.get(d.source.index) 
                + ' to ' + nameByIndex.get(d.target.index) + ': ' 
                + matrix214[d.source.index][d.target.index] + '\n'
                + nameByIndex.get(d.target.index) + ' to ' + nameByIndex.get(d.source.index) + ': '
                + matrix214[d.target.index][d.source.index]
                ;});
        })
        .on('mouseout', function(d, i) {
            fadeCh(d.source.index, d.target.index, 0.7);
            chordDia214.selectAll('title').remove();
        });
    
    var chordDia215 = g215.append('g')
        .attr('fill-opacity', 0.7)
        .selectAll('path')
        .data(chords215)
        .enter().append('path')
            .attr('stroke', d => d3.rgb(color(d.source.index)).darker())
            .attr('fill', d => color(d.source.index))
            .attr('d', d3.ribbon().radius(innerRadius))
            .attr('class', 'ch')
            .on('click', function(d) { 
                console.log(nameByIndex.get(d.source.index)
                 + ', ' + nameByIndex.get(d.source.subindex));
                });
    
    chordDia215.on('mouseover', function (d, i) {
            fadeCh(d.source.index, d.target.index, 0.05);
            chordDia215.append('title')
                .text(function(d, i) {return nameByIndex.get(d.source.index) 
                + ' to ' + nameByIndex.get(d.target.index) + ': ' 
                + matrix215[d.source.index][d.target.index] + '\n'
                + nameByIndex.get(d.target.index) + ' to ' + nameByIndex.get(d.source.index) + ': '
                + matrix215[d.target.index][d.source.index]
                ;});
        })
        .on('mouseout', function(d, i) {
            fadeCh(d.source.index, d.target.index, 0.7);
            chordDia215.selectAll('title').remove();
        });
    
    var chordDia216 = g216.append('g')
        .attr('fill-opacity', 0.7)
        .selectAll('path')
        .data(chords216)
        .enter().append('path')
            .attr('stroke', d => d3.rgb(color(d.source.index)).darker())
            .attr('fill', d => color(d.source.index))
            .attr('d', d3.ribbon().radius(innerRadius))
            .attr('class', 'ch')
            .on('click', function(d) { 
                console.log(nameByIndex.get(d.source.index)
                 + ', ' + nameByIndex.get(d.source.subindex));
                });
    
    chordDia216.on('mouseover', function (d, i) {
            fadeCh(d.source.index, d.target.index, 0.05);
            chordDia216.append('title')
                .text(function(d, i) {return nameByIndex.get(d.source.index) 
                + ' to ' + nameByIndex.get(d.target.index) + ': ' 
                + matrix216[d.source.index][d.target.index] + '\n'
                + nameByIndex.get(d.target.index) + ' to ' + nameByIndex.get(d.source.index) + ': '
                + matrix216[d.target.index][d.source.index]
                ;});
        })
        .on('mouseout', function(d, i) {
            fadeCh(d.source.index, d.target.index, 0.7);
            chordDia216.selectAll('title').remove();
        });
    
    var chordDia217 = g217.append('g')
        .attr('fill-opacity', 0.7)
        .selectAll('path')
        .data(chords217)
        .enter().append('path')
            .attr('stroke', d => d3.rgb(color(d.source.index)).darker())
            .attr('fill', d => color(d.source.index))
            .attr('d', d3.ribbon().radius(innerRadius))
            .attr('class', 'ch')
            .on('click', function(d) { 
                console.log(nameByIndex.get(d.source.index)
                 + ', ' + nameByIndex.get(d.source.subindex));
                });
    
    chordDia217.on('mouseover', function (d, i) {
            fadeCh(d.source.index, d.target.index, 0.05);
            chordDia217.append('title')
                .text(function(d, i) {return nameByIndex.get(d.source.index) 
                + ' to ' + nameByIndex.get(d.target.index) + ': ' 
                + matrix217[d.source.index][d.target.index] + '\n'
                + nameByIndex.get(d.target.index) + ' to ' + nameByIndex.get(d.source.index) + ': '
                + matrix217[d.target.index][d.source.index]
                ;});
        })
        .on('mouseout', function(d, i) {
            fadeCh(d.source.index, d.target.index, 0.7);
            chordDia217.selectAll('title').remove();
        });
    
    console.log('inside7'); 

    drawThis();
}
    //return matrix;
drawMe();
console.log('hi');
