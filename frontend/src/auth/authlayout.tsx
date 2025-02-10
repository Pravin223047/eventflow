import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900" />
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/5 dark:to-purple-400/5"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: Math.random() * 100 + 50 + "px",
            height: Math.random() * 100 + 50 + "px",
          }}
        />
      ))}

      <Button
        onClick={() => navigate(-1)}
        className="absolute bg-black dark:bg-white dark:hover:bg-slate-200  top-4 right-4 flex items-center justify-center text-gray-100 dark:text-gray-800 hover:text-gray-200 dark:hover:text-gray-900 focus:outline-none"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>

      <div className="w-full max-w-md relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-10 h-10 text-blue-500 dark:text-blue-400" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold mb-2 gradient-text">{title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
            </motion.div>

            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
