// Example adapted from Mike Bostock: https://bl.ocks.org/mbostock/3885304
// Modified to work with d3.v5
console.log('Hello from main.js');

// some margins for our graph (so it fits our SVG viewport nicely)
var margin = {
    top: 20,
    right: 20,
    bottom: 10,
    left: 20
};

// create our SVG canvas and give it the height and width we want
var svg = d3.select('body').append('svg')
    .attr('width', window.innerWidth)
    .attr('height', (window.innerHeight-100) * 3.5)
    .attr('text-anchor', 'middle')
    .style("font", "10px sans-serif");
// height and width of our chart
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom - 40;

//sourced from https://codeburst.io/javascript-array-distinct-5edc93501dc4
const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}
// define a group for our visualization
// this is good practice (to keep things clustered into their relevant groups),
// and lets you manipulate the entire group
var g = svg.append('g')
           .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var gg = svg.append('gg')
           .attr('transform', 'translate(' + margin.left + ',' + window.innerHeight * 2 + ')');
//
//sourced from https://beta.observablehq.com/@mbostock/d3-streamgraph
//
var stanStart = new Date(1927, 0, 1);
var stanEnd = new Date(2017, 11, 1);
const cellSize = 17;
var toolTip = document.getElementById("myToolTip");

//function findKey(me) {
//    return 
//}
function reset() {
    g.selectAll('*')
        .remove();
    //svg.selectAll('circle')
    //    .remove();
    window.scroll( {
      top: 0,
      left: 0,
      behavior: 'smooth'
      });
    draw(stanStart, stanEnd);
}

draw(stanStart, stanEnd);

function inputYears() {
    var input = document.getElementById("years");
    if (input.elements[0].value) {
       inStart = new Date(+input.elements[0].value, 0, 1);
    } else {
       inStart = stanStart;
    } if (input.elements[1].value) {
       inEnd = new Date(+input.elements[1].value, 11, 1);
    } else {
       inEnd = stanEnd;
    }
    redraw(inStart, inEnd);
}

function pack(data) {
    packItem = d3.pack(data)
        .size([width - 2, height - 2])
        .padding(3)
      (d3.hierarchy({children: data})
        .sum(d => d.value))
    return packItem;
}

function color(i) {
    cc = d3.scaleLinear()
          .domain([1927, 2018])
          .range([0, 1]);

    return d3.interpolateBuPu(cc(i));
}



function groupHigh(d) {
    var check = d;
    d3.selectAll('circle')
        .attr('fill-opacity', 0.7);
    d3.selectAll('circle')
        .filter( function(d) { return d.data.title != check.data.title; })
        .attr('fill-opacity', 0.3);
}

//
//sourced from https://beta.observablehq.com/@mbostock/d3-calendar-view
//https://bl.ocks.org/danbjoseph/13d9365450c27ed3bf5a568721296dcc
//
function calendar(co) {
    proco = compMap.find( function(d) { return d.key == co; });
    console.log(compMap.find( function(d) { return d.key == co;}));
    
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', window.innerHeight * 2)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('This should be a calendar showing all the movies produced by a specific company.');
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', window.innerHeight * 2 + 14)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('Colors of the squares would match the genre colors from the original stream graph'); 
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', window.innerHeight * 2 + 28)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('The saturation of the squares would be proportional to the revenue the movie made.'); 
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', window.innerHeight * 2 + 44)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('Movie information would appear as you hover over the square.');
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', window.innerHeight * 2 + 58)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('To pick a new genre or company, the page needs to be refreshed.');
    
    window.scroll({
          top: (window.innerHeight * 2),
          left: 0,
          behavior: 'smooth'});
    
    g.append('text')
        .attr('class', 'label')
        .attr('x', window.innerWidth/2)
        .attr('y', window.innerHeight * 2.85)
        .attr('font-size', '24px')
        .attr('text-anchor', 'middle')
        .text(co);
    
    var thing = [];
    for (i = 0; i < proco.values.length; i++) {
        thing[i] = {
            name: proco.values[i].title,
            date: proco.values[i].date,
            value: proco.values[i].value
        }
    }

    console.log(thing);

    //console.log(yearsArr);

    var weeksInMonth = function(month) {
        var m = d3.timeMonth.floor(month);
        return d3.timeWeeks(d3.timeWeek.floor(m), d3.timeMonth.offset(m, 1)).length;
    }

    var minDate = d3.min(thing, function(d) { return d.date; } );
    var maxDate = d3.max(thing, function(d) { return d.date; } );

    console.log(minDate);
    console.log(maxDate);
    
    var cellMargin = 2;
    var cellSize = 10;
    
    var day = d3.timeFormat('%W');
    var week = d3.timeFormat('%U');
    var format = d3.timeFormat('%Y-%m-%d');
    var titleFormat = d3.utcFormat("%a, %d-%b");
    var monthName = d3.timeFormat('%B');
    var months = d3.timeMonth.range(d3.timeMonth.floor(minDate), maxDate);

    console.log(months);
    //var cal = d3.select('#calendar').selectAll('g')
    var cal = g.selectAll('g')
        .data(months)
        .enter().append('g')
            .attr('class', 'month')
            .attr('height', ((cellSize * 7) + (cellMargin * 8) + 20))
            .attr('width', function(d) {
                var columns = weeksInMonth(d);
                return ((cellSize * columns) + (cellMargin * (columns + 1)));
            })
            .append('g');
    
    cal.append('text')
        .attr('class', 'month-name')
        .attr('y', (cellSize * 7) + (cellMargin * 8) + 15 + (window.innerHeight * 2))
        .attr('x', function(d) {
            var columns = weeksInMonth(d);
            return (((cellSize * columns) + (cellMargin * (columns + 1))) / 2);
        })
        .attr('text-anchor', 'middle')
        .text(function(d) { return monthName(d); });

    var rect = cal.selectAll('rect.day')
        .data(function(d, i) { return d3.timeDays(d, new Date(d.getFullYear(), d.getMonth()+1, 1)); })
        .enter().append('rect')
            .attr('class', 'date')
            .attr('width', cellSize)
            .attr('height', cellSize)
            .attr('fill', '#eaeaea')
            .attr('y', function(d) { return (day(d) * cellSize) + (day(d) * cellMargin) + cellMargin + (window.innerHeight * 2); })
            .attr('x', function(d) { return ((week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellSize) + ((week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellMargin) + cellMargin ;})
            .datum(format);

    
    rect.append('title')
        .text(function(d) { return titleFormat(new Date(d)); });

    const yearsArr = d3.nest()
          .key(function (d) { return d.date; })
          .rollup(function(leaves) {
              return d3.sum(leaves, function(d) { return parseInt(d.value); });
          })
          .object(thing);

    var scale = d3.scaleLinear()
          .domain(d3.extent(thing, function(d) {return parseInt(d.value); }))
          .range([0.4, 1]);

    rect.filter(function(d) {return d in yearsArr; })
        .style('fill', function(d) { return d3.interpolatePuBu(scale(lookup[d.value])); })
        .select('title')
            .text(function(d) { return 'here' + titleFormat(new Date(d)) + ': ' + lookup[d.value]; });
    console.log('did it');
}

var genMap = [];
var compMap = [];

//
//https://beta.observablehq.com/@mbostock/d3-bubble-chart
//
function newViz(i) {
    window.scroll({
          top: window.innerHeight -25,
          left: 0,
          behavior: 'smooth'});
    
    
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', window.innerHeight)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('This shows all the movies produced in the selected genre.');
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', window.innerHeight + 14)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('To see the movie title, release year, and production company,'); 
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', window.innerHeight + 28)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text(' hover your mouse over the bubble you are interested in.'); 
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', window.innerHeight + 44)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('All other movies in this genre produced by the same company will highlight as you hover.');
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', window.innerHeight + 58)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('The size of the bubble is proportional to the revenue it produced.');
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', window.innerHeight + 72)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('The color of the bubble is more saturated the more recently it was released.');
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', window.innerHeight + 86)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('To see all produced by this production company, click on the bubble.');
    
    
    
    g.append('text')
        .attr('class', 'label')
        .attr('x', window.innerWidth/2)
        .attr('y', window.innerHeight * 1.85)
        .attr('font-size', '24px')
        .attr('text-anchor', 'end')
        .text(genMap[i].key);
    var thing = [];
    for (j = 0; j<genMap[i].values.length; j++) {
        thing[j] = {
            name: genMap[i].values[j].title,
            title: genMap[i].values[j].name,
            group: genMap[i].values[j].year,
            value: genMap[i].values[j].value
        }
    }

    console.log(thing);
    //
    //from https://beta.observablehq.com/@mbostock/d3-bubble-chart
    //
    var root = pack(thing);
    console.log(root);
    var leaf = svg.selectAll('g')
        .data(root.leaves())
        .enter().append('g')
            .attr('transform', d => 'translate(' + (d.x + 1) + ',' + (height +d.y + 1) + ')');
    
    leaf.append('circle')
        .attr('r', d=>d.r)
        .attr('fill-opacity', 0.7)
        .attr('fill', function(d) { return color(d.data.group); })
        .on('mouseover', function (d) { return groupHigh(d); })
        .on('click', function (d, i) { calendar(d.data.title); })
        ;
    
    
    leaf.append('title')
        .text(function(d) { return d.data.name + ', ' + d.data.group + '\n' + d.data.title; });
    
          //.on('press', function (d, i) { calendar(d.data.title); })
}

// height and width of our chart
// select which file you want to load in our CSV file
function draw (s, e) { 
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', 0)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('This shows movie revenue per genre from the years 1927-2017.');
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', 14)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('To change the time period of the visualization, enter a start year, an end year, or both and click \'Show Years!\'.'); 
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', 28)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('To see which genre coordinates with a certain color, hover your mouse over the color stream you are interested in.');
  g.append('text')
      .attr('x', window.innerWidth - 50)
      .attr('y', 44)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#585858')
      .text('To see all movies in this genre, click on the color stream.');
  
  console.log('draw');
  d3.csv('tmdb_5000_movies.csv').then(function(data) {
    // we have our data in here now
    var dataSrc = {};
    var comps = [];
    var movies = [];
    var gens = [];
    var genres = [];
    count = 0;
    
    let theThing = data.forEach(function(datum) {
      //converting text to numbers
      datum["budget"] = +datum["budget"];
      datum["popularity"] = +datum["popularity"];
      datum["revenue"] = +datum["revenue"];
      datum["vote_average"] = +datum["vote_average"];
      datum["vote_count"] = +datum["vote_count"];
      datum["runtime"] = +datum["runtime"];
      
      datum["release_date"] = datum["release_date"].split("/");
        datum["release_date"][0] = +datum["release_date"][0];
        datum["release_date"][1] = +datum["release_date"][1];
        datum["release_date"][2] = +datum["release_date"][2];
        if (datum["release_date"][2] <= 18) {
          datum["release_date"][2] += 2000;
        } else {
          datum["release_date"][2] += 1900;
        }
        datum["released"] = new Date(datum["release_date"][2], datum["release_date"][0]-1, datum["release_date"][1]);
        
      datum["production_companies"] = datum["production_companies"].split(/"name"|"id"|\"|{|}|,|:/g);
        for (i=0; i<datum["production_companies"].length; i++) {
          datum["production_companies"][i] = datum["production_companies"][i].trim();
        }
        datum["production_companies"] = datum["production_companies"].filter(word => word.length > 6);
        for (i=0; i < datum["production_companies"].length; i++) {
          if (comps.includes(datum["production_companies"][i]) == false) {
            comps.push(datum["production_companies"][i]);
          }
          movies.push(
            {name: datum["production_companies"][i], 
             title: datum["original_title"], 
             value: datum["revenue"], 
             date: datum["released"]
             //genre: datum["genres"]}
          });
        }
      datum["production_countries"] = datum["production_countries"].split(/"name"|"id"|\"|{|}|,|:|_/g);
        for (i=0; i<datum["production_countries"].length; i++) {
          datum["production_countries"][i] = datum["production_countries"][i].trim();
        }
        datum["production_countries"] = datum["production_countries"].filter(word => word.length > 4);
      
      datum["genres"] = datum["genres"].split(/"name"|"id"|\"|{|}|,|:|_/g);
        for (i=0; i<datum["genres"].length; i++) {
          datum["genres"][i] = datum["genres"][i].trim();
        }
        datum["genres"] = datum["genres"].filter(word => word.length > 4);
        for (i=0; i<datum["genres"].length; i++) {
          gens.push(datum["genres"][i]);
          genres.push(
             {name: datum["production_companies"][0],
             title: datum["original_title"],
             value: +datum["revenue"] / datum["genres"].length,
             date: datum["released"],
             year: datum["release_date"][2],
             month: datum["release_date"][0],
             day: datum["release_date"][1],
             genre: datum["genres"][i]
          });
        }
      
      datum["keywords"] = datum["keywords"].split(/"name"|"id"|\"|{|}|,|:|_/g);
        for (i=0; i<datum["keywords"].length; i++) {
          datum["keywords"][i] = datum["keywords"][i].trim();
        }
        datum["keywords"] = datum["keywords"].filter(word => word.length > 5);
      dataSrc[count]=datum;
      count += 1;
      
    });
    comps = comps.filter(onlyUnique);
    gens = gens.filter(onlyUnique);
    gens.splice(23,1);
    gens.splice(21,1);
    gens.splice(18,1);
    gens.splice(17,1);
    gens.splice(12,1);
    gens.splice(8,1);
    
    
    compMap = d3.nest()
        .key(function(d) {return d.name;} )
//          .sortKeys(d3.ascending)
        .entries(movies);
    console.log(compMap);
    genMap = d3.nest()
        .key(function(d) {return d.genre;} )
        .entries(genres);
    genMap.splice(23,1);
    genMap.splice(21,1);
    genMap.splice(18,1);
    genMap.splice(17,1);
    genMap.splice(12,1);
    genMap.splice(8,1);
    
    var genMonth = [];
    var action = []; //genMap[0]
    var adv = []; //genMap[1] 
    var fanta = []; //genMap[2]
    var scifi = [];//genMap[3] 
    var crime = [];//genMap[4] 
    var drama = [];//genMap[5] 
    var thrill = [];//genMap[6] 
    var anim = [];//genMap[7] 
    var fam = [];//genMap[8] 
    var west = [];//genMap[9] 
    var com = [];//genMap[10] 
    var rom = [];//genMap[11] 
    var hor = [];//genMap[12] 
    var myst = [];//genMap[13] 
    var hist = [];//genMap[14] 
    var mus = [];//genMap[15] 
    var doc = [];//genMap[16] 
    var foreign = [];//genMap[17] 
    var TV = [];//genMap[18] 

    for (i = 1925; i < 2018; i++) {
        action[i-1925] = [];
        adv[i-1925] = [];
        fanta[i-1925] = [];
        scifi[i-1925] = [];
        crime[i-1925] = [];
        drama[i-1925] = [];
        thrill[i-1925] = [];
        anim[i-1925] = [];
        fam[i-1925] = [];
        west[i-1925] = [];
        com[i-1925] = [];
        rom[i-1925] = [];
        hor[i-1925] = [];
        myst[i-1925] = [];
        hist[i-1925] = [];
        mus[i-1925] = [];
        doc[i-1925] = [];
        foreign[i-1925] = [];
        TV[i-1925] = [];
        for (j = 0; j < 12; j++) {
            action[i-1925][j] = 0;
            adv[i-1925][j] = 0;
            fanta[i-1925][j] = 0;
            scifi[i-1925][j] = 0;
            crime[i-1925][j] = 0;
            drama[i-1925][j] = 0;
            thrill[i-1925][j] = 0;
            anim[i-1925][j] = 0;
            fam[i-1925][j] = 0;
            west[i-1925][j] = 0;
            com[i-1925][j] = 0;
            rom[i-1925][j] = 0;
            hor[i-1925][j] = 0;
            myst[i-1925][j] = 0;
            hist[i-1925][j] = 0;
            mus[i-1925][j] = 0;
            doc[i-1925][j] = 0;
            foreign[i-1925][j] = 0;
            TV[i-1925][j] = 0;
        }
    }
    for (i = 0; i < genMap[0]["values"].length; i++) { //number of action movies
        action[genMap[0]["values"][i].year - 1925][genMap[0]["values"][i].month - 1] += genMap[0]["values"][i].value; //action[year idx][month idx] += action val  
    }
    for (i = 0; i < genMap[1]["values"].length; i++) {
        adv[genMap[1]["values"][i].year - 1925][genMap[1]["values"][i].month - 1] += genMap[1]["values"][i].value;
    }
    for (i = 0; i < genMap[2]["values"].length; i++) {
        fanta[genMap[2]["values"][i].year - 1925][genMap[2]["values"][i].month - 1] += genMap[2]["values"][i].value;
    }
    for (i = 0; i < genMap[3]["values"].length; i++) {
        scifi[genMap[3]["values"][i].year - 1925][genMap[3]["values"][i].month - 1] += genMap[3]["values"][i].value;
    }
    for (i = 0; i < genMap[4]["values"].length; i++) { 
        crime[genMap[4]["values"][i].year - 1925][genMap[4]["values"][i].month - 1] += genMap[4]["values"][i].value; 
    }
    for (i = 0; i < genMap[5]["values"].length; i++) {
        drama[genMap[5]["values"][i].year - 1925][genMap[5]["values"][i].month - 1] += genMap[5]["values"][i].value;
    }
    for (i = 0; i < genMap[6]["values"].length; i++) {
        thrill[genMap[6]["values"][i].year - 1925][genMap[6]["values"][i].month - 1] += genMap[6]["values"][i].value;
    }
    for (i = 0; i < genMap[7]["values"].length; i++) {
        anim[genMap[7]["values"][i].year - 1925][genMap[7]["values"][i].month - 1] += genMap[7]["values"][i].value;
    }
    for (i = 0; i < genMap[8]["values"].length; i++) {
        fam[genMap[8]["values"][i].year - 1925][genMap[8]["values"][i].month - 1] += genMap[8]["values"][i].value;
    }
    for (i = 0; i < genMap[9]["values"].length; i++) {
        west[genMap[9]["values"][i].year - 1925][genMap[9]["values"][i].month - 1] += genMap[9]["values"][i].value;
    }
    for (i = 0; i < genMap[10]["values"].length; i++) {
        com[genMap[10]["values"][i].year - 1925][genMap[10]["values"][i].month - 1] += genMap[10]["values"][i].value;
    }
    for (i = 0; i < genMap[11]["values"].length; i++) {
        rom[genMap[11]["values"][i].year - 1925][genMap[11]["values"][i].month - 1] += genMap[11]["values"][i].value;
    }
    for (i = 0; i < genMap[12]["values"].length; i++) {
        hor[genMap[12]["values"][i].year - 1925][genMap[12]["values"][i].month - 1] += genMap[12]["values"][i].value;
    }
    for (i = 0; i < genMap[13]["values"].length; i++) {
        myst[genMap[13]["values"][i].year - 1925][genMap[13]["values"][i].month - 1] += genMap[13]["values"][i].value;
    }
    for (i = 0; i < genMap[14]["values"].length; i++) { 
        hist[genMap[14]["values"][i].year - 1925][genMap[14]["values"][i].month - 1] += genMap[14]["values"][i].value; 
    }
    for (i = 0; i < genMap[15]["values"].length; i++) {
        mus[genMap[15]["values"][i].year - 1925][genMap[15]["values"][i].month - 1] += genMap[15]["values"][i].value;
    }
    for (i = 0; i < genMap[16]["values"].length; i++) {
        doc[genMap[16]["values"][i].year - 1925][genMap[16]["values"][i].month - 1] += genMap[16]["values"][i].value;
    }
    for (i = 0; i < genMap[17]["values"].length; i++) {
        foreign[genMap[17]["values"][i].year - 1925][genMap[17]["values"][i].month - 1] += genMap[17]["values"][i].value;
    }
    for (i = 0; i < genMap[18]["values"].length; i++) {
        TV[genMap[18]["values"][i].year - 1925][genMap[18]["values"][i].month - 1] += genMap[18]["values"][i].value;
    }
    console.log('bye');
    for (i = 0; i < 1; i++) { //for all genres
        len = genMap[i]["values"].length; //number of movies in specific genre
        for (j = 0; j < len; j++) { //for all movies in genre
            genMonth.push ( {
                'date': new Date(genMap[i]["values"][j].year, genMap[i]["values"][j].month - 1, 1),
                'Action': action[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Adventure': adv[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Fantasy': fanta[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Science Fiction': scifi[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Crime': crime[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Drama': drama[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Thriller': thrill[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Animation': anim[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Family': fam[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Western': west[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Comedy': com[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Romance': rom[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Horror': hor[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Mystery': myst[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'History': hist[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Music': mus[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Documentary': doc[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Foreign': foreign[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'TV Movie': TV[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                } ); //push date: year, month-1; genre: genre; acion: action[year idx][month idx]
        }
    }
    genMonth.sort( function (a, b)  {
      return a.date-b.date; 
    });

    //
    //from: https://github.com/d3/d3-shape#lines
    //
    var stackGen = d3.stack()
          .keys(gens)
          .order(d3.stackOrderInsideOut)
          .offset(d3.stackOffsetSilhouette);
    var stackedGens = stackGen(genMonth);

    var yy = d3.scaleLinear()
              .domain([-2000000000, 2000000000])
              .range([height-margin.bottom-100, margin.top+50]);

    var xx = d3.scaleTime()
              .domain([s, e])
              .range([margin.left, width-margin.right]);
    
    //d3.select('g').append('g')
    //    .attr("transform", 'translate(0, ' + (height - margin.bottom) + ')')
    //    .call(d3.axisBottom(xx).ticks(d3.timeYear.every(10)).tickSizeOuter(0))
    //    .call(g => g.select(".domain").remove())
    //    ;
    //var xAxis = g.append('xAxis')
    //          .attr("transform", 'translate(0, ' + (height - margin.bottom) + ')')
    //          .call(d3.axisBottom(xx).ticks(d3.timeYear.every(10)).tickSizeOuter(0))
    //          .call(g => g.select(".domain").remove());
    
     var area = d3.area()
        .curve(d3.curveNatural)
        .x(function(d) { return xx(d.data.date); })
        .y0(function(d) { return yy(d[0]); })
        .y1(function(d) { return yy(d[1]); });
    
     var colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
     //g.transition();
     console.log('important');
     console.log(stackedGens);
     var chart = g.selectAll('path')
        .data(stackedGens)
        .enter()
            .append('path')
            .attr('fill', function(d, i) { return colors[i]; } )
            .attr('d', area)
            .on('click', function(d, i) { newViz(i); })
            .append('title')
                //.text(function(d, i) {return (gens[i] + ', ' + d[i].data.date.getFullYear()); })
                .text(function(d, i) { return gens[i]; })
      ;
      g.append('g')
            .attr('id', 'xAxis')
            .attr("transform", 'translate(0, ' + (height - margin.bottom-40) + ')')
            .call(d3.axisBottom(xx).ticks(width / 50).tickSizeOuter(0))
            .call(g => g.select(".domain").remove())
            ;

    console.log('here');
}); }

function redraw (s, e) { 
  console.log("redraw");
  d3.csv('tmdb_5000_movies.csv').then(function(data) {
    // we have our data in here now
    var dataSrc = {};
    var comps = [];
    var movies = [];
    var gens = [];
    var genres = [];
    count = 0;
    
    let theThing = data.forEach(function(datum) {
      //converting text to numbers
      datum["budget"] = +datum["budget"];
      datum["popularity"] = +datum["popularity"];
      datum["revenue"] = +datum["revenue"];
      datum["vote_average"] = +datum["vote_average"];
      datum["vote_count"] = +datum["vote_count"];
      datum["runtime"] = +datum["runtime"];
      
      datum["release_date"] = datum["release_date"].split("/");
        datum["release_date"][0] = +datum["release_date"][0];
        datum["release_date"][1] = +datum["release_date"][1];
        datum["release_date"][2] = +datum["release_date"][2];
        if (datum["release_date"][2] <= 18) {
          datum["release_date"][2] += 2000;
        } else {
          datum["release_date"][2] += 1900;
        }
        datum["released"] = new Date(datum["release_date"][2], datum["release_date"][0]-1, datum["release_date"][1]);
        
      datum["production_companies"] = datum["production_companies"].split(/"name"|"id"|\"|{|}|,|:/g);
        for (i=0; i<datum["production_companies"].length; i++) {
          datum["production_companies"][i] = datum["production_companies"][i].trim();
        }
        datum["production_companies"] = datum["production_companies"].filter(word => word.length > 6);
        for (i=0; i < datum["production_companies"].length; i++) {
          if (comps.includes(datum["production_companies"][i]) == false) {
            comps.push(datum["production_companies"][i]);
          }
          movies.push(
            {name: datum["production_companies"][i], 
             title: datum["original_title"], 
             value: datum["revenue"], 
             date: datum["released"]
          });
        }
      datum["production_countries"] = datum["production_countries"].split(/"name"|"id"|\"|{|}|,|:|_/g);
        for (i=0; i<datum["production_countries"].length; i++) {
          datum["production_countries"][i] = datum["production_countries"][i].trim();
        }
        datum["production_countries"] = datum["production_countries"].filter(word => word.length > 4);
      
      datum["genres"] = datum["genres"].split(/"name"|"id"|\"|{|}|,|:|_/g);
        for (i=0; i<datum["genres"].length; i++) {
          datum["genres"][i] = datum["genres"][i].trim();
        }
        datum["genres"] = datum["genres"].filter(word => word.length > 4);
        for (i=0; i<datum["genres"].length; i++) {
          gens.push(datum["genres"][i]);
          genres.push(
             {name: datum["production_companies"][i],
             title: datum["original_title"],
             value: +datum["revenue"] / datum["genres"].length,
             date: datum["released"],
             year: datum["release_date"][2],
             month: datum["release_date"][0],
             day: datum["release_date"][1],
             genre: datum["genres"][i]
          });
        }
      
      datum["keywords"] = datum["keywords"].split(/"name"|"id"|\"|{|}|,|:|_/g);
        for (i=0; i<datum["keywords"].length; i++) {
          datum["keywords"][i] = datum["keywords"][i].trim();
        }
        datum["keywords"] = datum["keywords"].filter(word => word.length > 5);
      dataSrc[count]=datum;
      count += 1;
      
    });
    comps = comps.filter(onlyUnique);
    gens = gens.filter(onlyUnique);
    gens.splice(23,1);
    gens.splice(21,1);
    gens.splice(18,1);
    gens.splice(17,1);
    gens.splice(12,1);
    gens.splice(8,1);
    
    
    var compMap = d3.nest()
        .key(function(d) {return d.name;} )
//          .sortKeys(d3.ascending)
        .entries(movies);
    console.log(compMap);
    genMap = d3.nest()
        .key(function(d) {return d.genre;} )
        .entries(genres);
    genMap.splice(23,1);
    genMap.splice(21,1);
    genMap.splice(18,1);
    genMap.splice(17,1);
    genMap.splice(12,1);
    genMap.splice(8,1);
    
    var genMonth = [];
    var action = []; //genMap[0]
    var adv = []; //genMap[1] 
    var fanta = []; //genMap[2]
    var scifi = [];//genMap[3] 
    var crime = [];//genMap[4] 
    var drama = [];//genMap[5] 
    var thrill = [];//genMap[6] 
    var anim = [];//genMap[7] 
    var fam = [];//genMap[8] 
    var west = [];//genMap[9] 
    var com = [];//genMap[10] 
    var rom = [];//genMap[11] 
    var hor = [];//genMap[12] 
    var myst = [];//genMap[13] 
    var hist = [];//genMap[14] 
    var mus = [];//genMap[15] 
    var doc = [];//genMap[16] 
    var foreign = [];//genMap[17] 
    var TV = [];//genMap[18] 

    for (i = 1925; i < 2018; i++) {
        action[i-1925] = [];
        adv[i-1925] = [];
        fanta[i-1925] = [];
        scifi[i-1925] = [];
        crime[i-1925] = [];
        drama[i-1925] = [];
        thrill[i-1925] = [];
        anim[i-1925] = [];
        fam[i-1925] = [];
        west[i-1925] = [];
        com[i-1925] = [];
        rom[i-1925] = [];
        hor[i-1925] = [];
        myst[i-1925] = [];
        hist[i-1925] = [];
        mus[i-1925] = [];
        doc[i-1925] = [];
        foreign[i-1925] = [];
        TV[i-1925] = [];
        for (j = 0; j < 12; j++) {
            action[i-1925][j] = 0;
            adv[i-1925][j] = 0;
            fanta[i-1925][j] = 0;
            scifi[i-1925][j] = 0;
            crime[i-1925][j] = 0;
            drama[i-1925][j] = 0;
            thrill[i-1925][j] = 0;
            anim[i-1925][j] = 0;
            fam[i-1925][j] = 0;
            west[i-1925][j] = 0;
            com[i-1925][j] = 0;
            rom[i-1925][j] = 0;
            hor[i-1925][j] = 0;
            myst[i-1925][j] = 0;
            hist[i-1925][j] = 0;
            mus[i-1925][j] = 0;
            doc[i-1925][j] = 0;
            foreign[i-1925][j] = 0;
            TV[i-1925][j] = 0;
        }
    }
    for (i = 0; i < genMap[0]["values"].length; i++) { //number of action movies
        action[genMap[0]["values"][i].year - 1925][genMap[0]["values"][i].month - 1] += genMap[0]["values"][i].value; //action[year idx][month idx] += action val  
    }
    for (i = 0; i < genMap[1]["values"].length; i++) {
        adv[genMap[1]["values"][i].year - 1925][genMap[1]["values"][i].month - 1] += genMap[1]["values"][i].value;
    }
    for (i = 0; i < genMap[2]["values"].length; i++) {
        fanta[genMap[2]["values"][i].year - 1925][genMap[2]["values"][i].month - 1] += genMap[2]["values"][i].value;
    }
    for (i = 0; i < genMap[3]["values"].length; i++) {
        scifi[genMap[3]["values"][i].year - 1925][genMap[3]["values"][i].month - 1] += genMap[3]["values"][i].value;
    }
    for (i = 0; i < genMap[4]["values"].length; i++) { 
        crime[genMap[4]["values"][i].year - 1925][genMap[4]["values"][i].month - 1] += genMap[4]["values"][i].value; 
    }
    for (i = 0; i < genMap[5]["values"].length; i++) {
        drama[genMap[5]["values"][i].year - 1925][genMap[5]["values"][i].month - 1] += genMap[5]["values"][i].value;
    }
    for (i = 0; i < genMap[6]["values"].length; i++) {
        thrill[genMap[6]["values"][i].year - 1925][genMap[6]["values"][i].month - 1] += genMap[6]["values"][i].value;
    }
    for (i = 0; i < genMap[7]["values"].length; i++) {
        anim[genMap[7]["values"][i].year - 1925][genMap[7]["values"][i].month - 1] += genMap[7]["values"][i].value;
    }
    for (i = 0; i < genMap[8]["values"].length; i++) {
        fam[genMap[8]["values"][i].year - 1925][genMap[8]["values"][i].month - 1] += genMap[8]["values"][i].value;
    }
    for (i = 0; i < genMap[9]["values"].length; i++) {
        west[genMap[9]["values"][i].year - 1925][genMap[9]["values"][i].month - 1] += genMap[9]["values"][i].value;
    }
    for (i = 0; i < genMap[10]["values"].length; i++) {
        com[genMap[10]["values"][i].year - 1925][genMap[10]["values"][i].month - 1] += genMap[10]["values"][i].value;
    }
    for (i = 0; i < genMap[11]["values"].length; i++) {
        rom[genMap[11]["values"][i].year - 1925][genMap[11]["values"][i].month - 1] += genMap[11]["values"][i].value;
    }
    for (i = 0; i < genMap[12]["values"].length; i++) {
        hor[genMap[12]["values"][i].year - 1925][genMap[12]["values"][i].month - 1] += genMap[12]["values"][i].value;
    }
    for (i = 0; i < genMap[13]["values"].length; i++) {
        myst[genMap[13]["values"][i].year - 1925][genMap[13]["values"][i].month - 1] += genMap[13]["values"][i].value;
    }
    for (i = 0; i < genMap[14]["values"].length; i++) { 
        hist[genMap[14]["values"][i].year - 1925][genMap[14]["values"][i].month - 1] += genMap[14]["values"][i].value; 
    }
    for (i = 0; i < genMap[15]["values"].length; i++) {
        mus[genMap[15]["values"][i].year - 1925][genMap[15]["values"][i].month - 1] += genMap[15]["values"][i].value;
    }
    for (i = 0; i < genMap[16]["values"].length; i++) {
        doc[genMap[16]["values"][i].year - 1925][genMap[16]["values"][i].month - 1] += genMap[16]["values"][i].value;
    }
    for (i = 0; i < genMap[17]["values"].length; i++) {
        foreign[genMap[17]["values"][i].year - 1925][genMap[17]["values"][i].month - 1] += genMap[17]["values"][i].value;
    }
    for (i = 0; i < genMap[18]["values"].length; i++) {
        TV[genMap[18]["values"][i].year - 1925][genMap[18]["values"][i].month - 1] += genMap[18]["values"][i].value;
    }
    console.log('bye');
    for (i = 0; i < 1; i++) { //for all genres
        len = genMap[i]["values"].length; //number of movies in specific genre
        for (j = 0; j < len; j++) { //for all movies in genre
            genMonth.push ( {
                'date': new Date(genMap[i]["values"][j].year, genMap[i]["values"][j].month - 1, 1),
                'Action': action[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Adventure': adv[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Fantasy': fanta[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Science Fiction': scifi[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Crime': crime[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Drama': drama[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Thriller': thrill[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Animation': anim[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Family': fam[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Western': west[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Comedy': com[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Romance': rom[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Horror': hor[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Mystery': myst[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'History': hist[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Music': mus[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Documentary': doc[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'Foreign': foreign[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                'TV Movie': TV[genMap[i]["values"][j].year - 1925][genMap[i]["values"][j].month - 1],
                } ); //push date: year, month-1; genre: genre; acion: action[year idx][month idx]
        }
    }
    genMonth.sort( function (a, b)  {
      return a.date-b.date; 
    });

    //
    //from: https://github.com/d3/d3-shape#lines
    //
    var stackGen = d3.stack()
          .keys(gens)
          .order(d3.stackOrderInsideOut)
          .offset(d3.stackOffsetSilhouette);
    var stackedGens = stackGen(genMonth);

    var yy = d3.scaleLinear()
              .domain([-2000000000, 2000000000])
              .range([height-margin.bottom - 100, margin.top]);

    var xx = d3.scaleTime()
              .domain([s, e])
              .range([margin.left, width-margin.right]);
    //var XA = d3.select('xAxis').transition();
    //var xAxis = g.select('xAxis')
    //          .attr("transform", 'translate(0, ' + (height - margin.bottom) + ')')
    //          .call(d3.axisBottom(xx).ticks(d3.timeYear.every(10)).tickSizeOuter(0))
    //          .call(g => g.select(".domain").remove());
    
     var area = d3.area()
        .curve(d3.curveNatural)
        .x(function(d) { return xx(d.data.date); })
        .y0(function(d) { return yy(d[0]); })
        .y1(function(d) { return yy(d[1]); });
    
     var colors = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
     
     var chart = d3.select('body').transition().duration(500);
     var att = d3.select('body').transition().duration(500);
     console.log('pre select')
     svg.selectAll('#xAxis').remove();
     chart.selectAll('path')
           .attr('d', area)
     ;
     //att.selectAll('#xAxis')
     //     .call(d3.axisBottom(xx).ticks(width / 50).ticksizeOuter(0));     
      //chart.append('g')
      //      .attr('id', 'xAxis')
      //      .attr("transform", 'translate(0, ' + (height - margin.bottom-40) + ')')
      //      .call(d3.axisBottom(xx).ticks(d3.timeYear.every(1)).tickSizeOuter(0))
      //      .call(g => g.select(".domain").remove())
      //      ;
     //chart.selectAll('xAxis')
     //     .remove()
     //     .call(d3.axisBotton(xx).ticks(d3.timeYear.every(10)).tickSizeOuter(0));

}); }
console.log("hey from the outside");









