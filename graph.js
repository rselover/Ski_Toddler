function renderTreeDBHPlot() {
  loadTreeData().then(data => {
    // 'data' is already the array of objects from your load function
    const validData = data
      .map(d => ({ 
        dbh: +d.properties?.dbh 
      }))
      .filter(d => !isNaN(d.dbh) && d.dbh > 0 && d.dbh < 200);

    console.log("Records passed to plot:", validData.length);

    const plotDiv = document.getElementById('plot');
    plotDiv.innerHTML = '';

    if (validData.length === 0) {
      plotDiv.textContent = "Still no data. Check console for 'Records passed to plot'.";
      return;
    }

    let plotWidth = 700;
    const parent = plotDiv.parentElement;
    if (parent) {
      plotWidth = Math.max(300, parent.clientWidth - 32);
    }

    if (validData.length === 0) {
      plotDiv.textContent = "No DBH data found. Check the field name in your GeoJSON.";
      return;
    }

    const plot = Plot.plot({
      marginLeft: 50,
      marginRight: 20,
      marginBottom: 50,
      width: plotWidth,
      height: 300,
      style: {
        background: "#222",
        color: "#eee",
        fontFamily: "sans-serif"
      },
      x: {
        label: "Diameter at Breast Height (inches) →",
        labelAnchor: "center",
      },
      y: {
        label: "↑ Tree count",
        labelAnchor: "center",
        grid: true,
      },
      marks: [
        Plot.rectY(
          validData,
          Plot.binX({ y: "count" }, { x: "dbh", fill: "#4caf7d", thresholds: 40 })
        ),
        Plot.ruleY([0], { stroke: "#888" })
      ]
    });

    plotDiv.appendChild(plot);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  function waitForPlotDiv() {
    if (document.getElementById('plot')) {
      renderTreeDBHPlot();
    } else {
      setTimeout(waitForPlotDiv, 50);
    }
  }
  waitForPlotDiv();
});
