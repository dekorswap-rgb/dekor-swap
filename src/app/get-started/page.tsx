"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
// You'll need to replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "service_skohlrk"; // Your service ID
const EMAILJS_TEMPLATE_ID = "template_s5u472g"; // Template for business (to you)
const EMAILJS_CUSTOMER_TEMPLATE_ID = "template_or9livy"; // Template for customer confirmation (create this)
const EMAILJS_PUBLIC_KEY = "IkC3SxbZdfzynJdTs"; // Your public key

export default function GetStarted() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        rentalItems: [] as string[],
        monthlyBudget: "",
        usageLocation: [] as string[],
        whatsapp: "",
        additionalComments: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const rentalOptions = [
        "Carpets/Rugs",
        "Lamps",
        "Plants",
        "Statement décor",
    ];

    const budgetOptions = ["₹499", "₹1499"];

    const locationOptions = ["Home", "Office", "Airbnb"];

    const handleCheckboxChange = (field: "rentalItems" | "usageLocation", value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter((item) => item !== value)
                : [...prev[field], value],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        // Validate required fields
        if (!formData.name || !formData.email || !formData.phone) {
            setError("Please fill in all required fields (Name, Email, Phone)");
            setIsSubmitting(false);
            return;
        }

        if (formData.rentalItems.length === 0) {
            setError("Please select at least one rental item");
            setIsSubmitting(false);
            return;
        }

        if (!formData.monthlyBudget) {
            setError("Please select your monthly budget");
            setIsSubmitting(false);
            return;
        }

        if (formData.usageLocation.length === 0) {
            setError("Please select where you'll use the items");
            setIsSubmitting(false);
            return;
        }


        try {
            // Prepare email data for business (to you)
            const businessEmailData = {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                rental_items: formData.rentalItems.join(", "),
                monthly_budget: formData.monthlyBudget,
                usage_location: formData.usageLocation.join(", "),
                whatsapp: formData.whatsapp || "Not provided",
                additional_comments: formData.additionalComments || "None",
                timestamp: new Date().toLocaleString(),
            };

            // Prepare email data for customer confirmation
            const customerEmailData = {
                to_name: formData.name,
                to_email: formData.email,
                rental_items: formData.rentalItems.join(", "),
                monthly_budget: formData.monthlyBudget,
                usage_location: formData.usageLocation.join(", "),
            };

            // Send inquiry email to business (dekorswap@gmail.com)
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                businessEmailData,
                EMAILJS_PUBLIC_KEY
            );

            // Send confirmation email to customer
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_CUSTOMER_TEMPLATE_ID,
                customerEmailData,
                EMAILJS_PUBLIC_KEY
            );

            setIsSuccess(true);
            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                rentalItems: [],
                monthlyBudget: "",
                usageLocation: [],
                whatsapp: "",
                additionalComments: "",
            });
        } catch (err) {
            console.error("Email send error:", err);
            setError("Failed to send inquiry. Please try again or contact us directly at dekorswap@gmail.com");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={48} className="text-green-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                        Thank you for your interest!
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        We've received your inquiry and will get back to you within 24 hours.
                        Check your email for confirmation.
                    </p>
                    <Button
                        size="lg"
                        className="rounded-full px-8 bg-primary"
                        onClick={() => (window.location.href = "/")}
                    >
                        Back to Home
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                        Get Started with <span className="text-accent">DekorSwap</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Tell us about your preferences and we'll help you transform your space.
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-border/50"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-primary mb-4">Your Information</h2>

                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-bold text-primary">
                                    Full Name <span className="text-accent">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="rounded-xl"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-bold text-primary">
                                        Email Address <span className="text-accent">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                        className="rounded-xl"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-bold text-primary">
                                        Phone Number <span className="text-accent">*</span>
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+91 9876543210"
                                        className="rounded-xl"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Q1: Rental Items */}
                        <div className="space-y-4 pt-6 border-t">
                            <h3 className="text-xl font-bold text-primary">
                                Q1. What would you rent for your space? <span className="text-accent">*</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {rentalOptions.map((option) => (
                                    <div key={option} className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-accent/50 transition-colors">
                                        <Checkbox
                                            id={option}
                                            checked={formData.rentalItems.includes(option)}
                                            onCheckedChange={() => handleCheckboxChange("rentalItems", option)}
                                        />
                                        <Label htmlFor={option} className="cursor-pointer flex-grow">
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Q2: Monthly Budget */}
                        <div className="space-y-4 pt-6 border-t">
                            <h3 className="text-xl font-bold text-primary">
                                Q2. Comfortable monthly spend? <span className="text-accent">*</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {budgetOptions.map((budget) => (
                                    <button
                                        key={budget}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, monthlyBudget: budget })}
                                        className={`p-6 rounded-xl border-2 transition-all text-lg font-bold ${formData.monthlyBudget === budget
                                            ? "border-accent bg-accent/10 text-accent"
                                            : "border-border hover:border-accent/50"
                                            }`}
                                    >
                                        {budget}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Q3: Usage Location */}
                        <div className="space-y-4 pt-6 border-t">
                            <h3 className="text-xl font-bold text-primary">
                                Q3. Where will you use it? <span className="text-accent">*</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {locationOptions.map((location) => (
                                    <div key={location} className="flex items-center space-x-3 p-4 rounded-xl border border-border hover:border-accent/50 transition-colors">
                                        <Checkbox
                                            id={location}
                                            checked={formData.usageLocation.includes(location)}
                                            onCheckedChange={() => handleCheckboxChange("usageLocation", location)}
                                        />
                                        <Label htmlFor={location} className="cursor-pointer flex-grow">
                                            {location}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Q4: WhatsApp (Optional) */}
                        <div className="space-y-2 pt-6 border-t">
                            <Label htmlFor="whatsapp" className="text-sm font-bold text-primary">
                                Q4. WhatsApp number (optional)
                            </Label>
                            <p className="text-sm text-muted-foreground mb-2">For early access / discount</p>
                            <Input
                                id="whatsapp"
                                type="tel"
                                value={formData.whatsapp}
                                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                placeholder="+91 9876543210"
                                className="rounded-xl"
                            />
                        </div>

                        {/* Additional Comments */}
                        <div className="space-y-2 pt-6 border-t">
                            <Label htmlFor="comments" className="text-sm font-bold text-primary">
                                Additional Comments or Questions
                            </Label>
                            <Textarea
                                id="comments"
                                value={formData.additionalComments}
                                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                                placeholder="Tell us anything else you'd like us to know..."
                                className="rounded-xl min-h-[120px]"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full rounded-full h-14 text-lg bg-accent hover:bg-accent/90 font-bold group"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 animate-spin" size={20} />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Submit Inquiry
                                    <Send size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            By submitting, you agree to our{" "}
                            <a href="#" className="text-accent hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    </form>
                </motion.div>

                {/* Contact Alternative */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center text-sm text-muted-foreground"
                >
                    <p>
                        Prefer to reach out directly?{" "}
                        <a href="mailto:dekorswap@gmail.com" className="text-accent hover:underline font-bold">
                            dekorswap@gmail.com
                        </a>{" "}
                        or call{" "}
                        <a href="tel:+919996234649" className="text-accent hover:underline font-bold">
                            +91 9996234649
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
