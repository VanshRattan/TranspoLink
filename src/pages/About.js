import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  Globe, 
  CheckCircle,
  ArrowRight,
  Play,
  Shield,
  Heart,
  Coffee
} from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Rapid Growth",
      description: "From 0 to 10,000+ users in just 2 years, disrupting the traditional transport industry."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Instant matching between businesses and drivers, reducing wait times by 80%."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Focus",
      description: "AI-powered route optimization ensuring maximum efficiency and cost savings."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Scalable Platform",
      description: "Built to handle millions of transactions with enterprise-grade reliability."
    }
  ];

  const milestones = [
    {
      phase: "Phase 1",
      title: "MVP Launch",
      description: "Built and launched our minimum viable product in just 3 months",
      achievement: "100 early adopters"
    },
    {
      phase: "Phase 2",
      title: "Market Validation",
      description: "Proved product-market fit with growing user base and revenue",
      achievement: "$50K monthly revenue"
    },
    {
      phase: "Phase 3",
      title: "Scale & Expand",
      description: "Expanded to 25+ cities and onboarded enterprise clients",
      achievement: "10,000+ active users"
    },
    {
      phase: "Phase 4",
      title: "Industry Leader",
      description: "Became the go-to platform for goods transportation",
      achievement: "Market leader position"
    }
  ];

  const team = [
    {
      name: "Alex Chen",
      position: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Ex-Google engineer turned entrepreneur. Built 3 successful startups before TranspoLink.",
      funFact: "Loves coding at 3 AM with coffee ☕"
    },
    {
      name: "Maya Patel",
      position: "CTO & Co-founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Former Facebook tech lead. Expert in scalable systems and AI/ML.",
      funFact: "Can debug while sleeping 😴"
    },
    {
      name: "Jake Rodriguez",
      position: "Head of Growth",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Growth hacker extraordinaire. Grew previous startup to $10M ARR.",
      funFact: "Thinks in growth metrics 📈"
    },
    {
      name: "Sarah Kim",
      position: "Head of Operations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Operations ninja. Optimized processes that saved $2M annually.",
      funFact: "Makes spreadsheets look sexy 📊"
    }
  ];

  const culture = [
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Coffee-Fueled Innovation",
      description: "We believe the best ideas come at 2 AM with a cup of coffee"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Customer Obsession",
      description: "Every decision starts with 'What's best for our users?'"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Move Fast, Break Things",
      description: "Speed over perfection. We learn from failures and iterate quickly"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team First",
      description: "Great products are built by great teams who support each other"
    }
  ];

  const stats = [
    {
      number: "2",
      label: "Years to Unicorn",
      icon: <Rocket className="w-6 h-6" />
    },
    {
      number: "500%",
      label: "YoY Growth",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      number: "25+",
      label: "Cities Covered",
      icon: <Globe className="w-6 h-6" />
    },
    {
      number: "99.9%",
      label: "Uptime",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
            >
              <Rocket className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">🚀 We're Hiring!</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              We're Building the
              <span className="block text-primary-orange">Future of Transport</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
              A scrappy startup that's disrupting a $1.5 trillion industry. 
              We move fast, think big, and never settle for the status quo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4 flex items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Our Story
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-primary-green transition-colors duration-200 text-lg"
              >
                Join the Team
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Startup Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-green mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Makes Us
              <span className="block text-primary-orange">Different?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another transport company. We're a tech company that happens to move things.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-green to-primary-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Startup
              <span className="block text-primary-orange">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a garage idea to a company that's changing how goods move across the country.
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="card bg-gradient-to-br from-gray-50 to-white border-l-4 border-primary-orange">
                    <div className="text-sm font-bold text-primary-orange mb-2">
                      {milestone.phase}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {milestone.description}
                    </p>
                    <div className="inline-flex items-center text-primary-green font-semibold">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {milestone.achievement}
                    </div>
                  </div>
                </div>
                <div className="w-4 h-4 bg-primary-orange rounded-full border-4 border-white shadow-lg"></div>
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet the
              <span className="block text-primary-orange">Dream Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The brilliant minds and passionate souls who turned a crazy idea into reality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center group hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary-green ring-opacity-20 group-hover:ring-primary-orange transition-all duration-300"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-green font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  {member.bio}
                </p>
                <div className="text-xs text-primary-orange font-medium bg-orange-50 px-3 py-1 rounded-full">
                  {member.funFact}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Startup
              <span className="block text-primary-orange">Culture</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just colleagues, we're a family of innovators, dreamers, and doers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {culture.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-orange transition-colors duration-300">
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Join the
              <span className="block text-primary-orange">Revolution?</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              We're always looking for brilliant minds who want to change the world. 
              No experience required, just passion and determination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4 flex items-center justify-center"
              >
                View Open Positions
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-primary-green transition-colors duration-200 text-lg"
              >
                Send Us a Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
