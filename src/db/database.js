import Dexie from 'dexie';

// Define the database schema
export const db = new Dexie('FitzoneDB');

db.version(1).stores({
  users: '++id, email, password, name, role, createdAt',
  programs: '++id, name, description, duration, level, caloriesBurned, equipment, image, createdAt',
  trainers: '++id, name, specialization, experience, bio, image, createdAt',
  enrollments: '++id, userId, programId, enrolledAt, status',
  forms: '++id, name, email, phone, message, type, createdAt'
});

// Seed initial data
export const seedDatabase = async () => {
  // Check if data already exists
  const programCount = await db.programs.count();
  const trainerCount = await db.trainers.count();
  
  if (programCount === 0) {
    await db.programs.bulkAdd([
      {
        name: 'Strength Training',
        description: 'Build muscle mass and increase strength with our comprehensive strength training program. Perfect for beginners and advanced lifters.',
        duration: '12 weeks',
        level: 'Intermediate',
        caloriesBurned: 500,
        equipment: 'Dumbbells, Barbells, Resistance Bands',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
        createdAt: new Date()
      },
      {
        name: 'Cardio Blast',
        description: 'High-intensity cardio workout to burn calories and improve cardiovascular health. Get your heart pumping!',
        duration: '8 weeks',
        level: 'Beginner',
        caloriesBurned: 600,
        equipment: 'Treadmill, Stationary Bike, Jump Rope',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
        createdAt: new Date()
      },
      {
        name: 'Yoga & Flexibility',
        description: 'Improve flexibility, balance, and mental well-being with our yoga program. Suitable for all levels.',
        duration: '10 weeks',
        level: 'Beginner',
        caloriesBurned: 250,
        equipment: 'Yoga Mat, Blocks, Straps',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
        createdAt: new Date()
      },
      {
        name: 'HIIT Workout',
        description: 'High-Intensity Interval Training for maximum fat burn in minimal time. Push your limits!',
        duration: '6 weeks',
        level: 'Advanced',
        caloriesBurned: 700,
        equipment: 'Kettlebells, Battle Ropes, Timer',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
        createdAt: new Date()
      },
      {
        name: 'CrossFit Challenge',
        description: 'Functional fitness program combining weightlifting, cardio, and gymnastics. For the elite athlete.',
        duration: '16 weeks',
        level: 'Advanced',
        caloriesBurned: 800,
        equipment: 'Olympic Barbell, Pull-up Bar, Box',
        image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800',
        createdAt: new Date()
      },
      {
        name: 'Pilates Core',
        description: 'Strengthen your core and improve posture with our Pilates program. Low impact, high results.',
        duration: '8 weeks',
        level: 'Beginner',
        caloriesBurned: 300,
        equipment: 'Pilates Mat, Resistance Bands, Ball',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
        createdAt: new Date()
      }
    ]);
  }

  if (trainerCount === 0) {
    await db.trainers.bulkAdd([
      {
        name: 'Mike Johnson',
        specialization: 'Strength Training, Bodybuilding',
        experience: '10 years',
        bio: 'Certified personal trainer with a passion for helping clients achieve their strength goals. Former competitive bodybuilder.',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        createdAt: new Date()
      },
      {
        name: 'Sarah Williams',
        specialization: 'Yoga, Pilates, Flexibility',
        experience: '8 years',
        bio: 'Yoga instructor and wellness coach dedicated to improving flexibility and mental well-being through mindful movement.',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
        createdAt: new Date()
      },
      {
        name: 'David Chen',
        specialization: 'HIIT, Cardio, Weight Loss',
        experience: '12 years',
        bio: 'Fitness expert specializing in high-intensity workouts and weight management. NASM certified trainer.',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
        createdAt: new Date()
      },
      {
        name: 'Emma Davis',
        specialization: 'CrossFit, Functional Fitness',
        experience: '7 years',
        bio: 'CrossFit Level 2 trainer and competitive athlete. Passionate about functional fitness and helping others reach their peak performance.',
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
        createdAt: new Date()
      }
    ]);
  }

  // Create default admin user
  const adminExists = await db.users.where('email').equals('admin@fitzone.com').first();
  if (!adminExists) {
    await db.users.add({
      email: 'admin@fitzone.com',
      password: 'admin123', // In production, this should be hashed
      name: 'Admin User',
      role: 'admin',
      createdAt: new Date()
    });
  }
};
