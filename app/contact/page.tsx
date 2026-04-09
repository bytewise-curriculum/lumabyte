'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'

type FormData = {
  name: string
  email: string
  company: string
  message: string
}

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = async (data: FormData) => {
    // TODO: wire to email provider (Resend, etc.) in production
    console.log('Form submitted:', data)
    setSubmitted(true)
    reset()
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <span className="text-xs uppercase tracking-widest text-accent font-semibold">Contact</span>
      <h1 className="font-geist text-4xl font-bold text-foreground mt-3 mb-4">
        Let&apos;s Talk
      </h1>
      <p className="text-muted mb-12">
        Tell us about your project. We&apos;ll get back to you within one business day.
      </p>

      {submitted ? (
        <div className="bg-success/10 border border-success/30 rounded-xl p-8 text-center">
          <p className="font-semibold text-foreground">Message received!</p>
          <p className="text-sm text-muted mt-2">We&apos;ll be in touch within one business day.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
              Name *
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              placeholder="Your name"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
              Email *
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
              })}
              type="email"
              className="w-full border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              placeholder="you@company.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
              Company
            </label>
            <input
              {...register('company')}
              className="w-full border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              placeholder="Company name (optional)"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
              Message *
            </label>
            <textarea
              {...register('message', { required: 'Message is required' })}
              rows={5}
              className="w-full border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
              placeholder="Tell us about your project..."
            />
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-accent text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  )
}
