# alwaysumeiswaiting

タトゥーアーティスト・ペインター・美容師 TAI のポートフォリオ兼ECサイト。

## 技術スタック

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Stripe (決済)

---

## セットアップ

```bash
npm install
# .env.local を編集して環境変数を設定
npm run dev
```

---

## 環境変数の設定

`.env.local` を編集し、以下を設定してください。

### Stripe キー

[Stripeダッシュボード](https://dashboard.stripe.com/apikeys) から取得:

```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

### Stripe Price IDの作成

1. Stripeダッシュボード → 商品カタログ → 商品を追加
2. 商品名・価格を設定して保存
3. 生成された `price_xxx` をコピーして `.env.local` に設定

| 変数名 | 用途 |
|--------|------|
| `NEXT_PUBLIC_STRIPE_FLASH_01_PRICE_ID` | フラッシュ01の予約金 |
| `NEXT_PUBLIC_STRIPE_FLASH_02_PRICE_ID` | フラッシュ02の予約金 |
| `NEXT_PUBLIC_STRIPE_FLASH_03_PRICE_ID` | フラッシュ03の予約金 |
| `NEXT_PUBLIC_STRIPE_FLASH_04_PRICE_ID` | フラッシュ04の予約金 |
| `NEXT_PUBLIC_STRIPE_FLASH_05_PRICE_ID` | フラッシュ05の予約金 |
| `NEXT_PUBLIC_STRIPE_FLASH_06_PRICE_ID` | フラッシュ06の予約金 |
| `NEXT_PUBLIC_STRIPE_SHOP_01_PRICE_ID` | ショップ商品01 |
| `NEXT_PUBLIC_STRIPE_SHOP_02_PRICE_ID` | ショップ商品02 |
| `NEXT_PUBLIC_STRIPE_SHOP_03_PRICE_ID` | ショップ商品03 |
| `NEXT_PUBLIC_STRIPE_SHOP_04_PRICE_ID` | ショップ商品04 |
| `STRIPE_BOOKING_DEPOSIT_PRICE_ID` | タトゥー予約金（5,000円固定） |

---

## 画像の差し替え手順

すべての画像は `/public/images/` 以下に配置します。  
**同じファイル名で上書き保存するだけで自動的に反映されます。**

### ディレクトリ構造

```
public/
└── images/
    ├── og.jpg                    # OGP画像 (1200×630px)
    ├── works/
    │   ├── tattoo/
    │   │   ├── tattoo-01.jpg     # タトゥー作品01
    │   │   ├── tattoo-02.jpg
    │   │   ├── tattoo-03.jpg
    │   │   ├── tattoo-04.jpg
    │   │   └── tattoo-05.jpg
    │   ├── painting/
    │   │   ├── painting-01.jpg   # ペインティング作品01
    │   │   ├── painting-02.jpg
    │   │   ├── painting-03.jpg
    │   │   └── painting-04.jpg
    │   └── flash/
    │       ├── flash-01.jpg      # フラッシュデザイン01
    │       ├── flash-02.jpg
    │       ├── flash-03.jpg
    │       ├── flash-04.jpg
    │       ├── flash-05.jpg
    │       └── flash-06.jpg
    └── shop/
        ├── shop-01.jpg           # ショップ商品01（原画）
        ├── shop-02.jpg
        ├── shop-03.jpg           # ショップ商品03（プリント）
        └── shop-04.jpg
```

### 推奨サイズ

| 種類 | 比率 | 最低解像度 |
|------|------|------------|
| 作品画像 (works/flash) | 1:1 (正方形) | 1000×1000px |
| ショップ画像 | 4:5 (縦長) | 1000×1250px |
| OGP画像 | 1.91:1 | 1200×630px |

フォーマット: JPEG または WebP 推奨

---

## 作品・商品の追加・変更

各ページのデータは以下のファイル内の配列で管理しています:

| ページ | ファイル | 配列名 |
|--------|----------|--------|
| トップ（注目作品） | `app/page.tsx` | `featuredWorks` |
| WORKS全作品 | `app/works/page.tsx` | `works` |
| FLASH | `app/flash/page.tsx` | `flashItems` |
| SHOP | `app/shop/page.tsx` | `shopItems` |

---

## Vercelへのデプロイ

1. GitHubにプッシュ
2. [vercel.com](https://vercel.com) でリポジトリをインポート
3. Vercelの「Environment Variables」設定画面に `.env.local` の内容をコピー
4. デプロイ実行

---

## ページ構成

| URL | 内容 |
|-----|------|
| `/` | トップ（ヒーロー + 作品グリッド） |
| `/works` | 全作品一覧（フィルター付き） |
| `/flash` | フラッシュ販売・予約 |
| `/shop` | アート原画・プリント販売 |
| `/about` | アーティストステートメント |
| `/booking` | タトゥー予約案内 |

---

## 第二の脳 MCP サーバー

Claudeのチャット（カスタムコネクタ）から呼べる個人用メモ・タスク管理サーバー。  
MCPエンドポイント: `https://<your-domain>.vercel.app/api/mcp`
（Pages Router `/pages/api/mcp/index.ts` として実装）

### 使えるMCPツール一覧

| ツール | 用途 |
|--------|------|
| `add_memo` | メモを保存＋関連候補を返す |
| `link_memos` | メモ同士をリンク |
| `search_memos` | キーワード検索（日本語可） |
| `get_memo` | IDで1件取得（リンク情報含む） |
| `list_memos` | 一覧取得（kind/area/statusでフィルタ） |
| `list_related` | リンク済み＋候補関連を表示 |
| `update_memo` | フィールド更新 |
| `complete_task` | タスクを完了にする |
| `list_tasks` | 優先度・期限順のタスク一覧 |
| `export_all` | 全データをJSON/Markdownで書き出す |

---

### セットアップ手順

#### ① GitHub にプッシュ

このリポジトリを GitHub にプッシュしてください（Vercel が自動デプロイするために必要）。

```bash
git add -A
git commit -m "add second-brain MCP server"
git push origin main
```

---

#### ② Neon（無料Postgres）のセットアップ

1. [neon.tech](https://neon.tech) でアカウント作成（GitHub ログイン可）
2. 「Create Project」→ プロジェクト名を入力して作成
3. ダッシュボードの **Connection Details** → **Connection string** をコピー

   形式: `postgresql://username:password@xxx.neon.tech/neondb?sslmode=require`

4. **SQL Editor** を開き、`migrations/001_init.sql` の内容を貼り付けて「Run」

   → `memos` テーブルと `links` テーブルが作成されます

---

#### ③ 環境変数を準備

シークレットトークンを生成（ターミナルで実行）:

```bash
openssl rand -hex 32
```

出力された値をメモしておく（後で使用）。

---

#### ④ Vercel にデプロイ

1. [vercel.com](https://vercel.com) にログイン → 「Add New → Project」
2. GitHub リポジトリを選択して「Import」
3. **Environment Variables** に以下を追加:

   | 変数名 | 値 |
   |--------|----|
   | `DATABASE_URL` | Neon の接続文字列 |
   | `MCP_SECRET_TOKEN` | 生成したシークレットトークン |

4. 「Deploy」をクリック

デプロイ完了後、Vercel のプロジェクトページに表示される URL を確認。

---

#### ⑤ MCP エンドポイント URL

```
https://<your-vercel-domain>.vercel.app/api/mcp
```

（例: `https://alwaysumeiswaiting.vercel.app/api/mcp`）

---

#### ⑥ Claude アプリにカスタム MCP コネクタとして追加

**Claude.ai デスクトップアプリ（macOS/Windows）の場合:**

1. Claude アプリを開く
2. 左サイドバーまたはメニューから **Settings（設定）** を開く
3. **Developer（開発者）** タブ → **Model Context Protocol** セクション
4. 「**Add MCP Server**」をクリック
5. 以下を入力:
   - **Name**: `second-brain`（任意）
   - **URL**: `https://<your-vercel-domain>.vercel.app/api/mcp`
   - **Authentication**: Bearer Token
   - **Token**: `MCP_SECRET_TOKEN` に設定した値
6. 「Save」で保存

**接続確認:**  
チャットで「`list_memos` を呼んで」と話しかけ、ツールが使えれば成功。

---

### データモデル

```
memos
  id          UUID (PK)
  content     TEXT          メモ本文
  kind        memo | task | asset | decision
  area        TEXT          creative / practice / investing / other など
  priority    P0 | P1 | P2
  status      open | done   (task のみ使用)
  due_date    DATE
  created_at / updated_at

links
  from_id → to_id  (UUID FK → memos)
  reason   TEXT    なぜ関連するか
```

### 検索の仕組み

`pg_trgm` 拡張の三角グラム類似度（`similarity()`）と `ILIKE` の組み合わせで日本語テキストを検索します。ベクトル埋め込みは使わないため、追加コストは一切かかりません。
