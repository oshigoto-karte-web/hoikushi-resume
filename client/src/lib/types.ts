// 職務経歴書データ型定義
// Design: クリーンフォーム業務系モダン

export interface WorkHistory {
  id: string;
  companyName: string;       // 法人名
  startYear: string;         // 在職開始年
  startMonth: string;        // 在職開始月
  endYear: string;           // 在職終了年（「現在」の場合は空）
  endMonth: string;          // 在職終了月（「現在」の場合は空）
  isCurrent: boolean;        // 現在も在職中か
  employmentType: string;    // 勤務形態
  jobDescription: string;    // 業務内容（施設名・担当クラスなど自由記述）
}

export interface Qualification {
  id: string;
  year: string;              // 取得年
  month: string;             // 取得月
  name: string;              // 資格名
}

export interface ResumeData {
  createdDate: string;       // 作成日（YYYY-MM-DD）
  fullName: string;          // 氏名
  summary: string;           // 職務要約
  workHistories: WorkHistory[];
  qualifications: Qualification[];
  skills: string;            // スキル・得意分野
  selfPR: string;            // 自己PR
}

export const EMPLOYMENT_TYPES = [
  '正社員',
  '契約社員',
  'パート・アルバイト',
  '派遣社員',
  '業務委託',
  'その他',
] as const;

export const COMMON_QUALIFICATIONS = [
  '保育士資格',
  '幼稚園教諭一種免許状',
  '幼稚園教諭二種免許状',
  '社会福祉士',
  '介護福祉士',
  '認定こども園教諭',
  '普通自動車運転免許',
] as const;

export const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1));

export const YEARS = Array.from({ length: 50 }, (_, i) =>
  String(new Date().getFullYear() - i)
);

export const STEPS = [
  { id: 1, label: '基本情報' },
  { id: 2, label: '職務要約' },
  { id: 3, label: '職務経歴' },
  { id: 4, label: '資格・スキル' },
  { id: 5, label: '確認・出力' },
] as const;

export const STORAGE_KEY = 'hoiku_resume_data';

export function createEmptyWorkHistory(): WorkHistory {
  return {
    id: crypto.randomUUID(),
    companyName: '',
    startYear: '',
    startMonth: '',
    endYear: '',
    endMonth: '',
    isCurrent: false,
    employmentType: '',
    jobDescription: '',
  };
}

export function createEmptyQualification(): Qualification {
  return {
    id: crypto.randomUUID(),
    year: '',
    month: '',
    name: '',
  };
}

export function createInitialResumeData(): ResumeData {
  const today = new Date();
  return {
    createdDate: today.toISOString().split('T')[0],
    fullName: '',
    summary: '',
    workHistories: [createEmptyWorkHistory()],
    qualifications: [createEmptyQualification()],
    skills: '',
    selfPR: '',
  };
}
