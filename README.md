# 腸内タイプ本格診断アプリ

くるみ｜腸からやせる研究所 専用  
本格 腸内タイプ診断アプリ（30問・8分）

## 診断できるタイプ

| タイプ | 特徴 |
|--------|------|
| 膨らみ型 | 食後にお腹が張る・ガスが多い |
| ためこみ型 | 便秘・排便困難が続く |
| 敏感型 | ストレスでお腹が過敏になる |
| 気まぐれ型 | 便秘と下痢を繰り返す |

## Vercelへのデプロイ手順

### 1. GitHubリポジトリを作成

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/chokatsu-pro-shindan.git
git push -u origin main
```

### 2. Vercelにデプロイ

1. https://vercel.com にアクセス
2. 「Add New Project」→ GitHubリポジトリを選択
3. フレームワークは「Next.js」を選択（自動検出されます）
4. 「Deploy」をクリック

### 3. URLを設定（デプロイ後）

`app/page.tsx` の先頭にあるURLを実際のURLに書き換えてください：

```typescript
const LINE_URL = 'https://lin.ee/XXXXXXX'  // ← あなたのLINE公式アカウントURL
const NOTE_URL = 'https://note.com/XXXXXXX'  // ← あなたのnoteのURL
```

## ローカルで確認する場合

```bash
npm install
npm run dev
```

→ http://localhost:3000 で確認できます

## 診断の設計

- Rome IV基準をベースに設計
- 30問（排便パターン・お腹の症状・食事との関係・ストレス・生活習慣・現在の状況）
- 4タイプ × 重症度（軽度/中度/重度）の組み合わせで判定
- サブタイプ判定あり（2番目に近いタイプも表示）

## 結果ページの内容

- タイプ判定（メイン＋サブ）
- 重症度インジケーター
- タイプの詳しい説明・メカニズム
- 主な症状チェックリスト
- 今すぐできる改善3ステップ
- 食品ガイド（食べたいもの・控えるもの）
- LINE PDF受け取りCTA
- note購入CTA
