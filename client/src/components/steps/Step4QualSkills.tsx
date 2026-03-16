// ステップ4: 免許・資格 / スキル・得意分野 / 自己PR
// Design: クリーンフォーム業務系モダン

import {
  ResumeData,
  Qualification,
  COMMON_QUALIFICATIONS,
  YEARS,
  MONTHS,
  createEmptyQualification,
} from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, Award, Star, MessageSquare } from 'lucide-react';

interface Step4Props {
  data: ResumeData;
  onChange: (updates: Partial<ResumeData>) => void;
}

function QualificationRow({
  item,
  index,
  total,
  onUpdate,
  onDelete,
}: {
  item: Qualification;
  index: number;
  total: number;
  onUpdate: (updates: Partial<Qualification>) => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-md border border-border">
      <div className="flex items-center gap-1 shrink-0">
        <Select
          value={item.year}
          onValueChange={(v) => onUpdate({ year: v })}
        >
          <SelectTrigger className="w-20 text-sm h-9">
            <SelectValue placeholder="年" />
          </SelectTrigger>
          <SelectContent>
            {YEARS.map((y) => (
              <SelectItem key={y} value={y}>
                {y}年
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={item.month}
          onValueChange={(v) => onUpdate({ month: v })}
        >
          <SelectTrigger className="w-14 text-sm h-9">
            <SelectValue placeholder="月" />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((m) => (
              <SelectItem key={m} value={m}>
                {m}月
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Input
        placeholder="資格・免許名"
        value={item.name}
        onChange={(e) => onUpdate({ name: e.target.value })}
        className="flex-1 text-sm h-9"
        list={`qual-suggestions-${index}`}
      />
      <datalist id={`qual-suggestions-${index}`}>
        {COMMON_QUALIFICATIONS.map((q) => (
          <option key={q} value={q} />
        ))}
      </datalist>
      {total > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-9 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={onDelete}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      )}
    </div>
  );
}

export function Step4QualSkills({ data, onChange }: Step4Props) {
  const updateQual = (index: number, updates: Partial<Qualification>) => {
    const updated = data.qualifications.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    );
    onChange({ qualifications: updated });
  };

  const deleteQual = (index: number) => {
    onChange({
      qualifications: data.qualifications.filter((_, i) => i !== index),
    });
  };

  const addQual = () => {
    onChange({
      qualifications: [...data.qualifications, createEmptyQualification()],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-1">資格・スキル・自己PR</h2>
        <p className="text-sm text-muted-foreground">
          保有資格、得意なこと、自己PRを入力してください。
        </p>
      </div>

      {/* 免許・資格 */}
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary/8 border-b border-border px-4 py-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">免許・資格</span>
        </div>
        <div className="p-4 space-y-3">
          {data.qualifications.map((item, index) => (
            <QualificationRow
              key={item.id}
              item={item}
              index={index}
              total={data.qualifications.length}
              onUpdate={(updates) => updateQual(index, updates)}
              onDelete={() => deleteQual(index)}
            />
          ))}
          <Button
            variant="outline"
            size="sm"
            className="w-full border-dashed border-primary/50 text-primary hover:bg-primary/5 hover:border-primary"
            onClick={addQual}
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            資格を追加する
          </Button>
          <p className="text-xs text-muted-foreground">
            資格名は入力欄に直接入力するか、よく使われる資格名から選択できます。
          </p>
        </div>
      </div>

      {/* スキル・得意分野 */}
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary/8 border-b border-border px-4 py-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">スキル・得意分野</span>
        </div>
        <div className="p-4 space-y-2">
          <Textarea
            placeholder={`例：
・ピアノ演奏（保育現場での弾き歌い）
・絵本の読み聞かせ
・個別配慮児への対応
・保護者との信頼関係構築`}
            value={data.skills}
            onChange={(e) => onChange({ skills: e.target.value })}
            rows={5}
            className="text-base resize-none leading-relaxed"
          />
          <p className="text-xs text-muted-foreground text-right">
            {data.skills.length}文字
          </p>
        </div>
      </div>

      {/* 自己PR */}
      <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="bg-primary/8 border-b border-border px-4 py-3 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">自己PR</span>
        </div>
        <div className="p-4 space-y-2">
          <Textarea
            placeholder={`例：私はこれまで保育現場で、子ども・保護者・職員それぞれの思いに丁寧に向き合うことを大切にしてきました。日々変化する子どもの姿や突発的な出来事にも柔軟に対応しながら、冷静に状況を整理し、最善の方法を考えて行動することを心がけています。`}
            value={data.selfPR}
            onChange={(e) => onChange({ selfPR: e.target.value })}
            rows={8}
            className="text-base resize-none leading-relaxed"
          />
          <p className="text-xs text-muted-foreground text-right">
            {data.selfPR.length}文字
          </p>
        </div>
      </div>
    </div>
  );
}
