import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Terminal, 
  ExternalLink, 
  BookOpen, 
  ChevronRight, 
  Copy, 
  Check, 
  Layers, 
  Database, 
  Wrench, 
  Layout, 
  Server, 
  LineChart,
  Sparkles,
  Bot,
  Code,
  Lightbulb,
  MessageSquare,
  Send,
  Menu,
  X
} from 'lucide-react';

// --- DATA SOURCE ---
const libraryData = [
  // --- UI & UX ---
  {
    id: 'shadcn',
    name: 'Shadcn UI',
    category: 'UI & Componentes',
    icon: Layout,
    description: 'Colección de componentes reutilizables construidos sobre Radix UI y Tailwind CSS. No es una librería de componentes tradicional, sino código que copias y pegas en tu proyecto, permitiendo control total y personalización sin límites.',
    website: 'https://ui.shadcn.com',
    installCmd: 'npx shadcn@latest init',
    tags: ['UI', 'Headless', 'Tailwind']
  },
  {
    id: 'framer',
    name: 'Framer Motion',
    category: 'UI & Componentes',
    icon: Layout,
    description: 'La biblioteca de animación estándar de facto para React. Permite animaciones declarativas complejas, gestos y transiciones de diseño compartido con una API simple y potente.',
    website: 'https://motion.dev',
    installCmd: 'npm install framer-motion',
    tags: ['Animación', 'Gestos', 'DX']
  },
  {
    id: 'radix',
    name: 'Radix UI',
    category: 'UI & Componentes',
    icon: Layout,
    description: 'Primitivas de UI sin estilos (Headless) y accesibles para construir sistemas de diseño de alta calidad. Maneja la lógica difícil de accesibilidad WAI-ARIA por ti.',
    website: 'https://www.radix-ui.com',
    installCmd: 'npm install @radix-ui/react-popover',
    tags: ['Accesibilidad', 'Headless', 'Primitivas']
  },
  {
    id: 'tanstack-table',
    name: 'TanStack Table',
    category: 'UI & Componentes',
    icon: Layout,
    description: 'Biblioteca "headless" para construir tablas y grillas de datos potentes. Ofrece ordenamiento, filtrado, agrupación y paginación sin imponer estilos visuales.',
    website: 'https://tanstack.com/table',
    installCmd: 'npm install @tanstack/react-table',
    tags: ['Tablas', 'Headless', 'Datos']
  },
  {
    id: 'cmdk',
    name: 'CMDK',
    category: 'UI & Componentes',
    icon: Terminal,
    description: 'Componente de paleta de comandos (Command Palette) rápido, componible y sin estilos. Ideal para interfaces tipo Spotlight o menús de comandos estilo Ctrl+K.',
    website: 'https://cmdk.paco.me',
    installCmd: 'npm install cmdk',
    tags: ['Command Palette', 'Accesibilidad']
  },
   {
    id: 'dndkit',
    name: 'dnd kit',
    category: 'UI & Componentes',
    icon: Layout,
    description: 'Kit de herramientas moderno y ligero para drag & drop en React. Se centra en el rendimiento, accesibilidad y extensibilidad, con soporte para múltiples sensores de entrada.',
    website: 'https://dndkit.com',
    installCmd: 'npm install @dnd-kit/core',
    tags: ['Drag&Drop', 'Interacción']
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
    tags: ['Formularios', 'Performance', 'Hooks']
  },
  {
    id: 'zod',
    name: 'Zod',
    category: 'Estado & Formularios',
    icon: Layers,
    description: 'Validación de esquemas TypeScript-first con inferencia estática de tipos. Elimina la duplicación de declaraciones de tipos y valida datos en tiempo de ejecución tanto en cliente como en servidor.',
    website: 'https://zod.dev',
    installCmd: 'npm install zod',
    tags: ['Validación', 'TypeScript', 'Esquemas']
  },
  {
    id: 'zustand',
    name: 'Zustand',
    category: 'Estado & Formularios',
    icon: Layers,
    description: 'Solución de gestión de estado pequeña, rápida y escalable. Utiliza hooks simplificados sin el boilerplate de Redux y resuelve problemas comunes como el "zombie child problem".',
    website: 'https://zustand-demo.pmnd.rs',
    installCmd: 'npm install zustand',
    tags: ['State Management', 'Hooks', 'Minimalista']
  },
  {
    id: 'nuqs',
    name: 'Nuqs',
    category: 'Estado & Formularios',
    icon: Layers,
    description: 'Gestión de estado segura (Type-safe) en los parámetros de búsqueda de la URL (Query Params). Permite sincronizar el estado de la UI con la URL para compartir y persistir vistas.',
    website: 'https://nuqs.47ng.com',
    installCmd: 'npm install nuqs',
    tags: ['URL State', 'Query Params', 'UX']
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
    tags: ['API', 'TypeScript', 'Fullstack']
  },
  {
    id: 'tanstack-query',
    name: 'TanStack Query',
    category: 'Datos & Backend',
    icon: Database,
    description: 'Gestión de estado asíncrono potente para TS/JS. Maneja caching, sincronización, y actualización del estado del servidor en tus aplicaciones React.',
    website: 'https://tanstack.com/query',
    installCmd: 'npm i @tanstack/react-query',
    tags: ['Async State', 'Cache', 'Data Fetching']
  },
  {
    id: 'prisma',
    name: 'Prisma',
    category: 'Datos & Backend',
    icon: Database,
    description: 'ORM de próxima generación para Node.js y TypeScript. Ofrece un modelo de datos declarativo, migraciones automatizadas y un cliente con autocompletado y seguridad de tipos.',
    website: 'https://www.prisma.io',
    installCmd: 'npm install prisma --save-dev',
    tags: ['ORM', 'Base de Datos', 'SQL']
  },
  {
    id: 'drizzle',
    name: 'Drizzle ORM',
    category: 'Datos & Backend',
    icon: Database,
    description: 'ORM ligero y "SQL-like" para TypeScript. Diseñado para tener cero sobrecarga en tiempo de ejecución y ofrecer una experiencia de desarrollo cercana a escribir SQL puro pero tipado.',
    website: 'https://orm.drizzle.team',
    installCmd: 'npm install drizzle-orm',
    tags: ['ORM', 'SQL', 'Ligero']
  },
  {
    id: 'hono',
    name: 'Hono',
    category: 'Datos & Backend',
    icon: Server,
    description: 'Framework web ultrarrápido, pequeño y ligero para los bordes (Edges). Funciona en cualquier runtime de JavaScript: Cloudflare Workers, Fastly, Deno, Bun, Lagon, AWS Lambda y Node.js.',
    website: 'https://hono.dev',
    installCmd: 'npm install hono',
    tags: ['Backend', 'Edge', 'Performance']
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Datos & Backend',
    icon: Server,
    description: 'Alternativa Open Source a Firebase. Proporciona una base de datos Postgres dedicada, autenticación, APIs instantáneas, funciones Edge y almacenamiento de archivos.',
    website: 'https://supabase.com',
    installCmd: 'npm install @supabase/supabase-js',
    tags: ['BaaS', 'Postgres', 'Auth']
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
    tags: ['IA', 'LLM', 'Streaming']
  },
  {
    id: 'resend',
    name: 'Resend',
    category: 'Herramientas & Utils',
    icon: Wrench,
    description: 'API de correo electrónico para desarrolladores. Permite diseñar correos transaccionales utilizando componentes de React en lugar de HTML/CSS antiguo.',
    website: 'https://resend.com',
    installCmd: 'npm install resend',
    tags: ['Email', 'React Email', 'API']
  },
   {
    id: 'polar',
    name: 'Polar',
    category: 'Herramientas & Utils',
    icon: Wrench,
    description: 'Plataforma de pagos unificada para desarrolladores. Maneja suscripciones, pagos únicos e impuestos (Merchant of Record), ideal para productos digitales y SaaS.',
    website: 'https://polar.sh',
    installCmd: 'npm install @polar-sh/sdk',
    tags: ['Pagos', 'SaaS', 'Monetización']
  },
  {
    id: 'scalar',
    name: 'Scalar',
    category: 'Herramientas & Utils',
    icon: BookOpen,
    description: 'Generador de documentación de API moderna e interactiva desde especificaciones OpenAPI/Swagger. Ofrece una UI limpia y probadores de peticiones integrados.',
    website: 'https://scalar.com',
    installCmd: 'npm install @scalar/api-reference',
    tags: ['Docs', 'API', 'OpenAPI']
  },
  {
    id: 'posthog',
    name: 'PostHog / OpenPanel',
    category: 'Herramientas & Utils',
    icon: LineChart,
    description: 'Plataforma de análisis de producto todo en uno. Ofrece análisis de embudos, grabaciones de sesión, feature flags y experimentación A/B. Puede ser auto-alojada.',
    website: 'https://posthog.com',
    installCmd: 'npm install posthog-js',
    tags: ['Analíticas', 'Product', 'Testing']
  },
  {
    id: 'coolify',
    name: 'Coolify',
    category: 'Infraestructura',
    icon: Server,
    description: 'Alternativa autohospedable a Vercel/Heroku/Netlify. Te permite desplegar aplicaciones, bases de datos y servicios en tu propio VPS con una interfaz simple.',
    website: 'https://coolify.io',
    installCmd: 'curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash',
    tags: ['DevOps', 'Self-hosted', 'Deploy']
  }
];

// --- COMPONENTS ---

const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

const InstallCommand = ({ cmd }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative mt-4">
      <div className="absolute -top-3 left-3 bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded-t-md font-mono">
        Instalación
      </div>
      <div className="flex items-center justify-between bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg shadow-lg border border-gray-700">
        <div className="flex items-center gap-2 overflow-x-auto">
          <ChevronRight size={16} className="text-gray-500 flex-shrink-0" />
          <span className="whitespace-nowrap">{cmd}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="ml-4 p-1.5 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500"
          title="Copiar comando"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
};

// --- GEMINI API INTEGRATION ---

const callGemini = async (prompt, apiKey) => {
  if (!apiKey) throw new Error("API Key missing");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  let attempt = 0;
  const maxRetries = 5;
  const delays = [1000, 2000, 4000, 8000, 16000];

  while (attempt < maxRetries) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo generar respuesta.";
    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) throw error;
      await new Promise(resolve => setTimeout(resolve, delays[attempt - 1]));
    }
  }
};

const ApiKeyModal = ({ isOpen, onClose }) => {
  const [inputKey, setInputKey] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (inputKey.trim()) {
      localStorage.setItem('gemini_api_key', inputKey.trim());
      onClose(inputKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-2 mb-4 text-purple-700">
          <Sparkles size={24} />
          <h2 className="text-xl font-bold">Configurar Gemini AI</h2>
        </div>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          Para usar las funciones de IA, necesitas una API Key de Google Gemini.
          Esta clave se guardará en tu navegador (LocalStorage) y no se compartirá.
        </p>
        
        <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-xs mb-4 border border-blue-100">
          <strong>Tip:</strong> Puedes obtener tu clave gratis en <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">Google AI Studio</a>.
        </div>

        <input 
          type="password" 
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="Pega tu API Key aquí (AIza...)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 font-mono text-sm"
          autoFocus
        />

        <button 
          onClick={handleSave}
          disabled={!inputKey.trim()}
          className="w-full py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          Guardar y Continuar
        </button>
      </div>
    </div>
  );
};

const AIFeatureCard = ({ item, apiKey }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [customQuery, setCustomQuery] = useState("");

  // Reset state when item changes
  React.useEffect(() => {
    setResult(null);
    setError(null);
    setActiveTab(null);
    setCustomQuery("");
    setLoading(false);
  }, [item.id]);

  const handleAction = async (type) => {
    if (!apiKey) {
      setError("Falta la API Key. Recarga la página para configurarla.");
      return;
    }

    // Si selecciona pestaña "Consulta", solo cambiamos la vista, no llamamos a la API aún
    if (type === 'custom') {
      setActiveTab('custom');
      setResult(null);
      setError(null);
      return;
    }

    // Preparar UI para carga
    setLoading(true);
    setError(null);
    if (type !== 'custom_submit') {
       setActiveTab(type);
       setResult(null);
    }

    let prompt = "";
    const baseContext = `La tecnología es "${item.name}": ${item.description}.`;
    
    switch (type) {
      case 'guide':
        prompt = `${baseContext} Genera una guía de inicio rápido paso a paso para aprender a integrar y usar ${item.name} en un proyecto React en 5 minutos. Incluye ejemplos de código claros. Idioma: Español.`;
        break;
      case 'explain':
        prompt = `${baseContext} Explícame qué es y para qué sirve ${item.name} como si fuera un desarrollador Junior o un estudiante. Usa analogías simples. Mantén la respuesta breve (máximo 3 frases). Idioma: Español.`;
        break;
      case 'usecase':
        prompt = `${baseContext} Dame un caso de uso real, específico y moderno donde usaría obligatoriamente ${item.name} en una app web en 2026. Sé conciso. Idioma: Español.`;
        break;
      case 'code':
        prompt = `${baseContext} Genera un ejemplo de código en React (muy breve y autocontenido) mostrando cómo importar y usar ${item.name} básicamente. Usa markdown para el código. Comentarios en Español.`;
        break;
      case 'custom_submit':
        if (!customQuery.trim()) {
            setError("Por favor escribe tu consulta antes de enviar.");
            setLoading(false);
            return;
        }
        prompt = `${baseContext} El usuario tiene la siguiente consulta específica: "${customQuery}". Responde de forma técnica, clara y concisa. Idioma: Español.`;
        break;
      default:
        setLoading(false);
        return;
    }

    try {
      const text = await callGemini(prompt, apiKey);
      setResult(text);
    } catch (err) {
      console.error(err);
      setError("Hubo un error al conectar con Gemini. Verifica tu API Key o inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="mt-8 p-6 rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-purple-700 font-semibold">
        <Sparkles size={20} />
        <h3>Zona AI Gemini</h3>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleAction('guide')}
          disabled={loading}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'guide' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'}`}
        >
          <BookOpen size={16} />
          Guía de Inicio
        </button>
        <button
          onClick={() => handleAction('explain')}
          disabled={loading}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'explain' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'}`}
        >
          <Bot size={16} />
          Explicámelo como Junior
        </button>
        <button
          onClick={() => handleAction('usecase')}
          disabled={loading}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'usecase' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'}`}
        >
          <Lightbulb size={16} />
          Caso de Uso Real
        </button>
        <button
          onClick={() => handleAction('code')}
          disabled={loading}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'code' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'}`}
        >
          <Code size={16} />
          Generar Código
        </button>
        <button
          onClick={() => handleAction('custom')}
          disabled={loading}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'custom' || activeTab === 'custom_submit' ? 'bg-purple-600 text-white' : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'}`}
        >
          <MessageSquare size={16} />
          Consulta
        </button>
      </div>

      {/* Input de Consulta Personalizada (visible solo si la pestaña custom está activa) */}
      {(activeTab === 'custom' || activeTab === 'custom_submit') && (
        <div className="mb-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex gap-2">
                <input 
                    type="text" 
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    placeholder={`Pregunta lo que quieras sobre ${item.name}...`}
                    className="flex-1 px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white shadow-sm text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && !loading && handleAction('custom_submit')}
                />
                <button 
                    onClick={() => handleAction('custom_submit')}
                    disabled={loading}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send size={16} />
                    <span className="hidden sm:inline">Enviar</span>
                </button>
            </div>
        </div>
      )}

      <div className="min-h-[100px] bg-white rounded-lg border border-purple-100 p-4 shadow-inner">
        {loading ? (
          <div className="flex items-center justify-center h-full text-purple-400 gap-2 animate-pulse py-8">
            <Sparkles size={18} />
            <span>Consultando a Gemini...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 text-sm py-8 text-center">{error}</div>
        ) : result ? (
          <div className="prose prose-sm prose-purple max-w-none text-gray-700">
             <div dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br/>').replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto my-2"><code>$1</code></pre>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>
        ) : (
          <div className="text-gray-400 text-sm italic flex items-center justify-center h-full py-8 text-center">
             {activeTab === 'custom' ? 'Escribe tu pregunta arriba y presiona Enter.' : 'Selecciona una opción para generar contenido con IA.'}
          </div>
        )}
      </div>
    </div>
  );
};


export default function App() {
  const [selectedId, setSelectedId] = useState(libraryData[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
  
  // API Key State
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // Initialize API Key
  React.useEffect(() => {
    // 1. Check Env
    const envKey = import.meta.env.VITE_GEMINI_API_KEY;
    // 2. Check LocalStorage
    const localKey = localStorage.getItem('gemini_api_key');

    if (envKey && envKey.length > 5) {
      setApiKey(envKey);
    } else if (localKey && localKey.length > 5) {
      setApiKey(localKey);
    } else {
      setShowApiKeyModal(true);
    }
  }, []);

  // Filter logic
  const filteredData = useMemo(() => {
    return libraryData.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  // Group by category for the sidebar
  const groupedData = useMemo(() => {
    const groups = {};
    filteredData.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredData]);

  // Current selected item data
  const activeItem = libraryData.find(item => item.id === selectedId) || libraryData[0];
  const IconComponent = activeItem.icon;

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      
      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR (INDICE IZQUIERDO) --- */}
      <aside className={`
        fixed inset-y-0 left-0 w-80 bg-white border-r border-gray-200 flex flex-col h-full shadow-lg z-30 transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:shadow-sm
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-5 border-b border-gray-100 bg-white sticky top-0 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen className="text-blue-600" />
            <span className="tracking-tight">React Tech</span>
          </h1>
          {/* Close button for mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar tecnología..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-md text-sm outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
          {Object.entries(groupedData).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                {category}
              </h3>
              <ul className="space-y-1">
                {items.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setSelectedId(item.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                        selectedId === item.id 
                          ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span>{item.name}</span>
                      {selectedId === item.id && <ChevronRight size={14} className="text-blue-500" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {filteredData.length === 0 && (
            <div className="text-center text-gray-400 py-10 text-sm">
              No se encontraron resultados
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 text-center">
          Guía de Referencia Interactiva
        </div>
     </aside>

      {/* --- API KEY MODAL --- */}
      <ApiKeyModal 
        isOpen={showApiKeyModal} 
        onClose={(key) => {
          setApiKey(key);
          setShowApiKeyModal(false);
        }} 
      />

      {/* --- MAIN CONTENT --- (DETALLE DERECHA) --- */}
      <main className="flex-1 overflow-y-auto bg-white/50 relative">
        <div className="max-w-4xl mx-auto p-6 md:p-12 pb-24">
          
          {/* Header Mobile Toggle */}
          <div className="md:hidden flex items-center gap-3 mb-6">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <span className="font-semibold text-gray-900">React Tech Book</span>
          </div>

          {/* Header */}
          <header className="flex items-start justify-between mb-8 gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white shadow-md border border-gray-100 rounded-xl hidden sm:block">
                <IconComponent size={32} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{activeItem.name}</h2>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
                    {activeItem.category}
                  </Badge>
                  {activeItem.tags.map(tag => (
                    <Badge key={tag} className="bg-gray-100 text-gray-600 border border-gray-200">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <a 
              href={activeItem.website} 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm"
            >
              <span>Documentación</span>
              <ExternalLink size={14} />
            </a>
          </header>

          <div className="h-px bg-gray-200 w-full mb-8"></div>

          {/* Description Content */}
          <div className="prose prose-blue max-w-none mb-10">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-gray-400" />
              Resumen Profesional
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed bg-blue-50/50 p-6 rounded-xl border border-blue-100 text-justify">
              {activeItem.description}
            </p>
          </div>

          {/* AI Feature Card Integration */}
          <AIFeatureCard item={activeItem} apiKey={apiKey} />

          {/* Installation Section */}
          <div className="mt-12 mb-12">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Terminal size={18} className="text-gray-400" />
              Instalación Rápida
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Copia y pega este comando en tu terminal para añadir la dependencia a tu proyecto.
            </p>
            <InstallCommand cmd={activeItem.installCmd} />
          </div>

          {/* Additional Resources (Mock) */}
          <div className="grid grid-cols-1">
             <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group bg-white">
                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                  Repositorio GitHub
                </div>
                <div className="text-xs text-gray-500">
                  Explora el código fuente y contribuye.
                </div>
             </div>
          </div>

        </div>
      </main>
      
    </div>
  );
}