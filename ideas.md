# 保育士 職務経歴書作成ツール デザインアイデア

## ツールの性格
- 転職活動中の保育士が使う「実務ツール」
- 信頼感・清潔感が最優先
- スマートフォン縦画面での操作が主体
- 完成物（PDF）がテンプレートに忠実であることが重要

---

<response>
<probability>0.07</probability>
<text>
## アイデア A：「和紙と墨」ミニマル和風

**Design Movement**: Japanese Minimalism × Functional Brutalism

**Core Principles**:
1. 余白を「間（ま）」として積極的に活用する
2. 装飾を排除し、構造そのものを美しく見せる
3. タイポグラフィの強弱だけで階層を表現する
4. 書類としての「格式」を視覚的に表現する

**Color Philosophy**:
- 背景：生成り（#F8F5EE）— 和紙の温かみ
- テキスト：墨色（#1C1C1C）— 力強い黒
- アクセント：藍色（#2B4C7E）— 信頼と誠実さ
- ボーダー：薄墨（#D4CEBF）— 繊細な区切り

**Layout Paradigm**:
- 縦スクロール1カラム、左端揃えの非対称レイアウト
- セクションタイトルは左端に縦線（border-left）で強調
- フォームとプレビューをタブで切り替え

**Signature Elements**:
1. セクションヘッダーに細い水平線（1px、藍色）
2. 入力フィールドはアンダーライン型（枠なし）
3. 「職歴追加」ボタンは＋アイコンのみのミニマルデザイン

**Interaction Philosophy**:
- フォーカス時に藍色のアンダーラインがスライドイン
- セクション展開はアコーディオン（静かなeaseアニメーション）

**Animation**:
- transition: 200ms ease-in-out
- 入力フォーカス時のアンダーライン拡張
- セクション追加時のフェードイン（opacity 0→1, translateY 8px→0）

**Typography System**:
- 見出し：Noto Serif JP（400/700）
- 本文・入力：Noto Sans JP（400/500）
- 数字・日付：Tabular nums
</text>
</response>

<response>
<probability>0.06</probability>
<text>
## アイデア B：「クリーンフォーム」業務系モダン

**Design Movement**: Swiss Grid × Material Design Lite

**Core Principles**:
1. 情報の優先度を色の濃淡で表現する
2. タッチターゲットを最大化（最小44px）
3. セクションごとにカード化して視認性を高める
4. 進捗の可視化でユーザーを迷わせない

**Color Philosophy**:
- 背景：ライトグレー（#F4F6F8）— 清潔感
- カード：ホワイト（#FFFFFF）— 情報の器
- プライマリ：テール（#0D7377）— 保育・自然・安心
- アクセント：コーラル（#E8735A）— アクション喚起

**Layout Paradigm**:
- ステップ形式（ステップバーで現在位置を表示）
- 各ステップが1画面に収まるよう設計
- 最後のステップでプレビュー＋PDF出力

**Signature Elements**:
1. 上部にステップインジケーター（1〜5のドット）
2. カードに薄いドロップシャドウ（shadow-sm）
3. 「次へ」ボタンは画面下部に固定（Sticky Footer）

**Interaction Philosophy**:
- ステップ遷移はスライドアニメーション（左右）
- バリデーションエラーはインライン表示（赤ボーダー）

**Animation**:
- ステップ切り替え：translateX(-100%→0)、300ms ease
- エラー表示：shake 200ms

**Typography System**:
- 見出し：Noto Sans JP Bold（700）
- 本文：Noto Sans JP Regular（400）
- ラベル：Noto Sans JP Medium（500）、12px、大文字
</text>
</response>

<response>
<probability>0.05</probability>
<text>
## アイデア C：「温かみのある手帳」ライフログ系

**Design Movement**: Warm Notebook × Analog Digital Hybrid

**Core Principles**:
1. 手書きのノートのような温かみをデジタルで表現
2. 入力の「重さ」を感じさせない軽快なUX
3. 完成したときの達成感を演出する
4. 保育士らしい柔らかさと専門性の両立

**Color Philosophy**:
- 背景：クリーム（#FFFBF2）— 手帳の紙
- プライマリ：テラコッタ（#C4704F）— 温もり
- セカンダリ：セージグリーン（#7A9E7E）— 保育・自然
- ボーダー：ベージュ（#E8DCC8）

**Layout Paradigm**:
- 縦スクロール1カラム
- セクションタイトルに手書き風の下線（SVGの波線）
- 職歴カードはノートの「ページ」のように見せる

**Signature Elements**:
1. セクションタイトルに小さなリーフアイコン（保育らしさ）
2. 入力フィールドに薄いドット罫線背景
3. PDF出力ボタンは「完成！」のような達成感ある表現

**Interaction Philosophy**:
- 入力完了したセクションにチェックマークが付く
- 全セクション完了でPDFボタンが光る

**Animation**:
- セクション完了時：チェックマークのdrawアニメーション
- PDF出力時：紙が飛び出すようなアニメーション

**Typography System**:
- 見出し：Zen Maru Gothic（700）— 丸みのある親しみやすさ
- 本文：Noto Sans JP（400）
</text>
</response>

---

## 採用：アイデア B「クリーンフォーム」業務系モダン

### 採用理由
- 保育士が転職活動で使う「実務ツール」として、信頼感・清潔感が最優先
- ステップ形式はスマートフォンでの操作性が最も高い
- テール（緑系）は保育・自然・安心のイメージに合致
- 進捗の可視化により、入力漏れや迷子を防げる

### 確定デザイントークン
- フォント：Noto Sans JP（Google Fonts）
- Primary：#0D7377（テール）
- Background：#F4F6F8（ライトグレー）
- Card：#FFFFFF
- Accent：#E8735A（コーラル）
- Border-radius：8px（カード）、4px（入力）
- Shadow：0 1px 3px rgba(0,0,0,0.08)
