'use strict';

function Dynamics() {

	const τ = Math.PI * 2;
	/* Radians per degree */
	const rad_deg = Math.PI / 180;
	/* Degrees per radian */
	const deg_rad = 180 / Math.PI;

	const { sin, cos, tan, acos, asin, atan, atan2, sqrt } = Math;

	/* BEGIN untested */
	{
		/* Eccentric anomaly from true anomaly */
		const E_ν_rad = (ν, e) => 2 * atan(sqrt((1 - e) / (1 + e)) * tan(ν / 2))

		/* Mean anomaly from eccentric anomaly */
		const M_E_rad = (E, e) => E - e * sin(E);

		/* Mean anomaly from true anomaly */
		const M_ν_rad = (ν, e) => M_E_rad(E_ν_rad(ν, e), e);
	}
	/* END untested */

	/* True anomaly from eccentric anomaly */
	const ν_E_rad = (E, e) => 2 * atan2(sqrt(1 + e) * sin(E / 2), sqrt(1 - e) * cos(E / 2));

	/* Eccentric anomaly from mean anomaly */
	const E_M_rad = (M, e) => {
		let E = M;
		for (let i = 0; i < 10; i++) {
			E = M + e * sin(E);
		}
		return E;
	};

	/* True anomaly from mean anomaly, iterative */
	const ν_M_rad = (M, e) => ν_E_rad(E_M_rad(M, e), e);

	/* Wrapper for radians/degrees conversion */
	const M_ν = (ν, e) => M_ν_rad(ν * rad_deg % τ, e) * deg_rad;
	const ν_M = (M, e) => ν_M_rad(M * rad_deg % τ, e) * deg_rad;

	return { M_ν, ν_M };
}

const dynamics = Dynamics();
