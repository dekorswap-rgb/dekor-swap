import DOMPurify from 'isomorphic-dompurify';

/**
 * Security utility functions for input sanitization and validation
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param dirty - Untrusted HTML string
 * @returns Sanitized HTML string
 */
export function sanitizeHTML(dirty: string): string {
    return DOMPurify.sanitize(dirty, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
        ALLOWED_ATTR: ['href', 'target'],
    });
}

/**
 * Sanitize plain text input (removes all HTML tags)
 * @param input - Untrusted text input
 * @returns Sanitized plain text
 */
export function sanitizeText(input: string): string {
    return DOMPurify.sanitize(input, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
    });
}

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns true if valid email format
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate phone number (international format)
 * @param phone - Phone number to validate
 * @returns true if valid phone format
 */
export function isValidPhone(phone: string): boolean {
    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, '');
    // Check if it's between 10-15 digits (international standard)
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

/**
 * Sanitize and validate name input
 * @param name - Name string to validate
 * @returns Sanitized name or null if invalid
 */
export function sanitizeName(name: string): string | null {
    const sanitized = sanitizeText(name).trim();

    // Name should be 2-100 characters, letters, spaces, hyphens, apostrophes only
    const nameRegex = /^[a-zA-Z\s'-]{2,100}$/;

    if (!nameRegex.test(sanitized)) {
        return null;
    }

    return sanitized;
}

/**
 * Sanitize and validate message/comment input
 * @param message - Message string to sanitize
 * @param maxLength - Maximum allowed length (default 5000)
 * @returns Sanitized message or null if invalid
 */
export function sanitizeMessage(message: string, maxLength: number = 5000): string | null {
    const sanitized = sanitizeText(message).trim();

    if (sanitized.length === 0 || sanitized.length > maxLength) {
        return null;
    }

    return sanitized;
}

/**
 * Sanitize URL to prevent javascript: and data: URIs
 * @param url - URL string to sanitize
 * @returns Sanitized URL or null if invalid
 */
export function sanitizeURL(url: string): string | null {
    try {
        const parsed = new URL(url);

        // Only allow http and https protocols
        if (!['http:', 'https:'].includes(parsed.protocol)) {
            return null;
        }

        return parsed.toString();
    } catch {
        return null;
    }
}

/**
 * Escape special characters for safe display
 * @param text - Text to escape
 * @returns Escaped text
 */
export function escapeHTML(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    };

    return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Validate and sanitize form data
 * @param data - Form data object
 * @returns Sanitized data or null if validation fails
 */
export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

export function validateContactForm(data: ContactFormData): ContactFormData | null {
    const sanitizedName = sanitizeName(data.name);
    const sanitizedMessage = sanitizeMessage(data.message);

    if (!sanitizedName) {
        throw new Error('Invalid name format');
    }

    if (!isValidEmail(data.email)) {
        throw new Error('Invalid email format');
    }

    if (data.phone && !isValidPhone(data.phone)) {
        throw new Error('Invalid phone format');
    }

    if (!sanitizedMessage) {
        throw new Error('Invalid message format or length');
    }

    return {
        name: sanitizedName,
        email: sanitizeText(data.email).toLowerCase(),
        phone: data.phone ? sanitizeText(data.phone) : undefined,
        message: sanitizedMessage,
    };
}

/**
 * Generate a simple CSRF token (client-side only, for basic protection)
 * For production, use server-side token generation
 */
export function generateCSRFToken(): string {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

/**
 * Store CSRF token in sessionStorage
 */
export function storeCSRFToken(token: string): void {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('csrf_token', token);
    }
}

/**
 * Retrieve CSRF token from sessionStorage
 */
export function getCSRFToken(): string | null {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem('csrf_token');
    }
    return null;
}
