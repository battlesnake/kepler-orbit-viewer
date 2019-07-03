'use strict';

window.renderer = (() => {

	const perspective = 800;

	/* View transform, applied to all elements */
	const view_transform = [
			`perspective(${perspective}px)`,

			`rotateX(180deg)`,
			`rotateX(60deg)`,
			`rotateZ(60deg)`,
	];

	/* Update transform and size for orbit ellipse */
	function update_orbit(params) {
		const transforms = [
			/* Centre */
			`translate(-50%, -50%)`,

			/* View transform */
			...view_transform,

			/* Apply Euler angles */
			`rotateZ(${params.Ω}deg)`,
			`rotateY(${params.i}deg)`,
			`rotateZ(${params.ω}deg)`,

			/* Squash circle to ellipse */
			`scaleX(${Math.sqrt(1 - params.e*params.e)})`,

			/* Centre view on ellipse focus, not ellipse centre */
			/* BROKEN: Displacing too much! */
			params.centre ? '' : `translateY(${params.e * 50}%)`,
		];
		const el = params.el;
		const style = el.style;
		style.width = `${params.a}px`;
		style.height = `${params.a}px`;
		style.transform = transforms.join(' ');
		for (const attr of Object.keys(params.style)) {
			let fn = params.style[attr];
			if (typeof fn !== 'function') {
				fn = (x => () => x)(fn);
			}
			style[attr] = fn(params);
		}
	}

	return { update_orbit };

})();

