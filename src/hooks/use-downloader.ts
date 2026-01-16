import { useState, useCallback } from "react"
import type { VideoInfo } from "@/types"
import { fetchVideoInfo, downloadVideo } from "@/services/tiktok-api"

export function useDownloader() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  const fetchVideo = useCallback(async (url: string) => {
    setIsLoading(true)
    setError(null)
    setVideoInfo(null)

    try {
      const info = await fetchVideoInfo(url)
      setVideoInfo(info)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const download = useCallback(
    async (downloadUrl: string, quality: string, format: string) => {
      if (!videoInfo) return

      setIsDownloading(true)
      setDownloadProgress(0)

      try {
        // Create a descriptive filename
        const sanitizedAuthor = videoInfo.author.replace(/[^\w\s]/g, '').trim() || 'TikTok'
        const sanitizedTitle = videoInfo.title
          .replace(/[^\w\s]/g, '')
          .trim()
          .substring(0, 50) || 'Video'
        const qualityTag = quality.replace(/[^\w]/g, '')
        const timestamp = Date.now()
        
        const filename = `${sanitizedAuthor}_${sanitizedTitle}_${qualityTag}_${timestamp}.${format}`
        await downloadVideo(downloadUrl, filename, setDownloadProgress)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Download failed")
      } finally {
        setIsDownloading(false)
        setDownloadProgress(0)
      }
    },
    [videoInfo]
  )

  const reset = useCallback(() => {
    setVideoInfo(null)
    setError(null)
    setDownloadProgress(0)
  }, [])

  return {
    isLoading,
    error,
    videoInfo,
    downloadProgress,
    isDownloading,
    fetchVideo,
    download,
    reset,
  }
}
