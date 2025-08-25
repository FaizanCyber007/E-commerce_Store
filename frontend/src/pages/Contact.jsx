import React, { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
  faHeadset,
  faPaperPlane,
  faCheckCircle,
  faQuestionCircle,
  faShieldAlt,
  faUsers,
  faRocket,
  faGlobe,
  faStar,
  faHeart,
  faCrown,
  faComments,
  faLightbulb,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "general",
        message: "",
      });
    }, 3000);
  };

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

  const contactMethods = [
    {
      icon: faPhone,
      title: "Call Us",
      description: "Speak directly with our experts",
      details: "+1 (555) 123-4567",
      color: "from-blue-500 to-cyan-500",
      action: "Call Now"
    },
    {
      icon: faEnvelope,
      title: "Email Support",
      description: "Get detailed assistance via email",
      details: "support@eliteshop.com",
      color: "from-purple-500 to-pink-500",
      action: "Send Email"
    },
    {
      icon: faComments,
      title: "Live Chat",
      description: "Instant help from our support team",
      details: "Available 24/7",
      color: "from-green-500 to-emerald-500",
      action: "Start Chat"
    },
    {
      icon: faWhatsapp,
      title: "WhatsApp",
      description: "Quick support on your mobile",
      details: "+1 (555) 987-6543",
      color: "from-green-600 to-green-400",
      action: "Message Us"
    },
  ];

  const officeLocations = [
    {
      city: "New York",
      address: "123 Fifth Avenue, NY 10001",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Fri: 9AM-6PM",
      icon: faMapMarkerAlt,
      gradient: "from-blue-500 to-purple-500"
    },
    {
      city: "Los Angeles",
      address: "456 Sunset Blvd, LA 90028",
      phone: "+1 (555) 987-6543",
      hours: "Mon-Fri: 8AM-5PM",
      icon: faMapMarkerAlt,
      gradient: "from-orange-500 to-red-500"
    },
    {
      city: "London",
      address: "789 Oxford Street, London W1",
      phone: "+44 20 7123 4567",
      hours: "Mon-Fri: 9AM-5PM",
      icon: faMapMarkerAlt,
      gradient: "from-green-500 to-blue-500"
    },
  ];

  const supportCategories = [
    { value: "general", label: "General Inquiry", icon: faQuestionCircle },
    { value: "orders", label: "Orders & Shipping", icon: faPaperPlane },
    { value: "returns", label: "Returns & Refunds", icon: faShieldAlt },
    { value: "technical", label: "Technical Support", icon: faLightbulb },
    { value: "partnership", label: "Business Partnership", icon: faHandshake },
  ];

  const socialPlatforms = [
    { icon: faFacebook, name: "Facebook", color: "hover:text-blue-600", followers: "2.1M" },
    { icon: faTwitter, name: "Twitter", color: "hover:text-blue-400", followers: "1.8M" },
    { icon: faInstagram, name: "Instagram", color: "hover:text-pink-600", followers: "3.2M" },
    { icon: faLinkedin, name: "LinkedIn", color: "hover:text-blue-700", followers: "950K" },
    { icon: faTelegram, name: "Telegram", color: "hover:text-blue-500", followers: "800K" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 400 + 50}px`,
              height: `${Math.random() * 400 + 50}px`,
            }}
            animate={{
              x: [0, Math.random() * 300 - 150],
              y: [0, Math.random() * 300 - 150],
              scale: [1, Math.random() * 0.8 + 0.6],
              opacity: [0.05, Math.random() * 0.2 + 0.05],
            }}
            transition={{
              duration: Math.random() * 30 + 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
                <FontAwesomeIcon icon={faHeadset} className="mr-2" />
                GET IN TOUCH
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold mb-8"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Let's
              </span>
              <br />
              <span className="text-white">Connect</span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Today
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              We're here to help with any questions, concerns, or feedback. Our dedicated support 
              team is ready to provide you with exceptional service and personalized assistance.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25">
                <FontAwesomeIcon icon={faPaperPlane} className="mr-3" />
                Send Message
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                Call Support
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </section>

      {/* Contact Methods */}
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
              Choose Your Preferred Way
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Multiple channels to reach us - pick what works best for you
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={scaleVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group cursor-pointer"
              >
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 group-hover:border-blue-400/50 overflow-hidden text-center h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${method.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <FontAwesomeIcon icon={method.icon} className="text-2xl text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {method.title}
                    </h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                      {method.description}
                    </p>
                    <p className="text-blue-400 font-bold mb-4">{method.details}</p>
                    <button className="px-6 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-white font-semibold text-sm rounded-lg transition-all duration-300 border border-blue-500/30">
                      {method.action}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Office Locations */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8"
              >
                Send Us a Message
              </motion.h2>
              
              <motion.div
                variants={itemVariants}
                className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/10 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16 relative z-10"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6 shadow-lg">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-3xl text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h3>
                    <p className="text-gray-300">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white font-semibold mb-2">Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-white font-semibold mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                      >
                        {supportCategories.map((category) => (
                          <option key={category.value} value={category.value} className="bg-gray-800 text-white">
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="6"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-3"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faPaperPlane} className="mr-3" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-8"
              >
                Our Offices
              </motion.h2>

              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className="group"
                  >
                    <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 group-hover:border-blue-400/50 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10 flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r ${office.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <FontAwesomeIcon icon={office.icon} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                            {office.city}
                          </h3>
                          <p className="text-gray-300 mb-2">{office.address}</p>
                          <p className="text-blue-400 font-semibold mb-1">{office.phone}</p>
                          <p className="text-sm text-gray-400">{office.hours}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <motion.div
                variants={itemVariants}
                className="mt-12"
              >
                <h3 className="text-2xl font-bold text-white mb-6">Follow Us</h3>
                <div className="flex flex-wrap gap-4">
                  {socialPlatforms.map((platform, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-blue-400/50 ${platform.color}`}
                    >
                      <FontAwesomeIcon 
                        icon={platform.icon} 
                        className="text-xl text-gray-300 group-hover:text-white transition-colors duration-300" 
                      />
                    </motion.a>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {socialPlatforms.map((platform, index) => (
                    <div key={index} className="text-center">
                      <p className="text-sm text-gray-400">{platform.name}</p>
                      <p className="text-blue-400 font-semibold text-sm">{platform.followers}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Features */}
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
              Why Choose Our Support
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Experience world-class customer service that goes above and beyond
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: faClock,
                title: "24/7 Availability",
                description: "Round-the-clock support whenever you need assistance",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: faRocket,
                title: "Fast Response",
                description: "Average response time under 2 hours during business days",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: faUsers,
                title: "Expert Team",
                description: "Knowledgeable professionals ready to solve any issue",
                color: "from-green-500 to-emerald-500"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleVariants}
                whileHover={{ scale: 1.05 }}
                className="group text-center"
              >
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/10 group-hover:border-blue-400/50 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <FontAwesomeIcon icon={feature.icon} className="text-2xl text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
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
                Ready to Get
              </span>
              <br />
              <span className="text-white">Started?</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Don't hesitate to reach out. Our team is standing by to provide you with the 
              exceptional support and service you deserve.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
              <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xl rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25">
                <FontAwesomeIcon icon={faHeadset} className="mr-3" />
                Start Conversation
              </button>
              <button className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-xl rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20">
                <FontAwesomeIcon icon={faPhone} className="mr-3" />
                Schedule Call
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
