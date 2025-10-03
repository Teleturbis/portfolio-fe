# Server Setup für v0-Portfolio CI/CD

## Voraussetzungen

- Docker & Docker Compose installiert
- GitLab Container Registry Zugang
- Traefik als Reverse Proxy (optional)
- Ports 3000, 3001, 9000 verfügbar

## 1. Server Vorbereitung

```bash
# Repository auf Server klonen
git clone https://gitlab.com/teleturbis/v0-portfolio.git
cd v0-portfolio

# Scripts ausführbar machen
chmod +x server-scripts/*.sh

# Python3 für Webhook Server installieren (falls nicht vorhanden)
sudo apt update
sudo apt install python3 python3-pip

# Docker Network erstellen
docker network create portfolio-network
```

## 2. Registry Credentials konfigurieren

```bash
# Environment Variables setzen
export REGISTRY_USER="your-registry-username"
export REGISTRY_PASSWORD="your-registry-password"
export GITLAB_WEBHOOK_SECRET="your-secure-webhook-secret"

# Oder in .env file (nicht committen!)
cat > .env << EOF
REGISTRY_USER=your-registry-username
REGISTRY_PASSWORD=your-registry-password
GITLAB_WEBHOOK_SECRET=your-secure-webhook-secret
EOF
```

## 3. Initiales Deployment

```bash
# Erstes Deployment (beide Environments)
./server-scripts/deploy.sh both
```

## 4. Webhook Service einrichten

```bash
# Service file erstellen
./server-scripts/webhook-server.sh service

# Service installieren
sudo cp /tmp/v0-portfolio-webhook.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable v0-portfolio-webhook.service
sudo systemctl start v0-portfolio-webhook.service

# Status überprüfen
sudo systemctl status v0-portfolio-webhook.service
```

## 5. GitLab Webhook konfigurieren

In GitLab unter **Settings > Webhooks** einen neuen Webhook erstellen:

```
URL: http://your-server.com:9000
Secret Token: your-secure-webhook-secret

Trigger Events:
☑️ Push events
☑️ Pipeline events

SSL verification: ☑️ Enable (falls HTTPS)
```

**Keine CI/CD Variables mehr nötig!** Der Webhook wird automatisch getriggert.

## 6. Domain Konfiguration

Passe in `docker-compose.server.yml` deine Domains an:

```yaml
# Staging
- 'traefik.http.routers.portfolio-staging.rule=Host(`staging.your-domain.com`)'

# Production
- 'traefik.http.routers.portfolio-production.rule=Host(`your-domain.com`)'
```

## 7. Monitoring & Logs

```bash
# Container Status
docker-compose -f docker-compose.server.yml ps

# Logs anzeigen
docker-compose -f docker-compose.server.yml logs -f

# Health Status
docker inspect v0-portfolio-production | grep -A5 Health
```

## 8. Manueller Update Workflow

```bash
# Nur Staging updaten
./server-scripts/deploy.sh staging

# Nur Production updaten
./server-scripts/deploy.sh production

# Beide updaten
./server-scripts/deploy.sh both
```

## Workflow Übersicht

1. **Dev Branch** → Automatisches Staging Deployment
2. **Main Branch** → Build Image + manueller Production Trigger
3. **Webhook** → Server pullt neue Images automatisch
4. **Health Checks** → Deployment Validation
5. **Zero-Downtime** → Rolling Updates

## Sicherheit

- Webhook Token verwenden
- Registry Credentials sicher speichern
- Firewall Regeln für Ports 3000, 3001, 9000
- SSL/TLS mit Traefik oder nginx
