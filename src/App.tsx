import { UrlInput } from "@/components/url-input"
import { VideoCard } from "@/components/video-card"
import { FeatureCards } from "@/components/feature-cards"
import { ErrorMessage } from "@/components/error-message"
import { useDownloader } from "@/hooks/use-downloader"

function App() {
  const {
    isLoading,
    error,
    videoInfo,
    downloadProgress,
    isDownloading,
    fetchVideo,
    download,
    reset,
  } = useDownloader()

  return (
    <div className="min-h-screen min-h-dvh gradient-bg overflow-x-hidden">
      {/* Decorative elements - hidden on mobile for performance */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-red-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full">
        {/* Main Content */}
        <main className="container mx-auto px-3 sm:px-4 pb-8 sm:pb-16">
          {/* Hero Section */}
          <section className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 glow-text leading-tight">
              Download TikTok Videos
              <br />
              <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                Without Watermark
              </span>
            </h2>
            <p className="text-sm sm:text-lg text-muted-foreground mb-4 sm:mb-8 px-2">
              Get high-quality TikTok videos in seconds. No watermark, no hassle.
            </p>

            {/* URL Input */}
            <UrlInput
              onSubmit={fetchVideo}
              isLoading={isLoading}
              onReset={reset}
            />
          </section>

          {/* Error Message */}
          {error && (
            <section className="max-w-3xl mx-auto mb-8">
              <ErrorMessage message={error} onRetry={reset} />
            </section>
          )}

          {/* Video Result */}
          {videoInfo && (
            <section className="max-w-4xl mx-auto mb-12">
              <VideoCard
                video={videoInfo}
                onDownload={download}
                isDownloading={isDownloading}
                downloadProgress={downloadProgress}
              />
            </section>
          )}

          {/* Features */}
          {!videoInfo && (
            <section className="max-w-5xl mx-auto mt-8 sm:mt-16">
              <h3 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-8">
                Why Choose XOXOD33P Downloader?
              </h3>
              <FeatureCards />
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="py-4 sm:py-8 border-t border-muted">
          <div className="container mx-auto px-4 text-center text-xs sm:text-sm text-muted-foreground">
            <p>XOXOD33P Downloader. For personal use only.</p>
            <p className="mt-1 sm:mt-2">
              We do not store any videos. All downloads are processed directly.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
