import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-inter">
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-blue-500/20 animate-pulse">
            404
          </div>
        </div>

        {/* Glass morphism card */}
        <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
          <div className="floating mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.806-6.212-2.153-.552-.448-.86-1.09-.86-1.847A7.962 7.962 0 016 9c0-2.34.806-4.5 2.153-6.212C8.6 2.236 9.242 1.928 9.99 1.928 10.738 1.928 11.38 2.236 11.828 2.788A7.962 7.962 0 0114 9"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4 font-poppins">
            Oops! Page Not Found
          </h2>

          <p className="text-gray-300 mb-8 leading-relaxed">
            The page you're looking for seems to have wandered off into the
            digital void. Don't worry, it happens to the best of us!
          </p>

          <div className="space-y-4">
            <Link to="/" className="btn btn-primary w-full hover-lift">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Home
            </Link>

            <Link to="/shop" className="btn btn-glass w-full hover-glow">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z"
                />
              </svg>
              Browse Shop
            </Link>
          </div>

          {/* Fun animation elements */}
          <div className="mt-8 flex justify-center space-x-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-blue-500/10 rounded-full blur-lg"></div>
      </div>
    </div>
  );
};

export default NotFound;
