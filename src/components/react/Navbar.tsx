/**
 * Navbar.tsx - React Navigation Component
 * 
 * Interactive navigation bar with mobile menu.
 * This is a REACT ISLAND for the hamburger menu functionality.
 * 
 * USAGE in layouts:
 * import Navbar from '@components/react/Navbar';
 * <Navbar client:load />
 */

import { useState } from 'react';

interface NavLink {
    label: string;
    href: string;
}

const navLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'Sponsors', href: '/sponsors' },
    { label: 'WebDev Team', href: '/webdev' },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="navbar fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-dark)]/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="logo text-xl font-bold gradient-text">
                    Euphuism 2026
                </a>

                {/* Desktop Navigation */}
                <div className="nav-links hidden md:flex gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-white/70 hover:text-white transition"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="mobile-menu md:hidden bg-[var(--color-bg-card)] px-4 py-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="block py-3 text-white/70 hover:text-white transition border-b border-white/10"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}
