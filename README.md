# Venetus Kids ✨

Tienda online de ropa y accesorios premium para bebés.

## Estructura del proyecto

```
venetus-kids/
├── public/
│   └── index.html        ← Página HTML base
├── src/
│   ├── index.js          ← Punto de entrada React
│   └── App.jsx           ← App completa (tienda + admin)
├── package.json
├── vercel.json
└── .gitignore
```

## Cómo desplegar en Vercel (gratis)

1. Sube esta carpeta a GitHub
2. Ve a vercel.com → New Project → importa el repo
3. Vercel detecta React automáticamente → clic en Deploy
4. Tu tienda estará en: `tu-proyecto.vercel.app`

## Acceso al Panel Admin

- Botón "Panel Admin" abajo a la izquierda en la tienda
- Contraseña de demo: **admin123**
- Cambia la contraseña en src/App.jsx buscando: `form.password === "admin123"`

## Persistencia de datos

Los datos se guardan en **localStorage** del navegador del admin.
Para una base de datos real, consulta la carpeta `/backend` del proyecto completo.

## Pasarelas de pago

Configúralas desde: Panel Admin → Configuración → Pasarelas de pago
- **Yape/Plin**: disponible sin configuración
- **Culqi**: recomendado para Perú (culqi.com)
- **MercadoPago**: fácil de activar (mercadopago.com.pe)
- **Stripe**: tarjetas internacionales (stripe.com)
