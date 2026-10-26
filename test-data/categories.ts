interface CategoryData {
    name: string;
    filterTestId: string;
    url: string;
    subcategories?: SubcategoryData[];
}

interface SubcategoryData {
    name: string;
    filterTestId: string;
    url: string;
}

export const categories: CategoryData[] = [
    {
        name: 'Будівельна техніка',
        filterTestId: 'budivelna-tekhnika',
        url: '/products/budivelna-tekhnika/',
        subcategories: [
            {
                name: 'Бурові установки',
                filterTestId: 'burovi-ustanovki',
                url: '/products/burovi-ustanovki/'
            },
            {
                name: 'Дорожньо-будівельна техніка',
                filterTestId: 'dorozhno-budivelna-tekhnika',
                url: '/products/dorozhno-budivelna-tekhnika/'
            },
            {
                name: 'Екскаватори',
                filterTestId: 'ekskavatori',
                url: '/products/ekskavatori/'
            },
            {
                name: 'Інша спецтехніка',
                filterTestId: 'insha-spectekhnika',
                url: '/products/insha-spetstekhnika/'
            },
            {
                name: 'Катки',
                filterTestId: 'katki',
                url: '/products/katki/'
            },
            {
                name: 'Контейнери',
                filterTestId: 'konteineri',
                url: '/products/konteineri/'
            },
            {
                name: 'Крани',
                filterTestId: 'krani',
                url: '/products/krani/'
            },
            {
                name: 'Навантажувачі',
                filterTestId: 'navantazhuvachi',
                url: '/products/navantazhuvachi/'
            },
            {
                name: 'Обладнання для спецтехніки',
                filterTestId: 'obladnannya-dlya-spectekhniki',
                url: '/products/obladnannia-dlya-spetstekhniki/'
            },
            {
                name: 'Підйомники',
                filterTestId: 'pidiomniki',
                url: '/products/pidiomniki/'
            },
            {
                name: 'Техніка для земляних робіт',
                filterTestId: 'tekhnika-dlya-zemlyanikh-robit',
                url: '/products/tekhnika-dlya-zemlianikh-robit/'
            }
        ]
    },
    {
        name: 'Комунальна техніка',
        filterTestId: 'komunalna-tekhnika',
        url: '/products/komunalna-tekhnika/',
        subcategories: [
            {
                name: 'Аварійні машини',
                filterTestId: 'avariini-mashini',
                url: '/products/avariini-mashini'
            },
            {
                name: 'Дорожньо-прибиральна техніка',
                filterTestId: 'dorozhno-pribiralna-tekhnika',
                url: '/products/dorozhno-pribiralna-tekhnika'
            },
            {
                name: 'Клінінгове обладнання',
                filterTestId: 'kliningove-obladnannya',
                url: 'products/kliningove-obladnannia/'
            },
            {
                name: 'Комунальні контейнери',
                filterTestId: 'komunalni-konteineri',
                url: 'products/komunalni-konteineri/'
            },
            {
                name: 'Комунальні машини',
                filterTestId: 'komunalni-mashini',
                url: '/products/komunalni-mashini/'
            },
            {
                name: 'Обладнання для комунальної техніки',
                filterTestId: 'obladnannya-dlya-komunalnoyi-tekhniki',
                url: '/products/obladnannia-dlya-komunalnoyi-tekhniki/'
            },
            {
                name: 'Сільськогосподарська техніка',
                filterTestId: 'silskogospodarska-tekhnika',
                url: ''
            }
        ]
    },
    {
        name: 'Складська техніка',
        filterTestId: 'skladska-tekhnika',
        url: '/products/skladska-tekhnika/',
        subcategories: [
            {
                name: 'Обладнання для навантажувачів',
                filterTestId: 'obladnannya-dlya-navantazhuvachiv',
                url: '/products/Obladnannya-dlya-navantazhuvachiv/'
            },
            {
                name: 'Техніка для складування',
                filterTestId: 'tekhnika-dlya-skladuvannya',
                url: '/products/tekhnika-dlya-skladuvannia/'
            }
        ]
    }
];