import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineCalendar, AiOutlineTeam, AiOutlineLineChart } from 'react-icons/ai';
import { FaSlack, FaTrello, FaGithub } from 'react-icons/fa';
import Navbar from '../components/ui/Navbar';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-br from-purple-600 via-teal-500 to-white flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          className="text-white space-y-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold">Simplify Project Management with VizSync</h1>
          <p className="text-xl">
            Collaborate, track, and visualize your projects with unprecedented clarity.
          </p>
          <div className="flex space-x-4 mt-6">
            <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg">
              Get Started
            </button>
            <button className="bg-white text-teal-600 hover:bg-gray-200 py-2 px-6 rounded-lg">
              Learn More
            </button>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-6"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
            <AiOutlineCalendar className="text-teal-600 text-4xl" />
            <p className="text-gray-700">Organized Scheduling</p>
          </div>
          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
            <AiOutlineTeam className="text-purple-600 text-4xl" />
            <p className="text-gray-700">Team Collaboration</p>
          </div>
          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
            <AiOutlineLineChart className="text-indigo-600 text-4xl" />
            <p className="text-gray-700">Data-Driven Insights</p>
          </div>
          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
            <FaSlack className="text-orange-500 text-4xl" />
            <p className="text-gray-700">Slack Integration</p>
          </div>
          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
            <FaTrello className="text-blue-500 text-4xl" />
            <p className="text-gray-700">Trello Boards</p>
          </div>
          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
            <FaGithub className="text-black text-4xl" />
            <p className="text-gray-700">GitHub Versioning</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const EnhancedFeaturesSection = () => {
  const features = [
    {
      icon: <AiOutlineCalendar className="w-12 h-12 text-purple-600" />,
      title: 'Advanced Task Management',
      description: 'Intelligent task tracking with AI-powered prioritization and resource allocation.',
      details: [
        'Automated task dependencies',
        'Real-time progress tracking',
        'Intelligent deadline predictions'
      ]
    },
    {
      icon: <AiOutlineLineChart className="w-12 h-12 text-teal-500" />,
      title: 'Comprehensive Analytics',
      description: 'Deep insights into project performance and team productivity.',
      details: [
        'Customizable performance dashboards',
        'Predictive project health metrics',
        'Detailed resource utilization reports'
      ]
    },
    {
      icon: <AiOutlineTeam className="w-12 h-12 text-blue-500" />,
      title: 'Collaborative Ecosystem',
      description: 'Seamless communication and collaboration tools integrated directly into your workflow.',
      details: [
        'Real-time team messaging',
        'Contextual file sharing',
        'Role-based access controls'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Revolutionize Your Project Management with VizSync</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all group"
              whileHover={{ scale: 1.05, translateY: -10 }}
            >
              <div className="mb-6 flex items-center">
                {feature.icon}
                <h3 className="text-2xl font-semibold ml-4">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <ul className="space-y-2 text-sm text-gray-500">
                {feature.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-2 text-green-500">✔</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AdvancedTimelineSection = () => {
  const projectStages = [
    { 
      title: 'Initiation', 
      progress: 100, 
      color: 'bg-green-500',
      description: 'Project scoping and initial planning completed'
    },
    { 
      title: 'Design', 
      progress: 75, 
      color: 'bg-blue-500',
      description: 'Architectural design and wireframing in progress'
    },
    { 
      title: 'Development', 
      progress: 50, 
      color: 'bg-yellow-500',
      description: 'Core development and feature implementation'
    },
    { 
      title: 'Testing', 
      progress: 25, 
      color: 'bg-orange-500',
      description: 'Quality assurance and bug fixing'
    },
    { 
      title: 'Deployment', 
      progress: 0, 
      color: 'bg-gray-300',
      description: 'Preparing for final release'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Dynamic Project Timeline with VizSync</h2>
        <div className="flex space-x-6 overflow-x-auto pb-8">
          {projectStages.map((stage, index) => (
            <motion.div 
              key={index} 
              className="flex-shrink-0 w-72 bg-gray-100 p-6 rounded-3xl shadow-md"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{stage.title}</h3>
                <span className="text-sm text-gray-600">{stage.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div 
                  className={`${stage.color} h-3 rounded-full transition-all duration-500`} 
                  style={{ width: `${stage.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">{stage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EnhancedIntegrationsSection = () => {
  const integrations = [
    { 
      logo: <FaSlack className="w-16 h-16 text-purple-600" />, 
      name: 'Slack', 
      description: 'Instant team communication' 
    },
    { 
      logo: <FaTrello className="w-16 h-16 text-blue-500" />, 
      name: 'Trello', 
      description: 'Seamless task management' 
    },
    { 
      logo: <FaGithub className="w-16 h-16 text-gray-800" />, 
      name: 'GitHub', 
      description: 'Code collaboration' 
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-16">Powerful Integrations with VizSync</h2>
        <div className="flex justify-center space-x-12 mb-12">
          {integrations.map((integration, index) => (
            <motion.div 
              key={index}
              className="p-8 bg-white rounded-3xl shadow-lg flex flex-col items-center"
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
              }}
            >
              {integration.logo}
              <h3 className="mt-4 text-xl font-semibold">{integration.name}</h3>
              <p className="text-sm text-gray-500 mt-2">{integration.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.button 
          className="bg-purple-600 text-white px-10 py-4 rounded-full hover:bg-purple-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Integrations
        </motion.button>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection />
      <EnhancedFeaturesSection />
      <AdvancedTimelineSection />
      <EnhancedIntegrationsSection />
    </div>
  );
};

export default HomePage;
