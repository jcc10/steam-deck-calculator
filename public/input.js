import { dataFromCSVString } from "./csv.js";
//clear file input
document.getElementById("file").value = null;

export function getLocalStorageOrDefault(item) {
  const defaults = {
    region: "US",
    model: "256",
    rtReserveTime: "1626454969",
    order_avail: "Q1",
  };
  if (localStorage.getItem(item) == null) {
    return defaults[item];
  }
  return localStorage.getItem(item);
}

//Load data from local-storage
document.getElementById("region").value = getLocalStorageOrDefault("region");
document.getElementById("model").value = getLocalStorageOrDefault("model");
document.getElementById("rtReserveTime").value = getLocalStorageOrDefault(
  "rtReserveTime",
);
document.getElementById("order_avail").value = getLocalStorageOrDefault(
  "order_avail",
);
// Set onChange
document.getElementById("region").onchange = () => updateAndStore("region");
document.getElementById("model").onchange = () => updateAndStore("model");
document.getElementById("rtReserveTime").onchange = () => updateTimeDisplay();
document.getElementById("order_avail").onchange = () =>
  updateAndStore("order_avail");

//Called when a form item changes state. Stores the value into local storage for later use.
function updateAndStore(item) {
  const value = document.getElementById(item).value;
  localStorage.setItem(item, value);
}

function updateTimeDisplay() {
  updateAndStore("rtReserveTime");
  const date = new Date(
    document.getElementById("rtReserveTime").value * 1000,
  );
  document.getElementById("time_display").innerHTML =
    `${date.toDateString()} ${date.toTimeString()}`;
}

function customFileUpload(evt) {
  const file = evt.target.files[0]; // FileList object
  const reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = function (evt) {
    dataFromCSVString(evt.target.result, file.name);
  };
}
document.getElementById("file").addEventListener(
  "change",
  customFileUpload,
  false,
);

updateTimeDisplay();
