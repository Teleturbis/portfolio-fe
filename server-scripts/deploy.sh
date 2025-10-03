#!/bin/bash

# v0-Portfolio Deployment Script für Server
# Automatisches Update der Container bei neuen Images

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="$SCRIPT_DIR/../docker-compose.server.yml"
REGISTRY_USER="${REGISTRY_USER}"
REGISTRY_PASSWORD="${REGISTRY_PASSWORD}"
REGISTRY_URL="registry.teleturbis.de"

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Registry Login
login_registry() {
    log "Logging into Teleturbis Container Registry..."
    echo "$REGISTRY_PASSWORD" | docker login "$REGISTRY_URL" -u "$REGISTRY_USER" --password-stdin
    success "Registry login successful"
}

# Deploy Staging
deploy_staging() {
    log "Deploying staging environment..."
    
    # Pull latest staging image
    docker pull registry.teleturbis.de/v0-portfolio:staging
    
    # Update staging container
    docker-compose -f "$COMPOSE_FILE" up -d v0-portfolio-staging
    
    # Health check
    log "Waiting for staging container to be healthy..."
    timeout 60 bash -c 'until docker inspect --format="{{.State.Health.Status}}" v0-portfolio-staging | grep -q healthy; do sleep 2; done'
    
    success "Staging deployment completed successfully"
}

# Deploy Production
deploy_production() {
    log "Deploying production environment..."
    
    # Pull latest production image
    docker pull registry.teleturbis.de/v0-portfolio:latest
    
    # Update production container with zero-downtime
    docker-compose -f "$COMPOSE_FILE" up -d v0-portfolio-production
    
    # Health check
    log "Waiting for production container to be healthy..."
    timeout 60 bash -c 'until docker inspect --format="{{.State.Health.Status}}" v0-portfolio-production | grep -q healthy; do sleep 2; done'
    
    success "Production deployment completed successfully"
}

# Cleanup old images
cleanup() {
    log "Cleaning up old Docker images..."
    docker image prune -f
    docker system prune -f --volumes
    success "Cleanup completed"
}

# Main deployment logic
main() {
    case "${1:-}" in
        "staging")
            login_registry
            deploy_staging
            cleanup
            ;;
        "production")
            login_registry
            deploy_production
            cleanup
            ;;
        "both")
            login_registry
            deploy_staging
            deploy_production
            cleanup
            ;;
        *)
            echo "Usage: $0 {staging|production|both}"
            echo "  staging     - Deploy only staging environment"
            echo "  production  - Deploy only production environment"
            echo "  both        - Deploy both environments"
            exit 1
            ;;
    esac
}

main "$@"