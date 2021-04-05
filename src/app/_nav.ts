import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer",
  },
  {
    title: true,
    name: "Formularios",
  },
  {
    name: "Departamentos",
    url: "/departamentos",
    icon: "cil-map",
  },
  {
    name: "Aumento megas",
    url: "/aumento-megas",
    icon: "cil-sort-ascending",
  },
  {
    name: "Cambio plan",
    url: "/solicitud-servicios",
    icon: "cil-sync",
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
  },
  {
    divider: true,
  },
  {
    title: true,
    name: "Usuarios",
  },
  {
    name: "Lista de Usuarios",
    url: "/usuarios",
    icon: "cil-face",
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
