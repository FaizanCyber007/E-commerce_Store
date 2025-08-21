import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faArrowRight,
  faPlay,
  faStar,
  faUsers,
  faShieldAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Premium Electronics",
      subtitle: "Latest Tech, Unbeatable Prices",
      description:
        "Discover cutting-edge electronics with up to 50% off on selected items. Free shipping on orders over $100.",
      buttonText: "Shop Electronics",
      buttonLink: "/shop?category=electronics",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
      gradient: "from-primary-500/20 to-secondary-500/20",
    },
    {
      title: "Fashion Forward",
      subtitle: "Style That Speaks",
      description:
        "Express yourself with our curated collection of premium fashion and accessories for every occasion.",
      buttonText: "Explore Fashion",
      buttonLink: "/shop?category=clothing",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
      gradient: "from-accent-400/20 to-soft-400/20",
    },
    {
      title: "Home & Lifestyle",
      subtitle: "Transform Your Space",
      description:
        "Create your perfect sanctuary with our premium home décor and lifestyle products.",
      buttonText: "Shop Home",
      buttonLink: "/shop?category=home",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
      gradient: "from-primary-500/20 to-accent-400/20",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="container-responsive py-12">
      {/* Main Hero Carousel */}
      <div className="relative card overflow-hidden mb-16">
        <div className="relative h-[500px] lg:h-[600px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <div className="relative h-full">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} backdrop-blur-[1px]`}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-dark-900/60 to-transparent" />

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="container-responsive">
                    <div className="max-w-2xl animate-slide-up">
                      <div className="mb-4">
                        <span className="badge-primary text-sm font-semibold">
                          {slide.subtitle}
                        </span>
                      </div>

                      <h1 className="text-4xl lg:text-6xl font-bold font-poppins text-white mb-6 text-shadow">
                        {slide.title}
                      </h1>

                      <p className="text-lg lg:text-xl text-gray-200 mb-8 leading-relaxed">
                        {slide.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          to={slide.buttonLink}
                          className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
                        >
                          <FontAwesomeIcon icon={faShoppingBag} />
                          <span>{slide.buttonText}</span>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </Link>

                        <button className="btn-ghost inline-flex items-center space-x-2 text-lg px-8 py-4">
                          <FontAwesomeIcon icon={faPlay} />
                          <span>Watch Demo</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary-400 w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {[
          {
            icon: faUsers,
            number: "50K+",
            label: "Happy Customers",
            color: "text-primary-400",
          },
          {
            icon: faShoppingBag,
            number: "10K+",
            label: "Products",
            color: "text-secondary-400",
          },
          {
            icon: faStar,
            number: "4.9",
            label: "Average Rating",
            color: "text-accent-400",
          },
          {
            icon: faShieldAlt,
            number: "100%",
            label: "Secure Shopping",
            color: "text-soft-400",
          },
        ].map(({ icon, number, label, color }) => (
          <div
            key={label}
            className="card text-center p-6 hover:scale-105 transition-transform duration-300"
          >
            <FontAwesomeIcon icon={icon} className={`text-3xl ${color} mb-4`} />
            <div className="text-2xl font-bold text-white mb-2">{number}</div>
            <div className="text-gray-400 text-sm">{label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="card p-8 text-center hover:scale-105 transition-all duration-300 group">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <FontAwesomeIcon
              icon={faShoppingBag}
              className="text-dark-900 text-xl"
            />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-gray-200">
            Premium Quality
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Curated selection of high-quality products from trusted brands
            worldwide.
          </p>
        </div>

        <div className="card p-8 text-center hover:scale-105 transition-all duration-300 group">
          <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-soft-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <FontAwesomeIcon
              icon={faShieldAlt}
              className="text-dark-900 text-xl"
            />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-gray-200">
            Secure & Safe
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Advanced security measures to protect your data and ensure safe
            transactions.
          </p>
        </div>

        <div className="card p-8 text-center hover:scale-105 transition-all duration-300 group">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
            <FontAwesomeIcon icon={faStar} className="text-dark-900 text-xl" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-gray-200">
            5-Star Service
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Exceptional customer service and support available 24/7 for your
            needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
