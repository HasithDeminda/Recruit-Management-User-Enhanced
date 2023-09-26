import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import grey from "@mui/material/colors/grey";
import "./Feedbacks.scss";

import _ from "lodash";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  table: {
    width: "100%",
    tableLayout: "fixed",
    padding: "0px",
  },
  td: {
    width: "40px",
    textAlign: "right",
    height: "50px",
  },
  count: {
    color: "#000000",
    paddingLeft: "10px",
    borderRadius: "10px",
  },
  starIcon: {
    padding: "0%",
    height: "20px",
    color: grey[500],
  },
});

export class RatingChart extends React.Component {
  render() {
    const classes = this.props.classes;
    const ratings = this.props.ratings || [];
    const colors = this.props.colors || [];
    const raterCount = this.props.raterCount;
    const max = raterCount;

    return (
      <table className={classes.table}>
        <tbody>
          {ratings.map((item, itemIndex) => {
            let style = {
              backgroundColor: colors[itemIndex] || "#CBC8C8",
              width: (item / max) * 100 + "%",
              height: "20px",
              borderRadius: "10px",
              color: "#008B8B",
            };

            return (
              <tr key={itemIndex}>
                <td style={{ color: "blue" }} className={classes.td}>
                  {itemIndex + 1}
                </td>
                <td style={{ color: "blue" }} className={classes.td}>
                  Star
                </td>
                <td className={classes.td}></td>
                <td>
                  <div id="ff" style={style}>
                    <span className={classes.count}></span>
                  </div>
                </td>
                <td style={{ fontWeight: "bold" }} className={classes.td}>
                  {Math.round((item / max) * 100) + "%"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

RatingChart.propTypes = {
  classes: PropTypes.object.isRequired,
  ratings: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
};

export default withStyles(styles)(RatingChart);
