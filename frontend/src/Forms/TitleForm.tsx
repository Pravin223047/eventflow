import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { CalendarDate } from "@/components/Calendar";
import { LocationSelector } from "@/components/LocationSelector";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

interface Location {
  city: string;
  state: string;
  country: string;
}

const FormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  subtitle: z.string().min(2, "Subtitle must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  domain: z.enum(
    [
      "technology",
      "business",
      "education",
      "healthcare",
      "finance",
      "science",
      "arts",
      "music",
      "sports",
      "fashion",
      "automobile",
      "real-estate",
      "food",
      "environment",
      "politics",
      "law",
      "media",
      "psychology",
      "philosophy",
      "history",
      "spirituality",
      "gaming",
      "blockchain",
      "engineering",
      "aerospace",
      "telecommunications",
      "literature",
      "human-rights",
      "non-profit",
      "military",
      "transportation",
    ],
    {
      errorMap: () => ({ message: "Please select a valid domain." }),
    }
  ),

  address: z.string().min(1, "Address is required."),
  date: z
    .object({ from: z.date(), to: z.date().optional() })
    .refine((data) => !data.to || data.from <= data.to, {
      message: "End date must be after the start date.",
    }),
  time: z.date({ required_error: "Time is required." }),
  capacity: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().min(100, "Capacity must be at least 100")
  ),
});

interface TitleFormProps {
  setSuccess: (success: boolean) => void;
  setFormattedData: (data: any) => void;
}

const TitleForm: React.FC<TitleFormProps> = ({
  setSuccess,
  setFormattedData,
}) => {
  const [location, setLocation] = useState<Location[] | []>([]);
  const { user } = useAuthStore();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      domain: undefined,
      address: "",
      date: { from: new Date(), to: null },
      time: new Date(),
      capacity: 100,
    },
  });

  const handleLocationChange = (newLocation: Location) => {
    if (!newLocation.city || !newLocation.state || !newLocation.country) {
      return;
    }

    setLocation((prevLocations) => {
      if (
        prevLocations.some(
          ({ city, state, country }) =>
            city === newLocation.city &&
            state === newLocation.state &&
            country === newLocation.country
        )
      ) {
        return prevLocations;
      }

      return [...prevLocations, newLocation];
    });
  };

  const onSubmit = async (data: any) => {
    const formattedTime = data.time
      ? new Date(data.time).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "Invalid Time";

    const formatDate = (date: any) => {
      return (
        new Date(date).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) +
        ` (${new Date(date).toLocaleDateString("en-US", { weekday: "short" })})`
      );
    };

    const formattedFromDate = formatDate(data.date.from);
    const formattedToDate = data.date.to ? formatDate(data.date.to) : null;

    const formattedData = {
      ...data,
      time: formattedTime,
      date: {
        from: formattedFromDate,
        to: formattedToDate,
      },
      location,
      email: user?.email,
    };

    setFormattedData((prev: any) => [
      ...(Array.isArray(prev) ? prev : []),
      formattedData,
    ]);
    toast.success("Details saved successfully!");
    setSuccess(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Title & Subtitle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["title", "subtitle"].map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as "title" | "subtitle"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {field.name.charAt(0).toUpperCase() + field.name.slice(1)} *
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`Enter event ${field.name}...`}
                      aria-label={`Event ${field.name}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Describe your event..."
                  className="resize-none"
                  rows={5}
                  aria-label="Event description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Domain & Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain *</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="arts">Arts & Culture</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="automobile">Automobile</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="food">Food & Culinary</SelectItem>
                      <SelectItem value="environment">
                        Environment & Sustainability
                      </SelectItem>
                      <SelectItem value="politics">Politics</SelectItem>
                      <SelectItem value="law">Law & Legal</SelectItem>
                      <SelectItem value="media">
                        Media & Entertainment
                      </SelectItem>
                      <SelectItem value="psychology">
                        Psychology & Mental Health
                      </SelectItem>
                      <SelectItem value="philosophy">Philosophy</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="spirituality">
                        Spirituality & Religion
                      </SelectItem>
                      <SelectItem value="gaming">Gaming & Esports</SelectItem>
                      <SelectItem value="blockchain">
                        Blockchain & Cryptocurrency
                      </SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="aerospace">Aerospace</SelectItem>
                      <SelectItem value="telecommunications">
                        Telecommunications
                      </SelectItem>
                      <SelectItem value="literature">
                        Literature & Writing
                      </SelectItem>
                      <SelectItem value="human-rights">Human Rights</SelectItem>
                      <SelectItem value="non-profit">
                        Non-Profit & Social Causes
                      </SelectItem>
                      <SelectItem value="military">
                        Military & Defense
                      </SelectItem>
                      <SelectItem value="transportation">
                        Transportation & Logistics
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter event address..."
                    aria-label="Event address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Date *</FormLabel>
                <FormControl>
                  <CalendarDate
                    className="w-full"
                    onDateChange={(dateRange) => field.onChange(dateRange)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center mt-[7px]">
                <FormLabel>Event Time *</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => {
                      if (date !== null) {
                        field.onChange(date);
                      }
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    className="w-full border bg-transparent rounded-md p-[0.250rem] pb-1 pl-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <LocationSelector onChange={handleLocationChange} />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter event capacity Ex. 500..."
                    aria-label="Event capacity"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default TitleForm;
