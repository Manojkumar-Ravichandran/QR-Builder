import { Card } from "@/components/ui/Card";
import { LucideIcon } from "lucide-react";

type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type FeaturesSectionProps = {
  heading: string;
  subheading?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
};

export default function FeaturesSection({
  heading,
  subheading,
  features,
  columns = 3,
}: FeaturesSectionProps) {
  const gridCols =
    columns === 2
      ? "md:grid-cols-2"
      : columns === 4
      ? "md:grid-cols-4"
      : "md:grid-cols-3";

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {heading}
          </h2>
          {subheading && (
            <p className="text-slate-600 max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* Feature Cards */}
        <div className={`grid gap-8 ${gridCols}`}>
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                <feature.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>

              <p className="text-slate-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
