import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { Reviews } from "@/components/sections/Reviews"
import { About } from "@/components/sections/About"
import { Cities } from "@/components/sections/Cities"
import { CTA } from "@/components/sections/CTA"
import { ContactForm } from "@/components/sections/ContactForm"
import { Partners } from "@/components/sections/Partners"
import { COMPANY } from "@/lib/constants"

export default function HomePage() {
  return (
    <>
      <Hero 
        title={`Maler i ${COMPANY.city} med ${COMPANY.trustpilotRating} på Trustpilot`}
        subtitle="Professionelt malerarbejde til private og erhverv. Vi leverer kvalitet, pålidelighed og konkurrencedygtige priser – hver gang."
      />
      
      <Services />
      
      <About />
      
      <Reviews pageSlug="homepage" />
      
      <Partners variant="strip" />
      
      <Cities />
      
      <CTA />
      
      <ContactForm 
        title="Få et gratis tilbud"
        subtitle="Kontakt os i dag for et uforpligtende tilbud på dit malerarbejde. Vi vender tilbage inden for 24 timer."
        pageSlug="homepage"
      />
    </>
  )
}
