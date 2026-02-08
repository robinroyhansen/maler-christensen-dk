import type { Metadata } from "next"
import { Hero } from "@/components/sections/Hero"
import { Container } from "@/components/ui/Container"
import { COMPANY } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Cookiepolitik — Schou & Christensen",
  description: "Læs om, hvilke cookies vi bruger på vores hjemmeside, og hvordan du kan administrere dem.",
  alternates: {
    canonical: `https://${COMPANY.domain}/cookiepolitik/`,
  },
}

export default function CookiepolitikPage() {
  return (
    <>
      <Hero
        title="Cookiepolitik"
        subtitle="Information om cookies på vores hjemmeside"
        variant="page"
        showTrustpilot={false}
        showCTA={false}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-lg prose-gray">
            <p className="lead text-xl text-gray-600">
              Vi bruger cookies på {COMPANY.domain} for at give dig den bedste oplevelse og 
              for at analysere, hvordan vores hjemmeside bruges. Her kan du læse om, hvilke 
              cookies vi bruger, og hvordan du kan administrere dem.
            </p>

            <h2>Hvad er cookies?</h2>
            <p>
              Cookies er små tekstfiler, der gemmes på din computer, tablet eller telefon, 
              når du besøger en hjemmeside. De bruges til at huske dine præferencer og til 
              at indsamle statistik om, hvordan hjemmesiden bruges.
            </p>

            <h2>Kategorier af cookies</h2>
            <p>Vi bruger følgende typer cookies:</p>

            <h3>Nødvendige cookies</h3>
            <p>
              Disse cookies er essentielle for, at hjemmesiden fungerer korrekt. De gør det 
              muligt at navigere på siden og bruge grundlæggende funktioner. Uden disse cookies 
              kan hjemmesiden ikke fungere optimalt.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Formål</th>
                  <th>Udløb</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>supabase-auth-token</td>
                  <td>Autentificering for admin-brugere</td>
                  <td>Session</td>
                </tr>
              </tbody>
            </table>

            <h3>Analysecookies</h3>
            <p>
              Vi bruger analysecookies til at forstå, hvordan besøgende bruger vores hjemmeside. 
              Disse oplysninger hjælper os med at forbedre brugeroplevelsen. Vi bruger 
              privacy-venlige analyseværktøjer.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Tjeneste</th>
                  <th>Formål</th>
                  <th>Mere info</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vercel Analytics</td>
                  <td>Anonym trafikanalyse og sidevisninger</td>
                  <td>
                    <a href="https://vercel.com/docs/analytics" target="_blank" rel="noopener noreferrer">
                      Vercel Analytics
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>Bemærk:</strong> Vercel Analytics er designet til at være privacy-venlig og 
              indsamler ikke personhenførbare oplysninger. Der bruges ingen cookies fra tredjepart.
            </p>

            <h3>Markedsføringscookies</h3>
            <p>
              Vi bruger ikke markedsføringscookies eller tracking fra tredjeparter som Facebook 
              eller Google Ads på vores hjemmeside.
            </p>

            <h2>Tredjepartscookies</h2>
            <p>
              Vores hjemmeside kan indeholde links til tredjeparter, som har deres egne 
              cookie-politikker:
            </p>
            <ul>
              <li><strong>Trustpilot:</strong> Anmeldelser og rating-widget</li>
              <li><strong>Google Fonts:</strong> Skrifttyper til hjemmesiden</li>
            </ul>

            <h2>Sådan administrerer du cookies</h2>
            <p>
              Du kan til enhver tid ændre eller tilbagetrække dit samtykke til cookies. 
              Her er, hvordan du administrerer cookies i de mest populære browsere:
            </p>
            <ul>
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/da/kb/aktivere-og-deaktivere-cookies" target="_blank" rel="noopener noreferrer">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/da-dk/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/da-dk/microsoft-edge/slet-cookies-i-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
                  Microsoft Edge
                </a>
              </li>
            </ul>
            <p>
              <strong>Bemærk:</strong> Hvis du blokerer cookies, kan det påvirke hjemmesidens 
              funktionalitet, og visse funktioner vil muligvis ikke fungere korrekt.
            </p>

            <h2>Samtykke</h2>
            <p>
              Ved at bruge vores hjemmeside accepterer du brugen af nødvendige cookies. 
              For analysecookies indhenter vi dit samtykke, hvor det er påkrævet.
            </p>

            <h2>Kontakt</h2>
            <p>
              Har du spørgsmål til vores brug af cookies, er du velkommen til at kontakte os:
            </p>
            <ul>
              <li><strong>E-mail:</strong> <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
              <li><strong>Telefon:</strong> {COMPANY.phone}</li>
            </ul>

            <h2>Ændringer</h2>
            <p>
              Vi opdaterer denne cookiepolitik løbende. Væsentlige ændringer vil blive 
              kommunikeret på hjemmesiden.
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
