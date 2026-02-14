"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, RefreshCw, Box, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SustainabilityImpact from "@/components/SustainabilityImpact";
import HomePageLoader from "@/components/HomePageLoader";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <>
      <HomePageLoader />
      <div className="flex flex-col w-full overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="z-10"
            >
              <motion.div variants={fadeIn}>
                <Badge className="mb-6 bg-accent/10 text-accent hover:bg-accent/20 border-none px-4 py-1">
                  New: Winter Collection 2026
                </Badge>
              </motion.div>
              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-7xl font-bold leading-[1.1] text-primary mb-6"
              >
                Swap your décor,<br />
                <span className="text-accent italic">Endless Style.</span>
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed"
              >
                Curated home décor delivered monthly. Rotate items. No commitment. No clutter. Just pure style, tailored to you.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started">
                  <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-primary group">
                    Get Started
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-primary/20 hover:bg-primary/5">
                    How It Works
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000"
                  alt="Scandinavian Interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-border flex items-center gap-3 z-20"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                  <RefreshCw size={24} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Next Swap</p>
                  <p className="font-bold text-primary">In 12 Days</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-border flex items-center gap-3 z-20"
              >
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
                  <Check size={24} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Eco-Friendly</p>
                  <p className="font-bold text-primary">100% Circular</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary tracking-tight">How it works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Three simple steps to a fresh home every single month.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: <Smile size={32} />,
                  title: "Choose your style",
                  desc: "Take our style quiz or browse collections to tell us what you love."
                },
                {
                  icon: <Box size={32} />,
                  title: "Receive curated décor",
                  desc: "Every month, we deliver a box of high-quality items tailored to your space."
                },
                {
                  icon: <RefreshCw size={32} />,
                  title: "Swap & refresh",
                  desc: "Love it? Keep it another month. Bored? Swap it for something new."
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center text-center p-8 rounded-2xl bg-brand-offwhite/50 border border-transparent hover:border-accent/10 transition-all"
                >
                  <div className="w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent/20">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Items Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary tracking-tight">Curated for you</h2>
                <p className="text-muted-foreground text-lg">
                  Explore a few items from our January collection. High-quality materials, premium design.
                </p>
              </div>
              <Link href="/pricing" className="text-accent font-bold flex items-center gap-2 hover:gap-3 transition-all">
                View All Plans <ArrowRight size={20} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  img: "https://images.unsplash.com/photo-1581781870027-04212e231e96?auto=format&fit=crop&q=80&w=600",
                  tag: "Vases",
                  name: "Ceramic Ribbed Vase"
                },
                {
                  img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600",
                  tag: "Lighting",
                  name: "Nordic Desk Lamp"
                },
                {
                  img: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600",
                  tag: "Plants",
                  name: "Tapered Clay Planter"
                },
                {
                  img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600",
                  tag: "Art",
                  name: "Minimalist Line Art"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4 relative">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-primary hover:bg-white border-none backdrop-blur-sm">
                        {item.tag}
                      </Badge>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-primary">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">Available in Standard & Premium</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section / CTA */}
        <section className="py-24 px-6 bg-brand-charcoal text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Stop buying clutter. <br />
              Start swapping style.
            </h2>
            <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto">
              Join the community of design enthusiasts who are keeping their homes fresh and our planet green through circular décor.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/pricing">
                <Button size="lg" className="rounded-full px-10 h-16 text-lg bg-accent hover:bg-accent/90 w-full sm:w-auto">
                  Start Your Subscription
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg border-white/20 hover:bg-white/10 text-black w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50">
              <div className="flex items-center gap-2">
                <Check className="text-accent" />
                <span>No commitment</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-accent" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-accent" />
                <span>Free swap service</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Impact Section */}
        <SustainabilityImpact />

        {/* Newsletter */}
        <section className="py-24 px-6 border-t">
          <div className="max-w-5xl mx-auto bg-accent/5 rounded-3xl p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary tracking-tight">Get design tips & early access</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Subscribe to our newsletter for home styling tips and be the first to know about new collections.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="rounded-full px-10 bg-primary text-lg"
                asChild
              >
                <a href="mailto:dekorswap@gmail.com?subject=Newsletter%20Subscription%20Request&body=Hi%20DekorSwap%20Team%2C%0A%0AI%27d%20love%20to%20subscribe%20to%20your%20newsletter%20and%20stay%20updated%20on%20the%20latest%20home%20d%C3%A9cor%20trends%2C%20styling%20tips%2C%20and%20new%20collections.%0A%0APlease%20add%20me%20to%20your%20mailing%20list!%0A%0AThank%20you%2C%0A">
                  Subscribe to Newsletter
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
