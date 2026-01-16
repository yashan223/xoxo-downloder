export interface VideoInfo {
  id: string
  title: string
  author: string
  authorAvatar: string
  thumbnail: string
  duration: number
  views: number
  likes: number
  downloads: DownloadOption[]
}

export interface DownloadOption {
  quality: string
  format: string
  url: string
  size: string
  hasWatermark: boolean
}

export interface DownloadState {
  isLoading: boolean
  error: string | null
  videoInfo: VideoInfo | null
  downloadProgress: number
}
