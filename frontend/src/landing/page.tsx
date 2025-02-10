import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

import Footer from "./Footer";
import { useAuthStore } from "@/store/authStore";
import WhyChooseEventFlow from "./WhyChooseEventFlow";
import HeroSection from "./HeroSection";
import Header from "./Header";

function EventPage() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });

  const { user, logout, checkAuth } = useAuthStore();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const verifyAuth = useCallback(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent">
      <main className={cn("min-h-screen transition-all duration-200")}>
        <Header user={user} logout={logout} />
        <HeroSection />
        <WhyChooseEventFlow />
        <Footer />
        <motion.div
          className="fixed bottom-4 right-4 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </motion.div>
      </main>
    </div>
  );
}

export default EventPage;
