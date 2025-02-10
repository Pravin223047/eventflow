import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Event } from "@/types";
import { format } from "date-fns";

interface EventFiltersProps {
  onFilterChange: (filters: {
    domain: string;
    date: string;
    location: string;
  }) => void;
  events: Event[];
}

const EventFilters = ({ onFilterChange, events }: EventFiltersProps) => {
  const [activeFilters, setActiveFilters] = useState({
    domain: "",
    date: "",
    location: "",
  });

  const eventTypes = useMemo(() => {
    const uniqueDomains = new Set(
      events.map((event) => event.domain?.toLowerCase()).filter(Boolean)
    );

    return Array.from(uniqueDomains).map(
      (domain) => domain.charAt(0).toUpperCase() + domain.slice(1)
    );
  }, [events]);

  const eventDates = useMemo(
    () =>
      Array.from(
        new Set(events.map((event) => event.date?.[0]?.from).filter(Boolean))
      ),
    [events]
  );

  const eventLocations = useMemo(
    () =>
      Array.from(
        new Set(
          events.map((event) => event.location?.[0]?.city).filter(Boolean)
        )
      ),
    [events]
  );

  const handleFilterChange = (
    key: keyof typeof activeFilters,
    value: string
  ) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = { domain: "", date: "", location: "" };

    // Reset state
    setActiveFilters(defaultFilters);

    // Reset URL parameters
    const url = new URL(window.location.href);
    url.searchParams.delete("domain");
    url.searchParams.delete("date");
    url.searchParams.delete("location");
    window.history.replaceState(null, "", url.toString());

    // Notify parent component
    onFilterChange(defaultFilters);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-4">
        <Select onValueChange={(value) => handleFilterChange("domain", value)}>
          <SelectTrigger className="w-[120px] xl:w-[180px]">
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            {eventTypes.map((domain) => (
              <SelectItem key={domain} value={domain}>
                {domain}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilterChange("date", value)}>
          <SelectTrigger className="w-[120px] xl:w-[180px]">
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            {eventDates.map((dateStr) => {
              const date = new Date(dateStr);
              return isNaN(date.getTime()) ? null : (
                <SelectItem key={dateStr} value={format(date, "LLL dd, y")}>
                  {format(date, "LLL dd, y")}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleFilterChange("location", value)}
        >
          <SelectTrigger className="w-[120px] xl:w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {eventLocations.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {Object.values(activeFilters).some(Boolean) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="py-4 space-y-4">
              <Select
                onValueChange={(value) => handleFilterChange("domain", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => handleFilterChange("date", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  {eventDates.map((dateStr) => {
                    const date = new Date(dateStr);
                    return isNaN(date.getTime()) ? null : (
                      <SelectItem
                        key={dateStr}
                        value={format(date, "LLL dd, y")}
                      >
                        {format(date, "LLL dd, y")}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => handleFilterChange("location", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {eventLocations.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {Object.values(activeFilters).some(Boolean) && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default EventFilters;
