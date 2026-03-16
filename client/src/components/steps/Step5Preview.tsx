// ステップ5: 確認・出力
// Design: クリーンフォーム業務系モダン
// PDF生成: @react-pdf/renderer の pdf() → Blob → URL でダウンロード
// html2canvas を一切使わないため Safari/iOS でも動作する

import { useState, useRef, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/types';
import { ResumePreview } from '@/components/ResumePreview';
import { ResumePdfDocument } from '@/lib/ResumePdfDocument';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileText, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface Step5Props {
  data: ResumeData;
  onReset: () => void;
}

export function Step5Preview({ data, onReset }: Step5Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.45);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 16;
        const newScale = containerWidth / 794;
        setScale(Math.min(newScale, 0.65));
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [showPreview]);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const name = data.fullName || '職務経歴書';
      const today = new Date();
      const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
      const fileName = `職務経歴書_${name}_${dateStr}.pdf`;

      // @react-pdf/renderer で PDF Blob を生成
      const blob = await pdf(<ResumePdfDocument data={data} />).toBlob();

      // Blob URL を作成してダウンロード
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success('PDFをダウンロードしました');
    } catch (err) {
      console.error('PDF生成エラー:', err);
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`PDF生成に失敗しました: ${msg}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('入力内容をすべてリセットしますか？この操作は元に戻せません。')) {
      onReset();
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-bold text-foreground mb-1">確認・出力</h2>
        <p className="text-sm text-muted-foreground">
          内容を確認してPDFをダウンロードしてください。
        </p>
      </div>

      {/* PDF出力ボタン */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-4 space-y-3">
        <Button
          className="w-full h-12 text-base font-bold gap-2 bg-primary hover:bg-primary/90"
          onClick={handleDownload}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              PDF生成中...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              PDFをダウンロード
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          ※ データはサーバーに送信されません。お使いの端末に保存されます。
        </p>
      </div>

      {/* プレビュー表示切り替え */}
      <Button
        variant="outline"
        className="w-full gap-2"
        onClick={() => setShowPreview((v) => !v)}
      >
        {showPreview ? (
          <>
            <EyeOff className="w-4 h-4" />
            プレビューを閉じる
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" />
            プレビューを表示する
          </>
        )}
      </Button>

      {/* プレビュー本体（縮小表示） */}
      {showPreview && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              プレビュー（縮小表示）
            </span>
          </div>
          <div
            ref={containerRef}
            className="border border-border rounded-lg bg-gray-100 p-2 overflow-hidden"
          >
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                width: `${(1 / scale) * 100}%`,
                pointerEvents: 'none',
              }}
            >
              <ResumePreview data={data} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            ※ 実際のPDFはA4サイズで出力されます。
          </p>
        </div>
      )}

      {/* リセット */}
      <div className="pt-2 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive gap-1.5"
          onClick={handleReset}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          入力内容をリセット
        </Button>
      </div>
    </div>
  );
}
