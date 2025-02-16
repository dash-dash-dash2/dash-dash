import { Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Rating {
  id: number
  score: number
  comment: string
  user: {  
    name: string
  }
}

interface RatingsModalProps {
  isOpen: boolean
  onClose: () => void
  ratings: Rating[]
  restaurantName: string
}

export function RatingsModal({ isOpen, onClose, ratings, restaurantName }: RatingsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg p-6 relative">
        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>

        <h2 className="text-xl font-semibold mb-4">{restaurantName} - Reviews</h2>

        <div className="flex items-center gap-2 mb-6">
          {ratings.length > 0 && (
            <>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(ratings.reduce((acc, r) => acc + r.score, 0) / ratings.length)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({ratings.length} {ratings.length === 1 ? "review" : "reviews"})
              </span>
            </>
          )}
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {ratings.length > 0 ? (
              ratings.map((rating) => (
                <div key={rating.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{rating.user.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rating.score ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{rating.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No reviews yet</p>
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}
