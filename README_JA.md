# AI API Gateway

AI API Gateway は、上流 AI アカウント、API キー、リクエストルーティング、利用量計測、任意の決済フローを管理するためのセルフホスト型プラットフォームです。

このプロジェクトには Go バックエンド、Vue ベースの管理 UI、Docker デプロイ設定、ローカルまたはサーバー環境向けの設定例が含まれています。

## 主な機能

- 複数の上流アカウント管理
- ユーザー API キーの作成と管理
- トークン単位の利用量記録
- グループ単位のルーティング、同時実行数、レート制限
- 任意の決済・チャージ機能
- アカウント、ユーザー、グループ、利用状況、設定を管理するダッシュボード
- PostgreSQL と Redis を含む Docker Compose デプロイ

## 技術スタック

| 項目 | 技術 |
|------|------|
| バックエンド | Go, Gin, Ent |
| フロントエンド | Vue 3, Vite, Tailwind CSS |
| データベース | PostgreSQL |
| キャッシュ | Redis |
| デプロイ | Docker, Docker Compose |

## 開発

バックエンド:

```bash
cd backend
go run ./cmd/server
```

フロントエンド:

```bash
cd frontend
pnpm install
pnpm run dev
```

バックエンドテスト:

```bash
cd backend
go test ./...
```

フロントエンドチェック:

```bash
cd frontend
pnpm run typecheck
pnpm run test:run
```

## デプロイ

```bash
cd deploy
cp .env.example .env
docker compose up -d
```

本番環境では、`.env` 内のパスワード、JWT シークレット、暗号化キーを必ず強い値に変更してください。

## セキュリティ

- 本番環境では HTTPS を使用してください。
- シークレットは環境変数または非公開設定ファイルで管理してください。
- 上流プロバイダーの利用規約を確認してください。
- 可能な限り外向き通信を制限してください。
- 信頼できるプロキシ設定は慎重に行ってください。

## ライセンス

ライセンス条件は [LICENSE](LICENSE) を参照してください。
