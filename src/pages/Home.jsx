import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Users, Award, TrendingUp, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    { icon: Dumbbell, title: 'Expert Trainers', description: 'Certified professionals to guide you' },
    { icon: Users, title: 'Community', description: 'Join thousands of fitness enthusiasts' },
    { icon: Award, title: 'Proven Results', description: 'Transform your body and mind' },
    { icon: TrendingUp, title: 'Track Progress', description: 'Monitor your fitness journey' }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Background image with black shadow overlay */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920')` }}
        />
        {/* Black shadow overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
              Welcome to <span className="text-red-500">FITZONE</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Transform Your Body, Transform Your Life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/join-now"
                className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition-colors inline-flex items-center justify-center shadow-lg shadow-red-900/50"
              >
                Join Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/programs"
                className="px-8 py-3 bg-transparent border-2 border-red-500 text-white rounded-lg font-semibold hover:bg-red-500 transition-colors"
              >
                Explore Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            Why Choose <span className="text-red-500">FITZONE</span>?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-black/50 border border-red-900/50 p-6 rounded-lg text-center hover:border-red-500/50 transition-colors"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-black via-red-950/50 to-black text-white border-y border-red-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">10K+</div>
              <div className="text-xl">Active Members</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl">Expert Trainers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-xl">Fitness Programs</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-white">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of members achieving their fitness goals
            </p>
            <Link
              to="/join-now"
              className="inline-block px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition-colors shadow-lg shadow-red-900/30"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
