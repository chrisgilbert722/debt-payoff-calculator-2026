import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                © 2026 Debt Payoff Calculator. For informational purposes only.
            </p>
        </footer>
    );
};
