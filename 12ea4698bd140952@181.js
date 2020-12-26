// https://observablehq.com/@jackli/the-wealth-health-of-nations@181
import define1 from "./450051d7f1174df8@252.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["nations.json",new URL("./files/2953b6cf84ed92fb8fa449c1d2e2491075f6ede3d87822224a3108f5e40cb2cd2bee040c4e078863efbe06a2c125c846bbd596604b0c75ac11138a3093ad1126",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Milletlerin Zenginliği ve Sağlığı

 Son 209 yılda 180 ülkenin kişi başına düşen geliri (x), ortalama yaşam süresi (y) ve nüfusu (alanı) bölgelere göre renklendirilmiş olarak gösterilmesi `
)});
  main.variable(observer("yillar")).define("yillar", ["Scrubber","d3"], function(Scrubber,d3){return(
Scrubber(d3.range(1800, 2010, 0.1), {format: Math.floor, loop: false})
)});
  main.variable(observer("yil")).define("yil", ["Generators", "yillar"], (G, _) => G.input(_));
  main.variable(observer("legend")).define("legend", ["DOM","html","margin","color"], function(DOM,html,margin,color)
{
  const id = DOM.uid().id;
  return html`<style>

.${id} {
  display: inline-flex;
  align-items: center;
  margin-right: 1em;
}

.${id}::before {
  content: "";
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  background: var(--color);
}

</style><div style="display: flex; align-items: center; min-height: 33px; font: 10px sans-serif; margin-left: ${margin.left}px;"><div>${color.domain().map(region => html`<span class="${id}" style="--color: ${color(region)}">${document.createTextNode(region)}</span>`)}`;
}
);
  main.variable(observer("chart")).define("chart", ["d3","width","height","xAxis","yAxis","grid","dataAt","x","y","radius","color"], function(d3,width,height,xAxis,yAxis,grid,dataAt,x,y,radius,color)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("g")
      .call(grid);

  const circle = svg.append("g")
      .attr("stroke", "black")
    .selectAll("circle")
    .data(dataAt(1850), d => d.name)
    .join("circle")
      .sort((a, b) => d3.descending(a.population, b.population))
      .attr("cx", d => x(d.income))
      .attr("cy", d => y(d.lifeExpectancy))
      .attr("r", d => radius(d.population))
      .attr("fill", d => color(d.region))
      .call(circle => circle.append("title")
        .text(d => [d.name, d.region].join("\n")));

  return Object.assign(svg.node(), {
    update(data) {
      circle.data(data, d => d.name)
          .sort((a, b) => d3.descending(a.population, b.population))
          .attr("cx", d => x(d.income))
          .attr("cy", d => y(d.lifeExpectancy))
          .attr("r", d => radius(d.population));
    }
  });
}
);
  main.variable(observer("update")).define("update", ["chart","currentData"], function(chart,currentData){return(
chart.update(currentData)
)});
  main.variable(observer("currentData")).define("currentData", ["dataAt","yil"], function(dataAt,yil){return(
dataAt(yil)
)});
  main.variable(observer("x")).define("x", ["d3","margin","width"], function(d3,margin,width){return(
d3.scaleLog([200, 1e5], [margin.left, width - margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","height","margin"], function(d3,height,margin){return(
d3.scaleLinear([14, 86], [height - margin.bottom, margin.top])
)});
  main.variable(observer("radius")).define("radius", ["d3","width"], function(d3,width){return(
d3.scaleSqrt([0, 5e8], [0, width / 24])
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
d3.scaleOrdinal(data.map(d => d.region), d3.schemeCategory10).unknown("black")
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width"], function(height,margin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80, ","))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Kisi basina düsen gelir(dolar)→"))
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y"], function(margin,d3,y){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -margin.left)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Ortama Yaşam Süresi(yillar)"))
)});
  main.variable(observer("grid")).define("grid", ["x","margin","height","y","width"], function(x,margin,height,y,width){return(
g => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", 0.1)
    .call(g => g.append("g")
      .selectAll("line")
      .data(x.ticks())
      .join("line")
        .attr("x1", d => 0.5 + x(d))
        .attr("x2", d => 0.5 + x(d))
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom))
    .call(g => g.append("g")
      .selectAll("line")
      .data(y.ticks())
      .join("line")
        .attr("y1", d => 0.5 + y(d))
        .attr("y2", d => 0.5 + y(d))
        .attr("x1", margin.left)
        .attr("x2", width - margin.right))
)});
  main.variable(observer("dataAt")).define("dataAt", ["data","valueAt"], function(data,valueAt){return(
function dataAt(yil) {
  return data.map(d => ({
    name: d.name,
    region: d.region,
    income: valueAt(d.income, yil),
    population: valueAt(d.population, yil),
    lifeExpectancy: valueAt(d.lifeExpectancy, yil)
  }));
}
)});
  main.variable(observer("valueAt")).define("valueAt", ["bisectyil"], function(bisectyil){return(
function valueAt(values, yil) {
  const i = bisectyil(values, yil, 0, values.length - 1);
  const a = values[i];
  if (i > 0) {
    const b = values[i - 1];
    const t = (yil - a[0]) / (b[0] - a[0]);
    return a[1] * (1 - t) + b[1] * t;
  }
  return a[1];
}
)});
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("nations.json").json()
)});
  main.variable(observer("bisectyil")).define("bisectyil", ["d3"], function(d3){return(
d3.bisector(([yil]) => yil).left
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 20, bottom: 35, left: 40}
)});
  main.variable(observer("height")).define("height", function(){return(
560
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child1 = runtime.module(define1);
  main.import("Scrubber", child1);
  return main;
}
