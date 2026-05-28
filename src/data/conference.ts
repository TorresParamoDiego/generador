export const CONFERENCE = {
  name: 'Coding Conf 2026',
  // Fecha de hoy formateada en es-MX
  date: new Date().toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  shortDate: new Date().toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
  city: 'Celaya, Guanajuato',
  location: 'Tecnológico Nacional de México — Campus Celaya',
};

export interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
  type: 'keynote' | 'workshop' | 'break' | 'panel';
}

export const SCHEDULE: ScheduleItem[] = [
  { time: '08:30 — 09:00', title: 'Registro y bienvenida',                                       type: 'break' },
  { time: '09:00 — 09:45', title: 'Keynote: El futuro del desarrollo web',  speaker: 'Dr. María González',  type: 'keynote' },
  { time: '10:00 — 11:00', title: 'Workshop: React 19 y Server Components', speaker: 'Carlos Vega',         type: 'workshop' },
  { time: '11:00 — 11:30', title: 'Coffee break',                                                 type: 'break' },
  { time: '11:30 — 12:30', title: 'Panel: IA en el desarrollo de software',  speaker: 'Industry leaders',   type: 'panel' },
  { time: '12:30 — 14:00', title: 'Comida y networking',                                          type: 'break' },
  { time: '14:00 — 15:00', title: 'Workshop: Backend con Node y PostgreSQL', speaker: 'Ana Ruiz',           type: 'workshop' },
  { time: '15:15 — 16:00', title: 'Diseño de APIs RESTful escalables',       speaker: 'Luis Mendoza',       type: 'keynote' },
  { time: '16:00 — 16:30', title: 'Coffee break',                                                 type: 'break' },
  { time: '16:30 — 17:30', title: 'Cierre y entrega de reconocimientos',                          type: 'keynote' },
];

export interface Activity {
  icon: 'code' | 'lightbulb' | 'people' | 'trophy';
  title: string;
  description: string;
}

export const ACTIVITIES: Activity[] = [
  {
    icon: 'code',
    title: 'Talleres prácticos',
    description: 'Aprende haciendo con sesiones hands-on de React, Node.js y diseño de APIs.',
  },
  {
    icon: 'people',
    title: 'Networking',
    description: 'Conoce a otros estudiantes, profesionales y reclutadores en un ambiente colaborativo.',
  },
  {
    icon: 'lightbulb',
    title: 'Keynotes inspiracionales',
    description: 'Charlas magistrales con líderes de la industria del software.',
  },
  {
    icon: 'trophy',
    title: 'Reconocimientos',
    description: 'Entrega de constancias y premios a los proyectos destacados del semestre.',
  },
];

export const VENUE = {
  name: 'Instituto Tecnológico de Celaya',
  fullName: 'Tecnológico Nacional de México — Campus Celaya',
  address: 'Av. Tecnológico y A. García Cubas S/N',
  area: 'Colonia Alfredo V. Bonfil',
  city: 'Celaya, Guanajuato, México',
  zip: '38010',
  phone: '+52 (461) 611 7575',
  email: 'contacto@itcelaya.edu.mx',
  website: 'https://www.celaya.tecnm.mx',
  description:
    'El Instituto Tecnológico de Celaya, parte del Tecnológico Nacional de México, es una de las instituciones de educación superior más prestigiosas del Bajío. Reconocido por sus programas de ingeniería y su impulso a la innovación tecnológica, será la sede de este evento.',
  // Imagen local del Tecnológico de Celaya
  imageUrl: '/assets/images/tecnm-celaya.jpg',
  // Imagen fallback (campus universitario) por si la principal falla
  fallbackImage:
    'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.6!2d-100.8164!3d20.5396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2zMjDCsDMyJzIyLjYiTiAxMDDCsDQ4JzU5LjEiVw!5e0!3m2!1ses!2smx!4v1700000000000',
};
