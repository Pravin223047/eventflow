import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

interface EventScheduleProps {
  setFormattedScheduledData: (data: any) => void;
  setSuccess: (success: boolean) => void;
}
const EventSchedule: React.FC<EventScheduleProps> = ({
  setFormattedScheduledData,
  setSuccess,
}) => {
  const [features, setFeatures] = useState<string[]>([]);
  const [currentFeatures, setcurrentFeatures] = useState("");
  const [highlights, setHighlights] = useState<string[]>([]);
  const [currentHighlights, setCurrentHighlights] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleHashtagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (currentFeatures && !features.includes(currentFeatures)) {
        setFeatures([...features, currentFeatures]);
        setcurrentFeatures("");
        if (features.length + 1 >= 4) setError(null);
      }
    }
  };

  const handleHighlightsKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (currentHighlights && !highlights.includes(currentHighlights)) {
        setHighlights([...highlights, currentHighlights]);
        setCurrentHighlights("");
      }
    }
  };

  const removeFeatures = (tag: string) => {
    const updatedfeatures = features.filter((t) => t !== tag);
    setFeatures(updatedfeatures);
    if (updatedfeatures.length < 4) {
      setError("At least 4 items are required.");
    }
  };

  const removeHighlights = (tag: string) => {
    setHighlights(highlights.filter((t) => t !== tag));
  };

  const handleSave = () => {
    if (features.length < 4) {
      setError("At least 4 items are required.");
    } else {
      setError(null);
      setFormattedScheduledData([features, highlights]);
      setSuccess(true);
      toast.success("Data saved successfully!");

      setFeatures([]);
      setcurrentFeatures("");
      setHighlights([]);
      setCurrentHighlights("");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm">Highlights (Optional)</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {highlights.map((tag) => (
              <motion.span
                key={tag}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="relative text-white bg-orange-600 px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2"
              >
                {tag}
                <span
                  className="absolute -top-1 -right-1 cursor-pointer bg-rose-500 border border-white h-3 w-3 rounded-full"
                  onClick={() => removeHighlights(tag)}
                ></span>
              </motion.span>
            ))}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Input
              placeholder="Add 0+ Industry Experts, Interactive Workshops, etc..."
              value={currentHighlights}
              onChange={(e) => setCurrentHighlights(e.target.value)}
              onKeyDown={handleHighlightsKeyDown}
            />
            <p className="text-xs px-2"> Press Enter or Space to add tags</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">What's Included *</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {features.map((tag) => (
              <motion.span
                key={tag}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="relative text-white bg-orange-600 px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2"
              >
                {tag}
                <span
                  className="absolute -top-1 -right-1 cursor-pointer bg-rose-500 border border-white h-3 w-3 rounded-full"
                  onClick={() => removeFeatures(tag)}
                ></span>
              </motion.span>
            ))}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Input
              placeholder="Add Premium refreshments, High-speed WiFi, etc..."
              value={currentFeatures}
              onChange={(e) => setcurrentFeatures(e.target.value)}
              onKeyDown={handleHashtagKeyDown}
            />
            <p className="text-xs px-2"> Press Enter or Space to add tags</p>
          </div>
          {error && features.length < 4 && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex w-full justify-end">
        <Button onClick={handleSave}>Save Event</Button>
      </div>
    </div>
  );
};

export default EventSchedule;
