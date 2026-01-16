import type { VideoInfo, DownloadOption } from "@/types"

// TikTok video download service
// Uses tikwm.com API to fetch video without watermark

const API_ENDPOINT = "https://www.tikwm.com/api/"

export async function extractVideoId(url: string): Promise<string | null> {
  // Support various TikTok URL formats
  const patterns = [
    /tiktok\.com\/@[\w.-]+\/video\/(\d+)/,
    /vm\.tiktok\.com\/(\w+)/,
    /vt\.tiktok\.com\/(\w+)/,
    /tiktok\.com\/t\/(\w+)/,
    /m\.tiktok\.com\/v\/(\d+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }

  return null
}

export async function fetchVideoInfo(url: string): Promise<VideoInfo> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `url=${encodeURIComponent(url)}&hd=1`,
    })

    if (!response.ok) {
      throw new Error("Failed to fetch video info")
    }

    const data = await response.json()

    if (data.code !== 0) {
      throw new Error(data.msg || "Failed to process video")
    }

    const video = data.data

    const downloads: DownloadOption[] = []

    // HD version without watermark
    if (video.hdplay) {
      downloads.push({
        quality: "HD (1080p)",
        format: "mp4",
        url: video.hdplay,
        size: formatBytes(video.hd_size || 0),
        hasWatermark: false,
      })
    }

    // Standard version without watermark
    if (video.play) {
      downloads.push({
        quality: "Standard (720p)",
        format: "mp4",
        url: video.play,
        size: formatBytes(video.size || 0),
        hasWatermark: false,
      })
    }

    // Original with watermark (if needed for comparison)
    if (video.wmplay) {
      downloads.push({
        quality: "Original (with watermark)",
        format: "mp4",
        url: video.wmplay,
        size: formatBytes(video.wm_size || 0),
        hasWatermark: true,
      })
    }

    // Audio only
    if (video.music) {
      downloads.push({
        quality: "Audio Only",
        format: "mp3",
        url: video.music,
        size: "N/A",
        hasWatermark: false,
      })
    }

    return {
      id: video.id,
      title: video.title || "TikTok Video",
      author: video.author?.nickname || video.author?.unique_id || "Unknown",
      authorAvatar: video.author?.avatar || "",
      thumbnail: video.cover || video.origin_cover || "",
      duration: video.duration || 0,
      views: video.play_count || 0,
      likes: video.digg_count || 0,
      downloads,
    }
  } catch (error) {
    console.error("Error fetching video:", error)
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch video information"
    )
  }
}

export async function downloadVideo(
  url: string,
  filename: string,
  onProgress?: (progress: number) => void
): Promise<void> {
  // Clean the filename - remove special characters and spaces
  const cleanFilename = filename
    .replace(/[^\w\s.-]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 100) // Limit filename length
  
  // Create a download link with proper filename
  const link = document.createElement('a')
  link.href = url
  link.download = cleanFilename
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  
  // For cross-origin URLs, we need to fetch and create blob
  try {
    if (onProgress) onProgress(10)
    
    const response = await fetch(url, { mode: 'cors' })
    
    if (onProgress) onProgress(50)
    
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    
    if (onProgress) onProgress(90)
    
    const downloadLink = document.createElement('a')
    downloadLink.href = blobUrl
    downloadLink.download = cleanFilename
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    
    // Clean up blob URL after a delay
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)
    
    if (onProgress) onProgress(100)
  } catch {
    // Fallback: open in new tab if fetch fails (CORS issues)
    window.open(url, '_blank')
    if (onProgress) onProgress(100)
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}
