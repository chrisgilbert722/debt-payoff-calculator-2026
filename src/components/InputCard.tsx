import React from 'react';
import type { Debt, DebtInput } from '../logic/debtCalculations';
import { createEmptyDebt } from '../logic/debtCalculations';

interface InputCardProps {
    values: DebtInput;
    onDebtsChange: (debts: Debt[]) => void;
    onExtraPaymentChange: (value: number) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onDebtsChange, onExtraPaymentChange }) => {
    const handleDebtChange = (id: string, field: keyof Debt, value: string | number) => {
        const updatedDebts = values.debts.map(debt =>
            debt.id === id ? { ...debt, [field]: value } : debt
        );
        onDebtsChange(updatedDebts);
    };

    const addDebt = () => {
        const newDebt = createEmptyDebt();
        newDebt.name = `Debt ${values.debts.length + 1}`;
        onDebtsChange([...values.debts, newDebt]);
    };

    const removeDebt = (id: string) => {
        if (values.debts.length > 1) {
            onDebtsChange(values.debts.filter(d => d.id !== id));
        }
    };

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Your Debts</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {values.debts.map((debt, index) => (
                    <div
                        key={debt.id}
                        style={{
                            padding: 'var(--space-4)',
                            background: '#F8FAFC',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                Debt {index + 1}
                            </span>
                            {values.debts.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeDebt(debt.id)}
                                    style={{
                                        padding: 'var(--space-1) var(--space-2)',
                                        fontSize: '0.75rem',
                                        color: '#DC2626',
                                        background: 'transparent',
                                        border: '1px solid #DC2626',
                                        borderRadius: 'var(--radius-sm)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Remove
                                </button>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label htmlFor={`name-${debt.id}`}>Name (optional)</label>
                                <input
                                    type="text"
                                    id={`name-${debt.id}`}
                                    value={debt.name}
                                    onChange={(e) => handleDebtChange(debt.id, 'name', e.target.value)}
                                    placeholder="Credit Card, Car Loan..."
                                />
                            </div>
                            <div>
                                <label htmlFor={`balance-${debt.id}`}>Balance ($)</label>
                                <input
                                    type="number"
                                    id={`balance-${debt.id}`}
                                    value={debt.balance || ''}
                                    onChange={(e) => handleDebtChange(debt.id, 'balance', parseFloat(e.target.value) || 0)}
                                    min="0"
                                    step="100"
                                />
                            </div>
                            <div>
                                <label htmlFor={`apr-${debt.id}`}>APR (%)</label>
                                <input
                                    type="number"
                                    id={`apr-${debt.id}`}
                                    value={debt.apr || ''}
                                    onChange={(e) => handleDebtChange(debt.id, 'apr', parseFloat(e.target.value) || 0)}
                                    min="0"
                                    max="50"
                                    step="0.1"
                                />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label htmlFor={`minPayment-${debt.id}`}>Minimum Payment ($)</label>
                                <input
                                    type="number"
                                    id={`minPayment-${debt.id}`}
                                    value={debt.minimumPayment || ''}
                                    onChange={(e) => handleDebtChange(debt.id, 'minimumPayment', parseFloat(e.target.value) || 0)}
                                    min="0"
                                    step="10"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addDebt}
                    style={{
                        padding: 'var(--space-3)',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: 'var(--color-primary)',
                        background: 'transparent',
                        border: '1px dashed var(--color-border-strong)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer'
                    }}
                >
                    + Add Another Debt
                </button>

                {/* Extra Payment */}
                <div style={{ marginTop: 'var(--space-2)' }}>
                    <label htmlFor="extraPayment">Monthly Extra Payment ($)</label>
                    <input
                        type="number"
                        id="extraPayment"
                        value={values.extraPayment || ''}
                        onChange={(e) => onExtraPaymentChange(parseFloat(e.target.value) || 0)}
                        min="0"
                        step="50"
                        placeholder="0"
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                        Additional amount above minimum payments
                    </p>
                </div>
            </div>
        </div>
    );
};
