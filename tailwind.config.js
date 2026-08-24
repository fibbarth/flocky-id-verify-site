/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Mesmos tokens do flocky-admin-frontend, para a marca falar a mesma
      // língua nos dois projetos Cloudflare Pages — sem compartilhar código.
      colors: {
        background: '#09090B',
        surface: '#111113',
        'surface-raised': '#18181C',
        border: {
          DEFAULT: '#27272A',
          subtle: '#1C1C1F',
        },
        accent: {
          DEFAULT: '#10B981',
          hover: '#059669',
          subtle: 'rgba(16,185,129,0.08)',
          border: 'rgba(16,185,129,0.2)',
          text: '#34D399',
        },
        destructive: {
          DEFAULT: '#EF4444',
          subtle: 'rgba(239,68,68,0.08)',
        },
        warning: '#F59E0B',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        reveal: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        /*
         * O pulso de "proteção ativa" — porta direta do `.animate-pulse-slow`
         * da página legada, só que como token do Tailwind em vez de <style>
         * inline. Esmeralda, confiante, 2.8s.
         */
        sealPulseActive: {
          '0%': { opacity: '0.5', filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 14px rgba(16,185,129,0.9))' },
          '100%': { opacity: '0.5', filter: 'drop-shadow(0 0 4px rgba(16,185,129,0.4))' },
        },
        /*
         * O pulso de "monitoramento inativo" — porta do `.animate-pulse-warning`
         * legado, que existia no CSS mas nunca tinha exemplo em produção. Âmbar,
         * mais lento que o ativo (3s vs 2.8s) de propósito: é aviso quieto, não
         * alarme.
         */
        sealPulseWarning: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 2px rgba(245,158,11,0.3))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.9))' },
          '100%': { opacity: '0.4', filter: 'drop-shadow(0 0 2px rgba(245,158,11,0.3))' },
        },
        /*
         * O brilho de "acabei de verificar" que passa pelo escudo UMA vez ao
         * carregar — não é loop. `both` mantém o estado final (fora da tela)
         * sem voltar ao início.
         */
        sweepOnce: {
          from: { transform: 'translateX(-40px) skewX(-16deg)' },
          to: { transform: 'translateX(220px) skewX(-16deg)' },
        },
      },
      animation: {
        reveal: 'reveal 400ms ease-out both',
        'seal-active': 'sealPulseActive 2.8s ease-in-out infinite',
        'seal-warning': 'sealPulseWarning 3s ease-in-out infinite',
        'sweep-once': 'sweepOnce 1.1s 150ms cubic-bezier(.4,0,.2,1) 1 both',
      },
    },
  },
  plugins: [],
}
