import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const team = [
    {
      name: "Alex Chen",
      position: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Ex-Google engineer turned entrepreneur. Built 3 successful startups before TranspoLink.",
    },
    {
      name: "Maya Patel",
      position: "CTO & Co-founder",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Former Facebook tech lead. Expert in scalable systems and AI/ML.",
    },
    {
      name: "Jake Rodriguez",
      position: "Head of Growth",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Growth hacker extraordinaire. Grew previous startup to $10M ARR.",
    },
    {
      name: "Sarah Kim",
      position: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Operations ninja. Optimized processes that saved $2M annually.",
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet the <span className="text-primary-orange">Dream Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate minds shaping the future of transport.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary-green ring-opacity-20 hover:ring-primary-orange transition-all duration-300"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-green font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
