"use client";

import React from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import {
    Store,
    ShoppingCart,
    Award,
    Users,
    X,
    AlertOctagon,
    FileQuestion,
    Database,
    SearchX
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface NodeProps {
    icon: React.ElementType;
    label: string;
    subLabel?: string;
    color?: string;
    delay?: number;
}

// Reuse exact SaaS card style
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: any) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: "easeOut" },
    }),
};

const NodeCard = ({ icon: Icon, label, subLabel, color = "red", delay = 0 }: NodeProps) => {
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
                "border-slate-200 hover:border-red-200 hover:shadow-md"
            )}
        >
            <div
                className={cn(
                    "mb-3 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-slate-50 transition-colors group-hover:bg-opacity-80",
                    {
                        "text-red-500 bg-red-50": color === "red",
                        "text-slate-500 bg-slate-100": color === "slate",
                        "text-orange-500 bg-orange-50": color === "orange",
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

// SVG Blocked Connector
const BlockedPath = ({
    from,
    to,
    delay = 0,
}: {
    from: { x: number; y: number };
    to: { x: number; y: number };
    delay?: number;
}) => {
    const distance = Math.abs(to.x - from.x);
    const midX = from.x + distance / 2;
    const d = `M${from.x},${from.y} C${midX},${from.y} ${midX},${to.y} ${to.x},${to.y}`;

    return (
        <>
            <path d={d} stroke="#FECACA" strokeWidth="2" fill="none" strokeDasharray="6,6" className="opacity-50" />
            <motion.path
                d={d}
                stroke="#EF4444"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.4 }}
                transition={{ duration: 1.5, delay, ease: "easeOut" }}
            />
        </>
    );
};

// Explicit "Silo" Wall Component
const SiloWall = ({ x, height = 300 }: { x: number, height?: number }) => (
    <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-1/2 -translate-y-1/2 w-4 bg-slate-100 border border-slate-200 rounded-full flex flex-col items-center justify-center gap-2 overflow-hidden shadow-inner"
        style={{ left: x }}
    >
        <div className="w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.05)_75%,rgba(0,0,0,0.05)_100%)] bg-[length:10px_10px]" />
    </motion.div>
);

export default function ProblemViz({ stage = 3 }: { stage?: number }) {
    // stage 0: empty/start
    // stage 1: sources visible (Problem: Silos)
    // stage 2: middle visible (Problem: Walls)
    // stage 3: output visible (Problem: Churn) - Full View

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
                        {/* Sources -> Hit Wall */}
                        <AnimatePresence>
                            {showSources && (
                                <>
                                    <BlockedPath from={{ x: 200, y: 110 }} to={{ x: 400, y: 110 }} delay={0.5} />
                                    <BlockedPath from={{ x: 200, y: 250 }} to={{ x: 400, y: 250 }} delay={0.6} />
                                    <BlockedPath from={{ x: 200, y: 390 }} to={{ x: 400, y: 390 }} delay={0.7} />
                                </>
                            )}
                        </AnimatePresence>

                        {/* Manual X markers at barrier */}
                        {showMiddle && (
                            <>
                                <motion.foreignObject initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} x="340" y="100" width="20" height="20">
                                    <div className="w-5 h-5 bg-white rounded-full border border-red-200 flex items-center justify-center shadow-sm">
                                        <X className="w-3 h-3 text-red-500" />
                                    </div>
                                </motion.foreignObject>
                                <motion.foreignObject initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} x="340" y="240" width="20" height="20">
                                    <div className="w-5 h-5 bg-white rounded-full border border-red-200 flex items-center justify-center shadow-sm">
                                        <X className="w-3 h-3 text-red-500" />
                                    </div>
                                </motion.foreignObject>
                                <motion.foreignObject initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} x="340" y="380" width="20" height="20">
                                    <div className="w-5 h-5 bg-white rounded-full border border-red-200 flex items-center justify-center shadow-sm">
                                        <X className="w-3 h-3 text-red-500" />
                                    </div>
                                </motion.foreignObject>
                            </>
                        )}
                    </svg>

                    {/* Silo Walls */}
                    {showMiddle && (
                        <>
                            <SiloWall x={330} height={400} />
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="absolute left-[340px] top-10 text-[10px] font-bold text-red-300 uppercase rotate-90 origin-left tracking-widest whitespace-nowrap">
                                Data Silo
                            </motion.div>

                            <SiloWall x={600} height={400} />
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="absolute left-[610px] top-10 text-[10px] font-bold text-red-300 uppercase rotate-90 origin-left tracking-widest whitespace-nowrap">
                                Legacy Wall
                            </motion.div>
                        </>
                    )}

                    {/* 1. Sources - Left Aligned */}
                    {showSources && (
                        <>
                            <div className="absolute left-10 top-10">
                                <NodeCard icon={Store} label="POS System" subLabel="In-Store" color="slate" delay={0.1} />
                            </div>
                            <div className="absolute left-10 top-1/2 -translate-y-1/2">
                                <NodeCard icon={ShoppingCart} label="E-Commerce" subLabel="Online" color="slate" delay={0.2} />
                            </div>
                            <div className="absolute left-10 bottom-10">
                                <NodeCard icon={Award} label="Loyalty App" subLabel="Rewards" color="slate" delay={0.3} />
                            </div>
                        </>
                    )}

                    {/* 2. Middle - The Gap */}
                    {showMiddle && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ duration: 1 }}
                            className="absolute left-[400px] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-8 opacity-60 grayscale"
                        >
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
                                <Database className="w-5 h-5 text-slate-400" />
                                <span className="text-sm font-medium text-slate-500">Manual CSV Exports</span>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-3">
                                <FileQuestion className="w-5 h-5 text-slate-400" />
                                <span className="text-sm font-medium text-slate-500">Unmatched Records</span>
                            </div>
                        </motion.div>
                    )}

                    {/* 3. Output - Fragmented Results */}
                    {showOutput && (
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 space-y-4">
                            <motion.div
                                key="bad1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="p-4 bg-white border border-red-100 rounded-2xl shadow-sm w-64 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-1 bg-red-50 rounded-bl-lg">
                                    <AlertOctagon className="w-4 h-4 text-red-500" />
                                </div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">?</div>
                                    <div className="text-sm font-bold text-slate-700">Unknown User</div>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full w-1/4 bg-red-300" />
                                </div>
                                <p className="text-[10px] text-red-500 mt-2 font-medium">Incomplete Profile (25%)</p>
                            </motion.div>

                            <motion.div
                                key="bad2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="p-4 bg-white border border-red-100 rounded-2xl shadow-sm w-64 relative overflow-hidden opacity-70"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">JD</div>
                                    <div className="text-sm font-bold text-slate-700">John Doe</div>
                                </div>
                                <div className="text-[10px] text-slate-400 bg-slate-50 p-2 rounded border border-slate-100">
                                    Warning: 3 Duplicate Accounts Found
                                </div>
                            </motion.div>
                        </div>
                    )}
                </div>

                {/* Mobile View - Stacked */}
                <div className="lg:hidden flex flex-col gap-6 items-center w-full">
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <NodeCard icon={Store} label="POS System" color="slate" />
                        <NodeCard icon={ShoppingCart} label="E-Commerce" color="slate" />
                    </div>

                    <div className="w-full max-w-xs p-4 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center gap-2 text-red-500 font-bold text-sm">
                        <X className="w-4 h-4" /> DATA SILOS <X className="w-4 h-4" />
                    </div>

                    <div className="w-full max-w-xs space-y-3">
                        <div className="p-4 bg-white border border-red-100 rounded-2xl shadow-sm">
                            <p className="text-sm font-bold text-slate-700 mb-1">Fragmented View</p>
                            <p className="text-xs text-red-500">Unable to link online & offline behavior.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
