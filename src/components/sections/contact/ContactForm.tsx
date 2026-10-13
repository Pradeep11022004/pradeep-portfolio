
'use client'

import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { motion, type Variants } from 'framer-motion'
import {
  Send,
  User,
  Mail,
  MessageSquare,
  ArrowUpRight,
} from 'lucide-react'

import {
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa'

const smoothEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
]

const fieldVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
}

const socialLinks = [
  {
    title: 'Instagram',
    user: '@justpradeep_k',
    icon: FaInstagram,
    link: 'https://www.instagram.com/justpradeep_k/',
  },
  {
    title: 'GitHub',
    user: '@Pradeep11022004',
    icon: FaGithub,
    link: 'https://github.com/Pradeep11022004',
  },
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    message: '',
  })

  const [isSending, setIsSending] = useState(false)

  const [status, setStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    setStatus(null)

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: 'error',
        message:
          'Email service is not configured. Please try again later.',
      })
      return
    }

    setIsSending(true)

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.from_name.trim(),
          from_email: formData.from_email.trim(),
          message: formData.message.trim(),
        },
        { publicKey }
      )

      setStatus({
        type: 'success',
        message: 'Message sent successfully! Thank you for contacting me.',
      })

      setFormData({
        from_name: '',
        from_email: '',
        message: '',
      })
    } catch (error) {
      console.error('EmailJS error:', error)

      setStatus({
        type: 'error',
        message:
          'Unable to send your message. Please try again or contact me through LinkedIn.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: smoothEase }}
      viewport={{ once: false, amount: 0.2 }}
      className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 md:p-8 flex flex-col h-full"
    >
      {/* HEADER */}
      <motion.div
        variants={fieldVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        transition={{ delay: 0.05 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Get In Touch
        </h2>

        <p className="text-sm text-white/50 mb-7">
          I'm open to Java Full Stack Developer opportunities,
          collaborations, and interesting projects. Feel free to reach out.
        </p>
      </motion.div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NAME */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />

            <input
              type="text"
              name="from_name"
              placeholder="Your Name"
              autoComplete="name"
              required
              maxLength={100}
              value={formData.from_name}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  from_name: event.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40"
            />
          </div>
        </motion.div>

        {/* EMAIL */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.16 }}
        >
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />

            <input
              type="email"
              name="from_email"
              placeholder="Your Email"
              autoComplete="email"
              required
              maxLength={254}
              value={formData.from_email}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  from_email: event.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40"
            />
          </div>
        </motion.div>

        {/* MESSAGE */}
        <motion.div
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.22 }}
        >
          <div className="relative">
            <MessageSquare className="absolute left-4 top-5 text-white/40" />

            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              required
              maxLength={5000}
              value={formData.message}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  message: event.target.value,
                })
              }
              className="w-full rounded-2xl border border-white/15 bg-black/20 pl-12 pr-4 py-4 outline-none resize-none transition duration-200 focus:border-white focus:ring-1 focus:ring-white/40"
            />
          </div>
        </motion.div>

        {/* STATUS MESSAGE */}
        {status && (
          <p
            role="status"
            aria-live="polite"
            className={
              status.type === 'success'
                ? 'text-sm text-green-400'
                : 'text-sm text-red-400'
            }
          >
            {status.message}
          </p>
        )}

        {/* BUTTON */}
        <motion.button
          type="submit"
          disabled={isSending}
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.28 }}
          whileHover={
            isSending
              ? {}
              : { scale: 1.06, transition: { duration: 0.12 } }
          }
          whileTap={isSending ? {} : { scale: 0.97 }}
          className="w-full rounded-2xl py-4 bg-white/10 border border-white/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={16} />
          {isSending ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>

      {/* SOCIAL */}
      <div className="border-t border-white/10 pt-5 mt-6">
        <motion.p
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.34 }}
          className="text-sm text-white/55 mb-4"
        >
          Connect With Me
        </motion.p>

        {/* LINKEDIN */}
        <motion.a
          href="https://www.linkedin.com/in/pradeep-k-1b99002a2/"
          target="_blank"
          rel="noopener noreferrer"
          variants={fieldVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          transition={{ delay: 0.36 }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.12 },
          }}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4 mb-3 flex items-center justify-between"
        >
          <div className="absolute inset-0 bg-white/[0.04] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

          <div className="relative z-10 flex items-center gap-3">
            <FaLinkedinIn />

            <div>
              <p className="text-sm font-medium">LinkedIn</p>
              <p className="text-xs text-white/35">
                Connect professionally
              </p>
            </div>
          </div>

          <div className="relative z-10 opacity-0 group-hover:opacity-100 transition">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </motion.a>

        {/* SOCIAL LINKS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socialLinks.map((item, i) => {
            const Icon = item.icon

            return (
              <motion.a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={fieldVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                transition={{ delay: 0.42 + i * 0.05 }}
                whileHover={{
                  scale: 1.06,
                  transition: { duration: 0.12 },
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-3 flex items-center justify-between"
              >
                <div className="absolute inset-0 bg-white/[0.04] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

                <div className="relative z-10 flex items-center gap-3">
                  <Icon />

                  <div>
                    <p className="text-sm">{item.title}</p>
                    <p className="text-[11px] text-white/35">
                      {item.user}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 opacity-0 group-hover:opacity-100 transition">
                  <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
