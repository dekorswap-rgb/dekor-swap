"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface QuizResultsProps {
    styleScores: Record<string, number>;
    styles: Record<string, any>;
    answers: Record<string, string>;
}

export default function QuizResults({ styleScores, styles, answers }: QuizResultsProps) {
    // Find top style
    const topStyleId = Object.entries(styleScores).sort(([, a], [, b]) => b - a)[0]?.[0];
    const topStyle = styles[topStyleId];

    // Find secondary style
    const secondaryStyleId = Object.entries(styleScores).sort(([, a], [, b]) => b - a)[1]?.[0];
    const secondaryStyle = styles[secondaryStyleId];

    const handleRestart = () => {
        window.location.reload();
    };

    if (!topStyle) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background py-20 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6"
                    >
                        <Sparkles className="w-10 h-10 text-accent" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                        Your Perfect Style Match!
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Based on your answers, we've curated the perfect aesthetic for your space.
                    </p>
                </motion.div>

                {/* Main Style Result */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-2xl mb-8"
                >
                    <div className="aspect-[21/9] relative">
                        <img
                            src={topStyle.imageUrl}
                            alt={topStyle.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <h2 className="text-4xl md:text-5xl font-bold mb-2">{topStyle.name}</h2>
                            <p className="text-xl opacity-90">{topStyle.tagline}</p>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            {topStyle.description}
                        </p>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-primary mb-4">Key Characteristics</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {topStyle.characteristics.map((char: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                                        <span className="text-primary/80">{char}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-primary mb-4">Color Palette</h3>
                            <div className="flex gap-3">
                                {topStyle.colorPalette.map((color: string, i: number) => (
                                    <div
                                        key={i}
                                        className="w-16 h-16 rounded-xl shadow-md border border-border"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>

                        {secondaryStyle && (
                            <div className="bg-accent/5 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-primary mb-2">
                                    Secondary Match: {secondaryStyle.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Mix elements from {secondaryStyle.name} to add depth and personality to your {topStyle.name} foundation.
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/catalog">
                        <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-accent group">
                            Browse {topStyle.name} Items
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link href="/get-started">
                        <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-primary/20">
                            Get Started
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        variant="ghost"
                        onClick={handleRestart}
                        className="rounded-full px-8 h-14 text-lg"
                    >
                        <RefreshCw className="mr-2 w-4 h-4" />
                        Retake Quiz
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
