import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function reconstructUrl(url: string[]) {
  const decoded = url.map((component) => decodeURIComponent(component))
  return decoded.join('/')
}
