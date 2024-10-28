import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subscriptionTiersInOrder } from "@/data/subscriptionTiers";
import { formatCompactNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { AdCreativeIcon } from "./_icons/AdCreative";
import { AkiflowIcon } from "./_icons/Akiflow";
import { AmieIcon } from "./_icons/Amie";
import { DraftBitIcon } from "./_icons/DraftBit";
import { JenniIcon } from "./_icons/Jenni";
import { TldvIcon } from "./_icons/Tldv";

const HomePage = () => {
  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center gap-8 text-balance bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] px-4 text-center">
        <h1 className="m-4 text-6xl font-bold tracking-tight lg:text-7xl xl:text-8xl">
          Price Smarter, Sell Bigger!
        </h1>
        <p className="max-w-screen-xl text-lg lg:text-3xl">
          Optimize your product pricing across countries to maximize sales.
          Capture 85% of the untapped market with location-based dynamic pricing
        </p>
        <SignUpButton>
          <Button className="flex gap-2 rounded-xl p-6 text-lg">
            Get Started for Free <ArrowRightIcon className="size-5" />
          </Button>
        </SignUpButton>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container flex flex-col gap-16 px-8 py-16 md:px-16">
          <h2 className="text-balance text-center text-3xl">
            Trusted by the top modern companies
          </h2>

          <div className="grid grid-cols-2 gap-16 md:grid-cols-3 xl:grid-cols-3">
            <Link href={"https://jenni.ai"}>
              <JenniIcon />
            </Link>
            <Link href={"https://tldv.io"}>
              <TldvIcon />
            </Link>
            <Link href={"https://draftbit.com"}>
              <DraftBitIcon />
            </Link>
            <Link href={"https://amie.so"}>
              <AmieIcon />
            </Link>
            <Link href={"https://akiflow.com"}>
              <AkiflowIcon />
            </Link>
            <Link href={"https://www.adcreative.ai"}>
              <AdCreativeIcon />
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-accent/5 px-8 py-16">
        <h2 className="mb-8 text-balance text-center text-4xl font-semibold">
          Pricing software which pays for itself 20x over
        </h2>
        <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-4 lg:grid-cols-4">
          {subscriptionTiersInOrder.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>
      </section>
      <footer className="container flex flex-col items-start justify-between gap-8 pb-8 pt-16 sm:flex-row sm:gap-4">
        <Link href="/">
          <BrandLogo />
        </Link>
        <div className="flex flex-col gap-8 sm:flex-row">
          <div className="flex flex-col gap-8">
            <FooterLinkGroup
              title="Help"
              links={[
                { label: "PPP Discounts", href: "#" },
                { label: "Discount API", href: "#" },
              ]}
            />
            <FooterLinkGroup
              title="Solutions"
              links={[
                { label: "Newsletter", href: "#" },
                { label: "SaaS Business", href: "#" },
                { label: "Online Courses", href: "#" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-8">
            <FooterLinkGroup
              title="Features"
              links={[{ label: "PPP Discounts", href: "#" }]}
            />
            <FooterLinkGroup
              title="Tools"
              links={[
                { label: "Salary Converter", href: "#" },
                { label: "Coupon Generator", href: "#" },
                { label: "Stripe App", href: "#" },
              ]}
            />
            <FooterLinkGroup
              title="Company"
              links={[
                { label: "Affiliate", href: "#" },
                { label: "Twitter", href: "#" },
                { label: "Terms of Service", href: "#" },
              ]}
            />
          </div>
          <div className="flex flex-col gap-8">
            <FooterLinkGroup
              title="Integrations"
              links={[
                { label: "Lemon Squeezy", href: "#" },
                { label: "Gumroad", href: "#" },
                { label: "Stripe", href: "#" },
                { label: "Chargebee", href: "#" },
                { label: "Paddle", href: "#" },
              ]}
            />
            <FooterLinkGroup
              title="Tutorials"
              links={[
                { label: "Any Website", href: "#" },
                { label: "Lemon Squeezy", href: "#" },
                { label: "Gumroad", href: "#" },
                { label: "Stripe", href: "#" },
                { label: "Chargebee", href: "#" },
                { label: "Paddle", href: "#" },
              ]}
            />
          </div>
        </div>
      </footer>
    </>
  );
};

function PricingCard({
  name,
  priceInCents,
  maxNumberOfVisits,
  maxNumberOfProducts,
  canRemoveBranding,
  canAccessAnalytics,
  canCustomizeBanner,
}: (typeof subscriptionTiersInOrder)[number]) {
  const isMostPopular = name === "Standard";

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-3xl shadow-none",
        isMostPopular ? "border-2 border-accent" : "border-none",
      )}
    >
      {isMostPopular && (
        <div className="absolute -right-8 top-24 origin-top-right rotate-45 bg-accent px-10 py-1 text-accent-foreground">
          Most popular
        </div>
      )}
      <CardHeader>
        <div className="mb-8 font-semibold text-accent">{name}</div>
        <CardTitle className="text-xl font-bold">
          ${priceInCents / 100} /mo
        </CardTitle>
        <CardDescription>
          {formatCompactNumber(maxNumberOfVisits)} pricing page visits/mo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpButton>
          <Button
            className="w-full rounded-lg text-lg"
            variant={isMostPopular ? "accent" : "default"}
          >
            Get Started
          </Button>
        </SignUpButton>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Feature className="font-bold">
          {maxNumberOfProducts}{" "}
          {maxNumberOfProducts === 1 ? "product" : "products"}
        </Feature>
        <Feature>PPP discounts</Feature>
        {canAccessAnalytics && <Feature>Advanced analytics</Feature>}
        {canRemoveBranding && <Feature>Remove Parity Deals branding</Feature>}
        {canCustomizeBanner && <Feature>Banner customization</Feature>}
      </CardFooter>
    </Card>
  );
}

function Feature({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <CheckIcon className="size-4 rounded-full bg-accent/25 stroke-accent p-0.5" />
      <span>{children}</span>
    </div>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold">{title}</h3>
      <ul className="flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
