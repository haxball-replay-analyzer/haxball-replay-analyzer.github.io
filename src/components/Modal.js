import { useState } from "react";
import $ from 'jquery'
var timeout;
var doHideModal = false;

export function openModal(message, color) { }

function Modal() {

  const [color, setColor] = useState('black')
  const [message, setMessage] = useState('')

  openModal = function (message, color, timeouter = 3) {
    doHideModal = false;
    setMessage(message);
    setColor(color);
    $("#modal").css("display", "block");
    $("#modal").animate({
      left: '10px'
    }, { duration: 700, easing: 'swing', queue: false });
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      closeModal()
    }, (timeouter * 1000))
  }

  function closeModal() {
    doHideModal = true;
    $("#modal").animate({
      left: '-50%'
    }, { duration: 700, easing: 'swing', queue: false, complete: function () { hideModal() } });
  }

  function hideModal() {
    if (doHideModal) $("#modal").css("display", "none");
  }

  function handleHover() {
    $("#modal").css('cursor', 'pointer')
  }

  return (
    <div id="modal" className="hidden" onClick={closeModal} onMouseMove={handleHover} style={{ backgroundColor: color }}>
      {message}
    </div>
  );
}

export default Modal;