import React from 'react';
import { WORKFLOW_STEPS } from '../data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

export const WorkflowBanner: React.FC = () => {
  return (
    <div
      id="core-workflow-banner"
      className="bg-white border-b border-slate-200 px-6 py-2 text-slate-700 select-none shrink-0"
    >
      <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-none text-xs">
        <div className="flex items-center gap-2 flex-shrink-0 text-slate-400 font-mono text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          <span className="font-bold uppercase tracking-widest text-slate-500">
            Intelligence Flow
          </span>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2 flex-nowrap flex-1 justify-start md:justify-center py-0.5">
          {WORKFLOW_STEPS.map((step, idx) => (
            <React.Fragment key={step.step}>
              <div
                className={`group flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-help ${
                  step.step === 'ANALYSE IMPACT' || step.step === 'VERIFY'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent'
                }`}
                title={`${step.desc}: ${step.sources}`}
              >
                <span>{step.step}</span>
              </div>
              {idx < WORKFLOW_STEPS.length - 1 && (
                <span className="text-slate-300 text-xs select-none">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[10px] text-slate-400 font-medium flex-shrink-0">
          <span className="text-blue-600 font-mono font-bold">Multi-Source</span>
          <span>→ Unified Verification</span>
        </div>
      </div>
    </div>
  );
};
