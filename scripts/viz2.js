//
//tree graphic
//from http://bl.ocks.org/robschmuecker/7880033
//

// some margins for our graph (so it fits our SVG viewport nicely)
var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};

//function zoom() { 
//    gg.attr("transform", 
//                  "translate(" + d3.event.translate + 
//                  ")scale(" + d3.event.scale + ")"); 
//}

//var zoomListener = d3.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);
var viewerWidth = window.innerWidth - margin.left - margin.right;
var viewerHeight = window.innerHeight - margin.top - margin.bottom;
// create our SVG canvas and give it the height and width we want
var tvg = d3.select('#body3').append('svg')
    .attr('width', viewerWidth)
    .attr('height', viewerHeight)
    .attr('class', 'overlay')
    .attr('text-anchor', 'middle')
    //.attr('viewBox', [-margin.left, -margin.top, viewerWidth, 10])
    .style("font", "10px sans-serif");
    //.call(zoomListener);

// height and width of our chart
//var width = window.innerWidth - margin.left - margin.right;
//var height = window.innerHeight - margin.top - margin.bottom;
    var r = Math.min(viewerWidth, viewerHeight) - 50;

var gg = tvg.append('g')
            .attr('transform', 'translate(' + (viewerWidth - r)/2 + ',' + (viewerHeight - r)/2 + ')');
            


//characters = ['Lorelai', 'Rory', 'Emily', 'Richard', 'Luke', 'Christopher', 'Jason', 'Max', 
//              'Dean', 'Logan', 'Jess', 'Paris', 'Sookie', 'Jackson', 'Lane', 'Kirk', 'Taylor'];


function thisColor(i) { 
    colors = ['#001f3f', '#0074D9', '#B10DC9', '#AAAAAA', '#39CCCC', '#FFDC00', '#FF851B', 
    '#01FF70', '#F012BE', '#7FDBFF', '#3D9970', '#85144b', '#2ECC40', '##FF4136', '#F012BE', 
    "#3366cc", "#dc3912", "#ff9900"];

    cc = d3.scaleLinear()
          .domain([-2, 17])
          .range([1, 0]);

    return d3.interpolateSpectral(cc(i));
}

function determine(d, i) {
    console.log(d);
    
    if (d == 1) {
        draw2(i);
    } else {
        redraw2(i);
    }
}

function makeTree(data, subj) {
    var re = /\s|:|\[|\]/g;
    
    data = data.split(re);
    var len = data.length;
    console.log(len);
    
    data = data.filter( function (d) { return d.length != 0; });
    console.log(data);
    
    var tree = {
        name: data[0], 
        count: 1,
        children: [] 
    };

    console.log('focus: ');
    console.log(data[2]);
    console.log(data[0]);

    tree.children.push({name: data[1], count: 1, children: []});

    var nameObjs = [];
    //var names = [];
    var curr = tree.children[0];
    var root = tree;
    var ct = 2;

    console.log('root name: ');
    console.log(root.name);
    console.log('curr name: ');
    console.log(curr.name);
    while (ct < len) {
        if (data[ct] == root.name) {
        //curr goes back to root
            curr = root;
            root.count++;
            ct++;
        } else {
            var spot = -1;
            var names = [];
            nameObjs = curr.children; //array of objects
            if (nameObjs.length > 0) {
                for (i = 0; i < nameObjs.length; i++) {
                    names[i] = nameObjs[i]['name'];
                }
                spot = names.findIndex(function (d) { return d == data[ct]; } );
            }
            if (spot >= 0) {
                curr = curr.children[spot];
                curr.count++;
                ct++;
            } else {
                curr.children.push({name: data[ct], count: 1, children: []});
                curr = curr.children[curr.children.length-1];
                ct++;
            }
        }
    }
    
    console.log(tree);
    return tree;
}


//function isParent(d) {
//    return d.children && d.children.length;
//}
//
//function getBB(selector) {
//    return document.querySelector(selector).getBoundingClientRect();
//}
//
//function path(s, d, offset) {
//  var endY = d.y;
//  if (offset) {
//    endY -= getBB('#node-' + d._id).width + 14;
//  }
//  return `M ${s.y} ${s.x}
//          C ${(s.y + endY) / 2} ${s.x},
//            ${(s.y + endY) / 2} ${d.x},
//            ${endY} ${d.x}`
//}

function pack(data) {
    packItem = d3.pack(data)
        .size([r, r])
        .padding(3)
        (d3.hierarchy(data)
          .sum(d => d.count));
    return packItem;
}

function draw2(arr, subj) {
    var treeArr = makeTree(arr, subj);



    var x = d3.scaleLinear().range([0, r]);
    var y = d3.scaleLinear().range([0, r]);

    var node;
    var root;
    //var treeArrNew = d3.hierarchy(treeArr);
    //var treeHi = d3.hierarchy(treeArr);
    //treeHi = treeHi.sum(function(d) { return d.count; });
    console.log(treeArr);
    //console.log(treeHi);
    //var nodes = d3.pack(treeArr)
    //    .size([r, r])
    //    .padding(3)
    //    (d3.hierarchy({children: treeArr}).sum(d => d.count))
    //    //.value(function(d) { return d.size; });
    //    ;
    
    var nodes = pack(treeArr);
    //treeArr.forEach( function(data) {
        node = root = treeArr;
        console.log('nodes');
        
        
        //var nodes = pack(root);
        //var nodes = pack(treeHi);
        console.log(nodes);
        console.log('circle');
        
        gg.selectAll('circle')
            .data(nodes.descendants())
            .enter().append('circle')
                .attr('class', function(d) {return d.children ? 'parent' : 'child'; })
                .attr('cx', function(d) {return d.x; })
                .attr('cy', function(d) {return d.y; })
                .attr('r', function(d) {return d.r; })
                //.attr('fill', 'blue')
                .on('click', function(d) {return zoom(node == d ? root : d); });

        console.log('text');
        
        gg.selectAll('text')
            .data(nodes.descendants())
            .enter().append('text')
                .attr('class', function(d) { return d.children ? 'parent' : 'child'; })
                .attr('x', function(d) {return d.x; })
                .attr('y', function(d) {return d.y; })
                .attr('dy', '.35em')
                .attr('text-anchor', 'middle')
                .style('opacity', function(d) { return d.r > 20 ? 1 : 0; })
                .text(function(d) { return d.name; });
console.log('select');
    d3.select(window).on('click', function() { zoom(root); });
    //});

    function zoom(d, i) {
        var k = r / d.r / 2;
        x.domain([d.x - d.r, d.x + d.r]);
        y.domain([d.x - d.r, d.x + d.r]);

        var t = tvg.transition()
            .duration(750);

        t.selectAll('circle')
            .attr('cx', function(d) { return x(d.x); })
            .attr('cy', function(d) { return y(d.y); })
            .attr('r', function(d) { return k * d.r; });

        t.selectAll('text')
            .attr('x', function(d) { return x(d.x); })
            .attr('y', function(d) { return y(d.y); })
            .style('opacity', function(d) { return k * d.r > 20 ? 1 : 0; });

        node = d;
        d3.event.stopPropagation();
    }
}
//    var tree = d3.tree().size([viewerHeight, viewerWidth]);
//
//    var root = d3.hierarchy(treeArr, function(d) { return d.children; });
//    var nodes = root.descendants();
//    var links = tree(root).links();
//
//    nodes.map(function(d, i) { d._id = i});
//
//    tvg.selectAll('text')
//        .data(nodes).enter()
//        .append('text')
//            .text(function(d) { return d.data.name; })
//            .attr('font-size', function(d) { return d3.scaleLog(d.data.count); })
//            .attr('id', function(d) {return 'node-' + d._id;});
//
//    var parents = [];
//    var children = [];
//
//    nodes.forEach(function (d) { isParent(d) ? parents.push(d) : children.push(d) });
//
 //   var linksWidth = 46;
 //   var childCount = 0;
 ////   var parentCount = 0;
 //   var childHeight = (viewerHeight - margin.top - margin.bottom) / children.length;
 //   var parentHeight = (viewerHeight - margin.top - margin.bottom) / (parents.length + 1);
//
//    nodes.forEach(function(d) {
//        if (isParent(d)) {
//            d.x = ++parentCount * parentHeight;
//            
//            if (d.depth === 0) {
//                rootX = getBB('#node-' + d._id).width + margin.left;
//                d.y = rootX;
//            } else {
//                d.y = rootX + getBB('#node-' + d.parent._id).width + linksWidth;
//            }
//        } else {
//            var parentsX = 0;
//            var node = d;
//            while (node) {
//                if (node.parent && node.parent._id !== 0) {
//                    parentsX += getBB('#node-' + node.parent._id).width;
//                    node = node.parent;
//                } else {
//                    node = false;
//                }
//            }
//            d.y = rootX + (d.depth * linksWidth) + parentsX;
//            d.x = ++childCount * childHeight;
//        }
//    })
//
//    var link = gg.selectAll('.link')
//        .data(links)
//        .enter().append('path')
//            .attr('class', 'link')
//            .attr('fill', 'none')
//            .attr('d', function(d) {
//                return d.target.children && d.target.children.length ?
//                    path(d.source, d.target, true) : 
//                    path(d.source, d.target, false);
//            });
//    var node = gg.selectAll('.node')
//        .data(nodes)
//        .enter().append('g')
//            .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; });
//
//    node.append('text')
//        .attr('dy', function(d) { return isParent(d) ? 7 : 4; })
//        .attr('x', function(d) { return isParent(d) ? -8 : 8; })
//        .style('text-anchor', function(d) {return isParent(d) ? 'end' : 'start'; })
//        .attr('font-size', function(d) {return d3.scaleLog(d.data.count) + 'px'; })
//        .text(function(d) {return d.data.name; });
//}
//
//







