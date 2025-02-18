import Link from "next/link";

import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const equipment = [
  {
    _id: "1",
    title: "Oscilloscope",
    brandname: "Tektronix",
    modelname: "TDS 2024C",
    serialNumber: "12345ABC",
    assetTag: "EQ-001",
    subunits: [
      { title: "Probe", brandname: "Tektronix", modelname: "TPP0200", serialNumber: "6789XYZ" }
    ],
    labNumber: "101",
    labName: "Electronics Lab",
    team: "R&D Team",
    serviceDate: new Date("2024-05-01"),
    comment: "Calibrated and in good condition.",
    categories: "Electronics",
    imgUrl: "https://example.com/oscilloscope.jpg",
    author: "user123",
    views: 10,
    createdAt: new Date()
  },
  {
    _id: "2",
    title: "3D Printer",
    brandname: "Prusa",
    modelname: "i3 MK3S+",
    serialNumber: "PRUSA9876",
    assetTag: "EQ-002",
    subunits: [
      { title: "Filament Spool", brandname: "Prusament", modelname: "PLA Orange" }
    ],
    labNumber: "202",
    labName: "Fabrication Lab",
    team: "Prototype Team",
    serviceDate: new Date("2024-06-15"),
    comment: "Requires minor maintenance.",
    categories: ["Fabrication", "Prototyping"],
    imgUrl: "https://example.com/3dprinter.jpg",
    author: "user456",
    views: 25,
    createdAt: new Date()
  },
  {
    _id: "3",
    title: "CNC Machine",
    brandname: "Haas",
    modelname: "VF-2",
    serialNumber: "HAASVF2345",
    assetTag: "EQ-003",
    subunits: [
      { title: "Spindle Motor", brandname: "Haas", serialNumber: "SPINDLE5678" }
    ],
    labNumber: "303",
    labName: "Manufacturing Lab",
    team: "Production Team",
    serviceDate: new Date("2024-07-20"),
    comment: "Undergoing routine maintenance.",
    categories: "Manufacturing",
    imgUrl: "https://example.com/cncmachine.jpg",
    author: "user789",
    views: 15,
    createdAt: new Date()
  },
  {
    _id: "4",
    title: "Microscope",
    brandname: "Olympus",
    modelname: "BX53",
    serialNumber: "OLYMP1234",
    assetTag: "EQ-004",
    subunits: [
      { title: "Objective Lens", brandname: "Olympus", modelname: "Plan 40x" }
    ],
    labNumber: "404",
    labName: "Biology Lab",
    team: "Research Team",
    serviceDate: new Date("2024-08-10"),
    comment: "Used for microbiological analysis.",
    categories: ["Biology", "Research"],
    imgUrl: "https://example.com/microscope.jpg",
    author: "user321",
    views: 30,
    createdAt: new Date()
  },
  {
    _id: "5",
    title: "Spectrophotometer",
    brandname: "Shimadzu",
    modelname: "UV-1800",
    serialNumber: "SHIM5678",
    assetTag: "EQ-005",
    subunits: [
      { title: "Cuvette Holder", brandname: "Shimadzu" }
    ],
    labNumber: "505",
    labName: "Chemistry Lab",
    team: "Analytical Team",
    serviceDate: new Date("2024-09-05"),
    comment: "Replaced light source recently.",
    categories: "Chemistry",
    imgUrl: "https://example.com/spectrophotometer.jpg",
    author: "user654",
    views: 12,
    createdAt: new Date()
  }
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = "" } = await searchParams;

  const filteredEquipment = equipment.filter((equipment) =>
    equipment.title.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Equipment</h1>

        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ADD_EQUIPMENT}>Add an Equipment</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search equipment..."
          otherClasses="flex-1"
        />
      </section>
      {/* HomeFilter */}
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredEquipment.map((equipment) => (
          <div>
            <h1 key={equipment._id}>{equipment.title}</h1>
            <p>{equipment.brandname}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;