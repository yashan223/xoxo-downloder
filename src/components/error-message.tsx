import { AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Card className="border-destructive/50 bg-destructive/10">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-destructive/20">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-destructive mb-1">Error</h3>
            <p className="text-sm text-muted-foreground">{message}</p>
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="mt-3"
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
