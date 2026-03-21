# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of picklePi seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

1. **Do NOT** open a public GitHub issue for security vulnerabilities
2. **Open a GitHub issue** with the tag `[SECURITY]` and provide:
   - A description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact assessment
   - Suggested fix (if available)

### What to Include

Please include as much of the following information as possible:

- Type of vulnerability (e.g., XSS, SQL injection, authentication bypass)
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit/direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if available)
- Impact of the vulnerability (who could exploit it, what they could gain)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Fix Timeline**:
  - Critical vulnerabilities: 7 days
  - High severity: 14 days
  - Medium/Low severity: 30 days

### Security Update Process

1. Vulnerability is confirmed and assessed
2. Fix is developed and tested
3. Security advisory is prepared
4. Patch is released
5. Security advisory is published

## Security Measures

picklePi implements multiple security layers:

### Automated Security Scanning

- **CodeQL Analysis** - Semantic code analysis for vulnerabilities
- **OWASP Dependency-Check** - Comprehensive dependency vulnerability scanning
- **npm audit** - JavaScript dependency security
- **Gitleaks** - Secret detection in code and git history
- **ESLint Security Plugin** - Static code analysis for security patterns
- **Dependabot** - Automated dependency updates

### Security Best Practices

- ✅ Security headers configured (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ HTTPS enabled in development
- ✅ Source maps disabled in production
- ✅ TypeScript strict mode enabled
- ✅ No user data transmitted to external servers
- ✅ Client-side only data persistence (localStorage)
- ✅ Regular dependency updates
- ✅ Educational content includes security hardening notes

### OWASP Top 10 Coverage

This project addresses all OWASP Top 10 (2021) categories:

- A01:2021 – Broken Access Control
- A02:2021 – Cryptographic Failures
- A03:2021 – Injection
- A04:2021 – Insecure Design
- A05:2021 – Security Misconfiguration
- A06:2021 – Vulnerable and Outdated Components
- A07:2021 – Identification and Authentication Failures
- A08:2021 – Software and Data Integrity Failures
- A09:2021 – Security Logging and Monitoring Failures
- A10:2021 – Server-Side Request Forgery (SSRF)

See [SECURITY_AUDIT.md](SECURITY_AUDIT.md) for detailed coverage information.

## Security Testing

### Running Security Scans Locally

```bash
# Check for dependency vulnerabilities
npm audit

# Run TypeScript type checking
npm run lint

# Install and run ESLint security checks
npm install --no-save eslint-plugin-security eslint-plugin-no-unsanitized
npx eslint --config .eslintrc.security.json --ext .js,.jsx,.ts,.tsx src/
```

### Continuous Security

- Weekly automated OWASP security scans (Mondays at 09:00 UTC)
- Weekly CodeQL analysis (Sundays at 03:27 UTC)
- Automated Dependabot security updates
- Pre-commit checks recommended (but not enforced)

## Known Security Considerations

### Educational Nature

picklePi is an educational platform designed for local use:

- No backend authentication system (localStorage only)
- No user data collection or transmission
- Designed for trusted, local development environment
- Python code examples are for Raspberry Pi educational purposes

### If Deploying to Production

If you fork this project and deploy it publicly, consider:

1. Implementing Content Security Policy (CSP) headers
2. Adding rate limiting on API endpoints
3. Implementing proper authentication if adding user accounts
4. Setting up monitoring and logging
5. Conducting a security audit specific to your deployment

## Security Hall of Fame

We appreciate security researchers who help keep picklePi secure. Contributors who responsibly disclose vulnerabilities will be acknowledged here (with permission).

*Currently empty - be the first!*

## Additional Resources

- [SECURITY_AUDIT.md](SECURITY_AUDIT.md) - Detailed security audit report
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - OWASP security standards
- [npm audit documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [GitHub Security Advisories](https://docs.github.com/en/code-security/security-advisories)

## Contact

For security-related questions:
- Open an issue tagged `[SECURITY]`
- Visit: https://github.com/socks5-sniffer/picklePi

---

**Last Updated:** 2026-03-21
