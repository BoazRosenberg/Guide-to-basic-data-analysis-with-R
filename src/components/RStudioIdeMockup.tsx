import React, { useState } from 'react';
import {
  Folder,
  Maximize2,
  Minimize2,
  Search,
  Play,
  Save,
  RotateCw,
  Trash2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const RStudioIdeMockup: React.FC = () => {
  const [activeSourceTab, setActiveSourceTab] = useState<'script.R' | 'analysis.R'>('script.R');
  const [activeRightTopTab, setActiveRightTopTab] = useState<'Environment' | 'History' | 'Connections'>('Environment');
  const [activeRightBottomTab, setActiveRightBottomTab] = useState<'Plots' | 'Files' | 'Packages' | 'Help'>('Plots');

  return (
    <div className="my-6 rounded-xl border border-slate-300 bg-[#e5e9f0] shadow-md overflow-hidden text-xs select-none font-sans">
      {/* RStudio Top Application Bar */}
      <div className="bg-[#e4e7eb] border-b border-[#cbd2d9] px-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* macOS window control dots */}
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-700">
            <span className="w-4 h-4 rounded bg-[#20639B] text-white flex items-center justify-center font-mono font-bold text-[9px] shadow-2xs">
              R
            </span>
            <span className="font-semibold text-slate-800">RStudio</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600 hidden sm:inline">~/intro_to_r/project.Rproj</span>
          </div>
        </div>

        {/* Top menus mock */}
        <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-600">
          <span className="hover:text-slate-900 cursor-default">File</span>
          <span className="hover:text-slate-900 cursor-default">Edit</span>
          <span className="hover:text-slate-900 cursor-default">Code</span>
          <span className="hover:text-slate-900 cursor-default">View</span>
          <span className="hover:text-slate-900 cursor-default">Plots</span>
          <span className="hover:text-slate-900 cursor-default">Session</span>
          <span className="hover:text-slate-900 cursor-default">Help</span>
        </div>

        <div className="flex items-center gap-1 text-[11px] bg-white px-2 py-0.5 rounded border border-slate-300 text-slate-700">
          <Folder className="w-3 h-3 text-[#20639B]" />
          <span className="font-mono text-[10px]">Project: (intro_to_r)</span>
        </div>
      </div>

      {/* 2x2 Pane Grid matching exact RStudio default layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px] bg-[#c7ced6] p-[3px]">
        {/* ========================================================================= */}
        {/* PANE 1: TOP-LEFT - SOURCE EDITOR */}
        {/* ========================================================================= */}
        <div className="bg-white flex flex-col h-72 border border-slate-300 rounded-xs overflow-hidden shadow-2xs">
          {/* Tab bar */}
          <div className="bg-[#f0f2f5] border-b border-[#d8dce2] flex items-center justify-between px-2 pt-1 text-[11px]">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveSourceTab('script.R')}
                className={`px-3 py-1 rounded-t flex items-center gap-1.5 font-mono text-[11px] cursor-pointer transition-colors ${
                  activeSourceTab === 'script.R'
                    ? 'bg-white text-slate-900 border-t-2 border-t-[#20639B] font-semibold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#20639B] text-[7px] text-white flex items-center justify-center font-bold">R</span>
                <span>script.R</span>
                <span className="text-slate-400 hover:text-slate-700 ml-1">×</span>
              </button>
              <button
                onClick={() => setActiveSourceTab('analysis.R')}
                className={`px-3 py-1 rounded-t flex items-center gap-1.5 font-mono text-[11px] cursor-pointer transition-colors ${
                  activeSourceTab === 'analysis.R'
                    ? 'bg-white text-slate-900 border-t-2 border-t-[#20639B] font-semibold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#20639B] text-[7px] text-white flex items-center justify-center font-bold">R</span>
                <span>analysis.R</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-[10px] pb-1">
              <span className="bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-sans font-bold">
                1. SOURCE (Top-Left)
              </span>
            </div>
          </div>

          {/* Source mini toolbar */}
          <div className="bg-[#fafafa] border-b border-slate-200 px-2 py-0.5 flex items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 hover:text-slate-900 px-1 rounded">
                <Save className="w-3 h-3 text-slate-500" />
              </button>
              <div className="h-3 w-[1px] bg-slate-300" />
              <button className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-[#20639B] rounded hover:bg-blue-100 font-medium">
                <Play className="w-2.5 h-2.5 fill-current" />
                <span>Run (Ctrl+Enter)</span>
              </button>
              <button className="hover:text-slate-900 px-1 rounded text-slate-500 hidden sm:inline">
                Source
              </button>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">1:1</div>
          </div>

          {/* Editor content */}
          <div className="flex-1 overflow-auto bg-white p-2 font-mono text-[11px] leading-relaxed flex">
            {/* Gutter */}
            <div className="w-6 text-right pr-2 text-slate-400 select-none border-r border-slate-200 bg-[#fafafa]">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
            </div>
            {/* Code */}
            <div className="pl-3 text-slate-800 flex-1">
              <div><span className="text-[#2e7d32] italic"># Write code here & send to Console</span></div>
              <div>score &lt;- <span className="text-[#098658]">85</span></div>
              <div>bonus &lt;- <span className="text-[#098658]">15</span></div>
              <div className="bg-[#e2e8f0] -mx-1 px-1 rounded-xs">
                <span>final_score &lt;- score + bonus</span>
                <span className="ml-2 text-[9px] bg-slate-300 text-slate-700 px-1 py-0.2 rounded font-sans font-medium">Cursor line</span>
              </div>
              <div><span className="text-[#2e7d32] italic"># Preview the calculated result</span></div>
              <div><span className="text-[#000000] font-semibold">print</span>(final_score)</div>
              <div>&nbsp;</div>
            </div>
          </div>

          {/* Status footer */}
          <div className="bg-[#f0f2f5] border-t border-slate-200 px-2 py-0.5 text-[10px] text-slate-500 flex justify-between">
            <span>R Script</span>
            <span>UTF-8</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PANE 2: TOP-RIGHT - ENVIRONMENT / HISTORY / CONNECTIONS */}
        {/* ========================================================================= */}
        <div className="bg-white flex flex-col h-72 border border-slate-300 rounded-xs overflow-hidden shadow-2xs">
          {/* Tab bar */}
          <div className="bg-[#f0f2f5] border-b border-[#d8dce2] flex items-center justify-between px-2 pt-1 text-[11px]">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveRightTopTab('Environment')}
                className={`px-3 py-1 rounded-t cursor-pointer transition-colors ${
                  activeRightTopTab === 'Environment'
                    ? 'bg-white text-slate-900 border-t-2 border-t-[#20639B] font-semibold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Environment
              </button>
              <button
                onClick={() => setActiveRightTopTab('History')}
                className={`px-3 py-1 rounded-t cursor-pointer transition-colors ${
                  activeRightTopTab === 'History'
                    ? 'bg-white text-slate-900 border-t-2 border-t-[#20639B] font-semibold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                History
              </button>
              <button
                onClick={() => setActiveRightTopTab('Connections')}
                className={`px-3 py-1 rounded-t cursor-pointer transition-colors ${
                  activeRightTopTab === 'Connections'
                    ? 'bg-white text-slate-900 border-t-2 border-t-[#20639B] font-semibold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Connections
              </button>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-[10px] pb-1">
              <span className="bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-sans font-bold">
                2. ENVIRONMENT (Top-Right)
              </span>
            </div>
          </div>

          {/* Environment toolbar */}
          <div className="bg-[#fafafa] border-b border-slate-200 px-2 py-0.5 flex items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500">Global Environment</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
            <div className="flex items-center gap-1.5">
              <button title="Import Dataset" className="hover:text-slate-900 text-[10px] px-1 bg-white border border-slate-300 rounded">Import Dataset</button>
              <button title="Clear objects" className="p-0.5 hover:bg-slate-100 rounded cursor-pointer">
                <Trash2 className="w-3 h-3 text-slate-400 hover:text-slate-700" />
              </button>
            </div>
          </div>

          {/* Environment contents */}
          <div className="flex-1 overflow-auto bg-white p-2 font-mono text-[11px]">
            {/* Data section */}
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 font-sans">
              Data (Click name to View)
            </div>
            <div className="flex items-center justify-between py-1 px-1.5 hover:bg-blue-50 rounded cursor-pointer group">
              <span className="font-bold text-[#20639B] group-hover:underline flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-blue-100 text-[#20639B] flex items-center justify-center text-[8px]">▦</span>
                mtcars
              </span>
              <span className="text-slate-500 text-[10px]">32 obs. of 11 variables</span>
            </div>

            {/* Values section */}
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-2 mb-1 font-sans">
              Values (Stored Variables)
            </div>
            <table className="w-full text-left text-[11px]">
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-0.5 font-bold text-[#20639B]">bonus</td>
                  <td className="py-0.5 text-right text-slate-800">15</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-0.5 font-bold text-[#20639B]">final_score</td>
                  <td className="py-0.5 text-right text-slate-800">100</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-0.5 font-bold text-[#20639B]">score</td>
                  <td className="py-0.5 text-right text-slate-800">85</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#f0f2f5] border-t border-slate-200 px-2 py-0.5 text-[10px] text-slate-500">
            <span>List view • 3 values in active session</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PANE 3: BOTTOM-LEFT - R CONSOLE */}
        {/* ========================================================================= */}
        <div className="bg-white flex flex-col h-72 border border-slate-300 rounded-xs overflow-hidden shadow-2xs">
          {/* Tab bar */}
          <div className="bg-[#f0f2f5] border-b border-[#d8dce2] flex items-center justify-between px-2 pt-1 text-[11px]">
            <div className="flex items-center gap-1">
              <div className="px-3 py-1 bg-white text-slate-900 border-t-2 border-t-[#20639B] font-semibold rounded-t shadow-2xs">
                Console
              </div>
              <div className="px-3 py-1 text-slate-500 hover:text-slate-800 rounded-t">
                Terminal
              </div>
              <div className="px-3 py-1 text-slate-500 hover:text-slate-800 rounded-t hidden sm:block">
                Background Jobs
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-[10px] pb-1">
              <span className="bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-sans font-bold">
                3. CONSOLE (Bottom-Left)
              </span>
            </div>
          </div>

          {/* Console Output Area */}
          <div className="flex-1 overflow-auto bg-[#ffffff] p-2.5 font-mono text-[11px] leading-snug text-slate-800">
            <div className="text-slate-500 mb-1">
              R version 4.3.2 (2023-10-31) -- &quot;Eye Holes&quot;
            </div>
            <div className="text-slate-500 mb-2">
              Type &apos;demo()&apos; for some demos, &apos;help()&apos; for on-line help.
            </div>
            <div className="text-slate-900 font-semibold">&gt; score &lt;- 85</div>
            <div className="text-slate-900 font-semibold">&gt; bonus &lt;- 15</div>
            <div className="text-slate-900 font-semibold">&gt; final_score &lt;- score + bonus</div>
            <div className="text-slate-900 font-semibold">&gt; print(final_score)</div>
            <div className="text-blue-700 font-bold">[1] 100</div>
            <div className="text-slate-900 font-semibold flex items-center mt-1">
              <span>&gt;&nbsp;</span>
              <span className="w-1.5 h-3 bg-slate-800 animate-pulse inline-block" />
            </div>
          </div>

          <div className="bg-[#f0f2f5] border-t border-slate-200 px-2 py-0.5 text-[10px] text-slate-500 flex justify-between">
            <span>R 4.3.2 • Ready for commands</span>
            <span>~/intro_to_r</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PANE 4: BOTTOM-RIGHT - FILES, PLOTS, PACKAGES & HELP */}
        {/* ========================================================================= */}
        <div className="bg-white flex flex-col h-72 border border-slate-300 rounded-xs overflow-hidden shadow-2xs">
          {/* Tab bar */}
          <div className="bg-[#f0f2f5] border-b border-[#d8dce2] flex items-center justify-between px-2 pt-1 text-[11px]">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveRightBottomTab('Plots')}
                className={`px-2.5 py-1 rounded-t cursor-pointer transition-colors ${
                  activeRightBottomTab === 'Plots'
                    ? 'bg-white text-slate-900 border-t-2 border-t-[#20639B] font-semibold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Plots
              </button>
              <button
                onClick={() => setActiveRightBottomTab('Files')}
                className={`px-2.5 py-1 rounded-t cursor-pointer transition-colors ${
                  activeRightBottomTab === 'Files'
                    ? 'bg-white text-slate-900 border-t-2 border-t-[#20639B] font-semibold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Files
              </button>
              <button
                onClick={() => setActiveRightBottomTab('Packages')}
                className={`px-2.5 py-1 rounded-t cursor-pointer transition-colors ${
                  activeRightBottomTab === 'Packages'
                    ? 'bg-white text-slate-900 border-t-2 border-t-[#20639B] font-semibold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Packages
              </button>
              <button
                onClick={() => setActiveRightBottomTab('Help')}
                className={`px-2.5 py-1 rounded-t cursor-pointer transition-colors ${
                  activeRightBottomTab === 'Help'
                    ? 'bg-white text-slate-900 border-t-2 border-t-[#20639B] font-semibold shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Help
              </button>
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-[10px] pb-1">
              <span className="bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-sans font-bold">
                4. UTILITIES (Bottom-Right)
              </span>
            </div>
          </div>

          {/* Plot Toolbar */}
          <div className="bg-[#fafafa] border-b border-slate-200 px-2 py-0.5 flex items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 hover:text-slate-900 px-1 bg-white border border-slate-300 rounded text-[10px]">
                <Maximize2 className="w-2.5 h-2.5" /> Zoom
              </button>
              <button className="flex items-center gap-1 hover:text-slate-900 px-1 bg-white border border-slate-300 rounded text-[10px]">
                <ExternalLink className="w-2.5 h-2.5" /> Export
              </button>
            </div>
            <button title="Clear current plot" className="p-0.5 hover:bg-slate-100 rounded cursor-pointer">
              <Trash2 className="w-3 h-3 text-slate-400 hover:text-slate-700" />
            </button>
          </div>

          {/* Plot Canvas */}
          <div className="flex-1 bg-white flex flex-col items-center justify-center p-2 overflow-hidden">
            {activeRightBottomTab === 'Plots' ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50/50 rounded border border-dashed border-slate-200 p-2">
                <div className="text-[10px] font-bold text-slate-600 mb-1">
                  ggplot(mtcars, aes(x = wt, y = mpg)) + geom_point()
                </div>
                {/* Mini SVG scatter plot */}
                <svg viewBox="0 0 200 110" className="w-48 h-28 bg-white border border-slate-200 rounded shadow-2xs">
                  {/* Grid lines */}
                  <line x1="30" y1="20" x2="190" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="50" x2="190" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="80" x2="190" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                  {/* Axes */}
                  <line x1="30" y1="90" x2="190" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
                  <line x1="30" y1="10" x2="30" y2="90" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* Points */}
                  <circle cx="45" cy="25" r="2.5" fill="#20639B" opacity="0.85" />
                  <circle cx="60" cy="35" r="2.5" fill="#20639B" opacity="0.85" />
                  <circle cx="75" cy="40" r="2.5" fill="#20639B" opacity="0.85" />
                  <circle cx="90" cy="50" r="2.5" fill="#20639B" opacity="0.85" />
                  <circle cx="110" cy="62" r="2.5" fill="#20639B" opacity="0.85" />
                  <circle cx="130" cy="70" r="2.5" fill="#20639B" opacity="0.85" />
                  <circle cx="150" cy="78" r="2.5" fill="#20639B" opacity="0.85" />
                  <circle cx="170" cy="84" r="2.5" fill="#20639B" opacity="0.85" />
                  {/* Trendline */}
                  <line x1="40" y1="24" x2="175" y2="85" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" />
                  {/* Labels */}
                  <text x="110" y="104" fontSize="7" fill="#64748b" textAnchor="middle" fontFamily="sans-serif">Weight (wt)</text>
                  <text x="15" y="55" fontSize="7" fill="#64748b" textAnchor="middle" transform="rotate(-90 15,55)" fontFamily="sans-serif">MPG</text>
                </svg>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-6">
                Showing {activeRightBottomTab} tab view
              </div>
            )}
          </div>

          <div className="bg-[#f0f2f5] border-t border-slate-200 px-2 py-0.5 text-[10px] text-slate-500">
            <span>Plots viewer • Active device</span>
          </div>
        </div>
      </div>
    </div>
  );
};
