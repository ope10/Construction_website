import { Project, Service, OfficeLocation } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'aura-tower',
    title: 'Aura Tower',
    category: 'commercial',
    location: 'New York City, NY',
    sqft: '450,000 SQFT',
    timeline: '24 Months',
    budget: '$180,000,000',
    challenge: 'Architectural specifications demanded parametric curved glass framing near a high-wind waterfront, which risked structural deflection and glass breakage during extreme storms.',
    solution: 'We engineered dynamic self-stabilizing double-glazed curtain walls with structural bronze support brackets and expansion joints, allowing the glass facade to absorb up to 4 inches of wind-induced lateral movement.',
    description: 'A flagship 42-story commercial tower featuring an organic, twisting shape designed to maximize natural light and offer unparalleled views of the city skyline. Standard floor plates were customized using advanced CAD/BIM model streaming.',
    mainImage: '/images/masterpiece_1.jpg',
    images: ['/images/masterpiece_1.jpg', '/images/gallery_com.jpg'],
    stats: [
      { label: 'Total Height', value: '620 FT' },
      { label: 'LEED Rating', value: 'Platinum' },
      { label: 'Steel Weight', value: '18,500 Tons' },
      { label: 'Concrete Volume', value: '45,000 YD³' }
    ]
  },
  {
    id: 'horizon-villa',
    title: 'The Horizon Villa',
    category: 'residential',
    location: 'Malibu, CA',
    sqft: '12,500 SQFT',
    timeline: '14 Months',
    budget: '$12,500,000',
    challenge: 'Performing a seismic retrofit on a luxury residential villa situated on an unstable 45-degree coastal cliff slope prone to mudslides.',
    solution: 'Our engineering team installed 24 deep-drilled steel-reinforced concrete piers anchoring the entire structure into solid bedrock 60 feet below ground level, coupled with a carbon-fiber shear wall system.',
    description: 'An ultra-luxury residential retreat seamlessly integrated into the Malibu cliffs. The villa utilizes floor-to-ceiling structural glass, an expansive infinity pool reflecting the Pacific, and automated smart-grid solar energy harvesting.',
    mainImage: '/images/masterpiece_2.jpg',
    images: ['/images/masterpiece_2.jpg', '/images/gallery_res.jpg'],
    stats: [
      { label: 'Bedrooms', value: '6' },
      { label: 'Bathrooms', value: '8.5' },
      { label: 'Solar Output', value: '25 kW' },
      { label: 'Seismic rating', value: 'Zone 4 Approved' }
    ]
  },
  {
    id: 'aethelgard-bridge',
    title: 'Aethelgard Bridge',
    category: 'in-progress',
    location: 'Portland, OR',
    sqft: '8,200 Linear FT',
    timeline: '36 Months',
    budget: '$240,000,000',
    challenge: 'Maintaining active shipping lanes along a major river route while hoisting and securing 400-ton pre-fabricated deck spans in place.',
    solution: 'We deployed synchronized heavy-lift barge cranes equipped with dynamic GPS positioning and custom hydraulic dampers to stabilize deck segments during installation, ensuring shipping lanes remained open 95% of the build.',
    description: 'A major civil engineering milestone, the Aethelgard Bridge is a state-of-the-art cable-stayed suspension bridge designed to connect key industrial transit corridors. The structure is built with next-generation high-strength carbon-injected steel cables.',
    mainImage: '/images/masterpiece_3.jpg',
    images: ['/images/masterpiece_3.jpg', '/images/gallery_progress.jpg'],
    stats: [
      { label: 'Daily Capacity', value: '45,000 Vehicles' },
      { label: 'Pylon Height', value: '310 FT' },
      { label: 'Max Span', value: '1,450 FT' },
      { label: 'Est. Completion', value: 'Q4 2026' }
    ]
  },
  {
    id: 'metropolitan-pavilion',
    title: 'Metropolitan Pavilion',
    category: 'blueprint',
    location: 'Boston, MA',
    sqft: '85,000 SQFT',
    timeline: '18 Months',
    budget: '$45,000,000',
    challenge: 'Strict municipal zoning limits restricted building height, while the client requested a 1,200-seat column-free multi-purpose grand hall.',
    solution: 'We engineered a self-supporting reciprocal wood-beam roof dome that transfers gravity loads outwards to perimeter compression rings, negating the need for any internal vertical columns.',
    description: 'A sustainable architectural masterpiece planned for development. Constructed primarily of mass timber, cross-laminated beams (CLT), and carbon-sequestering materials, the pavilion will serve as a carbon-neutral community hub.',
    mainImage: '/images/gallery_blueprint.jpg',
    images: ['/images/gallery_blueprint.jpg', '/images/gallery_com.jpg'],
    stats: [
      { label: 'Max Span', value: '180 FT Column-free' },
      { label: 'Mass Timber', value: '3,200 M³' },
      { label: 'Carbon Offset', value: '820 Tons' },
      { label: 'Zoning Code', value: 'C-3 Approved' }
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 'pre-construction',
    title: 'Pre-Construction Planning & Architecture',
    description: 'Every landmark begins with flawless planning. We handle everything from the initial site assessment to the detailed 3D rendering and local regulatory approvals.',
    icon: 'DraftingCompass',
    details: [
      'BIM (Building Information Modeling) 3D coordination and rendering',
      'Geotechnical soil assessment and zoning permit compliance',
      'Subcontractor cost auditing and value engineering',
      'Detailed site environmental impact studies'
    ]
  },
  {
    id: 'structural-production',
    title: 'Structural Engineering & Execution',
    description: 'We erect high-performance concrete foundations, heavy steel frameworks, and fully integrated building systems designed to stand for centuries.',
    icon: 'Hammer',
    details: [
      'Heavy structural steel erection and welding compliance',
      'High-durability concrete laying and deep pile foundation anchoring',
      'MEP (Mechanical, Electrical, Plumbing) complex integration',
      'Seismic dampening systems and structural shear wall installations'
    ]
  },
  {
    id: 'post-construction',
    title: 'Post-Construction Handover & Maintenance',
    description: 'We manage rigorous occupancy testing, engineering handovers, and ongoing structural health monitoring to protect the longevity of your investment.',
    icon: 'ShieldCheck',
    details: [
      'OSHA final safety certification and occupancy inspections',
      'As-built drawings delivery and BIM data handovers',
      'Thermal imaging and structural integrity diagnostics',
      'Preventative MEP warranty management and maintenance schedules'
    ]
  }
];

export const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'hq-ny',
    name: 'Corporate HQ & Design Studio',
    type: 'hq',
    coordinates: { x: 22, y: 35 }, // X/Y percentages on our SVG map coordinate plane
    address: '500 Fifth Avenue, Suite 4800, New York, NY 10110',
    phone: '+1 (212) 555-0190',
    manager: 'Sarah Lin (Principal Architect)',
    status: 'Active Headquarters'
  },
  {
    id: 'office-malibu',
    name: 'West Coast Regional Office',
    type: 'hq',
    coordinates: { x: 12, y: 70 },
    address: '22601 Pacific Coast Hwy, Malibu, CA 90265',
    phone: '+1 (310) 555-0144',
    manager: 'Marcus Vance, PE (Director of Civil Engineering)',
    status: 'Regional Operations Hub'
  },
  {
    id: 'project-aethelgard',
    name: 'Aethelgard Bridge Site Office',
    type: 'project',
    coordinates: { x: 8, y: 25 },
    address: '900 N Bridge Ave, Portland, OR 97217',
    phone: '+1 (503) 555-0120',
    manager: 'David Kojo (Construction Manager)',
    status: 'Active Construction Zone'
  },
  {
    id: 'project-boston',
    name: 'Metropolitan Pavilion Field Office',
    type: 'project',
    coordinates: { x: 30, y: 38 },
    address: '150 Public Garden Lane, Boston, MA 02116',
    phone: '+1 (617) 555-0112',
    manager: 'Elena Rostova (Lead Project Inspector)',
    status: 'Site Excavation Phase'
  }
];
