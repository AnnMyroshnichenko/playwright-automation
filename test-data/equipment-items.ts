export interface EquipmentItem {
  name: string;
  categoryId: string;
  filterId: string;
  url: string;
  skipFilterCheck?: boolean;
}

export interface EquipmentTab {
  tabName: string;
  tabId: string;
  items: EquipmentItem[];
}

export const equipmentTabs: EquipmentTab[] = [
  {
    tabName: 'Popular',
    tabId: 'specialEquipment__populyarna',
    items: [
      {
        name: 'Sivalki',
        categoryId: 'category__sivalki',
        filterId: 'posivna-ta-sadilna-tekhnika',
        url: '/products/posivna-ta-sadilna-tekhnika/',
      },
      {
        name: 'Traktori',
        categoryId: 'category__traktori',
        filterId: 'traktori',
        url: '/products/traktori/',
      },
      {
        name: 'Obpriskuvachi',
        categoryId: 'category__obpriskuvachi',
        filterId: 'tekhnika-dlya-polivu-ta-zroshennya',
        url: '/products/tekhnika-dlya-polivu-ta-zroshennia/',
      },
      {
        name: 'Ekskavatori',
        categoryId: 'category__ekskavatori',
        filterId: 'ekskavatori',
        url: '/products/ekskavatori/',
      },
      {
        name: 'Navantazhuvachi',
        categoryId: 'category__navantazhuvachi',
        filterId: 'navantazhuvachi',
        url: '/products/navantazhuvachi/',
      },
      {
        name: 'Pidiomniki',
        categoryId: 'category__pidiomniki',
        filterId: 'pidiomniki',
        url: '/products/pidiomniki/',
      },
      {
        name: 'Komunalni Mashini',
        categoryId: 'category__komunalni-mashini',
        filterId: 'komunalni-mashini',
        url: '/products/komunalni-mashini/',
      },
    ],
  },
  {
    tabName: 'Agricultural',
    tabId: 'specialEquipment__silskogospodarska',
    items: [
      {
        name: 'Traktori',
        categoryId: 'category__traktori',
        filterId: 'traktori',
        url: '/products/traktori/',
      },
      {
        name: 'Zhatki',
        categoryId: 'category__zhatki',
        filterId: 'zhatki',
        url: '/products/zhatki/',
      },
      {
        name: 'Kombaini',
        categoryId: 'category__kombaini',
        filterId: 'kombaini',
        url: '/products/kombaini/',
      },
      {
        name: 'Sivalki',
        categoryId: 'category__sivalki',
        filterId: 'posivna-ta-sadilna-tekhnika',
        url: '/products/posivna-ta-sadilna-tekhnika/',
      },
      {
        name: 'Obpriskuvachi',
        categoryId: 'category__obpriskuvachi',
        filterId: 'tekhnika-dlya-polivu-ta-zroshennya',
        url: '/products/tekhnika-dlya-polivu-ta-zroshennia/',
      },
      {
        name: 'Droni',
        categoryId: 'category__droni',
        filterId: 'insha-silgosptekhnika',
        url: '/products/insha-silgosptekhnika/',
      },
      {
        name: 'Lisozagotivelna tekhnika',
        categoryId: 'category__lisozagotivelna-tekhnika',
        filterId: 'lisozagotivelna-tekhnika',
        url: '/products/lisozagotivelna-tekhnika/',
      },
    ],
  },
  {
    tabName: 'Building',
    tabId: 'specialEquipment__budivelna',
    items: [
      {
        name: 'Ekskavatori',
        categoryId: 'category__ekskavatori',
        filterId: 'ekskavatori',
        url: '/products/ekskavatori/',
      },
      {
        name: 'Avtokrani',
        categoryId: 'category__avtokrani',
        filterId: 'avtokrani', //missing
        url: '/products/avtokrani/',
        skipFilterCheck: true,
      },
      {
        name: 'Navantazhuvachi',
        categoryId: 'category__navantazhuvachi',
        filterId: 'navantazhuvachi',
        url: '/products/navantazhuvachi/',
      },
      {
        name: 'Katki',
        categoryId: 'category__katki',
        filterId: 'katki',
        url: '/products/katki/',
      },
      {
        name: 'Pidiomniki',
        categoryId: 'category__pidiomniki',
        filterId: 'pidiomniki',
        url: '/products/pidiomniki/',
      },
      {
        name: 'Tekhnika dlya zemlyanikh robit',
        categoryId: 'category__tekhnika-dlya-zemlyanikh-robit',
        filterId: 'tekhnika-dlya-zemlyanikh-robit',
        url: '/products/tekhnika-dlya-zemlianikh-robit/',
      },
      {
        name: 'Dorozhno-budivelna tekhnika',
        categoryId: 'category__dorozhno-budivelna-tekhnika',
        filterId: 'dorozhno-budivelna-tekhnika',
        url: '/products/dorozhno-budivelna-tekhnika/',
      },
    ],
  },
  {
    tabName: 'Other',
    tabId: 'specialEquipment__insha',
    items: [
      {
        name: 'Dorozhnya tekhnika',
        categoryId: 'category__dorozhnya-tekhnika',
        filterId: 'dorozhno-pribiralna-tekhnika',
        url: '/products/dorozhno-pribiralna-tekhnika/',
      },
      {
        name: 'Komunalna tekhnika',
        categoryId: 'category__komunalna-tekhnika',
        filterId: 'insha-komunalna-tekhnika',
        url: '/products/insha-komunalna-tekhnika/',
      },
      {
        name: 'Vantazhivki',
        categoryId: 'category__vantazhivki',
        filterId: 'tekhnika-dlya-transportuvannya',
        url: '/products/tekhnika-dlya-transportuvannia/',
      },
      {
        name: 'Avariina tekhnika',
        categoryId: 'category__avariina-tekhnika',
        filterId: 'avariini-mashini',
        url: '/products/avariini-mashini/',
      },
      {
        name: 'Pribiralna tekhnika',
        categoryId: 'category__pribiralna-tekhnika',
        filterId: 'kliningove-obladnannya',
        url: '/products/kliningove-obladnannia/',
      },
      {
        name: 'Skladska tekhnika',
        categoryId: 'category__skladska-tekhnika',
        filterId: 'obladnannia-dlya-navantazhuvachiv', //missing
        url: '/products/obladnannia-dlya-navantazhuvachiv/',
        skipFilterCheck: true,
      },
      {
        name: 'Tekhnika dlya skladuvannya',
        categoryId: 'category__tekhnika-dlya-skladuvannya',
        filterId: 'tekhnika-dlya-skladuvannya',
        url: '/products/tekhnika-dlya-skladuvannia/',
      },
    ],
  },
];
