// ホームページ: 職務経歴書作成ツール メイン
// Design: クリーンフォーム業務系モダン
// Primary: Teal #0D7377, Background: Light Gray, Font: Noto Sans JP
// Layout: ステップ形式（上部インジケーター固定）+ スティッキーフッターナビ

import { useState } from 'react';
import { StepIndicator } from '@/components/StepIndicator';
import { Step1BasicInfo } from '@/components/steps/Step1BasicInfo';
import { Step2Summary } from '@/components/steps/Step2Summary';
import { Step3WorkHistory } from '@/components/steps/Step3WorkHistory';
import { Step4QualSkills } from '@/components/steps/Step4QualSkills';
import { Step5Preview } from '@/components/steps/Step5Preview';
import { useResumeStorage } from '@/hooks/useResumeStorage';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { STEPS } from '@/lib/types';
import { toast } from 'sonner';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const { data, updateData, resetData, lastSaved } = useResumeStorage();

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === STEPS.length;

  const handleNext = () => {
    if (currentStep === 1 && !data.fullName.trim()) {
      toast.error('氏名を入力してください');
      return;
    }
    if (currentStep < STEPS.length) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    resetData();
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatLastSaved = (date: Date | null) => {
    if (!date) return '';
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} 自動保存済み`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ヘッダー */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container py-3 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold leading-tight">
              保育士 職務経歴書
            </h1>
            <p className="text-xs text-primary-foreground/70 mt-0.5">
              作成ツール
            </p>
          </div>
          {lastSaved && (
            <div className="flex items-center gap-1 text-xs text-primary-foreground/70">
              <Save className="w-3 h-3" />
              <span>{formatLastSaved(lastSaved)}</span>
            </div>
          )}
        </div>
      </header>

      {/* ステップインジケーター */}
      <StepIndicator currentStep={currentStep} />

      {/* メインコンテンツ */}
      <main className="flex-1 container py-6 pb-28">
        {currentStep === 1 && (
          <Step1BasicInfo data={data} onChange={updateData} />
        )}
        {currentStep === 2 && (
          <Step2Summary data={data} onChange={updateData} />
        )}
        {currentStep === 3 && (
          <Step3WorkHistory data={data} onChange={updateData} />
        )}
        {currentStep === 4 && (
          <Step4QualSkills data={data} onChange={updateData} />
        )}
        {currentStep === 5 && (
          <Step5Preview data={data} onReset={handleReset} />
        )}
      </main>

      {/* スティッキーフッターナビ */}
      {!isLastStep && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg z-20">
          <div className="container py-3 flex items-center gap-3">
            {!isFirstStep && (
              <Button
                variant="outline"
                className="flex-1 h-12 gap-1.5"
                onClick={handleBack}
              >
                <ChevronLeft className="w-4 h-4" />
                前へ
              </Button>
            )}
            <Button
              className="flex-1 h-12 gap-1.5 bg-primary hover:bg-primary/90 font-bold text-base"
              onClick={handleNext}
            >
              {currentStep === STEPS.length - 1 ? '確認・出力へ' : '次へ'}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* 最終ステップの戻るボタン */}
      {isLastStep && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg z-20">
          <div className="container py-3">
            <Button
              variant="outline"
              className="w-full h-12 gap-1.5"
              onClick={handleBack}
            >
              <ChevronLeft className="w-4 h-4" />
              入力に戻る
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
