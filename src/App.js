import React from "react";
import { Cards, Chart, CountryPicker } from "./components"; //when you need to get any specific from the class then you use {}
import styles from "./App.module.css"; // when you want to represnt the class with name you dont use {}
import { fetchData } from "./api";

class App extends React.Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    console.log(fetchedData);

    this.setState({ data: fetchedData });
  }

  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <Cards data={data} />
        <CountryPicker />
        <Chart />
      </div>
    );
  }
}

export default App;
