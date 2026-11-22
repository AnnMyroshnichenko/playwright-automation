interface ServiceCategoryData {
    name: string;
    subcategories?: ServiceData[];
}

interface ServiceData {
    name: string;
    filterTestId: string;
}

export const serviceCategories: ServiceCategoryData[] = [
    {
        name: 'Будівельні',
        subcategories: [
            {   
                name: 'Розчищення території',
                filterTestId: 'rozchishennya-teritoriyi',
            },
        ],
    },
    {
        name: 'Сільськогосподарські',
        subcategories: [
            { 
                name: 'Внесення добрив' ,
                filterTestId: 'vnesennya-dobriv',
            },
        ],
    },
    {
        name: 'Інші',
        subcategories: [
            { 
                name: 'Обрізання дерев',
                filterTestId: 'obrizannya-derev', 
             },
        ],
    },
];
