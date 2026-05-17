import { animate } from 'motion';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';

const transition = {
	right: { duration: 0.8 }, // 位置动画持续时间
	opacity: { duration: 0.3 }, // 透明度动画持续时间
};
const initStyle = {
	right: '-108px',
	opacity: 0.6,
};
export const BackToTop = () => {
	const [isVisible, setIsVisible] = createSignal(false);
	let ref: HTMLDivElement | undefined;
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	createEffect(() => {
		const anim = animate(
			ref!,
			{
				right: isVisible() ? '0px' : '-108px', // 动态控制位置
				opacity: isVisible() ? 0.3 : 0, // 动态控制透明度
			},
			{ type: 'spring', stiffness: 100, damping: 15 },
		);
		// console.log('BackToTop:createEffect');
		onCleanup(() => anim.stop());
	});
	const onScroll = () => setIsVisible(window.scrollY > 500);
	onScroll(); // 初始检查
	window.addEventListener('scroll', onScroll, { passive: true });
	onCleanup(() => window.removeEventListener('scroll', onScroll));
	return (
		<div
			ref={ref}
			class="fixed z-50 bottom-0 w-27 h-37.5 bg-[url('/back-to-top.png?v=1')] bg-no-repeat bg-size-[108px_450px] opacity-60 cursor-pointer hover:opacity-100 hover:bg-position-[0_-150px]"
			onClick={scrollToTop}
			style={initStyle}
		/>
	);
};
