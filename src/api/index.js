import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async country => {
  let changedUrl = url;
  if (country) {
    changedUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate }
    } = await axios.get(changedUrl);
    const modifiedData = { confirmed, recovered, deaths, lastUpdate };

    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map(dailyData => ({
      confirmed: dailyData.confirmed,
      deaths: dailyData.deaths,
      date: dailyData.reportDate
    }));
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};

export const fetchConuntries = async () => {
  try {
    const {
      data: { countries }
    } = await axios.get(`${url}/countries`);
    const modifiedCountry = countries.map(({ name }) => name);
    return modifiedCountry;
  } catch (err) {
    console.log(err);
  }
};
