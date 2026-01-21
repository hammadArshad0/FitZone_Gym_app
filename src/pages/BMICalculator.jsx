import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Info } from 'lucide-react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (!height || !weight) {
      alert('Please enter both height and weight');
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    let cat = '';
    if (bmiValue < 18.5) {
      cat = 'Underweight';
    } else if (bmiValue < 25) {
      cat = 'Normal weight';
    } else if (bmiValue < 30) {
      cat = 'Overweight';
    } else {
      cat = 'Obese';
    }
    setCategory(cat);
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-white">BMI Calculator</h1>
          <p className="text-xl text-gray-400">
            Calculate your Body Mass Index to understand your health status
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Calculator className="w-8 h-8 text-red-500 mr-2" />
              <h2 className="text-2xl font-bold text-white">Calculate BMI</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-2 border border-red-900/40 rounded-lg focus:ring-2 focus:ring-red-500 bg-black/50 text-white"
                  placeholder="Enter height in cm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-2 border border-red-900/40 rounded-lg focus:ring-2 focus:ring-red-500 bg-black/50 text-white"
                  placeholder="Enter weight in kg"
                />
              </div>

              <button
                onClick={calculateBMI}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition-colors"
              >
                Calculate BMI
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-zinc-900 border border-red-900/30 rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Info className="w-8 h-8 text-red-500 mr-2" />
              <h2 className="text-2xl font-bold text-white">Your Result</h2>
            </div>

            {bmi ? (
              <div className="text-center">
                <div className="text-6xl font-bold text-red-500 mb-4">{bmi}</div>
                <div className={`text-2xl font-semibold mb-6 ${category.includes('Normal') ? 'text-green-500' : category.includes('Underweight') ? 'text-cyan-400' : category.includes('Overweight') ? 'text-amber-400' : 'text-red-500'}`}>
                  {category}
                </div>
                <div className="bg-black/50 border border-red-900/30 rounded-lg p-4">
                  <p className="text-sm text-gray-300">
                    BMI Categories:
                  </p>
                  <ul className="text-left mt-2 space-y-1 text-sm text-gray-400">
                    <li className={bmi < 18.5 ? 'font-semibold text-cyan-400' : ''}>Underweight: &lt; 18.5</li>
                    <li className={bmi >= 18.5 && bmi < 25 ? 'font-semibold text-green-500' : ''}>Normal: 18.5 - 24.9</li>
                    <li className={bmi >= 25 && bmi < 30 ? 'font-semibold text-amber-400' : ''}>Overweight: 25 - 29.9</li>
                    <li className={bmi >= 30 ? 'font-semibold text-red-500' : ''}>Obese: ≥ 30</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                Enter your height and weight to calculate your BMI
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
