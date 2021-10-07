import React from "react";
import PropTypes from "prop-types";
import { ListItemText, Button, Toolbar, withStyles } from "@material-ui/core";

const styles = {
  toolbar: {
    justifyContent: "space-between",
  },
};

function SubscriptionInfo(props) {
  const { classes, openAddNewOUSDialog } = props;
  return (
    <Toolbar className={classes.toolbar}>
      <ListItemText primary="Status" secondary="Premium Account" />
      <Button
        variant="contained"
        color="secondary"
        onClick={openAddNewOUSDialog}
        disableElevation
      >
        Add Balance
      </Button>
    </Toolbar>
  );
}

SubscriptionInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  openAddNewOUSDialog: PropTypes.func.isRequired,
};

export default withStyles(styles)(SubscriptionInfo);
