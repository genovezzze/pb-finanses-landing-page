'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'

export type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
  photo?: string
}

export const TestimonialsColumn = (props: {
  className?: string
  testimonials: Testimonial[]
  duration?: number
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: '-50%',
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ quote, name, role, initials, photo }, i) => (
                <div
                  className="p-7 rounded-sm border border-parchment-rule border-l-2 border-l-[#B8923A] bg-canvas-white max-w-xs w-full"
                  key={i}
                >
                  <p className="font-body text-[15px] italic text-graphite leading-relaxed">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-parchment-rule">
                    {photo ? (
                      <Image
                        src={photo}
                        alt={name}
                        width={40}
                        height={40}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 shrink-0 rounded-full bg-parchment-wash flex items-center justify-center font-display text-base text-gilt">
                        {initials}
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div className="font-display text-base text-ink-black leading-5">
                        {name}
                      </div>
                      <div className="font-body text-xs text-stone leading-5">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  )
}
