import { 
  Layout, 
  Terminal, 
  Layers, 
  Database, 
  Server, 
  Wrench, 
  BookOpen, 
  LineChart 
} from 'lucide-react';

export const technologies = [
  // --- UI & UX ---
  {
    id: 'shadcn',
    name: 'Shadcn UI',
    category: 'UI & Componentes',
    icon: Layout,
    description: 'Colección de componentes reutilizables construidos sobre Radix UI y Tailwind CSS. No es una librería de componentes tradicional, sino código que copias y pegas en tu proyecto, permitiendo control total y personalización sin límites.',
    website: 'https://ui.shadcn.com',
    installCmd: 'npx shadcn@latest init',
    tags: ['UI', 'Headless', 'Tailwind'],
    githubRepo: 'https://github.com/shadcn-ui/ui'
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    category: 'UI & Componentes',
    icon: Layout,
    description: 'La biblioteca de animación estándar de facto para React. Permite animaciones declarativas complejas, gestos y transiciones de diseño compartido con una API simple y potente.',
    website: 'https://motion.dev',
    installCmd: 'npm install framer-motion',
    tags: ['Animación', 'Gestos', 'DX'],
    githubRepo: 'https://github.com/motiondivision/motion'
  },
  {
    id: 'radix',
    name: 'Radix UI',
    category: 'UI & Componentes',
    icon: Layout,
    description: 'Primitivas de UI sin estilos (Headless) y accesibles para construir sistemas de diseño de alta calidad. Maneja la lógica difícil de accesibilidad WAI-ARIA por ti.',
    website: 'https://www.radix-ui.com',
    installCmd: 'npm install @radix-ui/react-popover',
    tags: ['Accesibilidad', 'Headless', 'Primitivas'],
    githubRepo: 'https://github.com/radix-ui/primitives'
  },
  {
    id: 'tanstack-table',
    name: 'TanStack Table',
    category: 'UI & Componentes',
    icon: Layout,
    description: 'Biblioteca "headless" para construir tablas y grillas de datos potentes. Ofrece ordenamiento, filtrado, agrupación y paginación sin imponer estilos visuales.',
    website: 'https://tanstack.com/table',
    installCmd: 'npm install @tanstack/react-table',
    tags: ['Tablas', 'Headless', 'Datos'],
    githubRepo: 'https://github.com/TanStack/table'
  },
  {
    id: 'cmdk',
    name: 'CMDK',
    category: 'UI & Componentes',
    icon: Terminal,
    description: 'Componente de paleta de comandos (Command Palette) rápido, componible y sin estilos. Ideal para interfaces tipo Spotlight o menús de comandos estilo Ctrl+K.',
    website: 'https://cmdk.paco.me',
    installCmd: 'npm install cmdk',
    tags: ['Command Palette', 'Accesibilidad'],
    githubRepo: 'https://github.com/pacocoursey/cmdk'
  },
   {
    id: 'dndkit',
    name: 'dnd kit',
    category: 'UI & Componentes',
    icon: Layout,
    description: 'Kit de herramientas moderno y ligero para drag & drop en React. Se centra en el rendimiento, accesibilidad y extensibilidad, con soporte para múltiples sensores de entrada.',
    website: 'https://dndkit.com',
    installCmd: 'npm install @dnd-kit/core',
    tags: ['Drag&Drop', 'Interacción'],
    githubRepo: 'https://github.com/clauderic/dnd-kit'
  },

  // --- FORMS & STATE ---
  {
    id: 'react-hook-form',
    name: 'React Hook Form',
    category: 'Estado & Formularios',
    icon: Layers,
    description: 'Gestión de formularios performante y flexible con validación fácil. Minimiza los re-renders y ofrece una mejor experiencia de usuario y desarrollador comparado con formularios controlados tradicionales.',
    website: 'https://react-hook-form.com',
    installCmd: 'npm install react-hook-form',
    tags: ['Formularios', 'Performance', 'Hooks'],
    githubRepo: 'https://github.com/react-hook-form/react-hook-form'
  },
  {
    id: 'zod',
    name: 'Zod',
    category: 'Estado & Formularios',
    icon: Layers,
    description: 'Validación de esquemas TypeScript-first con inferencia estática de tipos. Elimina la duplicación de declaraciones de tipos y valida datos en tiempo de ejecución tanto en cliente como en servidor.',
    website: 'https://zod.dev',
    installCmd: 'npm install zod',
    tags: ['Validación', 'TypeScript', 'Esquemas'],
    githubRepo: 'https://github.com/colinhacks/zod'
  },
  {
    id: 'zustand',
    name: 'Zustand',
    category: 'Estado & Formularios',
    icon: Layers,
    description: 'Solución de gestión de estado pequeña, rápida y escalable. Utiliza hooks simplificados sin el boilerplate de Redux y resuelve problemas comunes como el "zombie child problem".',
    website: 'https://zustand-demo.pmnd.rs',
    installCmd: 'npm install zustand',
    tags: ['State Management', 'Hooks', 'Minimalista'],
    githubRepo: 'https://github.com/pmndrs/zustand'
  },
  {
    id: 'nuqs',
    name: 'Nuqs',
    category: 'Estado & Formularios',
    icon: Layers,
    description: 'Gestión de estado segura (Type-safe) en los parámetros de búsqueda de la URL (Query Params). Permite sincronizar el estado de la UI con la URL para compartir y persistir vistas.',
    website: 'https://nuqs.47ng.com',
    installCmd: 'npm install nuqs',
    tags: ['URL State', 'Query Params', 'UX'],
    githubRepo: 'https://github.com/47ng/nuqs'
  },

  // --- DATA & BACKEND ---
  {
    id: 'trpc',
    name: 'tRPC',
    category: 'Datos & Backend',
    icon: Database,
    description: 'Permite construir APIs seguras de extremo a extremo sin esquemas ni generación de código. Comparte tipos de TypeScript directamente entre tu cliente y servidor.',
    website: 'https://trpc.io',
    installCmd: 'npm install @trpc/server @trpc/client',
    tags: ['API', 'TypeScript', 'Fullstack'],
    githubRepo: 'https://github.com/trpc/trpc'
  },
  {
    id: 'tanstack-query',
    name: 'TanStack Query',
    category: 'Datos & Backend',
    icon: Database,
    description: 'Gestión de estado asíncrono potente para TS/JS. Maneja caching, sincronización, y actualización del estado del servidor en tus aplicaciones React.',
    website: 'https://tanstack.com/query',
    installCmd: 'npm i @tanstack/react-query',
    tags: ['Async State', 'Cache', 'Data Fetching'],
    githubRepo: 'https://github.com/TanStack/query'
  },
  {
    id: 'prisma',
    name: 'Prisma',
    category: 'Datos & Backend',
    icon: Database,
    description: 'ORM de próxima generación para Node.js y TypeScript. Ofrece un modelo de datos declarativo, migraciones automatizadas y un cliente con autocompletado y seguridad de tipos.',
    website: 'https://www.prisma.io',
    installCmd: 'npm install prisma --save-dev',
    tags: ['ORM', 'Base de Datos', 'SQL'],
    githubRepo: 'https://github.com/prisma/prisma'
  },
  {
    id: 'drizzle',
    name: 'Drizzle ORM',
    category: 'Datos & Backend',
    icon: Database,
    description: 'ORM ligero y "SQL-like" para TypeScript. Diseñado para tener cero sobrecarga en tiempo de ejecución y ofrecer una experiencia de desarrollo cercana a escribir SQL puro pero tipado.',
    website: 'https://orm.drizzle.team',
    installCmd: 'npm install drizzle-orm',
    tags: ['ORM', 'SQL', 'Ligero'],
    githubRepo: 'https://github.com/drizzle-team/drizzle-orm'
  },
  {
    id: 'hono',
    name: 'Hono',
    category: 'Datos & Backend',
    icon: Server,
    description: 'Framework web ultrarrápido, pequeño y ligero para los bordes (Edges). Funciona en cualquier runtime de JavaScript: Cloudflare Workers, Fastly, Deno, Bun, Lagon, AWS Lambda y Node.js.',
    website: 'https://hono.dev',
    installCmd: 'npm install hono',
    tags: ['Backend', 'Edge', 'Performance'],
    githubRepo: 'https://github.com/honojs/hono'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Datos & Backend',
    icon: Server,
    description: 'Alternativa Open Source a Firebase. Proporciona una base de datos Postgres dedicada, autenticación, APIs instantáneas, funciones Edge y almacenamiento de archivos.',
    website: 'https://supabase.com',
    installCmd: 'npm install @supabase/supabase-js',
    tags: ['BaaS', 'Postgres', 'Auth'],
    githubRepo: 'https://github.com/supabase/supabase'
  },

  // --- UTILS & TOOLS ---
  {
    id: 'vercel-ai',
    name: 'Vercel AI SDK',
    category: 'Herramientas & Utils',
    icon: Wrench,
    description: 'Biblioteca para construir interfaces de usuario impulsadas por IA. Facilita la integración de LLMs, streaming de texto y creación de chats interactivos.',
    website: 'https://sdk.vercel.ai',
    installCmd: 'npm install ai',
    tags: ['IA', 'LLM', 'Streaming'],
    githubRepo: 'https://github.com/vercel/ai'
  },
  {
    id: 'resend',
    name: 'Resend',
    category: 'Herramientas & Utils',
    icon: Wrench,
    description: 'API de correo electrónico para desarrolladores. Permite diseñar correos transaccionales utilizando componentes de React en lugar de HTML/CSS antiguo.',
    website: 'https://resend.com',
    installCmd: 'npm install resend',
    tags: ['Email', 'React Email', 'API'],
    githubRepo: 'https://github.com/resend/react-email'
  },
   {
    id: 'polar',
    name: 'Polar',
    category: 'Herramientas & Utils',
    icon: Wrench,
    description: 'Plataforma de pagos unificada para desarrolladores. Maneja suscripciones, pagos únicos e impuestos (Merchant of Record), ideal para productos digitales y SaaS.',
    website: 'https://polar.sh',
    installCmd: 'npm install @polar-sh/sdk',
    tags: ['Pagos', 'SaaS', 'Monetización'],
    githubRepo: 'https://github.com/polarsource/polar'
  },
  {
    id: 'scalar',
    name: 'Scalar',
    category: 'Herramientas & Utils',
    icon: BookOpen,
    description: 'Generador de documentación de API moderna e interactiva desde especificaciones OpenAPI/Swagger. Ofrece una UI limpia y probadores de peticiones integrados.',
    website: 'https://scalar.com',
    installCmd: 'npm install @scalar/api-reference',
    tags: ['Docs', 'API', 'OpenAPI'],
    githubRepo: 'https://github.com/scalar/scalar'
  },
  {
    id: 'posthog',
    name: 'PostHog / OpenPanel',
    category: 'Herramientas & Utils',
    icon: LineChart,
    description: 'Plataforma de análisis de producto todo en uno. Ofrece análisis de embudos, grabaciones de sesión, feature flags y experimentación A/B. Puede ser auto-alojada.',
    website: 'https://posthog.com',
    installCmd: 'npm install posthog-js',
    tags: ['Analíticas', 'Product', 'Testing'],
    githubRepo: 'https://github.com/PostHog/posthog'
  },
  {
    id: 'coolify',
    name: 'Coolify',
    category: 'Infraestructura',
    icon: Server,
    description: 'Alternativa autohospedable a Vercel/Heroku/Netlify. Te permite desplegar aplicaciones, bases de datos y servicios en tu propio VPS con una interfaz simple.',
    website: 'https://coolify.io',
    installCmd: 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash',
    tags: ['DevOps', 'Self-hosted', 'Deploy'],
    githubRepo: 'https://github.com/coollabsio/coolify'
  }
];
