"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";

interface FAQQuestion {
    id: string;
    question: string;
    answer: string;
}

interface FAQCategory {
    id: string;
    name: string;
    emoji: string;
    questions: FAQQuestion[];
}

interface FAQData {
    categories: FAQCategory[];
}

export default function FAQPage() {
    const [faqData, setFaqData] = useState<FAQData | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        fetch("/data/faq-data.json")
            .then((res) => res.json())
            .then((data) => setFaqData(data));
    }, []);

    if (!faqData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    const toggleQuestion = (id: string) => {
        const newOpen = new Set(openQuestions);
        if (newOpen.has(id)) {
            newOpen.delete(id);
        } else {
            newOpen.add(id);
        }
        setOpenQuestions(newOpen);
    };

    const filteredCategories = faqData.categories.map((category) => ({
        ...category,
        questions: category.questions.filter(
            (q) =>
                q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    })).filter((cat) => cat.questions.length > 0 && (!selectedCategory || cat.id === selectedCategory));

    return (
        <div className="pt-32 pb-24 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Find answers to common questions about DekorSwap. Can't find what you're looking for? Contact us!
                    </p>
                </div>

                {/* Search */}
                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="mb-12">
                    <div className="flex flex-wrap gap-2 justify-center">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === null
                                    ? "bg-accent text-white"
                                    : "bg-white border border-border hover:border-accent"
                                }`}
                        >
                            All Categories
                        </button>
                        {faqData.categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.id
                                        ? "bg-accent text-white"
                                        : "bg-white border border-border hover:border-accent"
                                    }`}
                            >
                                {category.emoji} {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQ Categories */}
                <div className="space-y-12">
                    {filteredCategories.map((category, catIndex) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: catIndex * 0.1 }}
                        >
                            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                                <span className="text-3xl">{category.emoji}</span>
                                {category.name}
                            </h2>
                            <div className="space-y-4">
                                {category.questions.map((question) => (
                                    <div
                                        key={question.id}
                                        className="bg-white rounded-xl border border-border overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleQuestion(question.id)}
                                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-accent/5 transition-colors"
                                        >
                                            <span className="font-semibold text-primary pr-4">
                                                {question.question}
                                            </span>
                                            <ChevronDown
                                                className={`w-5 h-5 text-accent shrink-0 transition-transform ${openQuestions.has(question.id) ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {openQuestions.has(question.id) && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="px-6 pb-4 text-muted-foreground leading-relaxed">
                                                        {question.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredCategories.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-lg text-muted-foreground mb-4">
                            No questions found matching your search.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory(null);
                            }}
                            className="text-accent hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                {/* Contact CTA */}
                <div className="mt-20 bg-accent/5 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-primary mb-3">
                        Still have questions?
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        Our team is here to help! Reach out and we'll get back to you within 24 hours.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent/90 transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}
