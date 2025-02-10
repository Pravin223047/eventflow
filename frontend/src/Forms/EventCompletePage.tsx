import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Info, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface EventCompletePageProps {
  onClose: () => void;
}

export default function EventCompletePage({ onClose }: EventCompletePageProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col w-full items-center justify-center bg-transparent p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-transparent shadow-xl rounded-2xl p-8 text-center max-w-md"
        >
          <motion.img
            src="/success.gif"
            alt="Success"
            className="w-40 h-40 mx-auto rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <h2 className="text-md md:text-2xl font-semibold text-gray-900 dark:text-white mt-4">
            🎉 Event Successfully Completed!
          </h2>
          <p className="text-sm md:text-md text-gray-600 dark:text-gray-300 mt-2">
            Your event has been added and is now live. Let’s make it amazing!
          </p>

          <div className="flex gap-4 mt-6 justify-center">
            <Link to="/events">
              <Button
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={onClose}
              >
                <Info size={18} /> Create Event
              </Button>
            </Link>

            <Link to="/events">
              <Button
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white"
                onClick={onClose}
              >
                <CheckCircle size={18} /> View Event
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
