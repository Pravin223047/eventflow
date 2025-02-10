import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useMapStore } from "@/store/mapStore";

interface Location {
  city: string;
  state: string;
  country: string;
}

interface LocationSelectorProps {
  onChange: (location: any) => void;
}

const uniqueBy = <T extends object>(array: T[], key: keyof T): T[] => {
  return array.filter(
    (item, index, self) => index === self.findIndex((t) => t[key] === item[key])
  );
};

export function LocationSelector({ onChange }: LocationSelectorProps) {
  const { getCountries, getStates, getCities } = useMapStore();
  const [countries, setCountries] = useState<{ name: string; iso2: string }[]>(
    []
  );
  const [states, setStates] = useState<{ name: string; iso2: string }[]>([]);
  const [cities, setCities] = useState<
    { name: string; iso2: string; latitude: number; longitude: number }[]
  >([]);
  const [location, setLocation] = useState<Location>({
    city: "",
    state: "",
    country: "",
  });

  const fetchLocationData = async (
    fetchFunction: Function,
    countryCode?: string,
    stateCode?: string
  ) => {
    try {
      const data = await fetchFunction(countryCode, stateCode);
      return uniqueBy(data, "name").map(
        ({ name, iso2, latitude, longitude }: any) => ({
          name,
          iso2,
          latitude,
          longitude,
        })
      );
    } catch (error) {
      toast.error("Failed to load data. Please try again.");
      return [];
    }
  };

  useEffect(() => {
    const loadCountries = async () => {
      const data = await fetchLocationData(getCountries);
      setCountries(data);
    };
    loadCountries();
  }, [getCountries]);

  useEffect(() => {
    const loadStates = async () => {
      if (!location.country) return;
      const countryCode =
        countries.find((country) => country.name === location.country)?.iso2 ||
        "";
      const data = await fetchLocationData(getStates, countryCode);
      if (data.length > 0) {
        setStates(data);
      } else {
        toast.error("No states available for the selected country.");
        setStates([]);
      }
    };
    loadStates();
  }, [location.country, countries, getStates]);

  useEffect(() => {
    const loadCities = async () => {
      if (!location.state) return;

      try {
        const countryCode =
          countries.find((country) => country.name === location.country)
            ?.iso2 || "";
        const stateCode =
          states.find((state) => state.name === location.state)?.iso2 || "";

        const cityDetails = await fetchLocationData(
          getCities,
          countryCode,
          stateCode
        );
        if (cityDetails && cityDetails.length > 0) {
          setCities(cityDetails);
        } else {
          toast.error("No cities available for the selected state.");
          setCities([]);
        }
      } catch (error) {
        toast.error("An error occurred while fetching city details.");
      }
    };

    loadCities();
  }, [location.state, countries, states, getCities]);

  const handleLocationChange = (
    field: keyof Location,
    value: string | null
  ) => {
    let newLocation: Location = {
      ...location,
      [field]: value,
      ...(field === "country" && { state: "", city: "" }),
      ...(field === "state" && { city: "" }),
    };
    setLocation(newLocation);
    onChange(newLocation);
  };

  return (
    <div className="space-y-2 w-full min-w-full max-w-full ">
      <label className="text-sm font-medium flex items-center gap-2 w-full">
        <MapPin className="h-4 w-4" />
        Select Location *
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Country Selector */}
        <div className="w-full">
          <Select
            value={location.country || ""}
            onValueChange={(value) => handleLocationChange("country", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.length > 0 ? (
                countries.map(({ name, iso2 }) => (
                  <SelectItem key={`${name}-${iso2}`} value={name}>
                    {name}
                  </SelectItem>
                ))
              ) : (
                <p className="p-2 text-center text-gray-600">
                  No countries available
                </p>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* State Selector */}
        <div className="w-full">
          <Select
            value={location.state || ""}
            onValueChange={(value) => handleLocationChange("state", value)}
            disabled={!location.country}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {states.length > 0 ? (
                states.map(({ name, iso2 }) => (
                  <SelectItem key={`${name}-${iso2}`} value={name}>
                    {name}
                  </SelectItem>
                ))
              ) : (
                <p className="p-2 text-center text-gray-600">
                  No states available
                </p>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* City Selector */}
        <div className="w-full">
          <Select
            value={location.city || ""}
            onValueChange={(value) => handleLocationChange("city", value)}
            disabled={!location.state}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {cities.length > 0 ? (
                cities.map(({ name, iso2 }) => (
                  <SelectItem key={`${name}-${iso2}`} value={name}>
                    {name}
                  </SelectItem>
                ))
              ) : (
                <p className="p-2 text-center text-gray-600">
                  No cities available
                </p>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
