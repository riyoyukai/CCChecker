var nodes_data = [
	{
    "name": "1",
    "type": "change",
    "color": "#99DD33",
    "radius": 50,
    "attributes": [
      {
        "attribute": "developer testing",
        "name": "Amanda Rosado",
        "color": "#99DD33",
        "radius": 24
      },
      {
        "attribute": "code review",
        "name": "Amanda Rosado",
        "color": "#99DD33",
        "radius": 24
      },
      {
        "attribute": "user testing",
        "name": "Amanda Rosado",
        "color": "#99DD33",
        "radius": 24
      },
      {
        "attribute": "system",
        "name": "NEDs",
        "color": "#99DD33",
        "radius": 24
      },
      {
        "attribute": "something else",
        "name": "whatever",
        "color": "#99DD33",
        "radius": 24
      }
    ]
  },
  {
    "name": "2",
    "type": "change",
    "color": "#DD3333",
    "radius": 100,
    "attributes": [
      {
        "attribute": "developer testing",
        "name": "Amanda Rosado",
        "color": "#DD3333",
        "radius": 50
      },
      {
        "attribute": "code review",
        "name": "Amanda Rosado",
        "color": "#DD3333",
        "radius": 50
      },
      {
        "attribute": "user testing",
        "name": "Amanda Rosado",
        "color": "#99DD33",
        "radius": 24
      },
      {
        "attribute": "system",
        "name": "NEDs",
        "color": "#99DD33",
        "radius": 24
      },
      {
        "attribute": "something else",
        "name": "whatever",
        "color": "#99DD33",
        "radius": 24
      }
    ]
  }
];

var graph = d3.select('#graph');
var info_panel = d3.select('#panel');

var width_percent = parseFloat(graph.style("width"))/window.innerWidth;
var width = (width_percent * window.innerWidth);
var height = window.innerHeight - 20;
var svg = graph.append('svg')
  .attr('width', width)
  .attr('height', height);

var padding = 3; // separation between same-color nodes
// var alpha = .5;

var all_nodes = [];
var cc_nodes = [];
var attr_nodes = [];
var links_data = [];
// var cc_nodes = []; // The largest node for each cluster

var focus;
var ind = 0;

nodes_data.map(function(entry){
	var cc = {};
	cc.ccname = entry.name;
  cc.name = entry.name;
  cc.label = entry.name;
  cc.type = entry.type;
  cc.attributes_data = entry.attributes;
  cc.fill = entry.color;
  cc.radius = entry.radius;
  cc.cluster = ind++;
  cc.x = Math.cos(ind * 2 * Math.PI) * 200 + width / 2 + Math.random(),
  cc.y = Math.sin(ind * 2 * Math.PI) * 200 + height / 2 + Math.random()

  cc_nodes.push(cc);
});
	
var num = cc_nodes.length; // number of distinct ccs

var nodes = [];
for(var i = 0; i < num; i++){
  nodes.push(cc_nodes[i]);
  for(var j = 0; j < cc_nodes[i].attributes_data.length; j++){
    var attr = {};
    var attr_data = cc_nodes[i].attributes_data[j];
    var attr_ind = cc_nodes[i].cluster;

    attr.ccname = cc_nodes[i].ccname;
    attr.name = attr.ccname + attr_data.attribute + attr_data.name;

    attr.fill = attr_data.color;
    attr.radius = attr_data.radius;
    attr.cluster = attr_ind;
    attr.x = Math.cos(attr_ind * 2 * Math.PI) * 200 + width / 2 + Math.random(),
    attr.y = Math.sin(attr_ind * 2 * Math.PI) * 200 + height / 2 + Math.random()

    nodes.push(attr);
  }
}

var simulation = d3.forceSimulation()
	// keep entire simulation balanced around screen center
	// .force('center', d3.forceCenter(width/2, height/2))
	
	// pull toward center
	.force('attract', d3.forceAttract()
		.target([width/2, height/2])
		.strength(0.01))

	// cluster by section
	.force('cluster', d3.forceCluster()
		.centers(function (d) { return cc_nodes[d.cluster]; })
		.strength(0.5)
		.centerInertia(0.1))

	// apply collision with padding
	.force('collide', d3.forceCollide(function (d) { return d.radius + padding; })
		.strength(0))

	.on('tick', layoutTick)
	.nodes(nodes);
	
// var svg = d3.select('body').append('svg')
//		 .attr('width', width)
//		 .attr('height', height);

var node = svg.selectAll('circle')
	.data(nodes)
	.enter().append('circle')
		.style('fill', function (d) { return d.fill; })
		.call(d3.drag()
			.on('start', dragstarted)
			.on('drag', dragged)
			.on('end', dragended)
		);

function dragstarted (d) {
	if (!d3.event.active) simulation.alphaTarget(0.3).restart();
	d.fx = d.x;
	d.fy = d.y;
}

function dragged (d) {
	d.fx = d3.event.x;
	d.fy = d3.event.y;
}

function dragended (d) {
	if (!d3.event.active) simulation.alphaTarget(0);
	d.fx = null;
	d.fy = null;
}

// ramp up collision strength to provide smooth transition
var transitionTime = 3000;
var t = d3.timer(function (elapsed) {
	var dt = elapsed / transitionTime;
	simulation.force('collide').strength(Math.pow(dt, 2) * 0.7);
	if (dt >= 1.0) t.stop();
});
	
function layoutTick (e) {
	node
		.attr('cx', function (d) { return d.x; })
		.attr('cy', function (d) { return d.y; })
		.attr('r', function (d) { return d.radius; });
}