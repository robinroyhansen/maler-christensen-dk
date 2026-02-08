import Image from "next/image"
import Link from "next/link"

const TRUSTPILOT_URL = "https://www.trustpilot.com/review/www.maler-christensen.dk?languages=all"
const TRUSTPILOT_STARS = "https://maler-christensen.dk/wp-content/uploads/2023/05/trustpilot_Stars.png"
const ANMELD_URL = "https://www.anmeld-haandvaerker.dk/maler/malerfirmaet-schou-christensen-aps"
const ANMELD_SMILEYS = "https://maler-christensen.dk/wp-content/uploads/2023/05/5ah.png"

export function TrustBar() {
  return (
    <div className="bg-[#1a1a1a] py-1.5 hidden sm:block">
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        {/* Trustpilot Badge */}
        <Link
          href={TRUSTPILOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white text-sm hover:opacity-80 transition-opacity"
        >
          <span className="font-medium">Trustpilot</span>
          <Image
            src={TRUSTPILOT_STARS}
            alt="Trustpilot 5 stjerner"
            width={100}
            height={20}
            className="h-5 w-auto"
          />
        </Link>

        {/* Divider */}
        <span className="text-gray-500">|</span>

        {/* Anmeld Håndværker Badge */}
        <Link
          href={ANMELD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white text-sm hover:opacity-80 transition-opacity"
        >
          <span className="font-medium">Anmeld Håndværker</span>
          <Image
            src={ANMELD_SMILEYS}
            alt="Anmeld Håndværker 5 smileys"
            width={100}
            height={20}
            className="h-5 w-auto"
          />
        </Link>
      </div>
    </div>
  )
}
