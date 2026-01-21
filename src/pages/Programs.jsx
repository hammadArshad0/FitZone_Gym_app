import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame, Dumbbell, TrendingUp } from 'lucide-react';
import { db } from '../db/database';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filter, setFilter] = useState('all');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    const allPrograms = await db.programs.toArray();
    setPrograms(allPrograms);
  };

  const handleEnroll = async (programId) => {
    if (!user) {
      toast.error('Please login to enroll in programs');
      navigate('/login');
      return;
    }

    try {
      // Check if already enrolled
      const userEnrollments = await db.enrollments.where('userId').equals(user.id).toArray();
      const existing = userEnrollments.find(e => e.programId === programId);
      
      if (existing) {
        toast.error('You are already enrolled in this program');
        return;
      }

      await db.enrollments.add({
        userId: user.id,
        programId: programId,
        enrolledAt: new Date(),
        status: 'active'
      });
      
      toast.success('Successfully enrolled in program!');
    } catch (error) {
      toast.error('Error enrolling in program');
      console.error(error);
    }
  };

  const filteredPrograms = filter === 'all' 
    ? programs 
    : programs.filter(p => p.level.toLowerCase() === filter.toLowerCase());

  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-white">Our Programs</h1>
          <p className="text-xl text-gray-400">
            Choose the perfect program for your fitness journey
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === level
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-900 text-gray-300 border border-red-900/30 hover:border-red-500/50 hover:text-red-500'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg overflow-hidden hover:border-red-500/40"
            >
              <div className="h-48 bg-gradient-to-r from-red-900/50 to-black relative">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {program.name}
                </h3>
                <p className="text-gray-400 mb-4">
                  {program.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-5 h-5 mr-2 text-red-500" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
                    <span>Level: {program.level}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Flame className="w-5 h-5 mr-2 text-red-500" />
                    <span>{program.caloriesBurned} calories/session</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Dumbbell className="w-5 h-5 mr-2 text-red-500" />
                    <span className="text-sm">{program.equipment}</span>
                  </div>
                </div>

                {user ? (
                  <button
                    onClick={() => handleEnroll(program.id)}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
                  >
                    Enroll Now
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Login to Enroll
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">
              No programs found for this level.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;
