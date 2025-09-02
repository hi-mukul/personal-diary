'use client'

import { motion } from 'framer-motion'
import { FiArrowLeft, FiShield, FiLock, FiEye, FiDatabase, FiMail, FiBookOpen, FiUsers, FiGlobe } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import FloatingParticles from '../components/ui/FloatingParticles'

export default function PrivacyPage() {
  const router = useRouter()

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
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/40" />

      {/* Floating particles effect */}
      <FloatingParticles count={15} className="from-purple-400/20 to-cyan-400/20" />

      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            {/* App Name */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <FiBookOpen className="text-white" size={20} />
              </div>
              <span className="text-white text-2xl font-semibold tracking-wide">My Personal Diary</span>
            </motion.div>

            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-purple-400 via-pink-400 to-cyan-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-purple-500/25"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FiShield className="text-white" size={36} />
            </motion.div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
              Your privacy and security are our top priorities. Learn how we protect your personal diary and memories.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Last updated: January 2025
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid gap-8 lg:gap-12">
            {/* Overview Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 border border-white/10 shadow-2xl shadow-black/20"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">Our Commitment to Your Privacy</h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                  At My Personal Diary, we understand that your thoughts, memories, and personal reflections are deeply private.
                  This Privacy Policy explains how we collect, use, protect, and respect your personal information.
                </p>
              </div>
            </motion.div>

            {/* Main Content Sections */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Data Collection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <FiDatabase className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">What We Collect</h3>
                </div>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Account Information</h4>
                    <p className="text-sm leading-relaxed">
                      • Email address (for account creation and authentication)<br />
                      • Password (encrypted and never stored in plain text)<br />
                      • Account creation and last login timestamps
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Diary Content</h4>
                    <p className="text-sm leading-relaxed">
                      • Your diary entries (title, content, and timestamps)<br />
                      • Entry metadata (creation and modification dates)<br />
                      • User preferences and settings
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Technical Data</h4>
                    <p className="text-sm leading-relaxed">
                      • Device information and browser type<br />
                      • IP address and general location<br />
                      • Usage analytics (anonymized)
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Data Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                    <FiLock className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">How We Protect You</h3>
                </div>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Encryption</h4>
                    <p className="text-sm leading-relaxed">
                      All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.
                      Your diary entries are encrypted before being stored in our database.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Infrastructure</h4>
                    <p className="text-sm leading-relaxed">
                      We use Supabase's secure, SOC 2 Type II compliant infrastructure with regular security audits
                      and monitoring to protect against unauthorized access.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Access Control</h4>
                    <p className="text-sm leading-relaxed">
                      Only you can access your diary entries. Our team cannot read your personal content,
                      and we implement strict access controls and authentication measures.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Data Usage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                    <FiEye className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">How We Use Your Data</h3>
                </div>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Service Provision</h4>
                    <p className="text-sm leading-relaxed">
                      • Provide and maintain your personal diary service<br />
                      • Authenticate your account and ensure security<br />
                      • Sync your entries across devices
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Communication</h4>
                    <p className="text-sm leading-relaxed">
                      • Send important account notifications<br />
                      • Provide customer support when requested<br />
                      • Send password reset emails
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">What We DON'T Do</h4>
                    <p className="text-sm leading-relaxed text-red-300">
                      • We never read your diary entries<br />
                      • We never sell your personal data<br />
                      • We never share your content with third parties
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Your Rights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                    <FiUsers className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Your Rights & Control</h3>
                </div>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Data Access</h4>
                    <p className="text-sm leading-relaxed">
                      You can access, edit, or delete any of your diary entries at any time through your account dashboard.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Data Export</h4>
                    <p className="text-sm leading-relaxed">
                      Request a complete export of your data in a portable format. We'll provide all your entries and account information.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Account Deletion</h4>
                    <p className="text-sm leading-relaxed">
                      Delete your account and all associated data permanently. This action cannot be undone,
                      and all your diary entries will be permanently removed.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Additional Sections */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Data Retention */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center">
                    <FiGlobe className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Data Retention & Sharing</h3>
                </div>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">How Long We Keep Your Data</h4>
                    <p className="text-sm leading-relaxed">
                      We retain your account and diary data for as long as your account is active.
                      When you delete your account, all data is permanently removed within 30 days.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Third-Party Services</h4>
                    <p className="text-sm leading-relaxed">
                      We use trusted third-party services like Supabase for hosting and authentication.
                      These services are bound by strict privacy agreements and cannot access your diary content.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Legal Requirements</h4>
                    <p className="text-sm leading-relaxed">
                      We may disclose information only if required by law, court order, or to protect our rights and safety.
                      We will notify you unless legally prohibited.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Contact & Updates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center">
                    <FiMail className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Contact & Updates</h3>
                </div>
                <div className="space-y-4 text-gray-300">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Questions or Concerns</h4>
                    <p className="text-sm leading-relaxed">
                      If you have any questions about this Privacy Policy or how we handle your data,
                      please contact us. We're committed to addressing your concerns promptly.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Policy Updates</h4>
                    <p className="text-sm leading-relaxed">
                      We may update this Privacy Policy occasionally. We'll notify you of significant changes
                      via email or through the app. Continued use constitutes acceptance of updates.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Your Consent</h4>
                    <p className="text-sm leading-relaxed">
                      By using My Personal Diary, you consent to the collection and use of information
                      as outlined in this Privacy Policy.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl shadow-black/20 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Your Privacy Matters</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                We're committed to protecting your privacy and ensuring your diary remains your personal, secure space.
                Your trust is the foundation of our service.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  onClick={() => router.back()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-xl border border-white/10 text-white font-medium px-6 py-3 rounded-2xl hover:from-purple-500/80 hover:to-pink-500/80 transition-all duration-300"
                >
                  <FiArrowLeft size={20} />
                  Back to Sign In
                </motion.button>

                <motion.a
                  href="mailto:privacy@mypersonaldiary.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-medium px-6 py-3 rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  <FiMail size={20} />
                  Contact Us
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
