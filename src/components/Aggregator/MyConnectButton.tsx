import { ConnectButton } from '@rainbow-me/rainbowkit';

export const MyConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                height:'38px',
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    style={{
                      justifyContent: 'center',
                      height: '100%',
                      backgroundColor: '#62E785',
                      color: '#FFFFFF',
                      borderRadius: '12px',
                      width: '150px',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    style={{
                      justifyContent: 'center',
                      height: '100%',
                      backgroundColor: '#62E785',
                      color: '#FFFFFF',
                      borderRadius: '12px',
                      width: '150px',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ height: '100%', display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{
                      justifyContent: 'center',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#62E785',
                      color: '#FFFFFF',
                      borderRadius: '12px',
                      width: '150px',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <button
                    onClick={openAccountModal}
                    type="button"
                    style={{
                      justifyContent: 'center',
                      height: '100%',
                      backgroundColor: '#62E785',
                      color: '#FFFFFF',
                      borderRadius: '12px',
                      width: '240px',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
