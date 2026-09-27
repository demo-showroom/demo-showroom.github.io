export type GalleryCategory = "exterior" | "interior" | "detalle";

export interface GalleryImage {
  id: number;
  src: string;
  thumb: string;
  alt: string;
  category: GalleryCategory;
  label: string;
}

export const vehicle = {
  brand: "SOL NACIENTE",
  status: "Disponible",
  title: "BMW X6 xDrive40i M Sport",
  year: "2022",
  km: "32.000 km",
  fuel: "Nafta",
  priceGs: 690000000,
  priceUsd: 117600,
  location: "Asunción, Paraguay",
  stockId: "SN-2022-X6-084",
  videoUrl:
    "https://videos.pexels.com/video-files/5419057/5419057-uhd_3840_2160_25fps.mp4",
  videoPoster:
    "https://images.pexels.com/photos/9411653/pexels-photo-9411653.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  summary: [
    { key: "motor", label: "Motor", value: "3.0 L Turbo" },
    { key: "potencia", label: "Potencia", value: "381 HP" },
    { key: "transmision", label: "Transmisión", value: "Automática" },
    { key: "traccion", label: "Tracción", value: "AWD" },
  ],
  description:
    "Coupé deportiva de lujo con alma M Sport. Único dueño, mantenimientos al día en representante, cubiertas nuevas y garantía de motor y caja. Interior en cuero Vernasca, techo panorámico Sky Lounge y sonido envolvente Harman Kardon. Lista para entrega inmediata con transferencia incluida.",
  highlights: [
    "Techo panorámico Sky Lounge",
    "Interior en cuero Vernasca",
    "Sonido Harman Kardon",
    "Cámara 360° + Park Assist",
    "Paquete M Sport Pro",
    "Portalón eléctrico gestual",
  ],
};

export const gallery: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/14428164/pexels-photo-14428164.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    thumb:
      "https://images.pexels.com/photos/14428164/pexels-photo-14428164.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    alt: "BMW X6 negro vista lateral urbana",
    category: "exterior",
    label: "Vista lateral",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/29566879/pexels-photo-29566879.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    thumb:
      "https://images.pexels.com/photos/29566879/pexels-photo-29566879.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    alt: "BMW X6 en showroom iluminado",
    category: "exterior",
    label: "En showroom",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/9411653/pexels-photo-9411653.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    thumb:
      "https://images.pexels.com/photos/9411653/pexels-photo-9411653.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    alt: "Frontal BMW con faros LED encendidos",
    category: "exterior",
    label: "Faros Laser LED",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/7154531/pexels-photo-7154531.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    thumb:
      "https://images.pexels.com/photos/7154531/pexels-photo-7154531.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    alt: "BMW X6 negro en ciudad",
    category: "exterior",
    label: "Perfil M Sport",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/9411659/pexels-photo-9411659.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    thumb:
      "https://images.pexels.com/photos/9411659/pexels-photo-9411659.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    alt: "Detalle trasero emblema X6",
    category: "detalle",
    label: "Emblema X6",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/7154532/pexels-photo-7154532.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    thumb:
      "https://images.pexels.com/photos/7154532/pexels-photo-7154532.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    alt: "BMW X6 posterior tres cuartos",
    category: "exterior",
    label: "Tres cuartos",
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/36037157/pexels-photo-36037157.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    thumb:
      "https://images.pexels.com/photos/36037157/pexels-photo-36037157.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    alt: "Llanta BMW M de aleación",
    category: "detalle",
    label: "Llantas M 21”",
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/10219086/pexels-photo-10219086.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    thumb:
      "https://images.pexels.com/photos/10219086/pexels-photo-10219086.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    alt: "Detalle frenos y llanta",
    category: "detalle",
    label: "Frenos M Sport",
  },
  {
    id: 9,
    src: "https://images.pexels.com/photos/4141873/pexels-photo-4141873.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    thumb:
      "https://images.pexels.com/photos/4141873/pexels-photo-4141873.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    alt: "Interior BMW cuero y tablero",
    category: "interior",
    label: "Cabina Vernasca",
  },
  {
    id: 10,
    src: "https://images.pexels.com/photos/5348870/pexels-photo-5348870.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    thumb:
      "https://images.pexels.com/photos/5348870/pexels-photo-5348870.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    alt: "Volante y tablero BMW",
    category: "interior",
    label: "Puesto conductor",
  },
  {
    id: 11,
    src: "https://images.pexels.com/photos/30092538/pexels-photo-30092538.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    thumb:
      "https://images.pexels.com/photos/30092538/pexels-photo-30092538.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    alt: "Cockpit BMW X6",
    category: "interior",
    label: "Cockpit Live",
  },
  {
    id: 12,
    src: "https://images.pexels.com/photos/1338396/pexels-photo-1338396.png?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    thumb:
      "https://images.pexels.com/photos/1338396/pexels-photo-1338396.png?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    alt: "Detalle volante BMW M",
    category: "detalle",
    label: "Volante M",
  },
];

export const specs = [
  {
    group: "Motor y desempeño",
    items: [
      { label: "Motor", value: "3.0 L TwinPower Turbo I6" },
      { label: "Potencia", value: "381 HP @ 5.200 rpm" },
      { label: "Torque", value: "520 Nm @ 1.850 rpm" },
      { label: "0–100 km/h", value: "5.5 s" },
      { label: "Velocidad máx.", value: "250 km/h (limitada)" },
      { label: "Consumo mixto", value: "9.2 L / 100 km" },
    ],
  },
  {
    group: "Transmisión y chasis",
    items: [
      { label: "Transmisión", value: "Automática Steptronic 8 vel." },
      { label: "Tracción", value: "AWD xDrive inteligente" },
      { label: "Suspensión", value: "Neumática adaptativa M" },
      { label: "Dirección", value: "Asistida eléctrica variable" },
      { label: "Llantas", value: "M 21” bicolor + runflat" },
    ],
  },
  {
    group: "Dimensiones y generales",
    items: [
      { label: "Año", value: "2022" },
      { label: "Kilometraje", value: "32.000 km" },
      { label: "Combustible", value: "Nafta" },
      { label: "Color", value: "Negro Zafiro metalizado" },
      { label: "Puertas / Plazas", value: "5 / 5" },
      { label: "Baúl", value: "580 L" },
    ],
  },
];

export const equipment = [
  {
    group: "Exterior",
    items: [
      "Paquete M Sport Pro",
      "Techo panorámico Sky Lounge",
      "Faros BMW Laserlight",
      "Portalón trasero eléctrico gestual",
      "Barras de techo M High-gloss",
      "Escape M Sport con difusor",
    ],
  },
  {
    group: "Interior y confort",
    items: [
      "Tapizado cuero Vernasca",
      "Asientos deportivos calefaccionados",
      "Climatizador 4 zonas",
      "Iluminación ambiental",
      "Volante M en cuero calefaccionado",
      "Cortinas traseras eléctricas",
    ],
  },
  {
    group: "Tecnología",
    items: [
      "Sistema sonido Harman Kardon",
      "BMW Live Cockpit Professional",
      "Head-Up Display",
      "Cámara 360° + Park Assist Plus",
      "Apple CarPlay / Android Auto",
      "Cargador inalámbrico",
    ],
  },
  {
    group: "Seguridad",
    items: [
      "Driving Assistant Professional",
      "Control crucero adaptativo",
      "Alerta punto ciego + tráfico cruzado",
      "Frenado autónomo emergencia",
      "6 airbags + ISOFIX",
      "Sensores 360° + night vision",
    ],
  },
];

export function formatGs(value: number) {
  return "Gs. " + value.toLocaleString("es-PY");
}
