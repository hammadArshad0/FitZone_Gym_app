import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, Dumbbell, TrendingUp, Award } from 'lucide-react';
import { db } from '../db/database';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [stats, setStats] = useState({
    totalPrograms: 0,
    activeEnrollments: 0,
    completedSessions: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadEnrollments();
    loadStats();
  }, [user, navigate]);

  const loadEnrollments = async () => {
    if (!user) return;
    const userEnrollments = await db.enrollments.where('userId').equals(user.id).toArray();
    const enrollmentsWithPrograms = await Promise.all(
      userEnrollments.map(async (enrollment) => {
        const program = await db.programs.get(enrollment.programId);
        return { ...enrollment, program };
      })
    );
    setEnrollments(enrollmentsWithPrograms);
  };

  const loadStats = async () => {
    if (!user) return;
    const totalPrograms = await db.programs.count();
    const activeEnrollments = await db.enrollments.where('userId').equals(user.id).count();
    setStats({ totalPrograms, activeEnrollments, completedSessions: 0 });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 text-white">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-400">
            Here's your fitness dashboard
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Programs</p>
                <p className="text-3xl font-bold text-white">{stats.totalPrograms}</p>
              </div>
              <Dumbbell className="w-12 h-12 text-red-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Enrollments</p>
                <p className="text-3xl font-bold text-white">{stats.activeEnrollments}</p>
              </div>
              <Calendar className="w-12 h-12 text-red-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed Sessions</p>
                <p className="text-3xl font-bold text-white">{stats.completedSessions}</p>
              </div>
              <Award className="w-12 h-12 text-red-500" />
            </div>
          </motion.div>
        </div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex items-center mb-4">
            <User className="w-8 h-8 text-red-500 mr-3" />
            <h2 className="text-2xl font-bold text-white">Profile Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Name</p>
              <p className="text-lg font-semibold text-white">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-lg font-semibold text-white">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Role</p>
              <p className="text-lg font-semibold text-white capitalize">{user.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Member Since</p>
              <p className="text-lg font-semibold text-white">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Enrollments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">My Enrollments</h2>
          {enrollments.length > 0 ? (
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="border border-red-900/30 rounded-lg p-4"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {enrollment.program?.name || 'Program'}
                  </h3>
                  <p className="text-gray-400 mb-2">
                    Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    enrollment.status === 'active' 
                      ? 'bg-red-900/50 text-red-200 border border-red-500/30'
                      : 'bg-zinc-800 text-gray-300 border border-red-900/30'
                  }`}>
                    {enrollment.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <TrendingUp className="w-16 h-16 mx-auto text-gray-500 mb-4" />
              <p className="text-gray-400">No enrollments yet</p>
              <a
                href="/programs"
                className="text-red-500 hover:text-red-400 hover:underline mt-2 inline-block"
              >
                Browse Programs
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
