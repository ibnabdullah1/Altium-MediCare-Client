import { Districts } from "../types/types";

export const productsData = [
  {
    title: "Modern Smartwatch",
    price: 110.0,
    originalPrice: 130.0,
    discount: "15%",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    sku: "1510",
    availability: "10 left in stock",
    vendor: "Vendor A",
    type: "Type A",
    variants: {
      sizes: ["S", "M", "L", "XL"],
      colors: ["#000000", "#C0C0C0", "#FFC0CB", "#0000FF"], // Black, Silver, Rose Gold, Blue
    },
    thumbnail: "https://i.ibb.co/ykGR8bX/product6.webp",
    images: [
      "https://i.ibb.co/ykGR8bX/product6.webp",
      "https://i.ibb.co/ykGR8bX/product6.webp",
      "https://i.ibb.co/ykGR8bX/product6.webp",
    ],
  },
  {
    title: "Wireless Earbuds",
    price: 60.0,
    originalPrice: 80.0,
    discount: "25%",
    description: "High-quality wireless earbuds with noise cancellation.",
    sku: "1520",
    availability: "20 left in stock",
    vendor: "Vendor B",
    type: "Type B",
    variants: {
      sizes: ["One Size"],
      colors: ["#000000", "#FFFFFF", "#0000FF"], // Black, White, Blue
    },
    thumbnail: "https://i.ibb.co/gDpV8yz/product5.webp",
    images: [
      "https://i.ibb.co/gDpV8yz/product5.webp",
      "https://i.ibb.co/gDpV8yz/product5.webp",
    ],
  },
  {
    title: "4K Ultra HD TV",
    price: 500.0,
    originalPrice: 600.0,
    discount: "17%",
    description: "Enjoy stunning 4K Ultra HD resolution with this TV.",
    sku: "1530",
    availability: "5 left in stock",
    vendor: "Vendor C",
    type: "Type C",
    variants: {
      sizes: ["55 inch", "65 inch"],
      colors: ["#000000"],
    },
    thumbnail: "https://i.ibb.co/McY5f2V/product4.webp",
    images: [
      "https://i.ibb.co/McY5f2V/product4.webp",
      "https://i.ibb.co/McY5f2V/product4.webp",
    ],
  },
  {
    title: "Gaming Laptop",
    price: 1200.0,
    originalPrice: 1400.0,
    discount: "14%",
    description: "High-performance laptop for gamers.",
    sku: "1540",
    availability: "8 left in stock",
    vendor: "Vendor D",
    type: "Type D",
    variants: {
      sizes: ["15.6 inch"],
      colors: ["#000000", "#808080"], // Black, Gray
    },
    thumbnail: "https://i.ibb.co/rFQT1wV/product3.webp",
    images: [
      "https://i.ibb.co/rFQT1wV/product3.webp",
      "https://i.ibb.co/rFQT1wV/product3.webp",
    ],
  },
  {
    title: "Bluetooth Speaker",
    price: 45.0,
    originalPrice: 60.0,
    discount: "25%",
    description: "Portable Bluetooth speaker with deep bass.",
    sku: "1550",
    availability: "15 left in stock",
    vendor: "Vendor E",
    type: "Type E",
    variants: {
      sizes: ["One Size"],
      colors: ["#FF0000", "#000000", "#808080"], // Red, Black, Gray
    },
    thumbnail: "https://i.ibb.co/z7BHpQJ/product2.webp",
    images: [
      "https://i.ibb.co/z7BHpQJ/product2.webp",
      "https://i.ibb.co/z7BHpQJ/product2.webp",
    ],
  },
  {
    title: "Smart Home Thermostat",
    price: 130.0,
    originalPrice: 150.0,
    discount: "13%",
    description: "Smart thermostat for efficient home temperature control.",
    sku: "1560",
    availability: "12 left in stock",
    vendor: "Vendor F",
    type: "Type F",
    variants: {
      sizes: ["One Size"],
      colors: ["#FFFFFF", "#000000"], // White, Black
    },
    thumbnail: "https://i.ibb.co/NFMgrzM/product1.webp",
    images: [
      "https://i.ibb.co/NFMgrzM/product1.webp",
      "https://i.ibb.co/NFMgrzM/product1.webp",
    ],
  },
  {
    title: "Digital Camera",
    price: 700.0,
    originalPrice: 800.0,
    discount: "12%",
    description: "Capture stunning photos with this digital camera.",
    sku: "1570",
    availability: "7 left in stock",
    vendor: "Vendor G",
    type: "Type G",
    variants: {
      sizes: ["One Size"],
      colors: ["#000000"],
    },
    thumbnail: "https://i.ibb.co/z7BHpQJ/product2.webp",
    images: [
      "https://i.ibb.co/z7BHpQJ/product2.webp",
      "https://i.ibb.co/z7BHpQJ/product2.webp",
    ],
  },
  {
    title: "Electric Toothbrush",
    price: 90.0,
    originalPrice: 100.0,
    discount: "10%",
    description: "Rechargeable electric toothbrush with multiple modes.",
    sku: "1580",
    availability: "25 left in stock",
    vendor: "Vendor H",
    type: "Type H",
    variants: {
      sizes: ["One Size"],
      colors: ["#FFFFFF", "#0000FF"], // White, Blue
    },
    thumbnail: "https://i.ibb.co/z7BHpQJ/product2.webp",
    images: [
      "https://i.ibb.co/z7BHpQJ/product2.webp",
      "https://i.ibb.co/z7BHpQJ/product2.webp",
    ],
  },
  {
    title: "Portable Air Conditioner",
    price: 300.0,
    originalPrice: 350.0,
    discount: "14%",
    description: "Stay cool with this portable air conditioner.",
    sku: "1590",
    availability: "6 left in stock",
    vendor: "Vendor I",
    type: "Type I",
    variants: {
      sizes: ["One Size"],
      colors: ["#FFFFFF", "#808080"], // White, Gray
    },
    thumbnail: "https://i.ibb.co/NFMgrzM/product1.webp",
    images: [
      "https://i.ibb.co/NFMgrzM/product1.webp",
      "https://i.ibb.co/NFMgrzM/product1.webp",
    ],
  },
  {
    title: "Fitness Tracker",
    price: 70.0,
    originalPrice: 85.0,
    discount: "18%",
    description: "Track your fitness progress with this sleek tracker.",
    sku: "1600",
    availability: "30 left in stock",
    vendor: "Vendor J",
    type: "Type J",
    variants: {
      sizes: ["One Size"],
      colors: ["#000000", "#00FF00", "#0000FF"], // Black, Green, Blue
    },
    thumbnail: "https://i.ibb.co/NFMgrzM/product1.webp",
    images: [
      "https://i.ibb.co/NFMgrzM/product1.webp",
      "https://i.ibb.co/NFMgrzM/product1.webp",
    ],
  },
  {
    title: "Smartphone Charger",
    price: 20.0,
    originalPrice: 25.0,
    discount: "20%",
    description: "Fast-charging smartphone charger with USB-C support.",
    sku: "1610",
    availability: "50 left in stock",
    vendor: "Vendor K",
    type: "Type K",
    variants: {
      sizes: ["One Size"],
      colors: ["#FFFFFF", "#000000"], // White, Black
    },
    thumbnail: "https://i.ibb.co/z7BHpQJ/product2.webp",
    images: [
      "https://i.ibb.co/z7BHpQJ/product2.webp",
      "https://i.ibb.co/z7BHpQJ/product2.webp",
    ],
  },
  {
    title: "High-End Blender",
    price: 150.0,
    originalPrice: 180.0,
    discount: "17%",
    description: "Powerful blender for all your kitchen needs.",
    sku: "1620",
    availability: "9 left in stock",
    vendor: "Vendor L",
    type: "Type L",
    variants: {
      sizes: ["One Size"],
      colors: ["#FF0000", "#000000"], // Red, Black
    },
    thumbnail: "https://i.ibb.co/z7BHpQJ/product2.webp",
    images: [
      "https://i.ibb.co/z7BHpQJ/product2.webp",
      "https://i.ibb.co/z7BHpQJ/product2.webp",
    ],
  },
  {
    title: "Electric Kettle",
    price: 45.0,
    originalPrice: 55.0,
    discount: "18%",
    description: "Boil water quickly with this electric kettle.",
    sku: "1630",
    availability: "40 left in stock",
    vendor: "Vendor M",
    type: "Type M",
    variants: {
      sizes: ["One Size"],
      colors: ["#FFFFFF", "#0000FF"], // White, Blue
    },
    thumbnail: "https://i.ibb.co/z7BHpQJ/product2.webp",
    images: [
      "https://i.ibb.co/z7BHpQJ/product2.webp",
      "https://i.ibb.co/z7BHpQJ/product2.webp",
    ],
  },
];
export const notifications = [
  {
    id: 1,
    image: "https://www.svgrepo.com/show/492676/avatar-boy.svg",
    name: "Realty Team",
    message: "New property listed: 4-bedroom house in downtown!",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    image: "https://www.svgrepo.com/show/492680/avatar-girl.svg",
    name: "Jane Doe",
    message: "Price drop alert: 2-bedroom apartment now 10% off.",
    timestamp: "09:00 AM",
  },
  {
    id: 3,
    image: "https://www.svgrepo.com/show/492669/avatar-boy.svg",
    name: "John Smith",
    message: "New inquiry received for the luxury villa in the suburbs.",
    timestamp: "08:00 AM",
  },
  {
    id: 4,
    image: "https://www.svgrepo.com/show/492683/avatar-girl.svg",
    name: "Open House",
    message: "Open house event today at 5 PM for the new listings.",
    timestamp: "07:00 AM",
  },
];

export const topSalesItems = [
  {
    itemName: "Burger Deluxe",
    price: 15.99,
    totalRevenue: 159.9,
    image: "https://i.ibb.co/Zc9qTZc/1-1.png",
  },
  {
    itemName: "Cheese Pizza",
    price: 12.99,
    totalRevenue: 129.9,
    image: "https://i.ibb.co/Zc9qTZc/1-1.png",
  },
  {
    itemName: "Spaghetti Bolognese",
    price: 18.5,
    totalRevenue: 185.0,
    image: "https://i.ibb.co/Zc9qTZc/1-1.png",
  },
  {
    itemName: "Grilled Chicken Salad",
    price: 10.75,
    totalRevenue: 107.5,
    image: "https://i.ibb.co/Zc9qTZc/1-1.png",
  },
  {
    itemName: "Fish Tacos",
    price: 14.25,
    totalRevenue: 142.5,
    image: "https://i.ibb.co/Zc9qTZc/1-1.png",
  },
  {
    itemName: "Fish Tacos",
    price: 14.25,
    totalRevenue: 142.5,
    image: "https://i.ibb.co/Zc9qTZc/1-1.png",
  },
];
export const ordersData = [
  {
    user: "John Doe",
    time: "2:00 PM",
    guest: 4,
    status: "Confirmed",
    date: "2024-12-01",
  },
  {
    user: "Jane Smith",
    time: "5:30 PM",
    guest: 2,
    status: "Pending",
    date: "2024-12-02",
  },
  {
    user: "Alice Johnson",
    time: "7:00 PM",
    guest: 3,
    status: "Canceled",
    date: "2024-12-03",
  },
  {
    user: "Bob Brown",
    time: "1:00 PM",
    guest: 6,
    status: "Confirmed",
    date: "2024-12-04",
  },
  {
    user: "Charlie Davis",
    time: "3:30 PM",
    guest: 5,
    status: "Pending",
    date: "2024-12-05",
  },
  {
    user: "Alice Johnson",
    time: "7:00 PM",
    guest: 3,
    status: "Canceled",
    date: "2024-12-03",
  },
];

export const productCategories = [
  { label: "Medicine", value: "Medicine" },
  { label: "Beauty", value: "Beauty" },
  { label: "Furniture", value: "Furniture" },
  { label: "Electronics", value: "Electronics" },
  { label: "Clothing", value: "Clothing" },
  { label: "Footwear", value: "Footwear" },
  { label: "Jewelry", value: "Jewelry" },
  { label: "Home Decor", value: "Home Decor" },
  { label: "Health & Wellness", value: "Health & Wellness" },
  { label: "Toys & Games", value: "Toys & Games" },
  { label: "Groceries", value: "Groceries" },
  { label: "Kitchen Appliances", value: "Kitchen Appliances" },
  { label: "Sports Equipment", value: "Sports Equipment" },
  { label: "Fitness Gear", value: "Fitness Gear" },
  { label: "Baby Products", value: "Baby Products" },
  { label: "Automotive", value: "Automotive" },
  { label: "Books & Stationery", value: "Books & Stationery" },
  { label: "Office Supplies", value: "Office Supplies" },
  { label: "Pet Supplies", value: "Pet Supplies" },
  { label: "Art & Craft", value: "Art & Craft" },
  { label: "Music Instruments", value: "Music Instruments" },
  { label: "Outdoor Gear", value: "Outdoor Gear" },
  { label: "Gardening Supplies", value: "Gardening Supplies" },
  { label: "Smart Home Devices", value: "Smart Home Devices" },
  { label: "Photography Equipment", value: "Photography Equipment" },
  { label: "Fashion Accessories", value: "Fashion Accessories" },
  { label: "Luggage & Travel", value: "Luggage & Travel" },
  { label: "Personal Care", value: "Personal Care" },
  { label: "Handbags & Wallets", value: "Handbags & Wallets" },
  { label: "Watches", value: "Watches" },
  { label: "Tech Gadgets", value: "Tech Gadgets" },
  { label: "Home Improvement", value: "Home Improvement" },
  { label: "Party Supplies", value: "Party Supplies" },
  { label: "Baby Gear", value: "Baby Gear" },
  { label: "Organic Food", value: "Organic Food" },
  { label: "Supplements & Vitamins", value: "Supplements & Vitamins" },
  { label: "Luxury Goods", value: "Luxury Goods" },
  { label: "DIY Tools", value: "DIY Tools" },
  { label: "Craft Supplies", value: "Craft Supplies" },
  { label: "Seasonal Items", value: "Seasonal Items" },
];

export const divisions = [
  { id: 1, name: "Dhaka" },
  { id: 2, name: "Chattogram" },
  { id: 3, name: "Khulna" },
  { id: 4, name: "Rajshahi" },
  { id: 5, name: "Barishal" },
  { id: 6, name: "Sylhet" },
  { id: 7, name: "Rangpur" },
  { id: 8, name: "Mymensingh" },
];

export const districts: Districts = {
  Dhaka: [
    {
      id: 1,
      name: "Dhaka",
      upazilas: ["Central Dhaka", "North Dhaka", "South Dhaka"],
    },
    {
      id: 2,
      name: "Gazipur",
      upazilas: ["Gazipur Sadar", "Kaliakoir", "Sreepur"],
    },
    {
      id: 3,
      name: "Narayanganj",
      upazilas: ["Narayanganj Sadar", "Araihazar", "Baldhara"],
    },
    {
      id: 4,
      name: "Tangail",
      upazilas: ["Tangail Sadar", "Madhupur", "Basail"],
    },
    {
      id: 5,
      name: "Kishoreganj",
      upazilas: ["Kishoreganj Sadar", "Bajitpur", "Karimganj"],
    },
    {
      id: 6,
      name: "Manikganj",
      upazilas: ["Manikganj Sadar", "Singair", "Shibalaya"],
    },
    {
      id: 7,
      name: "Madaripur",
      upazilas: ["Madaripur Sadar", "Ranishwar", "Kalkini"],
    },
    {
      id: 8,
      name: "Munshiganj",
      upazilas: ["Munshiganj Sadar", "Lohajang", "Sreenagar"],
    },
    {
      id: 9,
      name: "Shariatpur",
      upazilas: ["Shariatpur Sadar", "Zanjira", "Naria"],
    },
    {
      id: 10,
      name: "Chandpur",
      upazilas: ["Chandpur Sadar", "Haimchar", "Shahrasti"],
    },
  ],
  Chattogram: [
    {
      id: 1,
      name: "Chattogram",
      upazilas: ["Chattogram Sadar", "Banderban", "Rangamati"],
    },
    {
      id: 2,
      name: "Cox's Bazar",
      upazilas: ["Cox's Bazar Sadar", "Teknaf", "Ukhiya"],
    },
    {
      id: 3,
      name: "Cumilla",
      upazilas: ["Cumilla Sadar", "Brahmanpara", "Laksham"],
    },
    {
      id: 4,
      name: "Feni",
      upazilas: ["Feni Sadar", "Daganbhuiyan", "Parshuram"],
    },
    {
      id: 5,
      name: "Khagrachari",
      upazilas: ["Khagrachari Sadar", "Dighinala", "Mahalchhari"],
    },
    {
      id: 6,
      name: "Lakshmipur",
      upazilas: ["Lakshmipur Sadar", "Ramganj", "Ramgati"],
    },
    {
      id: 7,
      name: "Bandarban",
      upazilas: ["Bandarban Sadar", "Ruma", "Thanchi"],
    },
    {
      id: 8,
      name: "Brahmanbaria",
      upazilas: ["Brahmanbaria Sadar", "Nabinagar", "Bijoynagar"],
    },
  ],
  Khulna: [
    { id: 1, name: "Khulna", upazilas: ["Khulna Sadar", "Dacope", "Rupsa"] },
    {
      id: 2,
      name: "Jessore",
      upazilas: ["Jessore Sadar", "Bagherpara", "Jhikargachha"],
    },
    {
      id: 3,
      name: "Satkhira",
      upazilas: ["Satkhira Sadar", "Kalaroa", "Debhata"],
    },
    {
      id: 4,
      name: "Bagerhat",
      upazilas: ["Bagerhat Sadar", "Chitalmari", "Morrelganj"],
    },
    {
      id: 5,
      name: "Jashore",
      upazilas: ["Jashore Sadar", "Chaugachha", "Keshabpur"],
    },
    {
      id: 6,
      name: "Kushtia",
      upazilas: ["Kushtia Sadar", "Kumarkhali", "Mirpur"],
    },
    {
      id: 7,
      name: "Meherpur",
      upazilas: ["Meherpur Sadar", "Gangni", "Mujibnagar"],
    },
    {
      id: 8,
      name: "Chuadanga",
      upazilas: ["Chuadanga Sadar", "Alamdanga", "Damurhuda"],
    },
  ],
  Rajshahi: [
    {
      id: 1,
      name: "Rajshahi",
      upazilas: ["Rajshahi Sadar", "Bagmara", "Puthia"],
    },
    { id: 2, name: "Pabna", upazilas: ["Pabna Sadar", "Chatmohar", "Santhia"] },
    {
      id: 3,
      name: "Naogaon",
      upazilas: ["Naogaon Sadar", "Manda", "Raninagar"],
    },
    {
      id: 4,
      name: "Joypurhat",
      upazilas: ["Joypurhat Sadar", "Khetlal", "Kalai"],
    },
    { id: 5, name: "Bogra", upazilas: ["Bogra Sadar", "Dhunat", "Sherpur"] },
    {
      id: 6,
      name: "Chapainawabganj",
      upazilas: ["Chapainawabganj Sadar", "Shibganj", "Gomostapur"],
    },
    {
      id: 7,
      name: "Sirajganj",
      upazilas: ["Sirajganj Sadar", "Kamarkhand", "Chauhali"],
    },
    {
      id: 8,
      name: "Kushtia",
      upazilas: ["Kushtia Sadar", "Kumarkhali", "Mirpur"],
    },
  ],
  Barishal: [
    {
      id: 1,
      name: "Barishal",
      upazilas: ["Barishal Sadar", "Wazirpur", "Gournadi"],
    },
    {
      id: 2,
      name: "Bhola",
      upazilas: ["Bhola Sadar", "Lalmohan", "Tazumuddin"],
    },
    {
      id: 3,
      name: "Patuakhali",
      upazilas: ["Patuakhali Sadar", "Kalapara", "Bauphal"],
    },
    {
      id: 4,
      name: "Jhalokati",
      upazilas: ["Jhalokati Sadar", "Babuganj", "Kathalia"],
    },
    {
      id: 5,
      name: "Jashore",
      upazilas: ["Jashore Sadar", "Chaugachha", "Keshabpur"],
    },
    {
      id: 6,
      name: "Kushtia",
      upazilas: ["Kushtia Sadar", "Kumarkhali", "Mirpur"],
    },
  ],
  Sylhet: [
    {
      id: 1,
      name: "Sylhet",
      upazilas: ["Sylhet Sadar", "Jaintiapur", "Companiganj"],
    },
    {
      id: 2,
      name: "Moulvibazar",
      upazilas: ["Moulvibazar Sadar", "Kulaura", "Barlekha"],
    },
    {
      id: 3,
      name: "Habiganj",
      upazilas: ["Habiganj Sadar", "Chunarughat", "Lakhai"],
    },
    {
      id: 4,
      name: "Sunamganj",
      upazilas: ["Sunamganj Sadar", "Durgapur", "Biswanath"],
    },
    {
      id: 5,
      name: "Jaintiapur",
      upazilas: ["Jaintiapur", "Khadimnagar", "Sadar"],
    },
    { id: 6, name: "Kulaura", upazilas: ["Kulaura", "Bishwanath", "Barlekha"] },
  ],
  Rangpur: [
    {
      id: 1,
      name: "Rangpur",
      upazilas: ["Rangpur Sadar", "Pirganj", "Kurigram"],
    },
    {
      id: 2,
      name: "Dinajpur",
      upazilas: ["Dinajpur Sadar", "Kaharole", "Birampur"],
    },
    {
      id: 3,
      name: "Thakurgaon",
      upazilas: ["Thakurgaon Sadar", "Ranishwar", "Haripur"],
    },
    {
      id: 4,
      name: "Gaibandha",
      upazilas: ["Gaibandha Sadar", "Sundarganj", "Palashbari"],
    },
    {
      id: 5,
      name: "Kurigram",
      upazilas: ["Kurigram Sadar", "Nageswari", "Bhurungamari"],
    },
    {
      id: 6,
      name: "Lalmonirhat",
      upazilas: ["Lalmonirhat Sadar", "Patgram", "Aditmari"],
    },
  ],
  Mymensingh: [
    {
      id: 1,
      name: "Mymensingh",
      upazilas: ["Mymensingh Sadar", "Trishal", "Gafargaon"],
    },
    {
      id: 2,
      name: "Jamalpur",
      upazilas: ["Jamalpur Sadar", "Islampur", "Dewanganj"],
    },
    {
      id: 3,
      name: "Netrokona",
      upazilas: ["Netrokona Sadar", "Kenduli", "Durgapur"],
    },
    {
      id: 4,
      name: "Kishoreganj",
      upazilas: ["Kishoreganj Sadar", "Bajitpur", "Karimganj"],
    },
    {
      id: 5,
      name: "Habiganj",
      upazilas: ["Habiganj Sadar", "Chunarughat", "Lakhai"],
    },
  ],
};
