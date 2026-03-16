// 職務経歴書 PDF ドキュメント定義
// @react-pdf/renderer を使用 - html2canvasを使わないためスマホ（Safari/iOS）でも動作する
// フォント: Noto Sans JP を CDN から読み込む

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { ResumeData } from './types';

// Noto Sans JP フォント登録（CDN - TTF形式）
Font.register({
  family: 'NotoSansJP',
  fonts: [
    {
      src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663439570821/Dh7aim3HHuPLuGg67bsy3j/NotoSansJP-Regular_e1e35890.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663439570821/Dh7aim3HHuPLuGg67bsy3j/NotoSansJP-Bold_2b3d8346.ttf',
      fontWeight: 700,
    },
  ],
});

// ハイフネーション無効化
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    fontFamily: 'NotoSansJP',
    fontSize: 10,
    lineHeight: 1.6,
    color: '#1c1c1c',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 45,
    paddingRight: 45,
    backgroundColor: '#ffffff',
  },
  // タイトル
  titleRow: {
    borderBottomWidth: 2,
    borderBottomColor: '#1c1c1c',
    borderBottomStyle: 'solid',
    paddingBottom: 6,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 1,
  },
  // 作成日・氏名
  headerRight: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 9,
    color: '#444',
  },
  nameText: {
    fontSize: 12,
    fontWeight: 700,
    marginTop: 2,
  },
  // セクション
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    borderBottomWidth: 1.5,
    borderBottomColor: '#1c1c1c',
    borderBottomStyle: 'solid',
    paddingBottom: 3,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 9.5,
    lineHeight: 1.65,
  },
  // 職歴ブロック
  workBlock: {
    marginBottom: 12,
  },
  workHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    padding: '4 8',
    marginBottom: 6,
  },
  workCompany: {
    fontSize: 10,
    fontWeight: 700,
  },
  workPeriod: {
    fontSize: 9,
    color: '#444',
  },
  workDetail: {
    fontSize: 9.5,
    marginBottom: 3,
  },
  workLabel: {
    fontWeight: 700,
  },
  // 資格リスト
  qualItem: {
    fontSize: 9.5,
    marginBottom: 3,
  },
});

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
  const start = startYear && startMonth ? `${startYear}年${startMonth}月` : '';
  const end = isCurrent
    ? '現在'
    : endYear && endMonth
    ? `${endYear}年${endMonth}月`
    : '';
  if (!start && !end) return '';
  return `${start}〜${end}`;
}

interface Props {
  data: ResumeData;
}

export function ResumePdfDocument({ data }: Props) {
  const hasWork = data.workHistories.some((w) => w.companyName);
  const hasQual = data.qualifications.some((q) => q.name);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* タイトル */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>職務経歴書</Text>
        </View>

        {/* 作成日・氏名 */}
        <View style={styles.headerRight}>
          <Text style={styles.dateText}>{formatDate(data.createdDate)}</Text>
          <Text style={styles.nameText}>{data.fullName || ''}</Text>
        </View>

        {/* 職務要約 */}
        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>職務要約</Text>
            <Text style={styles.bodyText}>{data.summary}</Text>
          </View>
        ) : null}

        {/* 職務経歴 */}
        {hasWork ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>職務経歴</Text>
            {data.workHistories
              .filter((w) => w.companyName)
              .map((work) => (
                <View key={work.id} style={styles.workBlock}>
                  <View style={styles.workHeader}>
                    <Text style={styles.workCompany}>{work.companyName}</Text>
                    <Text style={styles.workPeriod}>
                      {formatPeriod(
                        work.startYear,
                        work.startMonth,
                        work.endYear,
                        work.endMonth,
                        work.isCurrent
                      )}
                    </Text>
                  </View>
                  {work.employmentType ? (
                    <Text style={styles.workDetail}>
                      <Text style={styles.workLabel}>勤務形態：</Text>
                      {work.employmentType}
                    </Text>
                  ) : null}
                  {work.jobDescription ? (
                    <View>
                      <Text style={[styles.workDetail, styles.workLabel]}>業務内容</Text>
                      <Text style={styles.workDetail}>{work.jobDescription}</Text>
                    </View>
                  ) : null}
                </View>
              ))}
          </View>
        ) : null}

        {/* 免許・資格 */}
        {hasQual ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>免許・資格</Text>
            {data.qualifications
              .filter((q) => q.name)
              .map((qual) => (
                <Text key={qual.id} style={styles.qualItem}>
                  ・{qual.year && qual.month ? `${qual.year}年${qual.month}月　` : ''}
                  {qual.name}　取得
                </Text>
              ))}
          </View>
        ) : null}

        {/* スキル・得意分野 */}
        {data.skills ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>スキル・得意分野</Text>
            <Text style={styles.bodyText}>{data.skills}</Text>
          </View>
        ) : null}

        {/* 自己PR */}
        {data.selfPR ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>自己PR</Text>
            <Text style={styles.bodyText}>{data.selfPR}</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
