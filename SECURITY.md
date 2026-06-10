# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security of picklePi seriously. If you discover a security vulnerability, please **do not disclose it publicly**.

### Private Reporting

Please report suspected vulnerabilities privately using one of the following channels:

- **GitHub Private Vulnerability Reporting** (preferred), if enabled for this repository
- **Repository security contact email**, if one is listed by the maintainers

If neither private reporting channel is available, contact the maintainers privately before sharing details publicly.

### What to Include

Please include as much of the following information as possible:

- A clear description of the vulnerability
- Type of vulnerability (for example: XSS, injection, authentication bypass)
- Full paths of affected source file(s)
- The affected version, branch, tag, or commit
- Step-by-step reproduction instructions
- Proof-of-concept or exploit code, if available
- Expected impact and potential severity
- Any suggested remediation, if known

### What Not to Do

- **Do not** open a public GitHub issue for security vulnerabilities
- **Do not** post proof-of-concept details in public discussions, issues, or pull requests
- **Do not** publicly disclose the vulnerability until the maintainers have investigated and released a fix or advisory

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Fix Timeline**:
  - Critical vulnerabilities: 7 days
  - High severity: 14 days
  - Medium/Low severity: 30 days

### Security Update Process

1. Vulnerability is received through a private reporting channel
2. Report is confirmed and assessed
3. Fix is developed and tested
4. Security advisory is prepared
5. Patch is released
6. Public disclosure occurs when it is safe to do so

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

For security-related reports, please use a **private disclosure channel** rather than public issues.

If maintainers publish a security contact method or enable private vulnerability reporting, use that channel for all vulnerability reports.

---

**Last Updated:** 2026-06-09
