import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";

function LazyLoadAddNewOUSDialog(props) {
  const { open, onClose, onSuccess } = props;
  const [AddNewOUSDialog, setAddNewOUSDialog] = useState(null);
  const [hasFetchedAddNewOUSDialog, setHasFetchedAddBlanceDialog] =
    useState(false);

  useEffect(() => {
    if (open && !hasFetchedAddNewOUSDialog) {
      setHasFetchedAddBlanceDialog(true);
      import("./AddNewOUSDialog").then((Component) => {
        setAddNewOUSDialog(() => Component.default);
      });
    }
  }, [
    open,
    hasFetchedAddNewOUSDialog,
    setHasFetchedAddBlanceDialog,
    setAddNewOUSDialog,
  ]);

  return (
    <Fragment>
      {AddNewOUSDialog && (
        <AddNewOUSDialog
          open={open}
          onClose={onClose}
          onSuccess={onSuccess}
        ></AddNewOUSDialog>
      )}
    </Fragment>
  );
}

LazyLoadAddNewOUSDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default LazyLoadAddNewOUSDialog;
