import react, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  ToggleButton,
} from "react-bootstrap";
import Square from "../../Components/Square/Square";
import ShopHelper from "../../Helpers/shopHelper";

export default class Checkout_Details extends Component {
  state = {
    validated: false,
    personal_information: [],
    shippingOption: "Shipping",
    validatedAddressError: false,
  };

  async componentDidMount() {
    // console.log(this.props)
    document.getElementById(`inline-Local Pickup`).checked = false;
    document.getElementById(`inline-Shipping`).checked = true;
  }

  showValidateAddressError = () => {
    this.setState({
      validatedAddressError: true,
    });
    setTimeout(() => {
      this.setState({
        validatedAddressError: false,
      });
    }, 5000);
  };

  handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    let personalInformation = [];
    for (let i = 0; i < event.currentTarget.length - 1; i++) {
      let keyPair = {
        [event.currentTarget[i].name]: event.currentTarget[i].value,
      };
      personalInformation.push(keyPair);
    }

    console.log(personalInformation);

    if (form.checkValidity() === false) {
      this.showValidateAddressError();
      event.stopPropagation();
    } else {
      await ShopHelper.verifyAddress(personalInformation).then(async (res) => {
        if (res === false) {
          this.showValidateAddressError();
        } else {
          await ShopHelper.setOrderAddress(
            this.props.orderId,
            personalInformation
          );
          localStorage.setItem(
            "checkout-version",
            (parseInt(localStorage.getItem("checkout-version")) + 1).toString()
          );
          const shippingRates = await ShopHelper.getShippingRates(
            personalInformation
          );
          console.log(shippingRates);
          localStorage.setItem("shipping-id", shippingRates.shippingId);
          localStorage.setItem("rate-id", shippingRates.rateId);
          this.updateCheckoutState();
        }
      });
    }
  };

  updateCheckoutState = () => {
    this.props.updateCheckout(1);
  };

  toggleShipping = (shippingOption) => {
    let el = document.getElementById(`inline-${shippingOption}`);
    if (shippingOption === "Shipping") {
      document.getElementById(`inline-Local Pickup`).checked = false;
      this.setState({
        shippingOption: shippingOption,
      });
      this.props.updateShippingOption(true);
    } else {
      document.getElementById(`inline-Shipping`).checked = false;
      this.setState({
        shippingOption: shippingOption,
      });
      this.props.updateShippingOption(false);
    }
  };

  render() {
    return (
      <Container>
        <Row className="my-3">
          <Col>
            <h1 className="text-center checkout-title active">
              1. Information
            </h1>
          </Col>
          {/* <Col><h1 className="text-center checkout-title nonActive">2. Shipping</h1></Col> */}
          <Col>
            <h1 className="text-center checkout-title nonActive">2. Payment</h1>
          </Col>
        </Row>
        <Form>
          <div key={`inline-checkbox`} className="mb-3">
            {["Shipping", "Local Pickup"].map((shippingType) => (
              <Form.Check
                inline
                label={`${shippingType}`}
                onClick={() => this.toggleShipping(`${shippingType}`)}
                type={"checkbox"}
                id={`inline-${shippingType}`}
              />
            ))}
          </div>
        </Form>
        {this.state.shippingOption === "Local Pickup" ? (
          <Row>
            <Col>
              <h1 className="text-center">Please proceed.</h1>
            </Col>
            <Col xs={12} lg={12} className="text-right">
              <Button
                type="button"
                onClick={() => this.props.updateCheckout(2)}
                variant="outline-light"
              >
                Next
              </Button>
            </Col>
          </Row>
        ) : (
          <Form
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleSubmit}
          >
            <Form.Row>
              <Form.Group
                as={Col}
                md="6"
                className="text-left"
                controlId="validationCustom01"
              >
                <Form.Label className="form-label">First name</Form.Label>
                <Form.Control
                  required
                  type="firstName"
                  placeholder="First name"
                  name="firstName"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="6"
                className="text-left"
                controlId="validationCustom01"
              >
                <Form.Label className="form-label">Last name</Form.Label>
                <Form.Control
                  required
                  type="lastName"
                  placeholder="Last name"
                  name="lastName"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                className="text-left"
                controlId="validationCustom02"
              >
                <Form.Label className="form-label">Address</Form.Label>
                <Form.Control
                  required
                  type="address"
                  placeholder="Address"
                  name="addressLine1"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                className="text-left"
                controlId="validationCustom03"
              >
                <Form.Label className="form-label">City</Form.Label>
                <Form.Control
                  required
                  type="city"
                  placeholder="City"
                  name="city"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                className="text-left"
                md="6"
                controlId="validationCustom04"
              >
                <Form.Label className="form-label">State</Form.Label>
                <Form.Control
                  required
                  type="state"
                  placeholder="State"
                  name="state"
                  minLength="2"
                  maxLength="2"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                className="text-left"
                md="6"
                controlId="validationCustom05"
              >
                <Form.Label className="form-label">Zipcode</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Zipcode"
                  name="zip"
                  minLength="5"
                  maxLength="5"
                  autoComplete="new-password"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                className="text-left"
                md="6"
                controlId="validationCustom05"
              >
                <Form.Label className="form-label">Phone</Form.Label>
                <Form.Control
                  required
                  type="phone"
                  placeholder="Phone"
                  name="phoneNumber"
                  minLength="10"
                  maxLength="10"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                className="text-left"
                md="6"
                controlId="validationCustom05"
              >
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  name="emailAddress"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            {this.state.validatedAddressError ? (
              <Row>
                <Col>
                  <h1 className="h4 text-center" style={{ color: "red" }}>
                    Please enter a valid address
                  </h1>
                </Col>
              </Row>
            ) : null}
            <Row className="py-2">
              <Col className="text-right">
                <Button type="submit" variant="outline-light">
                  Next
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    );
  }
}
