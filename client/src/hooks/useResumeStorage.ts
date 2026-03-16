// localStorage 自動保存・復元フック
// Design: クリーンフォーム業務系モダン

import { useState, useEffect, useCallback } from 'react';
import {
  ResumeData,
  STORAGE_KEY,
  createInitialResumeData,
} from '@/lib/types';

export function useResumeStorage() {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as ResumeData;
      }
    } catch {
      // ignore parse errors
    }
    return createInitialResumeData();
  });

  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // データが変わるたびに自動保存
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setLastSaved(new Date());
    } catch {
      // ignore storage errors
    }
  }, [data]);

  const updateData = useCallback((updates: Partial<ResumeData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetData = useCallback(() => {
    const fresh = createInitialResumeData();
    setData(fresh);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { data, updateData, resetData, lastSaved };
}
