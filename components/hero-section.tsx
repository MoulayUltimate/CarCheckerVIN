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

export function HeroSection() {
  const [vin, setVin] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [state, setState] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'vin' | 'plate'>('vin')
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

  return (
    <section id="search" className="hero-section">
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
                  <SelectContent>
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
            <a href="#" className="hero-link-primary">
              <MapPin className="h-3.5 w-3.5" />
              Where to find the VIN?
            </a>
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
