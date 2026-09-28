import React, { useState } from 'react';
import {
  Layout,
  PlayCircle,
  FileCode2,
  ListTree,
  Table2,
  SlidersHorizontal,
  BarChart3,
  Dices,
  Search,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  BookOpen
} from 'lucide-react';
import { ModuleMeta } from '../types';

export const MODULES: ModuleMeta[] = [
  {
    id: 'mod1',
    number: '01',
    title: 'Interface',
    shortTitle: 'Interface',
    summary: 'Source editor, Console, Environment, and Utility panes in RStudio.',
    tags: ['IDE', 'Panes', 'Console', 'Environment', 'Source'],
    subsections: [
      { id: 'mod1-panes', title: 'The 4 Quadrants' },
      { id: 'mod1-source', title: 'Source Editor & Shortcuts' },
      { id: 'mod1-console', title: 'Console Execution' },
      { id: 'mod1-env', title: 'Environment Pane' },
      { id: 'mod1-utility', title: 'Files, Plots & Packages' }
    ]
  },
  {
    id: 'mod2',
    number: '02',
    title: 'Variables',
    shortTitle: 'Variables',
    summary: 'The assignment operator (<-), variable storage, and variable independence.',
    tags: ['<-', 'Variables', 'Execution', 'Ctrl+Enter'],
    subsections: [
      { id: 'mod2-assign', title: 'Assignment Operator (<-)' },
      { id: 'mod2-storage', title: 'Variable Storage & Case' },
      { id: 'mod2-independence', title: 'Variable Independence' },
      { id: 'mod3-checking', title: 'Checking Type (class)' },
      { id: 'mod3-converting', title: 'Changing Type (as.numeric)' }
    ]
  },
  {
    id: 'mod3',
    number: '03',
    title: 'Data Types',
    shortTitle: 'Data Types',
    summary: 'Numeric, Character, Logical, and as.numeric() / as.character() conversions.',
    tags: ['Numeric', 'Character', 'Logical', 'as.numeric', 'as.character', 'class'],
    subsections: [
      { id: 'mod3-core', title: 'Core Data Types' },
      { id: 'mod3-checking', title: 'Checking Type (class)' },
      { id: 'mod3-converting', title: 'Changing Type (as.numeric)' }
    ]
  },
  {
    id: 'mod4',
    number: '04',
    title: 'Vectors',
    shortTitle: 'Vectors',
    summary: 'Vector creation c(), vectorized math, statistics, and NA handling.',
    tags: ['Vectors', 'c()', 'NA', 'na.rm', 'mean', 'sum'],
    subsections: [
      { id: 'mod4-create', title: 'Creating a Vector' },
      { id: 'mod4-math', title: 'Vector Math' },
      { id: 'mod4-subset', title: 'Subsets' },
      { id: 'mod4-summary', title: 'Summary Functions' },
      { id: 'mod4-missing', title: 'Missing Types (NA)' }
    ]
  },
  {
    id: 'mod5',
    number: '05',
    title: 'Data Frames',
    shortTitle: 'Data Frames',
    summary: 'data.frame(), viewing in Environment, $ operator, overwriting, and subsetting.',
    tags: ['data.frame', '$', 'View()', 'Environment', 'Subsetting'],
    subsections: [
      { id: 'mod5-create', title: 'Creating a Data Frame' },
      { id: 'mod5-subset', title: 'Subsetting Data Frames' },
      { id: 'mod5-columns', title: 'Accessing Columns ($)' },
      { id: 'mod5-builtin', title: 'Built-in Datasets' }
    ]
  },
  {
    id: 'mod6',
    number: '06',
    title: 'Data Wrangling (dplyr & tidyr)',
    shortTitle: 'Data Wrangling',
    summary: 'Logical operators, pipes (%>%), filter, select, mutate, group_by, joins, and pivoting.',
    tags: ['%>%', 'filter', 'mutate', 'joins', 'pivot_longer', 'logical'],
    subsections: [
      { id: 'mod6-pipe', title: 'The Pipe Operator (%>%)' },
      { id: 'mod6-filter', title: 'filter (Filtering Rows)' },
      { id: 'mod6-select', title: 'select (Choosing Columns)' },
      { id: 'mod6-mutate', title: 'mutate (Creating Columns)' },
      { id: 'mod6-group', title: 'group by & summarize' },
      { id: 'mod6-join', title: 'Joining Data Frames' },
      { id: 'mod6-pivot', title: 'Pivoting Wide to Long' }
    ]
  },
  {
    id: 'mod7',
    number: '07',
    title: 'ggplot',
    shortTitle: 'ggplot',
    summary: 'Introduction to ggplot: data, aesthetics, geometries, and layers.',
    tags: ['ggplot', 'aes()', 'geom_point', 'geom_histogram', 'layers'],
    subsections: [
      { id: 'mod7-overview', title: 'The Finished Plot' },
      { id: 'mod7-layers', title: 'Taking It Apart (Layer by Layer)' },
      { id: 'mod7-geoms', title: 'Survey of Common Geometries' },
      { id: 'mod7-aesthetics', title: 'Aesthetics & Grouping (factor)' },
      { id: 'mod7-labels', title: 'Custom Titles & Polish' },
      { id: 'mod7-assignment', title: 'Practice Exercise' }
    ]
  },
  {
    id: 'mod8',
    number: '08',
    title: 'Loops',
    shortTitle: 'Loops',
    summary: 'For loops at three levels: basic repetition, saving to vectors, and simulations.',
    tags: ['for loop', 'sample()', 'simulation', 'appending', 'vector'],
    subsections: [
      { id: 'mod8-loops', title: 'For Loop Syntax' },
      { id: 'mod8-saving', title: 'Saving Values to Vectors' },
      { id: 'mod8-sim1', title: 'Simulation 1: Dice Rolls' },
      { id: 'mod8-sim2', title: 'Simulation 2: 3-Dice Maximum' }
    ]
  }
];

const ICONS = [
  Layout,
  PlayCircle,
  FileCode2,
  ListTree,
  Table2,
  SlidersHorizontal,
  BarChart3,
  Dices
];

interface SidebarNavProps {
  activeModuleId: string;
  onSelectModule: (id: string) => void;
  onSelectSubSection?: (subId: string) => void;
  completedQuizzes: Record<string, boolean>;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeModuleId,
  onSelectModule,
  onSelectSubSection,
  completedQuizzes
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    mod1: true,
    mod2: true,
    mod3: true,
    mod4: true,
    mod5: true,
    mod6: true,
    mod7: true,
    mod8: true,
    [activeModuleId]: true
  });

  const toggleModuleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleModuleClick = (id: string) => {
    onSelectModule(id);
    // Always expand the sub parts when a module is selected
    setExpandedModules((prev) => ({
      ...prev,
      [id]: true
    }));
    setMobileOpen(false);
  };

  const handleSubSectionClick = (subId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectSubSection) {
      onSelectSubSection(subId);
    } else {
      const el = document.getElementById(subId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMobileOpen(false);
  };

  // Filter modules based on search term
  const filteredModules = MODULES.filter((mod) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    const matchesTitle = mod.title.toLowerCase().includes(term);
    const matchesSummary = mod.summary.toLowerCase().includes(term);
    const matchesTags = mod.tags.some((t) => t.toLowerCase().includes(term));
    const matchesSubs = mod.subsections?.some((s) => s.title.toLowerCase().includes(term));
    return matchesTitle || matchesSummary || matchesTags || matchesSubs;
  });

  const totalQuizzes = Object.keys(completedQuizzes).length;
  const passedQuizzes = Object.values(completedQuizzes).filter(Boolean).length;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#20639B] hover:bg-[#174a75] text-white px-4 py-3 rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
        aria-label="Toggle modules navigation"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        <span className="text-xs font-semibold tracking-wide">
          {mobileOpen ? 'Close' : 'Modules'}
        </span>
      </button>

      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Main Sidebar (Desktop Sticky + Mobile Drawer) */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-80 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#20639B] text-white font-mono font-bold flex items-center justify-center text-lg shadow-xs">
              R
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-tight">
                Basic R Guide
              </h2>
              <p className="text-[11px] text-[#20639B] font-medium">
                Data Analysis Tutorial
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="mt-3 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search concepts (e.g. mutate, NA, geom)..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#20639B]/30 focus:border-[#20639B]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Guide Modules ({filteredModules.length})
          </div>

          {filteredModules.length === 0 && (
            <div className="p-4 text-center text-xs text-slate-500">
              No matching module found for &quot;{search}&quot;.
            </div>
          )}

          {filteredModules.map((mod) => {
            const isActive = activeModuleId === mod.id;
            const isExpanded = expandedModules[mod.id] ?? isActive;
            const Icon = ICONS[parseInt(mod.number, 10) - 1] || BookOpen;

            return (
              <div key={mod.id} className="rounded-lg overflow-hidden border border-transparent transition-all">
                {/* Module Main Row Button */}
                <div
                  onClick={() => handleModuleClick(mod.id)}
                  className={`w-full text-left p-2.5 rounded-lg transition-all flex items-start gap-2.5 cursor-pointer group ${
                    isActive
                      ? 'bg-[#20639B] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div
                    className={`mt-0.5 w-6 h-6 rounded flex items-center justify-center shrink-0 text-xs font-mono font-bold transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-white group-hover:text-[#20639B]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-200/60 text-slate-500'
                        }`}
                      >
                        MOD {mod.number}
                      </span>

                      {/* Expand / Collapse Subsections Button */}
                      {mod.subsections && mod.subsections.length > 0 && (
                        <button
                          type="button"
                          onClick={(e) => toggleModuleExpand(mod.id, e)}
                          className={`p-0.5 rounded hover:bg-black/10 transition-colors ${
                            isActive ? 'text-white/90' : 'text-slate-400 hover:text-slate-600'
                          }`}
                          title={isExpanded ? 'Collapse subtopics' : 'Expand subtopics'}
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>

                    <div
                      className={`text-xs font-semibold mt-0.5 truncate ${
                        isActive ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {mod.shortTitle}
                    </div>
                  </div>
                </div>

                {/* Sub-sections Accordion */}
                {isExpanded && mod.subsections && mod.subsections.length > 0 && (
                  <div className="ml-7 pl-3 my-1 border-l-2 border-slate-200 space-y-0.5">
                    {mod.subsections.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={(e) => handleSubSectionClick(sub.id, e)}
                        className="w-full text-left py-1 px-2 rounded text-[11px] text-slate-600 hover:text-[#20639B] hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#20639B] transition-colors shrink-0" />
                        <span className="truncate">{sub.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer info & Quiz Progress */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-xs text-slate-600">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Quiz Mastery
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-700">
              {passedQuizzes} / {totalQuizzes} done
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 transition-all duration-500 rounded-full"
              style={{
                width: `${totalQuizzes > 0 ? (passedQuizzes / totalQuizzes) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
};
