// 職務経歴書プレビュー（PDFレイアウト再現）
// Design: テンプレートに忠実なA4レイアウト
// テンプレート参照: 職務経歴書_2026_03_05_1772704335134.pdf

import { ResumeData } from '@/lib/types';

interface ResumePreviewProps {
  data: ResumeData;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
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
        width: '210mm',
        minHeight: '297mm',
        padding: '15mm 18mm',
        backgroundColor: '#ffffff',
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: '10pt',
        lineHeight: '1.6',
        color: '#1c1c1c',
        boxSizing: 'border-box',
      }}
    >
      {/* タイトル */}
      <div
        style={{
          borderBottom: '2.5px solid #1c1c1c',
          paddingBottom: '6px',
          marginBottom: '10px',
        }}
      >
        <h1
          style={{
            fontSize: '20pt',
            fontWeight: '700',
            margin: 0,
            letterSpacing: '0.05em',
          }}
        >
          職務経歴書
        </h1>
      </div>

      {/* 作成日・氏名 */}
      <div style={{ textAlign: 'right', marginBottom: '16px', fontSize: '9pt' }}>
        <div>{formatDate(data.createdDate)}</div>
        <div style={{ fontSize: '11pt', fontWeight: '500', marginTop: '2px' }}>
          {data.fullName || '　'}
        </div>
      </div>

      {/* 職務要約 */}
      {data.summary && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '11pt',
              fontWeight: '700',
              borderBottom: '1.5px solid #1c1c1c',
              paddingBottom: '3px',
              marginBottom: '8px',
            }}
          >
            職務要約
          </h2>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '9.5pt' }}>
            {data.summary}
          </p>
        </section>
      )}

      {/* 職務経歴 */}
      {data.workHistories.some((w) => w.companyName) && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '11pt',
              fontWeight: '700',
              borderBottom: '1.5px solid #1c1c1c',
              paddingBottom: '3px',
              marginBottom: '8px',
            }}
          >
            職務経歴
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                      padding: '4px 8px',
                      marginBottom: '6px',
                    }}
                  >
                    <span style={{ fontWeight: '700', fontSize: '10pt' }}>
                      {work.companyName}
                    </span>
                    <span style={{ fontSize: '9pt', whiteSpace: 'nowrap' }}>
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
                    <div style={{ marginBottom: '4px', fontSize: '9.5pt' }}>
                      <strong>勤務形態：</strong>
                      {work.employmentType}
                    </div>
                  )}

                  {/* 業務内容 */}
                  {work.jobDescription && (
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '9.5pt', marginBottom: '2px' }}>
                        業務内容
                      </div>
                      <div
                        style={{
                          whiteSpace: 'pre-wrap',
                          fontSize: '9.5pt',
                          paddingLeft: '0',
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
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '11pt',
              fontWeight: '700',
              borderBottom: '1.5px solid #1c1c1c',
              paddingBottom: '3px',
              marginBottom: '8px',
            }}
          >
            免許・資格
          </h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, fontSize: '9.5pt' }}>
            {data.qualifications
              .filter((q) => q.name)
              .map((qual) => (
                <li key={qual.id} style={{ marginBottom: '3px' }}>
                  ・{qual.year && qual.month ? `${qual.year}年${qual.month}月` : ''}{' '}
                  {qual.name} 取得
                </li>
              ))}
          </ul>
        </section>
      )}

      {/* スキル・得意分野 */}
      {data.skills && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '11pt',
              fontWeight: '700',
              borderBottom: '1.5px solid #1c1c1c',
              paddingBottom: '3px',
              marginBottom: '8px',
            }}
          >
            スキル・得意分野
          </h2>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '9.5pt' }}>
            {data.skills}
          </p>
        </section>
      )}

      {/* 自己PR */}
      {data.selfPR && (
        <section style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: '11pt',
              fontWeight: '700',
              borderBottom: '1.5px solid #1c1c1c',
              paddingBottom: '3px',
              marginBottom: '8px',
            }}
          >
            自己PR
          </h2>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '9.5pt' }}>
            {data.selfPR}
          </p>
        </section>
      )}
    </div>
  );
}
