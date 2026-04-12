'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface VehiclePhotosProps {
  photos: string[]
}

export function VehiclePhotos({ photos }: VehiclePhotosProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (photos.length === 0) return null

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Photos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
          <img
            src={photos[activeIndex]}
            alt={`Vehicle photo ${activeIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {photos.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-lg"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous photo</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full shadow-lg"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next photo</span>
              </Button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="flex gap-1.5 rounded-full bg-black/50 px-3 py-2">
                  {photos.slice(0, 10).map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        'h-2 w-2 rounded-full transition-colors',
                        index === activeIndex ? 'bg-white' : 'bg-white/50'
                      )}
                      onClick={() => setActiveIndex(index)}
                    >
                      <span className="sr-only">View photo {index + 1}</span>
                    </button>
                  ))}
                  {photos.length > 10 && (
                    <span className="text-xs text-white/70 ml-1">+{photos.length - 10}</span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {photos.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {photos.map((photo, index) => (
              <button
                key={index}
                className={cn(
                  'relative h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 transition-colors',
                  index === activeIndex ? 'border-primary' : 'border-transparent'
                )}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={photo}
                  alt={`Vehicle thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
