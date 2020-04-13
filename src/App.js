import React from "react";
import { Cards, Chart, CountryPicker } from "./components"; //when you need to get any specific from the class then you use {}
import styles from "./App.module.css"; // when you want to represnt the class with name you dont use {}
import { fetchData } from "./api";
import corona from "./images/image.png";

class App extends React.Component {
  state = {
    data: [],
    country: ""
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    console.log(fetchedData);

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (event, country) => {
    const countryData = await fetchData(country);
    this.setState({ data: countryData, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={corona} alt="COVID-19"></img>
        <Cards data={data} countryName={country} />
        <CountryPicker changeCountry={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
