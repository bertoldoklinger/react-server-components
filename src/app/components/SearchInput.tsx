'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Spinner } from "./spinner";

export function SearchInput({ search }: { search?: string }) {
  const router = useRouter()

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
  const [isPending,startTransition] = useTransition()
  const isSearching = timeoutId || isPending

  return (
    <div className="relative rounded-md shadow-sm">
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <MagnifyingGlassIcon
        className="h-5 w-5 text-gray-400"
        aria-hidden="true"
      />
    </div>
    <input
      type="text"
      name="search"
      id="search"
      defaultValue={search}
      className="block w-full rounded-md border-gray-300 pl-10 focus:ring-0 focus:border-gray-400 focus:outline-none text-sm"
      placeholder="Buscar"
      onChange={(event)=> {
        clearTimeout(timeoutId)
        const id = setTimeout(()=> {
        startTransition(()=> {
          if(event.target.value){

            router.push(`/?search=${event.target.value}`)
          }else {
            router.push('/')
          } 
          setTimeoutId(undefined)
        })
        }, 500)

        setTimeoutId(id)
      }}
    />
    {isSearching && (
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <Spinner
          className="h-5 w-5 text-gray-400 animate-spin"
          aria-hidden="true"
        />
      </div>
    )}
  </div>
  )
}