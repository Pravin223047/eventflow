import {
  Calendar,
  Users2,
  Clock,
  Rocket,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
export default function WhyChooseEventFlow() {
  const features = [
    {
      icon: (
        <Calendar className="h-10 w-10 text-purple-500 dark:text-purple-400" />
      ),
      title: "AI-Powered Smart Scheduling",
      description:
        "Automate event planning with AI-driven recommendations, conflict detection, and seamless time optimization.",
    },
    {
      icon: <Users2 className="h-10 w-10 text-blue-500 dark:text-blue-400" />,
      title: "Seamless Team Collaboration",
      description:
        "Empower your team with real-time event sharing, role-based access, and instant updates for effortless coordination.",
    },
    {
      icon: <Clock className="h-10 w-10 text-green-500 dark:text-green-400" />,
      title: "Time-Saving Automation",
      description:
        "Automate reminders, guest lists, and follow-ups so you can focus on making your event extraordinary.",
    },
    {
      icon: <Rocket className="h-10 w-10 text-pink-500 dark:text-pink-400" />,
      title: "Fast & Intuitive Interface",
      description:
        "Navigate effortlessly with a modern, minimalistic UI designed for efficiency and ease of use.",
    },
    {
      icon: (
        <ShieldCheck className="h-10 w-10 text-yellow-500 dark:text-yellow-400" />
      ),
      title: "Top-Tier Security & Privacy",
      description:
        "Your data is encrypted end-to-end, ensuring a safe and secure event management experience.",
    },
    {
      icon: <Activity className="h-10 w-10 text-red-500 dark:text-red-400" />,
      title: "Advanced Analytics & Insights",
      description:
        "Gain deep insights into attendance trends, engagement rates, and feedback to enhance future events.",
    },
  ];

  return (
    <section
      id="about"
      className={`relative py-24 px-6 transition-colors dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-900`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1),_transparent)] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-14 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          Why Choose EventFlow?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group p-6 border border-white/20 dark:border-gray-800 backdrop-blur-lg shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-300 relative bg-white dark:bg-gray-800"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-700">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
