import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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
  faCheck,
  faTimes,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { registerUser } from "../store/userSlice.js";
import toast from "react-hot-toast";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const password = watch("password", "");

  const passwordRequirements = [
    { test: password.length >= 8, label: "At least 8 characters" },
    { test: /[A-Z]/.test(password), label: "One uppercase letter" },
    { test: /[a-z]/.test(password), label: "One lowercase letter" },
    { test: /\d/.test(password), label: "One number" },
    { test: /[!@#$%^&*]/.test(password), label: "One special character" },
  ];

  const onSubmit = async (data) => {
    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    try {
      await dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        })
      ).unwrap();
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`${provider} registration coming soon!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center"
          >
            <FontAwesomeIcon
              icon={faUserPlus}
              className="text-2xl text-white"
            />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join us and start shopping today</p>
        </div>

        {/* Social Registration */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => handleSocialLogin("Google")}
            className="flex items-center justify-center space-x-2 p-3 bg-red-600/20 border border-red-500/30 rounded-xl text-red-400 hover:bg-red-600/30 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faGoogle} />
            <span>Google</span>
          </button>
          <button
            onClick={() => handleSocialLogin("Facebook")}
            className="flex items-center justify-center space-x-2 p-3 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400 hover:bg-blue-600/30 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faFacebook} />
            <span>Facebook</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-dark-900 text-gray-400">
              Or register with email
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className={`w-full pl-10 pr-4 py-3 bg-dark-700 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors.name ? "border-red-500" : "border-gray-600"
                  }`}
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-gray-400"
                  />
                </div>
                <input
                  type="email"
                  className={`w-full pl-10 pr-4 py-3 bg-dark-700 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  }`}
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Enter your phone number"
                  {...register("phone", {
                    pattern: {
                      value: /^[+]?[\d\s\-\(\)]+$/,
                      message: "Invalid phone number",
                    },
                  })}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-12 py-3 bg-dark-700 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors.password ? "border-red-500" : "border-gray-600"
                  }`}
                  placeholder="Create a strong password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    validate: {
                      hasUpperCase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Password must contain an uppercase letter",
                      hasLowerCase: (value) =>
                        /[a-z]/.test(value) ||
                        "Password must contain a lowercase letter",
                      hasNumber: (value) =>
                        /\d/.test(value) || "Password must contain a number",
                      hasSpecialChar: (value) =>
                        /[!@#$%^&*]/.test(value) ||
                        "Password must contain a special character",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}

              {/* Password Requirements */}
              {password && (
                <div className="mt-3 space-y-1">
                  <p className="text-sm text-gray-400 mb-2">
                    Password requirements:
                  </p>
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <FontAwesomeIcon
                        icon={req.test ? faCheck : faTimes}
                        className={`mr-2 ${
                          req.test ? "text-green-400" : "text-red-400"
                        }`}
                      />
                      <span
                        className={
                          req.test ? "text-green-400" : "text-gray-400"
                        }
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-12 py-3 bg-dark-700 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-600"
                  }`}
                  placeholder="Confirm your password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  />
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <input
                id="accept-terms"
                name="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-600 rounded bg-dark-700 mt-1"
              />
              <label
                htmlFor="accept-terms"
                className="ml-3 block text-sm text-gray-300"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-primary-400 hover:text-primary-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-primary-400 hover:text-primary-300"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <FontAwesomeIcon icon={faShieldAlt} />
            <span>Your data is protected with 256-bit SSL encryption</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
