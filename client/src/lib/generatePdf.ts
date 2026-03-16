// PDF生成ユーティリティ
// html2canvas + jsPDF でDOM要素をA4 PDFに変換する
//
// 修正内容:
// - onclone コールバックで oklch CSS変数をRGB値に置換（html2canvasはoklchを解析できないため）
// - getBoundingClientRect() でpxサイズを取得
// - document.fonts.ready でGoogleフォントの読み込みを待機
// - allowTaint:true, useCORS:false でCORSエラーを回避

import html2canvas from 'html2canvas';

export async function generatePdf(elementId: string, fileName: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`要素 "${elementId}" が見つかりません`);
  }

  // フォントの読み込みを待機
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  // DOMレンダリングを確実に待つ（2フレーム）
  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  );

  // 要素のサイズをpxで取得
  const rect = element.getBoundingClientRect();
  const elWidth = Math.max(rect.width, element.scrollWidth, 794);
  const elHeight = Math.max(rect.height, element.scrollHeight, 100);

  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(element, {
      scale: 2,
      useCORS: false,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: elWidth,
      height: elHeight,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      // onclone: クローンされたDOMのCSSからoklch()をhtml2canvasが解析できるRGB値に置換する
      onclone: (_doc: Document, el: HTMLElement) => {
        // oklch → 固定RGB マッピング（Tailwind 4 デフォルトトークン）
        const oklchToRgb: Record<string, string> = {
          'oklch(1 0 0)': '#ffffff',
          'oklch(0 0 0)': '#000000',
          'oklch(0.235 0.015 65)': '#2d2a24',
          'oklch(0.141 0.005 285.823)': '#1a1a1f',
          'oklch(0.92 0.004 286.32)': '#e8e8ec',
          'oklch(0.967 0.001 286.375)': '#f5f5f7',
          'oklch(0.98 0.001 286.375)': '#fafafa',
          'oklch(0.552 0.016 285.938)': '#7a7a87',
          'oklch(0.577 0.245 27.325)': '#d93025',
          'oklch(0.985 0 0)': '#fefefe',
          'oklch(0.4 0.015 65)': '#524e46',
          'oklch(0.623 0.214 259.815)': '#3b82f6',
        };

        // すべてのstyle属性とstyleシートを走査してoklchを置換
        const replaceOklch = (cssText: string): string => {
          let result = cssText;
          for (const [oklch, rgb] of Object.entries(oklchToRgb)) {
            result = result.split(oklch).join(rgb);
          }
          // 残ったoklch()をフォールバック（白）で置換
          result = result.replace(/oklch\([^)]+\)/g, '#ffffff');
          return result;
        };

        // インラインスタイルを置換
        const allElements = el.querySelectorAll<HTMLElement>('*');
        allElements.forEach((child) => {
          if (child.style && child.style.cssText) {
            child.style.cssText = replaceOklch(child.style.cssText);
          }
        });

        // <style>タグのCSSテキストを置換
        const styleEls = el.ownerDocument.querySelectorAll('style');
        styleEls.forEach((styleEl) => {
          if (styleEl.textContent) {
            styleEl.textContent = replaceOklch(styleEl.textContent);
          }
        });
      },
    });
  } catch (err) {
    throw new Error(
      `html2canvas エラー: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  if (canvas.width === 0 || canvas.height === 0) {
    throw new Error(`キャンバスサイズが0です (${canvas.width}x${canvas.height})`);
  }

  // A4サイズ（mm）
  const { jsPDF: JsPDF } = await import('jspdf');
  const pdf = new JsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();   // 210mm
  const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // 画像をA4幅に合わせてスケール
  const ratio = pdfWidth / imgWidth;
  const scaledHeight = imgHeight * ratio;

  // 複数ページ対応
  let yOffset = 0;
  let pageCount = 0;

  while (yOffset < scaledHeight) {
    if (pageCount > 0) {
      pdf.addPage();
    }

    const sourceY = yOffset / ratio;
    const sourceHeight = Math.min(pdfHeight / ratio, imgHeight - sourceY);

    const pageCanvas = document.createElement('canvas');
    pageCanvas.width = imgWidth;
    pageCanvas.height = Math.ceil(sourceHeight);
    const ctx = pageCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(
        canvas,
        0, sourceY, imgWidth, sourceHeight,
        0, 0, imgWidth, sourceHeight
      );
    }

    const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.92);
    const pageImgHeight = sourceHeight * ratio;

    pdf.addImage(pageImgData, 'JPEG', 0, 0, pdfWidth, pageImgHeight);

    yOffset += pdfHeight;
    pageCount++;
  }

  pdf.save(fileName);
}
