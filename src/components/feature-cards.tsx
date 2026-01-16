import { Card, CardContent } from "@/components/ui/card"
import { Download, Shield, Zap, Sparkles } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "No Watermark",
    description: "Download TikTok videos without any watermark",
  },
  {
    icon: Zap,
    title: "HD Quality",
    description: "Get videos in the highest quality available",
  },
  {
    icon: Download,
    title: "Fast Download",
    description: "Quick processing and download speeds",
  },
  {
    icon: Sparkles,
    title: "Free & Unlimited",
    description: "No limits on downloads, completely free",
  },
]

export function FeatureCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
      {features.map((feature) => (
        <Card
          key={feature.title}
          className="bg-background/60 backdrop-blur-sm border-muted hover:border-primary/50 transition-colors"
        >
          <CardContent className="p-3 sm:p-6 text-center">
            <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center mb-2 sm:mb-4">
              <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h3 className="font-semibold text-xs sm:text-base mb-1 sm:mb-2">{feature.title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-tight">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
