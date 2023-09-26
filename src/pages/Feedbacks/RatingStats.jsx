import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
// import PersonIcon from 'material-ui-icons/Person'
import lightGreen from "@mui/material/colors/lightGreen";
import lime from "@mui/material/colors/lime";
import red from "@mui/material/colors/red";
import orange from "@mui/material/colors/orange";
import amber from "@mui/material/colors/amber";
import grey from "@mui/material/colors/grey";
import axios from "axios";
import "./Feedbacks.scss";

import RatingChart from "./RatingCharts";
import _ from "lodash";

const styles = {
  root: {
    width: "100%",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    paddingTop: "20px",
    paddingBottom: "40px",
    borderRadius: "50px",
  },
  card: {
    // maxWidth: 670,
    margin: "0 auto",
    marginTop: "10px",
  },
  bigBox: {
    display: "block",
    height: "100px",
    width: "100%",
    // border: '1px green solid',
  },
  outerAverageBox: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "15px",
    marginBottom: "30px",
    width: "20%",
    textAlign: "center",
    // border: '1px orange solid',
  },
  averageBox: {
    diplay: "float",
    float: "center",
    marginLeft: "35%",
    marginRight: "35%",
    textAlign: "center",
    whiteSpace: "nowrap",
    paddingTop: " 50px 10px 10px 10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    borderRadius: "50px",
    fontSize: "30px",
    // border: '1px red solid',
  },
  average: {
    fontSize: "44px",
    lineHeight: "44px",
    fontWeight: "100",
    color: grey[500],
  },
  chart: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "50px",
    width: "50%",
    // border: '1px blue solid',
  },
  greyStars: {
    width: "16px",
    color: grey[400],
  },
  yellowStars: {
    width: "16px",
    color: amber[400],
  },
  greyPerson: {
    width: "18px",
    color: grey[400],
  },
  raterCount: {},
};

export class RatingStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: [0, 0, 0, 0, 0],
      colors: [lightGreen[300], lime[400], amber[300], orange[300], red[200]],
      ratingAverage: 0.0,
      raterCount: 0,
    };
  }

  componentDidMount() {
    axios
      .get(`https://rwa-webapp.azurewebsites.net/api/feedbacks/getFeedbacks`)
      .then((res) => {
        //console.log(res.data.ratings);
        this.setState({
          ratingAverage: res.data.averageRating,
          ratings: res.data.ratings,
          raterCount: res.data.feedbacksCount,
        });
        //console.log(this.ratingAverage);
      });
  }

  render() {
    const classes = this.props.classes;
    const ratings = this.state.ratings;
    const colors = this.state.colors;
    const ratingAverage = this.state.ratingAverage;
    const raterCount = this.state.raterCount;

    return (
      <div className={classes.root}>
        <div>
          <div className="feedback-stat_title">User Reviews</div>
          <div className={classes.bigBox}>
            <div className={classes.averageBox}>
              <Typography className={classes.average}>
                {ratingAverage} out of 5
              </Typography>
              {getStars(classes, Math.round(ratingAverage))}

              {/* <PersonIcon className={classes.greyPerson}/> */}
            </div>
            <div className={classes.outerAverageBox}>
              <Typography className={classes.raterCount}>
                {raterCount} User Ratings
              </Typography>
            </div>
          </div>
          <div className={classes.chart}>
            <RatingChart
              ratings={ratings}
              colors={colors}
              raterCount={raterCount}
            />
          </div>
        </div>
      </div>
    );
  }
}

function getStars(classes, stars) {
  let i = 0;
  let yellowStars = [...Array(stars)].map(() => {
    return (
      <StarIcon
        key={i++}
        className={classes.yellowStars}
        size="large"
        sx={{
          fontSize: "50px",
        }}
      />
    );
  });
  let ii = 5 - i;
  let greyStars = [...Array(ii)].map(() => {
    return (
      <StarIcon
        key={i++}
        className={classes.greyStars}
        size="large"
        sx={{
          fontSize: "50px",
        }}
      />
    );
  });
  return _.concat(yellowStars, greyStars);
}

RatingStat.propTypes = {
  classes: PropTypes.object.isRequired,
  ratings: PropTypes.array.isRequired,
};

export default withStyles(styles)(RatingStat);
