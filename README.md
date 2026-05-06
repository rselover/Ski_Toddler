# SendIT - A Learn To Ski Map for Denver Parents

A React app (flat structure, JS only) for visualizing Learn To Ski Options for Parents wanting to teach their kids themselves.

https://rselover.github.io/SendIT/

---

## SendIT – Denver Area Learn-to-Ski Guide

A parent-focused tool for finding the best ski resorts near Denver for toddlers and young kids learning to ski. Compares 13 Front Range resorts across price, distance, terrain, and overall family value.

### Features

**Interactive Map**
- Mapbox GL JS map centered on the Denver/Front Range area
- Custom downhill skiing icons mark each resort location
- Clicking a marker pans the map and highlights the resort in the sidebar
- Clicking a resort name in the sidebar flies the map to that location and opens a popup
- Popups show the resort name with a collapsible "More Info" section listing all data fields
- Sidebar listing is scrollable and height-matched to the map

**Ranked Options Table**
- Full data table built with D3, loaded dynamically from GeoJSON
- Score column displayed as a red → yellow → green heatmap (low to high)
- Every column has a live filter input for narrowing results
- Score is pinned as the second column for quick comparison

**Navigation**
- Hamburger menu with links to Map, Ranked Options, and About sections
- Selecting a menu item collapses the other two cards and smooth-scrolls to the chosen section
- Each card can also be expanded/collapsed independently via its header

**About**
- Project description and links to LinkedIn and GitHub

### Stack
- React 18 (no build step, UMD via CDN)
- Material UI 5
- Mapbox GL JS v2
- D3 v7
- Data served from a GitHub Gist (GeoJSON)

### Data
Resort data includes: learn-to-ski price, under-5 price, pass affiliations (Epic/Ikon/Indy), distance from Denver, drive time, peak/base elevation, vertical drop, acreage, learn-to-ski acreage, trail and lift counts, annual snowfall, and a composite family score.
