//
//multiline graph
//


var margin = {
    top: 20,
    right: 20,
    left: 20,
    bottom: 20
};

var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom - 120;

var newSVG = d3.select('#body2').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'baseGraph')
    .attr('text-anchor', 'middle')
    .attr('font', '10px sans-serif');


var toolTip = document.getElementById("myToolTip");
//var legend = g.append('g')
//    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var group = newSVG.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var ll;
var yon = 0;
//var legend = newSVG.append('g')
//    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
//var g = newSVG.append('g')
//    .attr('transform', 'translate(' + margin.left + ',' + window.innerHeight + ')');
    
const characters = ['Lorelai', 'Rory', 'Emily', 'Richard', 'Luke', 'Christopher', 'Jason', 
                    'Max', 'Dean', 'Logan', 'Jess', 'Paris', 'Sookie', 'Jackson', 'Lane', 
                    'Kirk', 'Taylor'];

const idx2name = new Map;
const name2idx = new Map;

for (i = 0; i < characters.length; i++) {
    idx2name.set(i, characters[i]);
    name2idx.set(characters[i], i);
}

var seasonIdx = [0, 21, 43, 65, 87, 109, 131];
var hidx = [];
var iidx = [];

function isSeason(i) {
    return seasonIdx.includes(i);
}

function lineColor(i) {
    colors = ['#001f3f', '#0074D9', '#B10DC9', '#AAAAAA', '#39CCCC', '#FFDC00', '#FF851B',
    '#01FF70', '#F012BE', '#7FDBFF', '#3D9970', '#85144b', '#2ECC40', '##FF4136', '#F012BE',
    "#3366cc", "#dc3912", "#ff9900"];
    
    cc = d3.scaleLinear()
          .domain([-2, 17])
          .range([1, 0]);

    return d3.interpolateSpectral(cc(i));
}

    var countBySE = [];
function parsedForLine() {
    var scriptBySE = [];

    for (i = 0; i < 7; i++) {
        scriptBySE[i] = [];
        countBySE[i] = [];
    }    
    for (j = 0; j < 22; j++) {
        scriptBySE[1][j] = []; //season 2
        scriptBySE[2][j] = []; //season 3
        scriptBySE[3][j] = []; //season 4
        scriptBySE[4][j] = []; //season 5
        scriptBySE[5][j] = []; //season 6
        scriptBySE[6][j] = []; //season 7
        countBySE[1][j] = []; //season 2
        countBySE[2][j] = []; //season 3
        countBySE[3][j] = []; //season 4
        countBySE[4][j] = []; //season 5
        countBySE[5][j] = []; //season 6
        countBySE[6][j] = []; //season 7
        for (k = 0; k < characters.length; k++) {
            scriptBySE[1][j][k] = '';
            scriptBySE[2][j][k] = '';
            scriptBySE[3][j][k] = '';
            scriptBySE[4][j][k] = '';
            scriptBySE[5][j][k] = '';
            scriptBySE[6][j][k] = '';
            countBySE[1][j][k] = 0;
            countBySE[2][j][k] = 0;
            countBySE[3][j][k] = 0;
            countBySE[4][j][k] = 0;
            countBySE[5][j][k] = 0;
            countBySE[6][j][k] = 0;
        }
    }
    for (j = 0; j < 21; j++) {
        scriptBySE[0][j] = []; //season 1
        countBySE[0][j] = []; //season 1
        for (k = 0; k < characters.length; k++) {
            scriptBySE[0][j][k] = '';
            countBySE[0][j][k] = 0;
        }
    }
    var s;
    var e;
    var array = [];
    for (i = 0; i < 154; i++) {
        array[i] = [];
    }
    
    //console.log('here');
    var line = [];
    ret = d3.csv('parsedFinallyHorzNew.csv').then(async function(data) {
        //console.log('csv');
        data.forEach(await function(datum, i) {
            //console.log('hi');
            for (j = 0; j < 2121; j++) {
                array[i][j] = String(datum[j]);
                //console.log(array[i][j]);
                //parse first item of every row for season and episode
                //console.log(array[i][0].slice(0, 1));
                //console.log(array[i][0].slice(2, 4));
                //console.log(array[i][0]);
                s = +array[i][0].slice(0, 1);
                e = +array[i][0].slice(2, 4);
                line = array[i][j].split(':');
                //console.log(line);
                if (line.length > 1) {
                    //console.log(s);
                    //console.log(e);
                    //console.log(line[0]);
                    countBySE[s-1][e-1][characters.findIndex(function (d) { 
                        if (line[0] == 'CHRIS') { line[0] = 'Christopher'; }
                        return d.toLowerCase() == line[0].toLowerCase(); })] += 1;
                    scriptBySE[s-1][e-1][characters.findIndex(function (d) { 
                        if (line[0] == 'CHRIS') { line[0] = 'Christopher'; }
                        return d.toLowerCase() == line[0].toLowerCase(); })] += array[i][j] + ' ';
                }
            }
            //console.log('s' + s + ', e' + e + ': ' + countBySE[s-1][e-1][9]);
            //console.log('s' + s + ', e' + e + ': ' + scriptBySE[s-1][e-1][9]);
        });
        return { countBySE, scriptBySE };
    });
    //console.log(ret);
    return ret;
}


function highlight(idx) {
    console.log('highlight called');
    window.scroll( {
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth'
    });
    
    if (hidx.includes(idx2name.get(idx))) {
        var i = hidx.indexOf(idx2name.get(idx));
        hidx.splice(i, 1);
        iidx.splice(i, 1);
    } else {
        hidx.push(idx2name.get(idx));
        iidx.push(idx);
    }
    
    if (hidx.length == 0) {
        d3.selectAll('path.lines')
            .transition()
            .style('stroke-opacity', 1)
            .attr('stroke', d=>d3.rgb(thisColor(name2idx.get(d.name))));;
        d3.selectAll('text.words')
            .filter( function(d, i) {
                return !hidx.includes(d); })
            .transition()
            .style('font-weight', 'normal');
        d3.selectAll('rect.box')
            .filter( function(d, i) {
                return !hidx.includes(d); })
            .transition()
            .style('fill', (d, i)=>thisColor(name2idx.get(d)));
    } else {
        d3.selectAll('path.lines')
            .filter( function (d, i) {
                return hidx.includes(d.name); })
            .transition()
            .style('stroke-opacity', 1)
            .attr('stroke', function(d) {
                if (name2idx.get(d.name) > 4 && name2idx.get(d.name) < 11) {
                    return d3.rgb(thisColor(name2idx.get(d.name))).darker([.2])
                } else {
                    return thisColor(name2idx.get(d.name));
                }
            });
        
        d3.selectAll('path.lines')
            .filter( function(d, i) { 
                return !hidx.includes(d.name); })
            .transition()
            .style('stroke-opacity', 0.05);
        
        d3.selectAll('text.words')
            .filter( function(d, i) {
                return hidx.includes(d); })
            .transition()
            .style('font-weight', 'bold');
        
        d3.selectAll('text.words')
            .filter( function(d, i) {
                return !hidx.includes(d); })
            .transition()
            .style('font-weight', 'normal');
        console.log(hidx);
    
        d3.selectAll('rect.box')
            .filter( function(d, i) {
                return hidx.includes(d); })
            .transition()
            .style('fill', function(d) {
                if (name2idx.get(d) > 4 && name2idx.get(d) < 11) {
                    return d3.rgb(thisColor(name2idx.get(d))).darker([.2])
                } else {
                    return thisColor(name2idx.get(d));
                }
            });

        d3.selectAll('rect.box')
            .filter( function(d, i) {
                return !hidx.includes(d); })
            .transition()
            .style('fill', (d, i)=>thisColor(name2idx.get(d)));
    }
}

function invX(x1) {
    var notX = d3.scaleLinear()
        .domain([margin.left, width-margin.right])
        .range([0, 153]);
    return Math.floor(notX(x1));
}

function seText(d, i, m) {
    var se = invX(m[0]);
    var s;
    var e;
    //console.log('here 1');
    if ((se >= seasonIdx[0]) && (se < seasonIdx[1])) {
        s = 0;
        e = se;
        //console.log('here 2');
    } else if ((se >= seasonIdx[1]) && (se < seasonIdx[2])) {
        s = 1;
        e = se - seasonIdx[1];
        //console.log('here 3');
    } else if ((se >= seasonIdx[2]) && (se < seasonIdx[3])) {
        s = 2;
        e = se - seasonIdx[2];
        //console.log('here 4');
    } else if ((se >= seasonIdx[3]) && (se < seasonIdx[4])) {
        s = 3;
        e = se - seasonIdx[3];
        //console.log('here 5');
    } else if ((se >= seasonIdx[4]) && (se < seasonIdx[5])) {
        s = 4;
        e = se - seasonIdx[4];
        //console.log('here else');
    } else if ((se >= seasonIdx[5]) && (se < seasonIdx[6])) {
        s = 5;
        e = se - seasonIdx[5];
    } else {
        s = 6;
        e = se - seasonIdx[6];
    }
    //console.log('here last');
    var info = 'season: ' + (s+1) + ', episode: ' + (e+1) + ' - ' + idx2name.get(i);
    //toolTip.innerHtml(info);
    return info;
}

function toTree(d, i, m, a, y) {
    //console.log('d: ');
    //console.log(d);
    //console.log('i: ' + i);
    //console.log('m: ');
    //console.log(m);
    var se = invX(m[0]);

    if ((se >= seasonIdx[0]) && (se < seasonIdx[1])) {
        s = 0;
        e = se;
    } else if ((se >= seasonIdx[1]) && (se < seasonIdx[2])) {
        s = 1;
        e = se - seasonIdx[1];
    } else if ((se >= seasonIdx[2]) && (se < seasonIdx[3])) {
        s = 2;
        e = se - seasonIdx[2];
    } else if ((se >= seasonIdx[3]) && (se < seasonIdx[4])) {
        s = 3;
        e = se - seasonIdx[3];
    } else if ((se >= seasonIdx[4]) && (se < seasonIdx[5])) {
        s = 4;
        e = se - seasonIdx[4];
        //console.log('here else');
    } else if ((se >= seasonIdx[5]) && (se < seasonIdx[6])) {
        s = 5;
        e = se - seasonIdx[5];
    } else {
        s = 6;
        e = se - seasonIdx[6];
    }
   
    if (countBySE[s][e][i] == 0) {
        show();
    } else {
    //console.log('s' + s + 'e' + e);
        yon++
        determine(a[s][e][i], idx2name.get(i), yon);
    //console.log(a[s][e][i]);
    }
}
var xVals = [];
async function drawThis() {
    //console.log('called'); 
    var lineData = await parsedForLine();
    //console.log(lineData);
    var count = lineData.countBySE;
    var script = lineData.scriptBySE;
    //console.log(count);
    //console.log(script);

    countByChar = [];
    for (i = 0; i < characters.length; i++) {
        countByChar[i] = [];
        for (j = 0; j < 154; j++) {
            countByChar[i][j] = 0;
        }
    }
    
    for (i = 0; i < 7; i++) {
        for (j = 0; j < lineData.countBySE[i].length; j++) {
            for (k = 0; k < characters.length; k++) {
                countByChar[k][seasonIdx[i] + j] = lineData.countBySE[i][j][k];
            }
        }
    }
    
    countData = {y: 'lines per episode', series: []}
    
    for (i = 0; i < characters.length; i++) {
        countData.series.push({name: idx2name.get(i), values: []});
    }
    
    for (i = 0; i < 7; i++) {
        for (j = 0; j < count[i].length; j++) {
            //count[i][j] = episode
            //count[i][j][k] = episode and person
            for (k = 0; k < characters.length; k++) {
                //countData.series.push({name: idx2name.get(k), values: []});
                countData.series[k].values.push(count[i][j][k]);
            }
            if (j == 0) {
                //xVals.push(i+1);
                xVals.push('s' + (i+1));
            } else {
                //xVals.push(j+1);
                xVals.push('s' + (i+1) + 'e' + (j+1));
            }
        }
    }
    console.log('xVals');
    console.log(xVals);
    //console.log('countData');
    //console.log(countData);
   
    
    var y = d3.scaleSqrt()
    //var y = d3.scaleLog()
        //.base(2)
    //var y = d3.scaleLinear()    
        .domain([0, d3.max(countData.series, d=> d3.max(d.values))]).nice()
        .range([height-margin.bottom-margin.top, 40]);

    var x = d3.scaleLinear()
        .domain([0, 153])
        .range([margin.left, width-margin.right]);
    //
    //from https://bl.ocks.org/jkeohan/b8a3a9510036e40d3a4e
    //
    var dataL = 0;
    var offset = width/20;
    
    
    ll = group.selectAll('.lineLeg')
        .data(characters)
        .enter().append('g')
        .attr('class', 'lineLeg')
        .attr('cursor', 'pointer')
        .on('click', (d, i)=>highlight(i))
        .attr('transform', function(d, i) {
        //    return 'translate(' + (d.length*10 + i*70)  + ', 0)'; });
        //.attr('transform', function (d, i) {
            if (i === 0) {
                dataL = d.length + offset;
                return 'translate(0, -10)';
            } else {
                var temp = dataL;
                dataL += d.length + offset;
                return 'translate(' + temp + ', -10)';
            }
        });
    
    ll.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 10)
        .attr('height', 10)
        .attr('class', 'box')
        .style('fill', function (d, i) {
            return lineColor(i);
        });
        //.on('click', (d, i) => highlight(i));

    ll.append('text')
        .attr('class', 'words')
        .attr('x', 15)
        .attr('y', 9)
        .text( function (d, i) {
            return d;
        })
        .style('font', '10px sans-serif')
        .style('text-anchor', 'start');

    function xAxis() { 
        group.append('g')
            .attr('transform', 'translate(' + margin.left  + ', ' + (height-40) + ')')
            .call(d3.axisBottom(x)
                  .tickFormat(function(d) { return xVals[d]; })
                  .tickValues(seasonIdx)
                  .tickSizeOuter(0))
            .call(g => g.select('.domain').remove());
    }
    //console.log(x); 
    //function yAxis() {
    group.append('g')
        .attr('transform', 'translate(' + margin.left + ', 0)')
        .call(d3.axisLeft(y))
        .call(g => g.select('.tick:last-of-type text').clone()
            .attr('x', 3)
            .attr('text-anchor', 'start')
            .attr('font-weight', 'bold')
            .text(countData.y))
        .call(g => g.select('.domain').remove());
    //}

    //console.log('yAxis');
    var drawnline = d3.line()
        //.defined(d=> !isNAN(d))
        .x((d, i) => x(i))
        .y(d=>y(d))
        .curve(d3.curveBasis);
    //console.log('line');
    group.append('g').call(xAxis);
    //group.append('g').call(yAxis);
    //console.log('yAxis append');
    var a = 0;
    const path = group.append('g')
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('cursor', 'pointer')
        .selectAll('path')
        .data(countData.series)
          .enter().append('path')
          .attr('class', 'lines')
          .attr('stroke', function(d, i) { return color(i); })
          //.on('click', function(d, i) { return toTree(d, i, d3.mouse(this), script, yon); })
          .on('click', function(d, i) { a++; return draw51(i, a, countByChar[i]);})
          .attr('d', d=>drawnline(d.values))
          ;
    var mouseCo;
    path.on('mouseover', function (d, i) {
          mouseCo = d3.mouse(this);
          seText(d, i, mouseCo);
          path.append('title')
              .text(function(d, i) { return seText(d, i, mouseCo);});
          })
          .on('mouseout', function(d, i) {
              path.selectAll('title').remove();
          });
    //console.log('its the title');
    //path
          //.append('title')
          //.text(function(d, i) { return seText(d, i, d3.mouse(this)); });
          //.text(d=>dummy());
    console.log(path);
    console.log('just xAxis left');
    console.log('done'); 
}


function dummy() {
    return 'here';
}

//drawThis();




