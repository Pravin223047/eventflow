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

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  contact: z
    .string()
    .regex(
      /^\+\d{8,15}$/,
      "Please enter a valid phone number with country code (e.g., +911234567890)"
    ),
  website: z.string().url("Please enter a valid website"),
  earlyBirdTickets: z.coerce.number().min(0, "Cannot be negative"),
  regularTickets: z.coerce.number().min(0, "Cannot be negative"),
  vipTickets: z.coerce.number().min(0, "Cannot be negative"),
});

type FormValues = z.infer<typeof FormSchema>;

interface EventContactPageProps {
  setSuccess: (success: boolean) => void;
  setFormattedContactData: (data: any) => void;
}

const EventContactPage: React.FC<EventContactPageProps> = ({
  setSuccess,
  setFormattedContactData,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      contact: "",
      website: "",
      earlyBirdTickets: 0,
      regularTickets: 0,
      vipTickets: 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const formattedData = { ...data };

      setFormattedContactData((prev: any) => [
        ...(Array.isArray(prev) ? prev : []),
        formattedData,
      ]);

      toast.success("Details saved successfully!");
      setSuccess(true);
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter contact email..."
                    autoComplete="email"
                    aria-label="Event contact email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact (Include country code with +) *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="Ex. +911234567890..."
                    autoComplete="tel"
                    aria-label="Event contact number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="url"
                  placeholder="Ex. https://www.google.com/"
                  autoComplete="url"
                  aria-label="Event website URL"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ticket Selection Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <FormField
            control={form.control}
            name="earlyBirdTickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Early Bird ($99) *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    value={field.value ?? 0} // Ensure controlled input
                    placeholder="Ex. 100"
                    aria-label="Early Bird Tickets"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="regularTickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Regular ($149) *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    value={field.value ?? 0} // Ensure controlled input
                    placeholder="Ex. 100"
                    aria-label="Regular Tickets"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vipTickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VIP Access ($249) *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    value={field.value ?? 0} // Ensure controlled input
                    placeholder="Ex. 100"
                    aria-label="VIP Tickets"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventContactPage;
