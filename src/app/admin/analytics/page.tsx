"use client"

import { 
  BarChart3, TrendingUp, MousePointer, Eye, 
  FileText, Search, ExternalLink, Lock
} from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function AnalyticsPage() {
  const placeholderCards = [
    {
      title: "Impressions",
      value: "---",
      change: "+---%",
      icon: Eye,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Clicks",
      value: "---",
      change: "+---%",
      icon: MousePointer,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "CTR",
      value: "--%",
      change: "+---%",
      icon: TrendingUp,
      color: "text-purple-600 bg-purple-100",
    },
    {
      title: "Avg. Position",
      value: "--",
      change: "+--",
      icon: BarChart3,
      color: "text-amber-600 bg-amber-100",
    },
  ]

  const placeholderPages = [
    { page: "/malerarbejde/", clicks: "---", impressions: "---", ctr: "--%", position: "--" },
    { page: "/maler-slagelse/", clicks: "---", impressions: "---", ctr: "--%", position: "--" },
    { page: "/indvendig-maling/", clicks: "---", impressions: "---", ctr: "--%", position: "--" },
    { page: "/maling-af-lejlighed/", clicks: "---", impressions: "---", ctr: "--%", position: "--" },
    { page: "/microcement/", clicks: "---", impressions: "---", ctr: "--%", position: "--" },
  ]

  const placeholderQueries = [
    { query: "maler slagelse", clicks: "---", impressions: "---", ctr: "--%", position: "--" },
    { query: "malerarbejde sjælland", clicks: "---", impressions: "---", ctr: "--%", position: "--" },
    { query: "indvendig maling pris", clicks: "---", impressions: "---", ctr: "--%", position: "--" },
    { query: "microcement badeværelse", clicks: "---", impressions: "---", ctr: "--%", position: "--" },
    { query: "maler tilbud", clicks: "---", impressions: "---", ctr: "--%", position: "--" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Google Search Console & Analytics data</p>
      </div>

      {/* Connect Banner */}
      <div className="bg-gradient-to-r from-[#6b9834] to-[#85bd41] rounded-xl p-6 mb-8 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Forbind Google Search Console & GA4</h2>
            <p className="text-white/90 mb-4">
              Se performance data direkte i admin panelet. Forbind Google Search Console 
              og Google Analytics 4 for at se impressions, clicks, CTR og meget mere.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-white text-[#6b9834] hover:bg-gray-100"
                onClick={() => alert("Kontakt udvikler for at opsætte GSC integration")}
              >
                <Search className="w-4 h-4 mr-2" />
                Forbind Search Console
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => alert("Kontakt udvikler for at opsætte GA4 integration")}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Forbind Google Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {placeholderCards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl p-4 shadow-sm opacity-60">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <span className="text-sm text-gray-400">{card.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-300">{card.value}</p>
            <p className="text-sm text-gray-400">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden opacity-60">
          <div className="p-4 border-b bg-gray-50 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-400" />
            <h2 className="font-semibold text-gray-900">Top sider</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Side</th>
                  <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500">Clicks</th>
                  <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500">Impr.</th>
                  <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500">CTR</th>
                  <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500">Pos.</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {placeholderPages.map((page) => (
                  <tr key={page.page} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <code className="text-sm text-gray-400">{page.page}</code>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-400">{page.clicks}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-400">{page.impressions}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-400">{page.ctr}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-400">{page.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Queries */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden opacity-60">
          <div className="p-4 border-b bg-gray-50 flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <h2 className="font-semibold text-gray-900">Top søgeord</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-2 text-xs font-semibold text-gray-500">Søgeord</th>
                  <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500">Clicks</th>
                  <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500">Impr.</th>
                  <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500">CTR</th>
                  <th className="text-right px-4 py-2 text-xs font-semibold text-gray-500">Pos.</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {placeholderQueries.map((query) => (
                  <tr key={query.query} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-400">{query.query}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-400">{query.clicks}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-400">{query.impressions}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-400">{query.ctr}</td>
                    <td className="px-4 py-3 text-right text-sm text-gray-400">{query.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Future Features */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Kommende features</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Real-time besøgsdata",
            "Konverteringsrate tracking",
            "Keyword ranking historik",
            "Konkurrent analyse",
            "Automatisk rapportering",
            "Mobile vs desktop statistik",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-gray-600">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
