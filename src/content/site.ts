/**
 * Single source of truth for every fact and every line of copy on the site.
 * Facts are anchored to 3dtholdings.com and public records; the prose is new.
 */

export const org = {
  name: "3DT Holdings",
  legal: "3DT Holdings, LLC",
  expansion: "Drugs and Devices for Diagnostics and Therapeutics",
  tagline: "We make the body measurable.",
  city: "San Diego, California",
  address: ["11107 Roselle Street, Suite 112", "San Diego, CA 92121"],
  phone: "(858) 249-7400",
  phoneHref: "tel:+18582497400",
  email: "info@3dtholdings.com",
  coords: "32.8942° N, 117.2078° W",
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
  eyebrow: "Drugs and Devices for Diagnostics and Therapeutics",
  lines: ["We make", "the body", "measurable."],
  lede: `A San Diego laboratory where cardiovascular and metabolic devices are invented,
    proven in vivo, and spun out as companies. Eleven engineers, surgeons and pathologists.
    One building. Bench to first-in-human under a single roof.`,
  cta: { href: "/research", label: "See the programs" },
  secondary: { href: "/services", label: "Contract research" },
};

export const metrics = [
  { value: "200+", label: "Issued and pending patents", detail: "Conductance, retroperfusion, pericardial access, magnetic occlusion" },
  { value: "5", label: "Companies spun out", detail: "Each built on a platform proven in our own surgical suites" },
  { value: "500+", label: "Peer-reviewed publications", detail: "From the founder's laboratory across three decades" },
  { value: "40", label: "Teraflop compute", detail: "Multiphysics simulation before a single animal is enrolled" },
];

/** The unifying idea, told in four beats on the home page. */
export const thesis = {
  eyebrow: "The through-line",
  title: "Conductance",
  lede: `Nearly everything here descends from one measurement. Pass a small current between two
    electrodes inside a vessel and the tissue answers. The answer is geometry: the exact
    cross-section of the lumen you are standing in, live, without contrast and without guesswork.`,
  beats: [
    {
      n: "01",
      title: "Inject",
      body: `Two excitation electrodes on a catheter shaft drive a low-amplitude alternating current
        through blood and vessel wall.`,
    },
    {
      n: "02",
      title: "Sense",
      body: `Two detection electrodes read the voltage that survives the trip. The ratio is conductance,
        and conductance scales with the area the current had to cross.`,
    },
    {
      n: "03",
      title: "Separate",
      body: `Two injections at different saline concentrations cancel the parallel conductance of the
        wall, leaving the lumen alone. This is the trick the field lacked.`,
    },
    {
      n: "04",
      title: "Act",
      body: `The interventionalist now sizes a stent, a valve annulus or a balloon against a real number
        rather than an estimate from a shadow.`,
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
  status: string;
};

export const programs: Program[] = [
  {
    id: "post-dilatation",
    index: "01",
    name: "Conductance Balloon Post-Dilatation Catheter",
    short: "Post-dilatation",
    field: "Interventional cardiology",
    plate: "coronary-section",
    problem: `A stent that does not sit flush against the artery wall is a stent that will fail.
      Malapposition drives restenosis and thrombosis, and the operator cannot see it on angiography
      because angiography images the contrast column, not the metal-to-tissue interface.`,
    stat: {
      value: "~35%",
      label: "of stented lesions are underexpanded on IVUS, at the conventional threshold of a minimum stent area below 80% of the reference lumen",
    },
    approach: `A post-dilatation balloon with conductance electrodes on its shaft. As the balloon
      inflates it reports minimum stent area and minimum stent diameter continuously, so the operator
      stops inflating when the number is right rather than when the balloon looks right.`,
    status: "Bench and large-animal validation complete",
  },
  {
    id: "trans-septal",
    index: "02",
    name: "Stabilization Device for Trans-septal Access",
    short: "Trans-septal access",
    field: "Structural heart",
    plate: "cardiac-muscle",
    problem: `Crossing from the right atrium to the left means pushing a needle through the septum
      on a beating, moving wall. The puncture site wanders. Every structural procedure that follows,
      atrial fibrillation ablation, septal defect repair, mitral valve repair, appendage closure,
      inherits that instability.`,
    approach: `A device that anchors to the septum first and punctures second, holding the access
      point still for the length of the procedure and returning the operator to a known position
      after every exchange.`,
    status: "Design freeze, pre-clinical",
  },
  {
    id: "hypothermia",
    index: "03",
    name: "Mild Hypothermia Catheter for Reperfusion Injury",
    short: "Selective hypothermia",
    field: "Acute myocardial infarction",
    plate: "capillary-bed",
    problem: `Opening a blocked coronary artery saves the patient and injures the muscle. Restoring
      flow to starved tissue triggers a second wave of cell death, and cooling the myocardium blunts
      it. Cooling the whole patient to get there causes shivering, arrhythmia and delay.`,
    stat: { value: "~500,000", label: "Americans suffer ST-elevation MI each year" },
    approach: `Selective auto-retroperfusion. Cooled arterial blood is routed backward through the
      cardiac venous system into the territory at risk, so the temperature drop lands where the
      infarct is and nowhere else.`,
    status: "Large-animal efficacy studies",
  },
  {
    id: "valvuloplasty",
    index: "04",
    name: "Sizing Valvuloplasty Conductance Balloon",
    short: "Annulus sizing",
    field: "Transcatheter valve therapy",
    plate: "field-lines",
    problem: `A transcatheter valve that is a millimetre too small leaks around its rim. Paravalvular
      leak after implantation is associated with worse survival, and it is decided by a sizing
      judgement made from CT slices weeks before the case.`,
    stat: { value: "~1.5M", label: "Americans living with aortic stenosis" },
    approach: `A valvuloplasty balloon that measures the aortic annulus by conductance during the
      pre-dilatation the operator was going to perform anyway. The prosthesis is chosen against a
      measurement taken minutes earlier, on the table, in the patient's own loading conditions.`,
    status: "Bench validation, pre-clinical",
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
    entity: "IDS, Inc.",
    sector: "Peripheral vascular",
    plate: "catheter-macro",
    lede: "Guidewires that measure.",
    body: `Conductance moved out of the catheter and into the wire itself. The 35 Wire crosses a
      peripheral lesion and reports vessel diameter along its own length, so the operator sizes the
      balloon and the stent from the wire already in the artery instead of from an estimate.`,
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
    body: `Sleeve gastrectomy works and cannot be undone. GRest is a laparoscopic reversible gastric
      restrictive device that aims for comparable weight loss while leaving the stomach intact, which
      matters most for the patients who are least willing to accept a permanent anatomical change.`,
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
    body: `Minimally invasive circulatory support for ischaemic heart disease and critical limb
      ischaemia. The same retrograde principle serves two clocks: acute, as a bridge through an
      infarct or an intervention, and chronic, for limbs with no arterial option left.`,
    lead: "SARP platform",
  },
  {
    id: "pac",
    index: "04",
    name: "Pericardial Access",
    entity: "PAC, Inc.",
    sector: "Cardiac delivery",
    plate: "cardiac-muscle",
    lede: "A door in the heart wall.",
    body: `The pericardial space is the natural place to deliver gene therapy, cells and leads, and
      the hardest place to reach safely. PAC crosses from inside the atrium outward rather than from
      the chest inward, turning a blind subxiphoid needle stick into a catheter procedure.`,
    lead: "Trans-atrial platform",
  },
  {
    id: "gi-bionics",
    index: "05",
    name: "GI Bionics",
    entity: "GI Bionics, LLC",
    sector: "Gastroenterology",
    plate: "organoid",
    lede: "Fecobionics.",
    body: `Constipation and faecal incontinence are diagnosed today with tests that bear little
      resemblance to defecation. Fecobionics is a wireless simulated stool that records pressure,
      bending, orientation and geometry through an actual event, and returns physiology instead
      of a proxy.`,
    lead: "Fecobionics",
  },
];

export const facilities = {
  eyebrow: "11107 Roselle Street",
  title: "One building, bench to first-in-human",
  lede: `Most device companies rent their evidence. They send a prototype to one vendor for bench
    testing, another for the animal study, a third for histology, and wait weeks between answers.
    3DT put all of it in one building, which is why an iteration here takes days.`,
  accreditations: [
    { name: "USDA", detail: "Registered research facility" },
    { name: "AAALAC", detail: "Accredited animal care program" },
    { name: "OLAW", detail: "Assured under NIH policy" },
  ],
  groups: [
    {
      n: "01",
      id: "surgical",
      title: "Surgical",
      items: [
        "Two sterile surgical suites with wide-screen intra-operative viewing",
        "Post-surgical recovery rooms",
        "Full anaesthesia and extended physiological monitoring",
      ],
    },
    {
      n: "02",
      id: "imaging",
      title: "Imaging",
      items: [
        "Two flat-panel C-arms, poly-diagnostic configuration",
        "Multi-angle acquisition with DICOM archiving",
        "Intravascular ultrasound (IVUS)",
        "Trans-thoracic and trans-oesophageal echocardiography",
        "Peripheral vascular Doppler",
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
        "Board-certified pathologist read on every study",
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
        "40+ teraflop platform",
      ],
    },
  ],
  scales: [
    { scale: "Molecule", detail: "Transport and binding" },
    { scale: "Cell", detail: "Mechanotransduction" },
    { scale: "Tissue", detail: "Constitutive behaviour" },
    { scale: "Organ", detail: "Haemodynamics and function" },
  ],
  partners: [
    "California Medical Innovations Institute",
    "Scripps Research",
    "Salk Institute",
    "UC San Diego",
    "UC Irvine",
    "San Diego Supercomputer Center",
  ],
};

export const services = {
  eyebrow: "Contract research",
  title: "Use the laboratory without building one",
  lede: `The same suites, imaging and pathology core that de-risk our own programs are available to
    outside sponsors. Studies are designed here, run here and read here, which removes the handoffs
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
        characterisation against the anatomy the device will actually meet.`,
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

export const vision = `To improve healthcare through innovation, by partnering with industry,
  clinicians and entrepreneurs to enhance quality of life for humankind.`;

export const about = {
  eyebrow: "About",
  title: "An incubator that owns its own operating room",
  body: [
    `3DT Holdings was created to stimulate the establishment and growth of technology-based start-up
      companies in cardiovascular and obesity-related disease. That is the charter. In practice it
      means something narrower and more useful: the company invents devices, proves them in its own
      laboratory, and spins out the ones that survive contact with an animal.`,
    `Incubators usually supply desks, mentors and introductions. Those are here. What is unusual is
      the rest of it, a USDA-registered and AAALAC-accredited facility with two surgical suites, two
      C-arms, a pathology core and a supercomputing allocation, sitting behind the same door as the
      engineers. A founder can take an idea to a large-animal answer without leaving the building or
      signing a vendor contract.`,
    `The company works alongside the California Medical Innovations Institute, a non-profit research
      institute in San Diego with which it shares a founder, and draws on sponsored research
      relationships with Scripps, Salk, UC San Diego, UC Irvine and the San Diego Supercomputer
      Center.`,
  ],
};

export const people: Person[] = [
  {
    name: "Ghassan Kassab",
    credential: "Ph.D.",
    role: "Founder, Managing Member",
    bio: `Bioengineer. Took his BS, MS and PhD at UC San Diego, the doctorate summa cum laude, and
      held the Thomas J. Linnemeier Guidant Foundation Chair at IUPUI as professor of both biomedical
      engineering and surgery. NIH Young Investigator, AHA Established Investigator, fellow of the
      AIMBE. More than 500 publications and 250 issued or pending patents across the cardiovascular
      and gastrointestinal systems. Founder, president and CSO of the California Medical Innovations
      Institute.`,
  },
  {
    name: "Jose Antonio Navia",
    credential: "M.D.",
    role: "Cardiothoracic Surgeon",
    bio: `Forty-three years operating. Medical degree and doctoral thesis at the National University
      of La Plata, cardiac and thoracic fellowship at the Cleveland Clinic. Staff surgeon at Clínica
      Güemes, Buenos Aires, and head of cardiovascular surgery at Hospital Italiano. Fellow of the
      American College of Cardiology, past president of the Argentine Society of Cardiology and of
      the National Academy of Medicine.`,
  },
  {
    name: "William Combs",
    role: "Director of Engineering",
    bio: `Thirty-five years in device therapy, twenty-nine of them at Medtronic in systems engineering
      and product planning leadership. Medtronic Technical Fellow, forty issued patents, twice named
      Technical Contributor of the Year. Clinical associate professor at the IUPUI School of
      Biomedical Engineering. MSEE, Purdue.`,
  },
  {
    name: "Neil Drake",
    role: "Senior Engineer",
    bio: `Twenty-five years on Class III implantables at Arterial Vascular Engineering, Medtronic
      Vascular, Dexcom, Obalon Therapeutics and Companion Medical, most recently as VP of R&D at
      Obalon. Ten US and international patents.`,
  },
  {
    name: "Greg Kelly",
    role: "Senior Engineer",
    bio: `Thirty years of device design. An early member of the CoreValve team, where he worked on
      the development of transcatheter aortic valve implantation. BA in physics, University of
      Colorado.`,
  },
  {
    name: "Frederic Field",
    role: "Director of Development",
    bio: `Twenty-five years developing devices inside start-ups: drug delivery infusion pumps,
      injection needle safety, minimally invasive surgical instruments. Former VP of R&D at Safety
      Syringes, acquired by Becton Dickinson. BS in bioengineering and MS in applied mechanics,
      UC San Diego.`,
  },
  {
    name: "Terry Hubbard",
    role: "Senior Engineer, Project Manager",
    bio: `Thirty years in device design and commercialisation across high-volume infusion products,
      ventricular assist devices, soft tissue prosthesis and artificial organs. Has worked FDA PMA
      submissions and multi-site clinical research.`,
  },
  {
    name: "Mengjun Wang",
    credential: "M.D., M.S.",
    role: "Research Professor",
    bio: `Twenty years of cardiovascular device and pharmaceutical efficacy and safety work,
      including twelve at the Henry Ford Heart and Vascular Institute. MD and MS from Hebei Medical
      University and Peking University, MS in medical informatics from the University of Nebraska
      at Omaha.`,
  },
  {
    name: "Edwin De los Santos",
    role: "Engineering Technician",
    bio: `Twenty-five years building devices across electronics, aerospace and mechanical
      manufacturing. Eight years at Abbott Vascular and six at Medtronic Interventional Vascular,
      then R&D technician roles at Endicor Medical and Sequent Medical. Builds catheters and
      guidewires by hand.`,
  },
  {
    name: "Ryan Huffman",
    role: "Engineering Technician",
    bio: `Seven years in medical device research and development, working across prototype
      fabrication and study support.`,
  },
  {
    name: "Ismail Qaddoura",
    credential: "M.S.I.S.",
    role: "Senior IT Manager",
    bio: `Thirty years in information technology, previously running his own San Diego IT company.
      LAN and WAN architecture, network security, firewall and VPN management. Master's in
      information systems.`,
  },
  {
    name: "Alex Lillo",
    role: "Office Manager",
    bio: `Twenty years in banking building client relationships, latterly in senior international
      private banking with a book of 230 high-net-worth clients. Bilingual. BS in business
      administration, San Diego State.`,
  },
];

export const contact = {
  eyebrow: "Contact",
  title: "Bring us a problem in a vessel",
  lede: `Sponsors, founders and clinicians reach the same three people here. Tell us what you are
    trying to measure or move, and whether you need a study, a laboratory or a company.`,
  routes: [
    { label: "Contract research", detail: "Study design, quotes and scheduling" },
    { label: "Venture and licensing", detail: "Platform access, spin-outs, portfolio" },
    { label: "Careers", detail: "Engineering, surgical and pathology roles" },
  ],
};

export const disclaimer = `Independent design concept. Not affiliated with, endorsed by, or an
  official property of 3DT Holdings, LLC. Company facts are drawn from public sources; the design,
  prose and imagery are original work.`;
