# Ecommerce-Geffrey

Mi proyecto final del grado del Ciclo Formativo Superior de Desarrollo de Aplicaciones Web. 
Se basa en un Ecommerce de electrónica, desarrollado con Angular (FRONT-END) y Spring Tool Suite 4 (STS) (BACK-END) y MYSQL.

Para el desarrollo de mi aplicación web de e-commerce de electrónica, he utilizado una combinación de tecnologías modernas y prácticas de desarrollo ágil para garantizar una plataforma robusta, escalable y fácil de mantener.

# BACK-END
Para el desarrollo del BACKEND de mi aplicación web, elegí utilizar Spring Tool Suite 4 (STS), un IDE que se basa en Eclipse y está optimizado para el desarrollo de aplicaciones con el framework Spring. Esta herramienta me ha facilitado enormemente el proceso de creación y gestión del proyecto. Con STS, puedo iniciar un nuevo proyecto y seleccionar con precisión las dependencias requeridas desde el comienzo, lo cual agiliza la configuración inicial.
Una de las características que más valoro de STS es su capacidad para analizar los archivos de configuración. Esto me permite tener una visión clara de los beans que he definido y cómo se interrelacionan las dependencias dentro de mi aplicación. Además, la creación de entidades y controladores se vuelve un proceso más intuitivo, permitiéndome centrarme en la lógica de negocio en lugar de en la configuración técnica.
También he configurado las políticas CORS para asegurar una comunicación fluida entre el cliente y el servidor, lo cual es crucial para una experiencia de usuario sin interrupciones. La modificación del archivo pom.xml para añadir nuevas dependencias es otro proceso que STS simplifica, gracias a su interfaz gráfica y su integración con Maven, lo que me permite mantener mi proyecto actualizado y eficiente con facilidad.
Para la persistencia de datos, he optado por **MySQL**, un sistema de gestión de bases de datos relacional, que me proporciona las capacidades necesarias para manejar las transacciones y la información de los productos de manera segura y confiable. Para el entorno de desarrollo local, he utilizado **XAMPP**, que me ha permitido trabajar con Apache como servidor web y MySQL como base de datos de forma sencilla y sin complicaciones de configuración. 


# FRONT-END
Para la parte del FRONTEND he decidido desarrollarlo con Angular 17, un framework de JavaScript/TypeScript para construir interfaces de usuario con un enfoque en SPA (Single Page Applications). Angular me ha permitido estructurar la aplicación en componentes y servicios, facilitando así la llamada a los endpoints de Spring Boot y la presentación dinámica de los productos y servicios ofrecidos.
El control de versiones han sido manejados a través de ***GitHub***, utilizando comandos para gestionar el código fuente y las ramificaciones del proyecto, permitiendo trabajar de manera más segura pudiendo añadir y borrar ramas mientras iba programando código.  
Finalmente
  ***Finalmente**
 Para probar la API y asegurarme de que los endpoints funcionan como se espera, he utilizado **Postman**:
 una herramienta que me ha permitido enviar solicitudes HTTP y recibir respuestas de manera clara, lo que es esencial para el proceso de desarrollo y depuración.

En resumen, la combinación de estas tecnologías y herramientas me ha permitido crear una aplicación de e-commerce de electrónica que no solo cumple con los requisitos funcionales sino que también ofrece una experiencia de usuario excepcional.


# Funcionalidades en las que se divide 
Desde el inicio, mi visión fue crear una experiencia de usuario intuitiva y eficiente en mi sitio web de comercio electrónico.
 Inicialmente, contemplé permitir compras como invitado sin necesidad de registro, pero esto implicaba duplicar funcionalidades ya existentes para los clientes registrados. Opté por simplificar el proceso: 


**Funciones del usuario cliente**  ✔️
El usuario al llegar a -WebGeffrey, se registra fácilmente y obtiene acceso completo para : 
Ver productos y filtrar por precio, nombre, categorías. 
Ver detalles del producto y añadir al carrito.  
Ver el carrito lista de productos añadidos y puede quitar o añadir productos. 
Realiza la compra rellenando aunque actualmente  simula un pago con tarjeta, se podría integrar pasarelas de pago como Stripe o PayPal.
Ver el historial de compras y sus detalles 
Gestionar pedido realizado
Editar datos clientes
Eliminar cuenta.   
**Funciones del Admin**  ✔️
El Admi al llegar a -WebGeffrey, inicia sesión fácilmente y obtiene acceso completo para : 
Ver clientes y su información 
Ver productos  [CRUD] 
Editar 
Eliminar productos “SOLO” si no tiene stock, o si no tiene pedidos pendientes de entrega o en proceso de envío. 
Crear producto nuevo - con las “categorías que ya existen”
Gestionar el historial de pedidos
Filtrado de búsqueda por fecha
Marcar pedido como “Enviado” en ese caso el cliente le saldrá la opción de marcar como “Entregado” en el momento que le llega el pedido. Ó cancelar el pedido. 


# Mejoras que se podrían realizar en el futuro 
Se podría mejorar el sistema de pago, el seguimiento de los pedidos, la devolución del dinero, implementar descuentos automáticos, enviar promociones a tu correo, contactar con el administrador… **implementar funciones que se deseen.** 
Tener mejor consistencia entre el flujo de datos entre Angular, Spring y Mysql, ir mejorando partes ya que cada Framework se actualiza y algunas funcionalidades pueden quedar obsoletas y se requiere de mantenimiento constante.

# Bibliografía
He utilizado distintas fuentes de información  Angular , Getting started with Angular - Learn web development | MDN (mozilla.org) , https://www.typescriptlang.org/ , Tutorial Spring Boot - Creando nuestra primera aplicación (programandoointentandolo.com) , MySQL (desarrolloweb.com) , CIPHER | xMDR (youtube.com), Curso de Angular 17 completo - Angular 17 con Signals (youtube.com) , Protege tu API usando JWT y Spring Security (2022) (youtube.com) , Spring Boot 3 + Spring Security 6 - JWT Authentication and Authorisation [NEW] [2023] (youtube.com) , ChatGPT | OpenAI , Angular: De cero a experto | Udemy 



# Author 
Geffrey S. Zambrano Zambrano

# Date 
Junio/2024 

