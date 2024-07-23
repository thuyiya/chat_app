export function formatDateToTime(dateString: string): string {
    const date = new Date(dateString);

    // Options for the time format
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    // Format the date to 'hh:mm A'
    return date.toLocaleTimeString('en-US', options);
}