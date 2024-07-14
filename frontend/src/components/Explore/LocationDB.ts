// locationDb.ts
export interface Location {
  name: string;
  area: string;
  rating: number;
  priceRange: string;
  imageUrl: string;
  position: { lat: number; lng: number };
}

const locationDb: Location[] = [
  {
    name: "Suối Tiên",
    area: "Thủ Đức, Hồ Chí Minh City",
    rating: 4.8,
    priceRange: "100.000VND-1.000.000VND",
    imageUrl:
      "https://gonatour.vn/vnt_upload/news/09_2020/khu_du_lich_suoi_tien.jpg",
    position: { lat: 10.9802, lng: 106.6367 },
  },
  {
    name: "Chợ Bến Thành",
    area: "Quận 1, Hồ Chí Minh City",
    rating: 4.8,
    priceRange: "100.000VND-1.000.000VND",
    imageUrl:
      "https://dulich3mien.vn/wp-content/uploads/2021/12/hinh-anh-cho-ben-thanh.jpg",
    position: { lat: 10.772, lng: 106.6983 },
  },
  {
    name: "Landmark 81",
    area: "Bình Thạnh, Hồ Chí Minh City",
    rating: 4.8,
    priceRange: "100.000VND-1.000.000VND",
    imageUrl:
      "https://www.vinhomescentralpark.co/wp-content/uploads/2021/04/landmark81-2.jpeg",
    position: { lat: 10.7941, lng: 106.7216 },
  },
  {
    name: "Đường Sách Nguyễn Văn Bình",
    area: "Quận 1, Hồ Chí Minh City",
    rating: 4.8,
    priceRange: "0VND-500.000VND",
    imageUrl:
      "https://tphcm.dangcongsan.vn/DATA/72/2020/11/%C4%91%C6%B0%E1%BB%9Dng_s%C3%A1ch-09_58_10_491.jpg",
    position: { lat: 10.7799, lng: 106.6993 },
  },
  // Add more locations here...
];

export default locationDb;
