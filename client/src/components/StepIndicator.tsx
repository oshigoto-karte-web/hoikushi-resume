// ステップインジケーター
// Design: クリーンフォーム業務系モダン
// Primary: Teal #0D7377, 上部固定でステップ進捗を表示

import { STEPS } from '@/lib/types';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="bg-white border-b border-border shadow-sm sticky top-0 z-10">
      <div className="container py-3">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200
                      ${isCompleted
                        ? 'bg-primary text-primary-foreground'
                        : isCurrent
                        ? 'bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-1'
                        : 'bg-muted text-muted-foreground'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span
                    className={`
                      text-[10px] mt-1 font-medium whitespace-nowrap
                      ${isCurrent ? 'text-primary' : isCompleted ? 'text-primary/70' : 'text-muted-foreground'}
                    `}
                  >
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`
                      flex-1 h-0.5 mx-1 mb-4 transition-all duration-300
                      ${currentStep > step.id ? 'bg-primary' : 'bg-border'}
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
