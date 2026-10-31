export interface ServiceItem {
  name: string;
  serviceId: string;
  filterId: string;
}

export interface ServiceTab {
  tabName: string;
  tabId: string;
  items: ServiceItem[];
}

const popularAndBuildingServices: ServiceItem[] = [
  {
    name: 'Burinnya',
    serviceId: 'service__burinnya',
    filterId: 'burinnya',
  },
  {
    name: 'Navantazhuvannya ta rozvantazhuvannya materialiv',
    serviceId: 'service__navantazhuvannya-ta-rozvantazhuvannya-materialiv',
    filterId: 'navantazhuvannya-ta-rozvantazhuvannya-materialiv',
  },
  {
    name: 'Viviz pobutovogo smittya',
    serviceId: 'service__viviz-pobutovogo-smittya',
    filterId: 'viviz-pobutovogo-smittya',
  },
  {
    name: 'Rittya transhei dlya pidzemnikh komunikacii',
    serviceId: 'service__rittya-transhei-dlya-pidzemnikh-komunikacii',
    filterId: 'rittya-transhei-dlya-pidzemnikh-komunikacii',
  },
  {
    name: 'Zalivka betonu',
    serviceId: 'service__zalivka-betonu',
    filterId: 'zalivka-betonu',
  },
  {
    name: 'Transportuvannya vantazhu ta pidiom na visotu',
    serviceId: 'service__transportuvannya-vantazhu-ta-pidiom-na-visotu',
    filterId: 'transportuvannya-vantazhu-ta-pidiom-na-visotu',
  },
  {
    name: 'Rittya yam',
    serviceId: 'service__rittya-yam',
    filterId: 'rittya-yam',
  },
];

export const servicesTabs: ServiceTab[] = [
  {
    tabName: 'Popular',
    tabId: 'services__populyarna',
    items: popularAndBuildingServices,
  },
  {
    tabName: 'Agricultural',
    tabId: 'services__silskogospodarski',
    items: [],
  },
  {
    tabName: 'Building',
    tabId: 'services__budivelni',
    items: popularAndBuildingServices,
  },
  {
    tabName: 'Other',
    tabId: 'services__inshi',
    items: [
      {
        name: 'Pidiomni roboti',
        serviceId: 'service__pidiomni-roboti',
        filterId: 'pidiomni-roboti',
      },
      {
        name: 'Ochishennya ta viviz snigu',
        serviceId: 'service__ochishennya-ta-viviz-snigu',
        filterId: 'ochishennya-ta-viviz-snigu',
      },
    ],
  },
];
