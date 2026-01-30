import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This calculator compares the debt snowball and debt avalanche repayment strategies.
                The snowball method prioritizes paying off the smallest balances first, while the
                avalanche method targets the highest interest rates first. Enter your debts to see
                estimated payoff timelines and total interest for each approach. These figures are
                estimates only based on the information provided. Results do not account for changes
                in interest rates or payment amounts over time.
            </p>
        </div>
    );
};
