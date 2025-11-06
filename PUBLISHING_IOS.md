# Comandos para Publicar la Aplicación en iOS (TestFlight) con Expo

Este archivo contiene los pasos y comandos necesarios para compilar y subir tu aplicación a App Store Connect para su distribución a través de TestFlight.

**Requisitos previos:**
*   Tener `eas-cli` instalado (`npm install -g eas-cli`).
*   Haber iniciado sesión en tu cuenta de desarrollador de Apple en tu máquina.
*   Tener configurado el `eas.json` con un perfil de `production`.
*   Tener los "secrets" (variables de entorno como la URL de la API) configurados en EAS.

---

### Paso 1: Iniciar Sesión en Expo (si no lo has hecho)

Este comando te pedirá tus credenciales de Expo para autenticar la terminal. Solo necesitas hacerlo una vez por máquina.

```bash
npx eas login
```

---

### Paso 2: Compilar la Aplicación para iOS

Este es el paso más importante. Genera el archivo `.ipa` de tu aplicación. El perfil `--profile production` asegura que se utilicen las variables de entorno de producción que guardaste en los "secrets" de EAS.

**Ejecuta este comando desde la carpeta `app/`:**
```bash
eas build --platform ios --profile production
```

El proceso de compilación puede tardar entre 15 y 30 minutos. EAS lo hará en sus servidores. Puedes seguir el progreso en el enlace que te proporcionará la terminal.

---

### Paso 3: Subir la Aplicación a App Store Connect

Una vez que la compilación del paso anterior haya finalizado con éxito, este comando tomará la última compilación exitosa y la subirá a App Store Connect.

**Ejecuta este comando desde la carpeta `app/`:**
```bash
eas submit --platform ios --latest
```

Durante este proceso, `eas-cli` te pedirá tu Apple ID y una contraseña específica de la aplicación (App-Specific Password) si tienes la autenticación de dos factores activada.

---

### Resumen del Flujo Completo

1.  `bunx eas-cli login` (solo la primera vez)
2.  `bunx eas-cli build --platform ios --profile production` (esperar a que termine)
3.  `bunx eas-cli submit --platform ios --latest` (subir a TestFlight)

Después del paso 3, deberás esperar a que Apple procese la compilación (normalmente unos minutos) y luego podrás distribuirla a tus testers desde la app de App Store Connect o el sitio web. 