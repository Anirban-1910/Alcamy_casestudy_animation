import UnifiedCaseStudy from "@/components/UnifiedCaseStudy";
import { ArrowRight, CheckCircle2, BarChart3, Globe2, AlertOctagon } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white font-sans">
      {/* Navbar */}
      <nav className="w-full border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">Alchemy</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Case Studies</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Services</a>
            <a href="#" className="hover:text-blue-600 transition-colors">About Us</a>
          </div>
          <button className="px-5 py-2 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all hover:shadow-lg">
            Contact Sales
          </button>
        </div>
      </nav>

      <div className="relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          {/* Case Study Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-sm font-semibold text-blue-700 mb-8">
              <Globe2 className="w-4 h-4" />
              <span>Retail & CPG Case Study</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
              Data Engineering for <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Retail Customer Analytics
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Helping a <strong>Global Retail Chain</strong> unify millions of daily transactions into a single source of truth.
            </p>
          </div>

          {/* Unified Visualization Section */}
          <div className="mb-24">
            <UnifiedCaseStudy />
          </div>

          {/* Detailed Text Breakdown (Optional / Below Fold) */}
          <div className="grid md:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center text-red-500">
                  <BarChart3 className="w-4 h-4" />
                </div>
                The Challenge
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Customer data was fragmented across POS systems, e-commerce portals, and loyalty programs. This data silo prevented personalization and led to high churn rates.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-2 text-slate-700 text-sm">
                  <AlertOctagon className="w-4 h-4 text-red-400 mt-0.5" />
                  No unified customer view
                </li>
                <li className="flex gap-2 text-slate-700 text-sm">
                  <AlertOctagon className="w-4 h-4 text-red-400 mt-0.5" />
                  Manual data processing overhead
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                The Solution
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                We implemented a Data Lakehouse architecture using AWS S3 and Delta Lake, orchestrated by Airflow and processed via Spark, enabling real-time Customer 360 profiles.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-2 text-slate-700 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                  Real-time Churn Prediction
                </li>
                <li className="flex gap-2 text-slate-700 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                  Unified buying history
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
