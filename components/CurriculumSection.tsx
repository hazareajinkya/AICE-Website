'use client';

import { motion } from 'framer-motion';

const levels = [
  {
    level: "01",
    title: "The Visionary",
    subtitle: "Understanding the AI Landscape",
    description: "Master the fundamentals of Generative AI and how it reshapes business models. Learn to see opportunities where others see chaos.",
    tags: ["Strategy", "Forecasting", "Ethics"]
  },
  {
    level: "02",
    title: "The Architect",
    subtitle: "Building the Infrastructure",
    description: "Design the teams, tools, and workflows needed to implement AI at scale. Move from individual pilots to organizational transformation.",
    tags: ["Operations", "Hiring", "Stack"]
  },
  {
    level: "03",
    title: "The Commander",
    subtitle: "Leading the Revolution",
    description: "Secure your legacy. Drive industry-wide change and position your organization as the market leader in the new era.",
    tags: ["Legacy", "Market Dominance", "Future"]
  },
];

export default function CurriculumSection() {
  return (
    <section className="bg-black py-24 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="font-heading text-6xl md:text-8xl text-white uppercase opacity-20 hover:opacity-100 transition duration-500 cursor-default">
              Levels
            </h2>
            <p className="font-mono text-neon-cyan text-xs tracking-widest mt-2">
              THE PATH TO MASTERY
            </p>
          </div>
          <button className="border border-white/20 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition">
            Download Syllabus
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {levels.map((lvl, index) => (
            <motion.div
              key={lvl.level}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group border border-white/10 p-8 hover:bg-white/5 transition duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20 font-heading text-9xl leading-none group-hover:text-neon-green transition duration-500 select-none">
                {lvl.level}
              </div>
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                <div>
                  <h3 className="font-heading text-3xl uppercase tracking-wide group-hover:text-neon-cyan transition">
                    {lvl.title}
                  </h3>
                  <p className="text-gray-500 font-serif italic mt-2">
                    {lvl.subtitle}
                  </p>
                  <p className="text-gray-400 text-sm mt-6 leading-relaxed">
                    {lvl.description}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {lvl.tags.map(tag => (
                    <span key={tag} className="text-[10px] border border-white/20 px-3 py-1 uppercase tracking-widest text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

