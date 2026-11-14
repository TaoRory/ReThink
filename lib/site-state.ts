/**
 * Season switches — the few facts about "now" that the site's calls to action
 * depend on. Flip them when the calendar moves; nothing else needs editing.
 */

/**
 * Is the member application form open?
 * Gen 5 applications ran 20/09/2026 – 30/09/2026 and the form is closed, so
 * every "join" action explains that instead of sending people to a dead form.
 * Set to `true` (and check JOIN_FORM) when the next round opens.
 */
export const RECRUITING: boolean = false;

export const JOIN_FORM = "https://forms.gle/U6h51p5iVZwYFhoX6";
export const FACEBOOK = "https://www.facebook.com/rethink.vinuni";
/** official site of the 2026 TEDx VinUniversity season, run outside this repo */
export const TEDX_2026_SITE = "https://v0-tedxvinuni.vercel.app/";
