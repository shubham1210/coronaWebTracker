import React, { useEffect, useState } from "react";
import { fetchConuntries } from "../../api";
import styles from "./CountryPicker.module.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const CountryPicker = ({ changeCountry }) => {
  const [fetchedContries, setFetchedContries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetchConuntries();
      setFetchedContries(response);
    };

    fetchAPI();
  }, [setFetchedContries]);

  return (
    <div>
      <Autocomplete
        //id="country-select-demo"
        style={{ width: 300 }}
        options={fetchedContries}
        className={styles.autoComplete}
        autoHighlight
        onChange={changeCountry}
        getOptionLabel={option => option}
        renderOption={option => <React.Fragment>{option}</React.Fragment>}
        renderInput={params => (
          <TextField
            {...params}
            label="Choose a country"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password" // disable autocomplete and autofill
            }}
          />
        )}
      />
    </div>
  );
};

export default CountryPicker;
