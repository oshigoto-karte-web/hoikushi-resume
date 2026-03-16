// ステップ3: 職務経歴
// Design: クリーンフォーム業務系モダン

import { ResumeData, WorkHistory, EMPLOYMENT_TYPES, YEARS, MONTHS, createEmptyWorkHistory } from '@/lib/types';
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
import { Plus, Trash2, Building2, ChevronUp, ChevronDown } from 'lucide-react';

interface Step3Props {
  data: ResumeData;
  onChange: (updates: Partial<ResumeData>) => void;
}

function WorkHistoryCard({
  item,
  index,
  total,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  item: WorkHistory;
  index: number;
  total: number;
  onUpdate: (updates: Partial<WorkHistory>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
      {/* カードヘッダー */}
      <div className="bg-primary/8 border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            職歴 {index + 1}
            {item.companyName && (
              <span className="text-muted-foreground ml-2 font-normal">
                {item.companyName}
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7"
            onClick={onMoveUp}
            disabled={index === 0}
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7"
            onClick={onMoveDown}
            disabled={index === total - 1}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </Button>
          {total > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={onDelete}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* カード本体 */}
      <div className="p-4 space-y-4">
        {/* 法人名 */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            法人名・施設名
          </Label>
          <Input
            placeholder="例：社会福祉法人〇〇会"
            value={item.companyName}
            onChange={(e) => onUpdate({ companyName: e.target.value })}
            className="text-base"
          />
        </div>

        {/* 在職期間 */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            在職期間
          </Label>
          <div className="flex items-center gap-2">
            {/* 開始年月 */}
            <div className="flex items-center gap-1 flex-1">
              <Select
                value={item.startYear}
                onValueChange={(v) => onUpdate({ startYear: v })}
              >
                <SelectTrigger className="flex-1 text-sm">
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
                value={item.startMonth}
                onValueChange={(v) => onUpdate({ startMonth: v })}
              >
                <SelectTrigger className="w-16 text-sm">
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

            <span className="text-muted-foreground text-sm">〜</span>

            {/* 終了年月 or 現在 */}
            {item.isCurrent ? (
              <span className="flex-1 text-sm font-medium text-primary bg-primary/10 rounded px-3 py-2 text-center">
                現在
              </span>
            ) : (
              <div className="flex items-center gap-1 flex-1">
                <Select
                  value={item.endYear}
                  onValueChange={(v) => onUpdate({ endYear: v })}
                >
                  <SelectTrigger className="flex-1 text-sm">
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
                  value={item.endMonth}
                  onValueChange={(v) => onUpdate({ endMonth: v })}
                >
                  <SelectTrigger className="w-16 text-sm">
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
            )}
          </div>

          {/* 現在も在職中チェック */}
          <label className="flex items-center gap-2 mt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={item.isCurrent}
              onChange={(e) =>
                onUpdate({
                  isCurrent: e.target.checked,
                  endYear: '',
                  endMonth: '',
                })
              }
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm text-foreground">現在も在職中</span>
          </label>
        </div>

        {/* 勤務形態 */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            勤務形態
          </Label>
          <Select
            value={item.employmentType}
            onValueChange={(v) => onUpdate({ employmentType: v })}
          >
            <SelectTrigger className="text-base">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {EMPLOYMENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 業務内容 */}
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            業務内容
          </Label>
          <Textarea
            placeholder={`例：
〇〇保育園
1歳児担任
2歳児担任
フリー保育士

△△保育園
主任保育士`}
            value={item.jobDescription}
            onChange={(e) => onUpdate({ jobDescription: e.target.value })}
            rows={6}
            className="text-base resize-none leading-relaxed"
          />
          <p className="text-xs text-muted-foreground">
            施設名・担当クラス・役職などを自由に記入してください。改行で区切ると見やすくなります。
          </p>
        </div>
      </div>
    </div>
  );
}

export function Step3WorkHistory({ data, onChange }: Step3Props) {
  const updateItem = (index: number, updates: Partial<WorkHistory>) => {
    const updated = data.workHistories.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    );
    onChange({ workHistories: updated });
  };

  const deleteItem = (index: number) => {
    onChange({
      workHistories: data.workHistories.filter((_, i) => i !== index),
    });
  };

  const addItem = () => {
    onChange({
      workHistories: [...data.workHistories, createEmptyWorkHistory()],
    });
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const arr = [...data.workHistories];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    onChange({ workHistories: arr });
  };

  const moveDown = (index: number) => {
    if (index === data.workHistories.length - 1) return;
    const arr = [...data.workHistories];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    onChange({ workHistories: arr });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-1">職務経歴</h2>
        <p className="text-sm text-muted-foreground">
          勤務先を古い順に入力してください。複数ある場合は「職歴を追加」で増やせます。
        </p>
      </div>

      <div className="space-y-4">
        {data.workHistories.map((item, index) => (
          <WorkHistoryCard
            key={item.id}
            item={item}
            index={index}
            total={data.workHistories.length}
            onUpdate={(updates) => updateItem(index, updates)}
            onDelete={() => deleteItem(index)}
            onMoveUp={() => moveUp(index)}
            onMoveDown={() => moveDown(index)}
          />
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full border-dashed border-primary/50 text-primary hover:bg-primary/5 hover:border-primary"
        onClick={addItem}
      >
        <Plus className="w-4 h-4 mr-2" />
        職歴を追加する
      </Button>
    </div>
  );
}
