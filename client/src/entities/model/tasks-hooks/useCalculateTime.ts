export const useCalculateWPM = (charCount: number, timeInMs: number) => {
    const minutes = timeInMs / 60000;
    const words = charCount / 5;
    return Math.round(words / minutes);
}