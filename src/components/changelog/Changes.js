import Change from "./Change";

function Changes(props) {

  function changeList(z) {
    const a = z.change.changes;
    const b = a.map(change => <Change key={a.indexOf(change)} change={change} />)
    return (
      <ul>
        {b}
      </ul>
    )
  }

  return (
    <div>
      <h4>v{props.change.version} - {props.change.date}</h4>
      {changeList(props)}
    </div>
  );
}

export default Changes;