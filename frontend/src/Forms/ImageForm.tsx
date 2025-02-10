import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const UPLOAD_PRESET = "eventflow";

interface ImageFormProps {
  setFormattedImageData: (data: any) => void;
  setSuccess: (success: boolean) => void;
}

const ImageForm: React.FC<ImageFormProps> = ({
  setFormattedImageData,
  setSuccess,
}) => {
  const [eventImage, setEventImage] = useState<string | null>(null);
  const [eventThumbnail, setEventThumbnail] = useState<string | null>(null);
  const [eventTypeImages, setEventTypeImages] = useState<string[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[], type: "event" | "thumbnail" | "type") => {
      if (!acceptedFiles.length) return;

      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/healthlinker/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (!data.secure_url) throw new Error("Upload failed");

        if (type === "event") setEventImage(data.secure_url);
        if (type === "thumbnail") setEventThumbnail(data.secure_url);
        if (type === "type") {
          setEventTypeImages((prevImages) => [...prevImages, data.secure_url]);
        }
      } catch (error) {
        toast.error("Image upload failed!");
      }
    },
    []
  );

  const { getRootProps: getEventRootProps, getInputProps: getEventInputProps } =
    useDropzone({
      onDrop: (files) => onDrop(files, "event"),
      accept: { "image/*": [] },
      multiple: false,
    });

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: (files) => onDrop(files, "thumbnail"),
    accept: { "image/*": [] },
    multiple: false,
  });

  const { getRootProps: getTypeRootProps, getInputProps: getTypeInputProps } =
    useDropzone({
      onDrop: (files) => onDrop(files, "type"),
      accept: { "image/*": [] },
      multiple: true,
    });

  const removeImage = (
    type: "event" | "thumbnail" | "type",
    index?: number
  ) => {
    if (type === "event") setEventImage(null);
    if (type === "thumbnail") setEventThumbnail(null);
    if (type === "type" && index !== undefined) {
      setEventTypeImages((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
    }
  };

  const handleSubmit = () => {
    if (!eventImage || !eventThumbnail) {
      toast.error("Event Image and Thumbnail are required!");
      return;
    }

    const formattedData = [
      {
        eventImage,
        eventThumbnail,
        eventTypeImages,
      },
    ];

    setFormattedImageData(formattedData);
    setSuccess(true);
    toast.success("Images saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold pb-2">
            Event Image <span className="text-red-500">*</span>
          </h3>
          <div
            {...getEventRootProps()}
            className="border border-dashed w-full h-[200px] overflow-hidden border-gray-300 dark:border-gray-700 rounded-lg text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {eventImage ? (
              <div className="relative">
                <img
                  src={eventImage}
                  alt="Event"
                  className="w-full h-[200px] object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage("event")}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <input {...getEventInputProps()} />
                <p className="text-gray-500">Drag & drop or click to upload</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold pb-2">
            Event Thumbnail <span className="text-red-500">*</span>
          </h3>
          <div
            {...getThumbnailRootProps()}
            className="border border-dashed w-full h-[200px] overflow-hidden border-gray-300 dark:border-gray-700 rounded-lg text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {eventThumbnail ? (
              <div className="relative">
                <img
                  src={eventThumbnail}
                  alt="Thumbnail"
                  className="w-full h-[200px] object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage("thumbnail")}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <input {...getThumbnailInputProps()} />
                <p className="text-gray-500">Drag & drop or click to upload</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold pb-2">
          Event Type Images (Optional)
        </h3>
        <div
          {...getTypeRootProps()}
          className="border border-dashed border-gray-300 dark:border-gray-700 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <input {...getTypeInputProps()} />
          <p className="text-gray-500">
            Drag & drop or click to upload multiple images
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {eventTypeImages.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Type ${index}`}
                className="w-full h-[150px] object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage("type", index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
};

export default ImageForm;
