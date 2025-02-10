import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const schema = (speakersCount: number) => {
  return z.object({
    name:
      speakersCount >= 1
        ? z.string().optional()
        : z.string().min(4, "Speaker name must be at least 4 characters."),

    role:
      speakersCount >= 1
        ? z.string().optional()
        : z
            .string()
            .min(4, "Speaker background must be at least 4 characters."),

    company:
      speakersCount >= 1
        ? z.string().optional()
        : z.string().min(4, "Company name must be at least 4 characters."),

    topic:
      speakersCount >= 1
        ? z.string().optional()
        : z.string().min(1, "Topic is required."),

    imageUrl:
      speakersCount >= 1 ? z.string().optional() : z.string().optional(),

    rating: z.preprocess(
      (val) => (typeof val === "string" ? parseInt(val, 10) : val),
      z.number().min(1, "Rating must be at least 1")
    ),
  });
};

interface SpeakersProps {
  name: string;
  role: string;
  company: string;
  topic: string;
  imageUrl?: string;
  rating: number;
}

interface FeaturedSpeakerFormProps {
  setFormattedSpeakerData: (data: any) => void;
  setSuccess: (success: boolean) => void;
}

const FeaturedSpeakerForm: React.FC<FeaturedSpeakerFormProps> = ({
  setFormattedSpeakerData,
  setSuccess,
}) => {
  const [speakers, setSpeakers] = useState<SpeakersProps[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(schema(speakers.length)),
    defaultValues: {
      name: "",
      role: "",
      company: "",
      topic: "",
      imageUrl: "",
      rating: 1,
    },
    mode: "onBlur",
  });

  const { name, role, company, topic, imageUrl, rating } = form.watch();

  const isAddDisabled =
    !name || !role || !company || !topic || !imageUrl || !rating;

  const isSaveDisabled = speakers.length === 0;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "eventflow"); // Replace with your Cloudinary preset

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/healthlinker/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          setPreviewUrl(data.secure_url);
          form.setValue("imageUrl", data.secure_url);
        } else {
          toast.error("Image upload failed.");
        }
      } catch (error) {
        toast.error("Error uploading image.");
      }
    },
    [form]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const removeImage = () => {
    setPreviewUrl(null);
    form.setValue("imageUrl", "");
  };

  const addSpeaker = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    const data = form.getValues();
    setSpeakers([...speakers, data]);

    setPreviewUrl(null);
    form.reset({
      name: "",
      role: "",
      company: "",
      topic: "",
      imageUrl: "",
      rating: 1,
    });
    form.clearErrors();
  };

  const handleSpeakerSubmit = () => {
    setFormattedSpeakerData((prev: any[]) => {
      const mergedSpeakers = [...prev.flat(), ...speakers];
      return mergedSpeakers;
    });

    setSpeakers([]);
    setSuccess(true);
  };

  return (
    <Form {...form}>
      <form className="w-full space-y-6">
        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="w-full sm:w-[135px]">
            <FormField
              control={form.control}
              name="imageUrl"
              render={() => (
                <FormItem>
                  <FormLabel>Speaker Image *</FormLabel>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className="border border-dashed w-full h-[118px] overflow-hidden border-gray-300 dark:border-gray-700 rounded-lg text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {previewUrl ? (
                        <div className="relative">
                          <img
                            src={previewUrl}
                            alt="Speaker"
                            className="w-full h-[118px] object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-full flex p-2 items-center justify-center">
                          <input {...getInputProps()} />
                          <p className="text-gray-500">
                            Drag & drop or click to upload
                          </p>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
            {(["name", "role", "company", "topic", "rating"] as const).map(
              (field) => (
                <FormField
                  key={field}
                  control={form.control}
                  name={field}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {field.name.replace(/([A-Z])/g, " $1")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={`Enter ${field.name}`}
                          type={field.name === "rating" ? "number" : "text"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            )}
          </div>
        </div>

        {/* Display Added Speakers */}
        <div>
          {speakers.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {speakers.map((speaker, index) => (
                  <div
                    key={index}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={speaker.imageUrl}
                          alt={speaker.name || "Speaker Image"}
                          className="w-20 h-20 rounded-xl object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">
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
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="w-full flex justify-end gap-4">
          <Button type="submit" onClick={addSpeaker} disabled={isAddDisabled}>
            Add
          </Button>
          <Button onClick={handleSpeakerSubmit} disabled={isSaveDisabled}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FeaturedSpeakerForm;
