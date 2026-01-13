import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Award, Users, Info, Trophy } from 'lucide-react';

const committeeMembers = [
  "AC Bobadilla",
  "Adam Chicco",
  "Debbie Lee",
  "Aimee Oke",
  "Katriana Popichak",
  "Kelly Santangelo",
  "Vanessa Selwyn",
  "Wendy Stevenson",
  "Rio Tang"
];

interface Winner {
  place: string;
  name: string;
  title: string;
}

interface Category {
  name: string;
  winners: Winner[];
}

interface AwardSection {
  section: string;
  categories: Category[];
}

const winners2025: AwardSection[] = [
  {
    section: "Undergraduate Poster Presentations",
    categories: [
      {
        name: "Foundational Research",
        winners: [
          { place: "1st", name: "Emma Hinchliffe", title: "Haploinsufficiency of the autism-associated δ-catenin mutation is sufficient to induce social dysfunction in mice" },
          { place: "2nd", name: "Olivia Martinez", title: "Investigating the effects of temperature change on oviposition and progeny development of Aedes aegypti and Culex tarsalis mosquitoes" },
          { place: "3rd", name: "Lauren Bennett", title: "Evaluating the presence of Chronic Wasting Disease in free-range White-tailed deer in Arkansas" }
        ]
      },
      {
        name: "Clinical Research",
        winners: [
          { place: "1st", name: "Olufunmilayo Garner", title: "Uncovering the enemy: investigating methods to increase GD2 expression in canine tumor cell lines using epigenetic modifiers" },
          { place: "2nd", name: "Isla Wilson", title: "Duration and efficacy of a single pulsed electromagnetic field (PEMF) therapy on lameness associated with osteoarthritis of the tarsus" },
          { place: "3rd", name: "Emma Bovaird", title: "Analyzing changes in amino acid blood metabolites relevant to cognitive development in children aged 24-59 months being treated for severe acute malnutrition with and without rice bran supplementation" }
        ]
      },
      {
        name: "Translational Research",
        winners: [
          { place: "1st", name: "Lauren Hives", title: "Metal Matters: Unraveling the Role of Transition Metals in Staphylococcus aureus Biofilm Formation" },
          { place: "2nd", name: "Alex Baeckler", title: "Optimization of an in vitro model of the osteosarcoma metastatic microenvironment" },
          { place: "3rd", name: "Lydia Jenkins", title: "Analysis of Neuronal response in an in vitro model of chronic pain" }
        ]
      }
    ]
  },
  {
    section: "Poster Presentations",
    categories: [
      {
        name: "Early Stage Foundational Research",
        winners: [
          { place: "1st", name: "Emma Szegvari", title: "Evaluating fibrilization kinetics of novel α-synuclein mutations by cell infection and liposome membrane binding assays" },
          { place: "2nd", name: "Caroline Kern-Allely", title: "Clear the Air: Respiratory Disease and Air Pollution in Dairy Calves" },
          { place: "3rd (tie)", name: "Omar Yanouri", title: "Aldehyde Dehydrogenase 1 and 2 Double Knockout Protects Against Dopaminergic Neuron Loss Induced By Sub-Chronic Dieldrin Exposure" },
          { place: "3rd (tie)", name: "Anna Castro Romero", title: "Elucidating the mechanisms of frequency-invariant coding in the periaqueductal gray" }
        ]
      },
      {
        name: "Advanced Stage Foundational Research",
        winners: [
          { place: "1st", name: "Elena Lian", title: "Implications of clinically-relevant mutations in ubiA, a cell envelope biosynthetic gene, for Mycobacterium abscessus infection" },
          { place: "2nd", name: "Jessica Kincade", title: "Postnatal moo-omics of cattle fetally infected with bovine viral diarrhea virus" },
          { place: "3rd", name: "Megan Aalto", title: "Establishment of updated hematology and biochemistry reference intervals for New Zealand White rabbits" }
        ]
      },
      {
        name: "Early Stage Clinical Research",
        winners: [
          { place: "1st", name: "McKennon Wiles", title: "American Ginseng (Panax quinquefolius) extracts reverse stress-induced behavioral abnormalities" },
          { place: "2nd", name: "Jean Carlos Alvarado Colon", title: "Effects of EIDD-2801 on clinical remission and FCV shedding on cats with chronic gingivostomatitis" },
          { place: "3rd", name: "Dayoung Oh", title: "Comparative outcomes of stereotactic body radiation therapy alone versus stereotactic body radiation therapy with toceranib for feline oral squamous cell carcinoma" }
        ]
      },
      {
        name: "Advanced Stage Clinical Research",
        winners: [
          { place: "1st", name: "Samantha Masca", title: "Validating a computer-assisted surgical navigation system in the equine cervical spine" },
          { place: "2nd", name: "Kate McCaw", title: "The translation of a curvilinear osteotomy from plan to patient using guided TPLO is more accurate compared to the traditional technique" },
          { place: "3rd", name: "Katya Spitznagel", title: "Influence of butorphanol with or without methadone on fentanyl induction dose in dogs undergoing interventional treatment of pulmonic stenosis" }
        ]
      },
      {
        name: "Early Stage Translational Research",
        winners: [
          { place: "1st", name: "Chris Ruscher", title: "Maternal obesity is associated with inflammation in embryos of the preeclamptic-like BPH/5 mouse" },
          { place: "2nd", name: "Emmanuel Oyewole", title: "TLR2 and TLR3 drive distinct inflammatory pathways following organic dust exposure: Targets for therapeutic intervention in occupational lung diseases" },
          { place: "3rd", name: "Scott Roh", title: "Prenatal exposure to valproic acid reduces synaptic δ-catenin levels and disrupts ultrasonic vocalization in neonates" }
        ]
      },
      {
        name: "Advanced Stage Translational Research",
        winners: [
          { place: "1st", name: "Christian Sewor", title: "Cross-sectional associations between 48-hour fine particulate matter exposure and blood pressure among adults in rural Rwanda" },
          { place: "2nd", name: "Jorge Mendieta Calle", title: "Synaptic plasticity within cocaine-seeking neuronal ensembles" },
          { place: "3rd", name: "Ahmed Gad", title: "Investigating the role of circadian rhythms in bovine oviductal organoids and their functional implications" }
        ]
      }
    ]
  },
  {
    section: "Oral Presentations",
    categories: [
      {
        name: "Early Stage Foundational Research",
        winners: [
          { place: "1st", name: "Hannah Braun", title: "Identification and evaluation of transcriptomic markers for assessing bovine embryo quality from individual embryos or biopsies" },
          { place: "2nd", name: "Maelle Coupannec", title: "Radium Purification: Turning Radioactive Mine Tailings into Targeted Cancer Treatment" },
          { place: "3rd", name: "Isabella Sabino", title: "Innate immune pathway activation to modulate mesenchymal stromal cell (MSC) interaction with synovial cells in osteoarthritis" }
        ]
      },
      {
        name: "Advanced Stage Foundational Research",
        winners: [
          { place: "1st", name: "Hayley Templeton", title: "Calcitonin Gene Related Peptide Mediates Gut Alpha Synuclein Aggregation in a Mouse Model of Parkinson's Disease" },
          { place: "2nd", name: "Chase Khedmatgozar", title: "Axonal transport of alpha-synuclein prion strains" },
          { place: "3rd", name: "Eric Palmer", title: "Osteosarcoma exosomes induce a tumor-promoting, inflammatory phenotype in lung fibroblasts and enhance OS metastatic colonization of the lung" }
        ]
      },
      {
        name: "Early Stage Clinical Research",
        winners: [
          { place: "1st", name: "Camille Stewart", title: "It runs in horses - investigating potential causes of equine fecal water syndrome" },
          { place: "2nd", name: "Kaytlyn Salmons", title: "Household air pollution and telomere length among women in Guatemala and Peru: the Household Air Pollution Intervention Network (HAPIN) trial" },
          { place: "3rd", name: "Margaret Cook", title: "Admission variables associated with outcome in canines with bite wound trauma (12,412 cases): an ACVECC-VetCOT registry study" }
        ]
      },
      {
        name: "Advanced Stage Clinical Research",
        winners: [
          { place: "1st", name: "Grace Jakes", title: "Stress, Bovine Respiratory Disease, and Pulmonary Mucosal Innate Immunity: Single-Cell Transcriptomic Responses in the Bovine Lung" },
          { place: "2nd", name: "Kelly Debie", title: "Analyzing Racial and Ethnic Disparities and Cause-Specific Infant Mortality in Texas After Implementation of a Six-Week Abortion Ban" },
          { place: "3rd", name: "Jesse Johnson", title: "Spleens with disseminated lymphoma exhibit higher SUVmax, MTV, and TLG on 18F-FDG PET/CT" }
        ]
      },
      {
        name: "Early Stage Translational Research",
        winners: [
          { place: "1st", name: "Becca Makii", title: "Understanding the role of oncogenic MYC signaling in the canine metastatic osteosarcoma tumor immune microenvironment" },
          { place: "2nd", name: "Quinn McConnell", title: "Investigation of the role of ganglioneuritis in intractable axial skeleton pain in horses" },
          { place: "3rd", name: "Sara Cook", title: "Characterizing the DNA mutation profile for canine peripheral T cell lymphoma, not otherwise specified" }
        ]
      },
      {
        name: "Advanced Stage Translational Research",
        winners: [
          { place: "1st", name: "Alissa Threatt", title: "Aspirin-Triggered Resolvin D1 and IL-22 influence pulmonary and neurological inflammation in response to agriculture dust exposure" },
          { place: "2nd", name: "Samantha Thomas", title: "WEEV got the power: Neurovirulence in a novel mouse model of Parkinson's disease" },
          { place: "3rd", name: "Levi Flom", title: "Synaptic plasticity within cocaine-seeking neuronal ensembles" }
        ]
      }
    ]
  }
];

const departmentAwards = [
  { award: "Golden Pipette Award", recipient: "Department of Microbiology, Immunology and Pathology" },
  { award: "Green Pipette Award", recipient: "Department of Microbiology, Immunology and Pathology" }
];

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, icon, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-[#1E4D2B]">{icon}</div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
}

export default function AboutView() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Event Description */}
      <CollapsibleSection title="About Research Day" icon={<Info size={24} />} defaultOpen={true}>
        <div className="space-y-4 text-gray-700">
          <p>
            Research Day is an annual showcase celebrating cutting-edge research from the College of Veterinary Medicine and Biomedical Sciences community. The symposium provides an opportunity for students, faculty, and staff to present their work, connect with colleagues across CSU, and explore different disciplines.
          </p>
          <p>
            The 27th annual Research Day is scheduled for <strong>January 24, 2026</strong> at the Translational Medicine Institute.
          </p>
          <p>
            The event features presentations spanning basic, translational, clinical, and outcomes research, as well as lively discussions and multidisciplinary collaborations across veterinary medicine and biomedical sciences fields.
          </p>
          <p>
            The day includes undergraduate poster sessions, concurrent poster sessions, oral presentations in multiple rooms, and a keynote address from <strong>Dr. Julie Moreno</strong>, the 2025 Zoetis Veterinary Research Excellence Awardee.
          </p>
          <p className="text-sm text-gray-500">
            Share your experience using <span className="font-semibold text-[#1E4D2B]">#CVMBSResearchDay</span>
          </p>
        </div>
      </CollapsibleSection>

      {/* Committee Members */}
      <CollapsibleSection title="2026 Committee Members" icon={<Users size={24} />}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {committeeMembers.map((member) => (
            <div key={member} className="bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium text-gray-800">
              {member}
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Department Awards */}
      <CollapsibleSection title="2025 Department Awards" icon={<Trophy size={24} />}>
        <div className="space-y-3">
          {departmentAwards.map((award) => (
            <div key={award.award} className="bg-gradient-to-r from-[#C8C372]/20 to-transparent p-4 rounded-lg border-l-4 border-[#C8C372]">
              <div className="font-bold text-[#1E4D2B]">{award.award}</div>
              <div className="text-gray-700">{award.recipient}</div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* 2025 Winners */}
      <CollapsibleSection title="2025 Award Winners" icon={<Award size={24} />}>
        <div className="space-y-6">
          {winners2025.map((section) => (
            <div key={section.section}>
              <h3 className="text-md font-bold text-[#1E4D2B] mb-3 pb-2 border-b border-gray-200">
                {section.section}
              </h3>
              <div className="space-y-4">
                {section.categories.map((category) => (
                  <div key={category.name} className="bg-gray-50 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">{category.name}</h4>
                    <div className="space-y-2">
                      {category.winners.map((winner, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                            winner.place.includes('1st') ? 'bg-yellow-100 text-yellow-800' :
                            winner.place.includes('2nd') ? 'bg-gray-200 text-gray-700' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {winner.place}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-gray-900">{winner.name}</span>
                            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{winner.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
}
