import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface UrlInputProps {
  onSubmit: (url: string) => void
  isLoading: boolean
  onReset: () => void
}

export function UrlInput({ onSubmit, isLoading, onReset }: UrlInputProps) {
  const [url, setUrl] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim())
    }
  }

  const handleClear = () => {
    setUrl("")
    onReset()
  }

  const isValidUrl = url.includes("tiktok.com") || url.includes("vm.tiktok") || url.includes("vt.tiktok")

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={cn(
          "flex flex-col sm:flex-row gap-2 p-2 rounded-xl sm:rounded-2xl bg-background/80 backdrop-blur-sm border-2 transition-all duration-300",
          isFocused ? "border-primary shadow-lg shadow-primary/20" : "border-muted"
        )}
      >
        <div className="relative flex-1">
          <Input
            type="url"
            placeholder="Paste TikTok URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isLoading}
            className="h-10 sm:h-12 pl-3 sm:pl-4 pr-10 border-0 bg-transparent text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {url && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={isLoading || !isValidUrl}
          className="h-10 sm:h-12 px-4 sm:px-6 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white shadow-lg text-sm sm:text-base"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              <span className="ml-2">Processing...</span>
            </>
          ) : (
            <>
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="ml-2">Get Video</span>
            </>
          )}
        </Button>
      </div>
      <p className="mt-2 sm:mt-3 text-center text-xs sm:text-sm text-muted-foreground">
        Supports: tiktok.com, vm.tiktok.com, vt.tiktok.com
      </p>
    </form>
  )
}
