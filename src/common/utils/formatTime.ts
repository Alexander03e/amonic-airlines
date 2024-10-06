export const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.round(seconds % 60);

    if (hours > 0) {
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
            remainingSeconds < 10 ? '0' : ''
        }${remainingSeconds}`;
    } else {
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
};
