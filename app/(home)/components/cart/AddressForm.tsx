import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useStates } from "./hook/use-get-provices";
import { useCities } from "./hook/use-get-cities";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  firstName: z.string().min(2, "نام باید حداقل دو کاراکتر باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل دو کاراکتر باشد"),
  phoneNumber: z.string().regex(/^09\d{9}$/, "فرمت شماره همراه اشتباه است"),
  postalCode: z
    .string()
    .length(10, "کد پستی باید ده رقم باشد")
    .regex(/^\d{10}$/, "کد پستی باید شامل ده رقم باشد"),
  province: z.string(),
  city: z.string(),
  fullAddress: z.string(),
});

type AddressFormValues = z.infer<typeof formSchema>;

const AddressForm = () => {
  const {
    data: states,
    isLoading: statesLoading,
    error: statesError,
  } = useStates();
  const [selectedProvince, setSelectedProvince] = React.useState<string>("");
  const {
    data: cities,
    isLoading: citiesLoading,
    error: citiesError,
  } = useCities(selectedProvince);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "0912123456",
      postalCode: "",
      province: "",
      city: "",
      fullAddress: "",
    },
  });

  const handleSubmit = (values: AddressFormValues) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className=" w-full h-full flex flex-wrap gap-4 p-6 rounded-lg shadow-lg rtl"
      >
        <div className="grid grid-cols-3 gap-4 w-full rtl">
          <FormField
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem className="rtl flex flex-col justify-end ">
                <FormLabel className="text-right">شماره همراه</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="input w-full p-2 border rounded-md text-right"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="rtl flex flex-col justify-end ">
                <FormLabel className="text-right">نام خانوادگی</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="input w-full p-2 border rounded-md text-right"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="rtl flex flex-col justify-end ">
                <FormLabel className="text-right">نام</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="input w-full p-2 border rounded-md text-right"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 w-full rtl">
          <FormField
            name="postalCode"
            control={form.control}
            render={({ field }) => (
              <FormItem className="rtl flex flex-col justify-end ">
                <FormLabel className="text-right">کد پستی</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    className="input w-full p-2 border rounded-md text-right"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="province"
            control={form.control}
            render={({ field }) => (
              <FormItem className="rtl flex flex-col justify-end ">
                <FormLabel className="text-right">استان</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="input w-full p-2 border rounded-md text-right"
                  >
                    {statesLoading && <option>در حال بارگذاری...</option>}
                    {statesError && <option>Error loading states</option>}
                    {states?.map((state: any) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="city"
            control={form.control}
            render={({ field }) => (
              <FormItem className="rtl flex flex-col justify-end ">
                <FormLabel className="text-right">شهر</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="input w-full p-2 border rounded-md text-right"
                  >
                    {citiesLoading && <option>Loading cities...</option>}
                    {citiesError && <option>Error loading cities</option>}
                    {cities?.map((city: any) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full rtl">
          <FormField
            name="fullAddress"
            control={form.control}
            render={({ field }) => (
              <FormItem className="rtl flex flex-col justify-end ">
                <FormLabel className="text-right">آدرس کامل</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    className="input w-full p-2 border rounded-md h-24 text-right"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full py-3 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600 rtl"
        >
          ثبت
        </Button>
      </form>
    </Form>
  );
};

export default AddressForm;

// import React, { useState, useEffect } from "react";

// const fetchCities = async (stateId: string) => {
//   const response = await fetch(`/api/cities?state=${stateId}`);
//   if (!response.ok) {
//     throw new Error("خطا در دریافت اطلاعات شهرها");
//   }
//   const data = await response.json();
//   return data;
// };

// const AddressForm = () => {
//   const [selectedState, setSelectedState] = useState<string>("");
//   const [cities, setCities] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedState(event.target.value);
//   };

//   useEffect(() => {
//     const fetchCitiesData = async () => {
//       if (selectedState) {
//         setIsLoading(true);
//         setError(null);
//         try {
//           const data = await fetchCities(selectedState);
//           setCities(data);
//         } catch (error) {
//           setError("خطا در دریافت اطلاعات");
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchCitiesData();
//   }, [selectedState]);
//   console.log(cities);

//   return (
//     <form>
//       <select onChange={handleStateChange}>
//         <option value="">Select a State</option>
//         <option value="تهران">تهران</option>
//         <option value="قم">قم</option>
//         {/* Add more options based on actual states */}
//       </select>

//       {isLoading && <p>Loading cities...</p>}
//       {error && <p>Error: {error}</p>}

//       <select>
//         <option value="">Select a City</option>
//         {cities.length > 0 ? (
//           cities.map((city: any, index: number) => (
//             // Make sure the key is unique (using either city.id or city.name)
//             <option key={city.id || index} value={city.id}>
//               {city.name}
//             </option>
//           ))
//         ) : (
//           <option value="">No cities available</option>
//         )}
//       </select>
//     </form>
//   );
// };

// export default AddressForm;
