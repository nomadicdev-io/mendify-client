import { Link } from '@tanstack/react-router'

export default function Footer() {
  return (
    <footer className="w-full flex items-center h-12 py-1 px-5 border-t border-gray-200">
        <div className="flex justify-between w-full">
            <p className="text-sm opacity-75">Mendify by Caterpros UAE | Copyright &copy; {new Date().getFullYear()}</p>
            <p className="text-sm inline-flex items-end gap-2">
              <span className="leading-[100%] opacity-75">Powered by </span>
              <Link to={import.meta.env.VITE_DEVELOPER_URL} target="_blank"className="font-semibold w-auto h-[18px] relative aspect-[10.5/1.5] hover:opacity-75"><img src="/qb-logo.svg" alt="Quadbits Lab" className='object-contain' /></Link></p>
        </div>
    </footer>
  )
}
