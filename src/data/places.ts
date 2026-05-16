export type Region =
  | "Брестская"
  | "Витебская"
  | "Гомельская"
  | "Гродненская"
  | "Минская"
  | "Могилёвская";

export type Category = "Архитектура" | "Природа" | "Отдых с детьми";
export type LeisureType = "История" | "Водоёмы" | "Агроусадьбы" | "Музеи" | "Природа";

export interface Place {
  id: string;
  name: string;
  city: string;
  region: Region;
  category: Category;
  leisure: LeisureType;
  rating: number;
  lat: number;
  lng: number;
  image: string;
  gallery: string[];
  short: string;
  description: string;
  address: string;
  hours: string;
  price: string;
}

import brestImg from "@/assets/places/brest-fortress.jpg";
import pushchaImg from "@/assets/places/belovezhskaya.jpg";
import mirImg from "@/assets/places/mir-castle.jpg";
import nesvizhImg from "@/assets/places/nesvizh.jpg";
import sofiaImg from "@/assets/places/sofia.jpg";
import braslavImg from "@/assets/places/braslav.jpg";
import libraryImg from "@/assets/places/library.jpg";
import khatynImg from "@/assets/places/khatyn.jpg";
import soligorskImg from "@/assets/places/soligorsk.jpg";
import lidaImg from "@/assets/places/lida.jpg";
import strochitsyImg from "@/assets/places/strochitsy.jpg";
import blueImg from "@/assets/places/blue-lakes.jpg";

const gal = (main: string) => [main, main, main];

export const PLACES: Place[] = [
  {
    id: "brest-fortress",
    name: "Брестская крепость",
    city: "Брест",
    region: "Брестская",
    category: "Архитектура",
    leisure: "История",
    rating: 4.8,
    lat: 52.0826, lng: 23.6589,
    image: brestImg, gallery: gal(brestImg),
    short: "Мемориальный комплекс, символ мужества и стойкости защитников.",
    description: "Брестская крепость — один из самых известных мемориальов СССР. Сегодня это место памяти, где сохранены руины, скульптуры и Вечный огонь.",
    address: "ул. Героев Обороны Брестской крепости, Брест",
    hours: "Ежедневно 9:00 – 18:00",
    price: "От 5 BYN",
  },
  {
    id: "belovezhskaya",
    name: "Беловежская пуща",
    city: "Каменюки",
    region: "Брестская",
    category: "Природа",
    leisure: "Природа",
    rating: 4.9,
    lat: 52.7036, lng: 23.8667,
    image: pushchaImg, gallery: gal(pushchaImg),
    short: "Древнейший лес Европы и резиденция Деда Мороза.",
    description: "Объект Всемирного наследия ЮНЕСКО. Дом для зубров и других редких животных, велосипедные маршруты и экологические тропы.",
    address: "д. Каменюки, Каменецкий район",
    hours: "Ежедневно 9:00 – 18:00",
    price: "От 9 BYN",
  },
  {
    id: "mir-castle",
    name: "Мирский замок",
    city: "Мир",
    region: "Гродненская",
    category: "Архитектура",
    leisure: "История",
    rating: 4.9,
    lat: 53.4513, lng: 26.4731,
    image: mirImg, gallery: gal(mirImg),
    short: "Жемчужина белорусского зодчества XVI века, наследие ЮНЕСКО.",
    description: "Один из самых живописных замков Восточной Европы, окружённый прудом и парком. Внутри — экспозиции, посвящённые жизни магнатов.",
    address: "пос. Мир, ул. Красноармейская 2",
    hours: "Вт–Вс 10:00 – 18:00",
    price: "14 BYN",
  },
  {
    id: "nesvizh",
    name: "Несвижский замок",
    city: "Несвиж",
    region: "Минская",
    category: "Архитектура",
    leisure: "История",
    rating: 4.9,
    lat: 53.2226, lng: 26.6914,
    image: nesvizhImg, gallery: gal(nesvizhImg),
    short: "Резиденция Радзивиллов с парком и легендами о Чёрной даме.",
    description: "Дворцово-парковый ансамбль XVI–XIX веков. Знаменит роскошными интерьерами и атмосферой средневековых легенд.",
    address: "г. Несвиж, ул. Замковая 2",
    hours: "Ежедневно 10:00 – 19:00",
    price: "17 BYN",
  },
  {
    id: "sofia",
    name: "Софийский собор",
    city: "Полоцк",
    region: "Витебская",
    category: "Архитектура",
    leisure: "История",
    rating: 4.7,
    lat: 55.4878, lng: 28.7585,
    image: sofiaImg, gallery: gal(sofiaImg),
    short: "Древнейший каменный храм Беларуси над рекой Западная Двина.",
    description: "Памятник архитектуры XI века, сегодня концертный зал органной музыки и музей. Виды на Двину — захватывающие.",
    address: "г. Полоцк, ул. Замковая 1",
    hours: "Ежедневно 11:00 – 19:00",
    price: "8 BYN",
  },
  {
    id: "braslav",
    name: "Браславские озёра",
    city: "Браслав",
    region: "Витебская",
    category: "Природа",
    leisure: "Водоёмы",
    rating: 4.9,
    lat: 55.6383, lng: 27.0411,
    image: braslavImg, gallery: gal(braslavImg),
    short: "Голубое ожерелье Беларуси — около 300 озёр среди холмов.",
    description: "Национальный парк с чистейшими озёрами, песчаными пляжами и потрясающими закатами. Идеальное место для кемпинга.",
    address: "Браславский район",
    hours: "Круглосуточно",
    price: "Бесплатно",
  },
  {
    id: "library",
    name: "Национальная библиотека",
    city: "Минск",
    region: "Минская",
    category: "Архитектура",
    leisure: "Музеи",
    rating: 4.6,
    lat: 53.9320, lng: 27.6504,
    image: libraryImg, gallery: gal(libraryImg),
    short: "Алмаз знаний — самое узнаваемое здание современного Минска.",
    description: "Ромбокубооктаэдр высотой 73 метра. На крыше — смотровая площадка с панорамой города.",
    address: "Минск, пр. Независимости 116",
    hours: "Ежедневно 12:00 – 23:00",
    price: "7 BYN",
  },
  {
    id: "khatyn",
    name: "Хатынь",
    city: "Логойский район",
    region: "Минская",
    category: "Архитектура",
    leisure: "История",
    rating: 4.8,
    lat: 54.3325, lng: 27.9436,
    image: khatynImg, gallery: gal(khatynImg),
    short: "Мемориальный комплекс в память о сожжённых деревнях.",
    description: "Один из самых пронзительных мемориалов Беларуси. Колокола Хатыни звонят каждые 30 секунд.",
    address: "Логойский район",
    hours: "Ежедневно 10:30 – 18:00",
    price: "5 BYN",
  },
  {
    id: "soligorsk",
    name: "Солигорские терриконы",
    city: "Солигорск",
    region: "Минская",
    category: "Природа",
    leisure: "Природа",
    rating: 4.5,
    lat: 52.7878, lng: 27.5378,
    image: soligorskImg, gallery: gal(soligorskImg),
    short: "Белорусские «горы» — соляные холмы с марсианскими видами.",
    description: "Необычный пейзаж, любимый фотографами и блогерами. Лучше посещать на закате.",
    address: "Солигорский район",
    hours: "Круглосуточно",
    price: "Бесплатно",
  },
  {
    id: "lida",
    name: "Лидский замок",
    city: "Лида",
    region: "Гродненская",
    category: "Архитектура",
    leisure: "История",
    rating: 4.6,
    lat: 53.8908, lng: 25.3014,
    image: lidaImg, gallery: gal(lidaImg),
    short: "Замок XIV века Гедимина — место рыцарских фестивалей.",
    description: "Один из старейших замков Беларуси. Летом проходят турниры и реконструкции средневековых сражений.",
    address: "г. Лида, ул. Замковая 1",
    hours: "Вт–Вс 10:00 – 18:00",
    price: "8 BYN",
  },
  {
    id: "strochitsy",
    name: "Музей народной архитектуры",
    city: "Строчицы",
    region: "Минская",
    category: "Отдых с детьми",
    leisure: "Музеи",
    rating: 4.7,
    lat: 53.8127, lng: 27.3667,
    image: strochitsyImg, gallery: gal(strochitsyImg),
    short: "Скансен под открытым небом: деревянное зодчество XIX века.",
    description: "Десятки аутентичных хат, ветряных мельниц и церквей со всей Беларуси. Часто проходят фестивали и мастер-классы.",
    address: "д. Строчицы, Минский район",
    hours: "Ср–Вс 10:00 – 18:00",
    price: "10 BYN",
  },
  {
    id: "blue-lakes",
    name: "Голубые озёра",
    city: "Мядельский район",
    region: "Минская",
    category: "Природа",
    leisure: "Водоёмы",
    rating: 4.8,
    lat: 55.0489, lng: 26.5450,
    image: blueImg, gallery: gal(blueImg),
    short: "Эко-тропа среди прозрачных карстовых озёр в Нарочанском парке.",
    description: "Кольцевая экологическая тропа 7 км с обзорной вышкой. Вода настолько прозрачная, что видно дно.",
    address: "Мядельский район",
    hours: "Круглосуточно",
    price: "5 BYN",
  },
];

export const REGIONS: Region[] = ["Брестская", "Витебская", "Гомельская", "Гродненская", "Минская", "Могилёвская"];
export const LEISURES: LeisureType[] = ["История", "Водоёмы", "Агроусадьбы", "Музеи", "Природа"];
export const CATEGORIES: Category[] = ["Архитектура", "Природа", "Отдых с детьми"];
