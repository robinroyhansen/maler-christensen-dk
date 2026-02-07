import { CITIES, COMPANY } from "@/lib/constants"

export interface FAQ {
  question: string
  answer: string
}

export interface CityFAQs {
  cityName: string
  slug: string
  faqs: FAQ[]
}

// Helper to generate unique FAQs per city based on distance
function generateCityFAQs(city: typeof CITIES[0]): CityFAQs {
  const isLocal = city.distance <= 20
  const isNearby = city.distance > 20 && city.distance <= 40
  const isMedium = city.distance > 40 && city.distance <= 70
  // const isFar = city.distance > 70

  const faqs: FAQ[] = []

  // Question 1: Price question (always included)
  if (isLocal) {
    faqs.push({
      question: `Hvad koster en maler i ${city.name}?`,
      answer: `Prisen på malerarbejde i ${city.name} afhænger af projektets størrelse og kompleksitet. Da vi er lokale og har base tæt på ${city.name}, kan vi tilbyde konkurrencedygtige priser uden store transportomkostninger. Kontakt os for et gratis og uforpligtende tilbud – vi kommer gerne forbi og vurderer opgaven.`,
    })
  } else if (isNearby) {
    faqs.push({
      question: `Hvad koster det at få malet i ${city.name}?`,
      answer: `Malerarbejde i ${city.name} prissættes individuelt baseret på kvadratmeter, overfladetype og ønsket finish. Som udgangspunkt påvirker afstanden på ${city.distance} km ikke prisen væsentligt. Ring til os på ${COMPANY.phone} eller udfyld vores kontaktformular for at få et gratis tilbud.`,
    })
  } else {
    faqs.push({
      question: `Hvad koster malerarbejde i ${city.name}?`,
      answer: `Prisen på malerarbejde varierer efter projektets omfang. Selvom vi kører fra Slagelse, holder vi priserne konkurrencedygtige ved at planlægge projekter i ${city.name}-området effektivt. Ved større projekter giver afstanden ikke mærkbare meromkostninger. Få et gratis tilbud ved at kontakte os.`,
    })
  }

  // Question 2: Time/duration question
  if (isLocal || isNearby) {
    faqs.push({
      question: `Hvor lang tid tager det at male et hus i ${city.name}?`,
      answer: `Tidsforbruget afhænger af husets størrelse og opgavens kompleksitet. Et typisk parcelhus tager 3-5 dage for indvendig maling, mens udvendig maling kan tage 5-7 dage afhængig af vejret. Da vi er tæt på ${city.name}, kan vi hurtigt starte og arbejde effektivt uden lange pendletider.`,
    })
  } else {
    faqs.push({
      question: `Hvor lang tid tager et malerprojekt i ${city.name}?`,
      answer: `Et almindeligt malerprojekt i ${city.name} tager typisk 3-7 arbejdsdage afhængig af opgavens størrelse. Ved større projekter planlægger vi arbejdet over flere sammenhængende dage for at minimere rejsetid og sikre et effektivt forløb. Vi giver altid en realistisk tidsramme i vores tilbud.`,
    })
  }

  // Question 3: Free quote question (varied)
  if (city.distance <= 50) {
    faqs.push({
      question: `Tilbyder I gratis tilbud på malerarbejde i ${city.name}?`,
      answer: `Ja, vi tilbyder altid gratis og uforpligtende tilbud. Vi kommer gerne ud til dig i ${city.name} for at vurdere opgaven og give et præcist tilbud. Ring til os på ${COMPANY.phone} eller udfyld formularen på hjemmesiden, så kontakter vi dig inden for 24 timer.`,
    })
  } else {
    faqs.push({
      question: `Kan I give et gratis tilbud i ${city.name}?`,
      answer: `Ja, vi giver gratis tilbud til alle kunder – også i ${city.name}. Ved mindre projekter kan vi ofte give et overslag baseret på fotos og beskrivelse. Ved større opgaver kommer vi naturligvis ud og ser projektet an. Kontakt os for at høre mere.`,
    })
  }

  // Question 4: Quality/certification question
  faqs.push({
    question: `Er I medlem af Danske Malermestre?`,
    answer: `Ja, ${COMPANY.name} er medlem af Danske Malermestre, hvilket er din garanti for kvalitet og fagligt korrekt udført arbejde. Medlemskabet sikrer, at vi følger branchens standarder og løbende opdaterer vores kompetencer. Det giver dig som kunde tryghed ved at vælge os.`,
  })

  // Question 5: Scheduling flexibility
  if (isLocal) {
    faqs.push({
      question: `Kan I male i weekenden i ${city.name}?`,
      answer: `Vi tilbyder fleksibel planlægning og kan i særlige tilfælde udføre arbejde i weekenden eller uden for normal arbejdstid. Da vi er lokale i ${city.name}-området, er det nemt at tilpasse arbejdstiderne efter dine behov. Kontakt os for at høre om mulighederne.`,
    })
  } else {
    faqs.push({
      question: `Er jeres malere fleksible med arbejdstider?`,
      answer: `Vi bestræber os på at imødekomme vores kunders behov og kan tilbyde fleksible arbejdstider efter aftale. Ved projekter i ${city.name} planlægger vi arbejdet, så det passer ind i din hverdag. Fortæl os om dine ønsker, når du indhenter tilbud.`,
    })
  }

  // Question 6: Coverage area question (varied by distance)
  if (isLocal) {
    faqs.push({
      question: `Hvilke områder dækker I fra ${city.name}?`,
      answer: `Med base i Slagelse dækker vi hele Sjælland, inklusiv ${city.name} og alle omkringliggende byer. Da ${city.name} kun ligger ${city.distance} km fra os, servicerer vi området regelmæssigt og har mange tilfredse kunder i netop dit område.`,
    })
  } else if (isMedium) {
    faqs.push({
      question: `Hvor langt kører I for at lave malerarbejde?`,
      answer: `Vi dækker hele Sjælland fra vores base i Slagelse. ${city.name} ligger ca. ${city.distance} km væk, og vi har mange gode kunder i området. Ved at koordinere flere projekter i samme område holder vi priserne konkurrencedygtige trods afstanden.`,
    })
  } else {
    faqs.push({
      question: `Servicerer I virkelig hele Storkøbenhavn og Nordsjælland?`,
      answer: `Ja, vi har udvidet vores serviceområde til at dække hele Sjælland – inklusiv ${city.name}. Selvom vi har base i Slagelse (ca. ${city.distance} km væk), har vi mange tilfredse kunder i dit område. Ved større projekter påvirker afstanden ikke prisen nævneværdigt.`,
    })
  }

  return {
    cityName: city.name,
    slug: city.slug,
    faqs,
  }
}

// Generate FAQ content for all cities
export const CITY_FAQS: { [slug: string]: CityFAQs } = {}

CITIES.forEach((city) => {
  CITY_FAQS[city.slug] = generateCityFAQs(city)
})

export function getCityFAQs(slug: string): CityFAQs | null {
  return CITY_FAQS[slug] || null
}
