import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  Ticket,
  Star,
  // Coffee,
  // Wifi,
  // Camera,
  // Music,
  // Utensils,
  // Gift,
  // BookOpen,
  Download,
  StarIcon,
  Sparkle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import useEventStore from "@/store/eventStore";
import { Event } from "@/types";
import { format } from "date-fns";
import SharePopup from "../SharePopup";

const EventDetails = () => {
  const { eventId } = useParams();
  const { events, isLoading, fetchEvents } = useEventStore(); // Use isLoading
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState<
    "early" | "regular" | "vip"
  >("early");
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (events.length === 0) {
      fetchEvents(); // Fetch events if they are not available
    }
  }, [fetchEvents, events]);

  useEffect(() => {
    const foundEvent = events.find((e) => e._id === eventId);
    if (foundEvent) setEvent(foundEvent);
  }, [eventId, events]);

  if (isLoading || !event)
    return (
      <p className="text-center text-gray-500">Loading event details...</p>
    );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const ticketVariants = {
    selected: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 },
    },
    unselected: {
      scale: 1,
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      transition: { duration: 0.3 },
    },
  };
  type EventDate = {
    from: string;
    to?: string;
  };

  const handleDownload = (imageUrl: string, index: number) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `eventflowimage-${index + 1}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Download failed:", error));
  };

  const eventDate = event?.date?.[0] as EventDate | undefined;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 transition-colors duration-200">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-transparent hover:text-purple-600 dark:hover:text-purple-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Button>
            <div className="flex items-center gap-4">
              <SharePopup event={event} />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {/* Hero Section */}
          <motion.div
            variants={itemVariants}
            className="relative h-[500px] rounded-2xl overflow-hidden mb-12 group"
          >
            <img
              src={event.eventThumbnail}
              alt={event.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="bg-purple-500/80 hover:bg-purple-600/80">
                  {event.domain}
                </Badge>
                <Badge className="bg-green-500/80 hover:bg-green-600/80">
                  {event.capacity}
                </Badge>
              </div>
              <h1 className="text-5xl font-bold mb-2 leading-tight">
                {event.title}
              </h1>
              <p className="text-xl text-gray-200 mb-6">{event.subtitle}</p>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <span className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Calendar className="h-4 w-4" />
                  {eventDate && (
                    <>
                      {format(new Date(eventDate.from), "LLL dd, y")}
                      {eventDate.to
                        ? ` to ${format(new Date(eventDate.to), "LLL dd, y")}`
                        : ""}
                      {event.time ? ` - ${event.time}` : ""}
                    </>
                  )}
                </span>
                <span className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <Clock className="h-4 w-4" />
                  {event.time}
                </span>
                <span className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <MapPin className="h-4 w-4" />
                  {event.address}, {event.location[0].city},{" "}
                  {event.location[0].state}, {event.location[0].country}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Event Highlights */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {event.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-md p-4 w-full flex items-center justify-center transform hover:-translate-y-1 transition-transform duration-300"
                >
                  <p className="font-medium text-sm text-purple-600 dark:text-purple-400">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <motion.div variants={itemVariants}>
                <Card className="p-4 md:p-8 hover:shadow-lg transition-shadow duration-300">
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    About the Event
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {event.description}
                  </p>
                </Card>
              </motion.div>

              {/* Gallery Section */}
              {event.eventTypeImages.length > 0 && (
                <motion.div variants={itemVariants}>
                  <Card className="p-4 md:p-8">
                    <h2 className="text-2xl font-semibold mb-6">
                      Event Gallery
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {event.eventTypeImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg overflow-hidden group cursor-pointer"
                        >
                          <img
                            src={image}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                          <div
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                            onClick={() => handleDownload(image, index)}
                          >
                            <Download className="text-white h-6 w-6 cursor-pointer" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Agenda Section */}
              <motion.div variants={itemVariants}>
                <Card className="py-4 px-6">
                  <h2 className="text-2xl font-semibold mb-6">
                    Event Schedule
                  </h2>
                  <div className="space-y-6">
                    {event.agenda.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-4 md:p-8 before:w-px before:h-full before:bg-purple-200 dark:before:bg-purple-800 last:before:h-0"
                        >
                          <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                            <StarIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 ml-4 hover:shadow-md transition-shadow">
                            <div className="font-medium text-purple-600 dark:text-purple-400 mb-1">
                              {item.time}
                            </div>
                            <h3 className="font-semibold text-lg mb-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Ticket Pricing */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-6">
                    Select Your Ticket
                  </h2>
                  <div className="space-y-4">
                    <AnimatePresence>
                      {["early", "regular", "vip"].map((type) => (
                        <motion.div
                          key={type}
                          variants={ticketVariants}
                          initial="unselected"
                          animate={
                            selectedTicket === type ? "selected" : "unselected"
                          }
                          className={cn(
                            "p-4 rounded-xl cursor-pointer border-2 transition-colors",
                            selectedTicket === type
                              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                              : "border-transparent bg-gray-50 dark:bg-gray-800/50"
                          )}
                          onClick={() =>
                            setSelectedTicket(type as typeof selectedTicket)
                          }
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <h3 className="font-semibold capitalize">
                                {type === "early"
                                  ? "Early Bird"
                                  : type === "vip"
                                  ? "VIP Access"
                                  : "Regular"}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {type === "early"
                                  ? "Limited availability"
                                  : type === "vip"
                                  ? "Full access + perks"
                                  : "Standard access"}
                              </p>
                            </div>
                            <Badge
                              variant="secondary"
                              className={cn(
                                "text-lg px-3 py-1",
                                selectedTicket === type &&
                                  "bg-purple-200 dark:bg-purple-800"
                              )}
                            >
                              ${event.price[type as keyof typeof event.price]}
                            </Badge>
                          </div>
                          {selectedTicket === type && (
                            <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90">
                              <Ticket className="h-4 w-4 mr-2" />
                              Get Your Ticket
                            </Button>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Features */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-4">What's Included</h3>
                    <ul className="space-y-3">
                      {event.features.map((feature, index) => {
                        return (
                          <li
                            key={index}
                            className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                          >
                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
                              <Sparkle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            {feature.text}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Contact Information */}
                  <motion.div variants={itemVariants}>
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h2 className="text-xl font-semibold mb-4">
                        Contact Information
                      </h2>
                      <div className="space-y-4">
                        <a
                          href={`mailto:${event.contact.email}`}
                          className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400"
                        >
                          <Mail className="h-5 w-5" />
                          {event.contact.email}
                        </a>
                        <a
                          href={`tel:${event.contact.phone}`}
                          className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400"
                        >
                          <Phone className="h-5 w-5" />
                          {event.contact.phone}
                        </a>
                        <a
                          href={`https://${event.contact.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400"
                        >
                          <Globe className="h-5 w-5" />
                          {event.contact.website}
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Support Card */}
                  <motion.div variants={itemVariants}>
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="bg-gradient-to-br from-purple-500/10 to-purple-700/10 py-2 dark:from-purple-500/20 dark:to-purple-700/20 p-6">
                        <h3 className="text-lg font-semibold mb-2">
                          Need Help?
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                          Have questions about the event? Our support team is
                          here to help.
                        </p>
                        <Button
                          variant="outline"
                          className="w-full bg-white/50 dark:bg-gray-800/50 gap-2"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Contact Support
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            </div>
          </div>
          {/* Speakers Section */}
          <motion.div variants={itemVariants} className="mt-8">
            <Card className="p-4 md:p-8">
              <h2 className="text-2xl font-semibold mb-6">Featured Speakers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.speakers.map((speaker, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={speaker.imageUrl}
                          alt={speaker.name}
                          className="w-20 h-20 rounded-xl object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full px-2 py-1">
                          ★ {speaker.rating}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {speaker.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {speaker.role}
                        </p>
                        <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">
                          {speaker.company}
                        </p>
                        <p className="text-sm font-medium">
                          Speaking on: {speaker.topic}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          {/* Testimonials */}
          {event.testimonials.length > 0 && (
            <motion.div variants={itemVariants} className="mt-8">
              <Card className="p-4 md:p-8">
                <h2 className="text-2xl font-semibold mb-6">
                  What Attendees Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {event.testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl"
                    >
                      <div className="flex items-center gap-2 mb-4 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-purple-600 dark:text-purple-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-4 md:p-8 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-lg mb-6 text-purple-100">
              Secure your spot at the most anticipated tech event of the year
            </p>
            <Button className="bg-white text-purple-600 hover:bg-purple-50 transition-colors px-8 py-6 text-lg font-semibold">
              <Ticket className="h-5 w-5 mr-2" />
              Register Now
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default EventDetails;
