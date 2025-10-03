# Schneller GitLab Setup für v0-Portfolio

## 🔧 GitLab CI/CD Variables setzen

Gehe zu: **GitLab Project > Settings > CI/CD > Variables > Add Variable**

### Benötigte Variables:

```
Variable 1:
Key: REGISTRY_USER
Value: admin
Type: Variable
Protected: ☑️ (nur auf protected branches)
Masked: ☑️ (versteckt in Logs)

Variable 2:
Key: REGISTRY_PASSWORD
Value: TeleTurbis2024!
Type: Variable
Protected: ☑️
Masked: ☑️
```

## 🚀 Pipeline testen

Nach dem Setup der Variables:

```bash
# Alle Änderungen committen
git add .
git commit -m "feat: setup docker registry pipeline"
git push gitlab main
```

## 📊 Pipeline verfolgen

1. **GitLab Project > CI/CD > Pipelines**
2. **Aktuelle Pipeline anklicken**
3. **Jobs anzeigen:**
   - `prettier` ✅
   - `eslint` ✅
   - `build` ✅
   - `docker-build-production` 🚀

## 🎯 Was passiert in der Pipeline:

1. **Lint Stage:** Code-Qualität prüfen
2. **Build Stage:** Next.js Build testen
3. **Deploy Stage:** Docker Image bauen und zu Registry pushen

## 📦 Erwartetes Ergebnis:

Nach erfolgreichem Pipeline-Lauf findest du:

```
registry.teleturbis.de/v0-portfolio:latest
registry.teleturbis.de/v0-portfolio:v[commit-hash]
```

## 🔍 Registry prüfen:

```bash
# Registry Katalog anzeigen
curl https://registry.teleturbis.de/v2/_catalog

# Tags für v0-portfolio anzeigen
curl https://registry.teleturbis.de/v2/v0-portfolio/tags/list
```

## 🐛 Troubleshooting:

### Pipeline-Fehler:

- **Registry Login Failed:** Variables nochmal prüfen
- **Build Failed:** Dockerfile syntax prüfen
- **Push Failed:** Registry-Berechtigung prüfen

### Variables testen:

- **Settings > CI/CD > Variables:** Alle Variables vorhanden?
- **Protected:** Nur bei main branch aktiv
- **Masked:** In Pipeline-Logs nicht sichtbar
