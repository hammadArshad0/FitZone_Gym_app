import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import { db } from '../db/database';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const JoinNow = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    fitnessGoal: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.forms.add({
        ...formData,
        type: 'join-now',
        createdAt: new Date()
      });
      toast.success('Thank you for joining FITZONE! We will contact you soon.');
      navigate('/');
    } catch (error) {
      toast.error('Error submitting form. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-white">Join <span className="text-red-500">FITZONE</span> Today</h1>
          <p className="text-xl text-gray-400">
            Start your fitness journey with us
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <UserPlus className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-red-900/40 rounded-lg focus:ring-2 focus:ring-red-500 bg-black/50 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-red-900/40 rounded-lg focus:ring-2 focus:ring-red-500 bg-black/50 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-red-900/40 rounded-lg focus:ring-2 focus:ring-red-500 bg-black/50 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-red-900/40 rounded-lg focus:ring-2 focus:ring-red-500 bg-black/50 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-red-900/40 rounded-lg focus:ring-2 focus:ring-red-500 bg-black/50 text-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Fitness Goal *
                </label>
                <select
                  name="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-red-900/40 rounded-lg focus:ring-2 focus:ring-red-500 bg-black/50 text-white"
                >
                  <option value="">Select Goal</option>
                  <option value="weight-loss">Weight Loss</option>
                  <option value="muscle-gain">Muscle Gain</option>
                  <option value="endurance">Endurance</option>
                  <option value="flexibility">Flexibility</option>
                  <option value="general-fitness">General Fitness</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-red-900/40 rounded-lg focus:ring-2 focus:ring-red-500 bg-black/50 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-red-900/40 rounded-lg focus:ring-2 focus:ring-red-500 bg-black/50 text-white"
                placeholder="Tell us about your fitness journey..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition-colors"
            >
              Submit Application
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinNow;
