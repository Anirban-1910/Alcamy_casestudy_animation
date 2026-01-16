"use client";

import React from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import {
    Store,
    ShoppingCart,
    Award,
    Database,
    Server,
    Zap,
    CheckCircle,
    TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface NodeProps {
    icon: React.ElementType;
    label: string;
    subLabel?: string;
    color?: string;
    delay?: number;
    isProcessing?: boolean;
}

// Animation Variants
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: any) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: "easeOut" },
    }),
};

const pulseGlowVariants: Variants = {
    animate: {
        boxShadow: [
            "0 0 0 0px rgba(245, 158, 11, 0)",
            "0 0 0 6px rgba(245, 158, 11, 0.2)",
            "0 0 0 0px rgba(245, 158, 11, 0)",
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

const NodeCard = ({ icon: Icon, label, subLabel, color = "blue", delay = 0, isProcessing = false }: NodeProps) => {
    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            viewport={{ once: true, margin: "-50px" }}
            custom={delay}
            className={cn(
                "relative z-10 flex flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-sm transition-all md:p-5 w-32 md:w-36 lg:w-40 text-center group",
                "border-slate-200 hover:border-blue-300 hover:shadow-md"
            )}
        >
            {/* Processing Pulse Effect */}
            {isProcessing && (
                <motion.div
                    className="absolute inset-0 rounded-2xl"
                    variants={pulseGlowVariants}
                    animate="animate"
                />
            )}

            <div
                className={cn(
                    "mb-3 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-slate-50 transition-colors group-hover:bg-opacity-80",
                    {
                        "text-blue-500 bg-blue-50": color === "blue",
                        "text-emerald-500 bg-emerald-50": color === "emerald",
                        "text-purple-500 bg-purple-50": color === "purple",
                        "text-amber-500 bg-amber-50": color === "amber",
                    }
                )}
            >
                <Icon className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <h3 className="text-xs md:text-sm font-semibold text-slate-800">{label}</h3>
            {subLabel && <p className="mt-1 text-[10px] md:text-xs text-slate-500">{subLabel}</p>}
        </motion.div>
    );
};

// Detailed Profile Card for Customer 360
const CustomerProfileCard = ({ delay }: { delay: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay, duration: 0.6, type: "spring" }}
            className="relative z-20 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
        >
            {/* Header */}
            <div className="bg-emerald-50/50 p-4 border-b border-emerald-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold border border-emerald-200">
                    JD
                </div>
                <div>
                    <div className="text-sm font-bold text-slate-800">John Doe</div>
                    <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> VIP Member
                    </div>
                </div>
            </div>

            {/* Metrics */}
            <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">Churn Risk</span>
                    <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Low (2%)</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 w-[2%] h-full rounded-full" />
                </div>

                <div className="flex justify-between items-center text-xs pt-2">
                    <span className="text-slate-500">LTV Prediction</span>
                    <div className="flex items-center gap-1 text-slate-800 font-bold">
                        <TrendingUp className="w-3 h-3 text-blue-500" /> $4,250
                    </div>
                </div>

                <div className="pt-2">
                    <span className="text-xs text-slate-500 block mb-1">Top Preferences</span>
                    <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] text-slate-600">Electronics</span>
                        <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded text-[10px] text-slate-600">Apple</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


// SVG Connector Lines
const AnimatedPath = ({
    from,
    to,
    delay = 0,
    duration = 2,
    showParticles = false
}: {
    from: { x: number; y: number };
    to: { x: number; y: number };
    delay?: number;
    duration?: number;
    showParticles?: boolean;
}) => {
    const distance = Math.abs(to.x - from.x);
    const midX = from.x + distance / 2;
    const d = `M${from.x},${from.y} C${midX},${from.y} ${midX},${to.y} ${to.x},${to.y}`;

    return (
        <>
            <path d={d} stroke="#e2e8f0" strokeWidth="2" fill="none" className="opacity-50" />
            <motion.path
                d={d}
                stroke="#3b82f6"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration, delay, ease: "easeInOut" }}
            />

            {showParticles && (
                <>
                    <circle r="3" fill="#3b82f6">
                        <animateMotion
                            dur={`${duration * 1.5}s`}
                            repeatCount="indefinite"
                            path={d}
                            rotate="auto"
                            calcMode="linear"
                        />
                    </circle>
                    <circle r="2" fill="#60a5fa" opacity="0.6">
                        <animateMotion
                            dur={`${duration * 1.5}s`}
                            begin={`${duration * 0.75}s`}
                            repeatCount="indefinite"
                            path={d}
                            rotate="auto"
                            calcMode="linear"
                        />
                    </circle>
                </>
            )}
        </>
    );
};

export default function DataPipeline({ stage = 3 }: { stage?: number }) {
    // stage 0: empty
    // stage 1: sources visible (Ingest)
    // stage 2: processing visible (Unified/Processing)
    // stage 3: output visible (Customer 360)

    const showSources = stage >= 1;
    const showMiddle = stage >= 2;
    const showOutput = stage >= 3;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-10 min-h-[600px] flex items-center justify-center overflow-hidden font-sans select-none">
            <div className="relative w-full max-w-6xl">

                {/* Desktop Diagram */}
                <div className="relative hidden lg:block h-[500px] w-full">
                    {/* SVG Overlay */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                        <AnimatePresence>
                            {/* Sources -> ETL */}
                            {showSources && (
                                <>
                                    <AnimatedPath from={{ x: 200, y: 110 }} to={{ x: 360, y: 250 }} delay={0.5} duration={2} showParticles={showMiddle} />
                                    <AnimatedPath from={{ x: 200, y: 250 }} to={{ x: 360, y: 250 }} delay={0.6} duration={2.2} showParticles={showMiddle} />
                                    <AnimatedPath from={{ x: 200, y: 390 }} to={{ x: 360, y: 250 }} delay={0.7} duration={2.4} showParticles={showMiddle} />
                                </>
                            )}

                            {/* ETL -> Storage */}
                            {showMiddle && (
                                <AnimatedPath from={{ x: 740, y: 250 }} to={{ x: 770, y: 250 }} delay={0.2} duration={1.5} showParticles={showOutput} />
                            )}

                            {/* Storage -> Output */}
                            {showOutput && (
                                <AnimatedPath from={{ x: 930, y: 250 }} to={{ x: 1000, y: 250 }} delay={0.2} duration={1.5} showParticles />
                            )}
                        </AnimatePresence>
                    </svg>

                    {/* 1. Sources - Left Aligned */}
                    {showSources && (
                        <>
                            <div className="absolute left-10 top-10">
                                <NodeCard icon={Store} label="POS System" subLabel="In-Store" color="blue" delay={0.1} />
                            </div>
                            <div className="absolute left-10 top-1/2 -translate-y-1/2">
                                <NodeCard icon={ShoppingCart} label="E-Commerce" subLabel="Online" color="blue" delay={0.2} />
                            </div>
                            <div className="absolute left-10 bottom-10">
                                <NodeCard icon={Award} label="Loyalty App" subLabel="Rewards" color="blue" delay={0.3} />
                            </div>
                        </>
                    )}

                    {/* 2. ETL Layer - Center-Left */}
                    {showMiddle && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="absolute left-[550px] top-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                <div className="relative px-8 py-8 bg-white/50 backdrop-blur rounded-3xl border border-dotted border-slate-300 flex gap-6 shadow-sm">
                                    <div className="absolute -top-3 left-6 px-3 py-0.5 bg-amber-50 border border-amber-100 rounded-full text-[10px] font-bold text-amber-600 tracking-wider uppercase shadow-sm">
                                        Processing Layer
                                    </div>
                                    <NodeCard icon={Zap} label="Spark" subLabel="ETL/ELT" color="amber" delay={0.1} isProcessing />
                                    <NodeCard icon={Server} label="Airflow" subLabel="Orchestrator" color="amber" delay={0.2} isProcessing />
                                </div>
                            </motion.div>

                            {/* 3. Storage - Center-Right */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="absolute left-[850px] top-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                <div className="bg-purple-50/30 p-4 rounded-[2rem] border border-purple-100/50">
                                    <NodeCard icon={Database} label="Data Lakehouse" subLabel="S3 + Delta Lake" color="purple" delay={0.4} />
                                </div>
                            </motion.div>
                        </>
                    )}

                    {/* 4. Output - Right Aligned */}
                    {showOutput && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2">
                            <div className="relative">
                                <div className="absolute -top-10 left-0 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-md mb-2 animate-bounce">
                                    Live Output
                                </div>
                                <CustomerProfileCard delay={0.5} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile View */}
                <div className="lg:hidden flex flex-col gap-6 items-center px-4">
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <NodeCard icon={Store} label="POS System" color="blue" />
                        <NodeCard icon={ShoppingCart} label="E-Commerce" color="blue" />
                    </div>
                    {showMiddle && (
                        <>
                            <div className="p-6 bg-amber-50/50 rounded-2xl border border-amber-200/50 w-full max-w-xs flex gap-4 justify-center">
                                <NodeCard icon={Zap} label="Spark" color="amber" isProcessing />
                                <NodeCard icon={Server} label="Airflow" color="amber" isProcessing />
                            </div>
                            <NodeCard icon={Database} label="Data Lakehouse" color="purple" />
                        </>
                    )}
                    {showOutput && <CustomerProfileCard delay={0.5} />}
                </div>
            </div>
        </div>
    );
}
