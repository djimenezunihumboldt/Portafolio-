# 🚀 Portafolio Daniel Jiménez

Portfolio personal profesional construido con React, TypeScript, Vite y Tailwind CSS. Diseño moderno, responsivo y con soporte para modo oscuro.

![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)

## ✨ Características

- 🎨 **Diseño Moderno**: UI elegante con gradientes, animaciones suaves y efectos glass
- 🌓 **Modo Oscuro/Claro**: Tema adaptable con persistencia en localStorage
- 🌍 **Multiidioma**: Soporte completo para Español e Inglés
- 📱 **Totalmente Responsivo**: Optimizado para todos los dispositivos
- ♿ **Accesible**: Implementación de ARIA labels y navegación por teclado
- 📧 **Formulario de Contacto**: Integración con EmailJS
- 🚀 **Optimizado**: Build optimizado para producción

## 🛠️ Tecnologías

- **Frontend**: React 19, TypeScript
- **Estilos**: Tailwind CSS, CSS personalizado
- **Build**: Vite
- **Iconos**: Lucide React, React Icons
- **Animaciones**: CSS Animations, Intersection Observer
- **Email**: EmailJS
- **Deploy**: GitHub Pages

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/djimenezunihumboldt/project-bolt-sb1-afdjf5g4.git

# Entrar al directorio
cd project-bolt-sb1-afdjf5g4

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🔧 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Previsualiza el build localmente |
| `npm run lint` | Ejecuta ESLint |
| `npm run deploy` | Despliega a GitHub Pages |

## 🌐 Deploy en GitHub Pages

El proyecto está configurado para desplegarse automáticamente en GitHub Pages mediante GitHub Actions. Cada push a la rama `main` dispara el workflow de deploy.

### Deploy Manual

```bash
npm run deploy
```

## 📁 Estructura del Proyecto

```
src/
├── assets/          # Imágenes y recursos estáticos
├── components/      # Componentes reutilizables (Toast, Footer)
├── contexts/        # Contextos de React (Theme, Language)
├── hooks/           # Custom hooks
├── sections/        # Secciones del portfolio
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── ServicesSection.tsx
│   ├── SkillsSection.tsx
│   ├── ExperienceSection.tsx
│   ├── ProjectsSection.tsx
│   └── ContactSection.tsx
├── ui/              # Componentes de UI (Navbar, ThemeToggle)
├── App.tsx          # Componente principal
├── main.tsx         # Punto de entrada
└── index.css        # Estilos globales
```

## 📄 Licencia

MIT License - Libre para uso personal y comercial.

## 👤 Autor

**Daniel Jiménez**
- GitHub: [@djimenezunihumboldt](https://github.com/djimenezunihumboldt)
- LinkedIn: [Daniel Jiménez Pérez](https://www.linkedin.com/in/daniel-jim%C3%A9nez-p%C3%A9rez-64b512133/)

---

⭐ Si te gusta este proyecto, ¡dale una estrella!
