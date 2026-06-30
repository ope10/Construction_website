export interface Project {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'in-progress' | 'blueprint';
  location: string;
  sqft: string;
  timeline: string;
  budget: string;
  challenge: string;
  solution: string;
  description: string;
  mainImage: string;
  images: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface OfficeLocation {
  id: string;
  name: string;
  type: 'hq' | 'project';
  coordinates: { x: number; y: number }; // X and Y percentage positions on custom vector map (0-100)
  address: string;
  phone: string;
  manager: string;
  status: string;
}

export interface LeadEstimate {
  projectType: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  details: string;
}

export interface ContactBid {
  type: 'client' | 'subcontractor';
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  projectName?: string;
  bidAmount?: string;
  blueprintFileName?: string;
}
