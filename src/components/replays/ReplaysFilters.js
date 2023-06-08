import { useState } from "react";
import { search4Replays } from "../Home";
import $ from 'jquery';
import { useSelector, useDispatch } from "react-redux";
import { setPlayer4Search } from "../../slices/replaysSlice";

function ReplaysFilters(props) {

  const [filterPlayer, setFilterPlayer] = useState(true)
  const [filterTeam, setFilterTeam] = useState(false)
  const [filterReplay, setFilterReplay] = useState(false)
  const [filterGoal, setFilterGoal] = useState(false)
  const [filterStadium, setFilterStadium] = useState(false)
  const [filterSpaceMode, setFilterSpaceMode] = useState(false)
  const [filterRealSoccer, setFilterRealSoccer] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [periodState, setPeriodState] = useState('week');
  const replaysType = useSelector(state => state.replays.type);
  const dispatch = useDispatch();

  function toggleFilter(ev) {
    if (ev.target.id === 'filterPlayer') setFilterPlayer(!filterPlayer)
    else if (ev.target.id === 'filterTeam') setFilterTeam(!filterTeam)
    else if (ev.target.id === 'filterReplay') setFilterReplay(!filterReplay)
    else if (ev.target.id === 'filterGoal') setFilterGoal(!filterGoal)
    else if (ev.target.id === 'filterStadium') setFilterStadium(!filterStadium)
    else if (ev.target.id === 'filterSpaceMode') setFilterSpaceMode(!filterSpaceMode)
    else if (ev.target.id === 'filterRealSoccer') setFilterRealSoccer(!filterRealSoccer)
  }

  function searchInput(ev) {
    setSearchText(ev.target.value);
  }

  function searchReplay(ev, period = null) {
    const toSend = {
      header: 'top10 filtered',
      replaysType: replaysType,
      searchText: searchText,
      filterPlayer: filterPlayer,
      filterGoal: filterGoal,
      filterRealSoccer: filterRealSoccer,
      filterReplay: filterReplay,
      filterSpaceMode: filterSpaceMode,
      filterStadium: filterStadium,
      filterTeam: filterTeam,
      period: (period || periodState)
    }
    if (filterPlayer || filterGoal) dispatch(setPlayer4Search(searchText))
    else dispatch(setPlayer4Search(null))
    search4Replays(toSend)
  }

  function filterPeriod(ev) {
    $('#filterByWeek').removeClass('active')
    $('#filterByMonth').removeClass('active')
    $('#filterByAlltime').removeClass('active')
    $('#' + ev.target.id).addClass('active')
    searchReplay(null, ev.target.textContent.toLowerCase());
    setPeriodState(ev.target.textContent.toLowerCase())
  }

  return (
    <div className="replaysFilters" style={{ height: '15%', width: '100%', display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", fontSize: '150%', fontWeight: 'bold' }}>Filters</div>
        {replaysType === 'mostViewed' && <div className="replaysFiltersButtons" style={{ flex: 1 }}>
          <button id="filterByWeek" className="active" onClick={filterPeriod}>Week</button>
          <button id="filterByMonth" onClick={filterPeriod}>Month</button>
          <button id="filterByAlltime" onClick={filterPeriod}>All-time</button>
        </div>}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <input
          type="text"
          style={{ backgroundColor: 'lightgrey', borderRadius: 4, padding: "3px", margin: '5px', width: '80%' }}
          placeholder="Search..."
          value={searchText}
          onChange={searchInput}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              searchReplay();
            }
          }}
        />
        <div>
          <label style={{ margin: '5px' }}><input type="checkbox" id='filterReplay' checked={filterReplay} onChange={toggleFilter} />Replay Name</label>
          <label style={{ margin: '5px' }}><input type="checkbox" id='filterTeam' checked={filterTeam} onChange={toggleFilter} />Team Name</label>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <label style={{ margin: '5px' }}><input type="checkbox" id='filterPlayer' checked={filterPlayer} onChange={toggleFilter} />Player</label>
        <label style={{ margin: '5px' }}><input type="checkbox" id='filterGoal' checked={filterGoal} onChange={toggleFilter} />Goal Scorer</label>
        <label style={{ margin: '5px' }}><input type="checkbox" id='filterStadium' checked={filterStadium} onChange={toggleFilter} />Stadium Name</label>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <label style={{ margin: '5px' }}><input type="checkbox" id='filterSpaceMode' checked={filterSpaceMode} onChange={toggleFilter} />Only SpaceMode</label>
        <label style={{ margin: '5px' }}><input type="checkbox" id='filterRealSoccer' checked={filterRealSoccer} onChange={toggleFilter} />Only Real Soccer</label>
        <button className="searchReplay" onClick={searchReplay}>Search</button>
      </div>
    </div>
  )
}

export default ReplaysFilters;