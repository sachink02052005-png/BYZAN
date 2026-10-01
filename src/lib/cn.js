/**
 * Join class names, skipping falsy values.
 *   cn('a', cond && 'b', undefined, 'c') -> "a b c"
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
