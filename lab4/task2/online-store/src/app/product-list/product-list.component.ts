import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 128Gb Blue',
      description: 'Apple iPhone 15 - смартфон, сочетающий в себе передовую оптику, мощный процессор, долгоиграющую батарею и запоминающийся дизайн',
      price: 545000,
      rating: 4.9,
      image: 'https://resources.cdn-kaspi.kz/img/m/p/h01/h5f/86303746293790.jpg?format=gallery-medium',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg', 'https://resources.cdn-kaspi.kz/img/m/p/h2a/h58/84378448265246.jpg', 'https://resources.cdn-kaspi.kz/img/m/p/h3d/h3e/84378448330782.jpg'],
      link: 'https://kaspi.kz/shop/p/apple-iphone-15-128gb-goluboi-113137929/?c=750000000'
    },
   {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra 256Gb Black',
      description: 'Представляем вам Samsung Galaxy S24 Ultra 5G — смартфон, который сочетает в себе высокую производительность, премиальный дизайн и инновационные технологии. С этим устройством вы сможете наслаждаться качеством изображения и скоростью работы в любых условиях.',
      price: 450000,
      rating: 4.8,
      image: 'https://resources.cdn-kaspi.kz/img/m/p/h7c/h38/84963297329182.png?format=gallery-medium',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/hfe/ha8/84963297394718.png?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h3d/h3e/84378448330782.jpg'],
      link: 'https://kaspi.kz/shop/p/samsung-galaxy-s24-ultra-5g-12-gb-256-gb-seryi-116043556/?c=750000000'
   },
   {
      id: 3,
      name: 'Xiaomi Redmi Note 12 Pro 256gb Black',
      description: 'The first Xiaomi phone with a 120W fast charging and 200MP camera.',
      price: 150000,
      rating: 4.7,
      image: 'https://resources.cdn-kaspi.kz/img/m/p/hec/h2e/82885741805598.jpg?format=preview-large',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg', 'https://resources.cdn-kaspi.kz/img/m/p/h2a/h58/84378448265246.jpg', 'https://resources.cdn-kaspi.kz/img/m/p/h3d/h3e/84378448330782.jpg'],
      link: 'https://kaspi.kz/shop/p/xiaomi-redmi-note-12-pro-5g-12-gb-256-gb-chernyi-112608957/?c=750000000'
   },
    {
      id: 4,
      name: 'Google Pixel 9 Pro 128Gb Black',
      description: 'Google Pixel 9 Pro XL — это флагманский смартфон с передовыми технологиями и безупречным дизайном. Наслаждайтесь исключительной производительностью и потрясающими фотографиями!',
      price: 450000,
      rating: 4.6,
      image: 'https://resources.cdn-kaspi.kz/img/m/p/pdd/pb6/3092410.jpeg?format=preview-large',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/pdd/pb6/3092410.jpeg?format=preview-large', 'https://resources.cdn-kaspi.kz/img/m/p/h2a/h58/84378448265246.jpg', 'https://resources.cdn-kaspi.kz/img/m/p/h3d/h3e/84378448330782.jpg'],
      link: 'https://kaspi.kz/shop/p/google-pixel-9-pro-xl-16-gb-128-gb-chernyi-128508316/?c=750000000'
    },
    {
      id: 5,
      name: 'OnePlus 11 256Gb Black',
      description: 'The first OnePlus phone with a 120Hz AMOLED display and Snapdragon 8 Gen 2 chip.',
      price: 300000,
      rating: 4.5,
      image: 'https://resources.cdn-kaspi.kz/img/m/p/ha2/h3d/68516688232478.jpg?format=preview-large',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/ha2/h3d/68516688232478.jpg?format=preview-large', 'https://resources.cdn-kaspi.kz/img/m/p/h2a/h58/84378448265246.jpg', 'https://resources.cdn-kaspi.kz/img/m/p/h3d/h3e/84378448330782.jpg'],
      link: 'https://kaspi.kz/shop/p/oneplus-11-8-gb-128-gb-chernyi-108703434/?c=750000000'
    },
    {
      id: 6,
      name: 'Sony Xperia 1 VII 256Gb Black',
      description: 'The first Sony phone with a 4K OLED display and Snapdragon 8 Gen 1 chip.',
      price: 889000,
      rating: 5.0,
      image: 'https://resources.cdn-kaspi.kz/img/m/p/p1b/pb8/48876082.jpg?format=preview-large',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/p1b/pb8/48876082.jpg?format=preview-large', 'https://resources.cdn-kaspi.kz/img/m/p/h2a/h58/84378448265246.jpg', 'https://resources.cdn-kaspi.kz/img/m/p/h3d/h3e/84378448330782.jpg'],
      link: 'https://kaspi.kz/shop/p/sony-xperia-1-vii-12-gb-512-gb-chernyi-141356688/?c=750000000'
    },
    {
      id: 7,
      name: 'Huawei Pura 80 Pro 12 ГБ/512 ГБ красный + подарок',
      description: 'The first Huawei phone with a 120Hz OLED display and Kirin 9000 chip.',
      price: 250000,
      rating: 4.3,
      image: 'https://resources.cdn-kaspi.kz/img/m/p/p07/pea/77950003.png?format=preview-large',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/p07/pea/77950003.png?format=preview-large', 'https://resources.cdn-kaspi.kz/img/m/p/h2a/h58/84378448265246.jpg', 'https://resources.cdn-kaspi.kz/img/m/p/h3d/h3e/84378448330782.jpg'],
      link: 'https://kaspi.kz/shop/p/huawei-pura-80-pro-12-gb-512-gb-krasnyi-podarok-149573218/?c=750000000'
    },
      {
      id: 8,
      name: 'Nubia Red Magic 10 Pro 16 ГБ/512 ГБ белый',
      description: 'Смартфон Nubia Red Magic 10 Pro — это мощное устройство с впечатляющими характеристиками, которое идеально подходит для геймеров и любителей высоких технологий. С экраном с частотой обновления 144 Гц и мощным процессором Snapdragon 8 Elite вы получите невероятный опыт использования.',
      price: 550000,
      rating: 4.2,
      image: 'https://resources.cdn-kaspi.kz/img/m/p/pd4/p8f/50746252.jpg?format=preview-large',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/pd4/p8f/50746252.jpg?format=preview-large', 'https://resources.cdn-kaspi.kz/img/m/p/h2a/h58/84378448265246.jpg', 'https://resources.cdn-kaspi.kz/img/m/p/h3d/h3e/84378448330782.jpg'],
      link: 'https://kaspi.kz/shop/p/nubia-red-magic-10-pro-16-gb-512-gb-belyi-131924167/?c=750000000'
      },
      {
      id: 9,
      name: 'Xiaomi 13 Ultra 5G 16 ГБ/512 ГБ черный',
      description: 'Xiaomi 13 Ultra 5G 16 ГБ/512 ГБ в черном цвете — это смартфон с флагманской производительностью, мощным процессором Snapdragon 8 Gen 2, 6.73-дюймовым AMOLED-дисплеем с разрешением 3200x1440 и частотой обновления 120 Гц, а также системой из четырех камер на 50 Мп, разработанной совместно с Leica. Модель обладает аккумулятором на 5000 мАч с поддержкой быстрой проводной (до 90 Вт) и беспроводной (до 50 Вт) зарядки, а также защитой от влаги и пыли по стандарту IP68',
      price: 363637,
      rating: 4.1,
      image: 'https://resources.cdn-kaspi.kz/img/m/p/h42/h9d/81334476177438.jpg?format=preview-large', 
      images: ['https://resources.cdn-kaspi.kz/img/m/p/h42/h9d/81334476177438.jpg?format=preview-large', 'https://resources.cdn-kaspi.kz/img/m/p/h2a/h58/84378448265246.jpg', 'https://resources.cdn-kaspi.kz/img/m/p/h3d/h3e/84378448330782.jpg'],
      link: 'https://kaspi.kz/shop/p/xiaomi-13-ultra-5g-16-gb-512-gb-chernyi-110918043/?c=750000000'
      },
    {
      id: 10,
      name: 'Смартфон Realme GT 8 Pro 16 ГБ/512 ГБ синий',
      description: 'Смартфон realme GT 8 Pro в белом корпусе из пластика и металла имеет встроенную память объемом 512 ГБ. Этого хватает для десятков приложений и тысяч фотографий. Безрамочный AMOLED-экран диагональю 6.79 дюйма обладает разрешением 3136x1440 пикс. За быстрое функционирование смартфона отвечает оперативная память объемом 16 ГБ и 8-ядерный процессор Qualcomm Snapdragon 8 Elite Gen 5.Основная камера с 7-элементной линзой состоит из 3 модулей, которые в совокупности позволяют делать снимки разрешением до 200 Мп. Видеосъемка может вестись в двойном режиме и в стандарте Dolby Vision. Панель блока камер имеет съемную конструкцию. Кроме стандартной и быстрой зарядки, realme GT 8 Pro поддерживает беспроводную. За защиту конфиденциальности данных пользователя отвечают сканеры распознавания лица и отпечатков пальцев (в экране).',
      price: 180000,
      rating: 4.0,
      image: 'https://resources.cdn-kaspi.kz/img/m/p/p4e/pb4/96245343.jpg?format=gallery-medium',
      images: ['https://resources.cdn-kaspi.kz/img/m/p/p4e/pb4/96245343.jpg?format=gallery-medium', 'https://resources.cdn-kaspi.kz/img/m/p/h2a/h58/84378448265246.jpg',],
      link: 'https://kaspi.kz/shop/p/realme-gt-2-pro-256gb-dual-sim-chernyi-113133111/'
    },

  ];

  shareOnWhatsApp(product: Product) {
    const text = encodeURIComponent(`Check out this product: ${product.link}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  shareOnTelegram(product: Product) {
    const url = encodeURIComponent(product.link);
    const text = encodeURIComponent(product.name);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
  }
}