# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---------------------------------------
---------------------------------------
BioSync - Panel de Monitoreo de Compostaje (Frontend)

Este proyecto es una interfaz gráfica (Frontend) desarrollada en React para el monitoreo de variables ambientales en plantas de compostaje. Permite visualizar datos de sensores (temperatura, humedad, gases), gestionar alertas, configurar umbrales y administrar el perfil del operador.

Actualmente, el proyecto funciona de manera simulada (Mocking). Esto significa que no requiere una base de datos ni una conexión a internet para funcionar de forma interactiva. Utiliza la memoria temporal y el almacenamiento local del navegador web para simular el comportamiento de un sistema real.

A continuación, se explica paso a paso cómo ejecutar el proyecto, cómo está estructurado y cómo funciona su lógica.
1. Requisitos Previos y Ejecución (Cómo compilar la página)

Para que esta página web funcione en tu computadora local, necesitas instalar un entorno de ejecución y un gestor de paquetes.

Herramientas necesarias:

    Node.js: Es el motor que permite ejecutar código JavaScript fuera del navegador. Descárgalo e instálalo desde nodejs.org.

    NPM (Node Package Manager): Se instala automáticamente junto con Node.js y sirve para descargar las librerías que usa el proyecto (como React y los iconos).

Pasos para ejecutar el proyecto:

    Abre una terminal (Símbolo del sistema en Windows, o Terminal en Mac/Linux).

    Navega hasta la carpeta principal del proyecto.

    Instala las dependencias necesarias ejecutando:
    Bash

    npm install

    Una vez finalizada la instalación, levanta el servidor local ejecutando:
    Bash

    npm run dev 
    # Nota: Si usaste Create React App originalmente, el comando podría ser "npm start"

    La terminal te mostrará un enlace (generalmente http://localhost:5173 o http://localhost:3000). Haz clic en él o cópialo en tu navegador para ver la página funcionando.

2. Estructura de Carpetas

El proyecto está organizado siguiendo el estándar de aplicaciones React. Así se divide el código para mantener el orden:
Plaintext

📁 biosync-frontend/
├── 📁 node_modules/       # Librerías descargadas por npm (no se toca).
├── 📁 public/             # Archivos estáticos como el favicon o imágenes base.
├── 📁 src/                # Carpeta principal donde vive TODO nuestro código.
│   ├── 📁 components/     # Piezas visuales reutilizables (botones, gráficos, medidores).
│   ├── 📁 pages/          # Las pantallas completas de la aplicación.
│   ├── 📄 App.jsx         # Archivo maestro que une las rutas y el menú de navegación.
│   ├── 📄 main.jsx        # (o index.js) Punto de entrada. Inserta React en el navegador.
│   └── 📄 index.css       # Estilos globales y variables de colores (--bg-dark, etc.).
├── 📄 package.json        # Lista de dependencias y scripts de ejecución.
└── 📄 README.md           # Este documento explicativo.

¿Por qué separar components y pages?

    Pages (Páginas): Son las vistas principales (Dashboard.jsx, Settings.jsx, Perfil.jsx). Actúan como "contenedores" grandes.

    Components (Componentes): Son piezas pequeñas que se usan dentro de las páginas (SemiGauge.jsx, HistoryChart.jsx). Si necesitas usar un medidor en el Dashboard y también en otra pantalla, simplemente llamas al componente en lugar de reescribir el código.

3. Lógica del Sistema: ¿Cómo funciona sin Base de Datos?

Para que los botones funcionen, la página recuerde tus configuraciones y las alertas desaparezcan al hacerles clic, utilizamos dos conceptos fundamentales de React y de los navegadores web:

    React State (useState): Es la memoria a corto plazo de un componente. Cuando creamos una variable de estado (por ejemplo, una lista de alertas o si estamos en "modo edición"), React vigila esa variable. Si la modificamos mediante un botón, React redibuja automáticamente solo esa parte de la pantalla al instante. Esta memoria se borra si recargas la página.

    Local Storage (localStorage): Es el disco duro del navegador. Permite guardar pequeños datos de texto. Lo usamos en la página de Configuración para guardar los umbrales de temperatura y humedad. Gracias a esto, si cierras la pestaña y vuelves mañana, tus configuraciones seguirán ahí.

4. Explicación de Archivos y Pantallas Principales
src/pages/Dashboard.jsx (Panel Principal)

    Propósito: Mostrar el resumen en tiempo real del compostaje.

    Cómo funciona: Importa los componentes SemiGauge (para los relojes de temperatura/humedad) y HistoryChart (para la gráfica de líneas).

    Lógica interactiva: Utiliza useState para mantener una lista de "Alertas Recientes". Cuando el usuario hace clic en el enlace "[Confirmar]", se ejecuta una función que filtra (elimina) esa alerta de la lista, y la pantalla se actualiza automáticamente mostrando un mensaje de "Todo en orden" si la lista queda vacía.

src/pages/Settings.jsx (Configuración)

    Propósito: Permitir al operador ajustar los límites máximos y mínimos de las alertas.

    Cómo funciona: Cada deslizador (input tipo range) está conectado a una variable de estado.

    Lógica interactiva: Al cargar la página, React busca en el localStorage si hay valores guardados previamente; si no los hay, carga valores por defecto (ej: 30°C). Al hacer clic en "Guardar Cambios", la función handleSave escribe los valores actuales en la memoria permanente del navegador y muestra un mensaje temporal de éxito.

src/pages/Perfil.jsx (Perfil de Usuario)

    Propósito: Mostrar los datos del operador y sus preferencias de seguridad y notificaciones.

    Cómo funciona: Utiliza una variable booleana isEditing (verdadero o falso) para cambiar la interfaz.

    Lógica interactiva: Si isEditing es falso, muestra los textos normales. Si el usuario hace clic en "Editar Información", isEditing pasa a verdadero, y los textos se convierten en cajas de texto <input>. El usuario escribe sobre ellas, actualizando un objeto userData en tiempo real. Al guardar, los inputs vuelven a ser texto plano.