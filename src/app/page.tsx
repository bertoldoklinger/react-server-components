import { prisma } from "@/lib/prisma";
import {
  ChevronRightIcon
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { SearchInput } from "./components/SearchInput";


export default async function Users({ searchParams }: {searchParams: {[key: string]: string | string[] | undefined}}) {
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined

  
  const perPage = 6
  const totalUsers = await prisma.user.count({
    where: {
      name: {
        contains: search,
      }
  }
})
  
  const totalPages = Math.ceil(totalUsers / perPage);
  const page = typeof searchParams.page === "string" && +searchParams.page > 1 && +searchParams.page <= totalPages ? +searchParams.page : 1
  
  const users = await prisma.user.findMany({
    take: perPage,
    skip: (page - 1) * perPage,
    where: {
      name: {
        contains: search,
      }
    }
  })

  
  return (
    <div className="px-8 bg-gray-50 pt-12 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="w-80 mt-1">
          <SearchInput search={search}/>
        </div>
        <div className="mt-0 ml-16 flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Adicionar Usuário
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-6">
          <div className="inline-block min-w-full py-2 align-middle px-6">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 pl-6">
                      Nome
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      E-mail
                    </th>
                    <th className="relative py-3.5 pl-3 pr-6">
                      <span className="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900 pl-6">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-4 pr-6 text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                        >
                          Editar
                          <ChevronRightIcon className="w-4 h-4" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-700">Mostrando <span className="font-semibold">{(page - 1) * perPage + 1}</span> até{" "} <span className="font-semibold">{Math.min(page * perPage, totalUsers)}</span> de{" "}<span className="font-semibold">{totalUsers}</span> usuários</p>
        <div className="space-x-2">
          <Link className={`${page === 1 ? "opacity-50 pointer-events-none" : "" } border border-gray-300 bg-white px-3 py-2 inline-flex items-center justify-center text-sm text-gray-900 font-semibold rounded-md hover:bg-gray-100`} href={page > 2 ? `/?page=${page - 1 }` : '/' }>Anterior</Link>
          <Link className={ `${page >= totalPages ? "opacity-50 pointer-events-none" : "" } border border-gray-300 bg-white px-3 py-2 inline-flex items-center justify-center text-sm text-gray-900 font-semibold rounded-md hover:bg-gray-100`} href={page < totalPages ? `/?page=${page + 1}`: `/?page=${page}`}>Próximo</Link>
        </div>
      </div>
    </div>
  );
}
