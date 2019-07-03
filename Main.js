'use strict';

(() => {

	const satellite = orbits[orbits.length - 1];

	/* Customisable orbit */
	const custom = (orbit => {

		const readers = [];

		/* Update parameter for example satellite (don't update view) */
		function set_arg(name, val) {
			val = parseFloat(val);
			if (!isNaN(val)) {
				orbit[name] = val;
			}
		}

		/* Update satellite view */
		function update_sat(read = true) {
			if (read) {
				for (const reader of readers) {
					reader();
				}
			}
			renderer.update_orbit(orbit);
		}

		function add_reader(reader) {
			readers.push(reader);
		}

		return { set_arg, update_sat, add_reader };
	})(satellite);

	/* Animation for customisable orbit */
	const animate = (orbit => {

		/* Animation ranges (min, max, rate, wrap) */
		const ranges = {
			i: [0, 180, 45],
			Ω: [0, 360, 45, true],
			ω: [0, 360, 45, true],
			a: [100, 1000, 300],
			e: [0, 0.8, 0.4],
			ν: [0, 360, 45, true],
			M: [0, 360, 45, true],
		};

		let animate = null;
		let anim_dir = 1;

		let tz = null;
		let anim_timer = null;

		/* Animate a parameter for the example orbit */
		function do_animate() {
			const t = +new Date() / 1000;
			const dt = t - tz;
			tz = t;
			let v = orbit[animate];
			const [min, max, rate, wrap=false] = ranges[animate];
			v += anim_dir * rate * dt;
			if (v > max) {
				if (wrap) {
					v = min + (v - max) % (max - min);
				} else {
					v = max - (v - max) % (max - min);
					anim_dir = -1;
				}
			} else if (v < min) {
				if (wrap) {
					v = max - (min - v) % (max - min);
				} else {
					v = min + (min - v) % (max - min);
					anim_dir = 1;
				}
			}
			orbit[animate] = v;
			custom.update_sat(false);
			anim_timer = window.requestAnimationFrame(do_animate);
		}

		/* Enable/disable animation */
		function set_animate(value) {
			animate = value;
			anim_dir = 1;
			if (animate === null) {
				window.cancelAnimationFrame(anim_timer);
				anim_timer = null;
			} else if (anim_timer === null) {
				tz = +new Date() / 1000;
				anim_timer = requestAnimationFrame(do_animate);
			}
		}

		return { select: set_animate };
	})(satellite);

	/* Initialise */
	function init() {
		/* Create orbit elements in scene */
		const scene = document.querySelector('.scene');
		for (const orbit of orbits) {
			orbit.el = document.createElement('div');
			orbit.el.classList.add('shape');
			orbit.el.classList.add('ellipse');
			orbit.el.classList.add('orbit');
			scene.appendChild(orbit.el);
		}
		/* Bind value fields */
		for (const arg of document.querySelectorAll('.custom .arg')) {
			arg.value = satellite[arg.name];
			const reader = () => custom.set_arg(arg.name, arg.value);
			custom.add_reader(reader);
			arg.addEventListener('change', reader);
		}
		document.querySelector('.update-sat').addEventListener('click', custom.update_sat);

		/* Bind animation buttons */
		for (const arg of document.querySelectorAll('.animate')) {
			arg.addEventListener('change', () => animate.select(arg.value));
		}
		document.querySelector('.no-animate').addEventListener('click', () => animate.select(null));

		/* Initialise orbits */
		for (const orbit of Object.values(orbits)) {
			renderer.update_orbit(orbit);
		}
	}

	window.addEventListener('load', init);

})();
