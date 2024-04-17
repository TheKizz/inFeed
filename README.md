# inFeed

Plataforma de encuestas interactivas: Crea, comparte y participa en encuestas personalizadas con tu comunidad, equipo o amigos. Únete a encuestas públicas o privadas por invitación, contribuye y comparte tu opinión.

## Tabla de Contenido

[1. Introducción](#1-introducción)

[2. Dominio](#2-dominio)

[3. Análisis](#3-análisis)

&nbsp;&nbsp;&nbsp;&nbsp;[3.1. Casos de uso](#31-casos-de-uso)

&nbsp;&nbsp;&nbsp;&nbsp;[3.2. Dominio](#32-dominio)

[4. Arquitectura y diseño](#4-arquitectura-y-diseño)

&nbsp;&nbsp;&nbsp;&nbsp;[4.1. Modelo C4](#41-modelos-c4)

&nbsp;&nbsp;&nbsp;&nbsp;[4.2. Estructura general de módulos](#42-estructura-general-de-módulos)

&nbsp;&nbsp;&nbsp;&nbsp;[4.3. Base de datos](#43-base-de-datos)

&nbsp;&nbsp;&nbsp;&nbsp;[4.4. Seguridad](#44-seguridad)

&nbsp;&nbsp;&nbsp;&nbsp;[4.5. CI/CD](#45-cicd)

[5. Documentación](#5-documentación)

[6. Tecnologías](#6-tecnologías)

[7. Herramientas](#7-herramientas)

[8. Referencias](#8-referencias)

## 1. Introducción

En construcción.

## 2. Dominio

En construcción.

## 3. Análisis

En construcción.

### 3.1 Casos de uso

Diagramas de casos de uso para cada uno de los módulos del sistema, aquellas acciones que se encuentran con lineas discontinuas se especifican en un diagrama aparte para mejor comprensión, se recomienda revisar la documentación de cada uno de los módulos para obtener la mejor comprensión del sistema. [Ver detalles de los diagramas](./docs/use%20cases/detailed/ "Enlace hacia los diagramas de detalle").

#### 3.1.1. Modulo de Encuentas

![Diagrama de casos de uso (Modulo de encuestas)](./docs/use%20cases/survey-module.png "Diagrama de casos de uso (Modulo de encuestas)")

#### 3.1.2. Modulo de Acceso de usuarios

![Diagrama de casos de uso (Modulo de acceso de usuarios)](./docs/use%20cases/user-access-module.png "Diagrama de casos de uso (Modulo de acceso de usuarios)")

### 3.2. Dominio

En construcción.

## 4. Arquitectura y diseño

En construcción.

### 4.1. Modelo C4

#### 4.1.1. Diagrama de Contexto

![Diagrama de contexto](./docs/architecture/C4/1-context.png "Diagrama de contexto")

#### 4.1.2. Diagrama de Contenedores

![Diagrama de contenedors](./docs/architecture/C4/2-container.png "Diagrama de contenedores")

#### 4.1.3. Diagrama de componentes (alto nivel)

![Diagrama de componentes (alto nivel)](./docs/architecture/C4/3-component-high-level.png "Diagrama de componentes (alto nivel)")

#### 4.1.4. Diagrama de componentes (nivel de modulos)

![Diagrama de componentes (nivel de modulos)](./docs/architecture/C4/4-component-module-level.png "Diagrama de componentes (nivel de modulos)")

### 4.2. Estructura general de módulos

![Diagrama de la estructura general de módulos](./docs/architecture/general-first-view.png "Diagrama de la estructura general de módulos")

### 4.3. Base de datos

[![Diagrama de base de datos](./docs/database/inFeedDB.png "Diagrama de base de datos")](./src/modules/shared/infrastructure/database/prisma/migrations/)
_Pulsa la imagen para ver los scripts de la base de datos._

### 4.4. Seguridad

En construcción.

### 4.5. CI/CD

En construcción.

## 5. Documentación

En construcción.

## 6. Tecnologías

Tecnologías utilizadas para el funcionamiento del proyecto.

[![Visual Studio Code Badge](https://img.shields.io/badge/Visual%20Studio%20Code-grey?style=flat&logo=visual-studio-code&logoColor=blue)](https://code.visualstudio.com/ "Enlace hacia la pagina oficialde Visual Studio Code")
[![Node.js Badge](https://img.shields.io/badge/Node.js-grey?style=flat&logo=node.js)](https://nodejs.org/ "Enlace hacia la pagina oficial de Node.js")
[![NPM Badge](https://img.shields.io/badge/NPM-grey?style=flat&logo=npm)](https://npm.com/ "Enlace hacia la pagina oficial de NPM")
[![Typescript Badge](https://img.shields.io/badge/Typescript-grey?style=flat&logo=typescript)](https://www.typescriptlang.org/ "Enlace hacia la pagina oficial de Typescript")
[![NestJS Badge](https://img.shields.io/badge/NestJS-grey?style=flat&logo=nestjs&logoColor=red)](https://nestjs.com/ "Enlace hacia la pagina oficial de NestJS")
[![Jest Badge](https://img.shields.io/badge/Jest-grey?style=flat&logo=jest&logoColor=pink)](https://jestjs.io/ "Enlace hacia la pagina oficial de Jest")
[![Supertest Badge](https://img.shields.io/badge/Supertest-grey?style=flat&logo=super-test)](https://www.npmjs.com/package/supertest "Enlace hacia la pagina oficial de Supertest")
[![PostgreSQL Badge](https://img.shields.io/badge/PostgreSQL-grey?style=flat&logo=postgresql)](https://www.postgresql.org/ "Enlace hacia la pagina oficial de PostgreSQL")
[![Prisma Badge](https://img.shields.io/badge/Prisma-grey?style=flat&logo=prisma&logoColor=black)](https://www.prisma.io/ "Enlace hacia la pagina oficial de Prisma")

_Pulsa la insignia para visitar el sitio web oficial de la tecnología._

## 7. Herramientas

Herramientas auxiliares utilizadas para la construcción y mantenimiento del proyecto.

[![Excalidraw Badge](https://img.shields.io/badge/Excalidaw-grey?style=flat&logo=excalidraw)](https://excalidraw.com/ "Enlace hacia la pagina oficial de Excalidraw")
[![Dbdiagram Badge](https://img.shields.io/badge/Dbdiagram-grey?style=flat&logo=dbdiagram)](https://dbdiagram.io/ "Enlace hacia la pagina oficial de Dbdiagram")
[![Git Badge](https://img.shields.io/badge/Git-grey?style=flat&logo=git)](https://git-scm.com/ "Enlace hacia la pagina oficial de Git")
[![Github Badge](https://img.shields.io/badge/Github-grey?style=flat&logo=github)](https://github.com/ "Enlace hacia la pagina oficial de Github")
[![Prettier Badge](https://img.shields.io/badge/Prettier-grey?style=flat&logo=prettier)](https://prettier.io/ "Enlace hacia la pagina oficial de Prettier")
[![ESlint Badge](https://img.shields.io/badge/ESlint-grey?style=flat&logo=eslint&logoColor=blueviolet)](https://eslint.org/ "Enlace hacia la pagina oficial de ESlint")
[![Husky Badge](https://img.shields.io/badge/Husky-grey?style=flat&logo=husky)](https://typicode.github.io/husky/ "Enlace hacia la pagina oficial de Husky")
[![Commitlint Badge](https://img.shields.io/badge/Commitlint-grey?style=flat&logo=commitlint)](https://commitlint.js.org/ "Enlace hacia la pagina oficial de Commitlint")
[![Commitizen Badge](https://img.shields.io/badge/Commitizen-grey?style=flat&logo=commitizen)](https://commitizen-tools.github.io/commitizen/ "Enlace hacia la pagina oficial de Commitizen")
[![Postman Badge](https://img.shields.io/badge/Postman-grey?style=flat&logo=postman)](https://www.postman.com/ "Enlace hacia la pagina oficial de Postman")
[![Swagger Badge](https://img.shields.io/badge/Swagger-grey?style=flat&logo=swagger)](https://swagger.io/ "Enlace hacia la pagina oficial de Swagger")
[![Docker Badge](https://img.shields.io/badge/Docker-grey?style=flat&logo=docker)](https://www.docker.com/ "Enlace hacia la pagina oficial de Docker")
[![Shields Badge](https://img.shields.io/badge/Shield-grey?style=flat&logo=shields)](https://shields.io/ "Enlace hacia la pagina oficial de Shields")

_Pulsa la insignia para visitar el sitio web oficial de la tecnología._

## 8. Referencias

Referencias a todo el material usado para la construcción de este proyecto, se otorgan los créditos correspondientes a cada fuente y sus autores correspondientes.

- [Monolitos modulares](https://github.com/kgrzybek/modular-monolith-with-ddd?tab=readme-ov-file#30-c4-model)
- [Las crónicas de la arquitectura de software](https://herbertograca.com/2017/07/03/the-software-architecture-chronicles/)
