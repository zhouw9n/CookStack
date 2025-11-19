/**
 * Generates a UTC timestamp in the format compatible with SQLite's timestamp format.
 * 
 * Format: "YYYY-MM-DD HH:MM:SS"
 * 
 * This function uses the UTC time from the system clock and pad all 
 * components (month, day, hours, minutes, seconds) to two digits to 
 * ensure proper formatting. The returned string is safe to store in 
 * SQLite TEXT columns and can be used for sorting and logging purposes.
 * 
 * NOTES:
 * - Months are zero-indexed (0 = January), so 1 is added to get the correct month.
 * - All numeric components are converted to strings to apply padding. 
 * 
 * @returns {string} A string representing the current UTC timestamp.
 */

export default function getUTCTimestamp(): string {

    const d = new Date();

    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(d.getUTCDate()).padStart(2, "0");

    const h = String(d.getUTCHours()).padStart(2, "0");
    const min = String(d.getUTCMinutes()).padStart(2, "0");
    const sec = String(d.getUTCSeconds()).padStart(2, "0");

    const timestamp = `${yyyy}-${mm}-${dd} ${h}:${min}:${sec}`;

    return timestamp;
}

