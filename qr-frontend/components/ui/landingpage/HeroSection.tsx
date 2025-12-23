"use client";
import Link from "next/link";
import { Button } from "../Button";

type HeroSectionProps = {
    badgeText?: string;
    title: string;
    highlight?: string;
    subtitle: string;
    primaryCta: {
        label: string;
        href: string;
    };
    secondaryCta?: {
        label: string;
        href: string;
    };
    imageSrc?: string;
    imageAlt?: string;
};

export default function HeroSection({
    badgeText,
    title,
    highlight,
    subtitle,
    primaryCta,
    secondaryCta,
    imageSrc,
    imageAlt = "Hero Image",
}: HeroSectionProps) {
    return (
        <section id="hero" className="pt-20 pb-32 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                {/* Badge */}
                {badgeText && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                        </span>
                        {badgeText}
                    </div>
                )}

                {/* Title */}
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                    {title}{" "}
                    {highlight && (
                        <span className="text-blue-600">{highlight}</span>
                    )}
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                    {subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href={primaryCta.href}>
                        <Button size="lg" className="w-full sm:w-auto">
                            {primaryCta.label}
                        </Button>
                    </Link>

                    {secondaryCta && (
                        <Link href={secondaryCta.href}>
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto"
                            >
                                {secondaryCta.label}
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Image */}
                {imageSrc && (
                    <div className="mt-20">
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="rounded-xl shadow-2xl border border-slate-200 mx-auto"
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
