#!/usr/bin/env python3

# Einfacher Webhook-Server für GitLab CI/CD Deployments
# Empfängt Deployment-Events und führt Docker-Updates aus

import json
import subprocess
import os
import hmac
import hashlib
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime

class DeploymentWebhookHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Content-Length lesen
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length == 0:
            self.send_error(400, "No content")
            return
            
        # JSON Payload lesen
        post_data = self.rfile.read(content_length)
        
        # Webhook Token verifizieren
        webhook_token = self.headers.get('X-Webhook-Token', '')
        expected_token = os.environ.get('WEBHOOK_SECRET', 'default-secret')
        
        if webhook_token != expected_token:
            self.log_message("❌ Invalid webhook token")
            self.send_error(401, "Unauthorized")
            return
        
        try:
            # JSON parsen
            payload = json.loads(post_data.decode('utf-8'))
            self.log_message(f"📡 Webhook received: {payload.get('event', 'unknown')}")
            
            # Deployment Event verarbeiten
            if payload.get('event') == 'deployment':
                self.handle_deployment(payload)
            
            # Erfolgreiche Antwort
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"status": "success", "message": "Deployment triggered"}')
            
        except json.JSONDecodeError:
            self.log_message("❌ Invalid JSON payload")
            self.send_error(400, "Invalid JSON")
        except Exception as e:
            self.log_message(f"❌ Error processing webhook: {e}")
            self.send_error(500, "Internal Server Error")
    
    def handle_deployment(self, payload):
        """Verarbeite Deployment-Event"""
        image = payload.get('image', '')
        commit = payload.get('commit', '')[:8]
        branch = payload.get('branch', '')
        
        self.log_message(f"🚀 Starting deployment for {branch}")
        self.log_message(f"📦 Image: {image}")
        self.log_message(f"🔗 Commit: {commit}")
        
        # Deployment-Script ausführen
        script_path = os.path.join(os.path.dirname(__file__), 'deploy.sh')
        
        try:
            # Async deployment im Hintergrund
            subprocess.Popen([
                '/bin/bash', script_path, 'production'
            ], cwd=os.path.dirname(__file__))
            
            self.log_message("✅ Deployment script started successfully")
            
        except Exception as e:
            self.log_message(f"❌ Failed to start deployment: {e}")
    
    def log_message(self, message):
        """Logging mit Timestamp"""
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f"[{timestamp}] {message}")

def run_webhook_server():
    """Starte Webhook Server"""
    port = int(os.environ.get('WEBHOOK_PORT', 9000))
    webhook_secret = os.environ.get('WEBHOOK_SECRET', 'default-secret')
    
    server = HTTPServer(('0.0.0.0', port), DeploymentWebhookHandler)
    
    print(f"🎯 Deployment Webhook Server starting on port {port}")
    print(f"🔐 Webhook secret: {'***' if webhook_secret != 'default-secret' else 'DEFAULT (INSECURE!)'}")
    print(f"📡 Listening for GitLab CI/CD webhooks...")
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Webhook server stopped")
        server.shutdown()

if __name__ == '__main__':
    run_webhook_server()