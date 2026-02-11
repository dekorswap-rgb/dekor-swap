"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizResults from "./QuizResults";

interface QuizOption {
    id: string;
    label: string;
    emoji: string;
    description?: string;
    imageUrl?: string;
    nextQuestion: string;
    styleWeights?: Record<string, number>;
}

interface QuizQuestion {
    id: string;
    type: string;
    question: string;
    emoji: string;
    options: QuizOption[];
}

interface QuizData {
    questions: QuizQuestion[];
    styles: Record<string, any>;
}

export default function QuizContainer() {
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [currentQuestionId, setCurrentQuestionId] = useState("q1");
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [styleScores, setStyleScores] = useState<Record<string, number>>({});
    const [showResults, setShowResults] = useState(false);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        fetch("/data/quiz-questions.json")
            .then((res) => res.json())
            .then((data) => setQuizData(data));
    }, []);

    if (!quizData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    const currentQuestion = quizData.questions.find((q) => q.id === currentQuestionId);
    const questionIndex = quizData.questions.findIndex((q) => q.id === currentQuestionId);
    const progress = ((questionIndex + 1) / quizData.questions.length) * 100;

    const handleAnswer = (option: QuizOption) => {
        const newAnswers = { ...answers, [currentQuestionId]: option.id };
        setAnswers(newAnswers);

        // Update style scores
        if (option.styleWeights) {
            const newScores = { ...styleScores };
            Object.entries(option.styleWeights).forEach(([style, weight]) => {
                newScores[style] = (newScores[style] || 0) + weight;
            });
            setStyleScores(newScores);
        }

        // Navigate to next question or results
        if (option.nextQuestion === "result") {
            setShowResults(true);
        } else {
            setDirection(1);
            setTimeout(() => setCurrentQuestionId(option.nextQuestion), 100);
        }
    };

    const handleBack = () => {
        const prevQuestionIndex = questionIndex - 1;
        if (prevQuestionIndex >= 0) {
            setDirection(-1);
            const prevQuestion = quizData.questions[prevQuestionIndex];
            setCurrentQuestionId(prevQuestion.id);

            // Remove the answer for current question
            const newAnswers = { ...answers };
            delete newAnswers[currentQuestionId];
            setAnswers(newAnswers);
        }
    };

    if (showResults) {
        return <QuizResults styleScores={styleScores} styles={quizData.styles} answers={answers} />;
    }

    if (!currentQuestion) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 py-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-muted-foreground">
                            Question {questionIndex + 1} of {quizData.questions.length}
                        </span>
                        <span className="text-sm font-medium text-accent">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-accent to-accent/70"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestionId}
                        initial={{ opacity: 0, x: direction * 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -50 }}
                        transition={{ duration: 0.3 }}
                        className="mb-12"
                    >
                        <div className="text-center mb-12">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="text-6xl mb-6"
                            >
                                {currentQuestion.emoji}
                            </motion.div>
                            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                                {currentQuestion.question}
                            </h2>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQuestion.options.map((option, index) => (
                                <motion.button
                                    key={option.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    onClick={() => handleAnswer(option)}
                                    className="group relative overflow-hidden rounded-2xl border-2 border-border hover:border-accent transition-all p-6 text-left bg-white hover:shadow-xl"
                                >
                                    {option.imageUrl && (
                                        <div className="aspect-video rounded-xl overflow-hidden mb-4">
                                            <img
                                                src={option.imageUrl}
                                                alt={option.label}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-start gap-4">
                                        <span className="text-4xl shrink-0">{option.emoji}</span>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                                                {option.label}
                                            </h3>
                                            {option.description && (
                                                <p className="text-sm text-muted-foreground">{option.description}</p>
                                            )}
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                {questionIndex > 0 && (
                    <div className="flex justify-center mt-8">
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            className="rounded-full"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
