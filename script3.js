var nodes_data = [
  {
  "name": "CC1",
  "type": "change",
  "attributes": [
      {"name":"Amanda Rosado",
       "attribute":"developer testing"},
      {"name":"Jacob VanEck",
       "attribute":"code review"},
      {"name":"45s",
       "attribute":"uat time"},
      {"name":"NEDS",
       "attribute":"system"},
      {"name":"Candy Smith",
       "attribute":"user testing"}
    ]
  },
  {
  "name": "CC2",
  "type": "change",
  "attributes": [
      {"name":"Amanda Rosado",
       "attribute":"developer testing"},
      {"name":"Jacob VanEck",
       "attribute":"code review"},
      {"name":"45s",
       "attribute":"uat time"},
      {"name":"NEDS",
       "attribute":"system"},
      {"name":"Candy Smith",
       "attribute":"user testing"}
    ]
  },
  {
  "name": "CC3",
  "type": "change",
  "attributes": [
      {"name":"Amanda Rosado",
       "attribute":"developer testing"},
      {"name":"Jacob VanEck",
       "attribute":"code review"},
      {"name":"45s",
       "attribute":"uat time"},
      {"name":"NEDS",
       "attribute":"system"},
      {"name":"Candy Smith",
       "attribute":"user testing"}
    ]
  },
  {
  "name": "CC4",
  "type": "change",
  "attributes": [
      {"name":"Amanda Rosado",
       "attribute":"developer testing"},
      {"name":"Jacob VanEck",
       "attribute":"code review"},
      {"name":"45s",
       "attribute":"uat time"},
      {"name":"NEDS",
       "attribute":"system"},
      {"name":"Candy Smith",
       "attribute":"user testing"}
    ]
  },
  {
  "name": "CC5",
  "type": "change",
  "attributes": [
      {"name":"Amanda Rosado",
       "attribute":"developer testing"},
      {"name":"Jacob VanEck",
       "attribute":"code review"},
      {"name":"45s",
       "attribute":"uat time"},
      {"name":"NEDS",
       "attribute":"system"},
      {"name":"Candy Smith",
       "attribute":"user testing"}
    ]
  },
  {
  "name": "CC6",
  "type": "change",
  "attributes": [
      {"name":"Amanda Rosado",
       "attribute":"developer testing"},
      {"name":"Jacob VanEck",
       "attribute":"code review"},
      {"name":"45s",
       "attribute":"uat time"},
      {"name":"NEDS",
       "attribute":"system"},
      {"name":"Candy Smith",
       "attribute":"user testing"}
    ]
  },
  {
  "name": "CC7",
  "type": "change",
  "attributes": [
      {"name":"Amanda Rosado",
       "attribute":"developer testing"},
      {"name":"Jacob VanEck",
       "attribute":"code review"},
      {"name":"45s",
       "attribute":"uat time"},
      {"name":"NEDS",
       "attribute":"system"},
      {"name":"Candy Smith",
       "attribute":"user testing"}
    ]
  },
  {
  "name": "CC8",
  "type": "change",
  "attributes": [
      {"name":"Amanda Rosado",
       "attribute":"developer testing"},
      {"name":"Jacob VanEck",
       "attribute":"code review"},
      {"name":"45s",
       "attribute":"uat time"},
      {"name":"NEDS",
       "attribute":"system"},
      {"name":"Candy Smith",
       "attribute":"user testing"}
    ]
  },
  {
  "name": "CC9",
  "type": "change",
  "attributes": [
      {"name":"Amanda Rosado",
       "attribute":"developer testing"},
      {"name":"Jacob VanEck",
       "attribute":"code review"},
      {"name":"45s",
       "attribute":"uat time"},
      {"name":"NEDS",
       "attribute":"system"},
      {"name":"Candy Smith",
       "attribute":"user testing"}
    ]
  },
  {
  "name": "CC10",
  "type": "change",
  "attributes": [
      {"name":"Amanda Rosado",
       "attribute":"developer testing"},
      {"name":"Jacob VanEck",
       "attribute":"code review"},
      {"name":"45s",
       "attribute":"uat time"},
      {"name":"NEDS",
       "attribute":"system"},
      {"name":"Candy Smith",
       "attribute":"user testing"}
    ]
  },
  {
  "name": "CC11",
  "type": "change",
  "attributes": [
      {"name":"Amanda Rosado",
       "attribute":"developer testing"},
      {"name":"Jacob VanEck",
       "attribute":"code review"},
      {"name":"45s",
       "attribute":"uat time"},
      {"name":"NEDS",
       "attribute":"system"},
      {"name":"Candy Smith",
       "attribute":"user testing"}
    ]
  }
];

var graph = d3.select('#graph');
var info_panel = d3.select('#panel');

// var width = 960; 
// var height = 500;
var widthPercent = parseFloat(graph.style("width"))/window.innerWidth;
var width = (widthPercent * window.innerWidth);
var height = window.innerHeight - 20; 
var radius = 50;
var small_radius = radius * (2/4);
var node_color = "#BBDD44";
var link_distance = small_radius * 3.1;
var loose_link_distance = radius * 6.5
var alpha = 0.5;
var slow_alpha = 0.1;

var all_data = [];
var cc_data = [];
var links_data = [];
var simulations = [];

var focus;

var svg = graph.append('svg')
  .attr('width', width)
  .attr('height', height);

/////////// arrays of JSON data
// Populate CC Array
nodes_data.map(function(entry){
    var cc = {};
    cc.ccname = entry.name;
    cc.name = entry.name;
    cc.label = entry.name;
    cc.type = entry.type;
    cc.raw_attribute_data = entry.attributes;

    cc.x = width * Math.random();
    cc.y = height * Math.random();
    cc.r = radius;
    cc.inertia = 0.3;
    // cc.inertia = 0.2 + (Math.random()/5);

    cc_data.push(cc);
    all_data.push(cc);
});

// Populate each CC's attribute array and link each attribute to its CC
cc_data.forEach(function(ccNode){
  ccNode.attribute_data = [];
  ccNode.raw_attribute_data.map(function(entry){
    var atrb = {};
    atrb.ccname = ccNode.name;
    atrb.name = ccNode.name + entry.attribute + entry.name;
    atrb.label = entry.name;
    atrb.type = "attribute";
    atrb.attribute = entry.attribute;

    atrb.x = width * Math.random();
    atrb.y = height * Math.random();
    atrb.r = radius;
    atrb.inertia = 0.2 + (Math.random()/5);

    ccNode.attribute_data.push(atrb);
    all_data.push(atrb);

    var link = {};

    link.source = ccNode.name;
    link.target = atrb.name;
    link.type = "";
    link.visible = true;

    links_data.push(link);
  });
});

// Link each CC node to all the others
for(var i = 0; i < cc_data.length - 1; i++){
  for(var j = 1; j < cc_data.length; j++){
    var link = {};

    link.source = cc_data[i].name;
    link.target = cc_data[j].name;
    link.type = "loose";

    links_data.push(link);
  }
}

// Link each CC node to just the next one
// var lastCCNode;
// for(var i = 0; i < cc_data.length; i++){
//  if(lastCCNode != null){
//    var biglink = {};
//    biglink.source = cc_data[i];
//    biglink.target = lastCCNode;
//    biglink.type = "big";
//    links_data.push(biglink);
//  }
//  lastCCNode = cc_data[i];
// }
// var biglink = {};
// biglink.source = cc_data[0];
// biglink.target = lastCCNode;
// biglink.type = "big";
// links_data.push(biglink);


// // Link each CC node's attributes to each other with the same CC
// for(var i = 0; i < cc_data.length; i++){
//  for(var a = 0; a < cc_data[i].attributes.length - 1; a++){
//    for(var b = 1; b < cc_data[i].attributes.length; b++){
//      var link = {};

//      link.source = cc_data[i].name + cc_data[i].attributes[a].attribute + cc_data[i].attributes[a].name;
//      link.target = cc_data[i].name + cc_data[i].attributes[b].attribute + cc_data[i].attributes[b].name;
//      link.type = "";

//      links_data.push(link);
//    }
//  }
// }

// // V2 - Link each CC node's attributes to the NEXT with the same CC
// for(var i = 0; i < cc_data.length; i++){
//  var lastAtrbNode;
//  for(var a = 0; a < cc_data[i].attributes.length; a++){
//    if(lastAtrbNode != null){
//      var link = {};

//      link.source = cc_data[i].name + cc_data[i].attributes[a].attribute + cc_data[i].attributes[a].name;
//      link.target = cc_data[i].name + lastAtrbNode.attribute + lastAtrbNode.name;
//      link.type = "";

//      links_data.push(link);
//    }
//    lastAtrbNode = cc_data[i].attributes[a];
//  }
//  var link = {};
//  link.source = cc_data[i].attributes[0];
//  link.target = lastAtrbNode;
//  link.type = "";
//  links_data.push(link);
// }

//////// visual svg elements

var links = svg.append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(links_data)
  .enter()
  .append("line")
  .attr("stroke-width", 2)
  .attr("class", function(d){
    if(d.visible){
      return "showlink";
    }
  });

var nodes = svg.append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(cc_data)
  .enter()
  .append("circle")
  .attr("r", radius)
  .attr("fill", node_color)
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended))
  .on("click", clicked);

/////// simulation and force stuff
var cc_layout_force = d3.forceLink(links_data)
  .id(function(d) { return d.name; })
  .distance(function(d) {
    if(d.type == "loose"){
      return loose_link_distance;
    }else{
      return link_distance;
    }
});

var cc_layout_sim = d3.forceSimulation()
  .nodes(all_data)
  .on('tick', tick);

cc_layout_sim
  .force("charge_force", d3.forceManyBody())
  .force("center_force", d3.forceCenter(width/2, height/2));

cc_layout_sim.force("nodes", cc_layout_force);

// var simulation = d3.forceSimulation()
//   .force('attract', d3.forceAttract()
//     .target([cc_data[0].x, cc_data[0].y])
//     .strength(function (d) { return d.inertia; }))
//   .force('collide', d3.forceCollide(function (d) { return d.r; }))
//   .on('tick', tick)
//   .nodes(cc_data);

for(var i = 0; i < cc_data.length; i++){
  // var sim = d3.forceSimulation()
  // .force('attract', d3.forceAttract()
  //   .target([cc_data[i].x, cc_data[i].y])
  //   .strength(function (d) { return d.inertia; }))
  // .force('collide', d3.forceCollide(function (d) { return d.r; }))
  // .on('tick', tick)
  // .nodes(cc_data[i].attribute_data);

  // cc_data[i].simulation = sim;

  ///////
  var atr_nodes = svg.append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(cc_data[i].attribute_data)
  .enter()
  .append("circle")
  .attr("r", small_radius)
  .attr("fill", node_color)
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended))
  .on("click", clicked);

  cc_data[i].atr_nodes = atr_nodes;
}

var labels = svg.append("g")
  .attr("class", "labels")
  .selectAll("text")
  .data(all_data)
  .enter()
  .append("text")
  .text(function(d){ return d.label })
  .style("text-anchor", "middle");

// svg.on('mousemove', function (){
//     simulation.force('attract').target([cc_data[0].x, cc_data[0].y]);
//     simulation
//       .alphaTarget(alpha)
//       .restart();
//   });

function tick(){
  nodes
    .attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
    .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });

  for(var i = 0; i < cc_data.length; i++){
    cc_data[i].atr_nodes
      .attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
      .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });
  }

  labels
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; });

  links
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });
}

//////////////////// extra functions
function dragstarted(d) {
  // for(var i = 0; i < cc_data.length; i++){
  //   var simulation = cc_data[i].simulation;
  //   simulation.restart();
  //   simulation.alpha(alpha);

  //   simulation.force('attract').target([cc_data[i].x, cc_data[i].y]);
  //   simulation
  //     .alphaTarget(alpha)
  //     .restart();
  // }

  cc_layout_sim.restart();
  cc_layout_sim.alpha(alpha);
    // simulation.force('attract').target([cc_data[0].x, cc_data[0].y]);
    // simulation
    //   .alphaTarget(alpha)
    //   .restart();
}

function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);

  if(d.type != "attribute"){
    // simulation.force('attract').target([cc_data[0].x, cc_data[0].y]);

    // for(var i = 0; i < cc_data.length; i++){
    //   var simulation = cc_data[i].simulation;
    //   simulation.force('attract').target([cc_data[i].x, cc_data[i].y]);
    // }
  }

  cc_layout_sim.restart();
  cc_layout_sim.alpha(alpha);
}

function dragended(d) {
    // for(var i = 0; i < cc_data.length; i++){
    //   var simulation = cc_data[i].simulation;
      cc_layout_sim.alphaTarget(slow_alpha);
    // }
}

function clicked(d){

  if(focus != null && focus != d){
    deselectAll();
    focus = null;
  }
  if(focus == null){
    focus = d;
    info_panel.classed("hidden", false);
    d3.select(this).raise().classed("active", true);
    var ccNameSpan = $("#ccName");
    ccNameSpan.text("CCName: " + d.ccname);
  }else{
    focus = null;
    info_panel.classed("hidden", true);
    d3.select(this).raise().classed("active", false);
  }
}

function deselectAll(){
  d3.select(".active").classed("active", false);
}