#!/bin/bash

# Deployment Webhook Server Management Script

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBHOOK_PORT="${WEBHOOK_PORT:-9000}"
WEBHOOK_SECRET="${WEBHOOK_SECRET:-your-secure-webhook-secret}"

# Farben
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Webhook Server direkt starten
start_webhook() {
    log "Starting deployment webhook server..."
    
    export WEBHOOK_PORT="$WEBHOOK_PORT"
    export WEBHOOK_SECRET="$WEBHOOK_SECRET"
    
    cd "$SCRIPT_DIR"
    python3 deployment-webhook.py
}

# Systemd Service erstellen
create_service() {
    cat > /tmp/deployment-webhook.service << EOF
[Unit]
Description=Portfolio Deployment Webhook Service
After=network.target docker.service
Requires=docker.service

[Service]
Type=simple
User=www-data
WorkingDirectory=$SCRIPT_DIR
ExecStart=/usr/bin/python3 $SCRIPT_DIR/deployment-webhook.py
Restart=always
RestartSec=10
Environment=WEBHOOK_PORT=$WEBHOOK_PORT
Environment=WEBHOOK_SECRET=$WEBHOOK_SECRET
Environment=REGISTRY_USER=\${REGISTRY_USER}
Environment=REGISTRY_PASSWORD=\${REGISTRY_PASSWORD}

[Install]
WantedBy=multi-user.target
EOF

    success "Service file created at /tmp/deployment-webhook.service"
    echo ""
    echo "Installation commands:"
    echo "sudo cp /tmp/deployment-webhook.service /etc/systemd/system/"
    echo "sudo systemctl daemon-reload"
    echo "sudo systemctl enable deployment-webhook.service"
    echo "sudo systemctl start deployment-webhook.service"
    echo ""
    echo "Status check:"
    echo "sudo systemctl status deployment-webhook.service"
}

# Service Status prüfen
check_status() {
    if systemctl is-active --quiet deployment-webhook.service; then
        success "Webhook service is running"
        echo "Port: $WEBHOOK_PORT"
        echo "Logs: sudo journalctl -u deployment-webhook.service -f"
    else
        warning "Webhook service is not running"
        echo "Start with: sudo systemctl start deployment-webhook.service"
    fi
}

# Webhook testen
test_webhook() {
    local webhook_url="http://localhost:$WEBHOOK_PORT"
    
    log "Testing webhook endpoint..."
    
    curl -X POST "$webhook_url" \
        -H "Content-Type: application/json" \
        -H "X-Webhook-Token: $WEBHOOK_SECRET" \
        -d '{
            "event": "deployment",
            "image": "registry.teleturbis.de/portfolio:latest",
            "tag": "test",
            "commit": "abc123",
            "branch": "main",
            "project": "v0-portfolio"
        }' || echo "Test failed"
}

case "${1:-}" in
    "start")
        start_webhook
        ;;
    "service")
        create_service
        ;;
    "status")
        check_status
        ;;
    "test")
        test_webhook
        ;;
    *)
        echo "Usage: $0 {start|service|status|test}"
        echo "  start   - Start webhook server directly"
        echo "  service - Create systemd service file"
        echo "  status  - Check service status"
        echo "  test    - Test webhook endpoint"
        exit 1
        ;;
esac