# Plan de Implementación: Optimizador y Validador de Prompts

Este documento detalla los pasos técnicos necesarios para integrar la nueva funcionalidad de Validación y Mejora de Prompts como un módulo complementario en la herramienta "Prompt Architect", manteniendo la arquitectura actual de React/Vite.

## Fase 1: Refactorización y Arquitectura Base
El objetivo de esta fase es preparar la aplicación para soportar múltiples vistas sin afectar la funcionalidad existente.

1. **Reestructuración de Componentes**
   - Extraer todo el contenido principal actual de `src/App.tsx` (sidebar de parámetros y panel de preview) a un nuevo archivo: `src/components/PromptArchitectView.tsx`.
   - Crear un componente base vacío para la nueva funcionalidad: `src/components/PromptOptimizerView.tsx`.

2. **Implementación de Navegación Simple**
   - Modificar `src/App.tsx` para que funcione como el layout principal.
   - Agregar un estado para controlar la vista activa: `const [currentView, setCurrentView] = useState<'architect' | 'optimizer'>('architect')`.
   - Añadir un "Toggle" o pestañas de navegación en el Header superior para alternar entre ambas vistas suavemente.

## Fase 2: Gestión de Configuración y Seguridad (API Key)
Para que el Optimizador funcione, requerirá conectarse a un modelo LLM (ej. OpenAI). Como es una app frontend, el usuario debe proveer su propia llave.

1. **Modal de Configuración**
   - Crear un componente `SettingsModal.tsx`.
   - Agregar un ícono de engranaje (Settings) en el Header para abrir el modal.
   - Diseñar un campo de contraseña (`type="password"`) para ingresar la API Key.

2. **Almacenamiento Local Seguro**
   - Implementar lógica para cifrar o al menos guardar la API Key de forma segura en el `localStorage` del navegador (`prompt_architect_api_key`).
   - El Optimizador verificará si existe una llave antes de permitir hacer análisis; de lo contrario, pedirá al usuario que la ingrese.

## Fase 3: Interfaz de Usuario (UI) del Optimizador
Construir la pantalla principal del validador manteniendo el "look and feel" cinemático, oscuro y premium.

1. **Diseño del Componente `PromptOptimizerView`**
   - **Área de Entrada:** Un `textarea` amplio donde el usuario pegará su prompt original de marketing/redes sociales.
   - **Controles:** Un botón prominente "Analizar y Optimizar" con estados de desactivado y animación de carga (spinner).
   - **Panel de Resultados (Dividido):**
     - *Sección de Feedback:* Una lista o tarjetas pequeñas mostrando qué está bien y qué falta en el prompt original (ej. Tono, Formato, Audiencia).
     - *Sección del Prompt Mejorado:* Un área resaltada con el resultado final estructurado, con un botón de "Copiar al Portapapeles" (reutilizando la lógica que ya tienes).

## Fase 4: Integración de IA y Lógica de Negocio
El cerebro de la nueva funcionalidad. Aquí conectaremos la interfaz con la API de inteligencia artificial.

1. **Servicio de IA (`src/services/ai.ts`)**
   - Crear una función para llamar a la API de OpenAI (usando `fetch` nativo para no inflar las dependencias, o instalando el paquete `openai`).
   - Manejar errores comunes (ej. "API Key inválida", "Límite de cuota excedido").

2. **Diseño del "Meta-Prompt"**
   - Diseñar el prompt de sistema (System Prompt) que instruirá al LLM interno.
   - *Directrices del Meta-Prompt:* "Eres un experto en Prompt Engineering. Analiza el prompt del usuario. Devuelve un JSON con dos partes: 1) 'feedback': 3 viñetas sobre qué mejorar. 2) 'optimized_prompt': El texto del prompt mejorado aplicando las mejores prácticas (Contexto, Instrucción, Tono, Formato)."

3. **Conexión Final**
   - Conectar el botón de "Analizar" de la UI con el servicio de IA.
   - Parsear la respuesta JSON y mostrarla visualmente en los paneles correspondientes.

## Fase 5: Pruebas y Pulido
Asegurar que la experiencia sea impecable.

1. **Manejo de Estados de Error:** Mostrar mensajes amigables si la API falla o el usuario envía un texto vacío.
2. **Responsive Design:** Asegurar que la vista de dos columnas del Optimizador se colapse correctamente en dispositivos móviles.
3. **Persistencia:** (Opcional) Guardar el historial reciente de prompts optimizados en `localStorage`, similar a la funcionalidad de historial que ya tienes en el Architect.
