import React from 'react';

interface AdContainerProps {
    slotId: string;
    sticky?: boolean;
}

export const AdContainer: React.FC<AdContainerProps> = ({ slotId: _slotId, sticky = false }) => {
    if (sticky) {
        return (
            <div
                className="ad-container"
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50px',
                    background: '#F1F5F9',
                    borderTop: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}
            >
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                    Advertisement
                </span>
            </div>
        );
    }

    return (
        <div
            className="ad-container"
            style={{
                height: '100px',
                background: '#F1F5F9',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                Advertisement
            </span>
        </div>
    );
};
