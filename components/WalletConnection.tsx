'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Unplug, CheckCircle } from 'lucide-react';

interface WalletConnectionProps {
  onWalletConnect: (address: string) => void;
  onWalletDisconnect: () => void;
}

// Extend Window interface for Phantom
declare global {
  interface Window {
    phantom?: {
      solana?: {
        isPhantom: boolean;
        connect(): Promise<{ publicKey: { toString(): string } }>;
        disconnect(): Promise<void>;
        signMessage(message: Uint8Array, display?: string): Promise<{ signature: Uint8Array }>;
      };
    };
  }
}

export default function WalletConnection({ onWalletConnect, onWalletDisconnect }: WalletConnectionProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [signatureVerified, setSignatureVerified] = useState(false);

  useEffect(() => {
    // Check if wallet is already signed in for this session
    const savedWallet = sessionStorage.getItem('matrix_wallet_address');
    const savedSignature = sessionStorage.getItem('matrix_wallet_signature');
    
    if (savedWallet && savedSignature) {
      setWalletAddress(savedWallet);
      setIsConnected(true);
      setSignatureVerified(true);
      onWalletConnect(savedWallet);
    }
  }, [onWalletConnect]);

  const connectAndSignMessage = async () => {
    try {
      setIsConnecting(true);
      
      // Check if Phantom is installed
      if (!window.phantom?.solana) {
        alert('Phantom wallet not found! Please install Phantom wallet extension.');
        return;
      }

      const provider = window.phantom.solana;
      
      if (!provider.isPhantom) {
        alert('Please use Phantom wallet!');
        return;
      }

      // Connect to Phantom wallet - only get public key
      const response = await provider.connect();
      const publicKey = response.publicKey.toString();

      // Create simple ownership proof message
      const timestamp = new Date().toISOString();
      const message = `Matrix Challenge proof of ownership. Wallet: ${publicKey}, Date: ${timestamp}`;
      
      // Convert message to Uint8Array for signing
      const encodedMessage = new TextEncoder().encode(message);

      // Request message signature - no RPC calls, just local signing
      const signedMessage = await provider.signMessage(encodedMessage, 'utf8');
      
      if (signedMessage.signature) {
        // Store only wallet address and signature proof
        sessionStorage.setItem('matrix_wallet_address', publicKey);
        sessionStorage.setItem('matrix_wallet_signature', JSON.stringify({
          signature: Array.from(signedMessage.signature),
          message: message,
          timestamp: timestamp
        }));

        setWalletAddress(publicKey);
        setIsConnected(true);
        setSignatureVerified(true);
        onWalletConnect(publicKey);
      }
    } catch (error: any) {
      if (error.message?.includes('User rejected')) {
        console.warn('User cancelled wallet connection or message signing');
        alert('Message signing was cancelled. You need to sign the message to participate in the challenge.');
      } else {
        console.warn('Failed to connect or sign message:', error);
        alert('Failed to connect wallet or sign message. Please try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      // Clear session storage
      sessionStorage.removeItem('matrix_wallet_address');
      sessionStorage.removeItem('matrix_wallet_signature');
      
      // Disconnect from Phantom
      if (window.phantom?.solana?.isPhantom) {
        await window.phantom.solana.disconnect();
      }
      
      setIsConnected(false);
      setWalletAddress('');
      setSignatureVerified(false);
      onWalletDisconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex flex-col gap-3">
      {!isConnected ? (
        <Button
          onClick={connectAndSignMessage}
          disabled={isConnecting}
          className="bg-black border-2 border-green-500 text-green-400 hover:bg-green-900/20 neon-glow transition-all duration-300 font-mono"
        >
          <Wallet className="w-4 h-4 mr-2" />
          {isConnecting ? 'CONNECTING...' : 'CONNECT WALLET'}
        </Button>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="bg-green-900/20 border border-green-500/50 rounded p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <div className="text-xs text-green-300">WALLET VERIFIED</div>
            </div>
            <div className="font-mono text-sm text-green-400">
              {formatAddress(walletAddress)}
            </div>
          </div>
          <Button
            onClick={disconnectWallet}
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-900/20 font-mono text-xs"
          >
            <Unplug className="w-3 h-3 mr-1" />
            DISCONNECT
          </Button>
        </div>
      )}
      
      {!isConnected && (
        <div className="text-green-400/70 font-mono text-xs text-center mt-2">
          [IDENTITY_VERIFICATION_REQUIRED]
          <br />
          Sign a message to prove wallet ownership
        </div>
      )}
    </div>
  );
}