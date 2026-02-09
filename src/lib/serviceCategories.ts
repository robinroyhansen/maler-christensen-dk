// Service categories for mega-menu navigation
// Each service links to its page slug

export interface ServiceCategory {
  name: string
  services: { name: string; slug: string }[]
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    name: "Bolig",
    services: [
      { name: "Indvendig maling", slug: "indvendig-maling" },
      { name: "Udvendig maling", slug: "udvendig-maling" },
      { name: "Maling af lejlighed", slug: "maling-af-lejlighed" },
      { name: "Maling af hus", slug: "maling-hus" },
      { name: "Maling af sommerhus", slug: "maling-af-sommerhus" },
      { name: "Maling flyttelejlighed", slug: "maling-flyttelejlighed" },
      { name: "Nybyg maling", slug: "nybyg-maling" },
    ],
  },
  {
    name: "Overflader",
    services: [
      { name: "Maling af loft", slug: "maling-af-loft" },
      { name: "Maling af facade", slug: "maling-af-facade" },
      { name: "Maling af vinduer", slug: "maling-af-vinduer" },
      { name: "Maling af trappe", slug: "maling-trappe" },
      { name: "Maling af carport", slug: "maling-af-carport" },
      { name: "Maling af radiator", slug: "maling-af-radiator" },
      { name: "Træmaling", slug: "traemaling" },
    ],
  },
  {
    name: "Specialydelser",
    services: [
      { name: "Spartling", slug: "spartling" },
      { name: "Sprøjtespartling", slug: "sprojtespartling" },
      { name: "Sprøjtemaling", slug: "sproejtmaling" },
      { name: "Tapetsering", slug: "tapetsering" },
      { name: "Microcement", slug: "microcement" },
      { name: "PU-gulve", slug: "pu-gulve" },
      { name: "Metallisk PU-gulv", slug: "metallisk-pu-gulv" },
      { name: "PCB-forsegling", slug: "pcbforsegling" },
    ],
  },
  {
    name: "Andet",
    services: [
      { name: "Malerarbejde", slug: "malerarbejde" },
      { name: "Erhvervsmaling", slug: "erhvervsmaling" },
      { name: "Billig maler", slug: "billig-maler" },
      { name: "Maler på Sjælland", slug: "maler-sjaelland" },
      { name: "Rengøring", slug: "rengoering" },
      { name: "Gulvslibning", slug: "gulvslibning" },
    ],
  },
]

// Get all services as a flat list
export function getAllServices(): { name: string; slug: string }[] {
  return SERVICE_CATEGORIES.flatMap(cat => cat.services)
}
