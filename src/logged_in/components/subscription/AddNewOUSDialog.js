import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  IbanElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Grid, Button, Box, withTheme } from "@material-ui/core";
import StripeNewOUSForm from "./stripe/StripeNewOUSForm";
import StripeExistingOUSForm from "./stripe/StripeExistingOUSForm";
import FormDialog from "../../../shared/components/FormDialog";
import ColoredButton from "../../../shared/components/ColoredButton";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const paymentOptions = ["Brand New OUS", "Use Existing OUS"];

const AddNewOUSDialog = withTheme(function (props) {
  const { open, theme, onClose, onSuccess } = props;

  const [loading, setLoading] = useState(false);
  const [paymentOption, setPaymentOption] = useState("Use Existing OUS");
  const [stripeError, setStripeError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState("");
  const elements = useElements();
  const stripe = useStripe();

  const onAmountChange = (amount) => {
    if (amount < 0) {
      return;
    }
    if (amountError) {
      setAmountError("");
    }
    setAmount(amount);
  };

  const getStripePaymentInfo = () => {
    switch (paymentOption) {
      case "Brand New OUS": {
        return {
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: { name: name },
        };
      }
      case "Use Existing OUS": {
        return {
          type: "sepa_debit",
          sepa_debit: elements.getElement(IbanElement),
          billing_details: { email: email, name: name },
        };
      }
      default:
        throw new Error("No case selected in switch statement");
    }
  };

  const renderPaymentComponent = () => {
    switch (paymentOption) {
      case "Brand New OUS":
        return (
          <Fragment>
            <Box mb={2}>
              <StripeNewOUSForm
                stripeError={stripeError}
                setStripeError={setStripeError}
                setName={setName}
                name={name}
                amount={amount}
                amountError={amountError}
                onAmountChange={onAmountChange}
              />
            </Box>
            <HighlightedInformation>
              <b>Creating a brand new OUS from scratch</b>
            </HighlightedInformation>
          </Fragment>
        );
      case "Use Existing OUS":
        return (
          <Fragment>
            <Box mb={2}>
              <StripeExistingOUSForm
                stripeError={stripeError}
                setStripeError={setStripeError}
                setName={setName}
                setEmail={setEmail}
                name={name}
                email={email}
                amount={amount}
                amountError={amountError}
                onAmountChange={onAmountChange}
              />
            </Box>
            <HighlightedInformation>
              <b>Creating new OUS using existing OUS</b>
            </HighlightedInformation>
          </Fragment>
        );
      default:
        throw new Error("No case selected in switch statement");
    }
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      headline="Add OUS"
      hideBackdrop={false}
      loading={loading}
      onFormSubmit={async (event) => {
        event.preventDefault();
        if (amount <= 0) {
          setAmountError("Can't be zero");
          return;
        }
        if (stripeError) {
          setStripeError("");
        }
        setLoading(true);
        const { error } = await stripe.createPaymentMethod(
          getStripePaymentInfo()
        );
        if (error) {
          setStripeError(error.message);
          setLoading(false);
          return;
        }
        onSuccess();
      }}
      content={
        <Box pb={2}>
          <Box mb={2}>
            <Grid container spacing={1}>
              {paymentOptions.map((option) => (
                <Grid item key={option}>
                  <ColoredButton
                    variant={
                      option === paymentOption ? "contained" : "outlined"
                    }
                    disableElevation
                    onClick={() => {
                      setStripeError("");
                      setPaymentOption(option);
                    }}
                    color={theme.palette.common.black}
                  >
                    {option}
                  </ColoredButton>
                </Grid>
              ))}
            </Grid>
          </Box>
          {renderPaymentComponent()}
        </Box>
      }
      actions={
        <Fragment>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            type="submit"
            size="large"
            disabled={loading}
          >
            Add OUS {loading && <ButtonCircularProgress />}
          </Button>
        </Fragment>
      }
    />
  );
});

AddNewOUSDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

function Wrapper(props) {
  const { open, onClose, onSuccess } = props;
  return (
    <Elements stripe={stripePromise}>
      {open && (
        <AddNewOUSDialog open={open} onClose={onClose} onSuccess={onSuccess} />
      )}
    </Elements>
  );
}

AddNewOUSDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default Wrapper;
