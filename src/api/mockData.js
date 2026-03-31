// Mock data for standalone deployment

export const MOCK_PROPERTIES = [
  {
    id: "p1", title: "Luxury Clifton Beachfront Villa", description: "Stunning villa with direct beach access and panoramic ocean views. Perfect for families and groups looking for an unforgettable Cape Town experience.",
    property_type: "entire_place", category: "beachfront", location_city: "Cape Town", location_country: "South Africa",
    price_per_night: 250, cleaning_fee: 40, service_fee: 12, max_guests: 8, bedrooms: 4, beds: 5, bathrooms: 3,
    amenities: ["WiFi", "Pool", "Kitchen", "Air conditioning", "Free parking", "Washer", "TV", "Bathtub"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
    ],
    host_name: "Sarah M.", is_superhost: true, average_rating: 4.97, review_count: 124, is_active: true,
    check_in_time: "15:00", check_out_time: "11:00", created_date: "2023-01-15",
  },
  {
    id: "p2", title: "Cosy Stellenbosch Wine Estate Cottage", description: "Charming cottage nestled among vineyards with breathtaking mountain views. Wake up to birdsong and enjoy complimentary wine tasting.",
    property_type: "entire_place", category: "countryside", location_city: "Stellenbosch", location_country: "South Africa",
    price_per_night: 120, cleaning_fee: 25, service_fee: 12, max_guests: 4, bedrooms: 2, beds: 2, bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "Free parking", "Heating", "TV", "Coffee maker"],
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&auto=format&fit=crop",
    ],
    host_name: "Johan V.", is_superhost: true, average_rating: 4.92, review_count: 87, is_active: true,
    check_in_time: "14:00", check_out_time: "10:00", created_date: "2023-03-10",
  },
  {
    id: "p3", title: "Modern Sandton City Apartment", description: "Sleek, fully-equipped apartment in the heart of Sandton. Walking distance to Sandton City Mall and major business hubs.",
    property_type: "entire_place", category: "amazing_views", location_city: "Johannesburg", location_country: "South Africa",
    price_per_night: 85, cleaning_fee: 20, service_fee: 12, max_guests: 2, bedrooms: 1, beds: 1, bathrooms: 1,
    amenities: ["WiFi", "Gym", "Air conditioning", "TV", "Kitchen", "Washer"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
    ],
    host_name: "Thabo N.", is_superhost: false, average_rating: 4.78, review_count: 43, is_active: true,
    check_in_time: "15:00", check_out_time: "11:00", created_date: "2023-05-20",
  },
  {
    id: "p4", title: "Drakensberg Mountain Retreat", description: "Escape to the mountains in this stunning retreat. Hike, relax and reconnect with nature in one of South Africa's most beautiful landscapes.",
    property_type: "entire_place", category: "amazing_views", location_city: "Drakensberg", location_country: "South Africa",
    price_per_night: 160, cleaning_fee: 35, service_fee: 12, max_guests: 6, bedrooms: 3, beds: 4, bathrooms: 2,
    amenities: ["WiFi", "Kitchen", "Free parking", "Heating", "Fireplace", "Garden"],
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop",
    ],
    host_name: "Lindiwe D.", is_superhost: true, average_rating: 4.95, review_count: 62, is_active: true,
    check_in_time: "14:00", check_out_time: "10:00", created_date: "2023-02-28",
  },
  {
    id: "p5", title: "Durban Beachfront Penthouse", description: "Luxurious penthouse with sweeping views of the Indian Ocean. Steps from the Golden Mile beach strip.",
    property_type: "entire_place", category: "beachfront", location_city: "Durban", location_country: "South Africa",
    price_per_night: 200, cleaning_fee: 45, service_fee: 12, max_guests: 6, bedrooms: 3, beds: 3, bathrooms: 2,
    amenities: ["WiFi", "Pool", "Air conditioning", "TV", "Kitchen", "Gym", "Bathtub"],
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop",
    ],
    host_name: "Priya P.", is_superhost: true, average_rating: 4.89, review_count: 95, is_active: true,
    check_in_time: "15:00", check_out_time: "11:00", created_date: "2023-04-05",
  },
  {
    id: "p6", title: "Knysna Lagoon Houseboat", description: "Unique floating home on the famous Knysna Lagoon. Fall asleep to the sound of gentle waves and wake up to stunning lagoon views.",
    property_type: "entire_place", category: "lakefront", location_city: "Knysna", location_country: "South Africa",
    price_per_night: 180, cleaning_fee: 30, service_fee: 12, max_guests: 4, bedrooms: 2, beds: 2, bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "TV", "Coffee maker"],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&auto=format&fit=crop",
    ],
    host_name: "Mark O.", is_superhost: false, average_rating: 4.85, review_count: 38, is_active: true,
    check_in_time: "16:00", check_out_time: "10:00", created_date: "2023-06-12",
  },
  {
    id: "p7", title: "Cape Winelands Luxury Manor", description: "Grand manor house surrounded by award-winning vineyards. Includes private pool, wine cellar access and mountain views.",
    property_type: "entire_place", category: "luxe", location_city: "Franschhoek", location_country: "South Africa",
    price_per_night: 380, cleaning_fee: 60, service_fee: 12, max_guests: 10, bedrooms: 5, beds: 6, bathrooms: 4,
    amenities: ["WiFi", "Pool", "Kitchen", "Free parking", "Air conditioning", "Washer", "TV", "Bathtub", "Garden"],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop",
    ],
    host_name: "Celeste B.", is_superhost: true, average_rating: 4.99, review_count: 51, is_active: true,
    check_in_time: "15:00", check_out_time: "11:00", created_date: "2023-01-30",
  },
  {
    id: "p8", title: "Hermanus Whale Watch Cottage", description: "Perched on the cliffs above Walker Bay, this charming cottage offers the best land-based whale watching in the world.",
    property_type: "entire_place", category: "amazing_views", location_city: "Hermanus", location_country: "South Africa",
    price_per_night: 140, cleaning_fee: 28, service_fee: 12, max_guests: 4, bedrooms: 2, beds: 2, bathrooms: 1,
    amenities: ["WiFi", "Kitchen", "Free parking", "Heating", "TV"],
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505916349660-8d91a99f28b8?w=800&auto=format&fit=crop",
    ],
    host_name: "Anita W.", is_superhost: false, average_rating: 4.82, review_count: 29, is_active: true,
    check_in_time: "14:00", check_out_time: "10:00", created_date: "2023-07-18",
  },
  {
    id: "p9", title: "Kruger Safari Bush Lodge", description: "Authentic bush lodge on the edge of Kruger National Park. Fall asleep to the sounds of the African bush.",
    property_type: "entire_place", category: "trending", location_city: "Kruger National Park", location_country: "South Africa",
    price_per_night: 220, cleaning_fee: 40, service_fee: 12, max_guests: 6, bedrooms: 3, beds: 3, bathrooms: 2,
    amenities: ["WiFi", "Kitchen", "Free parking", "Air conditioning", "Pool", "Garden"],
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&auto=format&fit=crop",
    ],
    host_name: "Sipho M.", is_superhost: true, average_rating: 4.96, review_count: 73, is_active: true,
    check_in_time: "15:00", check_out_time: "10:00", created_date: "2023-03-22",
  },
  {
    id: "p10", title: "Plettenberg Bay Beach House", description: "Gorgeous beach house with direct access to one of South Africa's most beautiful beaches. Surf, swim and relax.",
    property_type: "entire_place", category: "beachfront", location_city: "Plettenberg Bay", location_country: "South Africa",
    price_per_night: 175, cleaning_fee: 35, service_fee: 12, max_guests: 8, bedrooms: 4, beds: 5, bathrooms: 3,
    amenities: ["WiFi", "Kitchen", "Free parking", "TV", "Washer", "Bathtub"],
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&auto=format&fit=crop",
    ],
    host_name: "Ruan S.", is_superhost: false, average_rating: 4.88, review_count: 56, is_active: true,
    check_in_time: "15:00", check_out_time: "11:00", created_date: "2023-05-08",
  },
  {
    id: "p11", title: "Tiny Home in the Karoo Desert", description: "Minimalist tiny home under a sky full of stars. Experience the magic of the Karoo with zero light pollution.",
    property_type: "entire_place", category: "tiny_homes", location_city: "Oudtshoorn", location_country: "South Africa",
    price_per_night: 75, cleaning_fee: 15, service_fee: 12, max_guests: 2, bedrooms: 1, beds: 1, bathrooms: 1,
    amenities: ["Kitchen", "Free parking", "Heating"],
    images: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&auto=format&fit=crop",
    ],
    host_name: "Elsa K.", is_superhost: false, average_rating: 4.91, review_count: 34, is_active: true,
    check_in_time: "14:00", check_out_time: "10:00", created_date: "2023-08-01",
  },
  {
    id: "p12", title: "V&A Waterfront Luxury Apartment", description: "Premium apartment in Cape Town's iconic V&A Waterfront. Walk to world-class restaurants, shops and the Two Oceans Aquarium.",
    property_type: "entire_place", category: "design", location_city: "Cape Town", location_country: "South Africa",
    price_per_night: 195, cleaning_fee: 38, service_fee: 12, max_guests: 4, bedrooms: 2, beds: 2, bathrooms: 2,
    amenities: ["WiFi", "Air conditioning", "TV", "Kitchen", "Gym", "Washer"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop",
    ],
    host_name: "Nadia F.", is_superhost: true, average_rating: 4.94, review_count: 108, is_active: true,
    check_in_time: "15:00", check_out_time: "11:00", created_date: "2023-02-14",
  },
];

export const MOCK_REVIEWS = {
  p1: [
    { id: "r1", property_id: "p1", reviewer_name: "James T.", rating: 5, comment: "Absolutely stunning villa! The views were incredible and Sarah was a fantastic host. Will definitely be back.", created_date: "2024-11-10" },
    { id: "r2", property_id: "p1", reviewer_name: "Amara L.", rating: 5, comment: "Perfect in every way. The pool, the beach access, the interior design — all top notch.", created_date: "2024-10-22" },
    { id: "r3", property_id: "p1", reviewer_name: "David K.", rating: 4, comment: "Beautiful property, great location. Slightly tricky to find but worth it once you arrive.", created_date: "2024-09-15" },
  ],
  p2: [
    { id: "r4", property_id: "p2", reviewer_name: "Sophie R.", rating: 5, comment: "Magical cottage surrounded by vines. The complimentary wine tasting was a lovely touch!", created_date: "2024-11-05" },
    { id: "r5", property_id: "p2", reviewer_name: "Pieter V.", rating: 5, comment: "Johan is a wonderful host. The cottage is exactly as described — cosy, clean and beautiful.", created_date: "2024-10-18" },
  ],
  p7: [
    { id: "r6", property_id: "p7", reviewer_name: "Michelle B.", rating: 5, comment: "The most beautiful property I've ever stayed in. Celeste thought of everything.", created_date: "2024-11-12" },
  ],
};

export const MOCK_BOOKINGS = [];
