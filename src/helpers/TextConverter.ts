const textMapping: { [key: string]: string } = {
    'escorrega-bowl': 'Escorrega Bowl',
    'gira-bowls': 'Gira Bowls',
};

export const t = (value?: string): string | undefined => (value && textMapping[value.toLowerCase()]) || value;
