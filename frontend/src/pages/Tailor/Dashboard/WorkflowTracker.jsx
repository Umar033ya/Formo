import { Fragment } from 'react';
import { Check } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/mockData';
import { cx } from '../utils';

export default function WorkflowTracker({ stage = 0 }) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex min-w-max items-start">
        {WORKFLOW_STEPS.map((step, index) => {
          const done = index < stage;
          const current = index === stage;

          return (
            <Fragment key={step}>
              <div className="flex w-24 shrink-0 flex-col items-center gap-2 sm:w-32">
                <span
                  className={cx(
                    'flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition',
                    done && 'bg-teal-500 text-white shadow-glow',
                    current &&
                      'bg-teal-500/15 text-teal-300 ring-2 ring-inset ring-teal-500/50 animate-pulse',
                    !done && !current && 'bg-white/5 text-slate-500 ring-1 ring-inset ring-white/10'
                  )}
                >
                  {done ? <Check className="h-5 w-5" /> : index + 1}
                </span>
                <span
                  className={cx(
                    'text-center text-[11px] leading-tight sm:text-xs',
                    index <= stage ? 'font-semibold text-white' : 'font-medium text-slate-500'
                  )}
                >
                  {step}
                </span>
              </div>
              {index < WORKFLOW_STEPS.length - 1 && (
                <span
                  className={cx(
                    'mt-4 h-0.5 min-w-4 flex-1 rounded-full sm:min-w-8',
                    index < stage ? 'bg-teal-500' : 'bg-white/10'
                  )}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
