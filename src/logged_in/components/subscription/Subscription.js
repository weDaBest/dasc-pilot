import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { List, Divider, Paper, withStyles } from "@material-ui/core";
import SubscriptionTable from "./SubscriptionTable";
import SubscriptionInfo from "./SubscriptionInfo";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)",
  },
};

function Subscription(props) {
  const { transactions, classes, openAddNewOUSDialog, selectSubscription } =
    props;

  useEffect(selectSubscription, [selectSubscription]);

  return (
    <Paper>
      <List disablePadding>
        <SubscriptionInfo openAddNewOUSDialog={openAddNewOUSDialog} />
        <Divider className={classes.divider} />
        <SubscriptionTable transactions={transactions} />
      </List>
    </Paper>
  );
}

Subscription.propTypes = {
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectSubscription: PropTypes.func.isRequired,
  openAddNewOUSDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(Subscription);