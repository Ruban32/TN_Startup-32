import { HeritageSite, Business } from '../types';
import { ADDITIONAL_HERITAGE_SITES } from './moreHeritageSites';
import { HERITAGE_SITES_BATCH_3 } from './moreHeritageSitesBatch3';

const INITIAL_HERITAGE_SITES: HeritageSite[] = [
  {
    id: 'brihadisvara',
    name: 'Brihadisvara Temple (Big Temple)',
    tamilName: 'பெருவுடையார் கோயில்',
    category: 'temple',
    district: 'Thanjavur',
    city: 'Thanjavur',
    dynasty: 'Chola Dynasty',
    constructionYear: '1010 AD',
    architecture: 'Dravidian Architecture',
    unescoStatus: true,
    timings: '06:00 AM - 12:30 PM, 04:00 PM - 09:00 PM',
    entryFees: 'Free (Special Darshan: ₹50 / foreign tourists: ₹250 for monument complex)',
    coordinates: { lat: 10.7828, lng: 79.1318 },
    history: `Built by the great Emperor Rajaraja Chola I between 1003 and 1010 AD, the Brihadisvara Temple (locally called Thanjavur Periya Kovil) is one of the largest temples in India and an exemplary masterpiece of Dravidian architecture. The temple's vimana (tower) is 66 meters (216 feet) high, making it one of the tallest in the world. Remarkably, the kumbam (the bulbous dome structure at the top) is carved out of a single granite block weighing over 80 tons. The massive stone Nandhi (sacred bull) at the entrance is also carved from a single stone, measuring about 13 feet high and 16 feet long. The temple is constructed entirely out of granite, a stone not locally available, implying massive logisitical feats of transporting granite over dozens of miles.`,
    visitorTips: [
      'Remove footwear at the security desk before entering the temple complex.',
      'Visit early in the morning or late in the afternoon to avoid the hot granite stones underfoot.',
      'Hire a registered local guide to explain the ancient Chola inscriptions and rich wall paintings.'
    ],
    festivals: ['Chithirai Brahmotsavam (April-May)', 'Rajaraja Chola Jayanthi (October-November)', 'Maha Shivaratri (February-March)'],
    dressCode: 'Conservative attire is required. Men should wear dhotis, pyjamas, or formal trousers with shirts. Women should wear sarees, salwar kameez, or half-sarees. Shorts, sleeveless shirts, and miniskirts are strictly prohibited.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1627581138865-c0529d2f66be?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9
  },
  {
    id: 'shore-temple',
    name: 'The Shore Temple & Five Rathas',
    tamilName: 'கடற்கரை கோயில்',
    category: 'temple',
    district: 'Chengalpattu',
    city: 'Mahabalipuram (Mamallapuram)',
    dynasty: 'Pallava Dynasty',
    constructionYear: '700 - 728 AD',
    architecture: 'Rock-Cut & Structural Pallava',
    unescoStatus: true,
    timings: '06:00 AM - 06:00 PM',
    entryFees: '₹40 (Indian Citizens), ₹600 (Foreign Nationals)',
    coordinates: { lat: 12.6167, lng: 80.1932 },
    history: `The Shore Temple is a structural temple complex overlooking the shore of the Bay of Bengal. Built under Narasimhavarman II (Rajasimha) in the early 8th century, it is one of the oldest structural stone temples in Southern India. The complex features three shrines dedicated to Shiva and Vishnu. Legend tells that Mamallapuram once featured seven such structural temples (the "Seven Pagodas"), but six were swallowed by the sea. During the 2004 Indian Ocean Tsunami, underwater structures and carved lions were briefly exposed on the shoreline, corroborating these legends. Nearby lie the Five Rathas (Pancha Rathas)—five monolithic rock temples carved during the reign of Mahendravarman I in the shape of chariots, named after the Pandavas of the Mahabharata.`,
    visitorTips: [
      'Keep your entry ticket safe as it works for both Shore Temple and the Five Rathas complex.',
      'Watch out for monkeys in the garden areas around the monuments.',
      'Combine your trip with the massive "Krishna\'s Butterball" boulder nearby, which defies gravity on a slope.'
    ],
    festivals: ['Mamallapuram Dance Festival (January-February)', 'Maasi Magam (February-March)'],
    dressCode: 'Comfortable clothing, but avoid overly revealing garments out of respect for the active worship shrines.',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600100397990-24b32252c431?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.8
  },
  {
    id: 'meenakshi',
    name: 'Meenakshi Amman Temple',
    tamilName: 'மீனாட்சி அம்மன் கோவில்',
    category: 'temple',
    district: 'Madurai',
    city: 'Madurai',
    dynasty: 'Pandya Dynasty & Nayak Dynasty',
    constructionYear: '14th - 17th Century',
    architecture: 'Late Dravidian Madurai Style',
    unescoStatus: false,
    timings: '05:00 AM - 12:30 PM, 04:00 PM - 09:30 PM',
    entryFees: 'Free (Special Darshan ₹50 / ₹100)',
    coordinates: { lat: 9.9195, lng: 78.1193 },
    history: `Located at the heart of the 2,500-year-old city of Madurai, the Meenakshi Sundareswarar Temple is dedicated to Goddess Meenakshi (a form of Parvati) and her consort Lord Sundareswarar (Shiva). While the temple has ancient Sangam-era origins, the current structures were largely built and expanded by the Madurai Nayak kings, especially Thirumalai Nayak, in the 17th century. The complex is world-famous for its 14 towering gopurams (gateway towers), with the southern gopuram being the tallest at 51.9 meters (170 feet). Every tower is covered in thousands of bright, multicolored stucco figures of deities, demons, and celestial beings, repainted every 12 years. The temple also features the famous "Hall of a Thousand Pillars" (Ayiramkaal Mandapam) built in 1569, which contains intricately carved pillars that emit musical notes when struck.`,
    visitorTips: [
      'Electronic items, including mobile phones, cameras, and smartwatches, are strictly prohibited inside the temple. Free/paid lockers are available outside.',
      'Saffron/Yellow cloths and traditional dhotis/saris are highly encouraged.',
      'Don’t miss the night ceremony at 9:00 PM when the image of Lord Shiva is carried to Goddess Meenakshi’s chamber.'
    ],
    festivals: ['Chithirai Festival (April-May) - Re-enacts the divine wedding', 'Navarathri (September-October)', 'Theppotsavam (Float Festival - January-February)'],
    dressCode: 'Strict. Men must wear long trousers or dhotis. Women must wear traditional saris, half-saris, or churidars/salwar-kameez with a dupatta. Jeans, leggings, shorts, and crop tops are strictly barred.',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1627581138865-c0529d2f66be?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.95
  },
  {
    id: 'vivekananda-rock',
    name: 'Vivekananda Rock Memorial',
    tamilName: 'விவேகானந்தர் பாறை நினைவுச் சின்னம்',
    category: 'monument',
    district: 'Kanyakumari',
    city: 'Kanyakumari',
    dynasty: 'Modern India (Eknath Ranade)',
    constructionYear: '1970 AD',
    architecture: 'Modern Composite Indian Architecture',
    unescoStatus: false,
    timings: '08:00 AM - 04:00 PM',
    entryFees: '₹50 (Entry ticket) + ₹80 (Ferry ride)',
    coordinates: { lat: 8.0781, lng: 77.5553 },
    history: `The Vivekananda Rock Memorial is a highly revered monument situated on a small rocky island off Kanyakumari, the southernmost tip of mainland India, where the Arabian Sea, the Bay of Bengal, and the Indian Ocean meet. It was erected in 1970 to honor Swami Vivekananda, who swam to this rock in December 1892 and meditated for three days, achieving enlightenment on his mission to represent Hinduism and universal spirituality in the West. The rock also bears a geological curiosity: a footprint-like indentation believed by locals to be the footstep of Goddess Kanya Devi (the virgin goddess) meditating on one foot. The architectural style beautifully merges elements of temple architecture from Chola, Pallava, and North Indian traditions. Adjacent to it stands the colossal 133-foot-tall stone statue of Saint Thiruvalluvar, the legendary Tamil poet and philosopher.`,
    visitorTips: [
      'Ferry queues can be long. Purchase the premium ticket for ₹200 to skip the queue if in a hurry.',
      'Excellent spot to witness both the sunrise and sunset over the meeting of three oceans.',
      'Silence must be maintained in the Dhyana Mandapam (Meditation Hall) inside the memorial.'
    ],
    festivals: ['Chitra Poornima (Full moon night in April-May)', 'Swami Vivekananda Jayanti (January 12)'],
    dressCode: 'Modest casual attire is fine. Socks are recommended since the rock surfaces can get extremely hot in the sun, and walking barefoot is mandatory in the main hall.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600100397990-24b32252c431?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.75
  },
  {
    id: 'thirumalai-nayakkar',
    name: 'Thirumalai Nayakkar Mahal',
    tamilName: 'திருமலை நாயக்கர் அரண்மனை',
    category: 'palace',
    district: 'Madurai',
    city: 'Madurai',
    dynasty: 'Nayak Dynasty',
    constructionYear: '1636 AD',
    architecture: 'Indo-Saracenic (Italian-Dravidian) Style',
    unescoStatus: false,
    timings: '09:00 AM - 05:00 PM',
    entryFees: '₹20 (Adults), ₹5 (Children), ₹100 (Foreigners)',
    coordinates: { lat: 9.9148, lng: 78.1242 },
    history: `Built in 1636 AD by King Thirumalai Nayak of Madurai’s Nayak Dynasty, this palace was designed as a grand residence for the king. The original palace complex was four times larger than what stands today. Thirumalai Nayak's grandson, Chokkanatha Nayak, dismantled large parts of the palace and transported the valuable wood and stones to Trichy to build his own palace, leaving only the central courtyard and royal chambers. The architecture is a breathtaking fusion of Italian Renaissance, Islamic, and traditional Dravidian styles. The palace is renowned for its giant white pillars—standing 82 feet tall and 19 feet in circumference—supporting spectacular arches decorated with exquisite stucco work. The main courtyard (Swarga Vilasam) boasts a grand dome supported by stone columns without a single iron girder.`,
    visitorTips: [
      'Enjoy the spectacular Light and Sound Show in the evening. There is an English show at 6:45 PM and a Tamil show at 8:00 PM.',
      'Check out the museum in the left wing which contains historic Pandyan and Nayak stone carvings.',
      'The acoustics of the throne room are incredible; whisper at one end, and it echoes clearly at the other.'
    ],
    festivals: ['Madurai Tourism Cultural Festival (January)', 'Independence Day Special Illumination'],
    dressCode: 'Casual but respectful attire is perfectly fine. No footwear restriction applies here.',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1627581138865-c0529d2f66be?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.6
  },
  {
    id: 'nilgiri-railway',
    name: 'Nilgiri Mountain Railway (NMR)',
    tamilName: 'நீலகிரி மலை இரயில்',
    category: 'nature',
    district: 'The Nilgiris',
    city: 'Mettupalayam to Ooty',
    dynasty: 'British Era (Indian Railways)',
    constructionYear: '1908 AD',
    architecture: 'Edwardian Engineering / Rack & Pinion',
    unescoStatus: true,
    timings: 'Departs Mettupalayam at 07:10 AM, Departs Ooty at 02:00 PM',
    entryFees: 'First Class: ₹600, Second Class: ₹295, General: ₹75 (Advance booking recommended)',
    coordinates: { lat: 11.3323, lng: 76.8929 },
    history: `The Nilgiri Mountain Railway (NMR) is a 1,000 mm (3 ft 3 3/8 in) metre gauge railway in Tamil Nadu, built by the British and completed in 1908. It is the only rack railway in India. The railway uses an alternate rack and pinion system (the "Abt system") to climb the steep gradients of the Nilgiri hills between Mettupalayam and Ooty, spanning 46 kilometers. The train crosses 250 bridges, enters 16 tunnels, and hugs the edge of cliffs, offering breathtaking views of lush green tea plantations, dense eucalyptus forests, and roaring waterfalls. NMR was declared a UNESCO World Heritage Site in 2005, added as an extension to the Mountain Railways of India. It still uses historic Swiss-built steam locomotives on the steep lower section between Mettupalayam and Coonoor.`,
    visitorTips: [
      'Book your tickets on IRCTC weeks in advance; spot/general tickets are highly limited and have long lines.',
      'Sit on the right side of the carriage when going uphill (Mettupalayam to Ooty) for the best valley views.',
      'Get down at Coonoor station to witness the steam engine being watered and coupled.'
    ],
    festivals: ['Summer Festival (Ooty Flower Show - May)', 'Steam Charter runs (Seasonal)'],
    dressCode: 'Comfortable clothing, but carry warm sweaters, cardigans, or shawls as the temperature drops significantly as you ascend to Ooty (7,400 feet).',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600100397990-24b32252c431?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.85
  },
  {
    id: 'gingee-fort',
    name: 'Gingee Fort (Senji Fort)',
    tamilName: 'செஞ்சி கோட்டை',
    category: 'fort',
    district: 'Villupuram',
    city: 'Gingee',
    dynasty: 'Chola, Nayaka, Maratha & British Empires',
    constructionYear: '13th - 16th Century',
    architecture: 'Rock Military Architecture',
    unescoStatus: false,
    timings: '09:00 AM - 05:30 PM',
    entryFees: '₹25 (Indians), ₹300 (Foreigners)',
    coordinates: { lat: 12.2533, lng: 79.4167 },
    history: `Often called the "Troy of the East" by the British for its impregnable military design, Gingee Fort is one of the surviving fortresses in Tamil Nadu. The fort complex spans three massive granite hillocks—Rajagiri, Krishnagiri, and Chandrayandurg—forming an invincible triangular defensive system connected by thick walls enclosing 11 square kilometers. Originally built by the Cholas in the 13th century, it was heavily fortified by the Gingee Nayaks in the 15th-16th centuries. It later fell to Shivaji's Maratha empire in 1677, who declared it "the most impregnable fortress in India." The fort features an 8-story Kalyana Mahal (marriage palace), Granaries, a Royal Audience Hall, an architectural treasury of temples, and a massive rock-cut jail pool. Climbing the Rajagiri Hill involves scaling a steep path and crossing a wooden drawbridge over a deep rock chasm.`,
    visitorTips: [
      'The climb up Rajagiri takes about 2 hours and involves over 1,000 steep stone steps. Ensure you are in good physical health.',
      'Carry at least 2 liters of drinking water, a wide-brimmed hat, and snacks, as there are no shops on the hill top.',
      'Beware of the monkeys; do not carry food openly in hand.'
    ],
    festivals: ['Aadi Festival (July-August)', 'Pongal Special Climbs (January)'],
    dressCode: 'Comfortable athletic clothing and high-traction hiking or running shoes. Slipper/sandals are strongly discouraged for the climb.',
    image: 'https://images.unsplash.com/photo-1627581138865-c0529d2f66be?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1627581138865-c0529d2f66be?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.7
  },
  {
    id: 'chettinad-palace',
    name: 'Chettinad Palace (Karaikudi)',
    tamilName: 'செட்டிநாடு அரண்மனை',
    category: 'palace',
    district: 'Sivaganga',
    city: 'Kanadukathan',
    dynasty: 'Nattukottai Chettiars (Merchant Barons)',
    constructionYear: '1912 AD',
    architecture: 'Indo-Baroque / Art Deco Mansion',
    unescoStatus: false,
    timings: '09:00 AM - 05:00 PM (Partially restricted as private residence)',
    entryFees: '₹100 (Access to main halls)',
    coordinates: { lat: 10.1751, lng: 78.7845 },
    history: `The Chettinad Palace, situated in Kanadukathan, was built in 1912 by the merchant-philanthropist Dr. Annamalai Chettiar, founder of Annamalai University. The Palace is the crown jewel of Chettinad architecture—a unique regional style built by the wealthy seafaring Chettiar trade merchants who imported luxurious building materials from all over the world. The mansion features Burmese Teak wood pillars, Italian marble floors, Japanese ceramic tiles, Belgian crystal chandeliers, and English ironwork. The walls are plastered using a special traditional paste made from egg whites, sea shells, and lime, giving them a smooth, ivory-like marble polish that stays cool in the blistering tropical heat. The house contains massive courtyard layouts designed for social functions and intricate rainwater harvesting channels.`,
    visitorTips: [
      'Combine this with a tour of the local Chettinad handloom sari weaving centers and handmade Athangudi tile factories.',
      'Enjoy an authentic Chettinad meal served on a banana leaf featuring freshly ground spices in a heritage boutique hotel nearby.',
      'As some parts of the palace are still occupied by heirs, maintain silence and respect restricted areas.'
    ],
    festivals: ['Margazhi Festival (December-January)', 'Deepavali Special Banquets'],
    dressCode: 'Casual wear is fine, but guests are expected to remove their shoes before stepping onto the highly polished heritage tile and wood floors.',
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.65
  }
];

export const HERITAGE_SITES: HeritageSite[] = [
  ...INITIAL_HERITAGE_SITES,
  ...ADDITIONAL_HERITAGE_SITES,
  ...HERITAGE_SITES_BATCH_3
];

export const NEARBY_BUSINESSES: Business[] = [
  {
    id: 'b1',
    name: 'Sri Saravana Bhavan Thanjavur',
    category: 'restaurant',
    description: 'Authentic South Indian vegetarian restaurant famous for pure ghee paper roast dosa, idli, and traditional filter coffee.',
    rating: 4.5,
    reviewsCount: 1240,
    contact: '+91 4362 272445',
    distance: '350m from Big Temple',
    isOpen: true,
    coordinates: { lat: 10.7850, lng: 79.1325 },
    address: 'East Main Street, near Temple Entrance, Thanjavur',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=400',
    heritageSiteId: 'brihadisvara'
  },
  {
    id: 'b2',
    name: 'Thanjavur Art Plate & Bronze Crafts',
    category: 'handicrafts',
    description: 'Government certified shop specializing in traditional Thanjavur Art Plates, Tanjore Paintings, and Chola-style wax-cast bronze idols.',
    rating: 4.8,
    reviewsCount: 310,
    contact: '+91 94435 12891',
    distance: '500m from Big Temple',
    isOpen: true,
    coordinates: { lat: 10.7810, lng: 79.1340 },
    address: 'Palace Road, Near Rajah Serfoji Museum, Thanjavur',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400',
    heritageSiteId: 'brihadisvara'
  },
  {
    id: 'b3',
    name: 'Mamalla Sea Foods Restaurant',
    category: 'restaurant',
    description: 'Beachside restaurant offering freshly caught crabs, prawns, and grilled fish cooked with spicy local Tamil Nadu masalas.',
    rating: 4.4,
    reviewsCount: 890,
    contact: '+91 44 2744 2626',
    distance: '200m from Shore Temple',
    isOpen: true,
    coordinates: { lat: 12.6180, lng: 80.1945 },
    address: 'Othavadai Street, Fisherman’s Colony, Mahabalipuram',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400',
    heritageSiteId: 'shore-temple'
  },
  {
    id: 'b4',
    name: 'Murugan Idli Shop Madurai',
    category: 'restaurant',
    description: 'The absolute legendary birthplace of Murugan Idlis. Try their piping hot idlis with four types of chutneys and special spicy podi.',
    rating: 4.7,
    reviewsCount: 4200,
    contact: '+91 452 234 1379',
    distance: '600m from Meenakshi Temple',
    isOpen: true,
    coordinates: { lat: 9.9175, lng: 78.1140 },
    address: 'West Marret Street, Madurai',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',
    heritageSiteId: 'meenakshi'
  },
  {
    id: 'b5',
    name: 'Madurai Heritage Tours - Govind',
    category: 'guide',
    description: 'Expert multilingual registered guide specializing in the deep architectural nuances, historical lineages, and secret stories of Meenakshi Temple.',
    rating: 4.9,
    reviewsCount: 154,
    contact: '+91 98421 33490',
    distance: 'Within Temple Premises',
    isOpen: true,
    coordinates: { lat: 9.9190, lng: 78.1185 },
    address: 'North Tower Gate Reception, Madurai',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=400',
    heritageSiteId: 'meenakshi'
  },
  {
    id: 'b6',
    name: 'Ocean Ferry & Taxi Services Kanyakumari',
    category: 'taxi',
    description: 'Reliable air-conditioned cabs, local auto-rickshaws, and private boat rentals around the Kanyakumari shoreline.',
    rating: 4.3,
    reviewsCount: 412,
    contact: '+91 4652 246205',
    distance: '100m from Ferry Ghat',
    isOpen: true,
    coordinates: { lat: 8.0792, lng: 77.5540 },
    address: 'Beach Road, Kanyakumari',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400',
    heritageSiteId: 'vivekananda-rock'
  },
  {
    id: 'b7',
    name: 'Chidambara Vilas Heritage Dining',
    category: 'restaurant',
    description: 'A 110-year-old restored Chettiar mansion serving authentic, legendary Chettinad feast containing 25+ curated spicy dishes.',
    rating: 4.8,
    reviewsCount: 650,
    contact: '+91 4573 264200',
    distance: '3.5km from Kanadukathan Palace',
    isOpen: true,
    coordinates: { lat: 10.1512, lng: 78.7510 },
    address: 'Kadiapatti, Pudukkottai District, Chettinad',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    heritageSiteId: 'chettinad-palace'
  }
];
