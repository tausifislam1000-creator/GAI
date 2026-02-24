import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn } from 'lucide-react';

interface AuthProps {
  onLogin: (email: string) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [error, setError] = useState('');

  const handlePuterSignIn = async () => {
    try {
      setError('');
      const puter = (window as any).puter;
      if (!puter) {
        throw new Error('Puter.js is not loaded.');
      }
      const res = await puter.auth.signIn();
      if (res && res.username) {
        localStorage.setItem('global_ai_current_user', res.username);
        onLogin(res.username);
      } else {
        setError('Authentication failed.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to sign in.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-emerald-600 rounded-full mix-blend-screen filter blur-[100px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-md bg-zinc-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-indigo-500/30"
          >
            <span className="text-3xl font-bold text-white tracking-tighter">GAI</span>
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">GLOBAL AI</h1>
          <p className="text-zinc-400 text-sm">Powered by TAUSIF ISLAM</p>
        </div>

        <div className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePuterSignIn}
            className="w-full bg-white text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Sign in with Puter
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
