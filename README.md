# Pixel React

Un sitio web moderno construido con React, Vite y Tailwind CSS. Este proyecto es un portafolio personal que incluye secciones como Hero, Servicios, Portafolio, Blog, Contacto y más.

## 🚀 Tecnologías Utilizadas

- **React 19** - Biblioteca para interfaces de usuario
- **Vite** - Herramienta de desarrollo rápida
- **Tailwind CSS 4** - Framework CSS utilitario
- **React Router DOM** - Enrutamiento para aplicaciones React
- **Lucide React** - Iconos SVG
- **ESLint** - Linting de código
- **Netlify** - Despliegue y hosting

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [Git](https://git-scm.com/)
- Un editor de código como [VS Code](https://code.visualstudio.com/)

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Ezzeorazi/Pixel-react.git
cd Pixel-react
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar el proyecto en modo desarrollo

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta ESLint para verificar el código

## 🌿 Guía de Git

### Trabajar con ramas

```bash
# Ver todas las ramas
git branch -a

# Crear una nueva rama
git checkout -b nombre-de-la-rama

# Cambiar a una rama existente
git checkout nombre-de-la-rama

# Subir una rama nueva al repositorio remoto
git push -u origin nombre-de-la-rama
```

### Pull y Push

```bash
# Obtener los últimos cambios del repositorio remoto
git pull origin main

# Agregar cambios al staging area
git add .

# Crear un commit con los cambios
git commit -m "Descripción de los cambios"

# Subir los cambios al repositorio remoto
git push origin nombre-de-la-rama
```

### Flujo de trabajo recomendado

1. **Crear una rama para tu feature:**
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. **Hacer tus cambios y commits:**
   ```bash
   git add .
   git commit -m "Agrega nueva funcionalidad"
   ```

3. **Actualizar tu rama con los cambios del main:**
   ```bash
   git checkout main
   git pull origin main
   git checkout feature/nueva-funcionalidad
   git merge main
   ```

4. **Subir tu rama:**
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

5. **Crear un Pull Request en GitHub** para fusionar los cambios.

## 📁 Estructura del Proyecto

```
Pixel-react/
├── public/
│   ├── _redirects          # Configuración de redirecciones para Netlify
│   ├── robots.txt          # Archivo para motores de búsqueda
│   ├── sitemap.xml         # Mapa del sitio
│   └── img/                # Imágenes estáticas
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Logo.jsx
│   │   ├── Navbar.jsx
│   │   ├── Portafolio.jsx
│   │   └── Services.jsx
│   ├── constants/
│   │   └── data.jsx        # Datos constantes del proyecto
│   ├── pages/
│   │   └── Home.jsx        # Página principal
│   ├── routes/
│   │   └── router.jsx      # Configuración de rutas
│   ├── index.css           # Estilos globales
│   └── main.jsx            # Punto de entrada de la aplicación
├── index.html              # HTML principal
├── netlify.toml            # Configuración de Netlify
├── package.json            # Dependencias y scripts
├── tailwind.config.js      # Configuración de Tailwind CSS
├── vite.config.js          # Configuración de Vite
└── README.md               # Este archivo
```

## 🚀 Despliegue

### Netlify

Este proyecto está configurado para desplegarse automáticamente en Netlify:

1. Conecta tu repositorio de GitHub a Netlify
2. Netlify detectará automáticamente la configuración en `netlify.toml`
3. Cada push a la rama `main` activará un nuevo despliegue

### Despliegue manual

```bash
# Construir la aplicación
npm run build

# Los archivos de producción estarán en la carpeta 'dist'
# Sube el contenido de 'dist' a tu proveedor de hosting
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Autor:** Ezzeorazi
- **GitHub:** [https://github.com/Ezzeorazi](https://github.com/Ezzeorazi)
- **Proyecto:** [https://github.com/Ezzeorazi/Pixel-react](https://github.com/Ezzeorazi/Pixel-react)

---

¡Gracias por revisar Pixel React! 🎉
