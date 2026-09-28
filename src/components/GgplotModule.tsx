/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart3, 
  Layers, 
  Sparkles, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Database,
  Sliders,
  Shapes,
  Palette,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Tag,
  SlidersHorizontal
} from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { QuizCard } from './QuizCard';

interface GgplotModuleProps {
  onQuizComplete?: (quizId: string, isCorrect: boolean) => void;
  targetSubSection?: string | null;
}

export function GgplotModule({ onQuizComplete, targetSubSection }: GgplotModuleProps) {
  // Stepper state for gradual deconstruction - start at Layer 1 so learners build gradually
  const [activeStep, setActiveStep] = useState<number>(1);

  // Accordion state for hidden compartments - all collapsed by default to prevent cognitive overload
  const [openCompartments, setOpenCompartments] = useState<Record<string, boolean>>({
    geoms: false,
    aesthetics: false,
    labels: false,
    assignment: false
  });

  const toggleCompartment = (key: string) => {
    setOpenCompartments((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Automatically open the targeted compartment if clicked from navigation or hash
  React.useEffect(() => {
    const handleTarget = (id: string) => {
      if (id === 'mod7-geoms') setOpenCompartments((prev) => ({ ...prev, geoms: true }));
      if (id === 'mod7-aesthetics') setOpenCompartments((prev) => ({ ...prev, aesthetics: true }));
      if (id === 'mod7-labels') setOpenCompartments((prev) => ({ ...prev, labels: true }));
      if (id === 'mod7-assignment') setOpenCompartments((prev) => ({ ...prev, assignment: true }));
      if (id === 'mod7-layers') setActiveStep(1);
    };

    if (targetSubSection) {
      handleTarget(targetSubSection);
    }

    const onHashChange = () => {
      const h = window.location.hash.replace('#', '');
      if (h) handleTarget(h);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [targetSubSection]);

  const steps = [
    {
      step: 1,
      title: '1. The Canvas (Data)',
      code: `library(ggplot2)\n\n# Step 1: Blank canvas with mtcars\nggplot(data = mtcars)`,
      explanation: 'Tells R which data frame to visualize. By itself, this creates a blank canvas. No coordinates or points are drawn yet because R doesn\'t know which columns to place on the axes.'
    },
    {
      step: 2,
      title: '2. Aesthetics (Axes & Mapping)',
      code: `library(ggplot2)\n\n# Step 2: Map variables to coordinates\nggplot(data = mtcars, aes(x = wt, y = mpg))`,
      explanation: 'aes() maps your columns to visual coordinates. Here, wt (weight) is mapped to the X-axis and mpg is mapped to the Y-axis. The grid lines and tick scales appear, but no data marks are plotted yet.'
    },
    {
      step: 3,
      title: '3. Geometry (geom_point)',
      code: `library(ggplot2)\n\n# Step 3: Add scatter points with +\nggplot(data = mtcars, aes(x = wt, y = mpg)) +\n  geom_point(size = 3)`,
      explanation: 'Using the + sign, we add a geometry layer. geom_point() draws a scatter point for every car in the dataset. Notice the clear negative trend: heavier cars get lower MPG.'
    },
    {
      step: 4,
      title: '4. Categorical Coloring (factor)',
      code: `library(ggplot2)\n\n# Step 4: Color by cylinder groups\nggplot(data = mtcars, aes(x = wt, y = mpg, color = factor(cyl))) +\n  geom_point(size = 3)`,
      explanation: 'Adding color = factor(cyl) inside aes() groups points by cylinder count (4, 6, 8) with distinct colors and an automatic legend. Wrapping cyl in factor() ensures R treats it as categories rather than a continuous number gradient.'
    },
    {
      step: 5,
      title: '5. Polish (labs & theme)',
      code: `library(ggplot2)\n\n# Step 5: Professional labels & clean theme\nggplot(data = mtcars, aes(x = wt, y = mpg, color = factor(cyl))) +\n  geom_point(size = 3) +\n  labs(\n    title = "Car Weight vs. MPG",\n    subtitle = "Grouped by engine cylinder count (mtcars)",\n    x = "Weight (1,000 lbs)",\n    y = "Miles Per Gallon (MPG)",\n    color = "Cylinders"\n  ) +\n  theme_minimal()`,
      explanation: 'labs() replaces raw column names with readable titles, axis labels, and legend headers. theme_minimal() cleans up the background for presentation-ready figures.'
    }
  ];

  const currentStepData = steps[activeStep - 1];

  return (
    <section id="mod7" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-6 space-y-8">
      {/* Module Header */}
      <div className="flex items-center gap-3 border-b-2 border-sky-100 pb-4">
        <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-sky-50 text-[#20639B] border border-sky-200">
          MODULE 07
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          ggplot
        </h2>
      </div>

      {/* Brief Intro */}
      <div>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-2">
          <strong>ggplot2</strong> is the gold standard for data visualization in R, built upon the <strong>Grammar of Graphics</strong>.
        </p>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Instead of memorizing separate functions for each chart, you assemble plots layer-by-layer using the simple <code className="font-bold font-mono text-[#0000ff]">+</code> operator: 
          <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs ml-1 font-semibold">ggplot(data, aes(...)) + geom_*()</code>.
        </p>
      </div>

      {/* SECTION 1: THE FINISHED PLOT */}
      <div id="mod7-overview" className="bg-slate-50 border border-slate-200 rounded-xl p-5 scroll-mt-20">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#20639B]" />
          <h3 className="font-bold text-slate-900 text-base">The Finished Plot in One Command</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          Here is the complete plot we are building before we inspect each layer. It plots car weight (<code className="font-mono text-xs">wt</code>) versus fuel efficiency (<code className="font-mono text-xs">mpg</code>) colored by cylinder count:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-7">
            <CodeBlock
              title="finished_ggplot.R"
              code={`library(ggplot2)

ggplot(data = mtcars, aes(x = wt, y = mpg, color = factor(cyl))) +
  geom_point(size = 3) +
  labs(
    title = "Car Weight vs. Fuel Efficiency",
    x = "Weight (1,000 lbs)",
    y = "Miles Per Gallon (MPG)",
    color = "Cylinders"
  )`}
            />
          </div>

          {/* Result preview */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-3 shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Preview</span>
              <span className="text-[#20639B] font-mono text-[10px]">mtcars</span>
            </div>

            <svg viewBox="0 0 320 200" className="w-full h-auto bg-slate-50/70 rounded border border-slate-200">
              {/* Axes lines */}
              <line x1="38" y1="160" x2="260" y2="160" stroke="#94a3b8" strokeWidth="1" />
              <line x1="38" y1="25" x2="38" y2="160" stroke="#94a3b8" strokeWidth="1" />
              {/* Grid */}
              <line x1="38" y1="120" x2="260" y2="120" stroke="#e2e8f0" strokeDasharray="2 2" />
              <line x1="38" y1="80" x2="260" y2="80" stroke="#e2e8f0" strokeDasharray="2 2" />
              <line x1="38" y1="40" x2="260" y2="40" stroke="#e2e8f0" strokeDasharray="2 2" />
              <line x1="110" y1="25" x2="110" y2="160" stroke="#e2e8f0" strokeDasharray="2 2" />
              <line x1="180" y1="25" x2="180" y2="160" stroke="#e2e8f0" strokeDasharray="2 2" />
              <line x1="250" y1="25" x2="250" y2="160" stroke="#e2e8f0" strokeDasharray="2 2" />

              {/* Title */}
              <text x="38" y="16" fontSize="9" fontWeight="bold" fill="#0f172a">Car Weight vs. Fuel Efficiency</text>
              {/* Axis labels */}
              <text x="150" y="185" textAnchor="middle" fontSize="8" fill="#475569" fontWeight="600">Weight (1,000 lbs)</text>
              <text x="12" y="90" textAnchor="middle" fontSize="8" fill="#475569" fontWeight="600" transform="rotate(-90 12 90)">MPG</text>

              {/* Points (colored by 4=orange, 6=green, 8=blue) */}
              {/* 4 cyl */}
              <circle cx="70" cy="55" r="3.5" fill="#f97316" />
              <circle cx="85" cy="65" r="3.5" fill="#f97316" />
              <circle cx="95" cy="72" r="3.5" fill="#f97316" />
              <circle cx="110" cy="80" r="3.5" fill="#f97316" />

              {/* 6 cyl */}
              <circle cx="125" cy="95" r="3.5" fill="#10b981" />
              <circle cx="140" cy="100" r="3.5" fill="#10b981" />
              <circle cx="155" cy="105" r="3.5" fill="#10b981" />

              {/* 8 cyl */}
              <circle cx="170" cy="120" r="3.5" fill="#20639B" />
              <circle cx="190" cy="130" r="3.5" fill="#20639B" />
              <circle cx="210" cy="140" r="3.5" fill="#20639B" />
              <circle cx="230" cy="148" r="3.5" fill="#20639B" />

              {/* Legend */}
              <rect x="268" y="50" width="46" height="65" rx="3" fill="white" stroke="#cbd5e1" strokeWidth="0.8" />
              <text x="272" y="62" fontSize="7" fontWeight="bold" fill="#334155">Cylinders</text>
              <circle cx="276" cy="75" r="2.5" fill="#f97316" />
              <text x="283" y="78" fontSize="7" fill="#475569">4</text>
              <circle cx="276" cy="88" r="2.5" fill="#10b981" />
              <text x="283" y="91" fontSize="7" fill="#475569">6</text>
              <circle cx="276" cy="101" r="2.5" fill="#20639B" />
              <text x="283" y="104" fontSize="7" fill="#475569">8</text>
            </svg>
          </div>
        </div>
      </div>

      {/* SECTION 2: GRADUAL STEP-BY-STEP DECONSTRUCTION */}
      <div id="mod7-layers" className="border-2 border-sky-100 rounded-xl p-5 bg-sky-50/30 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#20639B]" />
            <h3 className="font-bold text-slate-900 text-base">
              Taking It Apart: Layer by Layer
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Click any layer to see what it adds
          </span>
        </div>

        {/* Step Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
          {steps.map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStep(s.step)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                activeStep === s.step
                  ? 'bg-[#20639B] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className={`text-[10px] font-mono uppercase ${activeStep === s.step ? 'text-sky-200' : 'text-slate-400'}`}>
                Layer {s.step}
              </span>
              <span className="truncate">{s.title.split('. ')[1]}</span>
            </button>
          ))}
        </div>

        {/* Active Step Showcase: Code on left, Visual on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          {/* Left: Code & Explanation */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#20639B] uppercase tracking-wide">
                  {currentStepData.title}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Step {activeStep} of 5
                </span>
              </div>

              <CodeBlock
                title={`layer_${activeStep}.R`}
                code={currentStepData.code}
              />

              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                {currentStepData.explanation}
              </p>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                disabled={activeStep === 1}
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Previous Layer
              </button>

              <button
                type="button"
                disabled={activeStep === 5}
                onClick={() => setActiveStep((prev) => Math.min(5, prev + 1))}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#20639B] hover:bg-[#174a75] text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors shadow-2xs"
              >
                Next Layer
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Dynamic Layer Visual Preview */}
          <div className="lg:col-span-5 bg-slate-50 rounded-lg p-3 border border-slate-200 flex flex-col items-center justify-center min-h-[220px]">
            <div className="w-full text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Dynamic Visual State</span>
              <span className="text-[#20639B] font-mono text-[10px]">Layer {activeStep}</span>
            </div>

            <svg viewBox="0 0 320 200" className="w-full h-auto bg-white rounded border border-slate-200">
              {/* Step 1: Blank canvas with subtle outline */}
              {activeStep >= 1 && (
                <rect x="35" y="25" width="230" height="135" fill={activeStep === 1 ? '#f8fafc' : 'white'} />
              )}

              {/* Step 2+: Axes, ticks, labels appear */}
              {activeStep >= 2 && (
                <>
                  <line x1="38" y1="160" x2="260" y2="160" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="38" y1="25" x2="38" y2="160" stroke="#94a3b8" strokeWidth="1" />
                  <line x1="38" y1="120" x2="260" y2="120" stroke="#e2e8f0" strokeDasharray="2 2" />
                  <line x1="38" y1="80" x2="260" y2="80" stroke="#e2e8f0" strokeDasharray="2 2" />
                  <line x1="38" y1="40" x2="260" y2="40" stroke="#e2e8f0" strokeDasharray="2 2" />
                  <line x1="110" y1="25" x2="110" y2="160" stroke="#e2e8f0" strokeDasharray="2 2" />
                  <line x1="180" y1="25" x2="180" y2="160" stroke="#e2e8f0" strokeDasharray="2 2" />
                  <line x1="250" y1="25" x2="250" y2="160" stroke="#e2e8f0" strokeDasharray="2 2" />
                  <text x="150" y="182" textAnchor="middle" fontSize="8" fill="#475569" fontWeight="600">wt</text>
                  <text x="15" y="95" textAnchor="middle" fontSize="8" fill="#475569" fontWeight="600" transform="rotate(-90 15 95)">mpg</text>
                  <text x="38" y="170" textAnchor="middle" fontSize="7" fill="#94a3b8">2</text>
                  <text x="110" y="170" textAnchor="middle" fontSize="7" fill="#94a3b8">3</text>
                  <text x="180" y="170" textAnchor="middle" fontSize="7" fill="#94a3b8">4</text>
                  <text x="250" y="170" textAnchor="middle" fontSize="7" fill="#94a3b8">5</text>
                </>
              )}

              {/* Step 3: Single color points appear */}
              {activeStep === 3 && (
                <>
                  {[
                    [70, 55], [85, 65], [95, 72], [110, 80],
                    [125, 95], [140, 100], [155, 105],
                    [170, 120], [190, 130], [210, 140], [230, 148]
                  ].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r="3.5" fill="#20639B" opacity="0.85" />
                  ))}
                </>
              )}

              {/* Step 4 & 5: Categorical coloring by factor(cyl) + legend */}
              {activeStep >= 4 && (
                <>
                  <circle cx="70" cy="55" r="3.5" fill="#f97316" />
                  <circle cx="85" cy="65" r="3.5" fill="#f97316" />
                  <circle cx="95" cy="72" r="3.5" fill="#f97316" />
                  <circle cx="110" cy="80" r="3.5" fill="#f97316" />
                  <circle cx="125" cy="95" r="3.5" fill="#10b981" />
                  <circle cx="140" cy="100" r="3.5" fill="#10b981" />
                  <circle cx="155" cy="105" r="3.5" fill="#10b981" />
                  <circle cx="170" cy="120" r="3.5" fill="#20639B" />
                  <circle cx="190" cy="130" r="3.5" fill="#20639B" />
                  <circle cx="210" cy="140" r="3.5" fill="#20639B" />
                  <circle cx="230" cy="148" r="3.5" fill="#20639B" />

                  {/* Legend */}
                  <rect x="268" y="55" width="46" height="55" rx="3" fill="white" stroke="#cbd5e1" strokeWidth="0.8" />
                  <text x="272" y="65" fontSize="6.5" fontWeight="bold" fill="#334155">factor(cyl)</text>
                  <circle cx="276" cy="74" r="2.5" fill="#f97316" />
                  <text x="283" y="77" fontSize="6.5" fill="#475569">4</text>
                  <circle cx="276" cy="85" r="2.5" fill="#10b981" />
                  <text x="283" y="88" fontSize="6.5" fill="#475569">6</text>
                  <circle cx="276" cy="96" r="2.5" fill="#20639B" />
                  <text x="283" y="99" fontSize="6.5" fill="#475569">8</text>
                </>
              )}

              {/* Step 5: Full polished labels */}
              {activeStep === 5 && (
                <>
                  <text x="38" y="16" fontSize="9" fontWeight="bold" fill="#0f172a">Car Weight vs. MPG</text>
                </>
              )}

              {/* Step 1 empty notice */}
              {activeStep === 1 && (
                <text x="150" y="100" textAnchor="middle" fontSize="9" fill="#94a3b8" fontStyle="italic">
                  (Blank canvas initialized: data = mtcars)
                </text>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* SECTION 3: HIDDEN COMPARTMENTS (ACCORDION DEEP DIVES) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 mb-1">
          <Palette className="w-5 h-5 text-slate-700" />
          <h3 className="font-bold text-slate-900 text-base">
            Deep-Dive Compartments
          </h3>
          <span className="text-xs text-slate-500 ml-auto hidden sm:inline">
            Click to open and explore at your own pace
          </span>
        </div>

        {/* Compartment 1: Survey of Common Geometries */}
        <div id="mod7-geoms" className="border border-slate-200 rounded-xl overflow-hidden scroll-mt-20">
          <button
            type="button"
            onClick={() => toggleCompartment('geoms')}
            className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Shapes className="w-4 h-4 text-[#20639B]" />
              <span className="text-sm font-bold text-slate-800">
                1. Survey of Common Geometries (geom_point, geom_histogram, etc.)
              </span>
            </div>
            {openCompartments.geoms ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>

          {openCompartments.geoms && (
            <div className="p-5 bg-white border-t border-slate-200 space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                By swapping the geometry function (<code className="font-mono text-xs">geom_*</code>), you instantly switch chart formats while preserving your data and aesthetic mappings:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-mono font-bold text-[#20639B] mb-1">geom_point()</div>
                  <p className="mb-2"><strong>Scatter plot:</strong> Visualizes the relationship between two numeric variables (X vs Y).</p>
                  <code className="block bg-white p-1.5 rounded border border-slate-200 font-mono text-[11px]">
                    ggplot(mtcars, aes(x = wt, y = mpg)) + geom_point()
                  </code>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-mono font-bold text-[#20639B] mb-1">geom_histogram(binwidth = ...)</div>
                  <p className="mb-2"><strong>Histogram:</strong> Shows the distribution of a single continuous variable.</p>
                  <code className="block bg-white p-1.5 rounded border border-slate-200 font-mono text-[11px]">
                    ggplot(mtcars, aes(x = mpg)) + geom_histogram(binwidth = 3)
                  </code>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-mono font-bold text-[#20639B] mb-1">geom_boxplot()</div>
                  <p className="mb-2"><strong>Boxplot:</strong> Shows median, quartiles, and outliers across discrete groups.</p>
                  <code className="block bg-white p-1.5 rounded border border-slate-200 font-mono text-[11px]">
                    ggplot(mtcars, aes(x = factor(cyl), y = mpg)) + geom_boxplot()
                  </code>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-mono font-bold text-[#20639B] mb-1">geom_bar() / geom_col()</div>
                  <p className="mb-2"><strong>Bar chart:</strong> Compares counts (geom_bar) or pre-calculated summary values (geom_col).</p>
                  <code className="block bg-white p-1.5 rounded border border-slate-200 font-mono text-[11px]">
                    ggplot(mtcars, aes(x = factor(cyl))) + geom_bar()
                  </code>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Compartment 2: Aesthetics & Categorical Grouping */}
        <div id="mod7-aesthetics" className="border border-slate-200 rounded-xl overflow-hidden scroll-mt-20">
          <button
            type="button"
            onClick={() => toggleCompartment('aesthetics')}
            className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Sliders className="w-4 h-4 text-[#20639B]" />
              <span className="text-sm font-bold text-slate-800">
                2. Aesthetics &amp; Grouping with factor()
              </span>
            </div>
            {openCompartments.aesthetics ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>

          {openCompartments.aesthetics && (
            <div className="p-5 bg-white border-t border-slate-200 space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Inside <code className="font-mono text-xs">aes(...)</code>, you connect data columns to visual attributes:
              </p>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <code className="font-mono font-semibold text-purple-700 bg-purple-50 px-1 py-0.5 rounded border border-purple-200 shrink-0">x, y</code>
                  <span>Primary coordinate axes for data positioning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <code className="font-mono font-semibold text-purple-700 bg-purple-50 px-1 py-0.5 rounded border border-purple-200 shrink-0">color = column</code>
                  <span>Colors points, lines, or outlines based on variable categories.</span>
                </li>
                <li className="flex items-start gap-2">
                  <code className="font-mono font-semibold text-purple-700 bg-purple-50 px-1 py-0.5 rounded border border-purple-200 shrink-0">fill = column</code>
                  <span>Fills the interior of bars, polygons, and histograms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <code className="font-mono font-semibold text-purple-700 bg-purple-50 px-1 py-0.5 rounded border border-purple-200 shrink-0">shape = column</code>
                  <span>Assigns distinct marker shapes (circles, triangles, squares) to groups.</span>
                </li>
              </ul>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
                <strong className="text-amber-950">Important note on <code>factor()</code>:</strong> In <code className="font-mono">mtcars</code>, <code className="font-mono">cyl</code> is stored as numbers (4, 6, 8). If you write <code className="font-mono">color = cyl</code>, R treats it as a continuous number and gives you a dark-to-light blue gradient. Wrapping it in <code className="font-mono">factor(cyl)</code> tells ggplot that 4, 6, and 8 are distinct <strong>categories</strong>, giving each group its own high-contrast color and legend!
              </div>
            </div>
          )}
        </div>

        {/* Compartment 3: Custom Titles, Labels & Polish */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleCompartment('labels')}
            className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Tag className="w-4 h-4 text-[#20639B]" />
              <span className="text-sm font-bold text-slate-800">
                3. Custom Titles, Labels &amp; Clean Themes
              </span>
            </div>
            {openCompartments.labels ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </button>

          {openCompartments.labels && (
            <div className="p-5 bg-white border-t border-slate-200 space-y-3">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Always label your figures clearly using <code className="font-mono text-xs">labs()</code> and a clean preset theme:
              </p>
              <CodeBlock
                title="labels_and_theme.R"
                code={`ggplot(data = mtcars, aes(x = wt, y = mpg, color = factor(cyl))) +
  geom_point(size = 3) +
  labs(
    title = "Car Weight vs. Fuel Efficiency",
    subtitle = "Motor Trend Car Road Tests (1974)",
    x = "Weight (1,000 lbs)",
    y = "Miles Per Gallon (MPG)",
    color = "Cylinders",
    caption = "Source: mtcars dataset"
  ) +
  theme_minimal()`}
              />
            </div>
          )}
        </div>

        {/* Compartment 4: Practice Assignment */}
        <div id="mod7-assignment" className="border border-emerald-300 rounded-xl overflow-hidden bg-emerald-50/20 scroll-mt-20">
          <button
            type="button"
            onClick={() => toggleCompartment('assignment')}
            className="w-full text-left p-4 bg-emerald-50 hover:bg-emerald-100/70 flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-emerald-900">
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              <span className="text-sm font-bold">
                4. Practice Exercise: Horsepower vs. MPG
              </span>
            </div>
            {openCompartments.assignment ? <ChevronUp className="w-4 h-4 text-emerald-700" /> : <ChevronDown className="w-4 h-4 text-emerald-700" />}
          </button>

          {openCompartments.assignment && (
            <div className="p-5 bg-white border-t border-emerald-200 space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong>Your Task:</strong> Using R&apos;s built-in <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-xs">mtcars</code> data frame, write a ggplot command to create a scatter plot of <strong>horsepower (<code className="font-mono">hp</code>)</strong> on the X-axis versus <strong>miles per gallon (<code className="font-mono">mpg</code>)</strong> on the Y-axis.
              </p>

              <div className="pt-2">
                <CodeBlock
                  title="exercise_hp_vs_mpg.R"
                  code={`# Scatter plot: horsepower (hp) vs fuel efficiency (mpg)
ggplot(data = mtcars, aes(x = hp, y = mpg)) +
  geom_point()`}
                />
                <p className="text-xs text-slate-500 mt-2 italic">
                  Notice how fuel economy declines sharply as horsepower rises!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Module 7 Quiz */}
      <QuizCard
        quiz={{
          id: 'q_mod7',
          question: 'In ggplot2, which operator is used to add new layers (such as geom_point) onto a plot?',
          options: [
            '+ (plus sign)',
            '%>% (pipe operator)',
            '<- (assignment arrow)',
            '$ (dollar sign)'
          ],
          correctIndex: 0,
          explanation: 'In ggplot2, components and layers are connected together using the + operator, whereas dplyr uses the pipe %>% to chain data wrangling operations.'
        }}
        onComplete={onQuizComplete}
      />
    </section>
  );
}

export default GgplotModule;
