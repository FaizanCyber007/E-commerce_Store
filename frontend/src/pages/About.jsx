import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faUsers,
  faGlobe,
  faTrophy,
  faShieldAlt,
  faHeart,
  faAward,
  faStar,
  faQuoteLeft,
  faCrown,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    {
      number: "2M+",
      label: "Happy Customers",
      icon: faUsers,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "50K+",
      label: "Premium Products",
      icon: faTrophy,
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "100+",
      label: "Global Reach",
      icon: faGlobe,
      color: "from-green-500 to-emerald-500",
    },
    {
      number: "10+",
      label: "Years Excellence",
      icon: faRocket,
      color: "from-orange-500 to-red-500",
    },
  ];

  const values = [
    {
      title: "Quality First",
      description:
        "We curate only the finest products from trusted brands and manufacturers worldwide, ensuring every item meets our rigorous standards.",
      icon: faAward,
      color: "from-blue-600 to-cyan-600",
    },
    {
      title: "Customer Focus",
      description:
        "Your satisfaction is our priority. We go above and beyond to exceed expectations with personalized service and support.",
      icon: faHeart,
      color: "from-red-600 to-pink-600",
    },
    {
      title: "Innovation",
      description:
        "We embrace cutting-edge technology to provide seamless shopping experiences that evolve with your needs.",
      icon: faRocket,
      color: "from-purple-600 to-indigo-600",
    },
    {
      title: "Trust & Security",
      description:
        "Your data and transactions are protected with industry-leading security measures and transparent practices.",
      icon: faShieldAlt,
      color: "from-green-600 to-emerald-600",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Designer",
      content:
        "EliteShop has transformed my shopping experience. The quality and service are simply unmatched!",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150",
    },
    {
      name: "Michael Chen",
      role: "Tech Executive",
      content:
        "From electronics to home goods, EliteShop consistently delivers premium products with exceptional service.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
    },
    {
      name: "Emma Wilson",
      role: "Interior Designer",
      content:
        "The attention to detail and customer care at EliteShop is remarkable. They truly understand luxury.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
    },
  ];

  const team = [
    {
      name: "Alexander Reed",
      role: "Founder & CEO",
      bio: "Visionary leader with 15+ years in e-commerce",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      name: "Victoria Smith",
      role: "Chief Marketing Officer",
      bio: "Brand strategist and customer experience expert",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=300",
      gradient: "from-pink-500 to-red-500",
    },
    {
      name: "David Kim",
      role: "Head of Technology",
      bio: "Innovation driver and digital transformation leader",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
      gradient: "from-green-500 to-blue-500",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, Math.random() * 0.5 + 0.8],
              opacity: [0.1, Math.random() * 0.3 + 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{ y, opacity }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-400 font-semibold text-sm tracking-wide border border-blue-500/30 backdrop-blur-sm">
                <FontAwesomeIcon icon={faCrown} className="mr-2" />
                ABOUT ELITESHOP
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold mb-8"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Crafting
              </span>
              <br />
              <span className="text-white">Extraordinary</span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Experiences
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              We're more than just an e-commerce platform. We're your trusted
              partner in discovering premium products that enhance your
              lifestyle and exceed your expectations.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25">
                <FontAwesomeIcon icon={faRocket} className="mr-3" />
                Our Story
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20">
                <FontAwesomeIcon icon={faUsers} className="mr-3" />
                Meet the Team
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="text-center group"
              >
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 group-hover:border-blue-400/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-4 shadow-lg`}
                    >
                      <FontAwesomeIcon
                        icon={stat.icon}
                        className="text-2xl text-white"
                      />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 font-semibold">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
            >
              Our Core Values
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              The principles that guide everything we do and drive us toward
              excellence
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, rotateX: 2 }}
                className="group"
              >
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 group-hover:border-blue-400/50 overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${value.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <FontAwesomeIcon
                        icon={value.icon}
                        className="text-2xl text-white"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Passionate innovators dedicated to creating exceptional
              experiences
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={scaleVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 group-hover:border-blue-400/50 overflow-hidden text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="relative inline-block mb-6">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${member.gradient} rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300`}
                      />
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="relative w-24 h-24 rounded-full object-cover border-4 border-white/20 group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-blue-400 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-300 text-sm">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
            >
              What Our Customers Say
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Real experiences from our valued customers
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 group-hover:border-blue-400/50 overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <FontAwesomeIcon
                      icon={faQuoteLeft}
                      className="text-3xl text-blue-400 mb-4 opacity-50"
                    />
                    <p className="text-gray-300 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-400/50 mr-4"
                      />
                      <div>
                        <div className="text-white font-semibold">
                          {testimonial.name}
                        </div>
                        <div className="text-blue-400 text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className="text-yellow-400 text-sm mr-1"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-8"
            >
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Experience
              </span>
              <br />
              <span className="text-white">Excellence?</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Join millions of satisfied customers and discover why EliteShop is
              the premier destination for premium products and exceptional
              service.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                to="/shop"
                className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xl rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
              >
                <FontAwesomeIcon icon={faRocket} className="mr-3" />
                Start Shopping
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
