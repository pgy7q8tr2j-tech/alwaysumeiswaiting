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
