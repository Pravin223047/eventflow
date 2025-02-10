import { useState } from "react";
import { Share2, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

const SharePopup = ({
  event,
}: {
  event: {
    _id: string;
    title: string;
    description: string;
    eventTypeImages: string[];
  };
}) => {
  const [open, setOpen] = useState(false);
  const eventUrl = `${window.location.origin}/event/${event._id}`;

  // Use first image if available
  const eventImage =
    event.eventTypeImages.length > 0 ? event.eventTypeImages[0] : "";

  const shareToWhatsApp = () => {
    const message = `*Check out this event!* \n\n *${event.title}*\n\n ${event.description}\n\n ${eventUrl}`;

    if (eventImage) {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          message
        )}%0A%0A${encodeURIComponent(eventImage)}`,
        "_blank"
      );
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }
  };

  const shareToEmail = () => {
    const subject = `Check out this event: ${event.title}`;
    const body = `Hey,\n\nI found this amazing event and thought you might like it!\n\nTitle: ${event.title}\nDescription: ${event.description}\n\n🔗 ${eventUrl}`;

    if (eventImage) {
      window.open(
        `mailto:?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}&attachment=${encodeURIComponent(
          eventImage
        )}`
      );
    } else {
      window.open(
        `mailto:?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex bg-blue-600 hover:bg-blue-700 text-white hover:text-white items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            Share Event
          </DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col space-y-4"
        >
          {eventImage && (
            <motion.img
              src={eventImage}
              alt="Event Preview"
              className="w-full h-40 dark:border-2 dark:border-slate-900 object-cover rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          <Button
            variant="outline"
            className="flex items-center gap-3 w-full justify-center text-lg font-medium text-green-600 border-green-500 dark:bg-green-600 dark:text-white hover:bg-green-100 hover:dark:bg-green-800"
            onClick={shareToWhatsApp}
          >
            <MessageCircle className="h-5 w-5" />
            Share on WhatsApp
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-3 w-full justify-center text-lg font-medium text-blue-600 border-blue-500 dark:bg-blue-600 dark:text-white hover:bg-blue-100 hover:dark:bg-blue-800"
            onClick={shareToEmail}
          >
            <Mail className="h-5 w-5" />
            Share via Email
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default SharePopup;
