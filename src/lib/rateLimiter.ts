/**
 * Simple client-side rate limiter to prevent spam and abuse
 */

interface RateLimitEntry {
    count: number;
    firstAttempt: number;
    lastAttempt: number;
}

class RateLimiter {
    private limits: Map<string, RateLimitEntry> = new Map();
    private readonly cleanupInterval: number = 60000; // 1 minute

    constructor() {
        // Cleanup old entries periodically
        if (typeof window !== 'undefined') {
            setInterval(() => this.cleanup(), this.cleanupInterval);
        }
    }

    /**
     * Check if an action is rate limited
     * @param key - Unique identifier for the action (e.g., 'contact-form', 'newsletter')
     * @param maxAttempts - Maximum number of attempts allowed
     * @param windowMs - Time window in milliseconds
     * @returns true if action is allowed, false if rate limited
     */
    public check(key: string, maxAttempts: number = 3, windowMs: number = 60000): boolean {
        const now = Date.now();
        const entry = this.limits.get(key);

        if (!entry) {
            // First attempt
            this.limits.set(key, {
                count: 1,
                firstAttempt: now,
                lastAttempt: now,
            });
            return true;
        }

        // Check if window has expired
        if (now - entry.firstAttempt > windowMs) {
            // Reset the window
            this.limits.set(key, {
                count: 1,
                firstAttempt: now,
                lastAttempt: now,
            });
            return true;
        }

        // Check if limit exceeded
        if (entry.count >= maxAttempts) {
            return false;
        }

        // Increment count
        entry.count++;
        entry.lastAttempt = now;
        this.limits.set(key, entry);
        return true;
    }

    /**
     * Get remaining attempts for a key
     * @param key - Unique identifier for the action
     * @param maxAttempts - Maximum number of attempts allowed
     * @returns Number of remaining attempts
     */
    public getRemainingAttempts(key: string, maxAttempts: number = 3): number {
        const entry = this.limits.get(key);
        if (!entry) {
            return maxAttempts;
        }
        return Math.max(0, maxAttempts - entry.count);
    }

    /**
     * Get time until rate limit resets
     * @param key - Unique identifier for the action
     * @param windowMs - Time window in milliseconds
     * @returns Milliseconds until reset, or 0 if not rate limited
     */
    public getTimeUntilReset(key: string, windowMs: number = 60000): number {
        const entry = this.limits.get(key);
        if (!entry) {
            return 0;
        }

        const elapsed = Date.now() - entry.firstAttempt;
        const remaining = windowMs - elapsed;
        return Math.max(0, remaining);
    }

    /**
     * Reset rate limit for a specific key
     * @param key - Unique identifier for the action
     */
    public reset(key: string): void {
        this.limits.delete(key);
    }

    /**
     * Clear all rate limits
     */
    public clearAll(): void {
        this.limits.clear();
    }

    /**
     * Cleanup expired entries
     */
    private cleanup(): void {
        const now = Date.now();
        const maxAge = 300000; // 5 minutes

        for (const [key, entry] of this.limits.entries()) {
            if (now - entry.lastAttempt > maxAge) {
                this.limits.delete(key);
            }
        }
    }
}

// Export singleton instance
export const rateLimiter = new RateLimiter();

/**
 * Rate limit configurations for different actions
 */
export const RATE_LIMITS = {
    CONTACT_FORM: {
        maxAttempts: 3,
        windowMs: 300000, // 5 minutes
        key: 'contact-form',
    },
    NEWSLETTER: {
        maxAttempts: 2,
        windowMs: 600000, // 10 minutes
        key: 'newsletter',
    },
    QUIZ_SUBMISSION: {
        maxAttempts: 10,
        windowMs: 60000, // 1 minute
        key: 'quiz-submission',
    },
} as const;

/**
 * Helper function to check rate limit with predefined config
 * @param action - Action type from RATE_LIMITS
 * @returns Object with isAllowed flag and remaining attempts
 */
export function checkRateLimit(action: keyof typeof RATE_LIMITS): {
    isAllowed: boolean;
    remaining: number;
    resetIn: number;
} {
    const config = RATE_LIMITS[action];
    const isAllowed = rateLimiter.check(config.key, config.maxAttempts, config.windowMs);
    const remaining = rateLimiter.getRemainingAttempts(config.key, config.maxAttempts);
    const resetIn = rateLimiter.getTimeUntilReset(config.key, config.windowMs);

    return {
        isAllowed,
        remaining,
        resetIn,
    };
}

/**
 * Format time until reset in human-readable format
 * @param ms - Milliseconds
 * @returns Formatted string
 */
export function formatResetTime(ms: number): string {
    const seconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
        return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
}
