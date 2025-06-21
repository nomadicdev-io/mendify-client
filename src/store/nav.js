const { LayoutDashboard, BellRing, MessagesSquare, Mail, NotepadText, FolderOpenDot, CalendarDays, Building, Users, MapPinned, IdCardLanyard, GlobeLock, CircleUser, Settings, Key, FileText, IdCard, CreditCard } = require("lucide-react");

export const sidebarNav = [
    {
        label: "Manage",
        items: [
            {
                id: 'nav-01',
                label: "Dashboard",
                href: "/admin",
                icon: <LayoutDashboard />
            },
            {
                id: 'nav-03',
                label: "Work Orders",
                href: "/admin/work-orders",
                icon: <FolderOpenDot />
            },
            {
                id: 'nav-04',
                label: "Schedules",
                href: "/admin/schedules",
                icon: <CalendarDays />
            },
            // {
            //     id: 'nav-04',
            //     label: "Quotations",
            //     href: "/admin/quotations",
            //     icon: <LayoutDashboard />
            // },
            {
                id: 'nav-05',
                label: "Clients",
                href: "/admin/clients",
                icon: <Building />
            },
            {
                id: 'nav-06',
                label: "Teams",
                href: "/admin/teams",
                icon: <Users />
            },
            {
                id: 'nav-11',
                label: "Tracking",
                href: "/admin/tracking",
                icon: <MapPinned />
            },

        ]
    },
    {
        label: "Application",
        items: [
            {
                id: 'nav-21',
                label: "Notifications",
                href: "/admin/notifications",
                icon: <BellRing />
            },
            {
                id: 'nav-22',
                label: "Chats",
                href: "/admin/chats",
                icon: <MessagesSquare />
            },
            {
                id: 'nav-23',
                label: "Enquiries",
                href: "/admin/enquiries",
                icon: <NotepadText />
            }
        ]
    },
    {
        label: "System",
        items: [
            {
                id: 'nav-08',
                label: "Employees",
                href: "/admin/employees",
                icon: <IdCard />
            },
            {
                id: 'nav-09',
                label: "Auth",
                href: "/admin/manage-auth",
                icon: <GlobeLock />
            },
            {   
                id: 'nav-10',
                label: "Account",
                href: "/admin/account",
                icon: <CircleUser />
            },
            {
                id: 'nav-12',
                label: "API Keys",
                href: "/admin/api-keys",
                icon: <Key />
            },
            {
                id: 'nav-13',
                label: "Docs",
                href: "/admin/docs",
                icon: <FileText />
            },
            {
                id: 'nav-14',
                label: "Payment",
                href: "/admin/payment",
                icon: <CreditCard />
            },
            {
                id: 'nav-11',
                label: "Settings",
                href: "/admin/settings",
                icon: <Settings />
            },
        ]
    }
]   
