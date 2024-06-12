Documentación de Uso de las API
Esta documentación describe las rutas disponibles para manejar productos utilizando las API definidas.


Documentación de Uso de las API
Esta documentación describe las rutas disponibles para manejar productos utilizando las API definidas en Express.

Base URL
http://<tu-dominio>/productos

Endpoints
-Obtener todos los productos
GET /productos

- Buscar un producto por ID
GET /api/productos/:id

- Crear un nuevo producto
POST /api/productos
Cuerpo de la solicitud:
{
  "nombre": "Nuevo Producto",
  "precio": 9999.99,
  "cantidad": 10,
  "categoria": "Nueva Categoria"
}

- Actualizar un producto
PUT /api/productos/:id
Cuerpo de la solicitud:
{
  "nombre": "Nuevo Producto",
  "precio": 9999.99,
  "cantidad": 10,
  "categoria": "Nueva Categoria"
}
OBS: Si algun campo es omitido se mantiene el valor anterior.

- Eliminar un producto
DELETE /api/productos/:id

- Obtener todos los productos ordenados
GET /api/productos/ordenados/:criterio
Parámetros:
criterio (string, requerido): Criterio de ordenación (nombre, precio, cantidad).

- Obtener todos los productos filtrados
GET /api/productos/filtrados/:criterio?valor=<valor>

criterio (string, requerido): Criterio de filtrado (precioMayor, categoria).
valor (string, requerido): Valor a filtrar.

Ejemplos 
http://<tu-dominio>/productos/filtrados/precioMayor?valor=100000
http://<tu-dominio>/productos/filtrados/categoria?valor=Hardware