import { parseCSV } from "./csv_parse.js";
class Response {
  constructor(data) {
    this.timestamp = data[0]; //2/8/2022 15:34:25
    this.region = data[1]; //"US", "EU", "UK"
    this.model = data[2]; //"64", "256", "512"
    this.rtReserveTime = +data[3]; //preorder timestamp, number.
    this.firstValveUpdate = data[4]; //
    this.latestValveUpdate = data[5]; //
  }

  isReserveTimeAfter(other) {
    return this.rtReserveTime > other.rtReserveTime;
  }
}

class Data {
  constructor(responses) {
    this.responses = responses; //List of Response objects.
  }

  //Returns all responses where the model matches.
  whereModelIs(model) {
    return new Data(
      this.responses.filter((response) => response.model === model),
    );
  }

  //Returns all responses where the model matches.
  whereRegionIs(region) {
    return new Data(
      this.responses.filter((response) => response.region === region),
    );
  }

  sortByPreorderTimestamp() {
    return new Data(
      this.responses.sort((a, b) => a.rtReserveTime - b.rtReserveTime),
    );
  }
}
export function dataFromCSVString(data, name) {
  const parsed = parseCSV(data);
  const responses = [];
  for (let i = 1; i < parsed.length; i++) {
    responses.push(new Response(parsed[i]));
  }
  document.getElementById("loaded_data").innerHTML = name;
  return new Data(responses);
}
