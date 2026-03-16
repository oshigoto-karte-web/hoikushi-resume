// 職務経歴書プレビュー（PDFレイアウト再現）
// Design: テンプレートに忠実なA4レイアウト
// 幅: 794px固定（A4 @ 96dpi）でhtml2canvasが確実にキャプチャできるよう px 指定

import { ResumeData } from '@/lib/types';

interface ResumePreviewProps {
  data: ResumeData;
}

// A4 @ 96dpi = 794 x 1123 px
const A4_WIDTH_PX = 794;
const A4_PADDING_H = 57; // ~15mm
const A4_PADDING_V = 68; // ~18mm

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日現在`;
}

function formatPeriod(
  startYear: string,
  startMonth: string,
  endYear: string,
  endMonth: string,
  isCurrent: boolean
): string {
  const start =
    startYear && startMonth ? `${startYear}年${startMonth}月` : '';
  const end = isCurrent
    ? '現在'
    : endYear && endMonth
    ? `${endYear}年${endMonth}月`
    : '';
  if (!start && !end) return '';
  return `${start}〜${end}`;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div
      id="resume-preview"
      style={{
        width: `${A4_WIDTH_PX}px`,
        minHeight: '1123px',
        paddingTop: `${A4_PADDING_V}px`,
        paddingBottom: `${A4_PADDING_V}px`,
        paddingLeft: `${A4_PADDING_H}px`,
        paddingRight: `${A4_PADDING_H}px`,
        backgroundColor: '#ffffff',
        fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif",
        fontSize: '13px',
        lineHeight: '1.65',
        color: '#1c1c1c',
        boxSizing: 'border-box',
      }}
    >
      {/* タイトル */}
      <div
        style={{
          borderBottom: '2.5px solid #1c1c1c',
          paddingBottom: '8px',
          marginBottom: '12px',
        }}
      >
        <h1
          style={{
            fontSize: '26px',
            fontWeight: '700',
            margin: 0,
            letterSpacing: '0.05em',
          }}
        >
          職務経歴書
        </h1>
      </div>

      {/* 作成日・氏名 */}
      <div style={{ textAlign: 'right', marginBottom: '20px', fontSize: '12px' }}>
        <div>{formatDate(data.createdDate)}</div>
        <div style={{ fontSize: '15px', fontWeight: '500', marginTop: '3px' }}>
          {data.fullName || '　'}
        </div>
      </div>

      {/* 職務要約 */}
      {data.summary && (
        <section style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: '700',
              borderBottom: '1.5px solid #1c1c1c',
              paddingBottom: '4px',
              marginBottom: '10px',
              marginTop: 0,
            }}
          >
            職務要約
          </h2>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '12.5px' }}>
            {data.summary}
          </p>
        </section>
      )}

      {/* 職務経歴 */}
      {data.workHistories.some((w) => w.companyName) && (
        <section style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: '700',
              borderBottom: '1.5px solid #1c1c1c',
              paddingBottom: '4px',
              marginBottom: '10px',
              marginTop: 0,
            }}
          >
            職務経歴
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.workHistories
              .filter((w) => w.companyName)
              .map((work) => (
                <div key={work.id}>
                  {/* 法人名ヘッダー */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#e8e8e8',
                      padding: '5px 10px',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ fontWeight: '700', fontSize: '13px' }}>
                      {work.companyName}
                    </span>
                    <span style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                      {formatPeriod(
                        work.startYear,
                        work.startMonth,
                        work.endYear,
                        work.endMonth,
                        work.isCurrent
                      )}
                    </span>
                  </div>

                  {/* 勤務形態 */}
                  {work.employmentType && (
                    <div style={{ marginBottom: '5px', fontSize: '12.5px' }}>
                      <strong>勤務形態：</strong>
                      {work.employmentType}
                    </div>
                  )}

                  {/* 業務内容 */}
                  {work.jobDescription && (
                    <div>
                      <div
                        style={{
                          fontWeight: '700',
                          fontSize: '12.5px',
                          marginBottom: '3px',
                        }}
                      >
                        業務内容
                      </div>
                      <div
                        style={{
                          whiteSpace: 'pre-wrap',
                          fontSize: '12.5px',
                        }}
                      >
                        {work.jobDescription}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </section>
      )}

      {/* 免許・資格 */}
      {data.qualifications.some((q) => q.name) && (
        <section style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: '700',
              borderBottom: '1.5px solid #1c1c1c',
              paddingBottom: '4px',
              marginBottom: '10px',
              marginTop: 0,
            }}
          >
            免許・資格
          </h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: '12.5px' }}>
            {data.qualifications
              .filter((q) => q.name)
              .map((qual) => (
                <li key={qual.id} style={{ marginBottom: '4px' }}>
                  ・{qual.year && qual.month ? `${qual.year}年${qual.month}月` : ''}{' '}
                  {qual.name} 取得
                </li>
              ))}
          </ul>
        </section>
      )}

      {/* スキル・得意分野 */}
      {data.skills && (
        <section style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: '700',
              borderBottom: '1.5px solid #1c1c1c',
              paddingBottom: '4px',
              marginBottom: '10px',
              marginTop: 0,
            }}
          >
            スキル・得意分野
          </h2>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '12.5px' }}>
            {data.skills}
          </p>
        </section>
      )}

      {/* 自己PR */}
      {data.selfPR && (
        <section style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: '700',
              borderBottom: '1.5px solid #1c1c1c',
              paddingBottom: '4px',
              marginBottom: '10px',
              marginTop: 0,
            }}
          >
            自己PR
          </h2>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '12.5px' }}>
            {data.selfPR}
          </p>
        </section>
      )}
    </div>
  );
}
