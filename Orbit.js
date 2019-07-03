'use strict';

function Orbit(params) {

	const def = {
		name: '(none)',
		i: 0,
		Ω: 0,
		ω: 0,
		a: 1,
		e: 0,
		ν: p => dynamics.ν_M(p.M, p.e),
		M: 0,
		centre: false,
		style: { }
	};

	for (const [name, val] of Object.entries(Object.assign({}, def, params))) {
		if (typeof val === 'function') {
			Object.defineProperty(this, name, { get: () => val(this), enumerable: true });
		} else {
			this[name] = val;
		}
	}

	const style = this.style;
	this.style = {};

	for (const [name, val] of Object.entries(style)) {
		if (typeof val === 'function') {
			Object.defineProperty(this.style, name, { get: () => val(this), enumerable: true });
		} else {
			this.style[name] = val;
		}
	}
}
