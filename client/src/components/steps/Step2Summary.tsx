// ステップ2: 職務要約
// Design: クリーンフォーム業務系モダン

import { ResumeData } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface Step2Props {
  data: ResumeData;
  onChange: (updates: Partial<ResumeData>) => void;
}

export function Step2Summary({ data, onChange }: Step2Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-1">職務要約</h2>
        <p className="text-sm text-muted-foreground">
          これまでの経験を簡潔にまとめてください。3〜5文程度が目安です。
        </p>
      </div>

      <div className="bg-card rounded-lg p-5 shadow-sm border border-border space-y-4">
        <div className="space-y-2">
          <Label htmlFor="summary" className="flex items-center gap-1.5 text-sm font-medium">
            <FileText className="w-4 h-4 text-primary" />
            職務要約
          </Label>
          <Textarea
            id="summary"
            placeholder={`例：保育士として約15年の経験があります。0歳児から5歳児まで幅広い年齢を担当し、主任保育士として後輩指導にも携わってきました。子ども一人ひとりの個性を大切にした保育を心がけています。`}
            value={data.summary}
            onChange={(e) => onChange({ summary: e.target.value })}
            rows={6}
            className="text-base resize-none leading-relaxed"
          />
          <p className="text-xs text-muted-foreground text-right">
            {data.summary.length}文字
          </p>
        </div>

        <div className="bg-muted/50 rounded-md p-3 border border-border">
          <p className="text-xs text-muted-foreground font-medium mb-1">記載のヒント</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>・保育士としての総経験年数</li>
            <li>・担当してきた主な年齢クラス</li>
            <li>・役職（主任・フリー保育士など）</li>
            <li>・保育に対する姿勢・強み</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
