export function pickRandom<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
}

export function findByName<T extends { name: string }>(items: T[], name: string): T {
    const item = items.find(i => i.name === name);
    if (!item) {
        throw new Error(`"${name}" not found in test data`);
    }
    return item;
}