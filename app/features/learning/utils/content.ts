export const getWordStyles = (text: string) => {
    const len = text.length;
    if (len <= 10) return 'text-4xl md:text-5xl font-extrabold';
    if (len <= 15) return 'text-3xl md:text-4xl font-bold';
    if (len <= 20) return 'text-2xl md:text-3xl font-bold';
    if (len <= 22) return 'text-xl md:text-2xl';
    if (len <= 30) return 'text-lg md:text-xl font-medium';
    return 'text-base font-medium';
}

export const getIdiomStyles = (text: string) => {
    const len = text.length;
    const base = 'line-clamp-2 leading-[1.15] text-balance font-semibold';
    
    if (len <= 30) return `${base} text-2xl md:text-3xl`;
    if (len <= 80) return `${base} text-lg md:text-xl`;
    return `${base} text-sm md:text-base`;
};

export const getContentStyles = (text: string) => {
    if (text.includes(' ')) {
        return getIdiomStyles(text);
    }

    return getWordStyles(text);
};
