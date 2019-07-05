'use strict';

const axis_mixin = {
	a: 1500,
	e: 0.99995,
	centre: true,
	style: {
		border: '2px solid white',
		background: 'white'
	}
};

const orbits = [
	{
		name: 'Reference plane',
		a: 200,
		centre: true,
		style: {
			border: '2px solid black',
			background: 'repeating-radial-gradient(circle, black, black 5%, white 5%, white 10%)',
		}
	},
	{
		name: 'Reference plane (dim)',
		a: 800,
		centre: true,
		style: {
			border: 'none',
			background: 'radial-gradient(circle, #0000, #0000 17.5%, #4448 17.5%, #4448)',
		}
	},
	{
		name: 'Reference pole (north)',
		i: 90,
		Ω: 90,
		ω: 90,
		...axis_mixin
	},
	{
		name: 'Reference pole (north) 2',
		i: 90,
		ω: 90,
		...axis_mixin
	},
	{
		name: 'Reference direction (vernal equinox)',
		...axis_mixin
	},
	{
		name: 'Reference direction (vernal equinox) 2',
		i: 90,
		...axis_mixin
	},
	{
		name: 'Satellite',
		i: 15,
		Ω: -10,
		ω: -30,
		a: 600,
		e: 0.4,
		style: {
			border: '2px solid black',
			opacity: 0.9,
			background: p => `conic-gradient(from ${p.ν}deg at 50% ${(1 - p.e) * 50}%, red, orange, yellow, green, blue)`
		}
	},
].map(orbit => new Orbit(orbit));
