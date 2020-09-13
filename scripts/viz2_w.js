
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

//var zoomListener = d3.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);
var viewerWidth = window.innerWidth - margin.left - margin.right;
var viewerHeight = window.innerHeight - margin.top - margin.bottom;

var tvg;
var gg;
var chosen = [];
// height and width of our chart
//var width = window.innerWidth - margin.left - margin.right;
//var height = window.innerHeight - margin.top - margin.bottom;

            


function thisColor(i) { 
    colors = ['#001f3f', '#0074D9', '#B10DC9', '#AAAAAA', '#39CCCC', '#FFDC00', '#FF851B', 
    '#01FF70', '#F012BE', '#7FDBFF', '#3D9970', '#85144b', '#2ECC40', '##FF4136', '#F012BE', 
    "#3366cc", "#dc3912", "#ff9900"];

    cc = d3.scaleLinear()
          .domain([-2, 17])
          .range([1, 0]);

    return d3.interpolateSpectral(cc(i));
}

function determine(a , i, d) {
    console.log(d);
    
    if (d == 1) {
        // create our SVG canvas and give it the height and width we want
        tvg = d3.select('#body3').append('svg')
            .attr('width', viewerWidth)
            .attr('height', window.innerHeight*5)
            .attr('class', 'overlay')
            .attr('text-anchor', 'middle')
            //.attr('viewBox', [-margin.left, -margin.top, viewerWidth, 10])
            .style("font", "10px sans-serif");
            //.call(zoomListener);
        draw2(a, i);
    } else {
        tvg.selectAll('g').remove();
        chosen = chosen.slice(chosen.length);
        draw2(a, i);
    }
}

function makeTree(data, subj) {
    //var re = /\s|:|\[|\]/g;
    var re = /\s|:|\[|\]|\.|,|!/g;
    //var re = /\s:(\[\]\.,!)/g;
    
    data = data.split(re);
    var len = data.length;
    
    data = data.filter( function (d) { return d.length != 0; });
    //console.log(data);
    
    var tree = {
        name: data[0], 
        count: 1,
        children: [] 
    };

    //console.log('focus: ');
    //console.log(data[2]);
    //console.log(data[0]);

    tree.children.push({name: data[1], count: 1, children: []});

    var nameObjs = [];
    //var names = [];
    var curr = tree.children[0];
    var root = tree;
    var ct = 2;

    //console.log('root name: ');
    //console.log(root.name);
    //console.log('curr name: ');
    //console.log(curr.name);
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
    //console.log(tree);
    return tree;
}


var topp;
function tree(data) {
    const root = d3.hierarchy(data, function(d) { return d.children; })
        .sum(d=>d.count)
        //.sort((a, b) => (a.height - b.height) || 
        // a.data.name.localeCompare(b.data.name));
        ;
    root.dx = 10;
    root.dy = viewerWidth / (root.height + 1);
    
    if (data.count > 200) {
        console.log('root.data 1');
        console.log(data.count);
        topp = window.innerHeight*4.5;
        return d3.cluster()
            .size([viewerHeight, viewerWidth/1.3])
            //.nodeSize([root.dx, root.dy])(root);
            (root);
    } else if ((data.count > 100) && (data.count <= 200)) {
        console.log('root.data 2');
        console.log(data.count);
        topp = window.innerHeight*3.5;
        return d3.cluster()
            .size([viewerHeight/1.5, viewerWidth/1.3])
            (root);
    } else {
        topp = window.innerHeight*2.7;
        return d3.cluster()
            .size([viewerHeight/2, viewerWidth/1.3])
            (root);
    }
}


function findWord (w, subj) {
    console.log('click works');
    console.log(w);
    
    if (chosen.includes(w)) {
        var i = chosen.indexOf(w);
        chosen.splice(i, 1);
    } else {
        chosen.push(w);
    }
    
    gg.selectAll('text.nodes')
        .filter( function(d) {
            return chosen.includes(d.data.name);
        })
        .transition()
        .style('fill', d=>d3.rgb(thisColor(name2idx.get(subj))).darker())
        .style('font-weight', 'bold');

    gg.selectAll('text.nodes')
        .filter( function(d) {
            return !chosen.includes(d.data.name);
        })
        .transition()
        .style('font-weight', 'normal')
        .style('fill', 'black');
}

function draw2(arr, subj) {


      var treeArr = makeTree(arr, subj);
      
      var fScale = d3.scaleLog()
          .domain([1, treeArr.count])
          .range([10, 24]);
      
      const root = tree(treeArr);
      console.log(root);

      root.children.forEach(function(d) { 
          if (d.depth > 2) {
              d.x *= 5;
          }
          if (d.children) {
              d.children.forEach(collapse);
          } else { 
              collapse(d);
          } 
      });
      gg = tvg.append('g')
          .attr('font', 'sans-serif')
          .attr('transform', 'translate(' + (subj.length * 18 + margin.left) + ', 40)');
      
      function collapse(d) {
          if (d.children) {
              d._children = d.children;
              d._children.forEach(collapse);
              d.children = null;
          }
      }
      var nodes = root.descendants();
      var links = root.descendants().slice(1);
          
      nodes.forEach(function (d) { d.y = d.depth*180; d.x *= 5});


      window.scroll( {
          top: topp,
          left: 0,
          behavior: 'smooth'
      });
      
      function update(source) {
      
          var nodes = root.descendants();
          var links = root.descendants().slice(1);
          console.log(links); 
          var temp = 0;
          nodes.forEach(function (d) { 
                if ((d.parent != null) && (d.parent.children.length == 1)) {
                //if (d.depth > 3) {
                    var track = d;
                    //while ((d.parent) && (d.parent.children.length != 1)) {
                    while (d.parent) {
                        temp += d.data.name.length;
                        if (d.data.name.length == 1) {
                            temp += 2;
                        }
                        d = d.parent;
                    }
                    track.y = (track.depth + 8) * 15 + (temp*5);
                    d = track;
                    temp = 0;
                } else if ((d.parent != null) && (d.parent.children.length !=1) && (d.depth > 2)) {
                    d.y = d.parent.y + 35;
                } else {
                    d.y = d.depth*90;
                }
          });


          var node = gg.selectAll('g.node')
              .data(nodes, function (d) { return d.id || (d.id = i++); });
          
          var nodeEnter = node.enter().append('g')
              .attr('class', 'node')
              .attr('transform', function(d) {
                  if (d.depth > 2) {
                      return 'translate(' + source.y0 + ',' + source.x0 + ')';
                  } else {
                      return 'translate(' + source.y0 + ',' + source.x0 + ')';
                  }
              });
              

          nodeEnter.append('circle')
              .attr('class', 'node')
              .attr('r', 2.5)
              .attr('fill-opacity', function(d) {
                  if (d.children != undefined) {
                      if (d.children == null) {
                          return 0.8;
                      }
                      return 0;
                  }
                  return 0.8;
              })
              .on('click', click)
              .style('fill', d=>thisColor(name2idx.get(subj)));

          nodeEnter.append('text')
              .attr('dy', '.35em')
              .attr('x', function(d) {
                  return d.children || d._children ? -13 : 13; })
              .attr('text-anchor', 'end')
              .attr('font-size', function(d) {return fScale(d.data.count);})
              .text(function(d) { return d.data.name; });

          var nodeUpdate = nodeEnter.merge(node);

          nodeUpdate.transition()
              .duration(500)
              .attr('transform', function (d) {
                  if (d.depth > 2) {
                      return 'translate(' + d.y + ',' + d.x*5 + ')';
                  } else {
                      return 'translate(' + d.y + ',' + d.x + ')'; 
                  }        
              });
          
          nodeUpdate.select('circle', 'node')
              .attr('r', 2.5)
              .attr('cursor', 'pointer')
              .attr('fill-opacity', function(d) {
                  if (d.children != undefined) {
                      if (d.children == null) {
                          return 0.8;
                      }
                      return 0.05;
                  }
                  return 0.8;
              });

          var nodeExit = node.exit().transition()
              .duration(500)
              .attr('transform(' + source.y + ',' + source.x + ')')
              .remove();

          nodeExit.select('circle')
              .attr('r', 2.5);

          nodeExit.select('text')
              .style('fill-opacity', .9);

          var link = gg.selectAll('path.link')
              .data(links, d=>d.id);

          var linkEnter = link.enter().insert('path', 'g')
              .attr('fill', 'none')
              .attr('stroke', '#C8C8C8')
              .attr('stroke-opacity', 0.8)
              .attr('stroke-width', 1.5)
              .attr('class', 'link')
              .attr('d', function(d) {
                  if (d.depth > 2) {
                      var o = {x: source.x0*5, y: source.y0};
                  } else {
                      var o = {x: source.x0, y: source.y0};
                  } return diagonal(o,o);
              });

          var linkUpdate = linkEnter.merge(link);

          linkUpdate.transition()
              .duration(500)
              .attr('d', function(d) { 
                  if (d.depth > 3) {
                      return diagonal({x: d.x*5, y: d.y}, {x: d.parent.x*5, y: d.parent.y}); 
                  } else if (d.depth ==3 ) { 
                      return diagonal({x: d.x*5, y: d.y}, {x: d.parent.x, y: d.parent.y});
                  } else {
                      return diagonal(d, d.parent);
                  }
              });

          var linkExit = link.exit().transition()
              .duration(500)
              .attr('d', function(d) {
                  var o = {x: source.x, y: source.y};
                  return diagonal(o, o);
              })
              .remove();

          nodes.forEach(function(d) {
              d.x0 = d.x;
              d.y0 = d.y;
          });

          function diagonal(s, d) {
              path = `M ${s.y} ${s.x}
                  C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`

              return path;
          }

          function click(d) {
              if (d.children) {
                  var track = d;
                  d = track;
                  d._children = d.children;
                  d.children = null;
              } else {
                  while(!d.children && d._children) {
                      d.children = d._children;
                      d._children = null;
                      d = d.children[0];
                  }
              }
              update(d);
          }
    }
    update(root);
}




