import { PeriodicNote } from './periodic-note';
/**
 * Handles daily periodic notes.
 * Provides methods to create, retrieve, and manage daily notes through the Obsidian Periodic Notes plugin.
 *
 * @example
 * ```typescript
 * const daily = new DailyNote();
 *
 * // Check if today's note exists
 * if (!daily.isPresent()) {
 *   await daily.create();
 * }
 *
 * // Get today's note
 * const today = daily.getCurrent();
 *
 * // Get all daily note paths
 * const allPaths = daily.getAllPaths();
 * ```
 */
export declare class DailyNote extends PeriodicNote {
    constructor();
}
