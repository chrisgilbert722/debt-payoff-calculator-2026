import React from 'react';
import type { ComparisonResult } from '../logic/debtCalculations';

interface ResultsPanelProps {
    result: ComparisonResult;
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(val);
};

const formatTime = (months: number) => {
    if (months === 0) return '0 months';
    const years = Math.floor(months / 12);
    const remainingMonths = Math.round(months % 12);
    if (years === 0) return `${remainingMonths} mo`;
    if (remainingMonths === 0) return `${years} yr`;
    return `${years} yr ${remainingMonths} mo`;
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
    const savingsAmount = Math.abs(result.interestSavings);
    const avalancheWins = result.interestSavings > 0;

    return (
        <div className="card" style={{ background: 'linear-gradient(to bottom, #F0F9FF, #E8F4FD)', borderColor: '#93C5FD', boxShadow: '0 2px 8px -2px rgba(14, 165, 233, 0.15)' }}>
            <div className="text-center">
                <h2 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Estimated Interest Savings with {avalancheWins ? 'Avalanche' : 'Snowball'}
                </h2>
                <div style={{ fontSize: '2.75rem', fontWeight: 800, color: '#0C4A6E', lineHeight: 1, letterSpacing: '-0.025em' }}>
                    {formatCurrency(savingsAmount)}
                </div>
                {result.recommendedStrategy === 'same' && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                        Both strategies yield similar results
                    </p>
                )}
            </div>

            <hr style={{ margin: 'var(--space-6) 0', border: 'none', borderTop: '1px solid #93C5FD' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>SNOWBALL</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{formatTime(result.snowball.monthsToPayoff)}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        {formatCurrency(result.snowball.totalInterestPaid)} interest
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: 'var(--space-1)' }}>AVALANCHE</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: avalancheWins ? 'var(--color-accent)' : 'inherit' }}>
                        {formatTime(result.avalanche.monthsToPayoff)}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        {formatCurrency(result.avalanche.totalInterestPaid)} interest
                    </div>
                </div>
            </div>
        </div>
    );
};
