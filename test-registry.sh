#!/bin/bash

# Test Script für Teleturbis Registry Integration
# Testet Registry-Zugang und Docker Build

set -e

REGISTRY_URL="registry.teleturbis.de"
IMAGE_NAME="registry.teleturbis.de/v0-portfolio"

# Farben
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Registry Connection Test
test_registry_connection() {
    log "Testing registry connection..."
    
    if curl -s -f https://registry.teleturbis.de/v2/ > /dev/null; then
        success "Registry API accessible"
    else
        error "Registry API not accessible"
    fi
}

# Docker Build Test
test_docker_build() {
    log "Testing Docker build..."
    
    if docker build -t $IMAGE_NAME:test .; then
        success "Docker build successful"
    else
        error "Docker build failed"
    fi
}

# Registry Login Test (wenn Credentials verfügbar)
test_registry_login() {
    log "Testing registry login..."
    
    if [ -z "$REGISTRY_USER" ] || [ -z "$REGISTRY_PASSWORD" ]; then
        echo "⚠️  Registry credentials not set - skipping login test"
        echo "   Set REGISTRY_USER and REGISTRY_PASSWORD to test login"
        return
    fi
    
    if echo "$REGISTRY_PASSWORD" | docker login $REGISTRY_URL -u "$REGISTRY_USER" --password-stdin; then
        success "Registry login successful"
    else
        error "Registry login failed"
    fi
}

# Registry Push Test (nur wenn login erfolgreich)
test_registry_push() {
    if [ -z "$REGISTRY_USER" ] || [ -z "$REGISTRY_PASSWORD" ]; then
        echo "⚠️  Skipping push test - no credentials"
        return
    fi
    
    log "Testing registry push..."
    
    if docker push $IMAGE_NAME:test; then
        success "Registry push successful"
        
        # Clean up test image
        docker rmi $IMAGE_NAME:test
    else
        error "Registry push failed"
    fi
}

# Registry Catalog Test
test_registry_catalog() {
    log "Testing registry catalog..."
    
    if curl -s https://registry.teleturbis.de/v2/_catalog | jq . > /dev/null 2>&1; then
        success "Registry catalog accessible"
        echo "📋 Available repositories:"
        curl -s https://registry.teleturbis.de/v2/_catalog | jq -r '.repositories[]' | head -10
    else
        echo "⚠️  Registry catalog not accessible or jq not installed"
    fi
}

# Main test execution
main() {
    echo "🧪 Testing Teleturbis Registry Integration"
    echo "=========================================="
    
    test_registry_connection
    test_docker_build
    test_registry_login
    test_registry_push
    test_registry_catalog
    
    echo ""
    success "All tests completed!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Set REGISTRY_USER and REGISTRY_PASSWORD"
    echo "2. Configure GitLab CI/CD Variables"
    echo "3. Create GitLab Webhook"
    echo "4. Test with dev branch push"
}

main "$@"