import Aberdeen from '../assets/Sponsors/Aberdeen.png';
import EmtelLogo from '../assets/Sponsors/Emtel_Logo.png';
import AccentureLogo from '../assets/Sponsors/accenture_marketing_logo.png';
import MuSwanLogo from '../assets/Sponsors/mu-swan-logo.webp';
import PosterWeb from '../assets/PosterWeb.png';

export const UpcomingEventsData = [
  {
    title: "UoM App Cup 2025",
    date: "2030-01-01T09:00:00",  // <-- date + time ISO format (far future for countdown test)
    description: "A thrilling competition where coders unite to solve real-world challenges in 24 hours.",
    category: "Coding",
    imageUrl: PosterWeb,
    sponsors: [Aberdeen, AccentureLogo, EmtelLogo]
  },
  {
    title: "AI Workshop",
    date: "2025-04-22T14:30:00", // example time: 2:30 PM
    description: "An insightful workshop exploring artificial intelligence, machine learning, and their applications.",
    category: "Workshop",
    imageUrl: "https://i.ytimg.com/vi/Bmw7IIEzv7w/maxresdefault.jpg",
    sponsors: [MuSwanLogo, Aberdeen]
  },
  {
    title: "Cybersecurity Bootcamp",
    date: "2025-05-05T10:00:00",
    description: "Learn the fundamentals of cybersecurity and how to protect your digital presence in this hands-on bootcamp.",
    category: "Security",
    imageUrl: "https://pics.craiyon.com/2023-06-24/a2826f5c3bc8404080978d8f33407112.webp",
    sponsors: [AccentureLogo, EmtelLogo, MuSwanLogo]
  },
  {
    title: "Open Source Contribution Day",
    date: "2025-05-15T11:00:00",
    description: "A collaborative event where members contribute to open-source projects and learn best practices in coding.",
    category: "Collaboration",
    imageUrl: "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg",
    sponsors: [Aberdeen, MuSwanLogo]
  },
  {
    title: "Game Development Jam",
    date: "2025-06-01T13:00:00",
    description: "Join us for a weekend of game creation, where developers and designers come together to create a fully playable game in just 48 hours.",
    category: "Game Development",
    imageUrl: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68",
    sponsors: [EmtelLogo, AccentureLogo]
  }
];
