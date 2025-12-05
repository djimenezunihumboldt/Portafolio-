# 📧 Configuración del Formulario de Contacto

El formulario de contacto ahora está configurado para enviar emails reales usando EmailJS. Para que funcione, necesitas seguir estos pasos:

## 🚀 Configuración de EmailJS

### Paso 1: Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### Paso 2: Configurar el servicio de email
1. En el dashboard de EmailJS, ve a "Email Services"
2. Añade un nuevo servicio (Gmail, Outlook, etc.)
3. Conecta tu cuenta de email (canelodaniel1997@gmail.com)
4. Copia el **Service ID**

### Paso 3: Crear una plantilla de email
1. Ve a "Email Templates"
2. Crea una nueva plantilla
3. Configura la plantilla con estos campos:
   ```
   Asunto: Nuevo mensaje de {{subject}} - {{from_name}}
   
   Tienes un nuevo mensaje desde tu portfolio:
   
   Nombre: {{from_name}}
   Email: {{from_email}}
   Asunto: {{subject}}
   
   Mensaje:
   {{message}}
   
   ---
   Enviado desde tu portfolio web
   ```
4. Copia el **Template ID**

### Paso 4: Obtener la clave pública
1. Ve a "Account" → "General"
2. Copia la **Public Key**

### Paso 5: Configurar las variables de entorno
1. Crea un archivo `.env` en la raíz del proyecto
2. Agrega las siguientes variables:
   ```
   VITE_EMAILJS_SERVICE_ID=tu_service_id_aqui
   VITE_EMAILJS_TEMPLATE_ID=tu_template_id_aqui
   VITE_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
   ```

### Paso 6: Reiniciar el servidor de desarrollo
```bash
npm run dev
```

## ✅ Funcionalidades implementadas

- ✅ Envío de emails reales a tu correo
- ✅ Validación de formulario
- ✅ Indicador de carga mientras se envía
- ✅ Mensajes de éxito y error
- ✅ Limpieza automática del formulario tras envío exitoso
- ✅ Protección con variables de entorno

## 🔒 Seguridad

- Las credenciales se almacenan como variables de entorno
- La clave pública de EmailJS es segura para usar en frontend
- El servicio está limitado a tu dominio (configurable en EmailJS)

## 📱 Límites del plan gratuito de EmailJS

- 200 emails por mes
- Perfecto para un portfolio personal

¡Ya tienes un formulario de contacto completamente funcional! 🎉
