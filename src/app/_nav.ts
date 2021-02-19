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
    name: "Productos",
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
    name: "Estadisticas",
  },

  {
    name: "Visitas",
    url: "/base",
    icon: "cil-graph",
  },
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
    name: "confguraciones",
  },
  {
    name: "Pantallas",
    url: "/pages",
    icon: "icon-screen-smartphone",
    children: [
      {
        name: "Principal",
        url: "/theme/typography",
        icon: "icon-handbag",
      },
      {
        name: "Carrusel",
        url: "/theme/typography",
        icon: "cil-stream",
      },
    ],
  },
  // {
  //   name: "Disabled",
  //   url: "/dashboard",
  //   icon: "icon-ban",
  //   badge: {
  //     variant: "secondary",
  //     text: "NEW",
  //   },
  //   attributes: { disabled: true },
  // },
  // {
  //   name: "Download CoreUI",
  //   url: "http://coreui.io/angular/",
  //   icon: "icon-cloud-download",
  //   class: "mt-auto",
  //   variant: "success",
  //   attributes: { target: "_blank", rel: "noopener" },
  // },
  // {
  //   name: "Try CoreUI PRO",
  //   url: "http://coreui.io/pro/angular/",
  //   icon: "icon-layers",
  //   variant: "danger",
  //   attributes: { target: "_blank", rel: "noopener" },
  // },
];
