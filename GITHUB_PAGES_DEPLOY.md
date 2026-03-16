# GitHub Pages デプロイ手順

このドキュメントでは、保育士職務経歴書作成ツールをGitHub Pagesに公開する手順を説明します。

## 前提条件
- GitHubアカウントを持っていること
- Gitがローカルにインストールされていること

---

## 手順1: リポジトリを作成する

1. [GitHub](https://github.com) にログインする
2. 右上の「+」→「New repository」をクリック
3. 以下のように設定する
   - Repository name: `hoiku-resume`（任意の名前でOK）
   - Visibility: **Public**（GitHub Pagesを無料で使うため）
   - 「Initialize this repository with a README」は**チェックしない**
4. 「Create repository」をクリック

---

## 手順2: vite.config.ts の base を設定する

GitHub Pagesでは、サイトが `https://ユーザー名.github.io/リポジトリ名/` に公開されます。
そのため、`vite.config.ts` の `base` を設定する必要があります。

```ts
// vite.config.ts の build セクションに追加
build: {
  base: '/hoiku-resume/',  // ← リポジトリ名に合わせて変更
  outDir: ...,
}
```

または、環境変数で制御する場合：
```ts
base: process.env.GITHUB_PAGES ? '/hoiku-resume/' : '/',
```

---

## 手順3: GitHub Actionsワークフローを設定する

リポジトリに `.github/workflows/deploy.yml` を作成すると、
`main` ブランチへのpushで自動的にビルド＆デプロイが実行されます。

このリポジトリには既に `.github/workflows/deploy.yml` が含まれています。

---

## 手順4: リポジトリにコードをプッシュする

```bash
# プロジェクトディレクトリに移動
cd hoiku-resume

# Gitを初期化（未初期化の場合）
git init
git add .
git commit -m "initial commit"

# GitHubリポジトリと接続
git remote add origin https://github.com/あなたのユーザー名/hoiku-resume.git
git branch -M main
git push -u origin main
```

---

## 手順5: GitHub Pagesを有効にする

1. GitHubのリポジトリページを開く
2. 「Settings」→「Pages」を開く
3. 「Source」を **「GitHub Actions」** に設定する
4. 保存する

---

## 手順6: デプロイ完了を確認する

1. 「Actions」タブでワークフローの実行状況を確認する
2. 成功すると `https://あなたのユーザー名.github.io/hoiku-resume/` でアクセスできる

---

## ローカルでのビルド確認

```bash
pnpm build
pnpm preview
```

---

## 注意事項

- `localStorage` のデータはブラウザごとに独立しています
- スマートフォンとPCで同じデータを使いたい場合は、それぞれのブラウザで入力が必要です
- データのエクスポート/インポート機能は現バージョンでは未実装です
