import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Inicio",
    url: "/dashboard",
    icon: "icon-speedometer",
    badge: {
      variant: "info",
      text: "NEW",
    },
  },
  {
    title: true,
    name: "Formularios de la app",
  },
  {
    name: "Departamentos",
    url: "/departamentos",
    icon: "icon-handbag",
  },
  {
    name: "Aumento megas",
    url: "/aumento-megas",
    icon: "icon-handbag",
  },
  {
    name: "Cambio plan",
    url: "/solicitud-servicios",
    icon: "icon-handbag",
  },
  {
    title: true,
    name: "Pantalla productos",
  },
  {
    name: "Categorias",
    url: "/productos",
    icon: "icon-handbag",
  },
  {
    name: "Tipos",
    url: "/productos/tipos",
    icon: "cil-stream",
  },
  {
    name: "Planes",
    url: "/productos/planes",
    icon: "icon-speedometer",
  },
  {
    title: true,
    name: "Reportes",
  },

  {
    name: "Estadistica de visitas",
    url: "/reportes",
    icon: "cil-graph",
<<<<<<< HEAD
=======
  },
  {
    divider: true,
  },

  {
    title: true,
    name: "Canales",
  },
  {
    name: "Administrador Canales",
    url: "/canales",
    icon: "icon-handbag",
>>>>>>> main
  },
  {
    divider: true,
  },

  // {
  //   title: true,
  //   name: "configuraciones",
  // },
  // {
  //   name: "Imagenes",
  //   url: "/configuracion",
  //   icon: "cil-satelite",
  //   children: [
  //     {
  //       name: "Fondos de pantalla",
  //       url: "fondos-pantalla",
  //       icon: "cil-paint-bucket",
  //     },
  //     {
  //       name: "Carrusel",
  //       url: "carrusel",
  //       icon: "cil-stream",
  //     },
  //   ],
  // },
<<<<<<< HEAD
  
=======
>>>>>>> main
  {
    title: true,
    name: "Usuarios",
  },
  {
    name: "Lista de Usuarios",
    url: "/usuarios",
    icon: "icon-handbag",
  },
  {
    divider: true,
  },
  {
    title: true,
    name: "Configuraciones",
  },
  {
    name: "Imagenes",
    url: "/configuracion",
    icon: "cil-paint-bucket",
    children: [
      {
        name: "Fondos de pantalla",
        url: "/configuracion/fondos-pantalla",
        icon: "cil-mobile",
      },
      {
        name: "Carrusel",
        url: "/configuracion/carrusel",
        icon: "cil-stream",
      },
    ],
  },
];
