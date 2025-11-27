#!/bin/bash

# GitLab Webhook Server für automatische Deployments
# Empfängt GitLab Push/Pipeline Events und triggert Deployments

WEBHOOK_PORT="${WEBHOOK_PORT:-9000}"
WEBHOOK_SECRET="${GITLAB_WEBHOOK_SECRET:-your-secure-webhook-secret}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Farben für Output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

# GitLab Webhook Handler mit Python
create_webhook_server() {
    cat > "$SCRIPT_DIR/gitlab_webhook.py" << 'EOF'
#!/usr/bin/env python3

import json
import hmac
import hashlib
import subprocess
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.parse

class GitLabWebhookHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        # Verify GitLab webhook signature
        signature = self.headers.get('X-Gitlab-Token')
        expected_secret = os.environ.get('GITLAB_WEBHOOK_SECRET', 'your-secure-webhook-secret')
        
        if signature != expected_secret:
            self.send_response(401)
            self.end_headers()
            self.wfile.write(b'Unauthorized')
            return
        
        try:
            payload = json.loads(post_data.decode('utf-8'))
            self.handle_gitlab_event(payload)
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"status": "success"}')
            
        except Exception as e:
            print(f"Error processing webhook: {e}")
            self.send_response(500)
            self.end_headers()
            self.wfile.write(b'Internal Server Error')
    
    def handle_gitlab_event(self, payload):
        event_type = payload.get('object_kind', '')
        
        if event_type == 'push':
            self.handle_push_event(payload)
        elif event_type == 'pipeline':
            self.handle_pipeline_event(payload)
    
    def handle_push_event(self, payload):
        ref = payload.get('ref', '')
        branch = ref.replace('refs/heads/', '') if ref.startswith('refs/heads/') else ''
        
        print(f"📡 Push event received for branch: {branch}")
        
        if branch == 'dev':
            print("🚀 Triggering staging deployment...")
            subprocess.Popen(['/bin/bash', 'deploy.sh', 'staging'], cwd=os.path.dirname(__file__))
        elif branch == 'main':
            print("🚀 Triggering production deployment...")
            subprocess.Popen(['/bin/bash', 'deploy.sh', 'production'], cwd=os.path.dirname(__file__))
    
    def handle_pipeline_event(self, payload):
        status = payload.get('object_attributes', {}).get('status', '')
        ref = payload.get('object_attributes', {}).get('ref', '')
        
        if status == 'success':
            print(f"✅ Pipeline succeeded for branch: {ref}")
            
            if ref == 'dev':
                print("🚀 Triggering staging deployment...")
                subprocess.Popen(['/bin/bash', 'deploy.sh', 'staging'], cwd=os.path.dirname(__file__))
            elif ref == 'main':
                print("🚀 Triggering production deployment...")  
                subprocess.Popen(['/bin/bash', 'deploy.sh', 'production'], cwd=os.path.dirname(__file__))

def run_server():
    port = int(os.environ.get('WEBHOOK_PORT', 9000))
    server = HTTPServer(('0.0.0.0', port), GitLabWebhookHandler)
    print(f"🎯 GitLab Webhook server starting on port {port}")
    print(f"🔐 Using webhook secret: {os.environ.get('GITLAB_WEBHOOK_SECRET', 'NOT_SET')}")
    server.serve_forever()

if __name__ == '__main__':
    run_server()
EOF

    chmod +x "$SCRIPT_DIR/gitlab_webhook.py"
}

# Python Webhook Server starten
start_webhook_server() {
    log "Creating GitLab webhook server..."
    create_webhook_server
    
    log "Starting GitLab webhook server on port $WEBHOOK_PORT"
    export GITLAB_WEBHOOK_SECRET="$WEBHOOK_SECRET"
    export WEBHOOK_PORT="$WEBHOOK_PORT"
    
    cd "$SCRIPT_DIR"
    python3 gitlab_webhook.py
}

# Systemd Service erstellen
create_service() {
    cat > /tmp/v0-portfolio-webhook.service << EOF
[Unit]
Description=v0-Portfolio GitLab Webhook Service
After=network.target docker.service
Requires=docker.service

[Service]
Type=simple
User=www-data
WorkingDirectory=$SCRIPT_DIR
ExecStart=/usr/bin/python3 $SCRIPT_DIR/gitlab_webhook.py
Restart=always
RestartSec=10
Environment=WEBHOOK_PORT=$WEBHOOK_PORT
Environment=GITLAB_WEBHOOK_SECRET=$WEBHOOK_SECRET
Environment=GITLAB_REGISTRY_USER=\${REGISTRY_USER}
Environment=GITLAB_REGISTRY_TOKEN=\${REGISTRY_PASSWORD}

[Install]
WantedBy=multi-user.target
EOF

    echo "📝 Service file created at /tmp/v0-portfolio-webhook.service"
    echo ""
    echo "Installation commands:"
    echo "sudo cp /tmp/v0-portfolio-webhook.service /etc/systemd/system/"
    echo "sudo systemctl daemon-reload"
    echo "sudo systemctl enable v0-portfolio-webhook.service"
    echo "sudo systemctl start v0-portfolio-webhook.service"
}

case "${1:-}" in
    "start")
        start_webhook_server
        ;;
    "service")
        create_service
        ;;
    *)
        echo "Usage: $0 {start|service}"
        echo "  start   - Start GitLab webhook server"
        echo "  service - Create systemd service file"
        exit 1
        ;;
esac