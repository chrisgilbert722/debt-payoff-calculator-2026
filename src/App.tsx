import { useState } from 'react';
import { Header } from './components/Header';
import { InputCard } from './components/InputCard';
import { ResultsPanel } from './components/ResultsPanel';
import { ScenarioControls } from './components/ScenarioControls';
import { AdContainer } from './components/AdContainer';
import { BreakdownTable } from './components/BreakdownTable';
import { SEOText } from './components/SEOText';
import { Footer } from './components/Footer';
import { calculateComparison, generateDebtId } from './logic/debtCalculations';
import type { Debt, DebtInput } from './logic/debtCalculations';

function App() {
  const [values, setValues] = useState<DebtInput>({
    debts: [
      { id: generateDebtId(), name: 'Credit Card', balance: 5000, apr: 22.99, minimumPayment: 150 },
      { id: generateDebtId(), name: 'Car Loan', balance: 12000, apr: 6.5, minimumPayment: 300 },
      { id: generateDebtId(), name: 'Student Loan', balance: 25000, apr: 5.5, minimumPayment: 200 },
    ],
    extraPayment: 200
  });

  const handleDebtsChange = (debts: Debt[]) => {
    setValues(prev => ({ ...prev, debts }));
  };

  const handleExtraPaymentChange = (extraPayment: number) => {
    setValues(prev => ({ ...prev, extraPayment }));
  };

  const result = calculateComparison(values);

  return (
    <>
      <main style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>

        {/* 1) HEADER */}
        <Header />

        {/* 2) INPUT CARD */}
        <InputCard
          values={values}
          onDebtsChange={handleDebtsChange}
          onExtraPaymentChange={handleExtraPaymentChange}
        />

        {/* 3) RESULTS PANEL */}
        <ResultsPanel result={result} />

        {/* 4) SCENARIO CONTROLS */}
        <ScenarioControls
          extraPayment={values.extraPayment}
          onExtraPaymentChange={handleExtraPaymentChange}
        />

        {/* 5) NATIVE AD */}
        <AdContainer slotId="native-slot-placeholder" sticky={false} />

        {/* 6) BREAKDOWN TABLE */}
        <BreakdownTable result={result} />

        {/* 7) SEO TEXT */}
        <SEOText />

        {/* 8) FOOTER */}
        <Footer />

        {/* 9) STICKY FOOTER AD */}
        <AdContainer slotId="sticky-footer-placeholder" sticky={true} />

      </main>
    </>
  );
}

export default App;
