import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Membership = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      period: '/month',
      features: [
        'Access to all equipment',
        'Group fitness classes',
        'Locker room access',
        'Free Wi-Fi',
        'Basic nutrition guidance'
      ],
      popular: false
    },
    {
      name: 'Premium',
      price: '$59',
      period: '/month',
      features: [
        'Everything in Basic',
        'Personal trainer sessions (2/month)',
        'Nutrition consultation',
        'Priority class booking',
        'Towel service',
        'Guest passes (2/month)'
      ],
      popular: true
    },
    {
      name: 'Elite',
      price: '$99',
      period: '/month',
      features: [
        'Everything in Premium',
        'Unlimited personal trainer sessions',
        'Custom meal plans',
        '24/7 gym access',
        'Unlimited guest passes',
        'Spa and recovery access',
        'Priority support'
      ],
      popular: false
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
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Membership Plans</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose the plan that fits your fitness goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`relative bg-zinc-900 border rounded-lg shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-red-500 border-red-500/50 transform scale-105' : 'border-red-900/30'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2 text-white">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-gray-400">{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/join-now"
                className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-red-600 text-white hover:bg-red-500'
                    : 'bg-zinc-800 text-white border border-red-900/30 hover:border-red-500/50'
                }`}
              >
                Choose Plan <ArrowRight className="inline ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Membership;
