export function truncateText(text: string, maxWords: number): string {

    const words = text.split(' ');

    if (words.length > maxWords) {
        const truncatedWords = words.slice(0, maxWords);

        return truncatedWords.join(' ') + ' [continua]';
    } else {
        return text;
    }
}