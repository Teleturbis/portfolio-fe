# GitLab Webhook Setup Anleitung

## 🎯 Webhook in GitLab konfigurieren

### Schritt 1: GitLab Projekt öffnen

1. Gehe zu deinem GitLab Projekt: `https://gitlab.com/teleturbis/v0-portfolio`
2. Navigiere zu **Settings** > **Webhooks**

### Schritt 2: Webhook erstellen

Klicke auf **"Add new webhook"** und konfiguriere:

```
URL: http://your-server.com:9000
Description: v0-Portfolio Auto-Deployment
Secret token: your-secure-webhook-secret-123
```

### Schritt 3: Trigger Events auswählen

Aktiviere folgende Events:

```
☑️ Push events
   - Branch filter: main,dev (optional)

☑️ Pipeline events
   - Wird getriggert wenn CI/CD Pipeline abgeschlossen ist

☐ Issues events (nicht benötigt)
☐ Merge request events (nicht benötigt)
☐ Tag push events (nicht benötigt)
```

### Schritt 4: Weitere Einstellungen

```
☑️ Enable SSL verification (falls du HTTPS verwendest)
☐ Repository update events (nicht benötigt)
☐ Push events below branch filter (leer lassen)
```

### Schritt 5: Webhook testen

1. Klicke **"Add webhook"**
2. Nach der Erstellung siehst du eine **"Test"** Option
3. Wähle **"Push events"** zum Testen
4. Überprüfe die Server-Logs: `sudo systemctl status v0-portfolio-webhook.service`

## 🔄 Automatischer Workflow

### Development (dev branch):

```
git push origin dev
  ↓
GitLab CI/CD Pipeline
  ↓
Docker Image Build (staging tag)
  ↓
Webhook Event → Server
  ↓
Automatic Staging Deployment
```

### Production (main branch):

```
git push origin main
  ↓
GitLab CI/CD Pipeline
  ↓
Docker Image Build (latest tag)
  ↓
Manual Pipeline Approval
  ↓
Webhook Event → Server
  ↓
Automatic Production Deployment
```

## 🐛 Troubleshooting

### Webhook nicht getriggert:

```bash
# Server Logs überprüfen
sudo journalctl -u v0-portfolio-webhook.service -f

# Webhook History in GitLab überprüfen
# Settings > Webhooks > Edit > Recent Deliveries
```

### Deployment Fehler:

```bash
# Manual deployment testen
cd /path/to/v0-portfolio
./server-scripts/deploy.sh staging

# Docker Logs überprüfen
docker-compose -f docker-compose.server.yml logs -f
```

### Port-Probleme:

```bash
# Port 9000 Verfügbarkeit prüfen
sudo netstat -tlnp | grep 9000

# Firewall Check
sudo ufw status
sudo ufw allow 9000
```

## 📊 Monitoring

### Webhook Status Dashboard:

```bash
# Service Status
sudo systemctl status v0-portfolio-webhook.service

# Live Logs
sudo journalctl -u v0-portfolio-webhook.service -f

# Container Status
docker-compose -f docker-compose.server.yml ps
```

### GitLab Webhook History:

- Gehe zu **Settings** > **Webhooks**
- Klicke auf **Edit** bei deinem Webhook
- Scroll zu **Recent Deliveries**
- Hier siehst du alle Webhook-Aufrufe mit Response Codes

## 🔒 Sicherheits-Tipps

1. **Starkes Secret verwenden**: Mindestens 32 Zeichen
2. **Firewall konfigurieren**: Nur nötige Ports öffnen
3. **HTTPS verwenden**: Für Production-Umgebung
4. **Logs überwachen**: Regelmäßig auf verdächtige Aktivitäten prüfen
