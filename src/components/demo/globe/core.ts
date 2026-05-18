import { Color, type MeshPhongMaterial, Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, DirectionalLight, PointLight } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import ThreeGlobe from 'three-globe';
import countries from '#/assets/earth.geo.json';

const N = 20;
const arcsData = [...Array(N).keys()].map(() => ({
	startLat: (Math.random() - 0.5) * 180,
	startLng: (Math.random() - 0.5) * 360,
	endLat: (Math.random() - 0.5) * 180,
	endLng: (Math.random() - 0.5) * 360,
	color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)],
}));

export function mountGlobe(container: HTMLElement) {
	const w = container.clientWidth;
	const h = container.clientHeight;

	const scene = new Scene();
	scene.background = new Color('#040d21');

	const camera = new PerspectiveCamera(45, w / h, 0.1, 1000);
	camera.position.set(0, 0, 400);

	const renderer = new WebGLRenderer({ antialias: true });
	renderer.setSize(w, h);
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(renderer.domElement);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.01;
	controls.enablePan = false;
	controls.minDistance = 200;
	controls.maxDistance = 500;
	controls.rotateSpeed = 0.8;
	controls.zoomSpeed = 1;
	controls.autoRotate = true;
	controls.minPolarAngle = Math.PI / 3.5;
	controls.maxPolarAngle = Math.PI - Math.PI / 3;
	controls.target.set(0, 0, 0);

	const ambient = new AmbientLight(0xbbbbbb, 1);
	scene.add(ambient);

	const dir1 = new DirectionalLight(0xffffff, 8);
	dir1.position.set(-800, 2000, 400);
	scene.add(dir1);

	const dir2 = new DirectionalLight(0xffffff, 10);
	dir2.position.set(-200, 500, 200);
	scene.add(dir2);

	const point = new PointLight(0x7982f6, 50);
	point.position.set(-200, 500, 200);
	scene.add(point);

	const Globe = new ThreeGlobe()
		.hexPolygonsData(countries.features)
		.hexPolygonResolution(3)
		.hexPolygonMargin(0.7)
		.showAtmosphere(true)
		.atmosphereColor('#6944e5')
		.atmosphereAltitude(0.2)
		.arcsData(arcsData)
		.arcColor('color')
		.arcDashLength(0.9)
		.arcDashGap(4)
		.arcDashInitialGap(() => Math.random() * 5)
		.arcDashAnimateTime(1000)
		.arcsTransitionDuration(1000);

	const globeMaterial = Globe.globeMaterial() as MeshPhongMaterial;
	globeMaterial.color = new Color('#3a228a');
	globeMaterial.emissive = new Color('#220038');
	globeMaterial.emissiveIntensity = 0.1;
	globeMaterial.shininess = 0.7;

	scene.add(Globe);

	let frameId: number;
	const animate = () => {
		frameId = requestAnimationFrame(animate);
		controls.update();
		renderer.render(scene, camera);
	};
	animate();

	const onResize = () => {
		const cw = container.clientWidth;
		const ch = container.clientHeight;
		camera.aspect = cw / ch;
		camera.updateProjectionMatrix();
		renderer.setSize(cw, ch);
	};
	window.addEventListener('resize', onResize);

	return () => {
		cancelAnimationFrame(frameId);
		window.removeEventListener('resize', onResize);
		controls.dispose();
		renderer.dispose();
	};
}
