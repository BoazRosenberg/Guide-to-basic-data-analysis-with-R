import React, { useState } from 'react';
import { Play, RotateCcw, FastForward, CheckCircle2, HardDrive } from 'lucide-react';
import { SimStep } from '../types';

const SIM_STEPS: SimStep[] = [
  {
    line: 1,
    code: 'score <- 85',
    env: [
      { name: 'score', val: '85', type: 'num' },
    ],
    console: '> score <- 85\n> ',
    annotation: 'Line 1 executed. Variable "score" is set to 85 and appears in the Environment.'
  },
  {
    line: 2,
    code: 'bonus <- 15',
    env: [
      { name: 'bonus', val: '15', type: 'num' },
      { name: 'score', val: '85', type: 'num' },
    ],
    console: '> score <- 85\n> bonus <- 15\n> ',
    annotation: 'Line 2 executed. Variable "bonus" is created with value 15.'
  },
  {
    line: 3,
    code: 'final_score <- score + bonus',
    env: [
      { name: 'bonus', val: '15', type: 'num' },
      { name: 'final_score', val: '100', type: 'num' },
      { name: 'score', val: '85', type: 'num' },
    ],
    console: '> score <- 85\n> bonus <- 15\n> final_score <- score + bonus\n> ',
    annotation: 'Line 3 executed. R calculates 85 + 15 and stores 100 into final_score. It now holds its own value.'
  },
  {
    line: 4,
    code: 'score <- 95',
    env: [
      { name: 'bonus', val: '15', type: 'num' },
      { name: 'final_score', val: '100', type: 'num' },
      { name: 'score', val: '95', type: 'num' },
    ],
    console: '> score <- 85\n> bonus <- 15\n> final_score <- score + bonus\n> score <- 95\n> ',
    annotation: 'Variable independence: score is now updated to 95. However, final_score was already set to 100 earlier, so final_score does NOT change!'
  }
];

export const InteractiveSimulator: React.FC = () => {
  // currentLineIndex represents which line is currently selected ready to run (0 to 3), or 4 when all finished
  const [currentLineIdx, setCurrentLineIdx] = useState<number>(0);

  const step = currentLineIdx > 0 ? SIM_STEPS[currentLineIdx - 1] : null;

  const handleNext = () => {
    if (currentLineIdx < SIM_STEPS.length) {
      setCurrentLineIdx((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentLineIdx(0);
  };

  const handleRunAll = () => {
    setCurrentLineIdx(SIM_STEPS.length);
  };

  return (
    <div className="my-6 rounded-xl border border-slate-300 bg-white overflow-hidden shadow-xs">
      {/* Simulator Toolbar */}
      <div className="bg-[#f0f2f5] px-4 py-2.5 border-b border-slate-300 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#20639B]" />
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
            RStudio Execution Simulator
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {currentLineIdx < SIM_STEPS.length ? `(Selected line: ${currentLineIdx + 1} of ${SIM_STEPS.length})` : '(All lines executed)'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNext}
            disabled={currentLineIdx >= SIM_STEPS.length}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold shadow-2xs transition-colors cursor-pointer ${
              currentLineIdx >= SIM_STEPS.length
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                : 'bg-[#20639B] hover:bg-[#174a75] text-white active:scale-95'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Selected Line</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white/20 rounded font-mono">
              Ctrl+Enter
            </kbd>
          </button>

          <button
            onClick={handleRunAll}
            disabled={currentLineIdx >= SIM_STEPS.length}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors cursor-pointer"
          >
            <FastForward className="w-3 h-3 text-slate-600" />
            <span className="hidden sm:inline">Run All</span>
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors cursor-pointer"
            title="Reset simulation to initial state"
          >
            <RotateCcw className="w-3 h-3 text-slate-600" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 2-Pane RStudio Simulator: Left Editor, Right Environment & Console */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-300 bg-white">
        {/* Left: Source Editor */}
        <div className="bg-white p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <span className="w-2.5 h-2.5 rounded-full bg-[#20639B] text-white flex items-center justify-center text-[7px] font-bold">R</span>
                Source Editor: script.R
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Top-Left Pane</span>
            </div>

            {/* Script lines */}
            <div className="space-y-1 font-mono text-xs">
              {SIM_STEPS.map((s, idx) => {
                const isSelected = currentLineIdx === idx;
                const isExecuted = currentLineIdx > idx;

                return (
                  <div
                    key={s.line}
                    className={`px-3 py-1.5 rounded flex items-center gap-3 transition-colors ${
                      isSelected
                        ? 'bg-[#e2e8f0] text-slate-900 border-l-4 border-slate-500 font-medium'
                        : isExecuted
                        ? 'text-slate-600 bg-slate-50/70'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-5 text-right text-slate-400 select-none text-[11px] border-r border-slate-200 pr-2">
                      {s.line}
                    </span>
                    <span className="flex-1 font-mono">
                      {s.code.split('<-').map((part, pIdx) => (
                        <React.Fragment key={pIdx}>
                          {pIdx > 0 && <span className="text-[#0000ff] font-semibold"> &lt;- </span>}
                          {part.trim().match(/^\d+$/) ? (
                            <span className="text-[#098658] font-medium">{part.trim()}</span>
                          ) : (
                            part
                          )}
                        </React.Fragment>
                      ))}
                    </span>

                    {isSelected && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-300 text-slate-700 font-sans font-medium">
                        Selected
                      </span>
                    )}
                    {isExecuted && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation in lay terms */}
          <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-sans">
            <span className="font-bold text-slate-900">Current status: </span>
            {step ? (
              <span>{step.annotation}</span>
            ) : (
              <span>Line 1 is selected in gray (just like when your cursor is on that line in RStudio). Click <strong>&quot;Run Selected Line&quot;</strong> to send it to the Console.</span>
            )}
          </div>
        </div>

        {/* Right: Environment & Console */}
        <div className="bg-[#fafafa] flex flex-col divide-y divide-slate-300">
          {/* Environment Pane */}
          <div className="p-4 flex-1">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                <HardDrive className="w-3.5 h-3.5 text-[#20639B]" />
                Environment (Active R Memory)
              </span>
              <span className="text-[10px] font-mono text-slate-400">Global Environment</span>
            </div>

            {(!step || step.env.length === 0) ? (
              <div className="py-6 text-center text-xs text-slate-400 italic font-mono">
                (Environment is empty)
              </div>
            ) : (
              <table className="w-full text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 text-[11px] bg-slate-100/60">
                    <th className="text-left py-1 px-2 font-semibold font-sans">Name</th>
                    <th className="text-left py-1 px-2 font-semibold font-sans">Type</th>
                    <th className="text-right py-1 px-2 font-semibold font-sans">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {step.env.map((v) => (
                    <tr key={v.name} className="hover:bg-slate-50">
                      <td className="py-1 px-2 font-bold text-[#20639B]">{v.name}</td>
                      <td className="py-1 px-2 text-slate-400 text-[11px]">{v.type}</td>
                      <td className="py-1 px-2 text-right font-bold text-slate-900">
                        {v.val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Console Pane */}
          <div className="bg-white text-slate-800 p-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pb-1.5 mb-1.5 border-b border-slate-200 font-sans">
              <span className="font-semibold text-slate-700">R Console</span>
              <span className="text-slate-400">| Bottom-Left Pane</span>
            </div>
            <pre className="whitespace-pre font-mono text-[11.5px] leading-relaxed text-slate-800 h-24 overflow-y-auto">
              {step ? step.console : '> _'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
