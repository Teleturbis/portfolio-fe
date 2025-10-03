# GitLab CI/CD Variables für Teleturbis Registry

## 🔧 Benötigte Variables in GitLab

Gehe zu **Settings > CI/CD > Variables** und füge folgende hinzu:

### Registry Credentials:

```
REGISTRY_USER
Value: dein-registry-benutzername
Type: Variable
Protected: ☑️
Masked: ☑️

REGISTRY_PASSWORD
Value: dein-registry-passwort
Type: Variable
Protected: ☑️
Masked: ☑️
```

### Webhook Secret (Optional):

```
GITLAB_WEBHOOK_SECRET
Value: your-secure-webhook-secret-123
Type: Variable
Protected: ☑️
Masked: ☑️
```

## 🧪 Registry Testen

### Lokal testen:

```bash
# Registry Login testen
docker login registry.teleturbis.de -u your-username

# Test Image pushen
docker tag hello-world registry.teleturbis.de/test:latest
docker push registry.teleturbis.de/test:latest

# Registry Katalog anzeigen
curl https://registry.teleturbis.de/v2/_catalog

# Test Image wieder löschen
docker image rm registry.teleturbis.de/test:latest
```

### Registry API testen:

```bash
# Verfügbare Repositories
curl https://registry.teleturbis.de/v2/_catalog

# Tags für ein Repository (nach erstem Push)
curl https://registry.teleturbis.de/v2/v0-portfolio/tags/list
```

## 🚀 Workflow nach Registry Setup

1. **GitLab Variables konfiguriert** ✅
2. **GitLab Webhook erstellt** (siehe GITLAB-WEBHOOK-SETUP.md)
3. **Server vorbereitet** (siehe SERVER-SETUP.md)
4. **Dev Branch erstellen und testen:**

```bash
# Dev Branch erstellen
git checkout -b dev
git push gitlab dev

# Erste Changes pushen
echo "# Dev Test" >> README.md
git add .
git commit -m "test: staging deployment"
git push gitlab dev
```

5. **CI/CD Pipeline beobachten:**
   - GitLab Project > CI/CD > Pipelines
   - Should build and push to `registry.teleturbis.de/v0-portfolio:staging`

6. **Server Logs prüfen:**

```bash
# Webhook Server Status
sudo systemctl status v0-portfolio-webhook.service

# Deployment Logs
sudo journalctl -u v0-portfolio-webhook.service -f
```

## 🔍 Troubleshooting

### Registry Connection Fehler:

```bash
# DNS Test
nslookup registry.teleturbis.de

# SSL Test
curl -I https://registry.teleturbis.de/v2/

# Manual Docker Login
docker login registry.teleturbis.de
```

### GitLab CI Fehler:

- Prüfe Variables in GitLab (Masked/Protected)
- Teste Registry Credentials lokal
- Check GitLab Runner Docker-in-Docker Support

### Deployment Fehler:

```bash
# Manual Image Pull Test
docker pull registry.teleturbis.de/v0-portfolio:staging

# Network Test vom Server
curl https://registry.teleturbis.de/v2/_catalog
```
