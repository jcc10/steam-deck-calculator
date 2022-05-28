import { abyzma } from "./calculators/abyzma.js";
import { gecked } from "./calculators/gecked.js";
import { mooV2 } from "./calculators/moo.js";
import { getLocalStorageOrDefault } from "./input.js";
const algorythms = {
  abyzma,
  gecked,
  mooV2,
};

export async function calculate(name, loaded_data) {
  let result = null;
  let calculate_error = null;
  const algorythm = algorythms[name];
  if (loaded_data == null) {
    alert("No data loaded");
    return [null, "No Data"];
  }
  try {
    result = await algorythm({
      model: getLocalStorageOrDefault("model"),
      region: getLocalStorageOrDefault("region"),
      rtReserveTime: getLocalStorageOrDefault("rtReserveTime"),
      order_avail: getLocalStorageOrDefault("order_avail"),
    }, loaded_data);
  } catch (e) {
    console.log(e);
    calculate_error = e;
  }
  return [result, calculate_error];
}
