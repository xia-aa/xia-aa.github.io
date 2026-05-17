import {
	type AnimationOptions,
	animate,
	type ElementOrSelector,
	stagger,
} from 'motion';
import { createEffect, onCleanup } from 'solid-js';

export function TextUpView(props: {
	text?: string;
	appear?: boolean;
	eachDelay?: number;
	initialDelay?: number;
	class?: string;
	style?: any;
}) {
	let ref: HTMLDivElement | undefined;
	createEffect(() => {
		if (props.appear === false || !ref) return;
		const chars = ref.querySelectorAll<HTMLElement>('[data-char]');
		const anim = animate(
			chars,
			{
				opacity: [0.001, 1],
				y: [10, 0],
			},
			{
				type: 'spring',
				stiffness: 300,
				damping: 20,
				duration: 0.1,
				delay: stagger(props.eachDelay ?? 0.1, {
					startDelay: props.initialDelay ?? 0,
				}),
			},
		);
		onCleanup(() => anim.stop());
	});
	return (
		<div ref={ref} class={props.class} style={props.style}>
			{Array.from(props.text ?? '').map((char) => (
				<span data-char class="inline-block whitespace-pre">
					{char}
				</span>
			))}
		</div>
	);
}
