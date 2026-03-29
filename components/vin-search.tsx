'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface VinSearchProps {
  variant?: 'hero' | 'compact'
  className?: string
}

export function VinSearch({ variant = 'hero', className }: VinSearchProps) {
  const [vin, setVin] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateVin = (value: string): boolean => {
    // VIN must be exactly 17 characters
    if (value.length !== 17) {
      setError('VIN must be exactly 17 characters')
      return false
    }
    // VIN cannot contain I, O, or Q
    if (/[IOQ]/i.test(value)) {
      setError('VIN cannot contain letters I, O, or Q')
      return false
    }
    // VIN must be alphanumeric
    if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(value)) {
      setError('VIN must contain only letters and numbers')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const cleanVin = vin.toUpperCase().trim()

    if (!validateVin(cleanVin)) {
      return
    }

    setIsLoading(true)
    router.push(`/report/${cleanVin}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
    if (value.length <= 17) {
      setVin(value)
      if (error) setError('')
    }
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className={cn('w-full', className)}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter VIN..."
              value={vin}
              onChange={handleInputChange}
              className="pl-9"
              maxLength={17}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-destructive">{error}</p>
        )}
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full max-w-2xl', className)}>
      <div className="relative">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter your 17-character VIN"
              value={vin}
              onChange={handleInputChange}
              className="h-14 pl-12 pr-4 text-lg"
              maxLength={17}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {vin.length}/17
            </span>
          </div>
          <Button 
            type="submit" 
            size="lg" 
            className="h-14 px-8 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              'Searching...'
            ) : (
              <>
                Get Report
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-destructive">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Find your VIN on the driver&apos;s side dashboard, door jamb, or vehicle registration
      </p>
    </form>
  )
}
