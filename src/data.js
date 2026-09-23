// Original gameplay. Titles supplied by the user; office allocations are fictional.
export const WORLD = { min: -342, max: 342, spawn: { x: 36, z: 286 }, size: 684 };
export const GROUPS = {
  Executive: { color: "#ee795c", label: "Leadership quarter" },
  Senior: { color: "#d6a85e", label: "Strategy quarter" },
  Academic: { color: "#72b6bd", label: "Learning quarter" },
  Corporate: { color: "#99b48b", label: "Community quarter" }
};
const rows = [
["pceo","Principal and CEO (PCEO)","Executive","Leads the polytechnic, sets overall strategy and direction, represents SP to MOE, industry and the public, and is accountable for institutional performance.","A campus for everyone","Choose the strongest campus strategy.","Balance learning quality, inclusion and long-term sustainability","Optimise only short-term revenue","Make every department work in isolation"],
["dp-academic","Deputy Principal (Academic)","Executive","Oversees academic schools and programmes, curriculum standards, teaching quality and student learning outcomes.","Learning that lasts","How should a new curriculum be evaluated?","Measure learning outcomes and act on student feedback","Count slides without reviewing learning","Ignore accessibility to save time"],
["dp-admin","Deputy Principal (Administration)","Executive","Oversees HR, finance, estates, IT and general administration to ensure smooth operations.","Behind the scenes","An essential campus system is unavailable. What comes first?","Coordinate service recovery and communicate clearly","Wait silently until complaints arrive","Remove the support contact information"],
["dp-development","Deputy Principal (Development)","Executive","Drives institutional development, strategic projects, partnerships and future-readiness through new programmes and capabilities.","Tomorrow starts here","How should a new campus capability be developed?","Pilot with partners, evaluate evidence, then scale","Purchase equipment without a learning plan","Ignore operating costs and maintenance"],
["sd-built","Senior Director · Built Environment & Maritime","Senior","Leads built environment and maritime schools and initiatives, aligning education with industry and regulatory needs.","Safe harbours","What should a maritime training facility prioritise?","Safe simulation, applied learning and regulatory alignment","Appearance alone","Removing all safety checks"],
["sd-student","Senior Director · Student & Academic Affairs and Special Projects","Senior","Oversees admissions, progression, academic governance and major cross-school projects affecting students and teaching.","An open doorway","What makes a cross-school project fair?","Clear eligibility, accessible participation and transparent assessment","Unpublished entry requirements","Selection by personal connections"],
["sd-core","Senior Director · Common Core","Senior","Oversees interdisciplinary, foundational and future-skills common core learning for students across diplomas.","Common ground","Which project best supports interdisciplinary learning?","Teams combining different disciplines to solve a shared problem","Teams avoiding all other disciplines","Memorising an unrelated list"],
["sd-computing","Senior Director · Computing, Chemical & Life Sciences","Senior","Provides academic and strategic leadership for computing and science-related schools, curricula, labs and industry projects.","Evidence into action","What is a responsible data-driven lab project?","Validated data, safe methods and multidisciplinary review","Publish unverified results immediately","Skip consent and data governance"],
["sd-business","Senior Director · Business & The Creatives","Senior","Oversees business, media, arts and design schools, aligning them with industry trends and creative economy needs.","Ideas with purpose","How can a creative venture test its idea?","Prototype ethically and collect feedback from intended users","Copy another creator without permission","Assume every user has identical needs"],
["sd-engineering","Senior Director · Engineering","Senior","Oversees engineering schools and programmes, applied engineering training and industry collaboration.","Built to work","What is the best engineering validation plan?","Test a prototype against explicit safety and performance criteria","Declare success before testing","Only check the paint finish"],
["registrar","Registrar (Academic)","Senior","Manages academic records, examinations, course registration, graduation processes and enforcement of academic regulations.","A record of care","A student reports an incorrect academic record. What is appropriate?","Verify the evidence through an authorised correction process","Change records without an audit trail","Publish their record to a public forum"],
["math","Director · Mathematical Sciences & Analytics","Academic","Oversees mathematics, statistics and analytics education and supports maths and analytics teaching across the polytechnic.","Beyond the average","A survey has a biased sample. What should the analyst do?","Acknowledge the limitation and improve the sampling plan","Claim the result represents everyone","Hide the sample size"],
["maritime","Director · Singapore Maritime Academy","Academic","Manages maritime courses, sea-going training, simulators and compliance with maritime regulations and standards.","Chart your course","What should a navigation exercise begin with?","A passage plan, safety briefing and equipment checks","Sailing without checking conditions","Ignoring simulator alarms"],
["pace","Director · PACE Academy","Academic","Leads Professional & Adult Continuing Education, CET/WSQ and upskilling courses for adult learners and corporate clients.","Never stop learning","Which course design best supports working adult learners?","Flexible learning with relevant practice and clear assessment","Unannounced mandatory sessions","Ignore learners’ prior experience"],
["mechanical","Director · Mechanical & Aeronautical Engineering","Academic","Oversees mechanical and aerospace-related diplomas, laboratories and industry projects.","Ready for take-off","Before testing a mechanical prototype, what should happen?","Review risks, inspect components and follow the test procedure","Run it at full power without checks","Remove guards for convenience"],
["architecture","Director · Architecture & The Built Environment","Academic","Manages architecture, building and facilities-related programmes and industry collaborations.","Design without barriers","Which building entrance is most inclusive?","A step-free route with clear signs and adequate circulation space","An entrance with only narrow stairs","A hidden route through a service area"],
["computing","Director · School of Computing","Academic","Oversees IT, software, cybersecurity and related diplomas and applied projects.","Trust by design","What protects a student service application?","Least-privilege access, validation and secure secret storage","Hard-coded passwords in public source code","Disabling authentication for convenience"],
["electrical","Director · Electrical & Electronic Engineering","Academic","Manages electrical, electronic and related engineering programmes and laboratories.","Power with purpose","What is the safest first step before electrical maintenance?","Use the authorised isolation and verification procedure","Assume a switched-off display means no power","Work on exposed live parts without controls"],
["life-skills","Director · Life Skills & Communication","Academic","Oversees communication, teamwork, leadership and general education modules that build transferable skills.","Every voice matters","How should a team handle disagreement?","Listen, clarify needs and agree on respectful next steps","Interrupt quieter team members","Avoid documenting any decisions"],
["business","Director · Business","Academic","Manages business, marketing, accountancy and related diplomas and industry engagement.","Value beyond profit","Which business proposal is most credible?","Evidence-based demand, transparent costs and ethical practice","Revenue projections with no assumptions","Concealed costs and misleading claims"],
["mad","Director · Media, Arts & Design","Academic","Oversees design, media and arts programmes, studios and creative industry projects.","Make it meaningful","What belongs in an inclusive media brief?","Audience needs, accessible formats and licensed original assets","Tiny unreadable captions","Unlicensed copied artwork"],
["science","Director · Chemical & Life Sciences","Academic","Manages applied science, chemical and life sciences programmes, laboratories and research and industry partnerships.","A careful discovery","Before starting a laboratory experiment, what is essential?","Risk assessment, suitable PPE and approved procedures","Mix unidentified substances","Skip waste-disposal planning"],
["estates","Director · Estates & Development","Corporate","Manages infrastructure, facilities, maintenance, space planning and campus development projects.","Care for our campus","A walkway defect is reported. What should estates do?","Make the area safe, assess the fault and track the repair","Wait for someone to get hurt","Remove the reporting channel"],
["education","Director · Educational Development","Corporate","Drives teaching and learning innovation, pedagogy, assessment and staff development in education practice.","Teach, learn, improve","What makes a teaching innovation effective?","A clear learning goal, accessible design and evidence of impact","Novel technology without a learning purpose","Assessment unrelated to taught skills"],
["innovation","Director · Technology, Innovation & Enterprise","Corporate","Leads applied R&D, innovation, intellectual property, startup support and industry collaboration.","From prototype to possibility","Before sharing a new invention, what should a team consider?","IP ownership, partner agreements and responsible validation","Publish confidential partner material","Promise untested capabilities"],
["it","Director · Information & Digital Technology Services","Corporate","Manages IT infrastructure, cybersecurity, systems and digital transformation initiatives.","Keep campus connected","You receive a suspicious account-reset email. What should you do?","Use an official support channel and report the message","Enter your password on the linked site","Forward it as a genuine notice"],
["student-development","Director · Student Development","Corporate","Oversees co-curricular activities, leadership programmes, character and citizenship education and holistic development.","Find your people","What makes a student activity welcoming?","Accessible participation, clear expectations and supportive leaders","Exclude newcomers without explanation","Hide the joining process"],
["sustainability","Director · Planning, Organisation Development & Sustainability","Corporate","The Chief Sustainability Officer leads strategic planning, organisational development, sustainability strategy and reporting.","Small steps, lasting change","What is a credible sustainability target?","A measured baseline, clear actions and transparent progress reporting","A slogan without measurement","Claim success without checking results"],
["hr","Director · Human Resource","Corporate","Manages recruitment, performance management, staff development and HR policies.","People make the place","What supports a fair recruitment process?","Consistent criteria, structured evaluation and confidentiality","Personal preference without criteria","Sharing applicant information publicly"],
["communications","Director · Communications","Corporate","Handles corporate communications, branding, media relations and internal communications.","Clear is kind","What belongs in a useful service disruption notice?","Verified impact, next steps, support contacts and an update plan","Speculation presented as fact","Technical jargon without guidance"],
["quality","Director · Academic Quality & Resources","Corporate","Oversees academic quality, policy and teaching resources and supports organisational AI efforts. Includes Library, Fabrication Lab and Academic Quality Centre, which handles student feedback and course review with schools.","Close the feedback loop","How should student course feedback be used?","Analyse themes, review with schools and communicate improvements","Collect feedback but never review it","Publish identifiable comments without consent"],
["services","Director · Student Services","Corporate","Manages frontline enrolment support, counselling coordination, bursaries liaison and general helpdesks.","A little help goes far","A student is unsure where to seek support. What helps most?","Listen privately and explain the appropriate support pathway","Ask them to disclose concerns publicly","Send them between desks without guidance"],
["partnerships","Director · Industry & Partnerships","Corporate","Develops and manages industry partnerships, internships, collaborative projects and external engagement.","Connect the dots","What makes a good internship agreement?","Clear learning outcomes, supervision, safety and feedback routes","Unclear tasks and no supervisor","No way to raise concerns"],
["finance","Director · Finance","Corporate","Oversees budgeting, financial planning, accounting, procurement and financial controls.","Make every credit count","What is sound procurement practice?","Document requirements, compare fairly and manage conflicts of interest","Approve a friend’s quote without review","Spend first and hide the receipts"],
["academic-services","Director · Academic Services","Corporate","Manages timetable planning, classroom allocation, examination administration, lecture scheduling and central academic operations.","Right place, right time","How should a timetable conflict be resolved?","Check constraints, coordinate an alternative and notify affected students","Move a class without telling anyone","Double-book the same room"]
];
export const STAFF = rows.map((r, i) => {
  const shift = i % 3, answers = r.slice(6), options = answers.map((_, j) => answers[(j + shift) % 3]);
  return { id: r[0], title: r[1], group: r[2], description: r[3], quest: r[4], question: r[5], options, correct: (3 - shift) % 3,
    x: -216 + (i % 7) * 72, z: 185 - Math.floor(i / 7) * 72, color: GROUPS[r[2]].color,
    office: `O${String(i + 1).padStart(2, "0")}`, site: i % 19, reward: { xp: 120, credits: 35 } };
});
export const SITES = [
  ["T1 · Built Environment Studios",-216,-221,"Academic"], ["T11 · Life Science Laboratories",-144,-221,"Academic"],
  ["T12 · Engineering Learning Labs",-72,-221,"Academic"], ["Library & Academic Quality Centre",0,-221,"Academic"],
  ["T19 · School of Computing",72,-221,"Academic"], ["T20 · Business Learning Studios",144,-221,"Academic"],
  ["T22 · Media, Arts & Design Studios",216,-221,"Academic"],
  ["Food Court 1",-301,185,"Dining"], ["Food Court 2",-301,113,"Dining"], ["Food Court 3 · Poly Centre",-301,41,"Dining"],
  ["Food Court 4 · Koufu",301,185,"Dining"], ["Food Court 5",301,113,"Dining"], ["Food Court 6",301,41,"Dining"],
  ["Fabrication Lab",-301,-31,"Academic"], ["Aerohub",-301,-103,"Academic"], ["Maritime Simulation Centre",-301,-221,"Academic"],
  ["SPICE · Digital Service Desk",301,-31,"Community"], ["PACE Academy",301,-103,"Academic"], ["Innovation & Enterprise Centre",301,-221,"Academic"]
].map(([name,x,z,type],i)=>({id:`site-${i}`,name,x,z,type}));
export const LANDMARKS = [
  {id:"dover",name:"Dover MRT · Arrival",x:236,z:293,type:"Transport"},
  {id:"field",name:"Sports Complex · Running Track",x:-208,z:282,type:"Sports"},
  {id:"pool",name:"Swimming Complex",x:-96,z:282,type:"Sports"},
  {id:"plaza",name:"Campus Green · Welcome Plaza",x:36,z:263,type:"Social"},
  {id:"spgg",name:"SP Graduates’ Guild",x:145,z:282,type:"Community"},
  {id:"moberly",name:"Moberly · Student Life",x:-208,z:-305,type:"Social"},
  {id:"convention",name:"Convention & Exhibition Centre",x:-100,z:-305,type:"Social"},
  {id:"arena",name:"Sports Arena",x:120,z:-305,type:"Sports"},
  {id:"innovillage",name:"InnoVillage",x:238,z:-305,type:"Academic"}
];
export const LOCATIONS = [
 ...STAFF.map(s=>({id:s.id,name:s.title,x:s.x,z:s.z,type:s.group,office:s.office})), ...SITES, ...LANDMARKS
];
export const SOURCES = [
 ["Official campus map","https://www.sp.edu.sg/staticfile/CampusMap/index.html"],
 ["Campus map and facilities","https://www.sp.edu.sg/about-sp/campus-map-and-facilities"],
 ["Wayfinding around campus","https://www.sp.edu.sg/about-sp/campus-map-and-facilities/wayfinding-around-campus"]
];
export const FOUNDER = "Campus of Tomorrow";
export const SAVE_KEY = "sp-campus-odyssey-v1";
export function levelFor(xp){return 1+Math.floor(xp/360);}
export function campaign(state) {
 const done=STAFF.filter(s=>state.quests[s.id]==="done");
 const academic=done.filter(s=>s.group==="Academic").length;
 const corporate=done.filter(s=>s.group==="Corporate").length;
 return { academic,corporate,total:done.length,ready:academic>=6&&corporate>=3&&done.some(s=>s.id==="pceo") };
}
