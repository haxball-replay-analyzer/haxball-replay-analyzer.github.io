import { useState } from "react";

function ReplaysFilters(props) {

  const [filterPlayer, setFilterPlayer] = useState(true)

  function toggleFilter(ev) {
    if (ev.target.id === 'filterPlayer') setFilterPlayer(!filterPlayer)
  }

  return (
    <div className="replaysFilters" style={{ height: '15%', width: '100%', display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", fontSize: '150%', fontWeight: 'bold' }}>Filters</div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <input type="text" style={{ backgroundColor: 'lightgrey', borderRadius: 4, padding: "3px", margin: '5px', width: '80%' }} placeholder="Search..." />
        <div>
          <label style={{ margin: '5px' }}><input type="checkbox" />Replay Name</label>
          <label style={{ margin: '5px' }}><input type="checkbox" />Team Name</label>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <label style={{ margin: '5px' }}><input type="checkbox" id='filterPlayer' checked={filterPlayer} onChange={toggleFilter} />Player</label>
        <label style={{ margin: '5px' }}><input type="checkbox" />Goal Scorer</label>
        <label style={{ margin: '5px' }}><input type="checkbox" />Stadium Name</label>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <label style={{ margin: '5px' }}><input type="checkbox" />Only SpaceMode</label>
        <label style={{ margin: '5px' }}><input type="checkbox" />Only Real Soccer</label>
        <button className="searchReplay">Search</button>
      </div>
    </div>
  )
}

export default ReplaysFilters;