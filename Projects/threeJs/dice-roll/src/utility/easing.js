/**
 * Cubic ease-out: fast start, satisfying deceleration.
 * Great for dice landing — feels like momentum running out.
 *
 * @param {number} t - Progress from 0 to 1
 * @returns {number} Eased value from 0 to 1
 */
export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
