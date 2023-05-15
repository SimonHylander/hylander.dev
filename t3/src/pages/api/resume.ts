import type { NextApiRequest, NextApiResponse } from "next";
import { string } from "zod";
import { prisma } from "~/server/db/client";

// System specialt över 10 system på docu?

const getResume = async (req: NextApiRequest, res: NextApiResponse) => {
  const resume: Resume = {
    info: {
      name: "Simon Hylander",
      label: "Software Developer",
      image: "https://avatars.githubusercontent.com/u/",
      email: "hylandersimon@gmail.com",
      phone: "(509) 596-9600",
      website: "https://hylander.dev",
      summary: "Simon is a self taught Software Developer currently woring at Skoglit. His software development experience includes full-stack web application development, x, and x. He is a driven individual that easily familiarizes himself with the needs of the business in order to implement a fitting solution.",
      location: {
        address: "N/A",
        postalCode: "82731",
        city: "Ljusdal",
        countryCode: "SE",
        region: "Gävleborg"
      },
      profiles: [
        {
          network: "LinkedIn",
          username: "simonhylander",
          url: "https://www.linkedin.com/in/simonhylander/"
        },
        {
          network: "GitHub",
          username: "simonhylander",
          url: "https://github.com/simonhylander"
        }
      ]
    },
    work: [
    {
      company: "Skoglit AB",
      position: "Software Developer",
      website: "https://skoglit.com",
      startDate: "2018-08-01",
      endDate: null,
      summary: "As the team grew I was put in charge of junior developers and interns. I oversaw the development and maintenance of 5 clients and their systems. I oversaw the development of the company's internal tools and website as well as evaluating and making proposals for most of our architecture, design patterns and routines.",
      highlights: [
        "Developed platform for startup https://treddy.se",
        "Lead a team of junior developers and interns (LIA)",
        "Provided code reviews for other developer branches",
      ]
    },
    {
      company: "Skoglit AB",
      position: "Software Developer",
      website: "https://skoglit.com",
      startDate: "2018-08-01",
      endDate: null,
      summary: "",
      // summary: "Consulting agency Core library developer for the workflows team at Crunch.io. Built library integrations through test-driven development practices for B2B API interactions between Crunch.io back-end services hosted on AWS and third-party providers. Developed via Windows Subsystem for Linux on full-service hosting Docker containers via Docker Desktop. Development progressions tracked via Pivotal Tracker and GitHub, and integrated with CI/CD pipelines through Jenkins and Travis CI. Version Control managed through git.",
      highlights: [
        "Migrated the monolithic system of one of swedens largest project management tools focusing on the construction industry to a more scalable microservice solution hosted on AWS.",
        "Developed a system that handles information gathering aimed at the legal market. Documents, external customer portal and several API integrations with third-party suppliers.",
        "Integrated a client's CMS with serveral of their internal systems and databases.",
        "Built gamification platform targeted for sales campaigns and competitions.",
      ]
    },
    {
      company: "Docu Group Sweden AB",
      website: "https://www.byggfaktagroup.com/sv/historia/",
      position: "Software Developer",
      startDate: "2015-09-01",
      endDate: "2018-08-01",
      summary: "Worked on several internal as well as customer facing systems built in PHP and Symfony",
      highlights: [
        "Developed an order management system that focused on the sales of newspapers and advertisements.",
        "Developed a information service within health and socialcare that matched the needs of municipalities, social services and correctional services to find suitable treatment homes and accommodations for their clients.",
        "Built a nordic platform for the commercal real estate market that delivered event based data för marketing och proactivity.",
        "Built a woocommerce webshop for the organizations magazine sales as well as their physical apparel",
        "Built a digital survey to collect individuals' upcoming construction and investment plans.",
      ]
    },
    {
      company: "Docu Group Sweden AB",
      website: "https://www.byggfaktagroup.com/sv/historia/",
      position: "Junior Software Developer",
      startDate: "2014-04-01",
      endDate: "2015-08-01",
      summary: "Built internal SOAP/REST apis and tools for the organisation",
      highlights: [
        "Developed a middleware api for the organizations databases and CRM.",
        "Built integrations with external phone services such as: Avaya, Tele2 och Telavox in order to gather statistics.",
        "Worked on internal SOA/SOAP platform that produced and transfered information to various countries within the organization.",
      ]
    },
    {
      company: "Docu Group Sweden AB",
      website: "https://www.byggfaktagroup.com/sv/historia/",
      position: "Internship",
      startDate: "2014-02-01",
      endDate: "2014-04-01",
      summary: "Part time internship for the Java team where I was taught their techstack (Java EE, SOAP, Oracle SQL, Linux) and worked on minor features.",
      highlights: []
    },
  ],
  skills: [
  {
    name: "Backend Development",
    level: "Expert",
    keywords: [
      "Java",
      "Spring",
      "Quarkus",
      "Golang",
      "Node.js",
      "TRPC",
      "C#",
      "PHP",
      "CakePHP",
      "Symfony",
      "Laravel",
      "SQL",
      "Mysql",
      "Oracle SQL",
      "SQLite",
      "DynamoDB",
      "Neo4j"
    ]
  },
  {
    name: "Frontend Development",
    level: "Advanced",
    keywords: [
      "HTML5",
      "CSS3",
      "Javascript",
      "JQuery",
      "ExtJs",
      "Knockout.js",
      "AngularJS",
      "React.js",
      "Next.js"
    ]
  },

  {
    name: "DevOps",
    level: "Proficient",
    keywords: [
      "Linux",
      "Git",
      "GitHub",
      "Bitbucket",
      "Docker",
      "Docker-Compose",
      "AWS",
      "Envoy",
    ]
  },
],
languages: [
  {
    language: "Swedish",
    fluency: "Proficient"
  },
  {
    language: "English",
    fluency: "Native speaker"
  }
],
interests: [
  {
    name: "Recreation",
    keywords: [
      "Music",
      "Skateboarding",
    ]
  }
]
};

  res.status(200).json(resume);
};

export default getResume;

interface Resume {
  info: {
    name: string;
    label: string;
    image: string;
    email: string;
    phone: string;
    website: string;
    summary: string;
    location: {
      address: string;
      postalCode: string;
      city: string;
      countryCode: string;
      region: string;
    },
    profiles: {
      network: string;
      username: string;
      url: string;
    }[]
  },
  work: {
    company: string;
    position: string;
    website:  string;
    startDate: string;
    endDate: string | null;
    summary:  string;
    highlights: string[];
  }[],
  skills: {
    name: string;
    level: string;
    keywords: string[];
  }[],
  languages: {
    language: string;
    fluency: string;
  }[],
  interests: {
    name: string;
    keywords: string[];
  }[]
}