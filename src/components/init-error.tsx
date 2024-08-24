import Link from 'next/link'
import { Home, Info } from 'lucide-react'
import { Button } from './ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'

type Props = {
  error: string
}

export default function InitError(props: Props) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <img
        src='/img/undraw-access-denied.svg'
        alt='illustration'
        className='h-60 w-auto'
      />

      <h1 className='mt-8 text-center text-3xl font-bold text-brand-emerald'>
        Something Went Wrong
      </h1>

      <div className='mt-6 flex flex-wrap items-center justify-center gap-4'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='outline'>
              <Info className='mr-2 h-4 w-4' />
              Details
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error Details</AlertDialogTitle>
            </AlertDialogHeader>
            <div className='no-scrollbar max-h-[60vh] max-w-full overflow-scroll'>
              {props.error}
            </div>
            <AlertDialogFooter>
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Link href='/'>
          <Button>
            <Home className='mr-2 h-4 w-4' />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
