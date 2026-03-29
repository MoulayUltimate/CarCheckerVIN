'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight, AlertCircle, Car } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
]

interface VinSearchProps {
  variant?: 'hero' | 'compact'
  className?: string
}

export function VinSearch({ variant = 'hero', className }: VinSearchProps) {
  const [vin, setVin] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [state, setState] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('vin')
  const router = useRouter()

  const validateVin = (value: string): boolean => {
    if (value.length !== 17) {
      setError('VIN must be exactly 17 characters')
      return false
    }
    if (/[IOQ]/i.test(value)) {
      setError('VIN cannot contain letters I, O, or Q')
      return false
    }
    if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(value)) {
      setError('VIN must contain only letters and numbers')
      return false
    }
    return true
  }

  const handleVinSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const cleanVin = vin.toUpperCase().trim()

    if (!validateVin(cleanVin)) {
      return
    }

    setIsLoading(true)
    router.push(`/report/${cleanVin}`)
  }

  const handlePlateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!licensePlate.trim()) {
      setError('Please enter a license plate number')
      return
    }
    if (!state) {
      setError('Please select a state')
      return
    }

    setIsLoading(true)
    // For now, redirect to a page explaining plate lookup (API doesn't support plate lookup directly)
    router.push(`/plate-lookup?plate=${encodeURIComponent(licensePlate.toUpperCase())}&state=${state}`)
  }

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
    if (value.length <= 17) {
      setVin(value)
      if (error) setError('')
    }
  }

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9 -]/g, '')
    if (value.length <= 10) {
      setLicensePlate(value)
      if (error) setError('')
    }
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleVinSubmit} className={cn('w-full', className)}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter VIN..."
              value={vin}
              onChange={handleVinChange}
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
    <div className={cn('w-full max-w-2xl', className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
          <TabsTrigger value="vin" className="text-base">
            <Search className="mr-2 h-4 w-4" />
            VIN
          </TabsTrigger>
          <TabsTrigger value="plate" className="text-base">
            <Car className="mr-2 h-4 w-4" />
            License Plate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vin" className="mt-0">
          <form onSubmit={handleVinSubmit}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter your 17-character VIN"
                  value={vin}
                  onChange={handleVinChange}
                  className="h-14 pl-12 pr-16 text-lg"
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
          </form>
        </TabsContent>

        <TabsContent value="plate" className="mt-0">
          <form onSubmit={handlePlateSubmit}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Car className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="License plate number"
                  value={licensePlate}
                  onChange={handlePlateChange}
                  className="h-14 pl-12 text-lg"
                  maxLength={10}
                />
              </div>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger className="h-14 w-full sm:w-48">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          </form>
        </TabsContent>
      </Tabs>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-destructive">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Find your VIN on the driver&apos;s side dashboard, door jamb, or vehicle registration
      </p>
    </div>
  )
}
