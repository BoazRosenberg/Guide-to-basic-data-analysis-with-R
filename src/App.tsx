import React, { useState, useEffect } from 'react';
import {
  FileCode2,
  Table2,
  SlidersHorizontal,
  ArrowUp,
  Sparkles,
  Info,
  CheckCircle2,
  Code2,
  Layers,
  HelpCircle,
  Eye,
  EyeOff,
  BookOpen,
  Laptop,
  Mail
} from 'lucide-react';
import { SidebarNav, MODULES } from './components/SidebarNav';
import { CodeBlock } from './components/CodeBlock';
import { RStudioIdeMockup } from './components/RStudioIdeMockup';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { GgplotModule } from './components/GgplotModule';
import { QuizCard } from './components/QuizCard';

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState<string>('mod1');
  const [targetSubSection, setTargetSubSection] = useState<string | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, boolean>>({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});

  const toggleSolution = (exerciseId: number) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  // Scrollspy to update active module as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const moduleIds = MODULES.map((m) => m.id);
      const scrollPosition = window.scrollY + 200;

      for (let i = moduleIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(moduleIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveModuleId(moduleIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToModule = (id: string) => {
    setActiveModuleId(id);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 24;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectSubSection = (subId: string) => {
    setTargetSubSection(subId);
    const element = document.getElementById(subId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizComplete = (id: string, isCorrect: boolean) => {
    setCompletedQuizzes((prev) => ({
      ...prev,
      [id]: isCorrect
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex">
      {/* Fixed Sticky Sidebar Navigation on the Left */}
      <SidebarNav
        activeModuleId={activeModuleId}
        onSelectModule={scrollToModule}
        onSelectSubSection={handleSelectSubSection}
        completedQuizzes={completedQuizzes}
      />

      {/* Main Learning Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Banner */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#20639B] text-white font-mono font-bold flex items-center justify-center text-lg shadow-xs">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  Basic R Guide
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-[#20639B] border border-blue-200">
                  <Sparkles className="w-3 h-3 text-[#20639B]" />
                  Data Analysis
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                A focused interactive tutorial for learning R in data analysis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Interactive Tutorial</span>
            </span>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 space-y-12">
          {/* Welcome Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-[#174a75] to-[#20639B] text-white p-6 sm:p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold tracking-wide uppercase mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Basic R Tutorial for Data Analysis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Basic R Guide
            </h2>
            <div className="mt-3 text-sm sm:text-[15px] text-blue-100 max-w-4xl leading-relaxed">
              <p>
                This interactive file is built as a basic tutorial for using R in data analysis. It&apos;s meant to focus on the important stuff and therefore skips many details in the process in order to allow you to get to a basic R level.
              </p>
            </div>

            {/* Core Recommendation: Try Everything in RStudio */}
            <div className="mt-6 bg-white/10 rounded-xl p-4 sm:p-5 backdrop-blur-xs border border-white/15">
              <div className="flex items-center gap-2 font-semibold text-white text-sm sm:text-base">
                <Laptop className="w-4 h-4 sm:w-5 sm:h-5 text-sky-300" />
                Try Everything in RStudio
              </div>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-blue-100">
                I strongly recommend copying and running these snippets in a local RStudio session. Experiment with code directly and try new variations beyond what is written here to build true hands-on intuition and coding fluency.
              </p>
            </div>

            {/* Disclaimer Notice */}
            <div className="mt-4 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-100/90">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-sky-300 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  This module was created with the help of AI agents and therefore may have mistakes.
                </p>
              </div>
              <a
                href="mailto:Boaz.Rosenberg@mail.huji.ac.il"
                className="shrink-0 text-white font-mono text-[11px] underline underline-offset-2 hover:text-sky-200 transition-colors"
              >
                Boaz.Rosenberg@mail.huji.ac.il
              </a>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* MODULE 1: Interface */}
          {/* ========================================================================= */}
          <section id="mod1" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-6">
            <div className="flex items-center gap-3 border-b-2 border-sky-100 pb-4 mb-6">
              <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-sky-50 text-[#20639B] border border-sky-200">
                MODULE 01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Interface
              </h2>
            </div>

            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                <strong className="text-slate-900">R</strong> is the statistical programming language that computes your calculations and processes data. <strong className="text-slate-900">RStudio</strong> is the Integrated Development Environment (IDE) that provides a visual, productive workspace to write and run code.
              </p>

              <p id="mod1-panes" className="scroll-mt-20">
                Here is what RStudio looks like when you open it, divided into its <strong>4 main panes</strong>:
              </p>

              {/* Realistic RStudio IDE 4-Pane Mockup */}
              <RStudioIdeMockup />

              {/* Panes summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div id="mod1-source" className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 scroll-mt-20">
                  <div className="font-bold text-sm text-[#20639B] mb-1 flex items-center justify-between">
                    <span>1. Source Editor (Top-Left)</span>
                    <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">.R Script</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    <strong>Where you write and save code.</strong> Scripts are saved as text files. Commands typed here do not run automatically—you send them to the Console by placing your cursor on the line and pressing <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[11px]">Ctrl+Enter</kbd> (or <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-300 font-mono text-[11px]">Cmd+Enter</kbd>).
                  </p>
                </div>

                <div id="mod1-env" className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 scroll-mt-20">
                  <div className="font-bold text-sm text-[#20639B] mb-1 flex items-center justify-between">
                    <span>2. Environment (Top-Right)</span>
                    <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Memory</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    <strong>Where stored data lives.</strong> Shows all active variables, vectors, and data frames currently saved in R&apos;s memory. Clicking on any dataset name here opens it up in a spreadsheet view!
                  </p>
                </div>

                <div id="mod1-console" className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 scroll-mt-20">
                  <div className="font-bold text-sm text-[#20639B] mb-1 flex items-center justify-between">
                    <span>3. R Console (Bottom-Left)</span>
                    <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Execution</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    <strong>Where code actually executes.</strong> It evaluates commands sent from the Source editor, displays mathematical results with line indexes like <code className="font-mono text-slate-700">[1]</code>, and prints any errors.
                  </p>
                </div>

                <div id="mod1-utility" className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 scroll-mt-20">
                  <div className="font-bold text-sm text-[#20639B] mb-1 flex items-center justify-between">
                    <span>4. Files, Plots, Packages &amp; Help (Bottom-Right)</span>
                    <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Utilities</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    <strong>The utility hub.</strong> Browse files in your working directory, view generated charts and plots, manage installed packages, and read documentation help pages.
                  </p>
                </div>
              </div>

              {/* Workflow Callout */}
              <div className="p-4 rounded-xl bg-blue-50/80 border-l-4 border-[#20639B] text-xs sm:text-sm text-blue-950 leading-relaxed mt-4">
                <strong className="font-bold">Standard RStudio Workflow:</strong> Write your commands in the <strong>Source Editor</strong> (top-left). Press <kbd className="px-1.5 py-0.5 rounded bg-white border border-blue-300 font-mono font-semibold">Ctrl + Enter</kbd> to run the selected line. RStudio sends that line down to the <strong>Console</strong> (bottom-left) to compute, and updates your saved variables in the <strong>Environment</strong> (top-right).
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* MODULE 2: Variables */}
          {/* ========================================================================= */}
          <section id="mod2" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-6">
            <div className="flex items-center gap-3 border-b-2 border-sky-100 pb-4 mb-6">
              <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-sky-50 text-[#20639B] border border-sky-200">
                MODULE 02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Variables
              </h2>
            </div>

            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
              <p id="mod2-assign" className="scroll-mt-20">
                In R, we store values inside <strong>variables</strong> using the assignment operator <code className="font-mono font-bold text-[#0000ff]">&lt;-</code> (an arrow made of a less-than sign and a hyphen). While <code className="font-mono">=</code> also works, <code className="font-mono">&lt;-</code> is the standard R convention.
              </p>

              <div id="mod2-storage" className="scroll-mt-20">
                <CodeBlock
                  title="variable_assignment.R"
                  code={`# Creating variables with <-
score <- 85
bonus <- 15

# Using variables in calculations
final_score <- score + bonus

# Overwriting an existing variable in memory
score <- 95`}
                />
              </div>

              {/* Variable Independence explanation in lay terms */}
              <div id="mod2-independence" className="p-4 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-800 leading-relaxed scroll-mt-20">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#20639B]" />
                  <span>Variable Independence</span>
                </div>
                In R, once a variable is set, it holds its own value, even if it was set using another variable.
                <br className="my-1" />
                For example, <code className="font-mono font-semibold">final_score</code> was calculated using <code className="font-mono">score + bonus</code> (85 + 15 = 100). If the variable <code className="font-mono">score</code> changes later (e.g. updated to 95), it does <strong>not</strong> change <code className="font-mono font-semibold">final_score</code>. <code className="font-mono">final_score</code> remains 100 unless you explicitly recalculate it.
              </div>

              {/* Execution Simulator Component with Gray Selection & RStudio light style */}
              <h3 className="text-base font-bold text-slate-900 pt-2">
                Interactive Execution Simulator
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Click <strong>Run Selected Line</strong> or press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 font-mono text-xs">Ctrl+Enter</kbd> to watch how lines execute in the Console and update the Environment workspace:
              </p>

              <InteractiveSimulator />
            </div>

            <QuizCard
              quiz={{
                id: 'q_mod2',
                question: 'In the simulation above, what is the value of final_score after line 4 (score <- 95) executes?',
                options: [
                  '110 (because score updated to 95 and bonus is 15)',
                  '100 (because final_score holds its own value set when the calculation was run)',
                  '95 (final_score was overwritten by score)',
                  'NA (error due to disconnected variable)'
                ],
                correctIndex: 1,
                explanation: 'Correct! Once a variable is set in R, it holds its own snapshot value. Changing a variable that was previously used to calculate it does not change the resulting variable.'
              }}
              onComplete={handleQuizComplete}
            />
          </section>

          {/* ========================================================================= */}
          {/* MODULE 3: Data Types */}
          {/* ========================================================================= */}
          <section id="mod3" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-6">
            <div className="flex items-center gap-3 border-b-2 border-sky-100 pb-4 mb-6">
              <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-sky-50 text-[#20639B] border border-sky-200">
                MODULE 03
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Data Types
              </h2>
            </div>

            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
              <p id="mod3-core" className="scroll-mt-20">
                Every value in R belongs to a data type. The three core fundamental types are:
              </p>

              {/* Data Types Clean Table without check functions */}
              <div className="overflow-x-auto my-4 rounded-xl border border-slate-200">
                <table className="w-full text-xs sm:text-sm border-collapse text-left">
                  <thead className="bg-[#f8fafc] border-b border-slate-200 text-slate-700 font-semibold">
                    <tr>
                      <th className="py-2.5 px-4">Data Type</th>
                      <th className="py-2.5 px-4">Description</th>
                      <th className="py-2.5 px-4 font-mono">Examples</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-bold text-[#20639B]">Numeric</td>
                      <td className="py-2.5 px-4">Numbers and decimals used for math and statistics</td>
                      <td className="py-2.5 px-4 font-mono text-[#098658]">42, 3.14, -10</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-bold text-[#a31515]">Character</td>
                      <td className="py-2.5 px-4">Text strings wrapped in quotation marks</td>
                      <td className="py-2.5 px-4 font-mono text-[#a31515]">&quot;hello&quot;, &quot;Subject_01&quot;, &quot;100&quot;</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-bold text-[#0000ff]">Logical</td>
                      <td className="py-2.5 px-4">Boolean truth values in all capital letters</td>
                      <td className="py-2.5 px-4 font-mono text-[#0000ff]">TRUE, FALSE</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/80 border-l-4 border-amber-500 text-xs sm:text-sm text-amber-950">
                <strong className="font-bold">Numbers in quotes are text!</strong> If you enclose a number in quotes—like <code className="font-mono font-bold">&quot;100&quot;</code>—R treats it strictly as Character text. You cannot perform mathematical operations on it directly without converting it first.
              </div>

              <h3 id="mod3-checking" className="text-base font-bold text-slate-900 pt-2 scroll-mt-20">
                Checking Data Types with <code>class()</code>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                You can inspect the data type of any value or variable at any time using R&apos;s built-in <code className="font-mono text-[#20639B] font-bold">class()</code> function:
              </p>

              <CodeBlock
                title="check_class.R"
                code={`# Checking data types using class()
class(42)                        # Returns "numeric"
class(3.14)                      # Returns "numeric"
class("hello")                   # Returns "character"
class("100")                     # Returns "character" (quotes make it text!)
class(TRUE)                      # Returns "logical"`}
              />

              <h3 id="mod3-converting" className="text-base font-bold text-slate-900 pt-2 scroll-mt-20">
                Converting Between Types with <code>as.numeric</code> and <code>as.character</code>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                When you import data from CSV files or spreadsheets, numbers often arrive stored as character strings. R provides conversion functions starting with <code className="font-mono text-[#0000ff]">as.</code> to convert between types:
              </p>

              <CodeBlock
                title="type_conversions.R"
                code={`# Convert Character string to Numeric
x_str <- "100"
class(x_str)                     # Returns "character"

x_num <- as.numeric(x_str)       # Converts to numeric 100
class(x_num)                     # Returns "numeric"
result <- x_num + 50             # Now math works! Output: 150

# Convert Numeric to Character string
age <- 25
class(age)                       # Returns "numeric"
age_str <- as.character(age)     # Becomes "25"
class(age_str)                   # Returns "character"

# Convert Numeric to Logical (0 becomes FALSE, non-zero becomes TRUE)
as.logical(1)                    # Returns TRUE
as.logical(0)                    # Returns FALSE`}
              />
            </div>

            <QuizCard
              quiz={{
                id: 'q_mod3',
                question: 'What will class("100") return in R?',
                options: [
                  '"numeric"',
                  '"character"',
                  '"integer"',
                  '"logical"'
                ],
                correctIndex: 1,
                explanation: 'Because 100 is wrapped in quotation marks ("100"), R treats it as character text string, not as a numeric number.'
              }}
              onComplete={handleQuizComplete}
            />
          </section>

          {/* ========================================================================= */}
          {/* MODULE 4: Vectors */}
          {/* ========================================================================= */}
          <section id="mod4" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-6">
            <div className="flex items-center gap-3 border-b-2 border-sky-100 pb-4 mb-6">
              <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-sky-50 text-[#20639B] border border-sky-200">
                MODULE 04
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Vectors
              </h2>
            </div>

            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
              <p id="mod4-create" className="scroll-mt-20">
                A <strong>vector</strong> is the fundamental building block in R: a 1-dimensional sequence of elements that are all of the <em>same</em> data type.
              </p>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-blue-950">
                <span className="font-bold text-[#20639B]">What are vectors used for?</span>
                <ul className="list-disc pl-5 mt-1.5 space-y-1">
                  <li>Holding test scores for a whole class: <code className="font-mono">c(88, 92, 75, 90)</code></li>
                  <li>Recording measurements across different trials in an experiment: <code className="font-mono">c(12.4, 15.1, 14.8)</code></li>
                  <li>Storing sequences of participant names or daily temperatures</li>
                </ul>
              </div>

              <p>
                We create vectors using the <code className="font-mono text-[#0000ff]">c()</code> function (short for <em>combine</em>) or the colon operator <code className="font-mono text-[#0000ff]">:</code> for sequential numbers:
              </p>

              <CodeBlock
                title="creating_vectors.R"
                code={`# Creating numeric and character vectors
scores <- c(88, 92, 75, 90)
names  <- c("Alice", "Bob", "Charlie")

# Creating integer sequences using the colon : operator
counts <- 1:5                    # Equivalent to c(1, 2, 3, 4, 5)`}
              />

              {/* Demonstrating Printing a Vector */}
              <h3 className="text-base font-bold text-slate-900 pt-2">
                Printing a Vector
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                When you call <code className="font-mono text-[#0000ff]">print()</code> on a vector (or simply type its name in the Console), R retrieves and displays the whole sequence of data together:
              </p>

              <CodeBlock
                title="printing_vector.R"
                code={`# Print the scores vector
print(scores)
# Console output:
# [1] 88 92 75 90

# Or simply typing the variable name in the console retrieves the entire sequence:
scores
# [1] 88 92 75 90

# The '[1]' in the console indicates that the first element on that line is index 1.`}
              />

              <h3 id="mod4-math" className="text-base font-bold text-slate-900 pt-2 scroll-mt-20">
                Vector Math &amp; Subsetting
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Mathematical operations automatically apply to every item in the vector element-by-element, and square brackets <code className="font-mono">[]</code> extract specific items (R indexing starts at <strong>1</strong>):
              </p>

              <div id="mod4-subset" className="scroll-mt-20">
                <CodeBlock
                  title="vector_operations.R"
                  code={`vals <- c(10, 20, 30)

# Scalar math: applies to each element automatically
vals + 5                         # Returns: 15, 25, 35
vals * 2                         # Returns: 20, 40, 60

# Subsetting with square brackets []
items <- c("apple", "banana", "cherry", "date")
items[1]                         # First element: "apple"
items[2:3]                       # Slices elements 2 and 3: "banana", "cherry"

# Logical filtering: keep only items matching a condition
nums <- c(10, 25, 5, 40)
nums[nums > 15]                  # Returns: 25, 40`}
                />
              </div>

              {/* PART 1: Summary Functions & Statistics */}
              <div id="mod4-summary" className="pt-4 border-t border-slate-200 scroll-mt-20">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-[#20639B] text-xs font-mono">PART 1</span>
                  Numeric Summary Functions &amp; Statistics
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  For numeric vectors, R provides fast built-in functions to calculate summary statistics across all elements:
                </p>

                <CodeBlock
                  title="summary_statistics.R"
                  code={`data_vec <- c(12, 18, 25, 30, 15)

# Calculate key statistics on the numeric vector
mean(data_vec)                   # Average (Mean): 20
sum(data_vec)                    # Sum of all elements: 100
sd(data_vec)                     # Standard Deviation: ~6.96
median(data_vec)                 # Median value: 18
min(data_vec)                    # Minimum value: 12
max(data_vec)                    # Maximum value: 30
length(data_vec)                 # Number of elements: 5`}
                />
              </div>

              {/* PART 2: Missing Values (The NA Type) */}
              <div id="mod4-missing" className="pt-4 border-t border-slate-200 scroll-mt-20">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-mono">PART 2</span>
                  Missing Values: The <code>NA</code> Type
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  In real-world data, some observations are missing. In R, missing data is represented by the special value <code className="font-mono font-bold text-[#0000ff]">NA</code> (Not Available).
                </p>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
                  <p>
                    <strong>Key facts about NA:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><code className="font-mono font-bold">NA</code> is a unique missing-data indicator. It is <strong>not</strong> the number 0, and not the text string <code className="font-mono">&quot;NA&quot;</code>.</li>
                    <li><strong>NA Propagates:</strong> If you compute statistics like <code className="font-mono">mean()</code> or <code className="font-mono">sum()</code> on a vector that contains an <code className="font-mono">NA</code>, R returns <code className="font-mono font-bold">NA</code> by default. R protects you from calculating an incorrect summary without realizing values are missing.</li>
                    <li><strong>Removing NAs:</strong> To calculate statistics while ignoring missing values, add <code className="font-mono font-bold text-[#0000ff]">na.rm = TRUE</code> (remove NAs).</li>
                  </ul>
                </div>

                <CodeBlock
                  title="missing_values_na.R"
                  code={`incomplete <- c(10, 20, NA, 30)

# NA propagates in calculations:
mean(incomplete)                 # Returns: NA
sum(incomplete)                  # Returns: NA

# Add na.rm = TRUE to remove NAs before calculating:
mean(incomplete, na.rm = TRUE)   # Returns: 20 (average of 10, 20, and 30)
sum(incomplete, na.rm = TRUE)    # Returns: 60`}
                />
              </div>
            </div>

            <QuizCard
              quiz={{
                id: 'q_mod4',
                question: 'If x <- c(10, 20, NA, 30), what will mean(x) return in R?',
                options: [
                  '20 (it ignores the NA automatically)',
                  '15 (it counts NA as 0)',
                  'NA (missing values propagate unless na.rm = TRUE is passed)',
                  'An error that terminates the program'
                ],
                correctIndex: 2,
                explanation: 'In R, summary functions return NA if any value is missing to warn you about incomplete data. You must pass na.rm = TRUE to compute the mean over available values.'
              }}
              onComplete={handleQuizComplete}
            />
          </section>

          {/* ========================================================================= */}
          {/* MODULE 5: Data Frames */}
          {/* ========================================================================= */}
          <section id="mod5" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-6">
            <div className="flex items-center gap-3 border-b-2 border-sky-100 pb-4 mb-6">
              <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-sky-50 text-[#20639B] border border-sky-200">
                MODULE 05
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Data Frames
              </h2>
            </div>

            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
              <p id="mod5-create" className="scroll-mt-20">
                A <strong>Data Frame</strong> is R&apos;s structure for tabular data (like an Excel sheet or SQL table). It is made by combining vectors of equal length together as columns.
              </p>

              <CodeBlock
                title="create_dataframe.R"
                code={`# Creating a Data Frame using data.frame()
df <- data.frame(
  id = 1:3,
  name = c("Alice", "Bob", "Charlie"),
  score = c(88, 92, 95)
)`}
              />

              {/* Emphasized Callout: Viewing a Data Frame */}
              <div className="p-4 rounded-xl bg-blue-50/80 border-l-4 border-[#20639B] text-xs sm:text-sm text-blue-950 leading-relaxed">
                <div className="font-bold text-[#20639B] mb-1 flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>How to View a Data Frame in RStudio</span>
                </div>
                You can inspect a data frame in two common ways:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><strong>Print it in the Console:</strong> Type <code className="font-mono font-semibold">print(df)</code> or simply type <code className="font-mono font-semibold">df</code> and press Enter. R will print the rows and columns in the Console.</li>
                  <li><strong>Click its name in the Environment pane:</strong> In the top-right Environment pane, simply click on the name <code className="font-mono font-semibold">df</code>! RStudio will open an interactive, spreadsheet-like viewer tab at the top (<code className="font-mono">View(df)</code>) where you can scroll and filter rows visually.</li>
                </ul>
              </div>

              <h3 id="mod5-columns" className="text-base font-bold text-slate-900 pt-2 scroll-mt-20">
                Accessing &amp; Overwriting Columns with <code>$</code>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Use the dollar sign <code className="font-mono text-[#0000ff]">$</code> operator to extract a column as a vector, or assign a new vector into it to overwrite the column:
              </p>

              <CodeBlock
                title="dataframe_columns.R"
                code={`# Accessing a single column as a vector using $
df$score                         # Returns vector: 88, 92, 95
mean(df$score)                   # Calculate mean of that column: 91.67

# Overwriting an existing column with a new vector
df$score <- c(90, 95, 99)        # Replaces all 3 scores

# Adding a new calculated column
df$curved_score <- df$score + 5  # Creates a new column with 95, 100, 104`}
              />

              <h3 id="mod5-subset" className="text-base font-bold text-slate-900 pt-2 scroll-mt-20">
                Subsetting Data Frames with <code>df[row, column]</code>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Extract specific rows and columns using 2-dimensional bracket notation:
              </p>

              <CodeBlock
                title="dataframe_subsetting.R"
                code={`# df[row, column]
df[1, 2]                         # Row 1, Column 2 -> "Alice"
df[1, ]                          # Entire Row 1 (all columns)
df[, "score"]                    # Entire "score" column
df[1:2, c("name", "score")]      # Rows 1 to 2, specific columns`}
              />

              <h3 id="mod5-builtin" className="text-base font-bold text-slate-900 pt-2 scroll-mt-20">
                Built-in Datasets in R: <code>mtcars</code> and <code>iris</code>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                R includes ready-to-use built-in datasets like <code className="font-mono text-[#20639B]">mtcars</code> (car road test performance) and <code className="font-mono text-[#20639B]">iris</code> (flower measurements).
              </p>

              {/* Crucial understanding note: Built-ins don't show in the Environment by default */}
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#20639B]" />
                  <span>Important Note on the Environment Workspace</span>
                </div>
                You might notice that built-in datasets like <code className="font-mono font-semibold">mtcars</code> and <code className="font-mono font-semibold">iris</code> <strong>do not appear in your Environment pane</strong> when you open RStudio!
                <br className="my-1" />
                This is completely normal: because they are permanently built directly into R, they exist behind the scenes. You don&apos;t need to import or load a CSV file—you can directly refer to their names in your code (for example, <code className="font-mono font-semibold">head(mtcars)</code> or <code className="font-mono font-semibold">mtcars$mpg</code>) and R will access them immediately.
              </div>

              <CodeBlock
                title="inspect_builtin_datasets.R"
                code={`# Built-in datasets don't show in your Environment pane, but exist and can be used immediately:
head(mtcars, 4)                  # View the first 4 rows
str(iris)                        # View structure: column types and sample rows
summary(mtcars$mpg)              # Summary statistics for mpg column`}
              />

              {/* Hands-On RStudio Exercises with Hints & Reveal Toggle */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-800 space-y-4">
                <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-200 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#20639B]" />
                  <span>Hands-On RStudio Exercises</span>
                </div>
                <p className="text-slate-600">
                  Write the R commands yourself in your RStudio Source Editor. Use the hints if you get stuck, and click &quot;Reveal Solution&quot; to check your answer!
                </p>

                {/* Exercise 1 */}
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                  <div className="font-semibold text-slate-900">
                    Exercise 1: Find the maximum horsepower in <code>mtcars</code>
                  </div>
                  <p className="text-slate-600 text-xs">
                    Horsepower is saved in the column <code className="font-mono">hp</code> in the <code className="font-mono">mtcars</code> dataset.
                    <br />
                    <em>Hint:</em> Access the <code className="font-mono">hp</code> column using <code className="font-mono">$</code> and calculate its maximum using the function <code className="font-mono">max()</code>.
                  </p>
                  <button
                    onClick={() => toggleSolution(1)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#20639B] hover:text-[#174a75] font-semibold cursor-pointer"
                  >
                    {revealedSolutions[1] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{revealedSolutions[1] ? 'Hide Solution' : 'Reveal Solution'}</span>
                  </button>
                  {revealedSolutions[1] && (
                    <div className="mt-2 p-2 bg-slate-100 rounded font-mono text-xs text-slate-900 border border-slate-200">
                      max(mtcars$hp)
                    </div>
                  )}
                </div>

                {/* Exercise 2 */}
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                  <div className="font-semibold text-slate-900">
                    Exercise 2: Calculate the mean petal length across all flowers in <code>iris</code>
                  </div>
                  <p className="text-slate-600 text-xs">
                    Petal length is saved in the column <code className="font-mono">Petal.Length</code> in the <code className="font-mono">iris</code> dataset.
                    <br />
                    <em>Hint:</em> Access the <code className="font-mono">Petal.Length</code> column using <code className="font-mono">$</code> and calculate its mean using the function <code className="font-mono">mean()</code>.
                  </p>
                  <button
                    onClick={() => toggleSolution(2)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#20639B] hover:text-[#174a75] font-semibold cursor-pointer"
                  >
                    {revealedSolutions[2] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{revealedSolutions[2] ? 'Hide Solution' : 'Reveal Solution'}</span>
                  </button>
                  {revealedSolutions[2] && (
                    <div className="mt-2 p-2 bg-slate-100 rounded font-mono text-xs text-slate-900 border border-slate-200">
                      mean(iris$Petal.Length)
                    </div>
                  )}
                </div>

                {/* Exercise 3 */}
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                  <div className="font-semibold text-slate-900">
                    Exercise 3: Subset the first 5 rows and columns 1 through 3 of <code>mtcars</code>
                  </div>
                  <p className="text-slate-600 text-xs">
                    <em>Hint:</em> Use 2D bracket notation <code className="font-mono">mtcars[rows, columns]</code> with integer sequence ranges for rows and columns.
                  </p>
                  <button
                    onClick={() => toggleSolution(3)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#20639B] hover:text-[#174a75] font-semibold cursor-pointer"
                  >
                    {revealedSolutions[3] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{revealedSolutions[3] ? 'Hide Solution' : 'Reveal Solution'}</span>
                  </button>
                  {revealedSolutions[3] && (
                    <div className="mt-2 p-2 bg-slate-100 rounded font-mono text-xs text-slate-900 border border-slate-200">
                      mtcars[1:5, 1:3]
                    </div>
                  )}
                </div>
              </div>
            </div>

            <QuizCard
              quiz={{
                id: 'q_mod5',
                question: 'How do you extract the "mpg" column from mtcars as a numeric vector?',
                options: [
                  'mtcars$mpg',
                  'mtcars->mpg',
                  'mtcars[mpg]',
                  'get_col(mtcars, "mpg")'
                ],
                correctIndex: 0,
                explanation: 'The dollar sign operator (df$column_name) extracts a column from a data frame as an atomic vector.'
              }}
              onComplete={handleQuizComplete}
            />
          </section>

          {/* ========================================================================= */}
          {/* MODULE 6: Data Wrangling (dplyr & tidyr) */}
          {/* ========================================================================= */}
          <section id="mod6" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-6">
            <div className="flex items-center gap-3 border-b-2 border-sky-100 pb-4 mb-6">
              <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-sky-50 text-[#20639B] border border-sky-200">
                MODULE 06
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Data Wrangling (dplyr &amp; tidyr)
              </h2>
            </div>

            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                The <strong>Tidyverse</strong> packages <code className="font-mono text-[#20639B]">dplyr</code> and <code className="font-mono text-[#20639B]">tidyr</code> provide intuitive, human-readable functions for cleaning, transforming, and reshaping tables.
              </p>

              <h3 id="mod6-pipe" className="text-base font-bold text-slate-900 pt-2 scroll-mt-24">
                The Pipe Operator <code>%&gt;%</code> (and <code>|&gt;</code>)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                The pipe passes the result of the previous line as the first argument of the next function. Read it as <em>&quot;and then...&quot;</em>:
              </p>

              <CodeBlock
                title="dplyr_pipeline.R"
                code={`library(dplyr)

# Read as: "Take mtcars, THEN filter rows, THEN select columns"
result <- mtcars %>%
  filter(mpg > 20) %>%
  select(mpg, hp, wt)`}
              />

              {/* ================================================================= */}
              {/* LOGICAL OPERATIONS: Dedicated Section */}
              {/* ================================================================= */}
              <div id="mod6-logical" className="my-6 p-5 rounded-xl bg-slate-50 border border-slate-300 space-y-3 scroll-mt-24">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#20639B]" />
                  <span>Essential Concept: Logical Operations in R</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Before filtering rows, we need to understand <strong>logical comparisons</strong>. Notice especially that checking for equality requires <strong>two equal signs</strong> (<code className="font-mono font-bold text-[#0000ff]">==</code>) because a single equal sign (<code className="font-mono">=</code>) is used for assigning variables or function arguments!
                </p>

                {/* Logical comparison operators table */}
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                  <table className="w-full text-xs border-collapse bg-white">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3 text-left">Operator</th>
                        <th className="py-2 px-3 text-left">Meaning</th>
                        <th className="py-2 px-3 text-left">Example in R</th>
                        <th className="py-2 px-3 text-left">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr>
                        <td className="py-1.5 px-3 font-bold text-[#0000ff]">==</td>
                        <td className="py-1.5 px-3 font-sans text-slate-700">Exactly equal to (double equals!)</td>
                        <td className="py-1.5 px-3">5 == 5</td>
                        <td className="py-1.5 px-3 text-[#0000ff]">TRUE</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 font-bold text-[#0000ff]">!=</td>
                        <td className="py-1.5 px-3 font-sans text-slate-700">Not equal to</td>
                        <td className="py-1.5 px-3">5 != 3</td>
                        <td className="py-1.5 px-3 text-[#0000ff]">TRUE</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 font-bold text-[#0000ff]">&gt; , &lt;</td>
                        <td className="py-1.5 px-3 font-sans text-slate-700">Greater than, Less than</td>
                        <td className="py-1.5 px-3">10 &gt; 20</td>
                        <td className="py-1.5 px-3 text-[#0000ff]">FALSE</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 font-bold text-[#0000ff]">&gt;= , &lt;=</td>
                        <td className="py-1.5 px-3 font-sans text-slate-700">Greater or equal, Less or equal</td>
                        <td className="py-1.5 px-3">15 &gt;= 15</td>
                        <td className="py-1.5 px-3 text-[#0000ff]">TRUE</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 font-bold text-[#0000ff]">%in%</td>
                        <td className="py-1.5 px-3 font-sans text-slate-700">Included inside a vector/set</td>
                        <td className="py-1.5 px-3">4 %in% c(4, 6, 8)</td>
                        <td className="py-1.5 px-3 text-[#0000ff]">TRUE</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-3 font-bold text-[#0000ff]">!</td>
                        <td className="py-1.5 px-3 font-sans text-slate-700">NOT (inverts truth value)</td>
                        <td className="py-1.5 px-3">!(5 == 5)</td>
                        <td className="py-1.5 px-3 text-[#0000ff]">FALSE</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 text-xs sm:text-sm text-slate-700">
                  <strong>Combining multiple conditions:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><code className="font-mono font-bold text-[#0000ff]">&amp;</code> (AND): <strong>Both</strong> conditions must be TRUE. E.g., <code className="font-mono">mpg &gt; 20 &amp; cyl == 4</code></li>
                    <li><code className="font-mono font-bold text-[#0000ff]">|</code> (OR): At least <strong>one</strong> condition must be TRUE. E.g., <code className="font-mono">cyl == 4 | cyl == 6</code></li>
                  </ul>
                </div>
              </div>

              {/* Individual Dedicated Windows for filter, select, and mutate */}
              <div className="space-y-6 pt-2">
                {/* 1. FILTER */}
                <div id="mod6-filter" className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs scroll-mt-24">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
                    <span className="font-mono font-bold text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      filter()
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Pick Rows Matching Logical Conditions
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">
                    <code className="font-mono font-semibold">filter()</code> tests each row using logical operations. Only rows that evaluate to <code className="font-mono">TRUE</code> are kept:
                  </p>
                  <CodeBlock
                    title="filter_examples.R"
                    code={`# Keep only 4-cylinder cars
mtcars %>%
  filter(cyl == 4)

# Complex filter: MPG > 20 AND horsepower > 90
mtcars %>%
  filter(mpg > 20 & hp > 90)

# Using %in% to match multiple values
mtcars %>%
  filter(gear %in% c(4, 5))`}
                  />
                </div>

                {/* 2. SELECT */}
                <div id="mod6-select" className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs scroll-mt-24">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
                    <span className="font-mono font-bold text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded">
                      select()
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Keep Columns OR Remove Columns
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">
                    You can either choose the specific columns you want, or use the minus sign <code className="font-mono font-bold">-</code> (or <code className="font-mono">!</code>) to remove columns you don&apos;t want:
                  </p>
                  <CodeBlock
                    title="select_examples.R"
                    code={`# Option 1: Select only the columns you want
mtcars %>%
  select(mpg, hp, wt)

# Option 2: Select everything EXCEPT specific columns (remove them)
mtcars %>%
  select(-gear, -carb)           # Drops 'gear' and 'carb' columns`}
                  />
                </div>

                {/* 3. MUTATE */}
                <div id="mod6-mutate" className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs scroll-mt-24">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2 mb-3">
                    <span className="font-mono font-bold text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                      mutate()
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Create or Transform Columns (Add Several at Once!)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">
                    <code className="font-mono font-semibold">mutate()</code> creates new columns by referring to existing ones. You can create multiple new columns in a single <code className="font-mono">mutate()</code> call:
                  </p>
                  <CodeBlock
                    title="mutate_examples.R"
                    code={`# Create multiple columns at once in a single mutate call:
mtcars_updated <- mtcars %>%
  mutate(
    # Column 1: horsepower per gallon
    hp_per_mpg = hp / mpg,
    # Column 2: weight in kilograms (wt is thousands of lbs)
    wt_kg = wt * 453.59,
    # Column 3: flag for high-efficiency cars
    is_efficient = mpg > 25
  )`}
                  />
                </div>
              </div>

              {/* Group by and Summarize */}
              <h3 id="mod6-group" className="text-base font-bold text-slate-900 pt-4 scroll-mt-24">
                Grouped Summaries: <code>group_by()</code> + <code>summarize()</code>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Collapse rows into summary statistics by category. You can also <strong>group by more than one column</strong> (e.g. <code className="font-mono">group_by(cyl, gear)</code>), which creates subsets from all unique combinations of both columns!
              </p>

              <CodeBlock
                title="grouped_summaries.R"
                code={`# Group iris by flower Species and calculate summary metrics
species_summary <- iris %>%
  group_by(Species) %>%
  summarize(
    mean_petal = mean(Petal.Length),
    sd_petal   = sd(Petal.Length),
    flower_count = n()
  )

print(species_summary)

# You can also group by more than one column:
# mtcars %>% group_by(cyl, gear) %>% summarize(avg_mpg = mean(mpg))` }
              />

              {/* Combining Data Sets: Binding & Relational Joins */}
              <h3 id="mod6-join" className="text-base font-bold text-slate-900 pt-4 scroll-mt-24">
                Combining Datasets: Binding vs. Relational Joins
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                There are two ways to combine data frames in R:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">1. Stacking / Pasting (Binding)</div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    <li><code className="font-mono font-semibold">bind_rows()</code>: Stacks tables vertically on top of each other (requires matching column names).</li>
                    <li><code className="font-mono font-semibold">bind_cols()</code>: Pastes columns side-by-side horizontally (requires the same number of rows).</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">2. Relational Joins (Key Matching)</div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-600">
                    <li><code className="font-mono font-semibold">left_join()</code>: Keeps all rows from left table, attaching matches from right table.</li>
                    <li><code className="font-mono font-semibold">right_join()</code>: Keeps all rows from right table, attaching matches from left table.</li>
                    <li><code className="font-mono font-semibold">inner_join()</code>: Keeps only rows that have a match in both tables.</li>
                    <li><code className="font-mono font-semibold">full_join()</code>: Keeps all rows from both tables, filling non-matching cells with <code className="font-mono">NA</code>.</li>
                  </ul>
                </div>
              </div>

              <CodeBlock
                title="joins_example.R"
                code={`# Two tables with a common 'id' column:
subjects <- data.frame(id = 1:2, name = c("Alice", "Bob"))
results  <- data.frame(id = 1:2, test_score = c(85, 92))

# Relational Left Join matching by 'id':
combined <- left_join(subjects, results, by = "id")`}
              />

              {/* Reshaping Data: Wide vs Long Format (Full 6 rows shown!) */}
              <h3 id="mod6-pivot" className="text-base font-bold text-slate-900 pt-4 scroll-mt-24">
                Reshaping Data: Wide vs. Long with tidyr
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Data collected across multiple trials is often formatted as <strong>Wide</strong> (separate columns for each test). But visualization packages like <code className="font-mono">ggplot2</code> require <strong>Long format</strong> (one column for test names, one for values). Notice how all 6 observations are represented:
              </p>

              {/* Side-by-side Wide vs Long Comparison with full 6 rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-xs">
                {/* Wide Table: 4 columns, 2 rows */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    Wide Format (4 columns, 2 rows)
                  </div>
                  <table className="w-full text-center border-collapse bg-white rounded border border-slate-200 text-slate-800">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                        <th className="py-1 px-2">id</th>
                        <th className="py-1 px-2">test1</th>
                        <th className="py-1 px-2">test2</th>
                        <th className="py-1 px-2">test3</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr><td className="py-1 px-2 font-bold text-[#20639B]">1</td><td>80</td><td>85</td><td>90</td></tr>
                      <tr><td className="py-1 px-2 font-bold text-[#20639B]">2</td><td>70</td><td>75</td><td>88</td></tr>
                    </tbody>
                  </table>
                  <p className="text-[11px] text-slate-500 mt-2 italic">
                    Tests are spread horizontally across columns.
                  </p>
                </div>

                {/* Long Table: 3 columns, full 6 rows */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    Long Format (3 columns, 6 rows)
                  </div>
                  <table className="w-full text-center border-collapse bg-white rounded border border-slate-200 text-slate-800">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                        <th className="py-1 px-2">id</th>
                        <th className="py-1 px-2">test</th>
                        <th className="py-1 px-2">score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr><td className="py-0.5 px-2 font-bold text-[#20639B]">1</td><td>test1</td><td>80</td></tr>
                      <tr><td className="py-0.5 px-2 font-bold text-[#20639B]">1</td><td>test2</td><td>85</td></tr>
                      <tr><td className="py-0.5 px-2 font-bold text-[#20639B]">1</td><td>test3</td><td>90</td></tr>
                      <tr><td className="py-0.5 px-2 font-bold text-[#20639B]">2</td><td>test1</td><td>70</td></tr>
                      <tr><td className="py-0.5 px-2 font-bold text-[#20639B]">2</td><td>test2</td><td>75</td></tr>
                      <tr><td className="py-0.5 px-2 font-bold text-[#20639B]">2</td><td>test3</td><td>88</td></tr>
                    </tbody>
                  </table>
                  <p className="text-[11px] text-slate-500 mt-2 italic">
                    Every observation has its own individual row.
                  </p>
                </div>
              </div>

              <CodeBlock
                title="pivoting_tidyr.R"
                code={`library(tidyr)

# Reshape from Wide to Long format using pivot_longer()
long_df <- wide_df %>%
  pivot_longer(
    cols = c(test1, test2, test3), # Columns to gather
    names_to = "test",             # New column for variable names
    values_to = "score"            # New column for measurement values
  )

# Reshape back from Long to Wide format using pivot_wider()
wide_again <- long_df %>%
  pivot_wider(
    names_from = test,
    values_from = score
  )`}
              />
            </div>

            <QuizCard
              quiz={{
                id: 'q_mod6',
                question: 'Which comparison operator in R checks if a value is strictly equal to another value?',
                options: [
                  '=',
                  '== (double equals)',
                  '<-',
                  'eq()'
                ],
                correctIndex: 1,
                explanation: 'In R, == (double equals) tests for logical equality. A single = or <- is used for variable assignment.'
              }}
              onComplete={handleQuizComplete}
            />
          </section>

          {/* ========================================================================= */}
          {/* MODULE 7: Data Visualization with ggplot2 */}
          {/* ========================================================================= */}
          <GgplotModule targetSubSection={targetSubSection} onQuizComplete={handleQuizComplete} />

          {/* ========================================================================= */}
          {/* MODULE 8: Loops */}
          {/* ========================================================================= */}
          <section id="mod8" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-6">
            <div className="flex items-center gap-3 border-b-2 border-sky-100 pb-4 mb-6">
              <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-sky-50 text-[#20639B] border border-sky-200">
                MODULE 08
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Loops
              </h2>
            </div>

            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-6">
              <p>
                A <code className="font-mono text-[#0000ff]">for</code> loop allows you to repeat a block of code multiple times. In statistical programming, loops are especially powerful for running <strong>Monte Carlo simulations</strong> to answer probability questions empirically.
              </p>

              {/* LEVEL 1: Repeating an Action */}
              <div id="mod8-loops" className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3 scroll-mt-24">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                    LEVEL 1
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    Repeating an Action (Basic Loop Syntax)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The simplest loop takes a sequence of items and runs the code block once for each item. The variable (here called <code className="font-mono font-semibold">i</code>) automatically updates to take each value in the sequence one by one:
                </p>

                <CodeBlock
                  title="basic_printing_loop.R"
                  code={`# Simplest loop: repeat an action for numbers 1 to 5
for (i in 1:5) {
  print(paste("This is round number:", i))
}`}
                />

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
                  <strong className="font-semibold">The Limitation of Printing:</strong> Notice that <code className="font-mono">print()</code> only displays words on your screen in the Console. Once printed, those values <strong>are not saved anywhere</strong> in R&apos;s memory. In data science, we almost always need to save our results so we can calculate averages, summaries, or draw graphs!
                </div>
              </div>

              {/* LEVEL 2: Saving Results (Empty Container & Appending) */}
              <div id="mod8-saving" className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-3 scroll-mt-24">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                    LEVEL 2
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    Saving Results (Creating an Empty Container &amp; Appending)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To save data across iterations, we follow a simple two-step pattern:
                </p>
                <ol className="list-decimal pl-5 text-xs sm:text-sm text-slate-700 space-y-1.5">
                  <li>
                    <strong>Create an empty container BEFORE the loop starts</strong> (an empty vector <code className="font-mono font-bold">results &lt;- c()</code> or a counter <code className="font-mono font-bold">count &lt;- 0</code>).
                  </li>
                  <li>
                    <strong>Inside each round of the loop, ADD to that container:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                      <li>
                        <strong>Adding a number (Counter):</strong> <code className="font-mono text-[#20639B]">count &lt;- count + 1</code>. This takes the previous value of <code className="font-mono">count</code>, adds 1 to it, and overwrites <code className="font-mono">count</code> with the new total.
                      </li>
                      <li>
                        <strong>Appending to a vector (Most common and useful!):</strong> <code className="font-mono text-[#20639B]">results &lt;- c(results, new_value)</code>. Because <code className="font-mono">c()</code> combines values, this takes the existing vector and attaches the new outcome to the end, growing the vector by one element in each round!
                      </li>
                    </ul>
                  </li>
                </ol>

                <CodeBlock
                  title="accumulate_in_vector.R"
                  code={`# Step 1: Create an empty vector before the loop starts
squared_numbers <- c()

# Step 2: Loop through numbers and append each calculated result
for (num in 1:5) {
  curr_sq <- num^2
  squared_numbers <- c(squared_numbers, curr_sq)  # Appends curr_sq to the vector
}

# Step 3: Now the vector has all values permanently saved in memory!
print(squared_numbers)
# [1]  1  4  9 16 25`}
                />
              </div>

              {/* LEVEL 3: Simulation & Plotting with ggplot */}
              <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    LEVEL 3
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    Probability Simulations &amp; Plotting with ggplot
                  </h3>
                </div>

                {/* Example 3A: Rolling 10 dice */}
                <div id="mod8-sim1" className="scroll-mt-24">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    Simulation 1: Rolling 10 Dice — What are the odds of at least one 6?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mb-2 leading-relaxed">
                    Suppose you roll 10 dice at once. What is the probability that at least one of the 10 dice lands on a 6? We can easily simulate this by repeating the experiment 1,000 times, storing whether each round had a six in a logical vector (<code className="font-mono">TRUE</code>/<code className="font-mono">FALSE</code>).
                  </p>

                  <div className="mb-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900">Note on the <code>sample()</code> function:</strong> We are using R&apos;s built-in <code className="font-mono text-[#20639B] font-bold">sample()</code> function, which we haven&apos;t covered yet. This function takes a vector and draws a specified number of items from it. Here, <code className="font-mono">sample(1:6, size = 10, replace = TRUE)</code> means: draw 10 observations from the vector <code className="font-mono">1:6</code> with replacement (<code className="font-mono">replace = TRUE</code>), meaning the same number can be chosen more than once—exactly like rolling 10 physical dice.
                  </div>

                  <CodeBlock
                    title="ten_dice_simulation.R"
                    code={`# Simulation: 1,000 trials of rolling 10 dice
n_sims <- 1000

# 1. Create an empty container vector before the loop
has_at_least_one_six <- c()

# 2. Run the simulation loop
for (trial in 1:n_sims) {
  # Roll 10 dice with replacement
  rolls <- sample(1:6, size = 10, replace = TRUE)
  
  # Check if at least one die landed on 6 (%in% checks for membership)
  got_six <- 6 %in% rolls
  
  # Append the result (TRUE or FALSE) to our vector
  has_at_least_one_six <- c(has_at_least_one_six, got_six)
}

# 3. Calculate empirical probability (mean of TRUE/FALSE gives the proportion!)
prob_estimate <- mean(has_at_least_one_six)
print(paste("Estimated probability of at least one 6:", prob_estimate))
# Expected theoretical probability: 1 - (5/6)^10 ≈ 0.838 (83.8%)`}
                  />
                </div>

                {/* Example 3B: Why Loops Matter — Distribution of Maximum of 3 Dice */}
                <div id="mod8-sim2" className="pt-2 border-t border-slate-100 scroll-mt-24">
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    Simulation 2: Why We Need Loops — Maximum Number from Rolling 3 Dice
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mb-2 leading-relaxed">
                    Here is an example that shows <strong>why loops are truly useful</strong>. Suppose you roll 3 dice at once, and you want to find the distribution of the <em>maximum</em> number among those 3 dice.
                    <br className="my-1" />
                    Calculating this mathematically can be tricky, but in R we can simulate it in just a few lines: in each round of the loop, we roll 3 dice, find the maximum with <code className="font-mono">max()</code>, append that maximum to our results vector, and plot the distribution using <code className="font-mono text-[#20639B]">ggplot2</code>:
                  </p>

                  <CodeBlock
                    title="max_three_dice_simulation.R"
                    code={`library(ggplot2)

# 1. Create an empty vector before the loop starts
max_rolls <- c()

# 2. Run 1,000 trials: roll 3 dice, find the maximum, and append it
for (i in 1:1000) {
  three_dice <- sample(1:6, size = 3, replace = TRUE) # Roll 3 dice
  highest    <- max(three_dice)                      # Calculate the highest
  max_rolls  <- c(max_rolls, highest)                # Save into our vector
}

# 3. Put results into a data frame
df <- data.frame(max_value = factor(max_rolls))

# 4. Plot the distribution with ggplot
ggplot(data = df, aes(x = max_value)) +
  geom_bar(fill = "#20639B", color = "white") +
  labs(
    title = "Distribution of Maximum Die from 3 Dice",
    subtitle = "Simulated across 1,000 trials (higher numbers are far more likely)",
    x = "Maximum Value Rolled",
    y = "Count (out of 1,000)"
  )`}
                  />

                  {/* Visual Preview of the Resulting Histogram in RStudio */}
                  <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-xs">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>RStudio Plots Pane Preview</span>
                      <span className="text-[#20639B] font-mono text-[11px]">ggplot2: Maximum of 3 Dice (1,000 Trials)</span>
                    </div>
                    <div className="flex justify-center">
                      <svg viewBox="0 0 460 215" className="w-full max-w-md h-auto bg-white rounded border border-slate-200">
                        {/* Axes */}
                        <line x1="45" y1="170" x2="440" y2="170" stroke="#94a3b8" strokeWidth="1" />
                        <line x1="45" y1="20" x2="45" y2="170" stroke="#94a3b8" strokeWidth="1" />
                        {/* Y-axis tick lines */}
                        <line x1="45" y1="135" x2="440" y2="135" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="45" y1="100" x2="440" y2="100" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="45" y1="65" x2="440" y2="65" stroke="#f1f5f9" strokeDasharray="3 3" />
                        <line x1="45" y1="30" x2="440" y2="30" stroke="#f1f5f9" strokeDasharray="3 3" />
                        {/* Y labels */}
                        <text x="38" y="174" textAnchor="end" fontSize="9" fill="#94a3b8">0</text>
                        <text x="38" y="139" textAnchor="end" fontSize="9" fill="#94a3b8">100</text>
                        <text x="38" y="104" textAnchor="end" fontSize="9" fill="#94a3b8">200</text>
                        <text x="38" y="69" textAnchor="end" fontSize="9" fill="#94a3b8">300</text>
                        <text x="38" y="34" textAnchor="end" fontSize="9" fill="#94a3b8">400</text>
                        {/* Bars for max outcomes 1 to 6 (clear skewed stair-step distribution) */}
                        {[
                          { face: '1', h: 4, val: 5 },
                          { face: '2', h: 12, val: 33 },
                          { face: '3', h: 31, val: 89 },
                          { face: '4', h: 59, val: 171 },
                          { face: '5', h: 98, val: 281 },
                          { face: '6', h: 147, val: 421 }
                        ].map((bar, i) => {
                          const x = 75 + i * 60;
                          const barY = 170 - bar.h;
                          return (
                            <g key={i}>
                              <rect x={x} y={barY} width="42" height={bar.h} fill="#20639B" stroke="white" strokeWidth="1" rx="2" />
                              <text x={x + 21} y="184" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">{bar.face}</text>
                              <text x={x + 21} y={barY - 4} textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="600">{bar.val}</text>
                            </g>
                          );
                        })}
                        {/* X-axis title */}
                        <text x="240" y="204" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">Maximum Value Rolled</text>
                      </svg>
                    </div>

                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-950 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <p>
                        <strong>Try running it in RStudio:</strong> Notice how the distribution stairs upward! It is very rare to get a maximum of 1 (all three dice must be 1: 1 in 216 chance), while getting a maximum of 6 occurs in over 42% of trials. Copy this code into your RStudio script to see the plot generated live in your <strong>Plots</strong> tab!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <QuizCard
              quiz={{
                id: 'q_mod8',
                question: 'Why do we write results <- c(results, new_value) inside a for loop?',
                options: [
                  'To overwrite the vector and keep only the latest value',
                  'To append the new value onto the end of the existing vector without losing previous rounds',
                  'To compute the sum of all elements in the vector',
                  'To clear the vector back to empty'
                ],
                correctIndex: 1,
                explanation: 'c(results, new_value) combines all elements already saved in results with the new_value, growing the vector by one item in each round without losing prior iterations.'
              }}
              onComplete={handleQuizComplete}
            />
          </section>

          {/* Bottom Window: Contact & All Rights Reserved */}
          <footer className="border-t border-slate-200 pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} <strong>Boaz Rosenberg</strong>. All rights reserved.
            </div>

            <a
              href="mailto:Boaz.Rosenberg@mail.huji.ac.il"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#20639B] hover:bg-[#174a75] text-white font-medium text-xs shadow-xs transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact: Boaz.Rosenberg@mail.huji.ac.il</span>
            </a>
          </footer>
        </main>
      </div>

      {/* Floating Scroll to Top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-30 p-2.5 rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-800 transition-all cursor-pointer"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
