import { motion } from "framer-motion";
import { Edit2, Trash2, Calendar, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { Event } from "@/types";
import { format } from "date-fns";
import { useAuthStore } from "@/store/authStore";
import { useCallback, useEffect } from "react";
import SharePopup from "../Share";

interface EventCardProps {
  event: Event;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const EventCard = ({ event, onEdit, onDelete }: EventCardProps) => {
  const navigate = useNavigate();

  const { user, checkAuth } = useAuthStore();

  const verifyAuth = useCallback(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  const handleViewDetails = () => {
    navigate(`/event/${event._id}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        <div className="relative group">
          {/* Image with skeleton loading */}
          <div className="aspect-video bg-muted animate-pulse">
            <motion.img
              src={event.eventImage}
              alt={event.title}
              className="w-full h-full object-top object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onLoad={(e) => {
                (e.target as HTMLElement).parentElement?.classList.remove(
                  "animate-pulse"
                );
              }}
            />
          </div>

          {/* Admin Actions Overlay */}
          {user && event.email && user.email === event.email && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <motion.div
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit?.(event._id)}
                  className="text-primary hover:text-primary/80"
                >
                  <Edit2 className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete?.(event._id)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          )}
        </div>

        <div className="p-4 space-y-4">
          <div className="flex w-full items-center justify-between">
            <h3 className="font-semibold text-lg">{event.title}</h3>
            <div className="flex gap-2 items-center py-2">
              <Badge className="inline-block text-xs rounded-full bg-fuchsia-200 text-fuchsia-900 hover:bg-fuchsia-300">
                {event.domain}
              </Badge>
              <Badge className="inline-block text-xs rounded-full bg-green-200 text-green-900 hover:bg-green-300">
                free
              </Badge>
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {event?.date?.[0]?.[0] && (
                  <>
                    {format(new Date(event.date[0][0].from), "LLL dd, y")}
                    {event.date[0][0].to
                      ? ` to ${format(
                          new Date(event.date[0][0].to),
                          "LLL dd, y"
                        )}`
                      : ""}
                    {event.time ? ` - ${event.time}` : ""}
                  </>
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>
                {event.address}, {event.location[0].city},{" "}
                {event.location[0].state}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>
                By{" "}
                <span className="font-semibold text-blue-700">
                  {event.speakers[0].name}
                </span>
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              className={cn(
                "flex-1 rounded-md",
                "bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:opacity-70"
              )}
            >
              Buy Tickets
            </Button>
            <Button
              className="bg-gradient-to-r rounded-md from-orange-500 to-orange-700  text-white hover:opacity-70 flex-1"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
            <SharePopup event={event} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default EventCard;
