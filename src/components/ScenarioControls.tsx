import React from 'react';

interface ScenarioControlsProps {
    extraPayment: number;
    onExtraPaymentChange: (value: number) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ extraPayment, onExtraPaymentChange }) => {
    const quickOptions = [
        { label: '$0', value: 0 },
        { label: '$100', value: 100 },
        { label: '$250', value: 250 },
        { label: '$500', value: 500 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Extra Payment</h3>

            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                {quickOptions.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onExtraPaymentChange(option.value)}
                        style={{
                            flex: 1,
                            padding: 'var(--space-2) var(--space-3)',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            border: '1px solid',
                            borderColor: extraPayment === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            background: extraPayment === option.value ? 'var(--color-primary)' : 'transparent',
                            color: extraPayment === option.value ? '#fff' : 'var(--color-text-primary)',
                            cursor: 'pointer'
                        }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
