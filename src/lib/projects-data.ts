import cubiclesImg from "@/assets/service-cubicles.jpg";
import lockersImg from "@/assets/service-lockers.jpg";
import officeImg from "@/assets/service-office.jpg";
import claddingImg from "@/assets/service-cladding.jpg";
import solidSurfaceImg from "@/assets/service-solid-surface.jpeg";
import urinalImg from "@/assets/service-urinal.jpeg";
import doorsImg from "@/assets/service-doors.jpg";

export type SeedProject = {
  title: string;
  category: string;
  location: string;
  img: string;
};

export const seedProjects: SeedProject[] = [
  { title: "Dubai PMO Office", category: "Executive Joinery & Cladding", location: "Emirates Towers, Dubai", img: officeImg },
  { title: "Dubai Hills Mall", category: "HPL Toilet Cubicles & IPS Panels", location: "Dubai Hills, Dubai", img: cubiclesImg },
  { title: "Dubai Mall Reel Cinema", category: "HPL Locker Walls & Washrooms", location: "Downtown Dubai", img: lockersImg },
  { title: "Dubai Airport (Terminal 1, 2 & 3)", category: "HPL Toilet Cubicles & Urinal Screens", location: "Garhoud, Dubai", img: urinalImg },
  { title: "GEMS School of Research", category: "School Lockers & Cubicles", location: "Dubai", img: lockersImg },
  { title: "Abu Dhabi Airport", category: "IPS Panels & Solid Surface Vanities", location: "Abu Dhabi", img: solidSurfaceImg },
  { title: "ADNOC School Abu Dhabi", category: "Heavy-Duty Lockers & Doors", location: "Abu Dhabi", img: doorsImg },
  { title: "Dubai Safari", category: "HPL Changing Rooms & Benches", location: "Al Warqa, Dubai", img: claddingImg },
  { title: "100+ Labour Camps", category: "Standard HPL Toilet Cubicles & Urinal Screens", location: "Across United Arab Emirates", img: cubiclesImg },
];