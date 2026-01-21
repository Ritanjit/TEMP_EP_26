/**
 * Authentication API Module
 * 
 * Handles admin authentication using FrontQL.
 * 
 * USAGE:
 * import { login, logout, isAuthenticated } from '@apis/auth';
 * 
 * // Login
 * const result = await login('admin@gcu.edu', 'password123');
 * 
 * // Check if authenticated
 * if (isAuthenticated()) { ... }
 * 
 * // Logout
 * logout();
 */

import Api from './Api';

// Storage keys
const SESSION_KEY = 'euphuism_admin_session';
const USER_KEY = 'euphuism_admin_user';

// Types
export interface AdminUser {
    id: number;
    username: string;
    name: string;
    role: string;
}

export interface LoginResponse {
    err: boolean;
    result: AdminUser | string;
    session?: string;
}

export interface AuthResult {
    success: boolean;
    user?: AdminUser;
    error?: string;
}

/**
 * Login with username and password
 * Uses FrontQL's /auth- prefix for authentication
 */
export async function login(username: string, password: string): Promise<AuthResult> {
    try {
        const response = await Api.post('/auth-euphuism-admin-users', {
            body: { username, password },
            fields: 'id,username,name,role',
        }) as LoginResponse;

        if (response.err) {
            return {
                success: false,
                error: typeof response.result === 'string' ? response.result : 'Invalid credentials',
            };
        }

        // Store session and user data
        if (response.session && typeof response.result === 'object') {
            localStorage.setItem(SESSION_KEY, response.session);
            localStorage.setItem(USER_KEY, JSON.stringify(response.result));

            return {
                success: true,
                user: response.result,
            };
        }

        return {
            success: false,
            error: 'Authentication failed - no session received',
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            error: 'Network error. Please try again.',
        };
    }
}

/**
 * Response type for registration
 */
export interface RegisterResponse {
    err: boolean;
    result: { lastInsertID: number; affectedRows: number } | string;
}

/**
 * Register a new admin user
 * Uses standard POST which auto-hashes the password field in FrontQL
 */
export async function register(
    username: string,
    password: string,
    name: string,
    role: string = 'admin'
): Promise<{ success: boolean; error?: string }> {
    try {
        const response = await Api.post('/euphuism-admin-users', {
            body: { username, password, name, role, is_active: 1 },
        }) as RegisterResponse;

        if (response.err) {
            return {
                success: false,
                error: typeof response.result === 'string' ? response.result : 'Registration failed',
            };
        }

        return { success: true };
    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            error: 'Network error. Please try again.',
        };
    }
}

/**
 * Logout - clears session and user data
 */
export function logout(): void {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_KEY);
}

/**
 * Get current session token
 */
export function getSession(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(SESSION_KEY);
}

/**
 * Get current user data
 */
export function getCurrentUser(): AdminUser | null {
    if (typeof window === 'undefined') return null;

    const userData = localStorage.getItem(USER_KEY);
    if (!userData) return null;

    try {
        return JSON.parse(userData) as AdminUser;
    } catch {
        return null;
    }
}

/**
 * Check if user is authenticated
 * Validates that session exists and hasn't expired
 */
export function isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;

    const session = getSession();
    if (!session) return false;

    // Optional: Check JWT expiry
    try {
        const payload = JSON.parse(atob(session.split('.')[1]));
        const exp = payload.exp;
        if (exp && Date.now() >= exp * 1000) {
            // Session expired, clear it
            logout();
            return false;
        }
    } catch {
        // If JWT parsing fails, assume valid (let server validate)
    }

    return true;
}
