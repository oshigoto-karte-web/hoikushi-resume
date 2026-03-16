// ステップ1: 基本情報（氏名・作成日）
// Design: クリーンフォーム業務系モダン

import { ResumeData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { User, Calendar } from 'lucide-react';

interface Step1Props {
  data: ResumeData;
  onChange: (updates: Partial<ResumeData>) => void;
}

export function Step1BasicInfo({ data, onChange }: Step1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-1">基本情報</h2>
        <p className="text-sm text-muted-foreground">
          職務経歴書に記載する氏名と作成日を入力してください。
        </p>
      </div>

      <div className="bg-card rounded-lg p-5 shadow-sm border border-border space-y-5">
        {/* 氏名 */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="flex items-center gap-1.5 text-sm font-medium">
            <User className="w-4 h-4 text-primary" />
            氏名
            <span className="text-destructive text-xs ml-1">必須</span>
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="例：山田 花子"
            value={data.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            className="text-base"
          />
        </div>

        {/* 作成日 */}
        <div className="space-y-2">
          <Label htmlFor="createdDate" className="flex items-center gap-1.5 text-sm font-medium">
            <Calendar className="w-4 h-4 text-primary" />
            作成日
          </Label>
          <Input
            id="createdDate"
            type="date"
            value={data.createdDate}
            onChange={(e) => onChange({ createdDate: e.target.value })}
            className="text-base"
          />
          <p className="text-xs text-muted-foreground">
            本日の日付が自動で入力されています。必要に応じて変更してください。
          </p>
        </div>
      </div>
    </div>
  );
}
