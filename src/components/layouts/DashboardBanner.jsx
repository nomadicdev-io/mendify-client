import React from "react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useRouter } from "@tanstack/react-router"

export default function DashboardBanner({title, breadcrumb, children}) {

  const router = useRouter()

  return (
    <div className="relative w-full p-6 border-b border-border ">
        <Breadcrumb>
            <BreadcrumbList>
                {
                    breadcrumb?.map((item, index) => (
                        <React.Fragment key={index + 'breadcrumb-item'}>
                            <BreadcrumbItem>
                                {
                                    index === breadcrumb.length - 1 ?
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                    :
                                    <BreadcrumbLink onClick={() => router.navigate({to: item.href})}>{item.label}</BreadcrumbLink>
                                }
                            </BreadcrumbItem>
                            {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
        <div className="relative w-full flex items-center justify-between gap-6 mt-3">
            <h1 className="text-3xl font-bold">{title || 'Dashboard'}</h1>
            <div className="flex items-center gap-2">
                {children}
            </div>
        </div>
    </div>
  )
}
