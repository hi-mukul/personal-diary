'use client';

import { motion } from 'framer-motion';
import { FiArrowLeft, FiShield, FiLock, FiEye, FiHeart } from 'react-icons/fi';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: 'url(/background-image/back.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between p-6 lg:p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors group"
          >
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <FiArrowLeft size={20} />
            </motion.div>
            <span className="font-medium">Back to Sign In</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-white text-xl font-semibold">DivineLog</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-12">
          <motion.div
            className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Title */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Terms & Conditions
              </h1>
              <p className="text-gray-300 text-lg">
                Your privacy and security are our top priorities
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-gray-400">
                <span>Last updated: January 2025</span>
              </div>
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-8">
              {/* Introduction */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FiHeart className="text-purple-400" size={24} />
                  <h2 className="text-2xl font-bold text-white">Welcome to Your Personal Diary</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  My Personal Diary is designed to be your safe, private space for capturing thoughts, memories, and daily reflections.
                  By using our service, you agree to these terms which are designed to protect both you and the integrity of our platform.
                </p>
              </motion.section>

              {/* Privacy & Security */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FiShield className="text-green-400" size={24} />
                  <h2 className="text-2xl font-bold text-white">Privacy & Security</h2>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-white">Your Data Belongs to You:</strong> All diary entries, personal information, and content you create remains entirely yours.</p>
                  <p><strong className="text-white">End-to-End Security:</strong> Your diary entries are encrypted and stored securely. We cannot read your private thoughts.</p>
                  <p><strong className="text-white">No Data Selling:</strong> We will never sell, share, or monetize your personal diary content.</p>
                  <p><strong className="text-white">Minimal Data Collection:</strong> We only collect what's necessary to provide the service (email for account management).</p>
                </div>
              </motion.section>

              {/* Account Usage */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FiLock className="text-blue-400" size={24} />
                  <h2 className="text-2xl font-bold text-white">Account Usage</h2>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-white">Personal Use Only:</strong> This service is intended for personal diary and journaling purposes.</p>
                  <p><strong className="text-white">Account Security:</strong> You are responsible for maintaining the security of your account credentials.</p>
                  <p><strong className="text-white">Appropriate Content:</strong> While this is your private space, please refrain from illegal content or planning harmful activities.</p>
                  <p><strong className="text-white">One Account Per Person:</strong> Each user should maintain only one account for personal use.</p>
                </div>
              </motion.section>

              {/* Data Rights */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FiEye className="text-purple-400" size={24} />
                  <h2 className="text-2xl font-bold text-white">Your Rights</h2>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-white">Access Your Data:</strong> You can export all your diary entries at any time.</p>
                  <p><strong className="text-white">Delete Your Data:</strong> You can permanently delete your account and all associated data.</p>
                  <p><strong className="text-white">Data Portability:</strong> Your diary entries can be exported in standard formats.</p>
                  <p><strong className="text-white">Account Control:</strong> You have full control over your privacy settings and data sharing preferences.</p>
                </div>
              </motion.section>

              {/* Service Availability */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-white">Service Availability</h2>
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-white">Best Effort Service:</strong> We strive to provide 99.9% uptime but cannot guarantee uninterrupted service.</p>
                  <p><strong className="text-white">Maintenance Windows:</strong> Scheduled maintenance will be announced in advance when possible.</p>
                  <p><strong className="text-white">Data Backup:</strong> We maintain regular backups, but we recommend you also keep personal copies of important entries.</p>
                </div>
              </motion.section>

              {/* Limitations */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-white">Limitations</h2>
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-white">Storage Limits:</strong> Each account includes generous storage for text-based diary entries.</p>
                  <p><strong className="text-white">Fair Use:</strong> The service is designed for personal diary use, not as a general file storage system.</p>
                  <p><strong className="text-white">Age Requirement:</strong> Users must be at least 13 years old to create an account.</p>
                </div>
              </motion.section>

              {/* Changes to Terms */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-white">Changes to These Terms</h2>
                <div className="space-y-3 text-gray-300">
                  <p>We may update these terms from time to time. When we do, we will:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Notify you via email of any significant changes</li>
                    <li>Update the "Last updated" date at the top of this page</li>
                    <li>Give you at least 30 days notice for major changes</li>
                    <li>Allow you to export your data if you disagree with new terms</li>
                  </ul>
                </div>
              </motion.section>

              {/* Contact */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 }}
                className="space-y-4 border-t border-white/20 pt-8"
              >
                <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                <div className="space-y-3 text-gray-300">
                  <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p><strong className="text-white">Email:</strong> support@mypersonaldiary.com</p>
                    <p><strong className="text-white">Response Time:</strong> We aim to respond within 24 hours</p>
                    <p className="text-sm text-gray-400 mt-4">
                      We're here to help make your diary experience as smooth and secure as possible.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Footer */}
              <motion.div
                className="text-center pt-8 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
              >
                <p className="text-gray-400 text-sm">
                  Thank you for trusting us with your personal thoughts and memories.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <FiArrowLeft size={16} />
                  Return to Sign In
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
