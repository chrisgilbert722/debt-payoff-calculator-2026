export interface Debt {
    id: string;
    name: string;
    balance: number;
    apr: number;
    minimumPayment: number;
}

export interface DebtInput {
    debts: Debt[];
    extraPayment: number;
}

export interface StrategyResult {
    monthsToPayoff: number;
    totalInterestPaid: number;
    totalPaid: number;
    payoffOrder: string[];
}

export interface ComparisonResult {
    snowball: StrategyResult;
    avalanche: StrategyResult;
    interestSavings: number; // Positive = avalanche saves money
    timeDifference: number; // Positive = avalanche is faster
    recommendedStrategy: 'snowball' | 'avalanche' | 'same';
}

export function calculateComparison(input: DebtInput): ComparisonResult {
    const snowball = simulatePayoff(input.debts, input.extraPayment, 'snowball');
    const avalanche = simulatePayoff(input.debts, input.extraPayment, 'avalanche');

    const interestSavings = snowball.totalInterestPaid - avalanche.totalInterestPaid;
    const timeDifference = snowball.monthsToPayoff - avalanche.monthsToPayoff;

    let recommendedStrategy: 'snowball' | 'avalanche' | 'same';
    if (interestSavings > 10) {
        recommendedStrategy = 'avalanche';
    } else if (interestSavings < -10) {
        recommendedStrategy = 'snowball';
    } else {
        recommendedStrategy = 'same';
    }

    return {
        snowball,
        avalanche,
        interestSavings,
        timeDifference,
        recommendedStrategy
    };
}

function simulatePayoff(
    debts: Debt[],
    extraPayment: number,
    strategy: 'snowball' | 'avalanche'
): StrategyResult {
    if (debts.length === 0) {
        return {
            monthsToPayoff: 0,
            totalInterestPaid: 0,
            totalPaid: 0,
            payoffOrder: []
        };
    }

    // Clone debts to avoid mutation
    let activeDebts = debts.map(d => ({
        ...d,
        currentBalance: d.balance
    }));

    // Sort based on strategy
    if (strategy === 'snowball') {
        // Smallest balance first
        activeDebts.sort((a, b) => a.currentBalance - b.currentBalance);
    } else {
        // Highest APR first
        activeDebts.sort((a, b) => b.apr - a.apr);
    }

    const payoffOrder: string[] = [];
    let totalInterestPaid = 0;
    let totalPaid = 0;
    let months = 0;
    const maxMonths = 600; // 50 year cap

    while (activeDebts.some(d => d.currentBalance > 0.01) && months < maxMonths) {
        months++;

        // Available extra payment this month
        let availableExtra = extraPayment;

        // Process each debt
        for (const debt of activeDebts) {
            if (debt.currentBalance <= 0.01) continue;

            // Calculate interest for this month
            const monthlyRate = debt.apr / 100 / 12;
            const interestCharge = debt.currentBalance * monthlyRate;
            totalInterestPaid += interestCharge;

            // Add interest to balance
            debt.currentBalance += interestCharge;

            // Calculate payment for this debt
            let payment = Math.min(debt.minimumPayment, debt.currentBalance);

            // If this is the target debt (first in sorted order with balance), apply extra
            const targetDebt = activeDebts.find(d => d.currentBalance > 0.01);
            if (debt.id === targetDebt?.id && availableExtra > 0) {
                const extraToApply = Math.min(availableExtra, debt.currentBalance - payment);
                payment += extraToApply;
                availableExtra -= extraToApply;
            }

            // Apply payment
            debt.currentBalance -= payment;
            totalPaid += payment;

            // Check if paid off
            if (debt.currentBalance <= 0.01 && !payoffOrder.includes(debt.name)) {
                payoffOrder.push(debt.name);
                debt.currentBalance = 0;
            }
        }

        // Re-sort after each month to handle tied priorities
        if (strategy === 'snowball') {
            activeDebts.sort((a, b) => a.currentBalance - b.currentBalance);
        } else {
            activeDebts.sort((a, b) => b.apr - a.apr);
        }
    }

    return {
        monthsToPayoff: months,
        totalInterestPaid,
        totalPaid,
        payoffOrder
    };
}

export function generateDebtId(): string {
    return Math.random().toString(36).substring(2, 9);
}

export function createEmptyDebt(): Debt {
    return {
        id: generateDebtId(),
        name: '',
        balance: 0,
        apr: 0,
        minimumPayment: 0
    };
}
