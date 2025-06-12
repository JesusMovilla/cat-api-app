# Cat API App 🐱

Este es un proyecto de **React Native** desarrollado con [Expo](https://expo.dev), cuyo objetivo es consumir la API pública [TheCatApi](https://thecatapi.com/) para mostrar información sobre razas de gatos y detalles de cada una.

## Características principales

- Listado de razas de gatos obtenidas desde TheCatApi.
- Visualización de detalles de cada raza, incluyendo imágenes y descripciones.
- Navegación sencilla y diseño responsivo.
- Uso de hooks personalizados y componentes reutilizables.

## Instalación y ejecución

1. Instala las dependencias:

   ```bash
   yarn
   ```

2. Inicia la app:

   ```bash
   yarn start
   ```

Desde el menú de Expo podrás abrir la app en un emulador Android/iOS, en un dispositivo físico con Expo Go, o en la web.

## Configuración de variables de entorno

Para que la aplicación funcione correctamente, se debe crear un archivo `.env` en la raíz del proyecto y definir la siguiente variable:

```env
EXPO_PUBLIC_API_KEY=api_key_de_thecatapi
```

Esta clave es necesaria para autenticar las peticiones a la API.

## Estructura del proyecto

- **app/**: Contiene las pantallas principales y la navegación.
- **src/components/**: Componentes reutilizables, como por ejemplo, tarjetas de gatos y barra de progreso.
- **src/domain/**: Lógica de consumo de endpoints y configuración de la API.
- **src/hooks/**: Hooks personalizados, como por ejemplo, para manejo de temas y debounce.
- **src/interfaces/**: Tipos e interfaces TypeScript.
- **src/styles/**: Archivos de estilos y colores.

## Recursos útiles

- [Documentación de Expo](https://docs.expo.dev/)
- [TheCatApi Docs](https://thecatapi.com/)
