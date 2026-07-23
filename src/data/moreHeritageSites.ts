import { HeritageSite } from '../types';

export const ADDITIONAL_HERITAGE_SITES: HeritageSite[] = [
  {
    id: 'ramanathaswamy',
    name: 'Ramanathaswamy Temple (Rameswaram)',
    tamilName: 'இராமநாதசுவாமி கோயில்',
    category: 'temple',
    district: 'Ramanathapuram',
    city: 'Rameswaram',
    dynasty: 'Pandya & Sethupathi Kings',
    constructionYear: '12th - 16th Century AD',
    architecture: 'Dravidian (Longest Temple Corridors)',
    unescoStatus: false,
    timings: '05:00 AM - 01:00 PM, 03:00 PM - 09:00 PM',
    entryFees: 'Free (Special Darshan: ₹50, 22 Holy Wells Bathing: ₹25)',
    coordinates: { lat: 9.2881, lng: 79.3174 },
    history: `Located on Rameswaram Island, Ramanathaswamy Temple is one of the twelve Jyotirlinga temples dedicated to Lord Shiva and one of the holiest Char Dham pilgrimage destinations in India. According to the Ramayana, Lord Rama worshipped Shiva here to seek absolution after defeating Ravana in Sri Lanka. The temple features the world's longest temple corridor (Outer Corridor), stretching over 1.2 kilometers with 1,212 intricately carved granite pillars. The complex houses 22 sacred teerthams (holy water tanks); bathing in all 22 wells before worshipping the lingam is a sacred tradition for pilgrims.`,
    visitorTips: [
      'Bring a change of dry clothes if you plan to take sacred baths in the 22 teerthams.',
      'Mobiles, electronic devices, and metal items are prohibited inside the inner corridors.',
      'Visit the Agni Teertham beach right outside the east tower before entering the temple.'
    ],
    festivals: ['Maha Shivaratri (February-March)', 'Thirukalyanam (July-August)', 'Ramalinga Pratishtha (June)'],
    dressCode: 'Strict traditional attire required. Men in dhotis/formal trousers, women in saris/salwar kameez.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9
  },
  {
    id: 'dhanushkodi',
    name: 'Dhanushkodi Ghost Town & Beach',
    tamilName: 'தனுஷ்கோடி',
    category: 'beach',
    district: 'Ramanathapuram',
    city: 'Rameswaram',
    dynasty: 'N/A',
    constructionYear: 'Pre-1964 Historic Port',
    architecture: 'Colonial Ruins & Coastal Dunes',
    unescoStatus: false,
    timings: '06:00 AM - 05:00 PM (Restricted after dark)',
    entryFees: 'Free',
    coordinates: { lat: 9.1517, lng: 79.4461 },
    history: `Dhanushkodi is an abandoned town at the south-eastern tip of Pamban Island, situated only 24 kilometers from Sri Lanka across the Palk Strait. It was a thriving port town until the devastating 1964 Rameswaram cyclone submerged the entire township, destroying the railway line and passenger train. Madras Government subsequently declared Dhanushkodi an unfit human habitation (Ghost Town). Today, visitors can see eerie coral ruins of a church, hospital, railway station, and post office against turquoise ocean waters. In Hindu tradition, it is the spot where Rama built Ram Setu (Adam's Bridge) with his bow ("Dhanush").`,
    visitorTips: [
      'Carry sunglasses, sunscreen, and plenty of drinking water as there are no sheltered shops.',
      'Public transport/taxis operate along the newly built asphalt road running right to the tip (Arichal Munai).',
      'Avoid swimming due to strong oceanic currents where the Bay of Bengal meets the Indian Ocean.'
    ],
    festivals: ['Full Moon Coastal Gatherings', 'Eco-Tourism Explorations'],
    dressCode: 'Casual beachwear and comfortable walking footwear.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.85
  },
  {
    id: 'kapaleeshwarar',
    name: 'Kapaleeshwarar Temple (Mylapore)',
    tamilName: 'கபாலீஸ்வரர் கோயில்',
    category: 'temple',
    district: 'Chennai',
    city: 'Chennai',
    dynasty: 'Pallava & Vijayanagara Dynasties',
    constructionYear: '7th Century AD (Rebuilt 16th Century)',
    architecture: 'Classical Dravidian Architecture',
    unescoStatus: false,
    timings: '05:00 AM - 12:30 PM, 04:00 PM - 09:30 PM',
    entryFees: 'Free (Special Queue ₹20)',
    coordinates: { lat: 13.0336, lng: 80.2697 },
    history: `Situated in the vibrant cultural neighborhood of Mylapore, Chennai, Kapaleeshwarar Temple is dedicated to Lord Shiva and Goddess Karpagambal. Originally constructed by the Pallavas in the 7th century along the sea shore, it was destroyed during Portuguese colonial expansion and rebuilt 300 meters inland by Vijayanagara rulers in the 16th century. The temple features a towering 37-meter rainbow gopuram, a spacious sacred water tank (kalyana theertham), and ancient bronze icons. According to mythology, Goddess Parvati worshipped Shiva here in the form of a peahen ("Mayil"), giving Mylapore its name.`,
    visitorTips: [
      'Combine your visit with a hot cup of authentic South Indian filter coffee in the surrounding Mylapore bazaar.',
      'Visit during the 9-day Panguni Peruvizha in March/April to witness the grand 63 Nayanmars chariot procession.',
      'Footwear counters are located near the East and West gopuram entrances.'
    ],
    festivals: ['Panguni Peruvizha (March-April)', 'Arudra Darisanam (December-January)'],
    dressCode: 'Traditional clothing recommended. Men in trousers/dhotis, women in saris or salwar suits.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1627581138865-c0529d2f66be?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.8
  },
  {
    id: 'marina-beach',
    name: 'Marina Beach & Promenade',
    tamilName: 'மெரினா கடற்கரை',
    category: 'beach',
    district: 'Chennai',
    city: 'Chennai',
    dynasty: 'British Colonial & Modern Era',
    constructionYear: '1884 AD Promenade',
    architecture: 'Urban Coastal Promenade',
    unescoStatus: false,
    timings: 'Open 24 hours (Lighthouse open 10:00 AM - 01:00 PM, 03:00 PM - 06:00 PM)',
    entryFees: 'Free (Lighthouse Entry: ₹20)',
    coordinates: { lat: 13.0500, lng: 80.2824 },
    history: `Stretching 13 kilometers along the Coromandel Coast on the Bay of Bengal, Marina Beach is the second longest natural urban beach in the world and Chennai's primary civic landmark. Renovated in 1884 by Mountstuart Elphinstone Grant Duff, the promenade is lined with statues of historical Tamil literary icons (Thiruvalluvar, Avvaiyar, Kambar) and memorials of former Chief Ministers. At its southern end stands the Chennai Lighthouse, offering panoramic elevated views over the coastal city grid.`,
    visitorTips: [
      'Evening visits (5 PM - 8 PM) are best for enjoying sea breezes, local street food like sundal and fried fish.',
      'Swimming is strictly prohibited due to dangerous undertows and strong sea currents.',
      'Climb or take the elevator up the Chennai Lighthouse for breathtaking 360-degree skyline photography.'
    ],
    festivals: ['Kaanum Pongal (January 17)', 'Chennai Beach Cultural Carnivals'],
    dressCode: 'Casual wear.',
    image: 'https://images.unsplash.com/photo-1600100397990-24b32252c431?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.6
  },
  {
    id: 'fort-st-george',
    name: 'Fort St. George & St. Mary’s Church',
    tamilName: 'புனித ஜார்ஜ் கோட்டை',
    category: 'fort',
    district: 'Chennai',
    city: 'Chennai',
    dynasty: 'East India Company / British Raj',
    constructionYear: '1644 AD',
    architecture: 'British Military Bastion Fort Architecture',
    unescoStatus: false,
    timings: '09:00 AM - 05:00 PM (Closed on Fridays)',
    entryFees: '₹25 (Indian Citizens), ₹300 (Foreigners)',
    coordinates: { lat: 13.0792, lng: 80.2872 },
    history: `Built in 1644 by the British East India Company under Francis Day and Andrew Cogan, Fort St. George was the first fortress established by the British in India, giving birth to the modern city of Madras (Chennai). The complex houses the Tamil Nadu Legislative Assembly, the Fort Museum, and St. Mary's Church—the oldest Anglican church east of Suez, consecrated in 1680. The Fort Museum displays 3,000+ artifacts including colonial silverware, coins, uniforms, and portraits of British Governors.`,
    visitorTips: [
      'Carry valid government photo ID as security is strict due to government secretariat offices inside.',
      'Check out the 150-foot-tall teak flagstaff outside, which once flew the largest British flag in the Orient.',
      'Visit St. Mary\'s Church to see historical marriage records of Robert Clive and Elihu Yale (benefactor of Yale University).'
    ],
    festivals: ['Independence Day Flag Hoisting (August 15)', 'Christmas Carols at St. Mary\'s'],
    dressCode: 'Formal or modest casual wear. Shorts and bare shoulders prohibited inside government grounds.',
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.5
  },
  {
    id: 'chennai-museum',
    name: 'Government Museum Egmore',
    tamilName: 'எழும்பூர் அருங்காட்சியகம்',
    category: 'museum',
    district: 'Chennai',
    city: 'Chennai',
    dynasty: 'British Era Foundations',
    constructionYear: '1851 AD',
    architecture: 'Indo-Saracenic & Victorian Architecture',
    unescoStatus: false,
    timings: '09:30 AM - 05:00 PM (Closed on Fridays and National Holidays)',
    entryFees: '₹15 (Adults), ₹5 (Children), ₹250 (Foreign Nationals)',
    coordinates: { lat: 13.0700, lng: 80.2570 },
    history: `Established in 1851, the Government Museum at Egmore is the second oldest museum in India. Spanning six historic heritage halls across 16 acres, it houses the world's richest collection of Chola bronze sculptures, including the world-famous bronze figure of Nataraja (Dancing Shiva) and Ardhanarishvara. The complex includes an extraordinary archaeological gallery, numismatic collections, paleontology halls with dinosaur skeletons, and the Victorian Gothic Museum Theatre.`,
    visitorTips: [
      'Allocate at least 2 to 3 hours to comfortably explore the Bronze Gallery and Archaeology Wing.',
      'Camera photography permits are available at the entrance ticket window for a small fee.',
      'Visit the neighboring Connemara Public Library, one of India\'s four national depository libraries.'
    ],
    festivals: ['International Museum Day Celebrations (May 18)', 'Art & Antiquity Workshops'],
    dressCode: 'Casual wear.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.7
  },
  {
    id: 'san-thome',
    name: 'San Thome Cathedral Basilica',
    tamilName: 'சாந்தோம் கதீட்ரல் பாசிலிக்கா',
    category: 'monument',
    district: 'Chennai',
    city: 'Chennai',
    dynasty: 'Portuguese / British Colonial',
    constructionYear: '1523 AD (Rebuilt 1898 in Neo-Gothic style)',
    architecture: 'Neo-Gothic Architectural Style',
    unescoStatus: false,
    timings: '06:00 AM - 09:00 PM',
    entryFees: 'Free',
    coordinates: { lat: 13.0337, lng: 80.2783 },
    history: `San Thome Cathedral Basilica is a minor basilica built over the tomb of Saint Thomas, one of the Twelve Apostles of Jesus Christ, who came to India in 52 AD and was martyred at St. Thomas Mount in Chennai in 72 AD. It is one of only three churches in the entire world built over an apostle's grave (the other two being St. Peter's Basilica in Vatican City and Santiago de Compostela Cathedral in Spain). Originally built by Portuguese explorers in 1523, it was rebuilt by the British in 1898 into a majestic Neo-Gothic cathedral with towering white spires.`,
    visitorTips: [
      'Visit the underground Tomb Chapel directly beneath the altar where St. Thomas was interred.',
      'The attached museum behind the main cathedral contains 16th-century antiquities and the lance tip that pierced the apostle.',
      'Quiet decorum should be maintained as active prayer masses take place throughout the day.'
    ],
    festivals: ['St. Thomas Feast (July 3)', 'Christmas Midnight Mass (December 24)'],
    dressCode: 'Modest attire. Sleeveless tops and shorts are discouraged inside the sanctuary.',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.75
  },
  {
    id: 'dakshinachitra',
    name: 'DakshinaChitra Heritage Village',
    tamilName: 'தட்சிணசித்ரா பண்பாட்டு மையம்',
    category: 'museum',
    district: 'Chengalpattu',
    city: 'Muttukadu (ECR Chennai)',
    dynasty: 'Modern Craft Preservation Society',
    constructionYear: '1996 AD',
    architecture: 'Living Heritage Craft Village',
    unescoStatus: false,
    timings: '10:00 AM - 06:00 PM (Closed on Tuesdays)',
    entryFees: '₹175 (Adults), ₹90 (Children), ₹350 (Foreigners)',
    coordinates: { lat: 12.8214, lng: 80.2412 },
    history: `DakshinaChitra ("Picture of the South") is an open-air living history museum situated along East Coast Road (ECR). Established in 1996 by the Madras Craft Foundation under Laurie Baker's architectural layout, the 10-acre site features 18 authentic historical homes relocated and reassembled piece-by-piece from Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh. Visitors can walk through traditional Chettinad merchant houses, Tamil Brahmin agraharams, and weaver cottages while watching artisans perform pottery, glassblowing, silk weaving, and puppet theater.`,
    visitorTips: [
      'Ideal weekend outing for families and photography enthusiasts.',
      'Participate in hands-on workshops to learn traditional pottery, palm leaf toy making, or kolam drawing.',
      'Enjoy authentic South Indian regional Thali lunches at the open-air heritage restaurant.'
    ],
    festivals: ['Pongal Folk Carnival (January)', 'Craft & Weaver Assemblies'],
    dressCode: 'Comfortable casual attire and walking shoes.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.8
  },
  {
    id: 'ekambareswarar',
    name: 'Ekambareswarar Temple (Kanchipuram)',
    tamilName: 'ஏகாம்பரேஸ்வரர் கோயில்',
    category: 'temple',
    district: 'Kanchipuram',
    city: 'Kanchipuram',
    dynasty: 'Pallava, Chola & Vijayanagara Dynasties',
    constructionYear: '600 AD (Expanded 1509 AD by Krishnadevaraya)',
    architecture: 'Classical Dravidian (Southern Gopuram 59m)',
    unescoStatus: false,
    timings: '06:00 AM - 12:30 PM, 04:00 PM - 08:30 PM',
    entryFees: 'Free (Special Darshan ₹50)',
    coordinates: { lat: 12.8475, lng: 79.7001 },
    history: `Spread over 25 acres in Kanchipuram ("City of Thousand Temples"), Ekambareswarar Temple represents the element Earth (Prithvi) among the Pancha Bhuta Sthalams (five temples of five natural elements). Originally founded by the Pallavas, it was extensively expanded by Chola emperors and Vijayanagara King Krishnadevaraya, who built the colossal 59-meter southern entrance gopuram in 1509. Inside the courtyard stands a revered 3,500-year-old mango tree whose four main branches bear fruit of four distinct tastes, representing the four Vedas.`,
    visitorTips: [
      'Check out the 1,000-pillared hall inside built during the Vijayanagara empire era.',
      'Combine your temple tour with shopping for authentic handloom Kanchipuram Silk Sarees in local weaver society outlets.',
      'Remove shoes at the main footwear counter before walking through the vast stone outer corridors.'
    ],
    festivals: ['Panguni Uthiram (March-April) - Marriage festival', 'Maha Shivaratri'],
    dressCode: 'Strict conservative temple attire required.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1627581138865-c0529d2f66be?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.85
  },
  {
    id: 'kailasanathar',
    name: 'Kailasanathar Temple (Kanchipuram)',
    tamilName: 'கைலாசநாதர் கோயில்',
    category: 'temple',
    district: 'Kanchipuram',
    city: 'Kanchipuram',
    dynasty: 'Pallava Dynasty',
    constructionYear: '685 - 705 AD',
    architecture: 'Earliest Structural Sandstone Dravidian Temple',
    unescoStatus: false,
    timings: '06:00 AM - 12:00 PM, 04:00 PM - 07:30 PM',
    entryFees: 'Free',
    coordinates: { lat: 12.8422, lng: 79.6897 },
    history: `Built by Pallava King Rajasimha (Narasimhavarman II), Kailasanathar Temple is the oldest structural temple in Kanchipuram and one of the finest surviving examples of early Dravidian architecture. Carved out of soft pink sandstone, the complex features 58 sub-shrines built into the inner perimeter wall, containing breathtaking carvings of Shiva in cosmic dance postures (Urdhava Tandava). This temple served as the direct architectural inspiration for the Great Brihadisvara Temple of Thanjavur.`,
    visitorTips: [
      'Experience the narrow circumambulatory passage around the sanctum, symbolizing birth, life, and rebirth.',
      'Visit in late afternoon when soft sunlight highlights the delicate sandstone carvings.',
      'Relatively tranquil compared to larger Kanchipuram temples, allowing peaceful contemplation.'
    ],
    festivals: ['Maha Shivaratri (All night illuminated worship)'],
    dressCode: 'Conservative dress code.',
    image: 'https://images.unsplash.com/photo-1600100397990-24b32252c431?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.8
  },
  {
    id: 'srirangam',
    name: 'Sri Ranganathaswamy Temple (Srirangam)',
    tamilName: 'ஸ்ரீரங்கம் ரங்கநாதசுவாமி கோயில்',
    category: 'temple',
    district: 'Tiruchirappalli',
    city: 'Srirangam / Trichy',
    dynasty: 'Chola, Pandya, Hoysala & Vijayanagara',
    constructionYear: '9th - 16th Century AD (Rajagopuram completed 1987)',
    architecture: 'Largest Operating Hindu Temple Complex in the World',
    unescoStatus: true,
    timings: '06:00 AM - 01:00 PM, 03:15 PM - 09:00 PM',
    entryFees: 'Free (Quick Darshan ₹100 / Viswaroopa Darshan ₹250)',
    coordinates: { lat: 10.8623, lng: 78.6901 },
    history: `Situated on an island formed by the Kaveri and Kollidam rivers, Sri Ranganathaswamy Temple in Srirangam is the largest functioning Hindu temple complex in the world, covering an astonishing 156 acres enclosed by 7 concentric walled enclosures (prakarams) with 21 grand towers. The Rajagopuram (main southern gateway) stands 73 meters (239 feet) high with 13 tiers, making it the tallest temple tower in Asia. Dedicated to Ranganatha (reclining Lord Vishnu), the temple was awarded the UNESCO Asia-Pacific Award for Cultural Heritage Conservation in 2017.`,
    visitorTips: [
      'Buy tickets for the Rooftop View Walkway to get a breathtaking perspective of all 21 gopurams.',
      'Plan at least 3 hours due to the sheer size of the 7 concentric walled enclosures.',
      'Taste the famous Srirangam temple prasadam (prasadam stalls inside offer piping hot tamarind rice and sweet pongal).'
    ],
    festivals: ['Vaikunta Ekadasi (December-January) - 20-day mega festival', 'Jestabhishekam'],
    dressCode: 'Strict. Men must wear dhotis or formal trousers with shirts. Women must wear saris or salwar kameez.',
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.95
  },
  {
    id: 'rockfort-trichy',
    name: 'Rockfort Ucchi Pillayar Temple (Trichy)',
    tamilName: 'மலைக்கோட்டை உச்சிப் பிள்ளையார் கோயில்',
    category: 'fort',
    district: 'Tiruchirappalli',
    city: 'Tiruchirappalli',
    dynasty: 'Pallava, Nayaka & Madurai Kings',
    constructionYear: '6th - 17th Century AD',
    architecture: 'Ancient Rock-Cut Fortress & Temple',
    unescoStatus: false,
    timings: '06:00 AM - 08:00 PM',
    entryFees: '₹10 (Entry), ₹20 (Camera)',
    coordinates: { lat: 10.8281, lng: 78.6972 },
    history: `Perched atop a massive 83-meter-high quartz rock formation estimated to be 3.8 billion years old (older than the Himalayas), Rockfort dominates the skyline of Trichy. The complex houses two famous rock-cut cave temples carved by Pallava builders in the 6th century, alongside the Thayumanavar Temple and the Ucchi Pillayar Temple perched on the highest peak. Reaching the summit requires climbing 437 stone steps cut into the living rock face, rewarding visitors with sweeping panoramic views over the Kaveri River and Srirangam Island.`,
    visitorTips: [
      'Climb early in the morning or near sunset to avoid ascending exposed rock under hot afternoon sunshine.',
      'Stop midway at the Thayumanavar Temple to view the grand carved stone pillars.',
      'The summit provides unmatched sunset photography angles of Trichy town.'
    ],
    festivals: ['Vinayagar Chathurthi (August-September)', 'Float Festival at Teppakulam'],
    dressCode: 'Modest athletic attire suitable for climbing 400+ stone steps barefoot.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.85
  },
  {
    id: 'airavatesvara',
    name: 'Airavatesvara Temple (Darasuram / Kumbakonam)',
    tamilName: 'ஐராவதேஸ்வரர் கோயில்',
    category: 'temple',
    district: 'Thanjavur',
    city: 'Darasuram (Near Kumbakonam)',
    dynasty: 'Later Chola Dynasty',
    constructionYear: '1166 AD',
    architecture: 'Later Chola Dravidian Architecture',
    unescoStatus: true,
    timings: '06:00 AM - 12:30 PM, 04:00 PM - 08:00 PM',
    entryFees: 'Free',
    coordinates: { lat: 10.9631, lng: 79.3562 },
    history: `Built by Chola King Rajaraja Chola II in 1166 AD, Airavatesvara Temple is a designated UNESCO World Heritage Site forming part of the "Great Living Chola Temples" alongside Brihadisvara at Thanjavur and Gangaikonda Cholapuram. Named after Airavata, the white elephant of Lord Indra who worshipped Shiva here, the temple sanctuary is designed in the shape of a magnificent stone chariot drawn by galloping horses and elephants. The front mandapam features musical stone steps that emit distinct musical notes when tapped gently.`,
    visitorTips: [
      'Inspect the miniature stone friezes depicting scenes from the 63 Nayanmar saints along the outer base.',
      'Usually much less crowded than the Thanjavur Big Temple, allowing quiet inspection of Chola relief sculptures.',
      'Combine with visits to silk weaving looms in Darasuram town.'
    ],
    festivals: ['Maha Shivaratri', 'Annual Chola Heritage Celebrations'],
    dressCode: 'Traditional modest temple dress code.',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9
  },
  {
    id: 'palani-murugan',
    name: 'Arulmigu Dhandayuthapani Swamy Temple (Palani)',
    tamilName: 'பழனி தண்டாயுதபாணி சுவாமி கோயில்',
    category: 'temple',
    district: 'Dindigul',
    city: 'Palani',
    dynasty: 'Chera & Pandya Kings (Siddha Bogar)',
    constructionYear: '3rd Century BC Origin / 7th Century AD',
    architecture: 'Hilltop Temple Architecture',
    unescoStatus: false,
    timings: '05:00 AM - 09:00 PM',
    entryFees: 'Free (Special Darshan ₹100 / Winch & Ropeway ₹15 - ₹50)',
    coordinates: { lat: 10.4503, lng: 77.5204 },
    history: `Perched on Sivagiri Hill in Palani, this temple is the third of the sacred Arupadai Veedu (Six Abodes of Lord Murugan). According to legend, the main idol of Murugan as a renunciate ascetic was created by the ancient Siddha sage Bogar using Navapashanam—an secretive esoteric alloy of nine poisonous substances that, when combined in precise proportions, forms an indestructible medicinal compound. Millions of pilgrims hike up the 659 stone steps or ride the electric ropeway cable car annually, carrying Kavadi offerings during Thai Poosam.`,
    visitorTips: [
      'Take the electric ropeway cable car or funicular winch train for panoramic views during the ascent.',
      'Purchase authentic Palani Panchamirtham (a sacred sweet delicacy made from five natural ingredients) at certified Devasthanam counters.',
      ' Thai Poosam (Jan-Feb) witnesses over 2 million pilgrims; expect massive lines during festival days.'
    ],
    festivals: ['Thai Poosam (January-February)', 'Panguni Uthiram', 'Vaikasi Visakam'],
    dressCode: 'Traditional temple dress code.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.88
  },
  {
    id: 'padmanabhapuram',
    name: 'Padmanabhapuram Palace (Thuckalay)',
    tamilName: 'பத்மநாபபுரம் அரண்மனை',
    category: 'palace',
    district: 'Kanyakumari',
    city: 'Thuckalay / Kanyakumari',
    dynasty: 'Travancore Kingdom',
    constructionYear: '1601 AD',
    architecture: 'Traditional Kerala Timber Architecture',
    unescoStatus: false,
    timings: '09:00 AM - 04:30 PM (Closed on Mondays)',
    entryFees: '₹40 (Indians), ₹300 (Foreigners), ₹50 (Camera)',
    coordinates: { lat: 8.2508, lng: 77.3267 },
    history: `Located at the foot of Veli Hills near Thuckalay, Padmanabhapuram Palace was the ancient capital seat of the Travancore Kingdom before shifting to Thiruvananthapuram in 1795. Entirely constructed out of teak and rosewood without steel nails, it is widely acclaimed as one of the finest Asian masterpieces of wooden craftsmanship. Features include polished black floors made from a secret mixture of burnt coconut shells, egg whites, and charcoal, secret underground escape tunnels, a 300-year-old clock tower that still ticks, and royal council chambers with carved rosewood ceilings.`,
    visitorTips: [
      'Visitors must remove footwear at the entrance gate to protect the 400-year-old polished wooden floors.',
      'Wear socks if visiting around midday as outdoor courtyard stone tiles can get warm.',
      'Hire a guide at the entrance to discover the hidden medicinal wooden beds and secret escape tunnels.'
    ],
    festivals: ['Navarathri Saraswathi Procession to Trivandrum'],
    dressCode: 'Casual wear. Footwear strictly prohibited inside the wooden chambers.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1627581138865-c0529d2f66be?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.85
  },
  {
    id: 'ooty-botanical',
    name: 'Government Botanical Garden (Ooty)',
    tamilName: 'ஊட்டி தாவரவியல் பூங்கா',
    category: 'nature',
    district: 'The Nilgiris',
    city: 'Ooty (Udhagamandalam)',
    dynasty: 'British Colonial Era (William Graham McIvor)',
    constructionYear: '1848 AD',
    architecture: 'Victorian Terraced Botanical Layout',
    unescoStatus: false,
    timings: '07:00 AM - 06:30 PM',
    entryFees: '₹50 (Adults), ₹20 (Children), ₹100 (Camera)',
    coordinates: { lat: 11.4162, lng: 76.7118 },
    history: `Spread over 55 terraced acres on the slopes of Doddabetta Peak in Ooty, the Government Botanical Garden was established in 1848 by the Marquis of Tweeddale and designed by British horticulturist William Graham McIvor. The garden houses over 1,000 species of exotic and indigenous flora, including bonsai, orchids, ferns, and medicinal herbs. A primary attraction is a 20-million-year-old fossilized tree trunk presented by the Geological Survey of India, alongside a lush Italian Garden and glasshouse.`,
    visitorTips: [
      'Visit during May to experience the world-famous Ooty Summer Flower Show featuring intricate floral sculptures.',
      'Carry lightweight jackets or raincoats as mountain weather in Ooty can change swiftly.',
      'Walk up to the Toda Hill inside the garden to see an authentic Toda tribal hut.'
    ],
    festivals: ['Ooty Flower Show (May)', 'Fruit & Spice Show'],
    dressCode: 'Casual clothing with comfortable walking shoes and warm layers.',
    image: 'https://images.unsplash.com/photo-1600100397990-24b32252c431?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.7
  },
  {
    id: 'kodai-lake',
    name: 'Kodaikanal Lake & Coaker’s Walk',
    tamilName: 'கொடைக்கானல் ஏரி',
    category: 'nature',
    district: 'Dindigul',
    city: 'Kodaikanal',
    dynasty: 'British Era (Sir Vere Levinge)',
    constructionYear: '1863 AD',
    architecture: 'Hill Station Man-Made Star-Shaped Lake',
    unescoStatus: false,
    timings: 'Lake: 06:00 AM - 07:00 PM, Coaker’s Walk: 07:00 AM - 07:00 PM',
    entryFees: 'Free Lake Promenade (Boating: ₹250 - ₹600, Coaker\'s Walk: ₹30)',
    coordinates: { lat: 10.2381, lng: 77.4892 },
    history: `Kodaikanal Lake is an iconic star-shaped artificial lake created in 1863 by Sir Vere Henry Levinge, the former Collector of Madurai. Encircled by a 5-kilometer paved pedestrian walkway lined with pine trees and bicycle rental stations, visitors can enjoy pedal boating or row boating enveloped in mountain fog. Nearby lies Coaker's Walk, a 1-kilometer pedestrian cliff edge pathway constructed by Lt. Coaker in 1872 offering panoramic valley vistas over the plains of Madurai. On clear mornings, lucky visitors can witness the rare optical phenomenon known as the 'Bracken Spectre'.`,
    visitorTips: [
      'Rent a bicycle or tandem bike to cycle around the 5km lake perimeter.',
      'Try hot freshly roasted corn-on-the-cob and handmade Kodaikanal chocolates from roadside stalls.',
      'Visit Coaker\'s Walk before 10 AM before afternoon mist completely covers the valley.'
    ],
    festivals: ['Kodaikanal Summer Festival & Boat Races (May)'],
    dressCode: 'Warm woolen clothing and comfortable walk/sport shoes.',
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.8
  },
  {
    id: 'hogenakkal',
    name: 'Hogenakkal Falls (Dharmapuri)',
    tamilName: 'ஒகேனக்கல் அருவி',
    category: 'nature',
    district: 'Dharmapuri',
    city: 'Hogenakkal',
    dynasty: 'N/A',
    constructionYear: 'Natural River Canyon',
    architecture: 'Geological River Falls & Gorge',
    unescoStatus: false,
    timings: '08:00 AM - 05:30 PM',
    entryFees: 'Free (Coracle Ride: ₹750 per boat for up to 4 persons)',
    coordinates: { lat: 12.1182, lng: 77.7770 },
    history: `Often called the "Niagara Falls of India", Hogenakkal (meaning "Smoking Rocks" in Kannada due to the dense spray generated when the Kaveri River crashes into carbonatite rock gorges) is a series of roaring waterfalls located in Dharmapuri district. The water flows through medicinal carbonatite rock beds and dense herbal forests. A highlight is riding circular woven basket boats called 'coracles' (parisal) handled by skilled boatmen who spin the boats under torrents of spray amidst towering canyon rock walls.`,
    visitorTips: [
      'Hire a licensed coracle boatman for an unforgettable ride through the canyon gorges.',
      'Experience traditional herbal oil massages from local massage practitioners along the river banks.',
      'Enjoy freshly fried river fish cooked by local riverside cooks right after your coracle ride.'
    ],
    festivals: ['Aadi Perukku Festival (August)'],
    dressCode: 'Quick-drying casual clothes or extra change of clothes recommended.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.75
  },
  {
    id: 'courtallam',
    name: 'Courtallam Waterfalls (Tenkasi)',
    tamilName: 'குற்றாலம் அருவி',
    category: 'nature',
    district: 'Tenkasi',
    city: 'Courtallam',
    dynasty: 'Pandya Dynasty Legends',
    constructionYear: 'Natural Forest Cascades',
    architecture: 'Natural Waterfall Spa',
    unescoStatus: false,
    timings: '06:00 AM - 06:00 PM',
    entryFees: 'Free',
    coordinates: { lat: 8.9298, lng: 77.2687 },
    history: `Known as the "Spa of South India", Courtallam (Kutrallam) in Tenkasi district features nine major cascading waterfalls originating in the Western Ghats mountain range. The waters cascade over diverse medicinal herbs and flora, conferring natural therapeutic and revitalizing qualities. Major falls include Main Falls (Peraruvi), Five Falls (Aintharuvi), and Shenbaga Falls. During the peak monsoon season (June to September), thousands gather to bathe in the natural cascades.`,
    visitorTips: [
      'Visit between June and September during the southwest monsoon season for peak water flow.',
      'Separate bathing areas are designated for men and women at Main Falls and Five Falls.',
      'Enjoy hot herbal tea and spicy banana fritters (bajji) from stalls near the cascades.'
    ],
    festivals: ['Courtallam சாரல் திருவிழா (Saral Tourism Festival - July/August)'],
    dressCode: 'Bathing wear or comfortable casual cotton clothes.',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.7
  },
  {
    id: 'thiruvannamalai',
    name: 'Annamalaiyar Temple (Thiruvannamalai)',
    tamilName: 'அருணாச்சலேஸ்வரர் கோயில்',
    category: 'temple',
    district: 'Tiruvannamalai',
    city: 'Thiruvannamalai',
    dynasty: 'Chola, Hoysala, Vijayanagara & Nayak Dynasties',
    constructionYear: '9th Century AD Foundation',
    architecture: 'Dravidian Style (Eastern Gopuram 66m)',
    unescoStatus: false,
    timings: '05:00 AM - 12:30 PM, 03:30 PM - 09:30 PM',
    entryFees: 'Free (Special Queue ₹50)',
    coordinates: { lat: 12.2319, lng: 79.0677 },
    history: `Situated at the foot of the sacred Annamalai Hill, Annamalaiyar Temple is one of the largest temple complexes in India (covering 25 acres) and represents the element Fire (Agni) among the Pancha Bhuta Sthalams. Shiva is worshipped here as Arunachaleswarar in the form of an Agni Lingam. The temple features four monumental gateway towers, with the Eastern Raja Gopuram standing 66 meters tall with 11 tiers. Millions of devotees undertake the sacred 14-kilometer barefoot walk around the base of the Annamalai Hill (Girivalam) on every full moon night.`,
    visitorTips: [
      'If participating in Girivalam (14km barefoot hill circumambulation), start in the cooler evening hours.',
      'Visit the nearby Sri Ramana Maharshi Ashram at the foot of the hill for silent meditation.',
      'Karthigai Deepam (Nov-Dec) witnesses a massive holy beacon of ghee lit on top of the Annamalai Hill, visible for miles.'
    ],
    festivals: ['Karthigai Deepam (November-December)', 'Monthly Pournami Girivalam'],
    dressCode: 'Strict traditional attire required.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9
  },
  {
    id: 'pichavaram',
    name: 'Pichavaram Mangrove Forest',
    tamilName: 'பிச்சாவரம் சதுப்புநிலக் காடு',
    category: 'nature',
    district: 'Cuddalore',
    city: 'Chidambaram / Cuddalore',
    dynasty: 'N/A',
    constructionYear: 'Natural Mangrove Wetland Ecosystem',
    architecture: 'Estuarine Mangrove Canals',
    unescoStatus: false,
    timings: '09:00 AM - 05:00 PM',
    entryFees: 'Rowboat: ₹300 - ₹500, Motorboat: ₹1,500 - ₹2,000',
    coordinates: { lat: 11.4286, lng: 79.7788 },
    history: `Pichavaram is the second largest mangrove forest ecosystem in the world, covering over 1,100 hectares near Chidambaram. Separated from the Bay of Bengal by a narrow sandbar, the forest consists of thousands of small islands intersected by a complex network of narrow water channels canopy-covered by Avicennia and Rhizophora mangrove trees. The shallow brackish waters serve as a nursery for shrimp, crabs, and over 177 species of migratory birds (snipes, cormorants, egrets, herons).`,
    visitorTips: [
      'Choose a traditional rowboat rather than a motorboat to navigate into the narrowest canopy-covered tunnel canals.',
      'Visit between November and February to spot migratory birds arriving from Siberia and Europe.',
      'Combine your tour with the famous Thillai Nataraja Temple in nearby Chidambaram (12 km away).'
    ],
    festivals: ['Eco-Tourism Wetland Carnivals'],
    dressCode: 'Casual clothing, hats, and lifejackets (provided by boat operators).',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0612b1b?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1627581138865-c0529d2f66be?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.8
  },
  {
    id: 'chidambaram',
    name: 'Thillai Nataraja Temple (Chidambaram)',
    tamilName: 'தில்லை நடராஜர் கோயில்',
    category: 'temple',
    district: 'Cuddalore',
    city: 'Chidambaram',
    dynasty: 'Pallava, Chola, Pandya & Vijayanagara Dynasties',
    constructionYear: '10th Century AD (Chola Golden Shrine)',
    architecture: 'Dravidian (Kanaka Sabha Gold Roof)',
    unescoStatus: false,
    timings: '06:00 AM - 12:00 PM, 05:00 PM - 10:00 PM',
    entryFees: 'Free',
    coordinates: { lat: 11.3992, lng: 79.6932 },
    history: `Thillai Nataraja Temple in Chidambaram is one of the most celebrated temples in Hinduism, representing Ether (Akasha) among the Pancha Bhuta Sthalams. Unlike most Shiva temples where the deity is worshipped in lingam form, here Shiva is worshipped as Nataraja—the Cosmic Dancer performing the Ananda Tandava ("Dance of Delight"). The central sanctuary (Chitsabha) features a gold-plated wooden roof composed of 21,600 golden tiles attached with 72,000 gold nails, symbolizing human breathing cycles and pulse rates. It also houses the esoteric "Chidambara Rahasyam" (Secret of Chidambaram).`,
    visitorTips: [
      'Witness the daily puja ceremonies where the sacred ruby Nataraja (Ratnasabhapathi) is worshipped with lamps.',
      'Observe the 108 Karanas (foundational classical dance postures of Bharatanatyam) carved into the four gopuram entrances.',
      'Maintained by hereditary Dikshitar priests wearing traditional topknots on the side of their heads.'
    ],
    festivals: ['Natyanjali Dance Festival (February-March)', 'Margazhi Thiruvaathirai (December-January)'],
    dressCode: 'Strict. Men must remove shirts and wear dhotis/trousers inside the main sanctum precinct.',
    image: 'https://images.unsplash.com/photo-1600100397990-24b32252c431?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.9
  },
  {
    id: 'tranquebar',
    name: 'Fort Dansborg & Tranquebar (Tharangambadi)',
    tamilName: 'தரங்கம்பாடி டேனியக் கோட்டை',
    category: 'fort',
    district: 'Mayiladuthurai',
    city: 'Tharangambadi',
    dynasty: 'Danish East India Company / Thanjavur Nayak',
    constructionYear: '1620 AD',
    architecture: 'Danish Colonial Coastal Military Architecture',
    unescoStatus: false,
    timings: '09:00 AM - 05:00 PM (Closed on Fridays)',
    entryFees: '₹10 (Indians), ₹100 (Foreigners)',
    coordinates: { lat: 11.0267, lng: 79.8517 },
    history: `Tharangambadi (meaning "Land of the Singing Waves") or Tranquebar was a Danish colony in India from 1620 to 1845. Fort Dansborg, built directly on the beach in 1620 by Danish Admiral Ove Gjedde under a treaty signed with Tanjore King Raghunatha Nayak, is the second largest Danish castle built outside Denmark. The bright yellow trapezoidal fortress houses a museum displaying 17th-century Danish pottery, cannonballs, and royal seals. Tranquebar is also the birthplace of the first printing press in India, imported by German missionary Bartholomäus Ziegenbalg in 1706 to print Tamil Bibles.`,
    visitorTips: [
      'Walk down King Street to see restored 18th-century Danish colonial bungalows and Zion Church.',
      'Visit the Ziegenbalg Printing Museum to see replicas of early 18th-century Tamil movable lead type printing presses.',
      'Enjoy calm ocean breezes along the quiet historic stone seawall.'
    ],
    festivals: ['Tranquebar Heritage Day Celebrations (November 19)'],
    dressCode: 'Casual beachwear and comfortable walking footwear.',
    image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.75
  },
  {
    id: 'vellore-fort',
    name: 'Vellore Fort & Jalakanteswarar Temple',
    tamilName: 'வேலூர் கோட்டை',
    category: 'fort',
    district: 'Vellore',
    city: 'Vellore',
    dynasty: 'Vijayanagara Empire (Chinani Nayak)',
    constructionYear: '1566 AD',
    architecture: 'Military Granite Fortress with Water Moat',
    unescoStatus: false,
    timings: '08:00 AM - 06:00 PM',
    entryFees: 'Free (Fort Complex), Museum: ₹20',
    coordinates: { lat: 12.9231, lng: 79.1325 },
    history: `Constructed in 1566 AD by Vijayanagara chieftains Chinna Bommi Nayak and Thimma Reddy Nayak, Vellore Fort is celebrated as one of the finest surviving military fortresses in South India. Built entirely of massive granite blocks, it is encircled by a deep 31-meter-wide moat fed by subterranean springs that once swarmed with thousands of crocodiles. The fort grounds house the historic Jalakanteswarar Temple (featuring exquisite Vijayanagara stone pillars), a church, a mosque, and government offices. It was also the site of the famous Vellore Sepoy Mutiny of 1806—the first major armed uprising by Indian soldiers against the British East India Company.`,
    visitorTips: [
      'Examine the magnificent wedding hall (Kalyana Mandapam) inside Jalakanteswarar Temple, renowned for monolithic stone horse sculptures.',
      'Walk along the massive outer granite ramparts offering views across the water moat.',
      'Visit the Government State Museum inside the fort to see weapons and coins from the Nayak and Tipu Sultan eras.'
    ],
    festivals: ['Vellore Sepoy Mutiny Commemoration (July 10)', 'Maha Shivaratri'],
    dressCode: 'Casual wear. Respectful attire inside the Jalakanteswarar temple.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.8
  },
  {
    id: 'adiyogi-coimbatore',
    name: 'Adiyogi Shiva Statue & Isha Yoga Center',
    tamilName: 'ஆதியோகி சிவன் சிலை',
    category: 'monument',
    district: 'Coimbatore',
    city: 'Coimbatore',
    dynasty: 'Modern India (Isha Foundation)',
    constructionYear: '2017 AD',
    architecture: '112-Foot Steel Monumental Sculpture',
    unescoStatus: false,
    timings: '06:00 AM - 08:00 PM',
    entryFees: 'Free',
    coordinates: { lat: 10.9734, lng: 76.7388 },
    history: `Located at the foothills of the Velliangiri Mountains near Coimbatore, Adiyogi is a 34-meter-tall (112 feet) steel statue of Lord Shiva recognized by the Guinness World Records as the "Largest Bust Sculpture" in the world. Designed by Sadhguru Jaggi Vasudev, the height of 112 feet symbolizes the 112 possibilities or pathways to attain ultimate liberation (Mukti) and the 112 chakras in human system anatomy. The surrounding Isha Yoga Center includes the consecration of the Dhyanalinga and the Theerthakunds (subterranean consecrated water bodies).`,
    visitorTips: [
      'Don\'t miss the spectacular "Divya Nethra" 3D Laser Light and Sound Show projected onto the Adiyogi statue every evening at 7:00 PM.',
      'Take a dip in the Suryakund or Chandrakund consecrated water bodies before entering Dhyanalinga for meditation.',
      'Maintain total silence inside the Dhyanalinga dome hall.'
    ],
    festivals: ['Mahashivratri Mega Night Festival', 'Yaksha Cultural Music & Dance Series'],
    dressCode: 'Modest casual attire or traditional Indian wear.',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.88
  },
  {
    id: 'yercaud-hills',
    name: 'Yercaud Lake & Shevaroy Hills',
    tamilName: 'ஏற்காடு மலைக்கோயில்',
    category: 'nature',
    district: 'Salem',
    city: 'Yercaud',
    dynasty: 'British Era (David Cockburn)',
    constructionYear: '1840s Settlement',
    architecture: 'Hill Station Lake & Coffee Estates',
    unescoStatus: false,
    timings: '08:00 AM - 06:00 PM',
    entryFees: 'Free (Boating: ₹150 - ₹350)',
    coordinates: { lat: 11.7753, lng: 78.2093 },
    history: `Nestled in the Shevaroy Hills of the Eastern Ghats at an altitude of 1,515 meters, Yercaud (meaning "Lake Forest" in Tamil) is a tranquil hill station in Salem district. Developed as a coffee plantation retreat in the 1840s by Sir Thomas Munro and David Cockburn, Yercaud is surrounded by lush coffee, orange, spice, and eucalyptus plantations. The heart of town features the Emerald Lake, Anna Park, Pagoda Point, and Lady's Seat cliff outlook.`,
    visitorTips: [
      'Visit Pagoda Point for breathtaking sunrise and evening valley views over the Salem city plains below.',
      'Buy freshly ground locally grown Arabica coffee beans and organic eucalyptus oil at plantation shops.',
      'Drive along the 32-kilometer Loop Road threading through lush cardamom and pepper estates.'
    ],
    festivals: ['Yercaud Summer Festival & Dog Show (May)'],
    dressCode: 'Warm woolen sweater and sports walking shoes.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&q=80&w=1200'
    ],
    rating: 4.65
  }
];
