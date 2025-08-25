import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faCreditCard,
  faShippingFast,
  faShieldAlt,
  faCheckCircle,
  faArrowLeft,
  faEdit,
  faTruck,
  faGift,
  faPercent,
  faInfoCircle,
  faExclamationTriangle,
  faBolt,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [shippingInfo, setShippingInfo] = useState({
    sameAsBilling: true,
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  // Mock cart data
  const cartItems = [
    {
      _id: "1",
      name: "iPhone 15 Pro Max",
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=200",
      price: 1199,
      quantity: 1,
      color: "Natural Titanium",
      size: "256GB",
    },
    {
      _id: "2",
      name: "Sony WH-1000XM5",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200",
      price: 399,
      quantity: 1,
      color: "Black",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping =
    shippingMethod === "express" ? 25 : shippingMethod === "overnight" ? 45 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      description: "5-7 business days",
      price: 0,
      icon: faTruck,
    },
    {
      id: "express",
      name: "Express Shipping",
      description: "2-3 business days",
      price: 25,
      icon: faShippingFast,
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      description: "Next business day",
      price: 45,
      icon: faBolt,
    },
  ];

  const handleInputChange = (section, field, value) => {
    if (section === "billing") {
      setBillingInfo((prev) => ({ ...prev, [field]: value }));
    } else if (section === "shipping") {
      setShippingInfo((prev) => ({ ...prev, [field]: value }));
    } else if (section === "card") {
      setCardInfo((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          billingInfo.firstName &&
          billingInfo.lastName &&
          billingInfo.email &&
          billingInfo.address &&
          billingInfo.city &&
          billingInfo.state &&
          billingInfo.zipCode
        );
      case 2:
        if (!shippingInfo.sameAsBilling) {
          return (
            shippingInfo.firstName &&
            shippingInfo.lastName &&
            shippingInfo.address &&
            shippingInfo.city &&
            shippingInfo.state &&
            shippingInfo.zipCode
          );
        }
        return true;
      case 3:
        if (paymentMethod === "card") {
          return (
            cardInfo.cardNumber &&
            cardInfo.expiryDate &&
            cardInfo.cvv &&
            cardInfo.cardholderName
          );
        }
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Redirect to success page (in real app)
    alert("Order placed successfully!");
    setIsProcessing(false);
  };

  const formatCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ") || value
    );
  };

  const steps = [
    { id: 1, title: "Billing Information", completed: currentStep > 1 },
    { id: 2, title: "Shipping & Delivery", completed: currentStep > 2 },
    { id: 3, title: "Payment Method", completed: currentStep > 3 },
    { id: 4, title: "Review & Place Order", completed: false },
  ];

  return (
    <div className="pt-16 bg-gray-900 min-h-screen">
      {/* Header */}
      <section className="section bg-gradient-to-br from-blue-900/30 to-purple-900/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gradient">
              Secure Checkout
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Complete your purchase with confidence
            </p>
            <div className="flex items-center justify-center text-green-400">
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              <span>SSL Encrypted & Secure</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  index < steps.length - 1 ? "flex-1" : ""
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step.completed
                        ? "bg-green-500 text-white"
                        : step.id === currentStep
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {step.completed ? (
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-xs"
                      />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      step.id === currentStep
                        ? "text-blue-400"
                        : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-4 ${
                      step.completed ? "bg-green-500" : "bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="card p-6"
            >
              {/* Step 1: Billing Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-bold mb-6">
                    Billing Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">First Name *</label>
                      <input
                        type="text"
                        value={billingInfo.firstName}
                        onChange={(e) =>
                          handleInputChange(
                            "billing",
                            "firstName",
                            e.target.value
                          )
                        }
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Last Name *</label>
                      <input
                        type="text"
                        value={billingInfo.lastName}
                        onChange={(e) =>
                          handleInputChange(
                            "billing",
                            "lastName",
                            e.target.value
                          )
                        }
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) =>
                          handleInputChange("billing", "email", e.target.value)
                        }
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        value={billingInfo.phone}
                        onChange={(e) =>
                          handleInputChange("billing", "phone", e.target.value)
                        }
                        className="form-input"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="form-label">Street Address *</label>
                      <input
                        type="text"
                        value={billingInfo.address}
                        onChange={(e) =>
                          handleInputChange(
                            "billing",
                            "address",
                            e.target.value
                          )
                        }
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="form-label">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        value={billingInfo.apartment}
                        onChange={(e) =>
                          handleInputChange(
                            "billing",
                            "apartment",
                            e.target.value
                          )
                        }
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        value={billingInfo.city}
                        onChange={(e) =>
                          handleInputChange("billing", "city", e.target.value)
                        }
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">State *</label>
                      <select
                        value={billingInfo.state}
                        onChange={(e) =>
                          handleInputChange("billing", "state", e.target.value)
                        }
                        className="form-select"
                        required
                      >
                        <option value="">Select State</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        <option value="FL">Florida</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">ZIP Code *</label>
                      <input
                        type="text"
                        value={billingInfo.zipCode}
                        onChange={(e) =>
                          handleInputChange(
                            "billing",
                            "zipCode",
                            e.target.value
                          )
                        }
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Country *</label>
                      <select
                        value={billingInfo.country}
                        onChange={(e) =>
                          handleInputChange(
                            "billing",
                            "country",
                            e.target.value
                          )
                        }
                        className="form-select"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Information */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-bold mb-6">
                    Shipping & Delivery
                  </h2>

                  {/* Same as billing checkbox */}
                  <div className="mb-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={shippingInfo.sameAsBilling}
                        onChange={(e) =>
                          handleInputChange(
                            "shipping",
                            "sameAsBilling",
                            e.target.checked
                          )
                        }
                        className="mr-3"
                      />
                      <span>Ship to the same address as billing</span>
                    </label>
                  </div>

                  {/* Shipping address form */}
                  {!shippingInfo.sameAsBilling && (
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="form-label">First Name *</label>
                        <input
                          type="text"
                          value={shippingInfo.firstName}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "firstName",
                              e.target.value
                            )
                          }
                          className="form-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label">Last Name *</label>
                        <input
                          type="text"
                          value={shippingInfo.lastName}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "lastName",
                              e.target.value
                            )
                          }
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="form-label">Street Address *</label>
                        <input
                          type="text"
                          value={shippingInfo.address}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "address",
                              e.target.value
                            )
                          }
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="form-label">
                          Apartment, suite, etc. (optional)
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.apartment}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "apartment",
                              e.target.value
                            )
                          }
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">City *</label>
                        <input
                          type="text"
                          value={shippingInfo.city}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "city",
                              e.target.value
                            )
                          }
                          className="form-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label">State *</label>
                        <select
                          value={shippingInfo.state}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "state",
                              e.target.value
                            )
                          }
                          className="form-select"
                          required
                        >
                          <option value="">Select State</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                          <option value="FL">Florida</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">ZIP Code *</label>
                        <input
                          type="text"
                          value={shippingInfo.zipCode}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "zipCode",
                              e.target.value
                            )
                          }
                          className="form-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label">Country *</label>
                        <select
                          value={shippingInfo.country}
                          onChange={(e) =>
                            handleInputChange(
                              "shipping",
                              "country",
                              e.target.value
                            )
                          }
                          className="form-select"
                          required
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Shipping Options */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Shipping Method
                    </h3>
                    <div className="space-y-3">
                      {shippingOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            shippingMethod === option.id
                              ? "border-blue-400 bg-blue-400/10"
                              : "border-gray-600 hover:border-gray-500"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={shippingMethod === option.id}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="mr-4"
                          />
                          <FontAwesomeIcon
                            icon={option.icon}
                            className="text-blue-400 mr-3"
                          />
                          <div className="flex-1">
                            <div className="font-semibold">{option.name}</div>
                            <div className="text-sm text-gray-400">
                              {option.description}
                            </div>
                          </div>
                          <div className="font-semibold">
                            {option.price === 0 ? "FREE" : `$${option.price}`}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Method */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Payment Method</h2>

                  {/* Payment Method Selection */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <label
                      className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        paymentMethod === "card"
                          ? "border-blue-400 bg-blue-400/10"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        className="text-blue-400 mr-3"
                      />
                      <span>Credit/Debit Card</span>
                    </label>

                    <label
                      className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        paymentMethod === "paypal"
                          ? "border-blue-400 bg-blue-400/10"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <FontAwesomeIcon
                        icon={faPaypal}
                        className="text-blue-600 mr-3"
                      />
                      <span>PayPal</span>
                    </label>
                  </div>

                  {/* Card Details Form */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="form-label">Cardholder Name *</label>
                        <input
                          type="text"
                          value={cardInfo.cardholderName}
                          onChange={(e) =>
                            handleInputChange(
                              "card",
                              "cardholderName",
                              e.target.value
                            )
                          }
                          className="form-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label">Card Number *</label>
                        <input
                          type="text"
                          value={cardInfo.cardNumber}
                          onChange={(e) => {
                            const formatted = formatCardNumber(
                              e.target.value.replace(/\s/g, "")
                            );
                            if (formatted.replace(/\s/g, "").length <= 16) {
                              handleInputChange(
                                "card",
                                "cardNumber",
                                formatted
                              );
                            }
                          }}
                          placeholder="1234 5678 9012 3456"
                          className="form-input"
                          maxLength="19"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="form-label">Expiry Date *</label>
                          <input
                            type="text"
                            value={cardInfo.expiryDate}
                            onChange={(e) => {
                              let value = e.target.value.replace(/\D/g, "");
                              if (value.length >= 2) {
                                value =
                                  value.slice(0, 2) + "/" + value.slice(2, 4);
                              }
                              handleInputChange("card", "expiryDate", value);
                            }}
                            placeholder="MM/YY"
                            className="form-input"
                            maxLength="5"
                            required
                          />
                        </div>
                        <div>
                          <label className="form-label">CVV *</label>
                          <input
                            type="text"
                            value={cardInfo.cvv}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              if (value.length <= 4) {
                                handleInputChange("card", "cvv", value);
                              }
                            }}
                            placeholder="123"
                            className="form-input"
                            maxLength="4"
                            required
                          />
                        </div>
                      </div>

                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center text-green-400">
                          <FontAwesomeIcon
                            icon={faShieldAlt}
                            className="mr-2"
                          />
                          <span className="text-sm">
                            Your payment information is encrypted and secure. We
                            never store your card details.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal */}
                  {paymentMethod === "paypal" && (
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 text-center">
                      <FontAwesomeIcon
                        icon={faPaypal}
                        className="text-4xl text-blue-600 mb-4"
                      />
                      <p className="text-gray-300">
                        You will be redirected to PayPal to complete your
                        payment securely.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Review & Place Order */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Review Your Order</h2>

                  {/* Order Items */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Items</h3>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="text-sm text-gray-400">
                              {item.color && <span>Color: {item.color}</span>}
                              {item.size && (
                                <span className="ml-4">Size: {item.size}</span>
                              )}
                              <span className="ml-4">Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <div className="font-semibold">${item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Billing Address
                      </h3>
                      <div className="bg-gray-800 p-4 rounded-lg text-sm">
                        <div>
                          {billingInfo.firstName} {billingInfo.lastName}
                        </div>
                        <div>{billingInfo.address}</div>
                        {billingInfo.apartment && (
                          <div>{billingInfo.apartment}</div>
                        )}
                        <div>
                          {billingInfo.city}, {billingInfo.state}{" "}
                          {billingInfo.zipCode}
                        </div>
                        <div>{billingInfo.country}</div>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 text-sm mt-2">
                        <FontAwesomeIcon icon={faEdit} className="mr-1" />
                        Edit
                      </button>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Shipping Address
                      </h3>
                      <div className="bg-gray-800 p-4 rounded-lg text-sm">
                        {shippingInfo.sameAsBilling ? (
                          <div>Same as billing address</div>
                        ) : (
                          <>
                            <div>
                              {shippingInfo.firstName} {shippingInfo.lastName}
                            </div>
                            <div>{shippingInfo.address}</div>
                            {shippingInfo.apartment && (
                              <div>{shippingInfo.apartment}</div>
                            )}
                            <div>
                              {shippingInfo.city}, {shippingInfo.state}{" "}
                              {shippingInfo.zipCode}
                            </div>
                            <div>{shippingInfo.country}</div>
                          </>
                        )}
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 text-sm mt-2">
                        <FontAwesomeIcon icon={faEdit} className="mr-1" />
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* Payment & Shipping */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Payment Method
                      </h3>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={
                              paymentMethod === "card" ? faCreditCard : faPaypal
                            }
                            className="mr-3"
                          />
                          <span>
                            {paymentMethod === "card"
                              ? `Card ending in ${cardInfo.cardNumber.slice(
                                  -4
                                )}`
                              : "PayPal"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Shipping Method
                      </h3>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center">
                          <FontAwesomeIcon
                            icon={
                              shippingOptions.find(
                                (o) => o.id === shippingMethod
                              )?.icon
                            }
                            className="mr-3"
                          />
                          <span>
                            {
                              shippingOptions.find(
                                (o) => o.id === shippingMethod
                              )?.name
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
                {currentStep > 1 && (
                  <button
                    onClick={handlePreviousStep}
                    className="btn btn-outline"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Previous
                  </button>
                )}

                <div className="ml-auto">
                  {currentStep < 4 ? (
                    <button
                      onClick={handleNextStep}
                      disabled={!validateStep(currentStep)}
                      className="btn btn-primary"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="btn btn-primary"
                    >
                      {isProcessing ? (
                        <div className="flex items-center">
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faLock} className="mr-2" />
                          Place Order - ${total.toFixed(2)}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card p-6 mb-6"
              >
                <h3 className="text-lg font-bold mb-4">Order Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-400" : ""}>
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-700 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-400">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-400">
                  <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                  30-day money-back guarantee
                </div>
              </motion.div>

              {/* Trust Signals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-3"
              >
                <div className="flex items-center text-sm text-gray-400">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-green-400 mr-3"
                  />
                  <span>SSL encrypted checkout</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <FontAwesomeIcon
                    icon={faShippingFast}
                    className="text-blue-400 mr-3"
                  />
                  <span>Free shipping on orders $100+</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-purple-400 mr-3"
                  />
                  <span>2-year warranty included</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
