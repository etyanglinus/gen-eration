import Image from "next/image";

const AboutSectionThree = () => {
  const teamMembers = [
    {
      name: "Samuel Kodilu",
      role: "CEO & Founder",
      image: "/images/team/ceo.jpg",
      description: "Samuel is the visionary behind the company, leading with a passion for innovation and growth.",
    },
    {
      name: "Robert Aundo",
      role: "COO",
      image: "/images/team/coo.jpeg",
      description: "Robert ensures smooth operations and implements strategic plans for company growth.",
    },
    {
      name: "Justine Timberlake Omwenga",
      role: "CFO",
      image: "/images/team/cfo.jpg",
      description: "Justine manages financial planning and risks, ensuring the company’s financial health.",
    },
    {
      name: "Andrew Kyosi",
      role: "Head of Marketing",
      image: "/images/team/head of coporate.jpg",
      description: "Andrew leads our marketing efforts, crafting strategies to enhance brand visibility.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          {/* Team Introduction Section */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="max-w-[470px]">
              <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                Meet the Team
              </h3>
              <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Our team is made up of talented individuals who are committed to building the best software solutions. We bring diverse skills and a collaborative spirit to everything we do.
              </p>
            </div>
          </div>

          {/* Team Member Profiles Section */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-black dark:text-white">{member.name}</h4>
                  <p className="mb-2 text-sm font-semibold text-gray-500">{member.role}</p>
                  <p className="text-sm text-body-color">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionThree;
