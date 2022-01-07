import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Card.module.css";
import CountUp from "react-countup";
import cx from "classnames";
import infected from "../../images/infected.png";
import deathIcon from "../../images/deaths.png";
import recoveredIcon from "../../images/recovered.png";

const Cards = ({
  data: { confirmed, recovered, deaths, lastUpdate },
  countryName
}) => {
  if (!confirmed) return <div></div>;
  if (!countryName) countryName = "World";
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <span className={styles.title}>Infected</span>

              <img
                className={styles.infectedIcon}
                alt="INFECTED"
                src={infected}
              ></img>
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={confirmed.value}
                duration={2.5}
                separator=","
              ></CountUp>
            </Typography>
            <Typography color="textSecondary">
              <span className={styles.title}>
                {new Date(lastUpdate).toDateString()}
              </span>
            </Typography>
            <Typography variant="body2">
              {`No of active cases in ${countryName}`}
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <span className={styles.title}>Recovered(Inactive Api)</span>
              <img
                className={styles.recoveredIcon}
                alt="RECOVERED"
                src={recoveredIcon}
              ></img>
            </Typography>
            <Typography variant="h5">
              {" "}
              <CountUp
                start={0}
                end={recovered.value}
                duration={2.5}
                separator=","
              ></CountUp>
            </Typography>
            <Typography color="textSecondary">
              {" "}
              <span className={styles.title}>
                {new Date(lastUpdate).toDateString()}
              </span>
            </Typography>
            <Typography variant="body2">
              {`No of recoveries in ${countryName}`}
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <span className={styles.title}>Deaths</span>

              <img
                className={styles.deathIcon}
                alt="DEATHS"
                src={deathIcon}
              ></img>
            </Typography>
            <Typography variant="h5">
              {" "}
              <CountUp
                start={0}
                end={deaths.value}
                duration={2.5}
                separator=","
              ></CountUp>
            </Typography>
            <Typography color="textSecondary">
              {" "}
              <span className={styles.title}>
                {new Date(lastUpdate).toDateString()}
              </span>
            </Typography>
            <Typography variant="body2">
              {`No of deaths in ${countryName}`}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
