//
//multiline graph
//


var margin = {
    top: 20,
    right: 20,
    left: 20,
    bottom: 20
};
var width512 = window.innerWidth/5;
var width511 = window.innerWidth - margin.left - margin.right - width512;
var height51 = window.innerHeight - margin.top - margin.bottom;




var toolTip = document.getElementById("myToolTip");
//var legend = g.append('g')
//    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var svg51;
var g511;
var g512;
var ll51;

var seasonIdx = [0, 21, 43, 65, 87, 109, 131];
//var hidx = [];
//var iidx = [];
var chosen51 = [];

function isSeason(i) {
    return seasonIdx.includes(i);
}

var epiDesc;
async function read512() {
    epiDesc = await d3.csv('nameAndPlot.csv');
}

read512();
var det = 0;
function pullDesc(epi) {
    det++;
    if (det > 1) {
        g512.selectAll('text.name512').remove();
        g512.selectAll('image.photo512').remove();
        g512.selectAll('text.plot512').remove();
    }
    //console.log(epiDesc);
    //console.log(epi);
    //console.log(epiDesc[epi]);
    var s = epiDesc[epi].episode.split('\.')[0];
    var e = epiDesc[epi].episode.split('\.')[1];
    var title = epiDesc[epi].title;
    var desc = epiDesc[epi].plot;
    var photoFile = './scripts/photos/' + s + '_' + e + '.jpg';
    //console.log(s);
    //console.log(e);

    var epiName = g512.append('g')
        .attr('fill', '#585858')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'start')
        .attr('transform', 'translate(0, 0)');
    
    var yPos;
    var floor;
    epiName.append('text')
        .attr('class', 'name512')
        .attr('x', 10 + margin.left)
        //.transition()
        .text(title)
        .attr('font-size', function(d) { 
            var len = d3.select(this).node().getComputedTextLength();
            console.log(len);
            yPos = (width512/len * 8) / 2;
            console.log(yPos);
            floor = width512/len * 8;
            return (width512-margin.right)/len * 8 + 'px';})
        .attr('y', 30 + yPos);
    
    var epiPhoto = g512.append('g')
        .attr('transform', 'translate(0, 0)');
    
        epiPhoto.append('svg:image')
        .attr('class', 'photo512')
        .attr('x', 25)
        .attr('y', floor*.75)
        .attr('height', width512)
        .attr('width', width512)
        .transition()
        .attr('xlink:href', photoFile);
    
    var epiPlot = g512.append('g')
        .attr('fill', '#585858')
        .attr('font-weight', 'normal')
        .attr('text-anchor', 'start')
        .attr('font', '10px sans-serif')
        .attr('transform', 'translate(30, 250)');

    epiPlot.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .attr('class', 'plot512')
        .text(desc)
        .call(wrap, width512*.87);
    
}

function wrap(text, width) {
    text.each(function() {
        var text = d3.select(this)
        var words = text.text().split(/\s+/).reverse();
        var word;
        var line = [];
        var lineNumber = 0;
        var lineHeight = 1.25;
        var y = text.attr('y');
        var dy = 0;
        var tspan = text.text(null)
            .append('tspan')
            .attr('x', 0)
            .attr('y', y)
            .attr('dy', dy + 'em');
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(' '));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(' '));
              line = [word];
              tspan = text.append('tspan')
                  .attr('x', 0)
                  .attr('y', y)
                  .attr('dy', (++lineNumber * lineHeight + dy) + 'em')
                  .text(word);
            }
        }
    });
}

function read51(filename) {
    mat = d3.csv(filename).then(async function(data) {
        var mat = [];
        for (i = 0; i < 154; i++) {
            mat[i] = [];
        }
        data.forEach(await function(datum, i) {
            mat[i][name2idx.get('Lorelai')] = +datum['Lorelai'];
            mat[i][name2idx.get('Rory')] = +datum['Rory'];
            mat[i][name2idx.get('Emily')] = +datum['Emily'];
            mat[i][name2idx.get('Richard')] = +datum['Richard'];
            mat[i][name2idx.get('Luke')] = +datum['Luke'];
            mat[i][name2idx.get('Christopher')] = +datum['Christopher'];
            mat[i][name2idx.get('Jason')] = +datum['Jason'];
            mat[i][name2idx.get('Max')] = +datum['Max'];
            mat[i][name2idx.get('Dean')] = +datum['Dean'];
            mat[i][name2idx.get('Logan')] = +datum['Logan'];
            mat[i][name2idx.get('Jess')] = +datum['Jess'];
            mat[i][name2idx.get('Paris')] = +datum['Paris'];
            mat[i][name2idx.get('Sookie')] = +datum['Sookie'];
            mat[i][name2idx.get('Jackson')] = +datum['Jackson'];
            mat[i][name2idx.get('Lane')] = +datum['Lane'];
            mat[i][name2idx.get('Kirk')] = +datum['Kirk'];
            mat[i][name2idx.get('Taylor')] = +datum['Taylor'];
        });
        return mat;
    });
    return mat;
}

var lorelaiData = [];
var roryData = [];
var emilyData = [];
var richardData = [];
var lukeData = [];
var christopherData = [];
var jasonData = [];
var maxData = [];
var deanData = [];
var loganData = [];
var jessData = [];
var parisData = [];
var sookieData = [];
var jacksonData = [];
var laneData = [];
var kirkData = [];
var taylorData = [];
dataLines();

async function dataLines() {
    lorelaiData = await read51('GGmatrixLorelainew.csv');
    roryData = await read51('GGmatrixRorynew.csv');
    emilyData = await read51('GGmatrixEmilynew.csv');
    richardData = await read51('GGmatrixRichardnew.csv');
    lukeData = await read51('GGmatrixLukenew.csv');
    christopherData = await read51('GGmatrixChristophernew.csv');
    jasonData = await read51('GGmatrixJasonnew.csv');
    maxData = await read51('GGmatrixMaxnew.csv');
    deanData = await read51('GGmatrixDeannew.csv');
    loganData = await read51('GGmatrixLogannew.csv');
    jessData = await read51('GGmatrixJessnew.csv');
    parisData = await read51('GGmatrixParisnew.csv');
    sookieData = await read51('GGmatrixSookienew.csv');
    jacksonData = await read51('GGmatrixJacksonnew.csv');
    laneData = await read51('GGmatrixLanenew.csv');
    kirkData = await read51('GGmatrixKirknew.csv');
    taylorData = await read51('GGmatrixTaylornew.csv');
}


function highlight51(idx) {
    if (chosen51.includes(idx)) {
        var i = chosen51.indexOf(idx);
        chosen51.splice(i, 1);
    } else {
        chosen51.push(idx);
    }
    
    if (chosen51.length == 0) {
        svg51.selectAll('circle.dot511')
            .transition()
            .style('fill-opacity', 0.9)
            .style('fill', function(d) {
                if (d.sent != 0) {
                    return lineColor(d.name);
                } else {
                    return 'none';
                }
            });
        svg51.selectAll('text.words51')
            .transition()
            .style('font-weight', 'normal');
    } else {
        svg51.selectAll('circle.dot511')
            .filter( function(d, i) { return chosen51.includes(d.name); })
            .transition()
            .style('fill', function(d) {
                if ((d.name > 4 && d.name < 11) && (d.sent != 0)){
                    return d3.rgb(lineColor(d.name)).darker([0.2]);
                } else if (d.sent != 0) {
                    return lineColor(d.name);
                } else {
                    return 'none';
                }
            })
            .style('fill-opacity', 0.9);    
        svg51.selectAll('circle.dot511')
            .filter( function(d, i) { return !chosen51.includes(d.name); })
            .transition()
            .style('fill-opacity', 0.05);
        
        svg51.selectAll('text.words51')
            .filter( function(d, i) { return chosen51.includes(i); })
            .transition()
            .style('font-weight', 'bold');
        svg51.selectAll('text.words51')
            .filter( function(d, i) { return !chosen51.includes(i); })
            .transition()
            .style('font-weight', 'normal');
    }
}

function num2se(epi) {
    var s, e;
    //console.log(epi);

    if ((epi >= seasonIdx[0]) && (epi < seasonIdx[1])) {
        //console.log('here 1');
        //console.log(epi);
        s = 1;
        e = epi;
    } else if ((epi >= seasonIdx[1]) && (epi < seasonIdx[2])) {
        s = 2;
        e = epi - seasonIdx[1];
    } else if ((epi >= seasonIdx[2]) && (epi < seasonIdx[3])) {
        s = 3;
        e = epi - seasonIdx[2];
    } else if ((epi >= seasonIdx[3]) && (epi < seasonIdx[4])) {
        s = 4;
        e = epi - seasonIdx[3];
    } else if ((epi >= seasonIdx[4]) && (epi < seasonIdx[5])) {
        s = 5;
        e = epi - seasonIdx[4];
        //console.log('here else');
    } else if ((epi >= seasonIdx[5]) && (epi < seasonIdx[6])) {
        s = 6;
        e = epi - seasonIdx[5];
    } else {
        s = 7;
        e = epi - seasonIdx[6];
    }
    
    e += 1;
    return 'Season ' + s + ' Episode ' + e;
}

function epiHigh(episode, o) {
    console.log(episode);
    g511.selectAll('circle.dot511')
        .filter( function (d, i) {
            return episode.name != d.name;
        })
        .transition()
        .style('fill-opacity', o);
}

function draw51(idx, d, stream) {
    console.log(d)
    if (d == 1) {
        svg51 = d3.select('#body5_1').append('svg')
            .attr('width', width511+width512)
            .attr('height', height51+40)
            .attr('class', 'graph511')
            .attr('text-anchor', 'middle')
            .style('font', '10px sans-serif');
        g511 = svg51.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        g512 = svg51.append('g')
            .attr('transform', 'translate(' + (width511 + margin.left) + ',' + (margin.top + 30) + ')');
        g512.append('rect')
            .attr('x', margin.left)
            .attr('y', 10)
            .attr('height', height51-margin.bottom-margin.bottom)
            .attr('width', width512-margin.left)
            .attr('fill', '#efefef')
            .attr('fill-opacity', 0.7);
    } else {
        chosen51 = [];
        svg51.selectAll('circle.dot511').remove();
        svg51.selectAll('g.yAxis51').remove();
        g511.selectAll('path.lines511').remove();
        ll51.selectAll('text.words51')
            .transition()
            .style('font-weight', 'normal');
        g512.selectAll('g').remove();
    }
    
    window.scroll({
        top: window.innerHeight*3,
        left: 0,
        behavior: 'smooth'
    });

    console.log(stream);
    var sentLines;
    var subj;
    if (idx == 0) {
        sentLines = lorelaiData;
        subj = 'Lorelai';
    } else if (idx == 1) {
        sentLines = roryData;
        subj = 'Rory';
    } else if (idx == 2) {
        sentLines = emilyData;
        subj = 'Emily';
    } else if (idx == 3) {
        sentLines = richardData;
        subj = 'Richard';
    } else if (idx == 4) {
        sentLines = lukeData;
        subj = 'Luke';
    } else if (idx == 5) {
        sentLines = christopherData;
        subj = 'Christopher';
    } else if (idx == 6) {
        sentLines = jasonData;
        subj = 'Jason';
    } else if (idx == 7) {
        sentLines = maxData;
        subj = 'Max';
    } else if (idx == 8) {
        sentLines = deanData;
        subj = 'Dean';
    } else if (idx == 9) {
        sentLines = loganData;
        subj = 'Logan';
    } else if (idx == 10) {
        sentLines = jessData;
        subj = 'Jess';
    } else if (idx == 11) {
        sentLines = parisData;
        subj = 'Paris';
    } else if (idx == 12) {
        sentLines = sookieData;
        subj = 'Sookie';
    } else if (idx == 13) {
        sentLines = jacksonData;
        subj = 'Jackson';
    } else if (idx == 14) {
        sentLines = laneData;
        subj = 'Lane';
    } else if (idx == 15) {
        sentLines = kirkData;
        subj = 'Kirk';
    } else {
        sentLines = taylorData;
        subj = 'Taylor';
    }
    
    //var sentData = {x: [], y: []}

    //for (i = 0; i < 154; i++) {
    //    sentData.x.push(i);
    //    for (j = 0; j < characters.length; j++) {
    //        sentData.y.push(sentLines[i][j]);
    //    }
    //}
    var sentData = {axis: 'sentimentality', series: []}
    
    for (i = 0; i < 154; i++) {
        for (j = 0; j < characters.length; j++) {
            sentData.series.push({episode: i, name: j, sent: sentLines[i][j]});
        }
    }
    
    //for (i = 0; i < 154; i++) {
        //console.log(i);
    //    for (j = 0; j < characters.length; j++) {
            //sentData.series[i].x.push(j);
            //console.log(sentLines[i][j]);
    //        sentData.series[i].values.push(sentLines[i][j]);
    //    }
    //}
    
    var y51 = d3.scaleLinear()    
        .domain([-1, 1])
        .range([height51, 40]);

    var x51 = d3.scaleLinear()
        .domain([-1, 154])
        .range([margin.left, width511]);
    //console.log(d3.extent(stream));
    var y510 = d3.scaleLinear()
        .domain(d3.extent(stream))
        .range([height51, height51/4]);

    var x510 = d3.scaleLinear()
        .domain([-1, 154])
        .range([margin.left, width511]);
    //
    //from https://bl.ocks.org/jkeohan/b8a3a9510036e40d3a4e
    //
    var dataL51 = 0;
    var offset51 = width/20;
    
    
    ll51 = g511.selectAll('.lineLeg51')
        .data(characters)
        .enter().append('g')
        .attr('class', 'lineLeg51')
        .attr('cursor', 'pointer')
        .on('click', (d, i)=>highlight51(i))
        .attr('transform', function(d, i) {
        //    return 'translate(' + (d.length*10 + i*70)  + ', 0)'; });
        //.attr('transform', function (d, i) {
            if (i === 0) {
                dataL51 = d.length + offset51;
                return 'translate(0, 10)';
            } else {
                var temp51 = dataL51;
                dataL51 += d.length + offset51;
                return 'translate(' + temp51 + ', 10)';
            }
        });
    
    ll51.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 10)
        .attr('height', 10)
        .attr('class', 'box51')
        .style('fill', function (d, i) {
            return lineColor(i);
        });
        //.on('click', (d, i) => highlight(i));

    ll51.append('text')
        .attr('class', 'words51')
        .attr('x', 15)
        .attr('y', 9)
        .text( function (d, i) {
            return d;
        })
        .style('font', '10px sans-serif')
        .style('text-anchor', 'start');

    function xAxis51() { 
        g511.append('g')
            .attr('transform', 'translate(' + margin.left  + ', ' + (height51) + ')')
            .call(d3.axisBottom(x51)
                  .tickFormat(function(d) { return xVals[d]; })
                  .tickValues(seasonIdx)
                  .tickSizeOuter(0))
            .call(g => g.select('.domain').remove());
    }
    
    
    g511.append('g')
        .attr('class', 'yAxis51')
        .attr('transform', 'translate(' + margin.left + ', 0)')
        .call(d3.axisLeft(y51))
        .call(g => g.select('.tick:last-of-type text').clone()
            .attr('x', 3)
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text('sentimentality of ' + subj))
        .call(g => g.select('.domain').remove());

//    var drawnline511 = d3.line()
//        .x((d, i) => x51(i))
//        .y(d=>y51(d))
//        .curve(d3.curveBasis);
    //console.log('line');
    g511.append('g').call(xAxis51);
    //group.append('g').call(yAxis);
    //console.log('yAxis append');
    var area510 = d3.area()
        .curve(d3.curveBasis)
        .x(d=>x510(d.eps))
        .y0(y510(0))
        .y1(d=>y510(d.lines));
    
    //var stack510 = d3.stack()
    //    .offset(d3.stackOffsetNone);
    
    //var streamStack = stack510(stream);
    var lineStream = [];
    for (i = 0; i < stream.length; i++) {
        lineStream.push({eps: i, lines: stream[i]});
    }
    console.log(lineStream);
    //var lines511 = g511.selectAll('.lines511')
        //.data(streamStack)
    var lines511 = g511.append('path')    
        .datum(lineStream)
        .attr('class', 'lines511')
        //.enter().append('path')
            .attr('fill', '#efefef')
            .attr('fill-opacity', 0.7)
            .attr('d', area510);

    var dots511 = g511.selectAll('.dot511')
        .data(sentData.series)
        .enter().append('circle')
            .attr('class', 'dot511')
            .on('mouseover', handleIn)
            .on('mouseout', handleOut)
            .on('click', d=>pullDesc(d.episode))
            .attr('r', 3.5)
            .attr('cx', function(d, i) { return x51(d.episode); })
            .attr('cy', function(d, i) { return y51(d.sent); })
            .style('fill', function(d, i) { 
                if (d.sent == 0) {
                    return 'none';
                } else {
                    return lineColor(d.name); 
                } })
            .style('fill-opacity', 0.8)
            .append('title')
                .text( function(d, i) {
                    return num2se(d.episode) + ' ' + idx2name.get(d.name);
                });
//          //.on('click', function(d, i) { return toTree(d, i, d3.mouse(this), script, yon); })
    
    var mouseCo;
    console.log('here');
    //dots511.on('mouseover', handle)
        //epiHigh(d, 0.05))
        //.on('mouseout', function(d, i) {
        //    return epiHigh(d, 0.9);
        //});
    ;
    console.log('here');
    //      mouseCo = d3.mouse(this);
    //      seText(d, i, mouseCo);
    //      path.append('title')
    //          .text(function(d, i) { return seText(d, i, mouseCo);});
    //      })
    //      .on('mouseout', function(d, i) {
    //          path.selectAll('title').remove();
    //      });
    //console.log('its the title');
    //path
          //.append('title')
          //.text(function(d, i) { return seText(d, i, d3.mouse(this)); });
          //.text(d=>dummy());
    //console.log(path);
    //console.log('just xAxis left');
    //console.log('done'); 
}

//var item;
function handleIn() {
    var item = d3.select(this);
    //console.log(item);
    ll51.selectAll('text.words51')
        .transition()
        .style('font-weight', 'normal');
    item.transition()
        .attr('r', 6);
    //console.log(item);
    //console.log(item._groups);
    //console.log(item._groups[0]);
    //console.log(item._groups[0][0]);
    //console.log(item._groups[0][0].__data__);
    //console.log(item._groups[0][0].__data__.episode);
    g511.selectAll('circle.dot511')
        .filter( function(d, i) {
            return item._groups[0][0].__data__.episode != d.episode;
        })
        .transition()
        .style('fill-opacity', 0.05);
        //.transition()
        //.attr('r', 7);
}

function handleOut() {
    item = d3.select(this).attr('r', 3.5);
    //console.log(item);
    //item.transition()
    //    .attr('r', 3.5);
    g511.selectAll('circle.dot511')
        //.filter( function(d, i) {
        //    return item._groups[0][0].__data__.episode == d.episode;
        //})
        .transition()
        .style('fill-opacity', 0.9);
}
//function dummy() {
//    return 'here';
//}






