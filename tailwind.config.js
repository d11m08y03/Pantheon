/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
    	extend: {
    		animation: {
    			fadeIn: 'fadeIn 1s ease-out',
    			slideUp: 'slideUp 1s ease-out',
    			grid: 'grid 15s linear infinite',
    			shine: 'shine var(--duration) infinite linear'
    		},
    		keyframes: {
    			fadeIn: {
    				'0%': {
    					opacity: 0,
    					transform: 'translateY(20px)'
    				},
    				'100%': {
    					opacity: 1,
    					transform: 'translateY(0)'
    				}
    			},
    			slideUp: {
    				'0%': {
    					opacity: 0,
    					transform: 'translateY(20px)'
    				},
    				'100%': {
    					opacity: 1,
    					transform: 'translateY(0)'
    				}
    			},
    			auroraBorder: {
    				'0%, 100%': {
    					borderRadius: '37% 29% 27% 27% / 28% 25% 41% 37%'
    				},
    				'25%': {
    					borderRadius: '47% 29% 39% 49% / 61% 19% 66% 26%'
    				},
    				'50%': {
    					borderRadius: '57% 23% 47% 72% / 63% 17% 66% 33%'
    				},
    				'75%': {
    					borderRadius: '28% 49% 29% 100% / 93% 20% 64% 25%'
    				}
    			},
    			aurora1: {
    				'0%, 100%': {
    					top: '0',
    					right: '0'
    				},
    				'50%': {
    					top: '50%',
    					right: '25%'
    				},
    				'75%': {
    					top: '25%',
    					right: '50%'
    				}
    			},
    			aurora2: {
    				'0%, 100%': {
    					top: '0',
    					left: '0'
    				},
    				'60%': {
    					top: '75%',
    					left: '25%'
    				},
    				'85%': {
    					top: '50%',
    					left: '50%'
    				}
    			},
    			aurora3: {
    				'0%, 100%': {
    					bottom: '0',
    					left: '0'
    				},
    				'40%': {
    					bottom: '50%',
    					left: '25%'
    				},
    				'65%': {
    					bottom: '25%',
    					left: '50%'
    				}
    			},
    			aurora4: {
    				'0%, 100%': {
    					bottom: '0',
    					right: '0'
    				},
    				'50%': {
    					bottom: '25%',
    					right: '40%'
    				},
    				'90%': {
    					bottom: '50%',
    					right: '25%'
    				}
    			},
    			grid: {
    				'0%': {
    					transform: 'translateY(-50%)'
    				},
    				'100%': {
    					transform: 'translateY(0)'
    				}
    			},
    			shine: {
    				'0%': {
    					'background-position': '0% 0%'
    				},
    				'50%': {
    					'background-position': '100% 100%'
    				},
    				to: {
    					'background-position': '0% 0%'
    				}
    			}
    		},
    		fontFamily: {
    			pacifico: [
    				'Pacifico',
    				'sans-serif'
    			],
    			playwrite: [
    				'Playwrite IT Moderna',
    				'serif'
    			]
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			},
    			'color-1': 'hsl(var(--color-1))',
    			'color-2': 'hsl(var(--color-2))',
    			'color-3': 'hsl(var(--color-3))',
    			'color-4': 'hsl(var(--color-4))',
    			'color-5': 'hsl(var(--color-5))'
    		}
    	}
    },
	plugins: [require('tailwindcss-animate')],
  };
  