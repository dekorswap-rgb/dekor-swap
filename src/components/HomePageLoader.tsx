"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePageLoader() {
    const [isLoading, setIsLoading] = useState(true);

    // Generate particle positions once to avoid hydration mismatch
    const particlePositions = useMemo(() => {
        // Use fixed positions instead of Math.random() to ensure server/client match
        const positions = [
            { left: -150, top: -120 },
            { left: 180, top: -80 },
            { left: -100, top: 150 },
            { left: 120, top: 100 },
            { left: -180, top: 50 },
            { left: 50, top: -150 },
            { left: 160, top: -30 },
            { left: -80, top: 180 },
        ];
        return positions;
    }, []);

    useEffect(() => {
        // Temporarily disabled to always show animation for testing
        // const hasSeenAnimation = sessionStorage.getItem("dekorswap_home_animation_seen");

        // if (hasSeenAnimation) {
        //     setIsLoading(false);
        //     return;
        // }

        // Show animation for 3 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
            // sessionStorage.setItem("dekorswap_home_animation_seen", "true");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-white"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="relative">
                        {/* Animated circles background */}
                        <motion.div
                            className="absolute -inset-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                                    style={{
                                        width: 100 + i * 80,
                                        height: 100 + i * 80,
                                        borderColor: i === 0 ? "#D4A574" : i === 1 ? "#D4A574" : "#D4A574",
                                        opacity: 0.2 - i * 0.05,
                                    }}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 180, 360],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear",
                                        delay: i * 0.2,
                                    }}
                                />
                            ))}
                        </motion.div>

                        {/* Logo/Brand Name Animation */}
                        <div className="relative z-10 text-center">
                            {/* Brand name with letter animation */}
                            <div className="flex items-center justify-center gap-1 mb-8">
                                {["D", "e", "k", "o", "r", "S", "w", "a", "p"].map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        className="text-6xl font-bold"
                                        style={{
                                            color: i === 5 ? "#D4A574" : "#2C3E50",
                                        }}
                                        initial={{ opacity: 0, y: 50, scale: 0.5 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: i * 0.1,
                                            ease: "easeOut",
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Tagline */}
                            <motion.p
                                className="text-xl text-muted-foreground italic"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                            >
                                Endless Style, Zero Waste
                            </motion.p>

                            {/* Loading bar */}
                            <motion.div
                                className="mt-12 w-64 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                            >
                                <motion.div
                                    className="h-full bg-accent rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.3, delay: 1.5, ease: "easeInOut" }}
                                />
                            </motion.div>

                            {/* Decorative elements */}
                            <motion.div
                                className="absolute -top-20 -left-20 w-16 h-16 bg-accent/10 rounded-full"
                                animate={{
                                    y: [0, -20, 0],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <motion.div
                                className="absolute -bottom-16 -right-16 w-12 h-12 bg-primary/10 rounded-full"
                                animate={{
                                    y: [0, 20, 0],
                                    scale: [1, 1.3, 1],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5,
                                }}
                            />
                        </div>

                        {/* Particle effects */}
                        {particlePositions.map((pos, i) => (
                            <motion.div
                                key={`particle-${i}`}
                                className="absolute w-2 h-2 bg-accent/30 rounded-full"
                                style={{
                                    left: `${pos.left}px`,
                                    top: `${pos.top}px`,
                                }}
                                animate={{
                                    y: [0, -100, 0],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                    ease: "easeOut",
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
