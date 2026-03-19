import type { PropsWithChildren } from 'react'

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className="my-4 text-red-600 font-light text-normal uppercase">{children}</div>
  )
}
