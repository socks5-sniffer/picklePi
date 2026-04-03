# Security Audit Report — 2026-04-03

## Overview

This document provides a comprehensive security audit of the picklePi project based on a manual source-code review, dependency analysis (`npm audit`), and configuration review conducted on **2026-04-03**.

**Audit Date:** 2026-04-03  
**Project Version:** 1.0.0  
**Auditor:** Automated security review  
**Audit Type:** Manual code review + OWASP Top 10 (2021) + Dependency scan  
**npm audit result:** ✅ 0 known vulnerabilities

---

## Executive Summary

The overall security posture of picklePi remains **STRONG** for a client-side educational application. No critical or high-severity issues were found. Several medium and low-severity observations are documented below with actionable recommendations.

---

## Findings

### FINDING-01 — CSP `unsafe-inline` Weakens XSS Protection

**Severity:** ⚠️ Medium  
**File:** `vite.config.ts` (line 28)

The Content-Security-Policy header is configured with `script-src 'self' 'unsafe-inline'` and `style-src 'self' 'unsafe-inline'`. The `unsafe-inline` directive allows inline `<script>` and `<style>` blocks, which significantly reduces the effectiveness of CSP as an XSS mitigation. An attacker who can inject arbitrary HTML (e.g., via a third-party library vulnerability or a future `dangerouslySetInnerHTML` usage) could execute inline scripts even with CSP enabled.

**Current configuration:**
```typescript
'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; ..."
```

**Recommendation:**  
- For scripts: replace `'unsafe-inline'` with a nonce-based or hash-based approach. Vite supports `vite-plugin-csp` or can be configured with build-time hashes.  
- For styles: Tailwind CSS currently requires `unsafe-inline` at runtime. Consider using the Tailwind CSS Vite plugin's SafeList approach and enabling `style-src 'nonce-...'` once styles are fully extracted at build time.  
- As an immediate improvement, remove `unsafe-inline` from `script-src` since no inline scripts are needed in the built output.

**Status:** ⚠️ Open

---

### FINDING-02 — Security Headers Not Applied in Production Builds

**Severity:** ⚠️ Medium  
**File:** `vite.config.ts` (lines 25–31)

All security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`, `Referrer-Policy`, `Permissions-Policy`) are set under `server.headers`, which only applies during **Vite development server** runs (`npm run dev`). After `npm run build`, the `dist/` folder is a static bundle. These headers must be separately configured on the production hosting environment (e.g., Nginx, Apache, Netlify `_headers`, Vercel `vercel.json`) — they are **not** automatically included in the production output.

**Recommendation:**
- Document clearly in `README.md` or deployment docs that production headers must be manually configured on the hosting layer.
- If deploying to Netlify, add a `public/_headers` file. If using Vercel, add a `vercel.json` with `headers`. Example for Netlify:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'
```

**Status:** ⚠️ Open

---

### FINDING-03 — `connect-src` in CSP is Overly Permissive

**Severity:** 🔵 Low  
**File:** `vite.config.ts` (line 28)

The CSP `connect-src` directive is set to `'self' ws: wss: http: https:`, which allows `fetch()`, `XMLHttpRequest`, and WebSocket connections to **any** HTTP/HTTPS URL on the internet. This removes a key protection layer that would otherwise alert on or block unexpected data exfiltration.

**Recommendation:**  
Tighten `connect-src` to only what is actually needed:
```
connect-src 'self' ws://localhost:* wss://localhost:*
```
If a production API backend is added in the future, explicitly list its origin (e.g., `https://api.picklePi.example.com`).

**Status:** 🔵 Open

---

### FINDING-04 — TypeScript `strict` Mode Not Enabled

**Severity:** 🔵 Low  
**File:** `tsconfig.json`

The TypeScript configuration does not include `"strict": true`. Without strict mode, the following checks are disabled:
- `strictNullChecks` — null/undefined dereference errors are not caught at compile time
- `noImplicitAny` — implicit `any` types are allowed, undermining type safety
- `strictFunctionTypes` — unsound function type assignments are permitted

This is relevant to security because unchecked nulls and implicit `any` can allow malformed or attacker-influenced data to flow through the application without type errors.

**Recommendation:**  
Add `"strict": true` to `tsconfig.json` and resolve the resulting type errors:
```json
{
  "compilerOptions": {
    "strict": true,
    ...
  }
}
```

**Status:** 🔵 Open

---

### FINDING-05 — `@google/genai` Installed but Not Used

**Severity:** 🔵 Low  
**File:** `package.json` (line 31)

The `@google/genai` package (v1.29.0) is listed as a runtime `dependency` but has no import or usage anywhere in the `src/` directory. Unused dependencies increase the attack surface (supply-chain risk) and bundle size, and may mislead reviewers into thinking AI features are active.

**Recommendation:**  
- Remove the dependency with `npm uninstall @google/genai` if the Gemini AI integration is not yet implemented.  
- If it is planned, move it to a feature branch and document the intended integration path and required secret handling (`GEMINI_API_KEY`).

**Status:** 🔵 Open

---

### FINDING-06 — Backend Dependencies (`express`, `better-sqlite3`) in Production `dependencies`

**Severity:** 🔵 Low  
**File:** `package.json` (lines 34–35)

`express` (v5.2.1) and `better-sqlite3` (v12.8.0) are listed under `dependencies` (runtime). The application is currently a pure client-side React/Vite app. Bundling unused server-side packages:
- Unnecessarily increases the surface area for future vulnerability disclosures
- Signals intent without implementation, which can confuse security reviewers
- Vite will attempt to bundle or warn about these Node.js-only packages if imported

**Recommendation:**  
If backend work has not started, move these to `devDependencies` or remove them entirely. If a backend is actively being developed in a separate file (e.g., `server.ts`), ensure it is excluded from the Vite frontend bundle via `build.rollupOptions.external`.

**Status:** 🔵 Open

---

### FINDING-07 — No Runtime Schema Validation of `localStorage` Data

**Severity:** 🔵 Low  
**File:** `src/App.tsx` (lines 23–27)

`localStorage` data is parsed with `JSON.parse()` and used directly as `UserProgress` without any runtime schema validation:

```typescript
const saved = localStorage.getItem('rpi-lab-progress');
return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
```

While the try/catch handles JSON parse failures, it does not guard against a structurally-valid JSON object that doesn't match the `UserProgress` shape (e.g., missing fields, unexpected types). In a cross-origin scenario or if a browser extension manipulates localStorage, malformed data could cause runtime errors downstream.

**Recommendation:**  
Add lightweight shape validation after parsing:
```typescript
function isValidProgress(data: unknown): data is UserProgress {
  return (
    typeof data === 'object' && data !== null &&
    'projectStatuses' in data &&
    'badges' in data &&
    'labNotebook' in data
  );
}
const parsed = JSON.parse(saved);
return isValidProgress(parsed) ? parsed : INITIAL_PROGRESS;
```

**Status:** 🔵 Open

---

### FINDING-08 — `ProjectView` Rendered Without React `key` (State Leakage Between Projects)

**Severity:** 🔵 Low  
**File:** `src/App.tsx` (lines 144–150)

`<ProjectView>` is rendered without a `key` prop:
```tsx
{activeTab === 'curriculum' && (
  <ProjectView
    project={activeProject}
    ...
  />
)}
```

Because React reuses component instances when no key changes, internal state in `ProjectView` (e.g., current page index, completed hardware steps) persists when the user switches between projects on the curriculum tab. A user could accidentally submit a lab entry for the wrong project if they switch projects mid-flow.

**Recommendation:**  
Add `key={activeProject.id}` to `<ProjectView>` so that switching projects triggers a full remount and resets all internal state:
```tsx
<ProjectView
  key={activeProject.id}
  project={activeProject}
  ...
/>
```

**Status:** 🔵 Open

---

## Dependency Scan Results

**Tool:** `npm audit`  
**Date:** 2026-04-03  
**Result:** ✅ **0 vulnerabilities found** (0 critical, 0 high, 0 moderate, 0 low)

All declared dependencies are free of known CVEs in the npm advisory database as of the audit date.

---

## Summary Table

| ID | Title | Severity | Status |
|----|-------|----------|--------|
| FINDING-01 | CSP `unsafe-inline` weakens XSS protection | ⚠️ Medium | Open |
| FINDING-02 | Security headers not applied in production | ⚠️ Medium | Open |
| FINDING-03 | `connect-src` overly permissive | 🔵 Low | Open |
| FINDING-04 | TypeScript strict mode not enabled | 🔵 Low | Open |
| FINDING-05 | `@google/genai` unused dependency | 🔵 Low | Open |
| FINDING-06 | Backend deps in production `dependencies` | 🔵 Low | Open |
| FINDING-07 | No runtime localStorage schema validation | 🔵 Low | Open |
| FINDING-08 | `ProjectView` missing React key | 🔵 Low | Open |

**Critical/High findings:** 0  
**Medium findings:** 2  
**Low findings:** 6  
**Overall posture:** ✅ **STRONG** (no blocking issues; all findings are improvements)

---

---

# Security Audit Report

## Overview

This document provides a comprehensive security audit of the picklePi project, covering OWASP Top 10 vulnerabilities and mitigation strategies.

**Last Updated:** 2026-03-21  
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
