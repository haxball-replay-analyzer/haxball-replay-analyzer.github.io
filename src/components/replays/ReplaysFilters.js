import { useState } from "react";
import { search4Replays } from "../Home";
import $ from 'jquery';
import { useSelector, useDispatch } from "react-redux";
import { setPlayer4Search, setFilterPlayer, setFilterTeam, setFilterReplay, setFilterGoal, setFilterStadium, setFilterSpaceMode, setFilterRealSoccer, setSearchText, setPeriodState, setStartDate, setEndDate } from "../../slices/replaysSlice";
import ReactDatePicker from "react-datepicker";
import '/node_modules/react-datepicker/dist/react-datepicker.css';

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
  const startDate = useSelector(state => state.replays.filters.startDate);
  const endDate = useSelector(state => state.replays.filters.endDate);
  const [startDateState, setStartDateState] = useState(null)
  const [endDateState, setEndDateState] = useState(null)
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

  function setStartDateAgr(date) {
    setStartDateState(date);
    if (date === null) dispatch(setStartDate(null))
    else dispatch(setStartDate(date.toISOString().slice(0, 19).replace('T', ' ')))
  }
  function setEndDateAgr(date) {
    setEndDateState(date);
    if (date === null) dispatch(setEndDate(null))
    else dispatch(setEndDate(date.toISOString().slice(0, 19).replace('T', ' ')))
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
      period: (period || periodState),
      startDate: startDate,
      endDate: endDate
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
    <div className="replaysFilters"
      style={{
        height: props.isScrollingUp ? '17.5%' : '0px',
        transition: 'height 0.5s',
        width: '100%',
        display: "flex",
        flexDirection: "row",
        overflow: 'hidden'
      }}>
      <div
        style={{
          flex: 2,
          display: "flex",
          flexDirection: 'column',
          justifyContent: "center",
          alignItems: "center",
          height: props.isScrollingUp ? '100%' : '0px',
          transition: 'height 0.5s',
          overflow: 'hidden'
        }}>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", fontSize: '150%', fontWeight: 'bold' }}>Filters</div>
        {replaysType === 'mostViewed' && <div className="replaysFiltersButtons" style={{ flex: 1 }}>
          <button id="filterByWeek" className="active" onClick={filterPeriod}>Week</button>
          <button id="filterByMonth" onClick={filterPeriod}>Month</button>
          <button id="filterByAlltime" onClick={filterPeriod}>All-time</button>
        </div>}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "10px", paddingRight: '20px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flex: 1, textAlign: 'end', padding: '3px' }}>From:</div>
          <div style={{ flex: 2 }}>
            <ReactDatePicker selected={startDateState} onChange={(date) => setStartDateAgr(date)} dateFormat={'dd/MM/yyyy'} minDate={new Date('2023-05-01')} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ flex: 1, textAlign: 'end', padding: '3px' }}>To:</div>
          <div style={{ flex: 2 }}>
            <ReactDatePicker selected={endDateState} onChange={(date) => setEndDateAgr(date)} dateFormat={'dd/MM/yyyy'} minDate={new Date('2023-05-01')} />
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: props.isScrollingUp ? '100%' : '0px',
          transition: 'height 0.5s',
          overflow: 'hidden',
          paddingLeft: '30px'
        }}>
        <input
          type="text"
          style={{ backgroundColor: 'lightgrey', borderRadius: 4, padding: "3px", margin: '5px', width: '60%' }}
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
      <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingRight: '20px' }}>
        <label style={{ margin: '5px' }}><input type="checkbox" id='filterPlayer' checked={filterPlayer} onChange={toggleFilter} />Player</label>
        <label style={{ margin: '5px' }}><input type="checkbox" id='filterGoal' checked={filterGoal} onChange={toggleFilter} />Goal Scorer</label>
        <label style={{ margin: '5px' }}><input type="checkbox" id='filterStadium' checked={filterStadium} onChange={toggleFilter} />Stadium Name</label>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingRight: '10px' }}>
        <label style={{ margin: '5px' }}><input type="checkbox" id='filterSpaceMode' checked={filterSpaceMode} onChange={toggleFilter} />Only SpaceMode</label>
        <label style={{ margin: '5px' }}><input type="checkbox" id='filterRealSoccer' checked={filterRealSoccer} onChange={toggleFilter} />Only Real Soccer</label>
        <button className="searchReplay" onClick={searchReplay}>Search</button>
      </div>
    </div>
  )
}

export default ReplaysFilters;