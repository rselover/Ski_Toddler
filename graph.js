function renderTable() {
  d3.json(geojsonUrl).then(geojson => {
    const rows = geojson.features.map(f => f.properties);
    if (!rows.length) return;

    const allColumns = Object.keys(rows[0]);
    const columns = [
      allColumns[0],
      'Score',
      ...allColumns.filter(c => c !== allColumns[0] && c !== 'Score')
    ];
    const scoreExtent = d3.extent(rows, r => +r['Score']);
    const colorScale = d3.scaleSequential()
      .domain(scoreExtent)
      .interpolator(d3.interpolateRdYlGn);

    const plotDiv = document.getElementById('plot');
    plotDiv.innerHTML = '';

    const filters = Object.fromEntries(columns.map(c => [c, '']));

    function filteredRows() {
      return rows.filter(row =>
        columns.every(col => {
          const f = filters[col].toLowerCase();
          return !f || String(row[col] ?? '').toLowerCase().includes(f);
        })
      );
    }

    const wrapper = d3.select(plotDiv).append('div').style('overflow-x', 'auto');
    const table = wrapper.append('table').attr('class', 'resort-table');
    const thead = table.append('thead');
    const tbody = table.append('tbody');

    thead.append('tr').selectAll('th')
      .data(columns).enter().append('th').text(d => d);

    thead.append('tr').selectAll('td')
      .data(columns).enter().append('td')
      .append('input')
      .attr('type', 'text')
      .attr('placeholder', 'Filter...')
      .on('input', function(event, col) {
        filters[col] = event.target.value;
        draw();
      });

    function draw() {
      const data = filteredRows();
      tbody.selectAll('tr').remove();

      const trs = tbody.selectAll('tr')
        .data(data)
        .enter().append('tr');

      trs.selectAll('td')
        .data(row => columns.map(col => ({ col, val: row[col] })))
        .enter().append('td')
        .text(d => d.val ?? '')
        .style('background', d =>
          d.col === 'Score' && d.val != null ? colorScale(+d.val) : null
        )
        .style('color', d => d.col === 'Score' ? '#111' : null)
        .style('font-weight', d => d.col === 'Score' ? '700' : null);
    }

    draw();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  function waitForPlotDiv() {
    if (document.getElementById('plot')) {
      renderTable();
    } else {
      setTimeout(waitForPlotDiv, 50);
    }
  }
  waitForPlotDiv();
});
