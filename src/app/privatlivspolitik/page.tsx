import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Container } from "@/components/ui/Container"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Privatlivspolitik — Schou & Christensen",
  description: "Læs vores privatlivspolitik og få information om, hvordan vi behandler dine personlige oplysninger.",
  alternates: {
    canonical: `https://${COMPANY.domain}/privatlivspolitik/`,
  },
}

export default function PrivatlivspolitikPage() {
  return (
    <>
      <Hero
        title="Privatlivspolitik"
        subtitle="Sådan behandler vi dine personoplysninger"
        variant="page"
        showTrustpilot={false}
        showCTA={false}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-lg prose-gray">
            <p className="lead text-xl text-gray-600">
              Hos {COMPANY.name} tager vi beskyttelsen af dine personoplysninger alvorligt. 
              Denne privatlivspolitik beskriver, hvordan vi indsamler, bruger og beskytter 
              dine data i overensstemmelse med GDPR og dansk lovgivning.
            </p>

            <h2>Dataansvarlig</h2>
            <p>
              Den dataansvarlige for behandlingen af dine personoplysninger er:
            </p>
            <ul>
              <li><strong>Virksomhed:</strong> Malerfirmaet Schou &amp; Christensen ApS</li>
              <li><strong>CVR-nummer:</strong> {COMPANY.cvr}</li>
              <li><strong>Adresse:</strong> {COMPANY.fullAddress}</li>
              <li><strong>E-mail:</strong> {COMPANY.email}</li>
              <li><strong>Telefon:</strong> {COMPANY.phone}</li>
            </ul>

            <h2>Hvilke oplysninger indsamler vi?</h2>
            <p>Vi indsamler følgende typer personoplysninger:</p>
            
            <h3>Kontaktformularer</h3>
            <p>
              Når du udfylder en kontaktformular på vores hjemmeside, indsamler vi:
            </p>
            <ul>
              <li>Navn</li>
              <li>E-mailadresse</li>
              <li>Telefonnummer</li>
              <li>Adresse (hvis relevant for tilbuddet)</li>
              <li>Beskrivelse af dit projekt eller din henvendelse</li>
            </ul>

            <h3>Tekniske data</h3>
            <p>
              Når du besøger vores hjemmeside, indsamles automatisk visse tekniske oplysninger via 
              cookies og analyseværktøjer. Se vores <a href="/cookiepolitik/">cookiepolitik</a> for 
              flere detaljer.
            </p>

            <h2>Formål med behandlingen</h2>
            <p>Vi bruger dine personoplysninger til følgende formål:</p>
            <ul>
              <li><strong>Kundeservice:</strong> For at besvare dine henvendelser og give dig tilbud</li>
              <li><strong>Projektgennemførelse:</strong> For at udføre malerarbejde hos dig</li>
              <li><strong>Forbedring af hjemmesiden:</strong> For at analysere brugeradfærd og optimere brugeroplevelsen</li>
              <li><strong>Markedsføring:</strong> Kun hvis du har givet samtykke hertil</li>
            </ul>

            <h2>Retsgrundlag</h2>
            <p>
              Vi behandler dine personoplysninger på følgende retsgrundlag:
            </p>
            <ul>
              <li><strong>Samtykke:</strong> Når du aktivt afgiver dine oplysninger via kontaktformularer</li>
              <li><strong>Kontraktopfyldelse:</strong> Når behandlingen er nødvendig for at opfylde en aftale med dig</li>
              <li><strong>Legitime interesser:</strong> Til forbedring af vores tjenester og hjemmeside</li>
            </ul>

            <h2>Tredjeparter og databehandlere</h2>
            <p>
              Vi deler dine oplysninger med følgende tredjeparter, der agerer som databehandlere:
            </p>
            <ul>
              <li><strong>Supabase:</strong> Database-hosting til opbevaring af kontaktformulardata (EU-servere)</li>
              <li><strong>Vercel:</strong> Web-hosting og analyseværktøjer</li>
            </ul>
            <p>
              Alle databehandlere er underlagt databehandleraftaler, der sikrer, at dine 
              oplysninger behandles i overensstemmelse med GDPR.
            </p>

            <h2>Opbevaringsperiode</h2>
            <p>
              Vi opbevarer dine personoplysninger så længe, det er nødvendigt for at opfylde 
              de formål, de blev indsamlet til. Typisk sletter vi:
            </p>
            <ul>
              <li>Kontaktformulardata: 2 år efter sidste kontakt</li>
              <li>Kundedata: 5 år efter projektets afslutning (pga. garantiperioder)</li>
              <li>Analysedata: 14 måneder</li>
            </ul>

            <h2>Dine rettigheder</h2>
            <p>
              Som registreret har du følgende rettigheder i henhold til GDPR:
            </p>
            <ul>
              <li><strong>Ret til indsigt:</strong> Du kan anmode om en kopi af de oplysninger, vi har om dig</li>
              <li><strong>Ret til berigtigelse:</strong> Du kan bede os om at rette forkerte oplysninger</li>
              <li><strong>Ret til sletning:</strong> Du kan anmode om, at vi sletter dine oplysninger</li>
              <li><strong>Ret til begrænsning:</strong> Du kan bede om, at vi begrænser behandlingen</li>
              <li><strong>Ret til dataportabilitet:</strong> Du kan få udleveret dine data i et struktureret format</li>
              <li><strong>Ret til indsigelse:</strong> Du kan gøre indsigelse mod vores behandling</li>
            </ul>
            <p>
              For at udøve dine rettigheder kan du kontakte os på{" "}
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
            </p>

            <h2>Sikkerhed</h2>
            <p>
              Vi har implementeret passende tekniske og organisatoriske sikkerhedsforanstaltninger 
              for at beskytte dine personoplysninger mod uautoriseret adgang, ændring, offentliggørelse 
              eller sletning. Dette inkluderer:
            </p>
            <ul>
              <li>Krypteret dataoverførsel (SSL/TLS)</li>
              <li>Sikker opbevaring hos certificerede databehandlere</li>
              <li>Adgangskontrol og logning</li>
            </ul>

            <h2>Klageadgang</h2>
            <p>
              Hvis du mener, at vi behandler dine personoplysninger i strid med lovgivningen, 
              kan du klage til Datatilsynet:
            </p>
            <ul>
              <li><strong>Datatilsynet</strong></li>
              <li>Carl Jacobsens Vej 35</li>
              <li>2500 Valby</li>
              <li>E-mail: dt@datatilsynet.dk</li>
              <li>Telefon: 33 19 32 00</li>
            </ul>

            <h2>Ændringer til denne politik</h2>
            <p>
              Vi forbeholder os retten til at opdatere denne privatlivspolitik. Væsentlige 
              ændringer vil blive meddelt på vores hjemmeside.
            </p>
            <p className="text-sm text-gray-500">
              Sidst opdateret: Februar 2026
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
