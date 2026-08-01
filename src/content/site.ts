/**
 * Single source of truth for every fact and every line of copy on the site.
 *
 * Facts are anchored to 3dtholdings.com, federal registers (SAM.gov, USDA
 * APHIS, OLAW, FDA 510(k)) and the primary literature. Where the company's own
 * site states something the record does not support, the record wins and the
 * copy says less rather than more. The prose is original.
 */

export const org = {
  name: "3DT Holdings",
  legal: "3DT Holdings, LLC",
  expansion: "Drugs and Devices for Diagnostics and Therapeutics",
  tagline: "We make the body measurable.",
  city: "San Diego, California",
  // Suite 213 per SAM.gov, USAspending and HHS TAGGS. Suite 112 appears only in
  // scraped aggregators; 211 is the neighboring institute, 204 is AccuLab.
  address: ["11107 Roselle Street, Suite 213", "San Diego, CA 92121"],
  phone: "(858) 249-7400",
  phoneHref: "tel:+18582497400",
  email: "info@3dtholdings.com",
  // US Census Geocoder and OSM Nominatim agree to within 200m of this.
  coords: "32.905° N, 117.230° W",
  founded: 2007,
};

export const nav = [
  { href: "/research", label: "Research", index: "01" },
  { href: "/ventures", label: "Ventures", index: "02" },
  { href: "/facilities", label: "Facilities", index: "03" },
  { href: "/services", label: "Services", index: "04" },
  { href: "/about", label: "About", index: "05" },
  { href: "/contact", label: "Contact", index: "06" },
];

export const hero = {
  lines: ["We make", "the body", "measurable."],
  lede: `A San Diego laboratory where cardiovascular and metabolic devices are invented, proven
    in large animals, and built into companies. Eleven engineers, clinicians and technicians.
    One building. Bench to first-in-human without a vendor contract.`,
  cta: { href: "/research", label: "See the programs" },
  secondary: { href: "/services", label: "Contract research" },
};

export const metrics = [
  {
    value: "200+",
    label: "Issued and pending patents",
    detail: "Conductance, retroperfusion, pericardial access, magnetic occlusion",
  },
  {
    value: "5",
    label: "Portfolio companies",
    detail: "Each built on a platform proven in the laboratory downstairs",
  },
  {
    value: "300+",
    label: "Full-length publications",
    detail: "From the founder's laboratory, 373 of them indexed in PubMed",
  },
  {
    value: "2025",
    label: "First FDA clearance",
    detail: "Fecobionics Anorectal System, K242666, cleared February 2025",
  },
];

/** The unifying idea, told in four beats on the home page. */
export const thesis = {
  lede: `Nearly everything here descends from one measurement. Pass a small current between two
    electrodes inside a vessel and the tissue answers. The answer is geometry: the exact
    cross-section of the lumen you are standing in, live, without contrast and without guesswork.`,
  beats: [
    {
      n: "01",
      title: "Inject",
      body: `Two excitation electrodes on the catheter shaft drive a low-amplitude alternating
        current, tens of microamps at tens of kilohertz, through blood and vessel wall.`,
    },
    {
      n: "02",
      title: "Sense",
      body: `Two detection electrodes sit a millimeter apart between them and read the voltage
        that survives. Current divided by voltage is conductance, and conductance scales with the
        area the current had to cross.`,
    },
    {
      n: "03",
      title: "Separate",
      body: `Some of that current leaks into the wall and the tissue beyond it. Two injections at
        different saline concentrations cancel the leak and leave the lumen alone. It is a novel
        approach to a correction the field has used since the 1980s, and it is what makes the
        number trustworthy.`,
    },
    {
      n: "04",
      title: "Act",
      body: `The interventionalist now sizes a stent, a valve annulus or a balloon against a
        measured area rather than an estimate read off a shadow.`,
    },
  ],
};

export type Program = {
  id: string;
  index: string;
  name: string;
  short: string;
  field: string;
  plate: string;
  problem: string;
  stat?: { value: string; label: string };
  approach: string;
};

export const programs: Program[] = [
  {
    id: "post-dilatation",
    index: "01",
    name: "Conductance Balloon Post-Dilatation Catheter",
    short: "Post-dilatation",
    field: "Interventional cardiology",
    plate: "coronary-section",
    problem: `A stent that is not opened to the size of the artery around it is the strongest
      predictor of restenosis there is. Underexpansion is a different failure from
      malapposition, and it is the one that matters most, yet the operator cannot see it on
      angiography, because angiography images the contrast column rather than the stent.`,
    stat: {
      value: "~50%",
      label:
        "of stented lesions fall short of the conventional expansion threshold. Median expansion across the 2,128 core-lab-read cases in ILUMIEN IV was 79.1% of the average reference lumen area",
    },
    approach: `A post-dilatation balloon with conductance electrodes on its shaft. As the balloon
      inflates it reports minimum stent area and minimum stent diameter continuously, so the
      operator stops when the number is right rather than when the balloon looks right.`,
  },
  {
    id: "trans-septal",
    index: "02",
    name: "Stabilization Device for Trans-septal Access",
    short: "Trans-septal access",
    field: "Structural heart",
    plate: "cardiac-muscle",
    problem: `Crossing from the right atrium to the left means pushing a needle through the
      septum on a beating, moving wall. The puncture site wanders. Every structural procedure
      that follows, atrial fibrillation ablation, septal defect repair, mitral valve repair,
      appendage closure, inherits that instability.`,
    approach: `A device that anchors to the septum first and punctures second, holding the access
      point still for the length of the procedure and returning the operator to a known position
      after every exchange.`,
  },
  {
    id: "hypothermia",
    index: "03",
    name: "Mild Hypothermia Catheter for Reperfusion Injury",
    short: "Selective hypothermia",
    field: "Acute myocardial infarction",
    plate: "capillary-bed",
    problem: `Opening a blocked coronary artery saves the patient and injures the muscle.
      Restoring flow to starved tissue triggers a second wave of cell death, and cooling the
      myocardium blunts it. Cooling the whole patient to get there causes shivering, arrhythmia
      and delay.`,
    stat: {
      value: "~250,000",
      label:
        "Americans present with ST-elevation myocardial infarction each year, between a quarter and a third of all heart attacks",
    },
    approach: `Selective auto-retroperfusion. Cooled arterial blood is routed backward through
      the cardiac venous system into the territory at risk, so the temperature drop lands where
      the infarct is and nowhere else. Efficacy has been shown in swine.`,
  },
  {
    id: "valvuloplasty",
    index: "04",
    name: "Sizing Valvuloplasty Conductance Balloon",
    short: "Annulus sizing",
    field: "Transcatheter valve therapy",
    plate: "field-lines",
    problem: `A transcatheter valve that is a millimeter too small leaks around its rim.
      Moderate or greater paravalvular leak roughly doubles the hazard of death, and it is
      decided by a sizing judgment made from CT slices weeks before the case.`,
    stat: {
      value: "~780k",
      label:
        "Americans over 75 are estimated to have severe aortic stenosis, of whom roughly 590,000 are symptomatic",
    },
    approach: `A valvuloplasty balloon that measures the aortic annulus by conductance during the
      pre-dilatation the operator was going to perform anyway. The prosthesis is chosen against a
      measurement taken minutes earlier, on the table, under the patient's own loading
      conditions.`,
  },
];

export type Venture = {
  id: string;
  index: string;
  name: string;
  entity: string;
  sector: string;
  plate: string;
  lede: string;
  body: string;
  lead: string;
};

export const ventures: Venture[] = [
  {
    id: "ids",
    index: "01",
    name: "Intelligent Delivery Systems",
    entity: "Intelligent Delivery Systems, Inc.",
    sector: "Coronary and peripheral intervention",
    plate: "catheter-macro",
    lede: "Guidewires that measure.",
    body: `Conductance moved out of the catheter and into the wire itself. The 35 Wire is a
      0.035-inch guidewire that crosses a lesion, serves as the rail for everything delivered
      after it, and reports cross-sectional area from inside the artery, so the operator sizes
      the balloon and the stent from the wire already in place. A 0.014-inch coronary version is
      in development.`,
    lead: "The 35 Wire",
  },
  {
    id: "grest",
    index: "02",
    name: "GRest",
    entity: "GRest, Inc.",
    sector: "Metabolic and bariatric",
    plate: "gi-villi",
    lede: "Bariatric outcomes without the amputation.",
    body: `Sleeve gastrectomy works and cannot be undone. GRest is developing a laparoscopic
      reversible gastric restrictive device expected to deliver comparable weight loss while
      staying reversible and leaving the anatomy intact, which matters most to the patients least
      willing to accept a permanent change. It is preclinical.`,
    lead: "RGR device",
  },
  {
    id: "retroperfusion",
    index: "03",
    name: "Retroperfusion",
    entity: "Retroperfusion, Inc.",
    sector: "Circulatory support",
    plate: "capillary-bed",
    lede: "Flow, running backward.",
    body: `Minimally invasive circulatory support catheters for ischemic heart disease and
      critical limb ischemia. The same retrograde principle serves two clocks: acute, as a bridge
      through an infarct or an intervention, and chronic, for limbs with no arterial option
      left.`,
    lead: "Retrograde perfusion catheters",
  },
  {
    id: "pac",
    index: "04",
    name: "Pericardial Access",
    entity: "Pericardial Access",
    sector: "Cardiac delivery",
    plate: "cardiac-muscle",
    lede: "A door in the heart wall.",
    body: `The pericardial space is the natural place to deliver gene therapy, cells and leads,
      and the hardest place to reach safely. The platform crosses outward from inside the right
      atrium rather than inward from the chest, turning a blind subxiphoid needle stick into a
      catheter procedure.`,
    lead: "Trans-atrial platform",
  },
  {
    id: "gi-bionics",
    index: "05",
    name: "GI Bionics",
    entity: "GI Bionics LLC",
    sector: "Gastroenterology",
    plate: "organoid",
    lede: "Fecobionics.",
    body: `Constipation and fecal incontinence are diagnosed today with tests that bear little
      resemblance to defecation. Fecobionics is a wireless simulated stool that records pressure,
      bending, orientation and geometry through an actual event, and returns physiology instead
      of a proxy. The Fecobionics Anorectal System was cleared by the FDA in February 2025, the
      first clearance to come out of the portfolio.`,
    lead: "Fecobionics · FDA cleared 2025",
  },
];

export const facilities = {
  lede: `Most device companies rent their evidence. They send a prototype to one vendor for bench
    testing, another for the animal study, a third for histology, and wait weeks between answers.
    Here all of it sits on one corridor, which is why an iteration takes days.`,
  /**
   * Held by the California Medical Innovations Institute, not by 3DT. 3DT
   * returns zero hits across USDA APHIS, the AAALAC directory and OLAW's
   * assurance dataset; CalMI2 returns all three. The arrangement is ordinary
   * and lawful, but the copy must not claim the registrations as 3DT's own.
   */
  accreditations: [
    { name: "USDA", detail: "Registered research facility, 93-R-0563" },
    { name: "AAALAC", detail: "Accredited animal care program" },
    { name: "OLAW", detail: "Assured under NIH policy, D16-00907" },
  ],
  accreditationNote: `All three are held by the California Medical Innovations Institute, the
    non-profit research institute in the same building with which 3DT shares a founder. Animal
    work runs in its facility and under its IACUC.`,
  groups: [
    {
      n: "01",
      id: "surgical",
      title: "Surgical",
      items: [
        "Two sterile surgical suites with wide-screen viewing displays",
        "Post-surgical recovery rooms",
        "Anesthesia monitoring and extended physiological monitoring",
      ],
    },
    {
      n: "02",
      id: "imaging",
      title: "Imaging",
      items: [
        "Two flat-panel C-arms in a poly-diagnostic configuration",
        "Multi-angle acquisition with DICOM archiving",
        "Intravascular ultrasound (IVUS)",
        "Trans-thoracic and trans-esophageal echocardiography",
        "Peripheral vascular Doppler ultrasound",
      ],
    },
    {
      n: "03",
      id: "pathology",
      title: "Pathology",
      items: [
        "Experimental Pathology and Immunopathology Laboratory (EPIL)",
        "Immunofluorescence and immunoperoxidase",
        "Single, double and triple-antibody methods",
        "Led by a board-certified pathologist",
      ],
    },
    {
      n: "04",
      id: "computational",
      title: "Computational",
      items: [
        "Computational fluid dynamics and finite element analysis",
        "Fluid-structure interaction",
        "Mass and heat transport, electromagnetic simulation",
        "High-performance computing through university partners",
      ],
    },
  ],
  scales: ["Molecule", "Cell", "Tissue", "Organ"],
  partners: [
    "Scripps Research",
    "Salk Institute",
    "UC San Diego",
    "UC Irvine",
    "San Diego Supercomputer Center",
  ],
  partnerNote: `Access is held through sponsored research agreements and collaborations, alongside
    a standing relationship with the California Medical Innovations Institute next door.`,
};

export const services = {
  lede: `The same suites, imaging and pathology core that de-risk the programs here are open to
    outside sponsors. Studies are designed, run and read in one place, which removes the handoffs
    where device programs usually lose their months.`,
  lines: [
    {
      n: "01",
      title: "In vivo",
      body: `Model development, feasibility, acute and chronic safety and efficacy, and physician
        training in a working surgical suite with full imaging.`,
    },
    {
      n: "02",
      title: "In vitro and bench",
      body: `Mock circulatory loops, durability, deliverability and instrumented benchtop
        characterization against the anatomy the device will actually meet.`,
    },
    {
      n: "03",
      title: "Pathology",
      body: `Histopathology and immunopathology through EPIL, with inflammation, coagulation,
        atherosclerosis and transplant expertise on the read.`,
    },
    {
      n: "04",
      title: "Computational",
      body: `Multiphysics simulation that narrows the design space before the first animal is
        enrolled, and explains the result afterward.`,
    },
  ],
  domains: [
    "Cardiovascular",
    "Peripheral vascular",
    "Gastrointestinal",
    "General surgery",
    "Interventional",
    "Medical devices",
    "Tissue engineering",
    "Drug delivery",
    "Anatomic pathology",
    "Histology",
  ],
};

export type Person = {
  name: string;
  role: string;
  bio: string;
  credential?: string;
};

export const vision = `To improve healthcare through innovations, by partnering with industry,
  clinicians and entrepreneurs to enhance quality of life for humankind.`;

export const about = {
  body: [
    `3DT Holdings was created to stimulate the establishment and growth of technology-based
      start-up companies in cardiovascular and obesity-related disease. That is the charter. In
      practice it means something narrower and more useful: the company invents devices, proves
      them in large animals, and builds the ones that survive into separate businesses.`,
    `Incubators usually supply desks, mentors and introductions. Those are here. What is unusual
      is the rest of it. Two surgical suites, two C-arms, an immunopathology core and a
      simulation group sit on the same corridor as the engineers, so a founder can take an idea
      to a large-animal answer without leaving the building or signing a vendor contract.`,
    `The animal facility itself is registered, accredited and assured to the California Medical
      Innovations Institute, the non-profit research institute in the same building, with which
      3DT shares a founder and an IACUC. Beyond it, sponsored research agreements and
      collaborations reach Scripps, Salk, UC San Diego, UC Irvine and the San Diego Supercomputer
      Center.`,
  ],
};

/**
 * Career lengths are given as start points or as the open-ended floors the
 * source itself uses. Freezing them into round numbers goes stale, and had:
 * two were already understated by four and seven years.
 */
export const people: Person[] = [
  {
    name: "Ghassan Kassab",
    credential: "Ph.D.",
    role: "Founder, Managing Member",
    bio: `Bioengineer. Took his BS, MS and PhD at UC San Diego, the doctorate summa cum laude,
      and held the Thomas J. Linnemeier Guidant Foundation Chair at IUPUI from 2006 as professor
      of biomedical engineering, of surgery, and of cellular and integrative physiology. Fellow
      of the American Institute for Medical and Biological Engineering. More than 300 full-length
      publications and 250 issued or pending patents across the cardiovascular and
      gastrointestinal systems. Founded the California Medical Innovations Institute, where he
      now chairs the board.`,
  },
  {
    name: "William Combs",
    role: "Director of Engineering",
    bio: `Twenty-nine years at Medtronic in systems engineering and product planning leadership,
      where he worked on the impedance monitoring that reached its pacemakers and defibrillators.
      Medtronic Technical Fellow, twice named Technical Contributor of the Year. Clinical
      associate professor at the IUPUI School of Biomedical Engineering. MSEE, Purdue.`,
  },
  {
    name: "Neil Drake",
    role: "Senior Engineer",
    bio: `On Class III implantables since 1997: Arterial Vascular Engineering, then Medtronic
      Vascular, Dexcom, Obalon Therapeutics and Companion Medical. Served as vice-president of
      research and development at Obalon from 2016. Ten US and international patents.`,
  },
  {
    name: "Greg Kelly",
    role: "Senior Engineer",
    bio: `Three decades of device design. The company credits him as an early member of the
      CoreValve team, working on the development of transcatheter aortic valve implantation.
      BA in physics, University of Colorado.`,
  },
  {
    name: "Frederic Field",
    role: "Director of Development",
    bio: `Twenty-five years developing devices inside start-ups: drug delivery infusion pumps,
      injection needle safety, minimally invasive surgical instruments. Former vice-president of
      research and development at Safety Syringes, acquired by Becton Dickinson in 2012. BS in
      bioengineering and MS in applied mechanics, UC San Diego.`,
  },
  {
    name: "Terry Hubbard",
    role: "Senior Engineer, Project Manager",
    bio: `More than thirty years in device design and commercialization across high-volume
      infusion products, ventricular assist devices, soft tissue prosthesis and artificial
      organs. Has worked FDA premarket approval submissions and multi-site clinical research.`,
  },
  {
    name: "Mengjun Wang",
    credential: "M.D., M.S.",
    role: "Research Scientist",
    bio: `Two decades of cardiovascular device and pharmaceutical efficacy and safety work,
      including twelve years at the Henry Ford Heart and Vascular Institute. MD and MS from Hebei
      Medical University and Peking University, MS in medical informatics from the University of
      Nebraska at Omaha.`,
  },
  {
    name: "Edwin De los Santos",
    role: "Engineering Technician",
    bio: `Twenty-five years building devices across electronics, aerospace and mechanical
      manufacturing. Eight years at Abbott Vascular and six at Medtronic Vascular, then research
      and development technician roles at Endicor Medical and Sequent Medical. Builds catheters
      and guidewires.`,
  },
  {
    name: "Ryan Huffman",
    role: "Engineering Technician",
    bio: `More than seven years in medical device research and development.`,
  },
  {
    name: "Ismail Qaddoura",
    credential: "MSIS",
    role: "Senior IT Manager",
    bio: `Three decades in information technology, previously running his own San Diego IT
      company. LAN and WAN architecture, network security, firewall and VPN management. Master's
      degree in information systems.`,
  },
  {
    name: "Alex Lillo",
    role: "Office Manager",
    bio: `Twenty years in banking building client relationships, latterly in senior international
      private banking. Bilingual in English and Spanish. BS in business administration with a
      finance concentration, San Diego State.`,
  },
];

export const contact = {
  lede: `Sponsors, founders and clinicians all reach the same desk. Tell us what you are trying
    to measure or move, and whether you need a study, a laboratory or a company.`,
  routes: [
    { label: "Contract research", detail: "Study design, quotes and scheduling" },
    { label: "Venture and licensing", detail: "Platform access, portfolio, licensing" },
    { label: "Careers", detail: "Engineering, surgical and laboratory roles" },
  ],
};

export const disclaimer = `Independent design concept. Not affiliated with, endorsed by, or an
  official property of 3DT Holdings, LLC. Company facts are drawn from public sources and
  checked against federal registers and the primary literature; the design, prose and imagery
  are original.`;
