import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import TitleForm from "@/Forms/TitleForm";
import ImageForm from "@/Forms/ImageForm";
import FeaturedSpeakerForm from "@/Forms/FeaturedSpeakerForm";
import EventSchedule from "@/Forms/EventSchedule";
import { Button } from "./ui/button";
import useEventStore from "@/store/eventStore";
import toast from "react-hot-toast";
import EventCompletePage from "@/Forms/EventCompletePage";
import EventContactPage from "@/Forms/EventContactPage";
import AgendaForm from "@/Forms/AgendaForm";

const transformEventData = (dataArray: any[]) => {
  return {
    email: dataArray[0].email || "",
    title: dataArray[0]?.title || "",
    subtitle: dataArray[0]?.subtitle || "",
    description: dataArray[0]?.description || "",
    domain: dataArray[0]?.domain || "",
    address: dataArray[0]?.address || "",
    date: dataArray[0]?.date || [],
    time: dataArray[0].time || "",
    capacity: dataArray[0]?.capacity || 100,
    location: dataArray[0]?.location || [],
    eventImage: dataArray[1]?.eventImage || "",
    eventThumbnail: dataArray[1]?.eventThumbnail || "",
    eventTypeImages: dataArray[1]?.eventTypeImages || [],
    speakers:
      dataArray[2] && Array.isArray(dataArray[2])
        ? dataArray[2].map((speaker) => ({
            name: speaker.name || "",
            role: speaker.role || "",
            company: speaker.company || "",
            imageUrl: speaker.imageUrl || "",
            topic: speaker.topic || "",
            rating: speaker.rating || 0,
          }))
        : [],

    features:
      Array.isArray(dataArray[3]) && dataArray[3].length > 0
        ? dataArray[3].map((feature: any) => String(feature))
        : [],

    highlights: dataArray[4] && Array.isArray(dataArray[4]) ? dataArray[4] : [],

    contact: dataArray[5]
      ? {
          email: dataArray[5].email || "",
          phone: dataArray[5].contact || "",
          website: dataArray[5].website || "",
        }
      : {},

    price: dataArray[5]
      ? {
          early: dataArray[5].earlyBirdTickets || 0,
          regular: dataArray[5].regularTickets || 0,
          vip: dataArray[5].vipTickets || 0,
        }
      : {
          early: 0,
          regular: 0,
          vip: 0,
        },

    agenda:
      dataArray[6] && Array.isArray(dataArray[6])
        ? dataArray[6].map((agenda) => ({
            title: agenda.title || "",
            description: agenda.description || "",
            time: agenda.time || "",
            icon: agenda.icon || "",
          }))
        : [],
  };
};

const Modal = ({
  isModalOpen,
  onClose,
}: {
  isModalOpen: boolean;
  onClose: () => void;
}) => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const totalSteps = 8;

  const [success, setSuccess] = useState(false);
  const [formattedMainData, setFormattedMainData] = useState<any[]>([]);
  const [formattedData, setFormattedData] = useState<any[]>([]);
  const [formattedImageData, setFormattedImageData] = useState<any[]>([]);
  const [formattedSpeakerData, setFormattedSpeakerData] = useState<any[]>([]);
  const [formattedContactData, setFormattedContactData] = useState<any[]>([]);
  const [formattedAgendaData, setFormattedAgendaData] = useState<any[]>([]);
  const [formattedScheduledData, setFormattedScheduledData] = useState<any[]>(
    []
  );
  useEffect(() => {
    setFormattedMainData([
      ...formattedData,
      ...formattedImageData,
      [...formattedSpeakerData],
      ...formattedScheduledData,
      ...formattedContactData,
      [...formattedAgendaData],
    ]);
  }, [
    formattedData,
    formattedImageData,
    formattedSpeakerData,
    formattedScheduledData,
    formattedContactData,
    formattedAgendaData,
  ]);

  useEffect(() => {
    if (success && activeFormIndex < totalSteps) {
      setActiveFormIndex((prev) => prev + 1);
      setSuccess(false);
    }
  }, [success]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isModalOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-hidden={!isModalOpen}
          aria-labelledby="modal-title"
          tabIndex={-1}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 p-6 rounded-md shadow-xl w-full max-w-4xl max-h-full overflow-y-auto relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex flex-col gap-4 w-full pb-4 border-b border-rose-600">
              <div className="w-full flex gap-4 justify-between">
                <h2
                  id="modal-title"
                  className="text-xl text-orange-800 font-semibold dark:text-white"
                >
                  Create an Event
                  <p className="text-sm text-gray-800 dark:text-white flex justify-start pt-2">
                    An <span className="text-rose-600 mx-1">*</span> indicates a
                    required field
                  </p>
                </h2>
                <button
                  onClick={onClose}
                  className="bg-rose-200 text-rose-400 hover:text-rose-500 p-1 w-9 h-9 flex items-center justify-center rounded-full"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Form Sections */}
            <div className="mt-2">
              {activeFormIndex === 1 && (
                <TitleForm
                  setSuccess={setSuccess}
                  setFormattedData={setFormattedData}
                />
              )}
              {activeFormIndex === 2 && (
                <ImageForm
                  setFormattedImageData={setFormattedImageData}
                  setSuccess={setSuccess}
                />
              )}
              {activeFormIndex === 3 && (
                <FeaturedSpeakerForm
                  setFormattedSpeakerData={setFormattedSpeakerData}
                  setSuccess={setSuccess}
                />
              )}
              {activeFormIndex === 4 && (
                <EventSchedule
                  setFormattedScheduledData={setFormattedScheduledData}
                  setSuccess={setSuccess}
                />
              )}
              {activeFormIndex === 5 && (
                <EventContactPage
                  setSuccess={setSuccess}
                  setFormattedContactData={setFormattedContactData}
                />
              )}
              {activeFormIndex === 6 && (
                <AgendaForm
                  setFormattedAgendaData={setFormattedAgendaData}
                  setSuccess={setSuccess}
                />
              )}
              {activeFormIndex === 7 && (
                <div className="flex flex-col items-center mt-6 mb-2 justify-center p-6 bg-white dark:bg-slate-900 shadow-lg rounded-2xl border border-gray-200 dark:border-slate-950">
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-md md:text-xl font-semibold text-gray-800 dark:text-slate-100"
                  >
                    🎉 Everything is Set! Time to Submit 🚀
                  </motion.h2>

                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-2">
                    You've filled in all the details. Click the button below to
                    finalize your event.
                  </p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full mt-5"
                  >
                    <Button
                      onClick={async () => {
                        try {
                          const formattedEvent =
                            transformEventData(formattedMainData);
                          const response = await useEventStore
                            .getState()
                            .addEvent(formattedEvent as any);

                          if (response && response._id) {
                            toast.success("🎉 Event added successfully!");
                            setSuccess(true);
                          } else {
                            toast.error(
                              "❌ Error adding event. Please try again."
                            );
                          }
                        } catch (error) {
                          toast.error(
                            "⚠️ Something went wrong. Please try again later."
                          );
                        }
                      }}
                      className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      🚀 Submit Event
                    </Button>
                  </motion.div>
                </div>
              )}
              {activeFormIndex === 8 && <EventCompletePage onClose={onClose} />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
