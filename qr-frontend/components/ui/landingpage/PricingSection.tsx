import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

type PricingPlan = {
  name: string;
  price: string;
  billingSuffix?: string; // e.g. /mo, /year
  features: string[];
  popular?: boolean;
  ctaHref?: string;
};

type PricingSectionProps = {
  heading: string;
  subheading?: string;
  plans: PricingPlan[];
};

export default function PricingSection({
  heading,
  subheading,
  plans,
}: PricingSectionProps) {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">
            {heading}
          </h2>
          {subheading && (
            <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 border transition-shadow ${
                plan.popular
                  ? "border-blue-500 shadow-xl"
                  : "border-slate-200"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Popular
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-slate-900">
                  {plan.price}
                </span>
                <span className="text-slate-500">
                  {plan.billingSuffix ?? "/mo"}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-600 text-sm"
                  >
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={plan.ctaHref ?? "/login"}>
                <Button
                  variant={plan.popular ? "primary" : "outline"}
                  className="w-full"
                >
                  Choose {plan.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
