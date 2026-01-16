import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { VideoInfo } from "@/types"
import { formatDuration, formatNumber } from "@/services/tiktok-api"
import {
  Download,
  Heart,
  Eye,
  Clock,
  CheckCircle,
  Music,
  Film,
} from "lucide-react"

interface VideoCardProps {
  video: VideoInfo
  onDownload: (url: string, quality: string, format: string) => void
  isDownloading: boolean
  downloadProgress: number
}

export function VideoCard({
  video,
  onDownload,
  isDownloading,
  downloadProgress,
}: VideoCardProps) {
  return (
    <Card className="overflow-hidden bg-background/80 backdrop-blur-sm border-2 border-muted">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Thumbnail Section */}
          <div className="relative w-full lg:w-80 aspect-video sm:aspect-[9/16] lg:aspect-auto lg:h-auto bg-black/50 flex-shrink-0">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
              <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{formatDuration(video.duration)}</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 sm:p-6">
            {/* Author Info */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              {video.authorAvatar && (
                <img
                  src={video.authorAvatar}
                  alt={video.author}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary flex-shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-base sm:text-lg truncate">{video.author}</h3>
                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    {formatNumber(video.views)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                    {formatNumber(video.likes)}
                  </span>
                </div>
              </div>
            </div>

            {/* Title */}
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 line-clamp-2">
              {video.title}
            </p>

            {/* Download Options */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="font-medium flex items-center gap-2 text-sm sm:text-base">
                <Download className="h-4 w-4" />
                Download Options
              </h4>

              <div className="grid gap-2 sm:gap-3">
                {video.downloads.map((option, index) => (
                  <div
                    key={index}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg transition-colors ${
                      option.hasWatermark 
                        ? "bg-muted/30 hover:bg-muted/50" 
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    {/* Left side - Icon and info */}
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                        {option.format === "mp3" ? (
                          <Music className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        ) : (
                          <Film className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex flex-col gap-1 sm:gap-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          <span className="font-medium text-sm sm:text-base">{option.quality}</span>
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            ({option.format.toUpperCase()})
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                          {!option.hasWatermark && option.format !== "mp3" && (
                            <Badge variant="success" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                              <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                              No Watermark
                            </Badge>
                          )}
                          {option.hasWatermark && (
                            <Badge variant="outline" className="text-[10px] sm:text-xs text-muted-foreground px-1.5 sm:px-2">
                              Watermark
                            </Badge>
                          )}
                          {option.size !== "N/A" && option.size !== "0 Bytes" && (
                            <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
                              {option.size}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side - Download button */}
                    <div className="flex-shrink-0 self-stretch sm:self-center">
                      <Button
                        size="sm"
                        onClick={() =>
                          onDownload(option.url, option.quality, option.format)
                        }
                        disabled={isDownloading}
                        className="w-full sm:w-auto h-8 sm:h-9 text-xs sm:text-sm bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900"
                      >
                        <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Download Progress */}
              {isDownloading && (
                <div className="mt-3 sm:mt-4 space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Downloading...</span>
                    <span>{downloadProgress}%</span>
                  </div>
                  <Progress value={downloadProgress} className="h-1.5 sm:h-2" />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
