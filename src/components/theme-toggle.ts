// import { animate, attrEffect, motionValue, stagger } from 'motion';

// const SUN_PATH =
// 	'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z';
// const MOON_PATH =
// 	'M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z';

// const THEME_KEY = 'starlight-theme';

// function getEffectiveTheme(): 'dark' | 'light' {
// 	const stored = localStorage.getItem(THEME_KEY);
// 	if (stored === 'dark' || stored === 'light') return stored;
// 	return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
// }

// function setStarlightTheme(theme: 'dark' | 'light') {
// 	document.documentElement.dataset.theme = theme;
// 	localStorage.setItem(THEME_KEY, theme);
// 	// @ts-expect-error Starlight global
// 	StarlightThemeProvider?.updatePickers(theme);
// }

// class ThemeToggle extends HTMLElement {
// 	private morphD = motionValue(SUN_PATH);
// 	private stopAttrEffect?: () => void;
// 	private running: import('motion').AnimationPlaybackControls[] = [];

// 	connectedCallback() {
// 		this.innerHTML = this.template();
// 		this.wireMorph();
// 		this.syncState();
// 		this.querySelector('button')!.addEventListener('click', () =>
// 			this.toggle(),
// 		);
// 	}

// 	disconnectedCallback() {
// 		this.stopAttrEffect?.();
// 		this.running.forEach((a) => {
// 			a.stop();
// 		});
// 	}

// 	private template() {
// 		return `
// <button class="flex items-center justify-center relative gap-0 size-10 p-auto [&_svg]:size-4" type="button" aria-label="Toggle theme">
// 	<svg stroke-width="4" stroke-linecap="round" width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="relative block m-auto" style="transform-origin:50px 50px;overflow:visible">
// 		<path class="shine" d="${MOON_PATH}" stroke="#60a5fa" fill="#60a5fa" fill-opacity="0" />
// 		<g class="rays" stroke="#ca8a04" stroke-width="6" opacity="0">
// 			<path class="ray" d="M50 2V11" />
// 			<path class="ray" d="M85 15L78 22" />
// 			<path class="ray" d="M98 50H89" />
// 			<path class="ray" d="M85 85L78 78" />
// 			<path class="ray" d="M50 98V89" />
// 			<path class="ray" d="M23 78L16 84" />
// 			<path class="ray" d="M11 50H2" />
// 			<path class="ray" d="M23 23L16 16" />
// 		</g>
// 		<path class="morph" d="${SUN_PATH}" fill="transparent" />
// 	</svg>
// </button>`;
// 	}

// 	private wireMorph() {
// 		this.stopAttrEffect?.();
// 		this.stopAttrEffect = attrEffect(this.querySelector('.morph')!, {
// 			d: this.morphD,
// 		});
// 	}

// 	private syncState() {
// 		const dark = getEffectiveTheme() === 'dark';
// 		const morph = this.querySelector<HTMLElement>('.morph')!;
// 		const shine = this.querySelector<HTMLElement>('.shine')!;
// 		const rays = this.querySelector('.rays')!;

// 		if (dark) {
// 			this.morphD.set(MOON_PATH);
// 			morph.setAttribute('d', MOON_PATH);
// 			morph.setAttribute('stroke', '#60a5fa');
// 			morph.setAttribute('fill', '#60a5fa');
// 			morph.style.transform = 'scale(2)';
// 			morph.style.fillOpacity = '0.35';
// 			morph.style.strokeOpacity = '1';
// 			shine.setAttribute('fill-opacity', '0.35');
// 			rays.setAttribute('opacity', '0');
// 		} else {
// 			this.morphD.set(SUN_PATH);
// 			morph.setAttribute('d', SUN_PATH);
// 			morph.setAttribute('stroke', '#ca8a04');
// 			morph.setAttribute('fill', '#ca8a04');
// 			morph.style.transform = 'scale(1)';
// 			morph.style.fillOpacity = '0.35';
// 			morph.style.strokeOpacity = '1';
// 			shine.setAttribute('fill-opacity', '0');
// 			rays.removeAttribute('opacity');
// 		}
// 	}

// 	private async toggle() {
// 		const dark = getEffectiveTheme() === 'dark';
// 		const next = dark ? 'light' : 'dark';

// 		this.running.forEach((a) => {
// 			a.stop();
// 		});
// 		this.running = [];

// 		this.animateIcon(!dark);

// 		if ('startViewTransition' in document) {
// 			const t = document.startViewTransition(() => setStarlightTheme(next));
// 			await t.ready;
// 			this.animateClipPath();
// 		} else {
// 			setStarlightTheme(next);
// 		}
// 	}

// 	private animateIcon(toDark: boolean) {
// 		const morph = this.querySelector('.morph')!;
// 		const shine = this.querySelector('.shine')!;
// 		const rays = this.querySelectorAll('.ray');

// 		if (toDark) {
// 			this.running.push(
// 				animate(
// 					morph,
// 					{
// 						rotate: -360,
// 						scale: 2,
// 						filter: [
// 							'blur(4px) drop-shadow(0 0 8px #60a5fa)',
// 							'blur(0px) drop-shadow(0 0 0px #60a5fa)',
// 						],
// 					},
// 					{
// 						type: 'spring',
// 						stiffness: 80,
// 						damping: 12,
// 						duration: 1.2,
// 					},
// 				),
// 			);
// 			this.running.push(
// 				animate(
// 					shine,
// 					{ fillOpacity: [0, 0.35, 0.35, 0] },
// 					{
// 						duration: 1.5,
// 						ease: 'easeInOut',
// 						times: [0, 0.15, 0.65, 1],
// 					},
// 				),
// 			);
// 			this.running.push(
// 				animate(
// 					rays,
// 					{ pathLength: [1, 0], opacity: [1, 0], scale: [1, 0] },
// 					{
// 						delay: stagger(0.04, { from: 'last' }),
// 						duration: 0.2,
// 						ease: 'easeOut',
// 					},
// 				),
// 			);
// 		} else {
// 			this.running.push(
// 				animate(
// 					morph,
// 					{
// 						rotate: 0,
// 						scale: 1,
// 						filter: [
// 							'blur(0px) drop-shadow(0 0 0px #ca8a04)',
// 							'blur(4px) drop-shadow(0 0 8px #ca8a04)',
// 						],
// 					},
// 					{
// 						type: 'spring',
// 						stiffness: 80,
// 						damping: 12,
// 						duration: 1.2,
// 					},
// 				),
// 			);
// 			this.running.push(
// 				animate(
// 					shine,
// 					{ fillOpacity: [0.35, 0] },
// 					{ duration: 0.3, ease: 'easeOut' },
// 				),
// 			);
// 			this.running.push(
// 				animate(
// 					rays,
// 					{ pathLength: [0, 1], opacity: [0, 1], scale: [0, 1] },
// 					{ delay: stagger(0.05), duration: 0.35, ease: 'easeOut' },
// 				),
// 			);
// 		}
// 	}

// 	private animateClipPath() {
// 		const btn = this.querySelector('button')!;
// 		const { top, left, width, height } = btn.getBoundingClientRect();
// 		const x = left + width / 2;
// 		const y = top + height / 2;
// 		const r = Math.hypot(
// 			Math.max(x, innerWidth - x),
// 			Math.max(y, innerHeight - y),
// 		);

// 		document.documentElement.animate(
// 			{
// 				clipPath: [
// 					`circle(0px at ${x}px ${y}px)`,
// 					`circle(${r}px at ${x}px ${y}px)`,
// 				],
// 			},
// 			{
// 				duration: 600,
// 				easing: 'ease-in-out',
// 				pseudoElement: '::view-transition-new(root)',
// 			},
// 		);
// 	}
// }

// customElements.define('theme-toggle', ThemeToggle);
