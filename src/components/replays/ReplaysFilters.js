import { useState } from "react";
import { search4Replays } from "../Home";
import $ from 'jquery';
import { useSelector, useDispatch } from "react-redux";
import { setPlayer4Search, setFilterPlayer, setFilterTeam, setFilterReplay, setFilterGoal, setFilterStadium, setFilterSpaceMode, setFilterRealSoccer, setSearchText, setPeriodState } from "../../slices/replaysSlice";

function ReplaysFilters(props) {

  const filterPlayer = useSelector(state => state.replays.filters.player)
  const filterTeam = useSelector(state => state.replays.filters.team)
  const filterReplay = useSelector(state => state.replays.filters.replay)
  const filterGoal = useSelector(state => state.replays.filters.goal)
  const filterStadium = useSelector(state => state.replays.filters.stadium)
  const filterSpaceMode = useSelector(state => state.replays.filters.spaceMode)
  const filterRealSoccer = useSelector(state => state.replays.filters.realSoccer)
  const searchText = useSelector(state => state.replays.filters.searchText)
  const periodState = useSelector(state => state.replays.filters.period)
  const replaysType = useSelector(state => state.replays.type);
  const dispatch = useDispatch();

  function toggleFilter(ev) {
    if (ev.target.id === 'filterPlayer') dispatch(setFilterPlayer(!filterPlayer))
    else if (ev.target.id === 'filterTeam') dispatch(setFilterTeam(!filterTeam))
    else if (ev.target.id === 'filterReplay') dispatch(setFilterReplay(!filterReplay))
    else if (ev.target.id === 'filterGoal') dispatch(setFilterGoal(!filterGoal))
    else if (ev.target.id === 'filterStadium') dispatch(setFilterStadium(!filterStadium))
    else if (ev.target.id === 'filterSpaceMode') dispatch(setFilterSpaceMode(!filterSpaceMode))
    else if (ev.target.id === 'filterRealSoccer') dispatch(setFilterRealSoccer(!filterRealSoccer))
  }

  function searchInput(ev) {
    dispatch(setSearchText(ev.target.value));
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
    dispatch(setPeriodState(ev.target.textContent.toLowerCase()))
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