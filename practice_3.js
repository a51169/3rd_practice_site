function _1(md){return(
    md`# PORTUGAL BASEMAP`
    )}
    
    function _map(d3,width,topojson,n2jrg,lisboa_raw,o,r)
    {
      const svg = d3.create("svg").attr("viewBox", [0, 0, width, 500]);
    
      /*The European projection https://spatialreference.org/ref/epsg/3035/ is used:*/
      //Defining the projection: you can change the scale and translate to zoom out or zoom more in Portugal
      let projection = d3
        .geoAzimuthalEqualArea()
        .rotate([0, -52])
        .scale(27000)
        .translate([3700, -5700]);
    
      //country boundaries
      svg
        .append("g")
        .selectAll("path")
        .data(topojson.feature(n2jrg, n2jrg.objects.nutsbn).features)
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(projection))
        .attr("fill", "none")
        .attr("stroke", "#6ab78d")
        .attr("stroke-width", 2);
    
       //Airbnbs
      svg
        .selectAll("circle")
        .data(lisboa_raw)
        .join("circle")
        .filter((d) => d.price < 100)
        .attr("cx", (d) => projection([d.longitude, d.latitude])[0])
        .attr("cy", (d) => projection([d.longitude, d.latitude])[1])
        .attr("r", 0)
        .attr("fill-opacity", (d) => o(d.price))
        .attr("stroke-opacity", 1)
        .attr("stroke", "#a520c9")
        .attr("stroke-width", 0.2)
        .attr("fill", "#a520c9")
        .transition()
        .delay(2000)
        .duration(1000)
        .attr("r", (d) => r(d.price));
    
      //Airbnb Rect
      svg
        .selectAll("rect")
        .data(lisboa_raw)
        .join("rect")
        .filter((d) => d.price > 7000)
        .style("dominant-baseline", "ideographic")
        .attr("width", 0)
        .attr("height", 15)
        .attr("fill", "#f1f1f1")
        .attr("x", (d) => projection([d.longitude, d.latitude])[0])
        .attr("y", (d) => projection([d.longitude, d.latitude])[1] - 14)
        .transition()
        .delay(4500)
        .duration(1000)
        .attr("width", 400);
    
      //Airbnbs
      svg
        .selectAll("circle")
        .data(lisboa_raw)
        .join("circle")
        .filter((d) => d.price > 7000)
        .attr("cx", (d) => projection([d.longitude, d.latitude])[0])
        .attr("cy", (d) => projection([d.longitude, d.latitude])[1])
        .attr("r", 0)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1)
        .attr("stroke", "#04635b")
        .attr("stroke-width", 0.2)
        .attr("fill", "#04635b")
        .transition()
        .delay(3500)
        .duration(1000)
        .attr("r", 8);
    
      //Airbnb Names
      svg
        .selectAll("text")
        .data(lisboa_raw)
        .join("text")
        .filter((d) => d.price > 7000)
        .style("dominant-baseline", "ideographic")
        .attr("opacity", 0)
        .attr("x", (d) => projection([d.longitude, d.latitude])[0] + 10)
        .attr("y", (d) => projection([d.longitude, d.latitude])[1])
        .attr("class", "text")
        .text((d) => d.name)
        .transition()
        .delay(5500)
        .duration(1000)
        .attr("opacity", 1);
    
      svg
        .append("g")
        .attr("transform", `translate(185, 34)`)
        .append("text")
        .style("text-anchor", "end")
        .attr("class", "text")
        .text("higher than 7000€ per night");
    
      svg
        .append("g")
        .attr("transform", `translate(10, 30)`)
        .append("circle")
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1)
        .attr("stroke", "#04635b")
        .attr("stroke-width", 0.2)
        .attr("fill", "#04635b")
        .attr("r", 8);
    
      return svg.node();
    }
    
    
    function _3(md){return(
    md`The geometries are retrieved from [Nuts2json API](https://github.com/eurostat/Nuts2json):`
    )}
    
    function _4(md){return(
    md`### Data loading `
    )}
    
    async function _n2j(){return(
    (
      await fetch(
        `https://raw.githubusercontent.com/eurostat/Nuts2json/master/${2016}/4258/nutspt_${3}.json`
      )
    ).json()
    )}
    
    async function _n2jrg(){return(
    (
      await fetch(
        `https://raw.githubusercontent.com/eurostat/Nuts2json/master/${2016}/4258/20M/3.json`
      )
    ).json()
    )}
    
    function _7(md){return(
    md`### Data formating`
    )}
    
    function _ptNuts3(n2j){return(
    n2j.features
    )}
    
    function _9(md){return(
    md`Getting the name of a specific region. `
    )}
    
    function _idName(ptNuts3){return(
    ptNuts3.map((d) => {
      return {
        id: d.properties.id,
        name: d.properties.na
      }
    })
    )}
    
    function _ptNuts3Only(idName){return(
    idName.filter((d) => {
      if (d.id.includes("PT")) {
        return d.id
      }
    })
    )}
    
    function _lisboa_raw(d3){return(
    d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTuPf7Ym_pyMeLzvjxzeP9NdEggTs0G0PYU4yDLgC7b3_MuvruXatvqFXNfmrsIUEwAqcNIZBWihZSE/pub?output=csv",
      d3.autoType
    )
    )}
    
    function _data(lisboa_raw){return(
    lisboa_raw.filter((d) => (d.price > 0) & (d.price < 1000))
    )}
    
    function _r(d3,data){return(
    d3
      .scaleSqrt()
      .domain(d3.extent(data.map((c) => c.price)))
      .range([0.1, 3])
    )}
    
    function _15(data){return(
    data.map((c) => c.price)
    )}
    
    function _16(d3,lisboa_raw){return(
    d3.extent(lisboa_raw.map((c) => c.price))
    )}
    
    function _o(d3,data){return(
    d3
      .scaleLinear()
      .domain(d3.extent(data.map((c) => c.price)))
      .range([0.3, 0.7])
    )}
    
    function _18(md){return(
    md`#### Appendix`
    )}
    
    function _d3(require){return(
    require("d3")
    )}
    
    function _topojson(require){return(
    require("topojson-client")
    )}
    
    // function _21(htl){return(
    // htl.html`<style>
    
    // body {
    //   font-family: Arial;
    //   font-weight:400;
    //   font-size:13px;
    //   background-color:"#bebebe";
    // }
    
    // svg {
    //   background-color:"#bebebe";
    // }
    
    // /*Defining text stylings*/
    
    // h1 {
    //   margin-top: 50;
    //   font-size: 1.3rem;
    //   color:#048054;
    //   margin-bottom: 50;
    //   font-weight:600;
    // }
    
    // h2 {
    //   margin-top: 5px;
    //   font-size: 1rem;
    //   margin-bottom: 5px;
    //   color:#048054;
    //   font-weight:500;
    // }
    
    // h3 {
    //   margin-top: 5px;
    //   font-size: 1rem;
    //   margin-bottom: 10px;
    //   color:#048054;
    //   font-weight:400;
    // }
    
    // h4 {
    //   margin-top: 5px;
    //   font-size: 0.9rem;
    //   margin-bottom: 5px;
    //   color:#f20666;
    //   font-weight:300;
    // }
    
    // h5 {
    //   margin-top: 5px;
    //   font-size: 1rem;
    //   margin-bottom: 0px;
    //   color:#f20666;
    //   font-weight:400;
    // }
    
    // a:link, a:active, a:visited {
    //   margin-top:0.5px;
    //   color:#662e9b;
    //   font-size:12px;
    //   font-weight:500;
    // }
    
    // a:hover {
    //   margin-top:0.5px;
    //   color:#662e9b;
    //   font-size:12px;
    //   font-weight:500;
    // }
    
    // /*Defining chart stylings*/
    
    // .text {
    //         text-align: start;
    //         text-anchor: center;
    //         alignment-baseline: end;
    //         fill: #04635b;
    //         font-size: 7pt;
    //         font-weight:600;
    //         letter-spacing: 1px;
    //       }
    
    // rect {
    //         fill: #f1f1f1;
    //         opacity: 0.5;
    //       }
    
    // </style>`
    // )}
    
    export default function define(runtime, observer) {
      const main = runtime.module();
      main.variable(observer()).define(["md"], _1);
      main.variable(observer("map")).define("map", ["d3","width","topojson","n2jrg","lisboa_raw","o","r"], _map);
      main.variable(observer()).define(["md"], _3);
      main.variable(observer()).define(["md"], _4);
      main.variable(observer("n2j")).define("n2j", _n2j);
      main.variable(observer("n2jrg")).define("n2jrg", _n2jrg);
      main.variable(observer()).define(["md"], _7);
      main.variable(observer("ptNuts3")).define("ptNuts3", ["n2j"], _ptNuts3);
      main.variable(observer()).define(["md"], _9);
      main.variable(observer("idName")).define("idName", ["ptNuts3"], _idName);
      main.variable(observer("ptNuts3Only")).define("ptNuts3Only", ["idName"], _ptNuts3Only);
      main.variable(observer("lisboa_raw")).define("lisboa_raw", ["d3"], _lisboa_raw);
      main.variable(observer("data")).define("data", ["lisboa_raw"], _data);
      main.variable(observer("r")).define("r", ["d3","data"], _r);
      main.variable(observer()).define(["data"], _15);
      main.variable(observer()).define(["d3","lisboa_raw"], _16);
      main.variable(observer("o")).define("o", ["d3","data"], _o);
      main.variable(observer()).define(["md"], _18);
      main.variable(observer("d3")).define("d3", ["require"], _d3);
      main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
      main.variable(observer()).define(["htl"], _21);
      return main;
    }
    