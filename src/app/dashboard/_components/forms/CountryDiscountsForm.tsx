"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { productCountryDiscountsSchema } from "@/schemas/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { updateCountryDiscounts } from "@/server/actions/products";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CountryDiscountsForm = ({
  productId,
  countryGroups,
}: {
  productId: string;
  countryGroups: {
    id: string;
    name: string;
    recommendedDiscountPercentage: number | null;
    countries: {
      name: string;
      code: string;
    }[];
    discount?: {
      coupon: string;
      discountPercentage: number;
    };
  }[];
}) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof productCountryDiscountsSchema>>({
    resolver: zodResolver(productCountryDiscountsSchema),
    defaultValues: {
      groups: countryGroups.map((group) => {
        const discount =
          group.discount?.discountPercentage ??
          group.recommendedDiscountPercentage;

        return {
          countryGroupId: group.id,
          coupon: group.discount?.coupon ?? "",
          discountPercentage: discount != null ? discount * 100 : undefined,
        };
      }),
    },
  });

  async function onSubmit(
    values: z.infer<typeof productCountryDiscountsSchema>,
  ) {
    const data = await updateCountryDiscounts(productId, values);

    if (data?.message) {
      toast({
        title: data.error ? "Error" : "Success",
        description: data.message,
        variant: data.error ? "destructive" : "default",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {countryGroups.map((group, index) => (
          <Card key={group.id}>
            <CardContent className="flex items-center gap-16 pt-6">
              <div>
                <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
                  {group.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {group.countries.map((country) => (
                    <TooltipProvider key={country.code} delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Image
                            width={24}
                            height={16}
                            alt={country.name}
                            title={country.name}
                            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code.toUpperCase()}.svg`}
                            className="border"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{country.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
              <Input
                type="hidden"
                {...form.register(`groups.${index}.countryGroupId`)}
              />
              <div className="ml-auto flex w-min flex-shrink-0 flex-col gap-2">
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`groups.${index}.discountPercentage`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount %</FormLabel>
                        <FormControl>
                          <Input
                            className="w-24"
                            {...field}
                            type="number"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                            min="0"
                            max="100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`groups.${index}.coupon`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Coupon</FormLabel>
                        <FormControl>
                          <Input className="w-48" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormMessage>
                  {form.formState.errors.groups?.[index]?.root?.message}
                </FormMessage>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="self-end">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CountryDiscountsForm;
