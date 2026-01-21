import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Smith',
      role: 'Member since 2023',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      rating: 5,
      text: 'FITZONE has completely transformed my life. The trainers are amazing and the programs are tailored to my needs. I\'ve lost 30 pounds in 3 months!'
    },
    {
      name: 'Sarah Johnson',
      role: 'Member since 2022',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      rating: 5,
      text: 'The best gym I\'ve ever been to. The community is supportive, the facilities are top-notch, and I\'ve never felt stronger or more confident.'
    },
    {
      name: 'Mike Davis',
      role: 'Member since 2023',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      rating: 5,
      text: 'I was skeptical at first, but FITZONE exceeded all my expectations. The personalized training and nutrition guidance helped me achieve my goals faster than I imagined.'
    },
    {
      name: 'Emily Chen',
      role: 'Member since 2024',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      rating: 5,
      text: 'The yoga and flexibility programs are incredible. I\'ve improved my posture and reduced back pain significantly. Highly recommend!'
    },
    {
      name: 'David Wilson',
      role: 'Member since 2022',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      rating: 5,
      text: 'As a busy professional, I needed a gym that works around my schedule. FITZONE\'s flexible programs and expert trainers made it possible to stay fit.'
    },
    {
      name: 'Lisa Anderson',
      role: 'Member since 2023',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
      rating: 5,
      text: 'The strength training program helped me build muscle and confidence. The trainers are knowledgeable and always push me to be my best.'
    }
  ];

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-white">What Our Members Say</h1>
          <p className="text-xl text-gray-400">
            Real stories from real people who transformed their lives
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg p-6 relative hover:border-red-500/40"
            >
              <Quote className="w-12 h-12 text-red-500 opacity-20 absolute top-4 right-4" />
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 ring-2 ring-red-900/50"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200';
                  }}
                />
                <div>
                  <h3 className="font-semibold text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-red-500 text-red-500" />
                ))}
              </div>
              <p className="text-gray-300 italic">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
