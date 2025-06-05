const SidebarData = [
    // {
    //     label: "Menu",
    //     isMainMenu: true,
    // },
    {
        label: "Dashboard",
        icon: "mdi mdi-home-variant-outline",
        url: "/dashboard",
        issubMenubadge: true,
        bgcolor: "bg-primary",
        badgeValue: "3"
    },
    {
        label: "Components",
        isMainMenu: true,
    },
     {
        label: "Form Files",
        icon: "ri-eraser-fill",
        issubMenubadge: true,
        bgcolor: "bg-danger",
        badgeValue: "8",
        subItem: [
            // { sublabel: "Add ", link: "/add-users" },
            { sublabel: "List", link: "/getall-form" },
        ],
    },
    {
        label: "Users",
        icon: "ri-bar-chart-line",
        issubMenubadge: true,
        bgcolor: "bg-danger",
        badgeValue: "8",
        subItem: [
            { sublabel: "Add ", link: "/add-users" },
            { sublabel: "List", link: "/getall-users" },
        ],
    },
    {
        label: "Task",
        icon: "ri-table-2",
        subItem: [
            // { sublabel: "Add", link: "/add-category" },
            { sublabel: "List", link: "/list-task" }
        
        ],
    },
    // {
    //     label: "Add Measurement",
    //     icon: "ri-bar-chart-line",
    //     subItem: [
    //         { sublabel: "Add", link: "/add-measurement" },
    //         { sublabel: "List", link: "/list-measurement" }
        
    //     ],
    // },
    
  
    // {
    //     label: "Orders",
    //     icon: "ri-table-2",
    //     subItem: [
    //         // { sublabel: "Add", link: "/add-videos" },
    //         { sublabel: "List", link: "/list-orders" },
    //     ],
    // },
    // {
    //     label: "Study Material",
    //     icon: "ri-brush-line",
    //     subItem: [
    //         { sublabel: "Add", link: "/add-study-material" },
    //         { sublabel: "List", link: "/list-study-material" },
    //     ],
    // },
    // {
    //     label: "Banner",
    //     icon: "ri-table-2",
    //     subItem: [
    //         { sublabel: "Add", link: "/add-banner" },
    //         { sublabel: "List", link: "/list-banner" },
    //     ],
    // },
    // {
    //     label: "Icons",
    //     icon: "ri-brush-line",
    //     subItem: [
    //         { sublabel: "Box Icons", link: "/icon-boxicon" },
    //         { sublabel: "Material Design", link: "/icons-materialdesign" },
    //         { sublabel: "Dripicons", link: "/icon-dripicons" },
    //         { sublabel: "Font Awesome", link: "/icons-fontawesome" },
    //     ],
    // },
    // {
    //     label: "Maps",
    //     icon: "ri-map-pin-line",
    //     subItem: [
    //         { sublabel: "Google Maps", link: "/maps-google" },
    //         { sublabel: "Vector Maps", link: "/maps-vector" },
    //     ],
    // },
    // {
    //     label: "Multi Level",
    //     icon: "ri-share-line",
    //     subItem: [
    //         { sublabel: "Level 1.1", link: "/#" },
    //         {
    //             sublabel: "Level 1.2", link: "/#",
    //             subMenu: [
    //                 { title: "Level 2.1" },
    //                 { title: "Level 2.2" },
    //             ],
    //         },
    //     ],
    // },
]
export default SidebarData;