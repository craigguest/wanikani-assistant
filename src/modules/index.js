/**
 * @overivew Barrel file that can be used to import multiple modules in one statement.
 * @example
 * import { BADGE_COLORS, api, notifcation, updateBadge } from './modules';
 */
export { api } from './api';
export { displayNotification } from './notifications';
export { BADGE_COLORS, updateBadge } from './badge';