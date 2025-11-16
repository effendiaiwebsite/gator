import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceComparison = ({ services }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleService = (serviceId) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else if (prev.length < 3) {
        return [...prev, serviceId];
      }
      return prev;
    });
  };

  const displayServices = selectedServices.length > 0
    ? services.filter(s => selectedServices.includes(s.id))
    : services.slice(0, 3);

  return (
    <div>
      {/* Service Selector */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-3">
          Select up to 3 services to compare (or view all by default):
        </p>
        <div className="flex flex-wrap gap-2">
          {services.map(service => (
            <button
              key={service.id}
              onClick={() => toggleService(service.id)}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                selectedServices.includes(service.id)
                  ? 'bg-gator-green-dark text-white border-gator-green-dark'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gator-green'
              }`}
            >
              {service.name}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-gator-green-dark to-gator-green text-white">
              <th className="px-6 py-4 text-left font-semibold">Feature</th>
              {displayServices.map(service => (
                <th key={service.id} className="px-6 py-4 text-center font-semibold">
                  {service.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="px-6 py-4 font-medium text-gray-700">Starting Price</td>
              {displayServices.map(service => (
                <td key={service.id} className="px-6 py-4 text-center">
                  <span className="font-bold text-gator-green-dark">{service.price}</span>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-200 bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-700">Typical Turnaround</td>
              {displayServices.map(service => (
                <td key={service.id} className="px-6 py-4 text-center text-gray-600">
                  {service.turnaround}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-200">
              <td className="px-6 py-4 font-medium text-gray-700">Document Upload Portal</td>
              {displayServices.map(service => (
                <td key={service.id} className="px-6 py-4 text-center">
                  <Check className="text-green-600 mx-auto" size={20} />
                </td>
              ))}
            </tr>
            {displayServices[0].features?.map((_, featureIndex) => (
              <tr
                key={featureIndex}
                className={`border-b border-gray-200 ${featureIndex % 2 === 1 ? 'bg-gray-50' : ''}`}
              >
                <td className="px-6 py-4 font-medium text-gray-700">
                  {displayServices[0].features[featureIndex].name}
                </td>
                {displayServices.map(service => (
                  <td key={service.id} className="px-6 py-4 text-center">
                    {service.features[featureIndex]?.included ? (
                      <Check className="text-green-600 mx-auto" size={20} />
                    ) : (
                      <X className="text-gray-400 mx-auto" size={20} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-700">Best For</td>
              {displayServices.map(service => (
                <td key={service.id} className="px-6 py-4 text-center text-sm text-gray-600">
                  {service.bestFor}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* CTA */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {displayServices.map(service => (
          <motion.button
            key={service.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Get Started with {service.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ServiceComparison;
