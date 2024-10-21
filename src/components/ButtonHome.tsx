'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

interface Props {
  name?: string
  className: string
  icon?: JSX.Element
}

export const ButtonHome = ({ name, className, icon }: Props) => {
  const router = useRouter()

  return (
    <Button
      variant='outline'
      onClick={() => { router.push('/') }}
      className={className}
    >
      {icon}
      {name}
    </Button>
  )
}