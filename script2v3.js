// var myjson =
// {
//	 "nodes":[
//	 {"name":"File1.exe","colorGroup":0},
//	 {"name":"File2.exe","colorGroup":0},
//	 {"name":"File3.exe","colorGroup":0},
//	 {"name":"File4.exe","colorGroup":0},
//	 {"name":"File5.exe","colorGroup":0},
//	 {"name":"File6.exe","colorGroup":0},
//	 {"name":"File7.exe","colorGroup":0},
//	 {"name":"File8.exe","colorGroup":0},
//	 {"name":"File8.exe","colorGroup":0},
//	 {"name":"File9.exe","colorGroup":0}
//	 ],
//	 "links":[
//	 {"source":1,"target":0,"value":10},
//	 {"source":2,"target":0,"value":35},
//	 {"source":3,"target":0,"value":50},
//	 {"source":4,"target":0,"value":50},
//	 {"source":5,"target":0,"value":65},
//	 {"source":6,"target":0,"value":65},
//	 {"source":7,"target":0,"value":81},
//	 {"source":8,"target":0,"value":98},
//	 {"source":9,"target":0,"value":100}
//	 ]
// };
// root = JSON.parse( myjson );

var nodes = [
	{"name":"File1.exe","colorGroup":0},
	{"name":"File2.exe","colorGroup":0},
	{"name":"File3.exe","colorGroup":0},
	{"name":"File4.exe","colorGroup":0},
	{"name":"File5.exe","colorGroup":0},
	{"name":"File6.exe","colorGroup":0},
	{"name":"File7.exe","colorGroup":0},
	{"name":"File8.exe","colorGroup":0},
	{"name":"File8.exe","colorGroup":0},
	{"name":"File9.exe","colorGroup":0}
];

var links = [
	{"source":1,"target":0,"value":10},
	{"source":2,"target":0,"value":35},
	{"source":3,"target":0,"value":50},
	{"source":4,"target":0,"value":50},
	{"source":5,"target":0,"value":65},
	{"source":6,"target":0,"value":65},
	{"source":7,"target":0,"value":81},
	{"source":8,"target":0,"value":98},
	{"source":9,"target":0,"value":100}
];

var width = $("#theVizness").width(),
	height = $("#theVizness").height();

var color = d3.scale.ordinal().range(["#ff0000", "#fff000", "#ff4900"]);

var force = d3.layout.force()
	.charge(-120)
	.linkDistance(30)
	.size([width, height]);

var svg = d3.select("#theVizness").append("svg")
	.attr("width", width)
	.attr("height", height);

var loading = svg.append("text")
	.attr("class", "loading")
	.attr("x", width / 2)
	.attr("y", height / 2)
	.attr("dy", ".35em")
	.style("text-anchor", "middle")
	.text("Loading...");

force.nodes(nodes)
	.links(links)
	.charge(function(d){
	var charge = -500;
	if (d.index === 0) charge = -5000;
	return charge;
	});

var link = svg.selectAll(".link")
	.data(links)
	.enter().append("line")
	.attr("class", "link")			
	.style("stroke-width", 1);

var files = svg.selectAll(".file")
	.data(nodes)
	.enter().append("circle")
	.attr("class", "file")
	.attr("r", 10)
	.attr("fill", function (d) {
	  return color(d.colorGroup);
	});

var totalNodes = files[0].length;

files.append("title")
	.text(function (d) { return d.name; });

force.start();
for (var i = totalNodes * totalNodes; i > 0; --i) force.tick();


nodes[0].x = width / 2;
nodes[0].y = height / 2;

link.attr("x1", function (d) { return d.source.x; })
	.attr("y1", function (d) { return d.source.y; })
	.attr("x2", function (d) { return d.target.x; })
	.attr("y2", function (d) { return d.target.y; });

files.attr("cx", function (d) { return d.x; })
	.attr("cy", function (d) { return d.y; })
	.attr("class", function(d){
	var classString = "file"
	
	if (d.index === 0) classString += " rootFile";
	
	return classString;
	})
	.attr("r", function(d){
	var radius = 10;
	
	if (d.index === 0) radius = radius * 2;
	
	return radius;
	});
force.on("tick", function() {
link.attr("x1", function(d) { return d.source.x; })
	.attr("y1", function(d) { return d.source.y; })
	.attr("x2", function(d) { return d.target.x; })
	.attr("y2", function(d) { return d.target.y; });

files.attr("cx", function(d) { return d.x; })
	.attr("cy", function(d) { return d.y; });
});

loading.remove();	