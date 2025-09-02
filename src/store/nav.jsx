import { LayoutDashboard, BellRing, MessagesSquare, Mail, NotepadText, FolderOpenDot, CalendarDays, Building, Users, MapPinned, IdCardLanyard, GlobeLock, CircleUser, Settings, Key, FileText, IdCard, CreditCard, BookText, Receipt } from "lucide-react";

export const sidebarNav = [
    {
        label: "Manage",
        items: [
            {
                id: 'nav-01',
                label: "Dashboard",
                href: "/dashboard",
                icon: <LayoutDashboard />,
                exact: true
            },
            {
                id: 'nav-03',
                label: "Work Orders",
                href: "/dashboard/work-orders",
                icon: <FolderOpenDot />,
                exact: false
            },
            {
                id: 'nav-04',
                label: "Schedules",
                href: "/dashboard/schedules",
                icon: <CalendarDays />,
                exact: true
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
                href: "/dashboard/clients",
                icon: <Building />,
                exact: false
            },
            {
                id: 'nav-06',
                label: "Teams",
                href: "/dashboard/teams",
                icon: <Users />,
                exact: true
            },
            {
                id: 'nav-66',
                label: "Quotations",
                href: "/dashboard/quotations",
                icon: <BookText />,
                exact: true
            },
            {
                id: 'nav-67',
                label: "Invoices",
                href: "/dashboard/invoices",
                icon: <Receipt />,
                exact: true
            },
            {
                id: 'nav-11',
                label: "Tracking",
                href: "/dashboard/tracking",
                icon: <MapPinned />,
                exact: true
            },

        ]
    },
    {
        label: "Application",
        items: [
            {
                id: 'nav-21',
                label: "Notifications",
                href: "/dashboard/notifications",
                icon: <BellRing />,
                exact: true
            },
            {
                id: 'nav-22',
                label: "Chats",
                href: "/dashboard/chats",
                icon: <MessagesSquare />,
                exact: true
            },
            {
                id: 'nav-23',
                label: "Enquiries",
                href: "/dashboard/enquiries",
                icon: <NotepadText />,
                exact: true
            }
        ]
    },
    {
        label: "System",
        items: [
            {
                id: 'nav-08',
                label: "Employees",
                href: "/dashboard/employees",
                icon: <IdCard />,
                exact: true
            },
            // {
            //     id: 'nav-09',
            //     label: "Auth",
            //     href: "/dashboard/manage-auth",
            //     icon: <GlobeLock />
            // },
            {   
                id: 'nav-10',
                label: "Profile",
                href: "/dashboard/profile",
                icon: <CircleUser />,
                exact: true
            },
            // {
            //     id: 'nav-12',
            //     label: "API Keys",
            //     href: "/dashboard/api-keys",
            //     icon: <Key />
            // },
            {
                id: 'nav-13',
                label: "Docs",
                href: "/dashboard/docs",
                icon: <FileText />,
                exact: true
            },
            {
                id: 'nav-14',
                label: "Payments",
                href: "/dashboard/payments",
                icon: <CreditCard />,
                exact: true
            },
            {
                id: 'nav-11',
                label: "Settings",
                href: "/dashboard/settings",
                icon: <Settings />,
                exact: true
            },
        ]
    }
]   
