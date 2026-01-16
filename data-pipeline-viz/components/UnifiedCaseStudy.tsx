"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, CheckCircle2, Play, Pause, RotateCcw } from "lucide-react";
import DataPipeline from "./DataPipeline";
import ProblemViz from "./ProblemViz";
import { cn } from "@/lib/utils";

// --- Types for Story Mode ---
type Annotation = {
    id: string;
    start: number; // Progress % to start showing
    end: number;   // Progress % to stop showing
    text: string;
    x: number;     // Absolute position X (relative to container)
    y: number;     // Absolute position Y
    arrowDir: "top" | "bottom" | "left" | "right";
    width?: string;
};

// Narrative Data - Simplified for Layman Audience
const CHALLENGE_ANNOTATIONS: Annotation[] = [
    {
        id: "silos",
        start: 5, end: 35,
        text: "Customer data is trapped in separate systems",
        x: 140, y: 130,
        arrowDir: "left",
        width: "w-48"
    },
    {
        id: "blocked",
        start: 40, end: 70,
        text: "Teams struggle to connect the dots manually",
        x: 400, y: 280,
        arrowDir: "bottom",
        width: "w-56"
    },
    {
        id: "churn",
        start: 75, end: 95,
        text: "Result: We don't really know who our shoppers are",
        x: 750, y: 250,
        arrowDir: "right",
        width: "w-64"
    }
];

const SOLUTION_ANNOTATIONS: Annotation[] = [
    {
        id: "ingest",
        start: 5, end: 30,
        text: "All data flows together instantly",
        x: 230, y: 160,
        arrowDir: "left",
        width: "w-60"
    },
    {
        id: "processing",
        start: 35, end: 65,
        text: "Smart automation organizes everything",
        x: 550, y: 140,
        arrowDir: "bottom",
        width: "w-64"
    },
    {
        id: "output",
        start: 70, end: 95,
        text: "Now we see the full picture of every customer",
        x: 880, y: 200,
        arrowDir: "right",
        width: "w-64"
    }
];


const AnnotationPopup = ({ note }: { note: Annotation }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute z-50 pointer-events-none hidden lg:block"
            style={{ left: note.x, top: note.y }}
        >
            {/* Changed to White Card style for better UI Layman fit */}
            <div className={cn(
                "relative bg-white text-slate-800 text-sm font-medium px-4 py-3 rounded-xl shadow-xl border border-slate-200/50 backdrop-blur-sm",
                note.width || "w-48"
            )}>
                {note.text}

                {/* Detailed Arrow/Connector */}
                <div className={cn(
                    "absolute w-4 h-4 bg-white border-l border-t border-slate-200/50 rotate-45 transform",
                    note.arrowDir === "top" && "-top-2 left-1/2 -translate-x-1/2 bg-white",
                    note.arrowDir === "bottom" && "-bottom-2 left-1/2 -translate-x-1/2 rotate-[225deg] shadow-[-2px_-2px_5px_rgba(0,0,0,0.05)]",
                    note.arrowDir === "left" && "-left-2 top-1/2 -translate-y-1/2 -rotate-45",
                    note.arrowDir === "right" && "-right-2 top-1/2 -translate-y-1/2 rotate-[135deg]",
                )} />
            </div>
        </motion.div>
    );
};


export default function UnifiedCaseStudy() {
    const [mode, setMode] = useState<"challenge" | "solution">("challenge");
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Auto-play logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        if (mode === "challenge") {
                            setMode("solution");
                            return 0;
                        } else {
                            setIsPlaying(false);
                            return 100;
                        }
                    }
                    return prev + 0.4;
                });
            }, 50);
        } else {
            setProgress(0);
        }
        return () => clearInterval(interval);
    }, [isPlaying, mode]);

    const handleManualToggle = (target: "challenge" | "solution") => {
        setMode(target);
        setIsPlaying(false);
        setProgress(0);
    };

    // Determine ACTIVE STAGE based on progress
    const getStage = (prog: number) => {
        if (!isPlaying) return 3; // Show all if manual manual
        if (prog < 5) return 0;   // Start empty
        if (prog < 35) return 1;  // Step 1
        if (prog < 70) return 2;  // Step 2
        return 3;                 // Step 3
    };

    const currentStage = getStage(progress);

    // Determine active annotations
    const activeAnnotations = (mode === "challenge" ? CHALLENGE_ANNOTATIONS : SOLUTION_ANNOTATIONS)
        .filter(a => isPlaying && progress >= a.start && progress <= a.end);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-slate-900">
                        {mode === "challenge" ? "The Challenge" : "The Solution"}
                    </h2>
                    <p className="text-slate-500">
                        {mode === "challenge"
                            ? "Disconnected Data & Siloed Teams"
                            : "Unified Intelligence & Customer 360"
                        }
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
                    <button
                        onClick={() => handleManualToggle("challenge")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                            mode === "challenge"
                                ? "bg-white text-red-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                        )}
                    >
                        <BarChart3 className="w-4 h-4" />
                        Problem
                    </button>
                    <button
                        onClick={() => handleManualToggle("solution")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                            mode === "solution"
                                ? "bg-white text-emerald-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                        )}
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Solution
                    </button>
                </div>
            </div>

            {/* Main Display Area */}
            <div className="relative rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden min-h-[600px] ring-1 ring-slate-900/5 group">

                {/* Progress Bar */}
                {isPlaying && (
                    <div className="absolute top-0 left-0 h-1 z-50 transition-all duration-75 ease-linear w-full">
                        <div
                            className={cn("h-full transition-all duration-300",
                                mode === "challenge" ? "bg-red-500" : "bg-emerald-500"
                            )}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}

                {/* Narrative Overlays */}
                <AnimatePresence>
                    {activeAnnotations.map(note => (
                        <AnnotationPopup key={note.id} note={note} />
                    ))}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    {mode === "challenge" ? (
                        <motion.div
                            key="challenge"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full"
                        >
                            <div className="absolute top-6 left-6 z-20 px-3 py-1 bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-widest rounded-full">
                                Before
                            </div>
                            <ProblemViz stage={currentStage} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="solution"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full"
                        >
                            <div className="absolute top-6 left-6 z-20 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest rounded-full">
                                After
                            </div>
                            <DataPipeline stage={currentStage} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Action Button */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                    {!isPlaying && mode === "challenge" && (
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-semibold shadow-xl hover:scale-105 active:scale-95 transition-all hover:bg-slate-800 animate-pulse hover:animate-none"
                        >
                            <Play className="w-4 h-4 fill-current" />
                            Explain the Story
                        </button>
                    )}
                    {!isPlaying && mode === "solution" && (
                        <button
                            onClick={() => handleManualToggle("challenge")} // Reset to start
                            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold shadow-lg hover:bg-slate-50 transition-all"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Replay Tour
                        </button>
                    )}

                    {isPlaying && (
                        <div className="px-4 py-2 bg-white/90 text-slate-600 text-xs font-bold rounded-full backdrop-blur border border-slate-200 shadow-lg">
                            {mode === "challenge" ? "Analyzing the Problem..." : "Showing the Solution..."}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
