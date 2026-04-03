# Security Audit Report

---

## Audit — 2026-04-02

**Date:** 2026-04-02
**Branch:** `copilot/sub-pr-17`
**Auditor:** Claude Code (automated)
**Scope:** All source files, config files, GitHub workflows, and dependencies

### Executive Summary

The codebase is a pure client-side React/TypeScript educational SPA with no active backend. It has a solid baseline of security tooling (CodeQL, Gitleaks, Dependabot, OWASP Dependency-Check, pinned GitHub Actions). However, 12 distinct findings were identified ranging from a high-severity known-vulnerable dependency to medium-severity CSP misconfigurations and a host-binding issue in the dev script.

No hardcoded credentials, SQL injection vectors, or XSS sinks (`dangerouslySetInnerHTML`, `eval`) were found in the application source.

### Findings Summary

| # | Severity | Category | File | Description |
|---|---|---|---|---|
| 1 | **HIGH** | Vulnerable Dependency | `node_modules/path-to-regexp` | ReDoS via express dependency (GHSA-37ch-88jc-xwx2, CVSS 7.5) |
| 2 | MEDIUM | CSP Misconfiguration | `vite.config.ts:28` | `unsafe-inline` in dev `script-src` |
| 3 | MEDIUM | CSP Misconfiguration | `vite.config.ts:28` | Unrestricted `http: https:` in `connect-src` |
| 4 | MEDIUM | Network Exposure | `package.json:25` | Dev server binds to `0.0.0.0` (all interfaces) |
| 5 | MEDIUM | CSP Misconfiguration | `vite.config.ts:28` vs `index.html:9` | Dev/prod CSP mismatch with 5 directive differences |
| 6 | MEDIUM | Dependency Surface | `package.json:31-41` | Unused backend deps (`express`, `better-sqlite3`, `dotenv`, `@google/genai`) in production |
| 7 | MEDIUM | Supply Chain | `package.json:34` | `express` version mismatch — node_modules out of sync with lock file |
| 8 | LOW | Input Validation | `src/App.tsx:25` | localStorage deserialization without schema validation |
| 9 | LOW | Type Safety | `tsconfig.json` | TypeScript strict mode disabled |
| 10 | LOW | CSP / Error Handling | `vite.config.ts:28` | `report-uri` target endpoint doesn't exist |
| 11 | LOW | Supply Chain | `owasp-security-scan.yml:232` | Gitleaks action not pinned to commit SHA |
| 12 | INFO | Process | `SECURITY.md:17-18`, `security.txt` | Contradictory vulnerability disclosure instructions |

### Detailed Findings

#### FINDING 1 — HIGH: Vulnerable Dependency — path-to-regexp (ReDoS)

**File:** `node_modules/path-to-regexp` (via `express`)
**Advisory:** GHSA-37ch-88jc-xwx2 | CWE-1333 | CVSS 7.5

`path-to-regexp <0.1.13` is vulnerable to Regular Expression Denial of Service. The installed version is `0.1.12`, pulled in by `express@4.22.1`. An attacker can craft a malicious route string to cause catastrophic regex backtracking. This package is currently unused (no backend code), but it is in the production dependency tree.

**Recommendation:** Run `npm audit fix`. Longer term, remove the unused `express` dependency (see Finding 6).

---

#### FINDING 2 — MEDIUM: Dev Server CSP Allows `unsafe-inline` Scripts

**File:** `vite.config.ts:28`

The dev server CSP includes `script-src 'self' 'unsafe-inline'`, weakening XSS protections. The production CSP in `index.html:9` correctly omits `'unsafe-inline'`.

**Recommendation:** Remove `'unsafe-inline'` from the dev CSP. React's JSX compilation does not require inline scripts.

---

#### FINDING 3 — MEDIUM: Dev Server CSP Allows Unrestricted Outbound Connections

**File:** `vite.config.ts:28`

The `connect-src` directive in the dev server headers is `connect-src 'self' ws: wss: http: https:`. The `http:` and `https:` wildcards allow the page to make fetch/XHR/WebSocket requests to any host.

**Recommendation:** Restrict to `connect-src 'self' ws: wss:` to match the production `index.html` policy.

---

#### FINDING 4 — MEDIUM: Dev Server Binds to All Network Interfaces

**File:** `package.json:25`

```json
"dev": "vite --port=3000 --host=0.0.0.0"
```

`--host=0.0.0.0` exposes the development build (including unminified source and HMR WebSocket) to all machines on the local network.

**Recommendation:** Remove `--host=0.0.0.0` from the default `dev` script, or extract to a separate `dev:host` script for cases where network access is intentional.

---

#### FINDING 5 — MEDIUM: Inconsistent CSP Between Dev and Production

**Files:** `vite.config.ts:28` vs `index.html:9`

| Directive | `index.html` (prod) | `vite.config.ts` (dev) |
|---|---|---|
| `script-src` | `'self'` | `'self' 'unsafe-inline'` |
| `connect-src` | `'self' ws: wss:` | `'self' ws: wss: http: https:` |
| `object-src` | `'none'` | absent |
| `base-uri` | `'self'` | absent |
| `form-action` | `'self'` | absent |

**Recommendation:** Use the stricter `index.html` policy as the baseline for both environments.

---

#### FINDING 6 — MEDIUM: Unused Backend Libraries in Production Dependencies

**File:** `package.json:31-41`

The following packages are in `dependencies` but no server-side code exists:

- `better-sqlite3` — native C++ SQLite addon
- `express` — HTTP framework (triggers Finding 1)
- `dotenv` — environment variable loader
- `@google/genai` — Google Gemini API client

**Recommendation:** Remove or move these to `devDependencies`. Create a separate `server/` package with its own `package.json` when backend work starts.

---

#### FINDING 7 — MEDIUM: express Version Mismatch — node_modules Out of Sync

**File:** `package.json:34`

`package.json` declares `"express": "^4.21.2"` and `package-lock.json` locks to `express@4.22.1`, but `node_modules` contains `express@5.2.1`, which doesn't satisfy the declared range. `npm ci` (used in CI) would restore the locked v4 version, creating a divergence between local dev and CI builds.

**Recommendation:** Run `npm ci` to restore a clean `node_modules` from `package-lock.json`.

---

#### FINDING 8 — LOW: localStorage Deserialization Without Schema Validation

**File:** `src/App.tsx:25`

```typescript
const saved = localStorage.getItem('rpi-lab-progress');
return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
```

JSON parse errors are caught, but the shape of the deserialized object is not validated. A schema change or corrupt data could cause unexpected runtime behavior.

**Recommendation:** Validate the object shape after deserialization (e.g., with `zod`). Fall back to `INITIAL_PROGRESS` on shape mismatch.

---

#### FINDING 9 — LOW: TypeScript Strict Mode Disabled

**File:** `tsconfig.json`

`"strict": true` and related flags (`strictNullChecks`, `noImplicitAny`) are not enabled, reducing the compiler's ability to catch null/undefined dereferences.

**Recommendation:** Add `"strict": true` to `tsconfig.json` and address resulting type errors.

---

#### FINDING 10 — LOW: CSP `report-uri` Points to Non-Existent Endpoint

**File:** `vite.config.ts:28`

The dev server CSP includes `report-uri /api/csp-report`. This endpoint does not exist, so all CSP violation reports silently return 404. Additionally, `report-uri` is deprecated in favor of `report-to`.

**Recommendation:** Remove `report-uri /api/csp-report` until a reporting endpoint is implemented. Use the modern `report-to` directive when one is added.

---

#### FINDING 11 — LOW: Gitleaks GitHub Action Not Pinned to Commit SHA

**File:** `.github/workflows/owasp-security-scan.yml:232`

All other GitHub Actions are pinned to immutable commit SHAs except Gitleaks:
```yaml
uses: gitleaks/gitleaks-action@v2   # mutable tag — not pinned
```

**Recommendation:** Pin to a specific commit SHA, e.g.:
```yaml
uses: gitleaks/gitleaks-action@ff98106e4c7b2e9b67b4aca3c65fb81cd10800c3 # v2.3.4
```

---

#### FINDING 12 — INFO: Contradictory Vulnerability Disclosure Instructions

**Files:** `SECURITY.md:17-18`, `public/.well-known/security.txt`

- Line 17: "**Do NOT** open a public GitHub issue for security vulnerabilities"
- Line 18: "**Open a GitHub issue** with the tag `[SECURITY]`"

Reporting vulnerabilities publicly gives attackers a window to exploit them before a patch is available.

**Recommendation:** Use GitHub's private security advisory feature (Settings → Security → Advisories). Update `SECURITY.md` and `security.txt` to use a private channel.

---

### Positive Security Practices Observed

- No `dangerouslySetInnerHTML`, `eval()`, `document.write`, or `innerHTML` in source
- No external API fetch/XHR calls — fully offline app
- React JSX auto-escapes all rendered strings
- `crypto.randomUUID()` used for ID generation (`App.tsx:83`)
- Source maps disabled in production (`vite.config.ts:35`)
- Security headers set: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`
- All GitHub Actions (except Gitleaks) pinned to immutable commit SHAs
- Dependabot configured for npm and GitHub Actions ecosystems
- CodeQL, OWASP Dependency-Check, Gitleaks, ESLint security plugins active in CI
- HTTPS via `vite-plugin-mkcert` in development
- `LabNotebookModal` form fields have `maxLength={2000}` client-side limits

---

## Audit — 2026-03-21 (Previous)

## Overview

This document provides a comprehensive security audit of the picklePi project, covering OWASP Top 10 vulnerabilities and mitigation strategies.

**Last Updated:** 2026-04-03
**Project Version:** 1.0.0  
**Audit Type:** OWASP Top 10 (2021)

---

## OWASP Top 10 Coverage

### A01:2021 – Broken Access Control

**Risk Level:** Medium

**Findings:**
- ✅ Security headers properly configured in `vite.config.ts`:
  - `X-Frame-Options: DENY` - Prevents clickjacking attacks
  - `X-Content-Type-Options: nosniff` - Prevents MIME-type sniffing
  - `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information
  - `Permissions-Policy` - Restricts camera, microphone, geolocation access

**Status:** ✅ **Protected**

**Recommendations:**
- Continue monitoring security headers in future releases
- Consider adding Content-Security-Policy (CSP) headers for enhanced XSS protection

---

### A02:2021 – Cryptographic Failures

**Risk Level:** Low

**Findings:**
- ✅ No user data is transmitted to external servers
- ✅ All data persistence uses localStorage (client-side only)
- ✅ HTTPS enabled via `vite-plugin-mkcert` for local development
- ✅ Gitleaks scanning enabled to detect hardcoded secrets

**Status:** ✅ **Protected**

**Recommendations:**
- Keep `.env.example` updated but never commit actual `.env` files
- Regularly scan for exposed secrets using Gitleaks

---

### A03:2021 – Injection

**Risk Level:** Low-Medium

**Findings:**
- ✅ TypeScript provides type safety
- ✅ React's JSX auto-escapes user input by default
- ✅ ESLint security plugin configured to detect:
  - eval() usage
  - Unsafe regular expressions
  - Non-literal require/import statements
  - Unsanitized DOM manipulation
  - SQL injection risks (if backend is added)

**Status:** ✅ **Protected**

**Code Patterns:**
```typescript
// ✅ Good: React auto-escapes
<div>{userInput}</div>

// ❌ Bad: dangerouslySetInnerHTML without sanitization
<div dangerouslySetInnerHTML={{__html: userInput}} />

// ✅ Good: Use DOMPurify if HTML rendering is needed
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(userInput)}} />
```

**Recommendations:**
- If adding backend API, use parameterized queries
- Never use `eval()`, `Function()`, or similar dynamic code execution
- Validate and sanitize all user inputs

---

### A04:2021 – Insecure Design

**Risk Level:** Low

**Findings:**
- ✅ Strong TypeScript type checking enabled
- ✅ Educational content includes security hardening notes in Python code examples
- ✅ Code examples follow principle of least privilege (e.g., GPIO access)
- ✅ Progress tracking is local-only (no server-side authentication required)

**Status:** ✅ **Protected**

**Security-First Design Principles Applied:**
1. **Defense in Depth**: Multiple security layers (headers, type safety, linting)
2. **Principle of Least Privilege**: Minimal permissions requested
3. **Fail Securely**: Error handling doesn't expose sensitive information
4. **Privacy by Design**: No data collection or external transmission

---

### A05:2021 – Security Misconfiguration

**Risk Level:** Low

**Findings:**
- ✅ Source maps disabled in production (`sourcemap: false`)
- ✅ Security headers configured correctly
- ✅ Dependencies kept up-to-date via Dependabot
- ✅ TypeScript strict mode enabled
- ⚠️  Default Vite development server configuration (acceptable for local dev)

**Status:** ✅ **Protected**

**Configuration Checklist:**
- [x] Source maps disabled in production
- [x] Security headers configured
- [x] HTTPS in development (mkcert)
- [x] TypeScript strict mode
- [x] ESLint configured
- [x] Dependabot enabled
- [x] CodeQL analysis enabled

**Recommendations:**
- Review Vite server configuration before deploying to production
- Consider adding CSP headers
- Implement security.txt file for vulnerability disclosure

---

### A06:2021 – Vulnerable and Outdated Components

**Risk Level:** Medium

**Findings:**
- ✅ Dependabot configured for npm ecosystem
- ✅ npm audit runs in CI/CD pipeline
- ✅ OWASP Dependency-Check integrated
- ✅ Regular dependency updates via automated PRs
- ✅ No known critical vulnerabilities in current dependencies

**Status:** ✅ **Protected**

**Dependency Management:**
```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Fix vulnerabilities automatically
npm audit fix
```

**Recommendations:**
- Review and merge Dependabot PRs promptly
- Run `npm audit` before each release
- Monitor GitHub Security Advisories
- Keep major dependencies updated

---

### A07:2021 – Identification and Authentication Failures

**Risk Level:** Low (Not Applicable)

**Findings:**
- ✅ No authentication system implemented (localStorage-only app)
- ✅ No session management required
- ✅ No password storage
- ✅ Gitleaks scanning prevents hardcoded credentials
- ✅ No API keys or tokens in code

**Status:** ✅ **Protected (N/A)**

**If Authentication is Added in Future:**
- Use established libraries (Passport.js, Auth0, Firebase Auth)
- Implement rate limiting on authentication endpoints
- Use bcrypt or Argon2 for password hashing
- Implement multi-factor authentication (MFA)
- Use secure session management with httpOnly cookies
- Implement account lockout after failed attempts

---

### A08:2021 – Software and Data Integrity Failures

**Risk Level:** Low

**Findings:**
- ✅ Dependencies verified via package-lock.json
- ✅ npm ci used in CI/CD (ensures consistent installs)
- ✅ OWASP Dependency-Check validates integrity
- ✅ CodeQL analyzes code for integrity issues
- ✅ No auto-deployment without verification

**Status:** ✅ **Protected**

**Integrity Measures:**
1. **Dependency Integrity**: package-lock.json ensures consistent versions
2. **Build Integrity**: Reproducible builds via npm ci
3. **Code Integrity**: CodeQL and ESLint verify code quality
4. **Supply Chain**: Dependabot monitors dependency updates

**Recommendations:**
- Consider adding Subresource Integrity (SRI) for CDN resources
- Implement code signing for releases
- Use npm package-lock.json in version control

---

### A09:2021 – Security Logging and Monitoring Failures

**Risk Level:** Low

**Findings:**
- ✅ CodeQL scheduled scans (weekly)
- ✅ OWASP security scan scheduled (weekly)
- ✅ Dependabot alerts enabled
- ⚠️  Limited runtime monitoring (acceptable for static site)
- ✅ GitHub Actions logs retained for auditing

**Status:** ✅ **Protected**

**Monitoring Coverage:**
- **Static Analysis**: CodeQL, ESLint Security
- **Dependency Scanning**: npm audit, OWASP Dependency-Check
- **Secret Scanning**: Gitleaks
- **Header Validation**: Automated checks

**Recommendations for Production:**
- Implement error tracking (e.g., Sentry) if deployed
- Add CSP violation reporting
- Monitor console errors in production
- Implement analytics with privacy focus

---

### A10:2021 – Server-Side Request Forgery (SSRF)

**Risk Level:** Low

**Findings:**
- ✅ No server-side request functionality in current codebase
- ✅ Proxy configuration in vite.config.ts is for local development only
- ✅ No user-controllable URLs or fetch requests to external services
- ✅ ESLint security plugin monitors for SSRF patterns

**Status:** ✅ **Protected (N/A)**

**If Backend API is Added:**
- Validate and sanitize all URLs
- Use allowlist for permitted domains
- Disable HTTP redirects or validate redirect targets
- Use network segmentation
- Implement timeout limits for external requests

---

## Security Testing

### Automated Security Scans

The project includes comprehensive automated security scanning:

1. **npm audit** - Dependency vulnerability scanning
2. **OWASP Dependency-Check** - Deep dependency analysis with CVE database
3. **ESLint Security Plugin** - Static code analysis for security issues
4. **Gitleaks** - Secret detection in git history
5. **CodeQL** - Semantic code analysis (separate workflow)
6. **Security Headers Validation** - Verifies security header configuration

### Running Security Scans Locally

```bash
# Dependency vulnerabilities
npm audit

# Detailed audit report
npm audit --json > audit-report.json

# Type checking
npm run lint

# ESLint security scan (requires installing security plugins)
npm install --no-save eslint-plugin-security eslint-plugin-no-unsanitized
npx eslint --config .eslintrc.security.json --ext .js,.jsx,.ts,.tsx src/
```

---

## Security Best Practices

### For Contributors

1. **Never commit secrets**
   - Use `.env` files (gitignored)
   - Use `.env.example` for templates
   - Check with Gitleaks before pushing

2. **Keep dependencies updated**
   - Review Dependabot PRs
   - Run `npm audit` regularly
   - Update dependencies monthly

3. **Follow secure coding practices**
   - Use TypeScript strict mode
   - Validate user input
   - Avoid `dangerouslySetInnerHTML`
   - Use parameterized queries (when backend is added)

4. **Test security changes**
   - Run security scans locally
   - Verify security headers
   - Check for regressions

### Code Examples in Curriculum

All Python code examples in the curriculum include security hardening notes:

- ✅ Input validation
- ✅ Hardware safety warnings
- ✅ Least-privilege GPIO access
- ✅ Proper error handling
- ✅ Safe sensor reading ranges

---

## Vulnerability Disclosure

To report a security vulnerability:

1. **Open a GitHub issue** with the `[SECURITY]` tag
2. **Include:**
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

3. **Response Time:**
   - Acknowledgment within 48 hours
   - Fix target within 7 days for critical issues
   - Fix target within 30 days for non-critical issues

---

## Compliance Status

### OWASP Top 10 (2021) Compliance

| Category | Status | Coverage |
|----------|--------|----------|
| A01: Broken Access Control | ✅ Protected | Security headers |
| A02: Cryptographic Failures | ✅ Protected | No sensitive data transmission |
| A03: Injection | ✅ Protected | Type safety + auto-escaping |
| A04: Insecure Design | ✅ Protected | Security-first architecture |
| A05: Security Misconfiguration | ✅ Protected | Headers + config hardening |
| A06: Vulnerable Components | ✅ Protected | Automated scanning |
| A07: Auth Failures | ✅ Protected (N/A) | No auth system |
| A08: Data Integrity Failures | ✅ Protected | Dependency integrity |
| A09: Logging Failures | ✅ Protected | Automated monitoring |
| A10: SSRF | ✅ Protected (N/A) | No SSRF vectors |

**Overall Security Posture:** ✅ **STRONG**

---

## Recent Security Updates

### 2026-03-21
- ✅ Added comprehensive OWASP Top 10 security scanning workflow
- ✅ Integrated npm audit, OWASP Dependency-Check, Gitleaks
- ✅ Added ESLint security plugin configuration
- ✅ Implemented security headers validation
- ✅ Created security audit documentation

---

## Future Security Enhancements

### Planned Improvements

1. **Content Security Policy (CSP)**
   - Add CSP headers to prevent XSS attacks
   - Configure CSP violation reporting

2. **Subresource Integrity (SRI)**
   - Add SRI hashes for any CDN resources
   - Verify external script integrity

3. **Security.txt**
   - Add security.txt file per RFC 9116
   - Provide security contact information

4. **SBOM (Software Bill of Materials)**
   - Generate SBOM for transparency
   - Track all dependencies

5. **Penetration Testing**
   - Conduct periodic security assessments
   - Implement recommended fixes

---

## Security Contact

For security-related questions or concerns:

- **GitHub Issues**: Tag with `[SECURITY]`
- **Repository**: https://github.com/socks5-sniffer/picklePi
- **Response Time**: Within 48 hours

---

## License

This security audit is part of the picklePi project and is licensed under the MIT License.
