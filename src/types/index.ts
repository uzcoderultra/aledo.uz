export type Language = 'RU' | 'UZ';

export interface ProductItem {
  id: string;
  name: string;
  category: 'interior' | 'outdoor' | 'systems' | 'special';
  subcategory: string;
  subcategoryUZ?: string;
  image: string;
  description: string;
  descriptionUZ?: string;
  specs: {
    power: string;
    cri: string;
    colorTemp: string;
    beamAngle: string;
    control: string;
    ipRating?: string;
  };
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  categoryUZ?: string;
  location: string;
  architect?: string;
  year: string;
  image: string;
  imageNight: string;
  area: string;
  description: string;
  descriptionUZ?: string;
  fixturesUsed: string[];
  luxLevel: string;
}

export interface ServiceStep {
  number: string;
  title: string;
  titleUZ?: string;
  description: string;
  descriptionUZ?: string;
  deliverables: string[];
  deliverablesUZ?: string[];
}

export interface EducationalArticle {
  id: string;
  title: string;
  titleUZ?: string;
  type: string;
  typeUZ?: string;
  date: string;
  readTime: string;
  readTimeUZ?: string;
  excerpt: string;
  excerptUZ?: string;
  image: string;
  speaker?: string;
  speakerUZ?: string;
}

export interface LightLabState {
  colorTemp: number; // 2400 to 5000
  beamAngle: number; // 12 to 60
  cri: number; // 80 or 97
  glareControl: boolean; // UGR < 19
  mode: 'wallwashing' | 'accent' | 'ambient';
  intensity: number; // 0 to 100
}

export interface ScenarioHotspot {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  fixtureName: string;
  fixtureNameUZ?: string;
  type: string;
  specs: string;
}

export interface ScenarioPreset {
  id: 'work' | 'relax' | 'gallery' | 'night';
  icon: string;
  title: string;
  titleUZ?: string;
  subtitle: string;
  subtitleUZ?: string;
  description: string;
  descriptionUZ?: string;
  image: string;
  unlitImage?: string;
  luxLevel: string;
  colorTemp: number; // Kelvin
  cri: string;
  ugr: string;
  controlProtocol: string;
  activeFixtures: string[];
  activeFixturesUZ?: string[];
  overlayGlow: string; // CSS gradient string
  hotspots: ScenarioHotspot[];
}

