interface CategoryData{
    name: string;
    filterTestId: string;
    subcategories?: SubcategoryData[];
}

interface SubcategoryData{
    name: string;
    filterTestId: string;
}

export const categories: CategoryData[] = [
    {
        name: 'Будівельна техніка',
        filterTestId: 'budivelna-tekhnika',
        subcategories: [
            {
                name: 'Бурові установки',
                filterTestId: 'burovi-ustanovki'
            },
            {
                name: 'Дорожньо-будівельна техніка',
                filterTestId: 'dorozhno-budivelna-tekhnika'
            },
            {
                name: 'Екскаватори',
                filterTestId: 'ekskavatori'
            },
            {
                name: 'Інша спецтехніка',
                filterTestId: 'insha-spectekhnika'
            },
            {
                name: 'Катки',  
                filterTestId: 'katki'
            },
            {
                name: 'Контейнери',
                filterTestId: 'konteineri'
            },
            {
                name: 'Крани',
                filterTestId: 'krani'
            },
            {
                name: 'Навантажувачі',
                filterTestId: 'navantazhuvachi'
            },
            {
                name: 'Обладнання для спецтехніки',
                filterTestId: 'obladnannya-dlya-spectekhniki'
            },
            {
                name: 'Підйомники',
                filterTestId: 'pidiomniki'
            },
            {
                name: 'Техніка для земляних робіт',
                filterTestId: 'tekhnika-dlya-zemlyanikh-robit'
            }
        ]
    },
    {
        name: 'Комунальна техніка',
        filterTestId: 'komunalna-tekhnika',
        subcategories: [
            {
                name: 'Аварійні машини',
                filterTestId: 'avariini-mashini'
            },
            {
                name: 'Дорожньо-прибиральна техніка',
                filterTestId: 'dorozhno-pribiralna-tekhnika'
            },
            {
                name: 'Клінінгове обладнання',
                filterTestId: 'kliningove-obladnannya'
            },
            {
                name: 'Комунальні контейнери',
                filterTestId: 'komunalni-konteineri'
            },
            {
                name: 'Комунальні машини',
                filterTestId: 'komunalni-mashini'
            },
            {
                name: 'Обладнання для комунальної техніки',
                filterTestId: 'obladnannya-dlya-komunalnoyi-tekhniki'
            },
            {
                name: 'Сільськогосподарська техніка',
                filterTestId: 'silskogospodarska-tekhnika'
            }
        ]
    },
    {
        name: 'Складська техніка',
        filterTestId: 'skladska-tekhnika',
        subcategories: [
            {
                name: 'Обладнання для навантажувачів',
                filterTestId: 'obladnannya-dlya-navantazhuvachiv'
            },
            {
                name: 'Техніка для складування',
                filterTestId: 'tekhnika-dlya-skladuvannya'
            }
        ]
    }
];