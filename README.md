# AI API Gateway

AI API Gateway is a self-hosted platform for managing upstream AI accounts, API keys, request routing, usage tracking, and optional payment flows.

The project includes a Go backend, a Vue admin/user interface, Docker deployment files, and example configuration for local or server deployment.

## Features

- Multi-account upstream management
- User API key generation and lifecycle management
- Usage tracking with token-level accounting
- Group-based routing, concurrency, and rate-limit controls
- Optional payment and recharge workflows
- Admin dashboard for accounts, users, groups, usage, and settings
- Docker Compose deployment with PostgreSQL and Redis

## Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | Go, Gin, Ent |
| Frontend | Vue 3, Vite, Tailwind CSS |
| Database | PostgreSQL |
| Cache | Redis |
| Deployment | Docker, Docker Compose |

## Project Structure

```text
.
├── backend/                  # Go backend service
│   ├── cmd/server/           # Application entry
│   ├── internal/             # Internal packages
│   └── resources/            # Static resources
├── frontend/                 # Vue frontend
│   └── src/                  # Views, stores, components, API clients
├── deploy/                   # Docker and deployment examples
├── docs/                     # Additional documentation
└── tools/                    # Development utilities
```

## Deployment

### Docker Compose

Docker Compose is the recommended way to run the application with PostgreSQL and Redis.

```bash
cd deploy
cp .env.example .env
docker compose up -d
```

Edit `.env` before production use and set strong values for passwords, JWT secrets, and encryption keys.

Useful commands:

```bash
docker compose ps
docker compose logs -f
docker compose down
```

### Build From Source

Backend:

```bash
cd backend
go run ./cmd/server
```

Frontend:

```bash
cd frontend
pnpm install
pnpm run dev
```

Production frontend build:

```bash
cd frontend
pnpm install
pnpm run build
```

Embedded backend build:

```bash
cd backend
go build -tags embed -o api-gateway ./cmd/server
```

## Configuration

Copy the example configuration and adjust it for your environment:

```bash
cp deploy/config.example.yaml backend/config.yaml
```

Important settings include:

- PostgreSQL connection details
- Redis connection details
- JWT secret
- Admin account settings
- CORS and security allowlists
- Payment provider configuration, if enabled
- Upstream model and pricing settings

Never commit production secrets or local `.env` files.

## Development

Run backend tests:

```bash
cd backend
go test ./...
```

Run frontend checks:

```bash
cd frontend
pnpm run typecheck
pnpm run test:run
```

When editing generated backend wiring or Ent schema files, regenerate code using the commands documented in the backend package and project make targets.

## Security Notes

- Use HTTPS in production.
- Keep secrets in environment variables or private configuration files.
- Review upstream provider terms before forwarding traffic through this service.
- Restrict outbound network access where possible.
- Configure trusted proxies carefully before relying on forwarded client IP headers.

## License

This project is licensed under the terms in [LICENSE](LICENSE).
