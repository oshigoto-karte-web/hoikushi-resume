# GitHub Pages デプロイ手順

このドキュメントでは、保育士 職務経歴書作成ツールを GitHub Pages に公開する手順を説明します。

---

## 前提条件

- GitHub アカウントを持っていること
- Git がローカルにインストールされていること（または GitHub Desktop を使用）

---

## 手順

### 1. GitHub にリポジトリを作成する

1. [github.com](https://github.com) にログインする
2. 右上の「+」→「New repository」をクリック
3. 以下の設定でリポジトリを作成する
   - **Repository name**: `hoiku-resume`（任意の名前でOK）
   - **Visibility**: `Public`（GitHub Pages の無料利用には Public が必要）
   - **Initialize this repository**: チェックしない（空のリポジトリを作成）
4. 「Create repository」をクリック

---

### 2. コードを GitHub にプッシュする

作成したリポジトリのページに表示されるコマンドを参考に、以下を実行します。

```bash
# プロジェクトのルートディレクトリで実行
cd hoiku-resume

# リモートリポジトリを追加（YOUR_USERNAME と REPO_NAME を置き換えてください）
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# main ブランチにプッシュ
git add .
git commit -m "initial commit"
git push -u origin main
```

> **注意**: このプロジェクトはすでに `git init` 済みです。`git remote add` から始めてください。

---

### 3. GitHub Pages の設定を有効にする

1. リポジトリページの「**Settings**」タブをクリック
2. 左サイドバーの「**Pages**」をクリック
3. **Source** を「**GitHub Actions**」に変更する
4. 保存する

---

### 4. 自動デプロイを確認する

- `main` ブランチへの push が完了すると、GitHub Actions が自動的にビルドとデプロイを実行します
- リポジトリの「**Actions**」タブでデプロイの進捗を確認できます（通常 2〜3 分）
- デプロイ完了後、以下の URL でアクセスできます

```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

---

## 以降の更新方法

コードを修正したら、以下のコマンドだけで自動的に再デプロイされます。

```bash
git add .
git commit -m "変更内容の説明"
git push origin main
```

---

## トラブルシューティング

| 症状 | 原因 | 対処法 |
|---|---|---|
| ページが真っ白 | ベースパスの不一致 | リポジトリ名と `VITE_BASE_PATH` を確認 |
| Actions が失敗する | 依存関係エラー | Actions タブのログを確認 |
| 404 エラーが出る | Pages の設定が未完了 | Settings → Pages → Source を「GitHub Actions」に設定 |

---

## 仕組み（技術的な補足）

- **ワークフローファイル**: `.github/workflows/deploy.yml`
- **ビルドコマンド**: `pnpm build:pages`（フロントエンドのみビルド、サーバー不要）
- **ベースパス**: `VITE_BASE_PATH` 環境変数でリポジトリ名を自動設定
- **出力先**: `dist/public/` → GitHub Pages にアップロード

---

## 注意事項

- `localStorage` のデータはブラウザごとに独立しています
- スマートフォンとPCで同じデータを使いたい場合は、それぞれのブラウザで入力が必要です
