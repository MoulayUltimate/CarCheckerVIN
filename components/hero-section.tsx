'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search, ArrowRight, AlertCircle, Car, MapPin, Shield, Award, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog'

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

const VIN_LOCATIONS = [
  {
    title: "Driver's Side Dashboard",
    description: "Look through the windshield from outside the vehicle. The VIN is on a metal plate where the dashboard meets the windshield.",
    icon: Search
  },
  {
    title: "Driver's Side Door Jamb",
    description: "Open the driver's door and look for a sticker on the pillar or the door frame itself.",
    icon: Car
  },
  {
    title: "Vehicle Documents",
    description: "Check your vehicle registration card, insurance policy documents, or your car's Title (pink slip).",
    icon: Shield
  }
]

export function HeroSection() {
  const [vin, setVin] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [state, setState] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'vin' | 'plate'>('vin')
  const [isVinModalOpen, setIsVinModalOpen] = useState(false)
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
    if (!validateVin(cleanVin)) return
    setIsLoading(true)
    
    // Aesthetic delay for the "Scanning" experience
    setTimeout(() => {
      router.push(`/report/${cleanVin}`)
    }, 1500)
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
    setTimeout(() => {
      router.push(`/plate-lookup?plate=${encodeURIComponent(licensePlate.toUpperCase())}&state=${state}`)
    }, 1200)
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

  return (
    <section id="search" className="hero-section relative">
      {/* Scanning Backdrop Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
           <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <Search className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
           </div>
           <h2 className="mt-8 text-2xl font-bold tracking-tight">Accessing Official Databases</h2>
           <p className="mt-2 text-muted-foreground animate-pulse">Scanning NMVTIS records, auction history, and title documents...</p>
        </div>
      )}

      <div className="hero-container">
        {/* Left side - Visual showcase with phone + crashed car */}
        <div className="hero-visual">
          <div className="hero-visual-inner">
            {/* Phone mockup */}
            <div className="hero-phone">
              <Image
                src="/images/phone-report.png"
                alt="CarCheckVIN Vehicle History Report on phone"
                width={320}
                height={640}
                className="hero-phone-image"
                priority
              />
            </div>
            {/* Crashed car image */}
            <div className="hero-car">
              <Image
                src="/images/crashed-car.png"
                alt="Crashed car with hidden damage"
                width={500}
                height={500}
                className="hero-car-image"
                priority
              />
              {/* Warning badge on car */}
              <div className="hero-car-badge">
                <AlertCircle className="h-4 w-4" />
                <span>Hidden Damage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Content + Search */}
        <div className="hero-content">
          <p className="hero-tagline">
            Are you worried about buying a used car?
          </p>

          <h1 className="hero-title">
            VIN Check Can Save You Thousands — Get a Full Vehicle History Report
          </h1>

          <p className="hero-subtitle">
            Free VIN check – find any vehicle by VIN
          </p>

          {/* Tab switcher */}
          <div className="hero-tabs">
            <button
              className={cn('hero-tab', activeTab === 'vin' && 'hero-tab-active')}
              onClick={() => setActiveTab('vin')}
            >
              by VIN
            </button>
            <button
              className={cn('hero-tab', activeTab === 'plate' && 'hero-tab-active')}
              onClick={() => setActiveTab('plate')}
            >
              by US License Plate
            </button>
          </div>

          {/* Search Form */}
          <div className="hero-search-container">
            {activeTab === 'vin' ? (
              <form onSubmit={handleVinSubmit} className="hero-search-form">
                <div className="hero-search-input-wrapper">
                  <Search className="hero-search-icon" />
                  <input
                    type="text"
                    placeholder="Enter VIN Number"
                    value={vin}
                    onChange={handleVinChange}
                    className="hero-search-input"
                    maxLength={17}
                    id="hero-vin-input"
                  />
                  <span className="hero-vin-counter">{vin.length}/17</span>
                </div>
                <button
                  type="submit"
                  className="hero-search-button"
                  disabled={isLoading}
                  id="hero-vin-submit"
                >
                  {isLoading ? 'Searching...' : 'Check VIN'}
                  {!isLoading && <ArrowRight className="h-5 w-5 ml-1" />}
                </button>
              </form>
            ) : (
              <form onSubmit={handlePlateSubmit} className="hero-search-form hero-search-form-plate">
                <div className="hero-search-input-wrapper hero-plate-input-wrapper">
                  <Car className="hero-search-icon" />
                  <input
                    type="text"
                    placeholder="License Plate Number"
                    value={licensePlate}
                    onChange={handlePlateChange}
                    className="hero-search-input"
                    maxLength={10}
                    id="hero-plate-input"
                  />
                </div>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger className="hero-state-select">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {US_STATES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button
                  type="submit"
                  className="hero-search-button"
                  disabled={isLoading}
                  id="hero-plate-submit"
                >
                  {isLoading ? 'Searching...' : 'Check VIN'}
                  {!isLoading && <ArrowRight className="h-5 w-5 ml-1" />}
                </button>
              </form>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="hero-error">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          {/* Links below search */}
          <div className="hero-links">
            <Dialog open={isVinModalOpen} onOpenChange={setIsVinModalOpen}>
              <DialogTrigger asChild>
                <button className="hero-link-primary flex items-center gap-1.5 hover:text-primary transition-colors">
                  <MapPin className="h-3.5 w-3.5" />
                  Where to find the VIN?
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Where to Find the VIN</DialogTitle>
                  <DialogDescription className="text-base">
                    The Vehicle Identification Number (VIN) is a unique 17-character code.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-6">
                  {VIN_LOCATIONS.map((loc) => (
                    <div key={loc.title} className="flex gap-4 p-4 rounded-2xl bg-muted/30 border border-muted">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                           <loc.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                           <h4 className="font-bold">{loc.title}</h4>
                           <p className="text-sm text-muted-foreground leading-relaxed">{loc.description}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <span className="hero-link-separator">•</span>
            <span className="hero-link-text">No VIN?</span>
            <a href="/sample-report" className="hero-link-accent">
              Get CarCheckVIN reports
            </a>
          </div>

          {/* Trust badges */}
          <div className="hero-trust-badges">
            <div className="hero-badge">
              <Shield className="h-5 w-5" />
              <span>Trusted by 50,000+</span>
            </div>
            <div className="hero-badge">
              <Clock className="h-5 w-5" />
              <span>Instant Delivery</span>
            </div>
            <div className="hero-badge">
              <Award className="h-5 w-5" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

