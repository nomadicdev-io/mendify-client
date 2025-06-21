import { Link } from "@tanstack/react-router";

export default function PoweredBy() {
  return (
    <div className="flex flex-col relative gap-3 items-center justify-center text-center">
        <p className="text-sm text-gray-500 font-medium">Powered by</p>
        <Link to={import.meta.env.VITE_DEVELOPER_URL} title={import.meta.env.VITE_DEVELOPER} target="_blank" referrerPolicy="no-referrer" className="relative w-[10rem] h-[1.85rem] flex items-center justify-center">
            <img src="/qb-logo.svg" alt={import.meta.env.VITE_DEVELOPER + " Logo"} className="w-full h-full object-contain" />
        </Link>
    </div>
  )
}
