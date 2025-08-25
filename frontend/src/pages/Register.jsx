import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faUserPlus,
  faShieldAlt,
  faSpinner,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { registerUser } from "../store/userSlice.js";
import toast from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user || {});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+$/i.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const userData = {
        name: formData.name.trim(),
        email: formData.email,
        password: formData.password,
        ...(formData.phone && { phone: formData.phone }),
      };

      await dispatch(registerUser(userData)).unwrap();
      toast.success("Account created successfully! Welcome aboard!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`${provider} registration coming soon!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-6"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary to-purple-500 rounded-full mb-4 shadow-lg"
          >
            <FontAwesomeIcon icon={faUserPlus} className="text-xl text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-text-primary mb-2">
            Create Account
          </h2>
          <p className="text-text-secondary">
            Join us and start your shopping journey
          </p>
        </div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-glass backdrop-blur-sm border border-border rounded-2xl p-6 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faUser} className="text-text-muted" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-background/50 border ${
                    errors.name ? "border-red-500" : "border-border"
                  } rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-text-muted"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-background/50 border ${
                    errors.email ? "border-red-500" : "border-border"
                  } rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Phone Field (Optional) */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faPhone} className="text-text-muted" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2.5 bg-background/50 border ${
                    errors.phone ? "border-red-500" : "border-border"
                  } rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-text-muted" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-2.5 bg-background/50 border ${
                    errors.password ? "border-red-500" : "border-border"
                  } rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary transition-colors"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-text-muted" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-2.5 bg-background/50 border ${
                    errors.confirmPassword ? "border-red-500" : "border-border"
                  } rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-muted hover:text-text-primary transition-colors"
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors((prev) => ({ ...prev, terms: "" }));
                    }
                  }}
                  className="w-4 h-4 text-primary bg-background/50 border-border rounded mt-1 focus:ring-primary"
                />
                <span className="ml-3 text-sm text-text-secondary leading-relaxed">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-primary hover:text-accent transition-colors"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-primary hover:text-accent transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  *
                </span>
              </label>
              {errors.terms && (
                <p className="text-sm text-red-400 ml-7">{errors.terms}</p>
              )}

              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreeMarketing}
                  onChange={(e) => setAgreeMarketing(e.target.checked)}
                  className="w-4 h-4 text-primary bg-background/50 border-border rounded mt-1 focus:ring-primary"
                />
                <span className="ml-3 text-sm text-text-secondary leading-relaxed">
                  I agree to receive marketing emails and promotional offers
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-purple-500 text-white py-2.5 px-4 rounded-xl font-semibold transition-all transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 space-y-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-glass text-text-muted">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Social Registration Buttons */}
          <div className="mt-4 space-y-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("Google")}
              className="w-full flex items-center justify-center px-4 py-2.5 bg-background/30 border border-border rounded-xl text-text-primary hover:bg-background/50 transition-all transform hover:scale-105"
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-3 text-red-500" />
              Sign up with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("Facebook")}
              className="w-full flex items-center justify-center px-4 py-2.5 bg-background/30 border border-border rounded-xl text-text-primary hover:bg-background/50 transition-all transform hover:scale-105"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="mr-3 text-blue-500"
              />
              Sign up with Facebook
            </button>
          </div>
        </motion.div>

        {/* Sign In Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-text-secondary">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:text-accent font-semibold transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center text-xs text-text-muted"
        >
          <FontAwesomeIcon icon={faShieldAlt} className="mr-2 text-green-400" />
          Your data is secure and encrypted
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
