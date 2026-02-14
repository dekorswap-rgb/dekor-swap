# Security Policy

## Overview

DekorSwap takes security seriously. This document outlines the security measures implemented to protect our users and the application.

## Security Measures Implemented

### 1. Security Headers

All pages include the following security headers (configured in `next.config.ts`):

#### Content Security Policy (CSP)
Prevents XSS attacks by controlling which resources can be loaded:
- Scripts: Only from same origin and Vercel Live
- Styles: Same origin + Google Fonts
- Images: Same origin + data URIs + HTTPS/HTTP
- Fonts: Same origin + Google Fonts
- Connections: Same origin + Vercel Live + WebSocket
- Frames: Same origin + Vercel Live
- Objects: Blocked
- Forms: Same origin only

#### X-Frame-Options
- Value: `SAMEORIGIN`
- Prevents clickjacking attacks by disallowing the site to be embedded in iframes from other domains

#### X-Content-Type-Options
- Value: `nosniff`
- Prevents MIME type sniffing

#### Strict-Transport-Security (HSTS)
- Value: `max-age=63072000; includeSubDomains; preload`
- Enforces HTTPS connections for 2 years

#### Referrer-Policy
- Value: `strict-origin-when-cross-origin`
- Controls referrer information sent with requests

#### Permissions-Policy
- Disables: camera, microphone, geolocation, interest-cohort (FLoC)

### 2. Input Sanitization

All user inputs are sanitized using DOMPurify (`src/lib/security.ts`):

- **HTML Sanitization**: Removes dangerous HTML tags and attributes
- **Text Sanitization**: Strips all HTML from plain text inputs
- **Email Validation**: RFC-compliant email format validation
- **Phone Validation**: International phone number format (10-15 digits)
- **Name Validation**: Letters, spaces, hyphens, apostrophes only (2-100 chars)
- **Message Validation**: Plain text with configurable max length
- **URL Sanitization**: Only allows http/https protocols

### 3. Rate Limiting

Client-side rate limiting prevents spam and abuse (`src/lib/rateLimiter.ts`):

| Action | Max Attempts | Time Window |
|--------|--------------|-------------|
| Contact Form | 3 | 5 minutes |
| Newsletter | 2 | 10 minutes |
| Quiz Submission | 10 | 1 minute |

Features:
- Automatic cleanup of expired entries
- User-friendly error messages with countdown
- Remaining attempts tracking

### 4. Form Validation

Contact form includes comprehensive validation:
- Required field checks
- Email format validation
- Name format validation (no special characters)
- Message length limits (max 5000 characters)
- Subject length limits (3-200 characters)
- Sanitization before submission

### 5. CSRF Protection

Basic CSRF token generation for client-side protection:
- Tokens stored in sessionStorage
- Generated using crypto.getRandomValues
- **Note**: For production, implement server-side CSRF protection

## Best Practices

### For Developers

1. **Never commit sensitive data**
   - Use `.env.local` for secrets
   - Add `.env.local` to `.gitignore`
   - Use `.env.local.example` as template

2. **Always sanitize user input**
   ```typescript
   import { sanitizeText, validateContactForm } from '@/lib/security';
   const clean = sanitizeText(userInput);
   ```

3. **Check rate limits before processing**
   ```typescript
   import { checkRateLimit } from '@/lib/rateLimiter';
   const { isAllowed } = checkRateLimit('CONTACT_FORM');
   ```

4. **Validate on both client and server**
   - Client-side for UX
   - Server-side for security

### For Production Deployment

1. **Enable HTTPS**
   - Required for HSTS header
   - Use SSL/TLS certificates
   - Redirect HTTP to HTTPS

2. **Environment Variables**
   - Set all production environment variables
   - Use strong, random secrets
   - Rotate secrets regularly

3. **Server-Side Security**
   - Implement server-side rate limiting
   - Add CAPTCHA to contact forms
   - Use server-side CSRF tokens
   - Implement proper session management

4. **Monitoring**
   - Set up error logging
   - Monitor for suspicious activity
   - Track rate limit violations
   - Regular security audits

## Known Limitations

### Client-Side Rate Limiting
- Can be bypassed by clearing browser storage
- **Solution**: Implement server-side rate limiting in production

### Static Export
- No server-side processing
- Limited to client-side security
- **Solution**: Use API routes or serverless functions for sensitive operations

### EmailJS Public Keys
- Public keys are exposed in client code
- **Solution**: Implement backend API for email sending in production

## Reporting Security Issues

If you discover a security vulnerability, please email: **dekorswap@gmail.com**

**Please do NOT:**
- Open public GitHub issues for security vulnerabilities
- Disclose the vulnerability publicly before it's fixed

## Security Checklist

### Development
- [x] Input sanitization implemented
- [x] Rate limiting implemented
- [x] Security headers configured
- [x] Form validation implemented
- [x] Environment variables template created

### Pre-Production
- [ ] Server-side rate limiting
- [ ] CAPTCHA integration
- [ ] Server-side CSRF protection
- [ ] API routes for sensitive operations
- [ ] Error logging and monitoring

### Production
- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] Security headers verified
- [ ] Rate limiting tested
- [ ] Regular security audits scheduled

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)

## Updates

This security policy is reviewed and updated regularly. Last updated: February 2026
