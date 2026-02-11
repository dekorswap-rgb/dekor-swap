"use client";

import { motion } from "framer-motion";
import { Leaf, Recycle, Globe, Users, TrendingDown, Package } from "lucide-react";
import { useEffect, useState } from "react";

interface ImpactMetric {
    icon: React.ReactNode;
    value: number;
    suffix: string;
    label: string;
    description: string;
    color: string;
}

export default function SustainabilityImpact() {
    const [counts, setCounts] = useState({
        waste: 0,
        carbon: 0,
        items: 0,
        members: 0,
    });

    const metrics: ImpactMetric[] = [
        {
            icon: <TrendingDown className="w-10 h-10" />,
            value: 250,
            suffix: " tons",
            label: "Furniture Waste Prevented",
            description: "Kept out of landfills through our circular model",
            color: "text-green-600",
        },
        {
            icon: <Globe className="w-10 h-10" />,
            value: 180000,
            suffix: " kg",
            label: "CO₂ Emissions Saved",
            description: "Equivalent to planting 8,200 trees",
            color: "text-blue-600",
        },
        {
            icon: <Recycle className="w-10 h-10" />,
            value: 12500,
            suffix: "+",
            label: "Items in Circulation",
            description: "Actively being swapped and enjoyed",
            color: "text-accent",
        },
        {
            icon: <Users className="w-10 h-10" />,
            value: 3200,
            suffix: "+",
            label: "Happy Members",
            description: "Choosing sustainable style",
            color: "text-purple-600",
        },
        {
            icon: <Package className="w-10 h-10" />,
            value: 100,
            suffix: "%",
            label: "Recycled Packaging",
            description: "Biodegradable and compostable materials",
            color: "text-green-700",
        },
        {
            icon: <Leaf className="w-10 h-10" />,
            value: 95,
            suffix: "%",
            label: "Item Lifecycle Extension",
            description: "Average increase in product lifespan",
            color: "text-emerald-600",
        },
    ];

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;

            setCounts({
                waste: Math.floor(250 * progress),
                carbon: Math.floor(180000 * progress),
                items: Math.floor(12500 * progress),
                members: Math.floor(3200 * progress),
            });

            if (step >= steps) clearInterval(timer);
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 bg-gradient-to-br from-green-50 via-white to-blue-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-6"
                    >
                        <Globe size={16} />
                        <span>Our Environmental Impact</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight"
                    >
                        Better for your home, <br />
                        better for the planet.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    >
                        The furniture industry is one of the largest contributors to landfill waste. By swapping instead of buying,
                        we're extending the life of beautiful décor and reducing the demand for new resource extraction. Every swap
                        makes a difference.
                    </motion.p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {metrics.map((metric, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-3xl p-8 shadow-lg border border-border hover:shadow-xl transition-all group"
                        >
                            <div className={`mb-6 p-4 bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl inline-flex ${metric.color}`}>
                                {metric.icon}
                            </div>
                            <div className="mb-4">
                                <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                                    {i === 0 && counts.waste.toLocaleString()}
                                    {i === 1 && counts.carbon.toLocaleString()}
                                    {i === 2 && counts.items.toLocaleString()}
                                    {i === 3 && counts.members.toLocaleString()}
                                    {i > 3 && metric.value}
                                    <span className="text-2xl font-bold text-accent">{metric.suffix}</span>
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-2">{metric.label}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{metric.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Sustainability Commitments */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                        Our Sustainability Commitments
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: <Package className="w-6 h-6 text-accent" />,
                                text: "We use 100% recycled packaging for all deliveries.",
                            },
                            {
                                icon: <Globe className="w-6 h-6 text-accent" />,
                                text: "Our logistics are optimized to minimize carbon footprint.",
                            },
                            {
                                icon: <Recycle className="w-6 h-6 text-accent" />,
                                text: "Items that reach the end of their life are responsibly recycled.",
                            },
                            {
                                icon: <Leaf className="w-6 h-6 text-accent" />,
                                text: "We partner with local artisans to reduce shipping distances.",
                            },
                            {
                                icon: <TrendingDown className="w-6 h-6 text-accent" />,
                                text: "Carbon-neutral shipping on all orders.",
                            },
                            {
                                icon: <Users className="w-6 h-6 text-accent" />,
                                text: "Supporting fair wages and ethical manufacturing practices.",
                            },
                        ].map((commitment, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                                    {commitment.icon}
                                </div>
                                <p className="text-primary/80 font-medium pt-2">{commitment.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Comparison */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 text-center"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                        The DekorSwap Difference
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl p-6 border-2 border-red-200">
                            <h4 className="font-bold text-lg text-red-600 mb-4">Traditional Buying</h4>
                            <ul className="space-y-3 text-left text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-0.5">✗</span>
                                    <span>Items used by 1 household, then discarded</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-0.5">✗</span>
                                    <span>High manufacturing emissions</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-0.5">✗</span>
                                    <span>Ends up in landfills after 2-3 years</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-0.5">✗</span>
                                    <span>Constant demand for new resources</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-2xl p-6 border-2 border-green-200">
                            <h4 className="font-bold text-lg text-green-600 mb-4">DekorSwap Model</h4>
                            <ul className="space-y-3 text-left text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span>Items serve 10+ households over lifetime</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span>Reduced manufacturing demand</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span>Professional refurbishment extends life</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span>Circular economy reduces waste</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
