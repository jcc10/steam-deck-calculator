import { calculate } from "./calculate.js";
import {} from "./input.js";
import { dataFromCSVString } from "./csv.js";
let loaded_data = null;
let algo = "???";
document.getElementById("loadMoo").onclick = () => getData("3-26-22-moo.csv");
document.getElementById("loadHoxeel").onclick = () =>
  getData(
    "2-11-22-hoxeel-filtered.csv",
  );
document.getElementById("calculateMoo").onclick = () => {
  calc("mooV2");
  algo = "mooV2";
};
document.getElementById("calculateAbyzma").onclick = () => {
  calc("abyzma");
  algo = "abyzma";
};
let result = null;
let calculate_error = null;

async function calc(model) {
  [result, calculate_error] = await calculate(model, loaded_data);
  update_data();
}

//Do the fun stuff to display the things!
export function update_data() {
  if (calculate_error != null) {
    document.getElementById("results").innerHTML =
      `<h1 style="color: red;">${calculate_error}</h1>`;
    return;
  }
  if (result !== null) {
    //Calculate the order email time.
    let launchTime = new Date(1646071200000); //feb 25th 10pm est
    let emailTime = undefined;
    while (new Date(result).getTime() > launchTime.getTime()) {
      emailTime = launchTime;
      launchTime = new Date(launchTime.getTime() + 6.048e+8);
    }

    const date = new Date(emailTime);
    const diff = date.getTime() - Date.now();

    document.getElementById("results").innerHTML = `
      <h3>${algo} (${new Date(Date.now()).toDateString()})</h3>
      <h2>Estimated Order Date: ${date.toDateString()}<br>
      ${Math.floor(diff / (1000 * 60 * 60 * 24))} day(s)
      ${Math.floor((diff / (1000 * 60 * 60)) % 24)} hour(s)
      ${Math.floor((diff / 1000 / 60) % 60)} minute(s)
      ${Math.floor((diff / 1000) % 60)} second(s)</h2>
      
      
      `;
  }
}
setInterval(update_data, 1000);

function getData(url) {
  fetch(url).then((response) => response.text()).then((data) =>
    loaded_data = dataFromCSVString(data, url.slice(0, -4))
  );
}
getData("2-11-22-hoxeel-filtered.csv");
