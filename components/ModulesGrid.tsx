'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const modules = [
  {
    id: 1,
    title: "AI Landscape Navigation",
    description: "Understand the chaotic sea of modern technology and find your bearings.",
    image: "/images/modules/Scene 1 - The Tech leadr confsued in the vast sea of knowledge .png",
  },
  {
    id: 2,
    title: "Strategic Resource Management",
    description: "Identify key tasks and structure your organization's AI approach.",
    image: "/images/modules/Scene 2 - The tach leader looks at the so many task and so many work representation by tree.png",
  },
  {
    id: 3,
    title: "Identifying Opportunities",
    description: "Spot the 'Blue Glow' moments where AI can revolutionize your workflow.",
    image: "/images/modules/Scene 3- the leopard the blue glow one comes and looks at the leader.. he is the representation of AI that could help leader.png",
  },
  {
    id: 4,
    title: "Strategic Alignment",
    description: "Align your vision with the capabilities of generative AI.",
    image: "/images/modules/Scene 4- the leader eye contacts with leaopard the ai .png",
  },
  {
    id: 5,
    title: "Data-Driven Analysis",
    description: "Deep dive into your organization's 'veins' to optimize data flow.",
    image: "/images/modules/Scene 5 - teh leopard comes beside the leader and tehy analyse their thick forest veins.png",
  },
  {
    id: 6,
    title: "Accelerated Implementation",
    description: "Move from planning to execution with confidence and speed.",
    image: "/images/modules/Scene 6 - The leader starts runnign with confidence with leopard and teh veins starts to resolve with blue glow - representing that the ai is solving teh leaders big problem.png",
  },
  {
    id: 7,
    title: "The Flow State",
    description: "Achieve seamless integration between human leadership and AI execution.",
    image: "/images/modules/Scene 7 - the leader and leopard runs and the veins starts solving and they have way .png",
  },
  {
    id: 8,
    title: "Exponential Momentum",
    description: "Scale your operations at a speed previously impossible.",
    image: "/images/modules/scene 8 - the leader starts runnigna with leopard.. showing that with ai he is growin with speed .png",
  },
  {
    id: 9,
    title: "The Destination",
    description: "Visualize the ultimate goal: A Center of Excellence.",
    image: "/images/modules/Scene 9 - A fores tocnference room type where the throne is empty , it is the destination of leader .png",
  },
  {
    id: 10,
    title: "Industry Recognition",
    description: "Lead the market and be recognized as a pioneer.",
    image: "/images/modules/Scene 10- All leader s welcome our leader with leopard showing. how ai can help in getting recognition.png",
  },
  {
    id: 11,
    title: "Executive Authority",
    description: "Take your rightful place at the top of the AI revolution.",
    image: "/images/modules/scene 11- the leader sits with leopard on teh throne showing that with ai you can go on the top.png",
  },
  {
    id: 12,
    title: "Legacy & Leadership",
    description: "Secure your legacy as a visionary leader in the age of AI.",
    image: "/images/modules/scene 12 - the lader is sitting at. the top means a th the throne woth leopard the ai.png",
  },
];

export default function ModulesGrid() {
  return (
    <section className="bg-black py-24 px-6 md:px-12 lg:px-16 text-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-none font-bold tracking-tighter text-white uppercase">
            THE SKILLS.
          </h2>
        </motion.div>

        {/* Grid - Left/Right: Image top, Text bottom | Middle: Text top, Image bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 lg:gap-y-16 items-start">
          {modules.slice(0, 9).map((module, index) => {
            // Determine column position (0 = left, 1 = middle, 2 = right)
            const columnIndex = index % 3;
            const isMiddleColumn = columnIndex === 1;
            
            // Text block component
            const TextBlock = (
              <div className="flex flex-col gap-3 w-full">
                <h3 className="text-white leading-tight">
                  <span className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mr-3 inline-block">
                    {String(module.id).padStart(2, '0')}.
                  </span>
                  <span className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold inline-block">
                    {module.title}
                  </span>
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed font-sans mt-2">
                  {module.description}
                </p>
              </div>
            );

            // Image component - smaller size
            const ImageBlock = (
              <div className="w-full flex justify-start">
                <div className="relative aspect-[3/4] w-[85%] overflow-hidden">
                  <Image
                    src={module.image}
                    alt={module.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            );
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative flex flex-col items-start"
              >
                {isMiddleColumn ? (
                  <>
                    {/* Middle column: Text first, then Image */}
                    {TextBlock}
                    <div className="mt-6 w-full">
                      {ImageBlock}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Left and Right columns: Image first, then Text */}
                    <div className="w-full">
                      {ImageBlock}
                    </div>
                    <div className="mt-6 w-full">
                      {TextBlock}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Module 10 - Special Full-Width Layout with Text Overlay */}
        {modules.slice(9, 10).map((module) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="mt-12 lg:mt-16 relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden group"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={module.image}
                alt={module.title}
                fill
                sizes="100vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Text Overlay - Bottom Left */}
            <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-12 z-10 max-w-2xl">
              <div className="flex flex-col gap-4">
                <h3 className="text-white leading-tight">
                  <span className="font-heading text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter mr-3 inline-block">
                    {String(module.id).padStart(2, '0')}.
                  </span>
                  <span className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold inline-block">
                    {module.title}
                  </span>
                </h3>
                <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed font-sans">
                  {module.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

