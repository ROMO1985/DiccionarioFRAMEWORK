import { TOGAFTerm, TermCategory } from "./types";

export const togaftTerms: TOGAFTerm[] = [
  // SECTION 2.1 - DEFINITIONS
  {
    id: "1",
    english: "Abstraction",
    spanish: "Abstracción",
    englishDefinition: "The technique of providing summarized or generalized descriptions of detailed and complex content.",
    spanishDefinition: "La técnica de proporcionar descripciones resumidas o generalizadas de contenido detallado y complejo.",
    reference: "§3.1 Abstraction",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "2",
    english: "Actor",
    spanish: "Actor",
    englishDefinition: "A person, organization, or system that has one or more roles that initiates or interacts with activities; for example, a sales representative who travels to visit customers. Actors may be internal or external to an organization.",
    spanishDefinition: "Una persona, organización o sistema que tiene uno o más roles que inician o interactúan con actividades; por ejemplo, un representante de ventas que viaja a visitar clientes. Los actores pueden ser internos o externos a una organización.",
    reference: "§3.2 Actor",
    category: TermCategory.DEFINITIONS,
    domain: "Business"
  },
  {
    id: "3",
    english: "Application Architecture",
    spanish: "Arquitectura de Aplicaciones",
    englishDefinition: "A description of the structure and interaction of the applications as groups of capabilities that provide key business functions and manage the data assets.",
    spanishDefinition: "Una descripción de la estructura y la interacción de las aplicaciones como grupos de capacidades que proporcionan funciones de negocio clave y administran los activos de datos.",
    reference: "§3.3 Application Architecture",
    category: TermCategory.DEFINITIONS,
    domain: "Application"
  },
  {
    id: "4",
    english: "Application Component",
    spanish: "Componente de Aplicación",
    englishDefinition: "An encapsulation of application functionality aligned to implementation structure, which is modular and replaceable. It encapsulates its behavior and data, provides services, and makes them available through interfaces.",
    spanishDefinition: "Una encapsulación de la funcionalidad de la aplicación alineada con la estructura de implementación, que es modular y reemplazable. Encapsula su comportamiento y datos, proporciona servicios, y los hace disponibles a través de interfaces.",
    reference: "§3.4 Application Component",
    category: TermCategory.DEFINITIONS,
    domain: "Application"
  },
  {
    id: "5",
    english: "Application Platform",
    spanish: "Plataforma de Aplicaciones",
    englishDefinition: "The collection of technology components of hardware and software that provide the services used to support applications.",
    spanishDefinition: "La colección de componentes de tecnología de hardware y software que proporcionan los servicios utilizados para soportar aplicaciones.",
    reference: "§3.5 Application Platform",
    category: TermCategory.DEFINITIONS,
    domain: "Technology"
  },
  {
    id: "6",
    english: "Architectural Style",
    spanish: "Estilo Arquitectónico",
    englishDefinition: "The combination of distinctive features related to the specific context within which architecture is performed or expressed; a collection of principles and characteristics that steer or constrain how an architecture is formed.",
    spanishDefinition: "La combinación de características distintivas relacionadas con el contexto específico dentro del cual se desempeña o expresa la arquitectura; una colección de principios y características que orientan o limitan el cómo se forma una arquitectura.",
    reference: "§3.6 Architectural Style",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "7",
    english: "Architecture",
    spanish: "Arquitectura",
    englishDefinition: "1. The fundamental concepts or properties of a system in its environment embodied in its elements, relationships, and in the principles of its design and evolution. 2. The structure of components, their inter-relationships, and the principles and guidelines governing their design and evolution over time.",
    spanishDefinition: "1. Los conceptos fundamentales o propiedades de un sistema en su entorno incorporadas en sus elementos, relaciones y en los principios de su diseño y evolución. 2. La estructura de los componentes, sus interrelaciones y los principios y directrices que rigen su diseño y evolución en el tiempo.",
    reference: "§3.7 Architecture",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "8",
    english: "Architecture Building Block (ABB)",
    spanish: "Bloques de Construcción de Arquitectura (ABB)",
    englishDefinition: "A constituent of the architecture model that describes a single aspect of the overall model.",
    spanishDefinition: "Un componente del modelo de arquitectura que describe un solo aspecto del modelo general.",
    reference: "§3.8 Architecture Building Block (ABB)",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "9",
    english: "Architecture Continuum",
    spanish: "Continuum de Arquitectura",
    englishDefinition: "A part of the Enterprise Continuum. A repository of architectural elements with increasing detail and specialization.",
    spanishDefinition: "Una parte del Continuum Empresarial. Un repositorio de elementos arquitectónicos con mayor detalle y especialización.",
    reference: "§3.9 Architecture Continuum",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "10",
    english: "Architecture Development Method (ADM)",
    spanish: "Método de desarrollo de Arquitectura (ADM)",
    englishDefinition: "The core of the TOGAF framework. A multi-phase, iterative approach to develop and use an Enterprise Architecture to shape and govern business transformation and implementation projects.",
    spanishDefinition: "El núcleo del marco TOGAF. Un enfoque iterativo multi-fase para desarrollar y utilizar una Arquitectura Empresarial para conformar y gobernar proyectos de transformación empresarial e implementación.",
    reference: "§3.10 Architecture Development Method (ADM)",
    category: TermCategory.DEFINITIONS,
    domain: "Governance"
  },
  {
    id: "11",
    english: "Architecture Domain",
    spanish: "Dominio de Arquitectura",
    englishDefinition: "The architectural area being considered. The TOGAF framework has four primary architecture domains: business, data, application, and technology. Other domains may also be considered (e.g., security).",
    spanishDefinition: "El área arquitectónica considerada. El marco TOGAF tiene cuatro dominios de arquitectura principales: negocios, datos, aplicaciones y tecnología. También se pueden considerar otros dominios (por ejemplo, seguridad).",
    reference: "§3.11 Architecture Domain",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "12",
    english: "Architecture Framework",
    spanish: "Marco de Referencia de Arquitectura",
    englishDefinition: "A conceptual structure used to plan, develop, implement, govern, and sustain an architecture.",
    spanishDefinition: "Una estructura conceptual utilizada para planificar, desarrollar, implementar, gobernar y sostener una arquitectura.",
    reference: "§3.12 Architecture Framework",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "13",
    english: "Architecture Governance",
    spanish: "Gobierno de la Arquitectura",
    englishDefinition: "The practice of monitoring and directing architecture-related work. The goal is to deliver desired outcomes and adhere to relevant principles, standards, and roadmaps.",
    spanishDefinition: "La práctica de monitorear y dirigir el trabajo relacionado con la arquitectura. El objetivo es entregar los resultados deseados y adherirse a los principios, estándares y planes de itinerario relevantes.",
    reference: "§3.13 Architecture Governance",
    category: TermCategory.DEFINITIONS,
    domain: "Governance"
  },
  {
    id: "14",
    english: "Architecture Landscape",
    spanish: "Panorama de Arquitectura",
    englishDefinition: "The architectural representation of assets in use, or planned, by the enterprise at particular points in time.",
    spanishDefinition: "La representación arquitectónica de activos en uso, o planificados por la empresa en puntos particulares en el tiempo.",
    reference: "§3.14 Architecture Landscape",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "15",
    english: "Architecture Model",
    spanish: "Modelo de Arquitectura",
    englishDefinition: "A representation of a subject of interest.",
    spanishDefinition: "Una representación de un tema de interés.",
    reference: "§3.15 Architecture Model",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "16",
    english: "Architecture Principle",
    spanish: "Principio de Arquitectura",
    englishDefinition: "A qualitative statement of intent that should be met by the architecture.",
    spanishDefinition: "Una declaración cualitativa de intención que debe ser cumplida por la arquitectura.",
    reference: "§3.16 Architecture Principle",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "17",
    english: "Architecture View",
    spanish: "Vista de Arquitectura",
    englishDefinition: "A representation of a system from the perspective of a related set of concerns.",
    spanishDefinition: "Una representación de un sistema desde la perspectiva de un conjunto relacionado de preocupaciones.",
    reference: "§3.17 Architecture View",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "18",
    english: "Architecture Viewpoint",
    spanish: "Punto de Vista de la Arquitectura",
    englishDefinition: "A specification of the conventions for a particular kind of architecture view.",
    spanishDefinition: "Una especificación de las convenciones para un tipo particular de vista de arquitectura.",
    reference: "§3.18 Architecture Viewpoint",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "19",
    english: "Architecture Vision",
    spanish: "Visión de Arquitectura",
    englishDefinition: "A succinct description of the Target Architecture that describes its business value and the changes to the enterprise that will result from its successful deployment. It serves as an aspirational vision and a boundary for detailed architecture development.",
    spanishDefinition: "Una descripción sucinta de la arquitectura de destino que describe su valor de negocio y los cambios en la empresa que resultarán de su despliegue exitoso. Sirve como una visión aspiracional y un límite para el desarrollo detallado de la arquitectura.",
    reference: "§3.19 Architecture Vision",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "20",
    english: "Artifact",
    spanish: "Artefacto",
    englishDefinition: "An architectural work product that describes an aspect of the architecture.",
    spanishDefinition: "Un producto de trabajo arquitectónico que describe un aspecto de la arquitectura.",
    reference: "§3.20 Artifact",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "21",
    english: "Baseline",
    spanish: "Línea Base",
    englishDefinition: "A specification that has been formally reviewed and agreed upon, that thereafter serves as the basis for further development or change and that can be changed only through formal change control procedures or a type of procedure such as configuration management.",
    spanishDefinition: "Una especificación que ha sido formalmente revisada y acordada, que a partir de entonces sirve como base para un mayor desarrollo o cambio y que solo puede modificarse mediante procedimientos formales de control de cambios o un tipo de procedimiento, tal como gestión de la configuración.",
    reference: "§3.21 Baseline",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "22",
    english: "Boundaryless Information Flow™",
    spanish: "Flujo de Información sin Fronteras™",
    englishDefinition: "A shorthand representation of 'access to integrated information to support business process improvements' representing a desired state of an enterprise’s infrastructure specific to the business needs of the organization.",
    spanishDefinition: "Una representación abreviada de 'acceso a información integrada para soportar las mejoras de procesos de negocios' que representa un estado deseado de la infraestructura de una empresa, específico para las necesidades de negocio de la organización.",
    reference: "§3.22 Boundaryless Information Flow",
    category: TermCategory.DEFINITIONS,
    domain: "Technology"
  },
  {
    id: "23",
    english: "Building Block",
    spanish: "Bloque de Construcción",
    englishDefinition: "A (potentially re-usable) component of enterprise capability that can be combined with other building blocks to deliver architectures and solutions.",
    spanishDefinition: "Un componente (potencialmente reutilizable) de la capacidad de la empresa que se puede combinar con otros bloques de construcción para entregar arquitecturas y soluciones.",
    reference: "§3.23 Building Block",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "24",
    english: "Business Architecture",
    spanish: "Arquitectura de Negocio",
    englishDefinition: "A representation of holistic, multi-dimensional business views of: capabilities, end-to-end value delivery, information, and organizational structure; and the relationships among these business views and strategies, products, policies, initiatives, and stakeholders.",
    spanishDefinition: "Una representación de visiones empresariales holísticas y multidimensionales de: capacidades, entrega de valor de extremo a extremo, información y estructura organizacional; y las relaciones entre estas vistas de negocio y estrategias, productos, políticas, iniciativas y partes interesadas.",
    reference: "§3.24 Business Architecture",
    category: TermCategory.DEFINITIONS,
    domain: "Business"
  },
  {
    id: "25",
    english: "Business Capability",
    spanish: "Capacidad de Negocio",
    englishDefinition: "A particular ability that a business may possess or exchange to achieve a specific purpose.",
    spanishDefinition: "Una habilidad particular que una empresa puede poseer o intercambiar para lograr un propósito específico.",
    reference: "§3.25 Business Capability",
    category: TermCategory.DEFINITIONS,
    domain: "Business"
  },
  {
    id: "26",
    english: "Business Function",
    spanish: "Función de Negocio",
    englishDefinition: "Delivers business capabilities closely aligned to an organization, but not necessarily explicitly governed by the organization.",
    spanishDefinition: "Entrega capacidades comerciales estrechamente alineadas con una organización, pero no necesariamente gobernadas explícitamente por la organización.",
    reference: "§3.26 Business Function",
    category: TermCategory.DEFINITIONS,
    domain: "Business"
  },
  {
    id: "27",
    english: "Business Governance",
    spanish: "Gobierno del Negocio",
    englishDefinition: "Concerned with ensuring that the business processes and policies (and their operation) deliver the business outcomes and adhere to relevant business regulation.",
    spanishDefinition: "Concerniente a asegurar que los procesos y las políticas de negocio (y su operación) entreguen los resultados del negocio y se adhieran a la regulación relevante del negocio.",
    reference: "§3.27 Business Governance",
    category: TermCategory.DEFINITIONS,
    domain: "Governance"
  },
  {
    id: "28",
    english: "Business Model",
    spanish: "Modelo de Negocio",
    englishDefinition: "A model describing the rationale for how an enterprise creates, delivers, and captures value.",
    spanishDefinition: "Un modelo que describe la lógica de cómo una empresa crea, entrega y captura valor.",
    reference: "§3.28 Business Model",
    category: TermCategory.DEFINITIONS,
    domain: "Business"
  },
  {
    id: "29",
    english: "Business Service",
    spanish: "Servicio de Negocio",
    englishDefinition: "Supports business capabilities through an explicitly defined interface and is explicitly governed by an organization.",
    spanishDefinition: "Suporta capacidades de negocio a través de una interfaz explícitamente definida y está gobernado explícitamente por una organización.",
    reference: "§3.29 Business Service",
    category: TermCategory.DEFINITIONS,
    domain: "Business"
  },
  {
    id: "30",
    english: "Capability",
    spanish: "Capacidad",
    englishDefinition: "An ability that an organization, person, or system possesses.",
    spanishDefinition: "Una habilidad que posee una organización, persona o sistema.",
    reference: "§3.30 Capability",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "31",
    english: "Capability Architecture",
    spanish: "Arquitectura de Capacidad",
    englishDefinition: "A highly detailed description of the architectural approach to realize a particular solution or solution aspect.",
    spanishDefinition: "Una descripción muy detallada del enfoque arquitectónico para realizar una solución o aspecto de solución en particular.",
    reference: "§3.31 Capability Architecture",
    category: TermCategory.DEFINITIONS,
    domain: "Governance"
  },
  {
    id: "32",
    english: "Capability Increment",
    spanish: "Incremento de Capacidad",
    englishDefinition: "A discrete portion of a capability architecture that delivers specific value. When all increments have been completed, the capability has been realized.",
    spanishDefinition: "Una porción discreta de una arquitectura de capacidad que ofrece un valor específico. Cuando todos los incrementos se han completado, la capacidad se ha realizado.",
    reference: "§3.32 Capability Increment",
    category: TermCategory.DEFINITIONS,
    domain: "Governance"
  },
  {
    id: "33",
    english: "Communications and Stakeholder Management",
    spanish: "Comunicaciones y Gestión de Interesados",
    englishDefinition: "The management of needs of stakeholders of the Enterprise Architecture practice. It also manages the execution of communication between the practice and the stakeholders and the practice and the consumers of its services.",
    spanishDefinition: "La gestión de las necesidades de los interesados de la práctica de Arquitectura Empresarial. También gestiona la ejecución de la comunicación entre la práctica y los interesados y la práctica y los consumidores de sus servicios.",
    reference: "§3.33 Communications and Stakeholder Management",
    category: TermCategory.DEFINITIONS,
    domain: "Governance"
  },
  {
    id: "34",
    english: "Concern",
    spanish: "Preocupación",
    englishDefinition: "An interest in a system relevant to one or more of its stakeholders.",
    spanishDefinition: "Un interés en un sistema relevante para uno o más de sus interesados.",
    reference: "§3.34 Concern",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "35",
    english: "Course of Action",
    spanish: "Curso de Acción",
    englishDefinition: "Direction and focus provided by strategic goals and objectives, often to deliver the value proposition characterized in the business model.",
    spanishDefinition: "Dirección y enfoque proporcionados por las metas y objetivos estratégicos, a menudo para entregar la propuesta de valor caracterizada en el modelo de negocio.",
    reference: "§3.35 Course of Action",
    category: TermCategory.DEFINITIONS,
    domain: "Business"
  },
  {
    id: "36",
    english: "Data Architecture",
    spanish: "Arquitectura de Datos",
    englishDefinition: "A description of the structure and interaction of the enterprise’s major types and sources of data, logical data assets, physical data assets, and data management resources.",
    spanishDefinition: "Una descripción de la estructura y la interacción de los principales tipos y fuentes de datos de la empresa, activos de datos lógicos, activos de datos físicos y recursos de gestión de datos.",
    reference: "§3.36 Data Architecture",
    category: TermCategory.DEFINITIONS,
    domain: "Data"
  },
  {
    id: "37",
    english: "Deliverable",
    spanish: "Entregable",
    englishDefinition: "An architectural work product that is contractually specified and in turn formally reviewed, agreed, and signed off by the stakeholders.",
    spanishDefinition: "Un producto de trabajo de arquitectura que es especificado contractualmente y, a su vez, formalmente revisado, acordado y firmado por las partes interesadas.",
    reference: "§3.37 Deliverable",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "38",
    english: "Enterprise",
    spanish: "Empresa",
    englishDefinition: "The highest level (typically) of description of an organization and typically covers all missions and functions. An enterprise will often span multiple organizations.",
    spanishDefinition: "El nivel más alto (típicamente) de descripción de una organización y tipicamente cubre todas las misiones y funciones. Una empresa a menudo abarca múltiples organizaciones.",
    reference: "§3.38 Enterprise",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "39",
    english: "Enterprise Continuum",
    spanish: "Continuum Empresarial",
    englishDefinition: "A categorization mechanism useful for classifying architecture and solution artifacts, both internal and external to the Architecture Repository, as they evolve from generic Foundation Architectures to Organization-Specific Architectures.",
    spanishDefinition: "Un mecanismo de categorización útil para clasificar artefactos de arquitectura y solución, tanto internos como externos al Repositorio de Arquitectura, a medida que evolucionan de Arquitecturas Fundamentales genéricas a Arquitecturas Específicas de la Organización.",
    reference: "§3.39 Enterprise Continuum",
    category: TermCategory.DEFINITIONS,
    domain: "Governance"
  },
  {
    id: "40",
    english: "Foundation Architecture",
    spanish: "Arquitectura de Fundamento",
    englishDefinition: "Generic building blocks, their inter-relationships with other building blocks, combined with the principles and guidelines that provide a foundation on which more specific architectures can be built.",
    spanishDefinition: "Los bloques de construcción genéricos, sus interrelaciones con otros bloques de construcción, combinados con los principios y directrices que proporcionan una base sobre la cual se pueden construir arquitecturas más específicas.",
    reference: "§3.40 Foundation Architecture",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "41",
    english: "Framework",
    spanish: "Marco de referencia",
    englishDefinition: "A structure for content or process that can be used as a tool to structure thinking, assuring consistency and completeness.",
    spanishDefinition: "Una estructura para el contenido o proceso que puede usarse como una herramienta para estructurar el pensamiento, asegurando consistencia y completitud.",
    reference: "§3.41 Framework",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "42",
    english: "Gap",
    spanish: "Brecha",
    englishDefinition: "A statement of difference between two states. Used in the context of gap analysis, where the difference between the Baseline and Target Architecture is identified.",
    spanishDefinition: "Una declaración de diferencia entre dos estados. Se utiliza en el contexto del análisis de brechas, donde se identifica la diferencia entre la línea de base y la arquitectura de destino.",
    reference: "§3.42 Gap",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "43",
    english: "Governance",
    spanish: "Gobierno",
    englishDefinition: "The discipline of monitoring, managing, and steering a business (or IS/IT landscape) to deliver the business outcome required.",
    spanishDefinition: "La disciplina de supervisar, gestionar y dirigir un negocio (o el entorno de SI / TI) para ofrecer el resultado de negocio requerido.",
    reference: "§3.43 Governance",
    category: TermCategory.DEFINITIONS,
    domain: "Governance"
  },
  {
    id: "44",
    english: "Information",
    spanish: "Información",
    englishDefinition: "Any communication or representation of facts, data, or opinions, in any medium or form, including textual, numerical, graphic, cartographic, narrative, or audio-visual forms.",
    spanishDefinition: "Cualquier comunicación o representación de hechos, datos u opiniones, en cualquier medio o forma, incluyendo formas textuales, numéricas, gráficas, cartográficas, narrativas o audiovisuales.",
    reference: "§3.44 Information",
    category: TermCategory.DEFINITIONS,
    domain: "Data"
  },
  {
    id: "45",
    english: "Information System Service",
    spanish: "Servicio de sistema de información",
    englishDefinition: "1. A discrete behavior requestable from an application (e.g., log in, book train seat, transfer money). 2. The automated elements of a business service.",
    spanishDefinition: "1. Un comportamiento discreto que se puede solicitar desde una aplicación (por ejemplo, iniciar sesión, reservar asiento en el tren, transferir dinero). 2. Los elementos automatizados de un servicio comercial.",
    reference: "§3.45 Information System Service",
    category: TermCategory.DEFINITIONS,
    domain: "Application"
  },
  {
    id: "46",
    english: "Information Technology (IT)",
    spanish: "Tecnología de la Información (TI)",
    englishDefinition: "1. The lifecycle management of information and related technology used by an organization. 2. An umbrella term that includes all or some of the subject areas relating to the computer industry (Business Continuity, Hardware, Software, Security, etc.).",
    spanishDefinition: "1. La gestión del ciclo de vida de la información y la tecnología relacionada utilizada por una organización. 2. Un término sombrilla que incluye todas o algunas de las áreas temáticas relacionadas con la industria informática (Continuidad del Negocio, Hardware, Software, Seguridad, etc.).",
    reference: "§3.46 Information Technology (IT)",
    category: TermCategory.DEFINITIONS,
    domain: "Technology"
  },
  {
    id: "47",
    english: "Interoperability",
    spanish: "Interoperabilidad",
    englishDefinition: "1. The ability to share information and services. 2. The ability of two or more systems or components to exchange and use information. 3. The ability of systems to provide and receive services from other systems.",
    spanishDefinition: "1. La capacidad de compartir información y servicios. 2. La capacidad de dos o más sistemas o componentes para intercambiar y usar información. 3. La capacidad de los sistemas de proporcionar y recibir servicios de otros sistemas.",
    reference: "§3.47 Interoperability",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "48",
    english: "Logical",
    spanish: "Lógico",
    englishDefinition: "An implementation-independent definition of the architecture, often grouping related physical entities according to their purpose and structure.",
    spanishDefinition: "Una definición de la arquitectura independiente de la implementación, a menudo agrupando entidades físicas relacionadas de acuerdo con su propósito y estructura.",
    reference: "§3.48 Logical",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "49",
    english: "Metadata",
    spanish: "Metadata",
    englishDefinition: "Data about data, of any sort in any media, that describes the characteristics of an entity.",
    spanishDefinition: "Datos sobre los datos, de cualquier tipo en cualquier medio, que describen las características de una entidad.",
    reference: "§3.49 Metadata",
    category: TermCategory.DEFINITIONS,
    domain: "Data"
  },
  {
    id: "50",
    english: "Metamodel",
    spanish: "Metamodelo",
    englishDefinition: "A model that describes how and with what the architecture will be described in a structured way.",
    spanishDefinition: "Un modelo que describe cómo y con qué se describirá la arquitectura de una manera estructurada.",
    reference: "§3.50 Metamodel",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "51",
    english: "Method",
    spanish: "Método",
    englishDefinition: "A defined, repeatable approach to address a particular type of problem.",
    spanishDefinition: "Un enfoque definido y repetible para abordar un tipo particular de problema.",
    reference: "§3.51 Method",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "52",
    english: "Modeling",
    spanish: "Modelado",
    englishDefinition: "A technique through construction of models which enables a subject to be represented in a form that enables reasoning, insight, and clarity concerning the essence of the subject matter.",
    spanishDefinition: "Una técnica a través de la construcción de modelos que permite que un tema sea representado en una forma que permita el razonamiento, el discernimiento y la claridad con respecto a la esencia del tema.",
    reference: "§3.52 Modeling",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "53",
    english: "Model Kind",
    spanish: "Modelo tipo",
    englishDefinition: "Conventions for a type of modeling.",
    spanishDefinition: "Convenciones para un tipo de modelado.",
    reference: "§3.53 Model Kind",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "54",
    english: "Objective",
    spanish: "Objetivo",
    englishDefinition: "A time-bounded milestone for an organization used to demonstrate progress towards a goal; for example, 'Increase capacity utilization by 30% by the end of 2019 to support the planned increase in market share'.",
    spanishDefinition: "Un hito limitado en el tiempo para una organización utilizado para demostrar el progreso hacia una meta; por ejemplo, 'Aumentar la utilización de la capacidad en un 30% para finales de 2019 para respaldar el aumento previsto en la participación del mercado'.",
    reference: "§3.54 Objective",
    category: TermCategory.DEFINITIONS,
    domain: "Business"
  },
  {
    id: "55",
    english: "Organization Map",
    spanish: "Mapa de la Organización",
    englishDefinition: "An articulation of the relationships between the primary entities that make up the enterprise, its partners, and stakeholders.",
    spanishDefinition: "Una articulación de las relaciones entre las entidades principales que componen la empresa, sus socios e interesados.",
    reference: "§3.55 Organization Map",
    category: TermCategory.DEFINITIONS,
    domain: "Business"
  },
  {
    id: "56",
    english: "Pattern",
    spanish: "Patrón",
    englishDefinition: "A technique for putting building blocks into context; for example, to describe a re-usable solution to a problem.",
    spanishDefinition: "Una técnica para contextualizar los bloques de construcción; por ejemplo, para describir una solución reutilizable para un problema.",
    reference: "§3.56 Patterns",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "57",
    english: "Physical",
    spanish: "Físico",
    englishDefinition: "A description of a real-world entity. Physical elements in an Enterprise Architecture may still be considerably abstracted from Solution Architecture, design, or implementation views.",
    spanishDefinition: "Una descripción de una entidad del mundo real. Los elementos físicos en una Arquitectura Empresarial aún pueden abstraerse considerablemente de la Arquitectura de la Solución, el diseño o las vistas de implementación.",
    reference: "§3.57 Physical",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "58",
    english: "Reference Model (RM)",
    spanish: "Modelo de referencia (MR)",
    englishDefinition: "An abstract framework for understanding significant relationships among the entities of [an] environment, and for the development of consistent standards or specifications supporting that environment.",
    spanishDefinition: "Un marco de referencia abstracto para comprender las relaciones significativas entre las entidades de [un] entorno, y para el desarrollo de estándares consistentes o especificaciones que soporten ese entorno.",
    reference: "§3.59 Reference Model (RM)",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "59",
    english: "Repository",
    spanish: "Repositorio",
    englishDefinition: "A system that manages all of the data of an enterprise, including data and process models and other enterprise information.",
    spanishDefinition: "Un sistema que gestiona todos los datos de una empresa, incluidos los modelos de datos y procesos y otra información empresarial.",
    reference: "§3.60 Repository",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "60",
    english: "Requirement",
    spanish: "Requerimiento",
    englishDefinition: "A statement of need that must be met by a particular architecture or work package.",
    spanishDefinition: "Una declaración de necesidad que debe cumplir una arquitectura o paquete de trabajo particular.",
    reference: "§3.61 Requirement",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "61",
    english: "Roadmap",
    spanish: "Mapa de Ruta",
    englishDefinition: "An abstracted plan for business or technology change, typically operating across multiple disciplines over multiple years. Normally used in the phrases Technology Roadmap, Architecture Roadmap, etc.",
    spanishDefinition: "Un plan abstracto para el cambio de negocio o tecnológico, que generalmente opera a través de múltiples disciplinas durante varios años. Normalmente se usa en las frases Mapa de Ruta de Tecnología, Mapa de Ruta de Arquitectura, etc.",
    reference: "§3.62 Roadmap",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "62",
    english: "Role",
    spanish: "Rol",
    englishDefinition: "1. The usual or expected function of an actor, or the part somebody or something plays in a particular action or event. An actor may have a number of roles. 2. The part an individual plays in an organization and the contribution they make through the application of their skills, knowledge, experience, and abilities.",
    spanishDefinition: "1. La función habitual o esperada de un actor, o la parte que alguien o algo desempeña en una acción o evento en particular. Un actor puede tener varios roles. 2. La parte que un individuo desempeña en una organización y la contribución que hacen a través de la aplicación de sus habilidades, conocimientos, experiencia y capacidades.",
    reference: "§3.63 Role",
    category: TermCategory.DEFINITIONS,
    domain: "Business"
  },
  {
    id: "63",
    english: "Segment Architecture",
    spanish: "Arquitectura de Segmento",
    englishDefinition: "A detailed, formal description of areas within an enterprise, used at the program or portfolio level to organize and align change activity.",
    spanishDefinition: "Una descripción formal y detallada de las áreas dentro de una empresa, utilizada a nivel de programa o portafolio para organizar y alinear la actividad de cambio.",
    reference: "§3.64 Segment Architecture",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "64",
    english: "Service",
    spanish: "Servicio",
    englishDefinition: "1. A repeatable activity; a discrete behavior that a building block may be requested or otherwise triggered to perform. 2. An element of behavior that provides specific functionality in response to requests from actors or other services.",
    spanishDefinition: "1. Una actividad repetible; un comportamiento discreto que puede solicitar o activar un bloque de construcción. 2. Un elemento de comportamiento que proporciona funcionalidad específica en respuesta a solicitudes de actores u otros servicios.",
    reference: "§3.65 Service",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "65",
    english: "Service Oriented Architecture (SOA)",
    spanish: "Arquitectura Orientada a Servicios (SOA)",
    englishDefinition: "An architectural style that supports service orientation.",
    spanishDefinition: "Un estilo arquitectónico que soporta la orientación al servicio.",
    reference: "§3.67 Service Oriented Architecture (SOA)",
    category: TermCategory.DEFINITIONS,
    domain: "Application"
  },
  {
    id: "66",
    english: "Stakeholder",
    spanish: "Interesado",
    englishDefinition: "An individual, team, or organization, or class thereof, having an interest in a system.",
    spanishDefinition: "Un individuo, equipo o organización, o clase de ellos, que tiene un interés en un sistema.",
    reference: "§3.72 Stakeholder",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "67",
    english: "Target Architecture",
    spanish: "Arquitectura de Destino",
    englishDefinition: "The description of a future state of the architecture being developed for an organization.",
    spanishDefinition: "La descripción de un estado futuro de la arquitectura que se está desarrollando para una organización.",
    reference: "§3.75 Target Architecture",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "68",
    english: "Technology Architecture",
    spanish: "Arquitectura de Tecnología",
    englishDefinition: "A description of the structure and interaction of the technology services, and technology components.",
    spanishDefinition: "Una descripción de la estructura y la interacción de los servicios tecnológicos y los componentes tecnológicos.",
    reference: "§3.77 Technology Architecture",
    category: TermCategory.DEFINITIONS,
    domain: "Technology"
  },
  {
    id: "69",
    english: "Value Stream",
    spanish: "Flujo de Valor",
    englishDefinition: "A representation of an end-to-end collection of value-adding activities that create an overall result for a customer, stakeholder, or end user.",
    spanishDefinition: "Una representación de una colección de actividades de valor agregado de extremo a extremo que crean un resultado global para un cliente, interesado o usuario final.",
    reference: "§3.81 Value Stream",
    category: TermCategory.DEFINITIONS,
    domain: "Business"
  },
  {
    id: "70",
    english: "Viewpoint",
    spanish: "Punto de Vista",
    englishDefinition: "A specification of the conventions for a particular kind of architecture view.",
    spanishDefinition: "Especificación de las convenciones para un tipo particular de vista de arquitectura.",
    reference: "§3.83 Viewpoint",
    category: TermCategory.DEFINITIONS,
    domain: "General"
  },
  {
    id: "71",
    english: "Work Package",
    spanish: "Paquete de Trabajo",
    englishDefinition: "A set of actions identified to achieve one or more objectives for the business. A work package can be a part of a project, a complete project, or a program.",
    spanishDefinition: "Un conjunto de acciones identificadas para lograr uno o más objetivos para el negocio. Un paquete de trabajo puede ser parte de un proyecto, un proyecto completo o un programa.",
    reference: "§3.85 Work Package",
    category: TermCategory.DEFINITIONS,
    domain: "Governance"
  },

  // SECTION 2.2 - SUPPLEMENTARY DEFINITIONS
  {
    id: "sup1",
    english: "Application Software",
    spanish: "Software de Aplicacion",
    englishDefinition: "Software entities which have a specific business purpose.",
    spanishDefinition: "Entidades de software que tienen un propósito de negocio específico.",
    reference: "§A.1",
    category: TermCategory.SUPPLEMENTARY,
    domain: "Application"
  },
  {
    id: "sup2",
    english: "Availability",
    spanish: "Disponibilidad",
    englishDefinition: "In the context of IT systems, the probability that system functional capabilities are ready for use by a user at any time, where all time is considered, including operations, repair, administration, and logistic time.",
    spanishDefinition: "En el contexto de los sistemas de TI, la probabilidad de que las capacidades funcionales del sistema estén listas para ser utilizadas por un usuario en cualquier momento, donde se considera todo el tiempo, incluidas las operaciones, reparación, administración y tiempo de logística.",
    reference: "§A.2",
    category: TermCategory.SUPPLEMENTARY,
    domain: "Technology"
  },
  {
    id: "sup3",
    english: "Business System",
    spanish: "Sistema de Negocio",
    englishDefinition: "Hardware, software, policy statements, processes, activities, standards, and people which together implement a business function.",
    spanishDefinition: "Hardware, software, declaraciones de políticas, procesos, actividades, estándares y personas que en conjunto implementan una función de negocio.",
    reference: "§A.3",
    category: TermCategory.SUPPLEMENTARY,
    domain: "Business"
  },
  {
    id: "sup4",
    english: "Catalog",
    spanish: "Catálogo",
    englishDefinition: "A structured list of architectural outputs of a similar kind, used for reference. For example, a technology standards catalog or an application portfolio.",
    spanishDefinition: "Una lista estructurada de resultados arquitectónicos de un tipo similar, utilizado como referencia. Por ejemplo, un catálogo de estándares de tecnología o un portafolio de aplicaciones.",
    reference: "§A.4",
    category: TermCategory.SUPPLEMENTARY,
    domain: "General"
  },
  {
    id: "sup5",
    english: "Client",
    spanish: "Cliente",
    englishDefinition: "An application component which requests services from a server.",
    spanishDefinition: "Un componente de aplicación que solicita servicios de un servidor.",
    reference: "§A.5",
    category: TermCategory.SUPPLEMENTARY,
    domain: "Application"
  },
  {
    id: "sup6",
    english: "Contract",
    spanish: "Contrato",
    englishDefinition: "An agreement between a service consumer and a service provider that establishes functional and non-functional parameters for interaction.",
    spanishDefinition: "Un acuerdo entre un consumidor de servicios y un proveedor de servicios que establece parámetros funcionales y no funcionales para la interacción.",
    reference: "§A.8",
    category: TermCategory.SUPPLEMENTARY,
    domain: "Governance"
  },
  {
    id: "sup7",
    english: "Dictionary of Datos (Data Dictionary)",
    spanish: "Diccionario de Datos",
    englishDefinition: "A specialized type of database containing metadata; a repository of information describing the characteristics of data used to design, monitor, document, protect, and control data in information systems and databases.",
    spanishDefinition: "Un tipo especializado de base de datos que contiene metadatos; un repositorio de información que describe las características de los datos utilizados para diseñar, supervisar, documentar, proteger y controlar los datos en los sistemas de información y bases de datos.",
    reference: "§A.11",
    category: TermCategory.SUPPLEMENTARY,
    domain: "Data"
  },
  {
    id: "sup8",
    english: "Data Entity",
    spanish: "Entidad de Datos",
    englishDefinition: "An encapsulation of data that is recognized by a business domain expert as a thing. Logical data entities can be tied to applications, repositories, and services.",
    spanishDefinition: "Una encapsulación de datos que es reconocida por un experto en dominio de negocios como una cosa. Las entidades de datos lógicos pueden vincularse a aplicaciones, repositorios y servicios.",
    reference: "§A.13",
    category: TermCategory.SUPPLEMENTARY,
    domain: "Data"
  },
  {
    id: "sup9",
    english: "Guideline",
    spanish: "Guía / Lineamiento",
    englishDefinition: "An architectural document that provides guidance on the optimal ways to carry out design or implementation activities.",
    spanishDefinition: "Un documento arquitectónico que brinda orientación sobre las formas óptimas para llevar a cabo las actividades de diseño o implementación.",
    reference: "§A.22",
    category: TermCategory.SUPPLEMENTARY,
    domain: "General"
  },
  {
    id: "sup10",
    english: "Lifecycle",
    spanish: "Ciclo de Vida",
    englishDefinition: "The period of time that begins when a system is conceived and ends when the system is no longer available for use.",
    spanishDefinition: "El período de tiempo que comienza cuando se concibe un sistema y finaliza cuando el sistema ya no está disponible para su uso.",
    reference: "§A.30",
    category: TermCategory.SUPPLEMENTARY,
    domain: "General"
  },
  {
    id: "sup11",
    english: "Location",
    spanish: "Ubicación",
    englishDefinition: "A place where business activity takes place and can be hierarchically decomposed.",
    spanishDefinition: "Un lugar donde se lleva a cabo actividad de negocio y se puede descomponer jerárquicamente.",
    reference: "§A.31",
    category: TermCategory.SUPPLEMENTARY,
    domain: "Business"
  },
  {
    id: "sup12",
    english: "Matrix",
    spanish: "Matriz",
    englishDefinition: "A format for showing the relationship between two (or more) architectural elements in a grid format.",
    spanishDefinition: "Un formato para mostrar la relación entre dos (o más) elementos arquitectónicos en un formato de cuadrícula.",
    reference: "§A.36",
    category: TermCategory.SUPPLEMENTARY,
    domain: "General"
  },
  {
    id: "sup13",
    english: "Portability",
    spanish: "Portabilidad",
    englishDefinition: "The ease with which a system, component, data, or user can be transferred from one hardware or software environment to another.",
    spanishDefinition: "La facilidad con que un sistema, componente, dato o usuario puede transferirse de un entorno de hardware o software a otro.",
    reference: "§A.45",
    category: TermCategory.SUPPLEMENTARY,
    domain: "Technology"
  },
  {
    id: "sup14",
    english: "Risk Management",
    spanish: "Gestión de Riesgos",
    englishDefinition: "The management of risks and issues that may threaten the success of the Enterprise Architecture practice and its ability to meet its vision, goals, and objectives.",
    spanishDefinition: "La gestión de riesgos y problemas que pueden amenazar el éxito de la práctica de Arquitectura Empresarial y su capacidad de cumplir su visión, metas y objetivos, y su prestación de servicios.",
    reference: "§A.54",
    category: TermCategory.SUPPLEMENTARY,
    domain: "Governance"
  },
  {
    id: "sup15",
    english: "Scalability",
    spanish: "Escalabilidad",
    englishDefinition: "The ability to use the same application software on many different classes of hardware/software platforms. The capability to grow to accommodate increased work loads.",
    spanishDefinition: "La capacidad de utilizar el mismo software de aplicación en muchas clases diferentes de plataformas de hardware / software. La capacidad de crecer para acomodar mayores cargas de trabajo.",
    reference: "§A.55",
    category: TermCategory.SUPPLEMENTARY,
    domain: "Technology"
  },

  // SECTION 2.3 - ABBREVIATIONS
  {
    id: "abb1",
    english: "ABB",
    spanish: "ABB",
    englishDefinition: "Architecture Building Block",
    spanishDefinition: "Bloque de Construcción de Arquitectura",
    reference: "Section 2.3",
    category: TermCategory.ABBREVIATIONS,
    domain: "General"
  },
  {
    id: "abb2",
    english: "ACMM",
    spanish: "ACMM",
    englishDefinition: "Architecture Capability Maturity Model",
    spanishDefinition: "Modelo de Madurez de la Capacidad de Arquitectura",
    reference: "Section 2.3",
    category: TermCategory.ABBREVIATIONS,
    domain: "Governance"
  },
  {
    id: "abb3",
    english: "ADM",
    spanish: "ADM",
    englishDefinition: "Architecture Development Method",
    spanishDefinition: "Método de Desarrollo de Arquitectura (Núcleo de TOGAF)",
    reference: "Section 2.3",
    category: TermCategory.ABBREVIATIONS,
    domain: "Governance"
  },
  {
    id: "abb4",
    english: "API",
    spanish: "API",
    englishDefinition: "Application Platform Interface (also Application Programming Interface)",
    spanishDefinition: "Interfaz de Plataforma de Aplicaciones",
    reference: "Section 2.3",
    category: TermCategory.ABBREVIATIONS,
    domain: "Technology"
  },
  {
    id: "abb5",
    english: "BMM",
    spanish: "BMM",
    englishDefinition: "Business Motivation Model",
    spanishDefinition: "Modelo de Motivación del Negocio",
    reference: "Section 2.3",
    category: TermCategory.ABBREVIATIONS,
    domain: "Business"
  },
  {
    id: "abb6",
    english: "COTS",
    spanish: "COTS",
    englishDefinition: "Commercial Off-The-Shelf applications",
    spanishDefinition: "Aplicaciones comerciales estándar listas para usar / fuera de plataformas comerciales",
    reference: "Section 2.3",
    category: TermCategory.ABBREVIATIONS,
    domain: "Application"
  },
  {
    id: "abb7",
    english: "KPI",
    spanish: "KPI",
    englishDefinition: "Key Performance Indicator",
    spanishDefinition: "Indicador Clave de Desempeño",
    reference: "Section 2.3",
    category: TermCategory.ABBREVIATIONS,
    domain: "Governance"
  },
  {
    id: "abb8",
    english: "SBB",
    spanish: "SBB",
    englishDefinition: "Solution Building Block",
    spanishDefinition: "Bloque de Construcción de Solución",
    reference: "Section 2.3",
    category: TermCategory.ABBREVIATIONS,
    domain: "General"
  },
  {
    id: "abb9",
    english: "SOA",
    spanish: "SOA",
    englishDefinition: "Service-Oriented Architecture",
    spanishDefinition: "Arquitectura Orientada a Servicios",
    reference: "Section 2.3",
    category: TermCategory.ABBREVIATIONS,
    domain: "Application"
  },

  // APPENDIX A - EXTENDED GLOSSARY
  {
    id: "ext1",
    english: "Architecture Board",
    spanish: "Consejo de Arquitectura",
    englishDefinition: "A key element in a successful Architecture Governance strategy is a cross-organization Architecture Board to oversee the implementation of the strategy.",
    spanishDefinition: "Un elemento clave en una estrategia exitosa de Gobierno de la Arquitectura es un Consejo de Arquitectura multi-organizaciones para supervisar la implementación de la estrategia.",
    reference: "§41.1",
    category: TermCategory.EXTENDED,
    domain: "Governance"
  },
  {
    id: "ext2",
    english: "As-Is Architecture",
    spanish: "Arquitectura Actual",
    englishDefinition: "The description of the current state of the architecture (enterprise or solution) being studied or developed for an organization.",
    spanishDefinition: "La descripción del estado actual de la arquitectura (empresa o solución) que se estudia o desarrolla para una organización.",
    reference: "§3.21 Baseline",
    category: TermCategory.EXTENDED,
    domain: "General"
  },
  {
    id: "ext3",
    english: "To-Be Architecture",
    spanish: "Arquitectura Futura",
    englishDefinition: "The description of a future state (or target) of the architecture (enterprise or solution) being developed for an organization.",
    spanishDefinition: "La descripción de un estado futuro (o destino) de la arquitectura (empresa o solución) que se está desarrollando para una organización.",
    reference: "§3.75 Target",
    category: TermCategory.EXTENDED,
    domain: "General"
  },
  {
    id: "ext4",
    english: "Business Goal",
    spanish: "Meta (de Negocio)",
    englishDefinition: "A high-level statement of intent or direction for an organization. Typically used to measure success of an organization.",
    spanishDefinition: "Una declaración de intención o dirección de alto nivel para una organización. Normalmente se usa para medir el éxito de una organización.",
    reference: "§32.2.9",
    category: TermCategory.EXTENDED,
    domain: "Business"
  },
  {
    id: "ext5",
    english: "Business Objective",
    spanish: "Objetivo (de Negocio)",
    englishDefinition: "A time-bound milestone for an organization used to demonstrate progress towards a goal.",
    spanishDefinition: "Un hito de duración determinada para una organización utilizada para demostrar el progreso hacia un objetivo.",
    reference: "§12.1",
    category: TermCategory.EXTENDED,
    domain: "Business"
  }
];
