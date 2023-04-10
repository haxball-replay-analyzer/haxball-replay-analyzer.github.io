import { useDispatch } from "react-redux";
import { setMainMode } from "../../slices/mainModeSlice";
import $ from 'jquery'

function MostViewedReplays() {

  const dispatch = useDispatch();

  function closeReplays() {
    dispatch(setMainMode('home'))

    $('.roomlist-view').animate({
      left: '0%',
    }, { duration: 700, easing: 'swing', queue: false });

    $('#mostViewedReplays').animate({
      left: '150%',
    }, { duration: 700, easing: 'swing', queue: false });
  }

  return (
    <div id="mostViewedReplays">
      <h1>Most viewed replays</h1>
      <button onClick={closeReplays} id="closeReplaysButton" >Close ❌</button>
      Most viewed replays here
    </div>
  );
}

export default MostViewedReplays;