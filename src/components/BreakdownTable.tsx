import React from 'react';
import type { ComparisonResult } from '../logic/debtCalculations';

interface BreakdownTableProps {
    result: ComparisonResult;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val);
};

const formatTime = (months: number) => {
    if (months === 0) return '0 months';
    if (months >= 600) return '50+ years';
    const years = Math.floor(months / 12);
    const remainingMonths = Math.round(months % 12);
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years, ${remainingMonths} months`;
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const snowballRows = [
        { label: 'Estimated Months to Payoff', value: formatTime(result.snowball.monthsToPayoff) },
        { label: 'Estimated Total Interest', value: formatMoney(result.snowball.totalInterestPaid) },
        { label: 'Estimated Total Paid', value: formatMoney(result.snowball.totalPaid), isTotal: true },
    ];

    const avalancheRows = [
        { label: 'Estimated Months to Payoff', value: formatTime(result.avalanche.monthsToPayoff) },
        { label: 'Estimated Total Interest', value: formatMoney(result.avalanche.totalInterestPaid) },
        { label: 'Estimated Total Paid', value: formatMoney(result.avalanche.totalPaid), isTotal: true },
    ];

    const renderTable = (rows: Array<{ label: string; value: string; isTotal?: boolean }>) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} style={{
                        borderBottom: idx === rows.length - 1 ? 'none' : '1px solid var(--color-border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                    }}>
                        <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                            {row.label}
                        </td>
                        <td style={{
                            padding: 'var(--space-3) var(--space-6)',
                            textAlign: 'right',
                            fontWeight: row.isTotal ? 700 : 400,
                            color: row.isTotal ? 'var(--color-primary)' : 'inherit'
                        }}>
                            {row.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Snowball Strategy */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Snowball Strategy</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                    Pay smallest balance first
                </p>
            </div>
            {renderTable(snowballRows)}

            {/* Avalanche Strategy */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F8FAFC' }}>
                <h3 style={{ fontSize: '1rem' }}>Avalanche Strategy</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                    Pay highest interest rate first
                </p>
            </div>
            {renderTable(avalancheRows)}

            {/* Payoff Order */}
            {result.avalanche.payoffOrder.length > 0 && (
                <>
                    <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F0FDF4' }}>
                        <h3 style={{ fontSize: '1rem', color: '#166534' }}>Avalanche Payment Order</h3>
                    </div>
                    <div style={{ padding: 'var(--space-4) var(--space-6)' }}>
                        <ol style={{ margin: 0, paddingLeft: 'var(--space-5)', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                            {result.avalanche.payoffOrder.map((name, idx) => (
                                <li key={idx} style={{ marginBottom: 'var(--space-1)' }}>
                                    {name || `Debt ${idx + 1}`}
                                </li>
                            ))}
                        </ol>
                    </div>
                </>
            )}
        </div>
    );
};
