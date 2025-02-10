import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Moon, Plus, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/events/event-card";
import EventFilters from "@/components/events/event-filters";
import Modal from "@/components/Modal";
import useEventStore from "@/store/eventStore";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const EventsPage = () => {
  const [filters, setFilters] = useState<any>({
    search: "",
    domain: "",
    location: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState<"edit" | "delete" | null>(null);

  const navigate = useNavigate();
  const { user, logout, checkAuth } = useAuthStore();

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return localStorage.getItem("theme") === "dark" ? "dark" : "light";
  });
  const { fetchEvents, events, deleteEvent } = useEventStore(); // Fetch & delete events

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const verifyAuth = useCallback(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleEdit = () => {
    setIsModalOpen(true);
    setIsOpen(false);
  };

  const handleDelete = async () => {
    if (selectedEvent?._id) {
      try {
        await deleteEvent(selectedEvent._id);
        toast.success("Event deleted successfully!");
        fetchEvents();
      } catch (error) {
        toast.error("Failed to delete the event.");
      }
    }
    setIsOpen(false);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      !filters.search ||
      event.title.toLowerCase().includes(filters.search.toLowerCase());

    const matchesDomain =
      !filters.domain ||
      (typeof event.domain === "string" &&
        event.domain.toLowerCase() === filters.domain.toLowerCase());

    const matchesLocation =
      !filters.location ||
      event.location.some((loc: any) => loc.city === filters.location);

    const matchesDate =
      !filters.date ||
      event.date.some(
        (dateObj: { from: string; to?: string }) =>
          new Date(dateObj.from).toDateString() ===
          new Date(filters.date).toDateString()
      );

    return matchesSearch && matchesDomain && matchesLocation && matchesDate;
  });
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt).getTime();
    const dateB = new Date(b.updatedAt || b.createdAt).getTime();
    return dateB - dateA;
  });

  return (
    <>
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Calendar className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">EventFlow</span>
          </div>
          <nav className="flex items-center space-x-4">
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profilePic || "/default-avatar.png"}
                      alt="User Avatar"
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/signin">
                <Button
                  size="sm"
                  className="w-full px-8 bg-gradient-to-r from-purple-500 text-white to-purple-700 hover:opacity-90"
                >
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Events</h1>
          <div className="flex items-center justify-between md:justify-end w-full gap-4">
            <EventFilters onFilterChange={handleFilterChange} events={events} />
            {user && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-gradient-to-r from-purple-500 text-white to-purple-700 hover:opacity-90"
                  onClick={() => {
                    setSelectedEvent(null);
                    setIsModalOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {sortedEvents.length > 0 ? (
              sortedEvents.map((event) => {
                const eventData = {
                  ...event,
                  id: event._id,
                  date:
                    typeof event.date === "object"
                      ? [
                          event.date as unknown as {
                            from: string;
                            to: string;
                          },
                        ]
                      : [{ from: event.date, to: event.date }],
                };

                return (
                  <EventCard
                    key={eventData.id}
                    event={eventData}
                    onEdit={() => {
                      setSelectedEvent(eventData);
                      setActionType("edit");
                      setIsOpen(true);
                    }}
                    onDelete={() => {
                      setSelectedEvent(eventData);
                      setActionType("delete");
                      setIsOpen(true);
                    }}
                  />
                );
              })
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No events found.
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
        />
      )}

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "edit" ? "Edit Event" : "Delete Event"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "edit"
                ? "Are you sure you want to edit this event?"
                : "Are you sure you want to delete this event? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-end gap-2">
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button
              variant={actionType === "delete" ? "destructive" : "default"}
              onClick={actionType === "edit" ? handleEdit : handleDelete}
            >
              {actionType === "edit" ? "Confirm Edit" : "Confirm Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EventsPage;
