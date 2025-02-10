import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative pt-32 pb-10 lg:pb-20 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-transparent dark:from-gray-900 dark:via-gray-800 dark:to-black pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold py-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            >
              Seamless Event Management
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-muted-foreground py-2 max-w-lg"
            >
              Elevate your events with AI-powered scheduling, automated
              reminders, and real-time collaboration—effortlessly.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/20 dark:shadow-blue-500/20 hover:opacity-90 transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/events")}
              >
                Get Started
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent-foreground/20 rounded-3xl blur-3xl" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/events.png"
                alt="Event Planning"
                className="rounded-3xl bg-transparent transform hover:scale-105 transition-all duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
