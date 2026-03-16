// PDF生成ユーティリティ
// html2canvas + jsPDF でDOM要素をA4 PDFに変換する
// 非表示要素対応: 要素を一時的に画面外に配置してキャプチャ

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function generatePdf(elementId: string, fileName: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    width: element.scrollWidth,
    height: element.scrollHeight,
    windowWidth: 794, // A4 pixel width at 96dpi
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);

  // A4サイズ（mm）
  const pdf = new jsPDF({
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

    // 現在ページの切り出し位置（canvas座標）
    const sourceY = yOffset / ratio;
    const sourceHeight = Math.min(pdfHeight / ratio, imgHeight - sourceY);

    // 部分キャンバスを作成
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

    const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);
    const pageImgHeight = sourceHeight * ratio;

    pdf.addImage(pageImgData, 'JPEG', 0, 0, pdfWidth, pageImgHeight);

    yOffset += pdfHeight;
    pageCount++;
  }

  pdf.save(fileName);
}
