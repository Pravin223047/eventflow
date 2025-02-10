import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Mic, Users, Star } from "lucide-react";

const icons = [
  { label: "Event", value: "calendar", icon: <Calendar size={16} /> },
  { label: "Speech", value: "mic", icon: <Mic size={16} /> },
  { label: "Panel", value: "users", icon: <Users size={16} /> },
  { label: "Special", value: "star", icon: <Star size={16} /> },
];

const AgendaSchema = z.object({
  time: z.string().min(1, "Time is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string().min(1, "Please select an icon"),
});

interface AgendaProps {
  time: string;
  title: string;
  description: string;
  icon: string;
}

interface AgendaFormProps {
  setFormattedAgendaData: (data: any) => void;
  setSuccess: (success: boolean) => void;
}

const AgendaForm: React.FC<AgendaFormProps> = ({
  setFormattedAgendaData,
  setSuccess,
}) => {
  const [agendaItems, setAgendaItems] = useState<AgendaProps[]>([]);

  const form = useForm<AgendaProps>({
    resolver: zodResolver(AgendaSchema),
    defaultValues: {
      time: "",
      title: "",
      description: "",
      icon: "",
    },
  });

  const addAgendaItem = async (data: AgendaProps) => {
    try {
      setAgendaItems([...agendaItems, data]);
      toast.success("Agenda item added successfully!");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  const saveAllAgendaItems = () => {
    if (agendaItems.length === 0) {
      toast.error("No agenda items to save!");
      return;
    }

    setFormattedAgendaData((prev: any[]) => {
      const mergedAgenda = [...prev, ...agendaItems];
      return mergedAgenda;
    });
    setSuccess(true);
    toast.success("All agenda items saved successfully!");
    setAgendaItems([]);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Add Agenda Items</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addAgendaItem)}
          className="w-full space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time *</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Ex. 10:00 AM" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Ex. Opening Keynote"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Ex. Welcome speech by the organizer."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {icons.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value}>
                          <span className="flex items-center gap-2">
                            {icon.icon} {icon.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex justify-between">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              {form.formState.isSubmitting ? "Adding..." : "Add Agenda Item"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={saveAllAgendaItems}
              disabled={agendaItems.length === 0}
            >
              Save All Items
            </Button>
          </div>
        </form>
      </Form>

      {agendaItems.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Added Agenda Items</h3>
          <ul className="space-y-3">
            {agendaItems.map((item, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-lg flex items-center gap-4"
              >
                <span className="text-gray-600">{item.time}</span>
                <span className="font-medium">{item.title}</span>
                <span className="text-gray-500">{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AgendaForm;
