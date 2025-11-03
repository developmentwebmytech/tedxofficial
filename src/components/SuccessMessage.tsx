'use client';

import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200 flex items-start space-x-3 shadow-md"
    >
      <CheckCircle className="text-green-600 w-6 h-6 mt-1" />
      <div>
        <p className="text-green-800 font-medium">Message sent successfully!</p>
        <p className="text-green-700 text-sm">Thank you! We’ll get back to you shortly.</p>
      </div>
    </motion.div>
  );
}
