import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Users, Dumbbell, UserPlus, X } from 'lucide-react';
import { db } from '../db/database';
import toast from 'react-hot-toast';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('programs');
  const [programs, setPrograms] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [members, setMembers] = useState([]);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showTrainerModal, setShowTrainerModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [editingTrainer, setEditingTrainer] = useState(null);
  
  const [programForm, setProgramForm] = useState({
    name: '',
    description: '',
    duration: '',
    level: '',
    caloriesBurned: '',
    equipment: '',
    image: ''
  });

  const [trainerForm, setTrainerForm] = useState({
    name: '',
    specialization: '',
    experience: '',
    bio: '',
    image: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = async () => {
    const allPrograms = await db.programs.toArray();
    const allTrainers = await db.trainers.toArray();
    const allUsers = await db.users.where('role').equals('user').toArray();
    setPrograms(allPrograms);
    setTrainers(allTrainers);
    setMembers(allUsers);
  };

  const handleProgramSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProgram) {
        await db.programs.update(editingProgram.id, programForm);
        toast.success('Program updated successfully!');
      } else {
        await db.programs.add({
          ...programForm,
          caloriesBurned: parseInt(programForm.caloriesBurned),
          createdAt: new Date()
        });
        toast.success('Program added successfully!');
      }
      setShowProgramModal(false);
      setEditingProgram(null);
      setProgramForm({
        name: '',
        description: '',
        duration: '',
        level: '',
        caloriesBurned: '',
        equipment: '',
        image: ''
      });
      loadData();
    } catch (error) {
      toast.error('Error saving program');
      console.error(error);
    }
  };

  const handleTrainerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTrainer) {
        await db.trainers.update(editingTrainer.id, trainerForm);
        toast.success('Trainer updated successfully!');
      } else {
        await db.trainers.add({
          ...trainerForm,
          createdAt: new Date()
        });
        toast.success('Trainer added successfully!');
      }
      setShowTrainerModal(false);
      setEditingTrainer(null);
      setTrainerForm({
        name: '',
        specialization: '',
        experience: '',
        bio: '',
        image: ''
      });
      loadData();
    } catch (error) {
      toast.error('Error saving trainer');
      console.error(error);
    }
  };

  const handleEditProgram = (program) => {
    setEditingProgram(program);
    setProgramForm({
      name: program.name,
      description: program.description,
      duration: program.duration,
      level: program.level,
      caloriesBurned: program.caloriesBurned.toString(),
      equipment: program.equipment,
      image: program.image
    });
    setShowProgramModal(true);
  };

  const handleEditTrainer = (trainer) => {
    setEditingTrainer(trainer);
    setTrainerForm({
      name: trainer.name,
      specialization: trainer.specialization,
      experience: trainer.experience,
      bio: trainer.bio,
      image: trainer.image
    });
    setShowTrainerModal(true);
  };

  const handleDeleteProgram = async (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      try {
        await db.programs.delete(id);
        toast.success('Program deleted successfully!');
        loadData();
      } catch (error) {
        toast.error('Error deleting program');
      }
    }
  };

  const handleDeleteTrainer = async (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      try {
        await db.trainers.delete(id);
        toast.success('Trainer deleted successfully!');
        loadData();
      } catch (error) {
        toast.error('Error deleting trainer');
      }
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 text-white">Admin Dashboard</h1>
          <p className="text-gray-400">Manage programs, trainers, and members</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-red-900/30">
          <button
            onClick={() => setActiveTab('programs')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'programs'
                ? 'border-b-2 border-red-500 text-red-500'
                : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Dumbbell className="w-5 h-5 inline mr-2" />
            Programs
          </button>
          <button
            onClick={() => setActiveTab('trainers')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'trainers'
                ? 'border-b-2 border-red-500 text-red-500'
                : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <UserPlus className="w-5 h-5 inline mr-2" />
            Trainers
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'members'
                ? 'border-b-2 border-red-500 text-red-500'
                : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            Members ({members.length})
          </button>
        </div>

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <div>
            <button
              onClick={() => {
                setEditingProgram(null);
                setProgramForm({
                  name: '',
                  description: '',
                  duration: '',
                  level: '',
                  caloriesBurned: '',
                  equipment: '',
                  image: ''
                });
                setShowProgramModal(true);
              }}
              className="mb-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Program
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {program.name}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">
                    {program.description.substring(0, 100)}...
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProgram(program)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors flex items-center justify-center"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProgram(program.id)}
                      className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors border border-red-900/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trainers Tab */}
        {activeTab === 'trainers' && (
          <div>
            <button
              onClick={() => {
                setEditingTrainer(null);
                setTrainerForm({
                  name: '',
                  specialization: '',
                  experience: '',
                  bio: '',
                  image: ''
                });
                setShowTrainerModal(true);
              }}
              className="mb-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Trainer
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trainers.map((trainer) => (
                <div
                  key={trainer.id}
                  className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {trainer.name}
                  </h3>
                  <p className="text-sm text-red-500 mb-2">
                    {trainer.specialization}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    {trainer.bio.substring(0, 80)}...
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTrainer(trainer)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors flex items-center justify-center"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTrainer(trainer.id)}
                      className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors border border-red-900/50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-black/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-900/20">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-red-900/10">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(member.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Program Modal */}
        {showProgramModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingProgram ? 'Edit Program' : 'Add Program'}
                </h2>
                <button
                  onClick={() => {
                    setShowProgramModal(false);
                    setEditingProgram(null);
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleProgramSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={programForm.name}
                    onChange={(e) => setProgramForm({ ...programForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-red-900/40 rounded-lg bg-black/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={programForm.description}
                    onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-red-900/40 rounded-lg bg-black/50 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                    <input
                      type="text"
                      value={programForm.duration}
                      onChange={(e) => setProgramForm({ ...programForm, duration: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-red-900/40 rounded-lg bg-black/50 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
                    <select
                      value={programForm.level}
                      onChange={(e) => setProgramForm({ ...programForm, level: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-red-900/40 rounded-lg bg-black/50 text-white"
                    >
                      <option value="">Select Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Calories Burned</label>
                  <input
                    type="number"
                    value={programForm.caloriesBurned}
                    onChange={(e) => setProgramForm({ ...programForm, caloriesBurned: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-red-900/40 rounded-lg bg-black/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Equipment</label>
                  <input
                    type="text"
                    value={programForm.equipment}
                    onChange={(e) => setProgramForm({ ...programForm, equipment: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-red-900/40 rounded-lg bg-black/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={programForm.image}
                    onChange={(e) => setProgramForm({ ...programForm, image: e.target.value })}
                    className="w-full px-4 py-2 border border-red-900/40 rounded-lg bg-black/50 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition-colors"
                >
                  {editingProgram ? 'Update Program' : 'Add Program'}
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Trainer Modal */}
        {showTrainerModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingTrainer ? 'Edit Trainer' : 'Add Trainer'}
                </h2>
                <button
                  onClick={() => {
                    setShowTrainerModal(false);
                    setEditingTrainer(null);
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleTrainerSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={trainerForm.name}
                    onChange={(e) => setTrainerForm({ ...trainerForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-red-900/40 rounded-lg bg-black/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Specialization</label>
                  <input
                    type="text"
                    value={trainerForm.specialization}
                    onChange={(e) => setTrainerForm({ ...trainerForm, specialization: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-red-900/40 rounded-lg bg-black/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Experience</label>
                  <input
                    type="text"
                    value={trainerForm.experience}
                    onChange={(e) => setTrainerForm({ ...trainerForm, experience: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-red-900/40 rounded-lg bg-black/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={trainerForm.bio}
                    onChange={(e) => setTrainerForm({ ...trainerForm, bio: e.target.value })}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-red-900/40 rounded-lg bg-black/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
                  <input
                    type="url"
                    value={trainerForm.image}
                    onChange={(e) => setTrainerForm({ ...trainerForm, image: e.target.value })}
                    className="w-full px-4 py-2 border border-red-900/40 rounded-lg bg-black/50 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition-colors"
                >
                  {editingTrainer ? 'Update Trainer' : 'Add Trainer'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
