import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Star } from 'lucide-react';
import { db } from '../db/database';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async () => {
    const allTrainers = await db.trainers.toArray();
    setTrainers(allTrainers);
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-white">Our Expert Trainers</h1>
          <p className="text-xl text-gray-400">
            Meet the professionals who will guide your fitness journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg overflow-hidden hover:border-red-500/40"
            >
              <div className="h-64 bg-gradient-to-r from-red-900/50 to-black relative">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">
                  {trainer.name}
                </h3>
                <div className="flex items-center mb-2">
                  <Award className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-gray-400">
                    {trainer.experience}
                  </span>
                </div>
                <p className="text-sm font-semibold text-red-500 mb-3">
                  {trainer.specialization}
                </p>
                <p className="text-gray-400 text-sm">
                  {trainer.bio}
                </p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainers;
