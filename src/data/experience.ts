export type Job = {
    title: string;
    role: string;
    period: string;
    projects: Project[];
};

export interface Project {
    name: string;
    date: string;
    technologies: string;
    points: string[];
}
  
export const jobs: Job[] = [
    {
        title: "Byggdagboken",
        role: "Lead Software Engineer",
        period: "2024 - Present",
        projects: [
            {
                name: "Internal Translation Management",
                date: "2025",
                technologies: "Typescript, SST.dev, Next.js, React, MySQL, Drizzle ORM, TailwindCSS, Tanstack Query/Form/Virtual",
                points: [
                    "Built an internal translation management system to manage translations.",
                    "Added features to export terms and translations to multiple formats such as JSON, XML, xcstrings",
                    "Built a shell script to download translations and add them to any of our projects.",
                ]
            },
            {
                name: "OAuth2 Authentication Service",
                date: "2025",
                technologies: "Typescript, SST.dev, Next.js, React, Redis",
                points: [
                    "Built and implemented an OAuth2 authentication service to replace our old custom authentication system.",
                ]
            },
            {
                name: "Next.js Migration",
                date: "2024 - Present",
                technologies: "Typescript, SST.dev, Next.js, React, MySQL, Drizzle ORM, TailwindCSS, Tanstack Query/Form/Virtual",
                points: [
                    "Setup new architecture for us to be able to migrate to Next.js in order to scale our app.",
                    "Added A/B Testing on a route level to allow us to migrate to the new app gradually.",
                ]
            },
            {
                name: "App Team Lead",
                date: "2024 - Present",
                technologies: "Typescript, Node.js, SST.dev, Serverless, AWS Lambda",
                points: [
                    "Took ownership over the native mobile app team.",
                    "Setup workflows, routines and processes for the team to increase efficiency and to make it easier for the team to deliver a better user experience.",
                    "Built a BFF layer with a more scalable architecture that apps use to fetch and aggregate data",
                ]
            }
        ]
    },
    {
        title: "Skoglit",
        role: "Lead Software Engineer",
        period: "2018 - 2024",
        projects: [
            {
                name: "Byggdagboken",
                technologies:
                  "Typescript, Node.js, Next.js, React, Java, Quarkus, Spring Boot, Hibernate, PHP, MySQL, AWS.",
                date: "2018 - 2024",
                points: [
                  "Client Lead.",
                  "Rewrite of monolithic system into a scalable microservice architecture.",
                  "Architected a BFF solution to enable client teams to work independently of API team.",
                  "Implemented distributed tracing to give us better monitoring and observability of the distributed system.",
                  "Developed pricing model based on customer network usage.",
                ],
              },
              {
                name: "Enava",
                technologies:
                  "Java, Quarkus, Hibernate, MySQL, Typescript, Next.js, Zustand, TailwindCSS.",
                date: "2022",
                points: [
                  "Built an internal project management system, internal tools and dashboards for a company specialized in private sewage and water.",
                  "Project & user management.",
                  "Data visualization.",
                  "Integrations with google maps & hubspot.",
                ],
              },
              {
                name: "Treddy.se",
                technologies:
                  "Java, Quarkus, Hibernate, Websockets,MySQL, Typescript, Next.js, Redux. Astro.",
                date: "2021",
                points: [
                  "Developed a marketplace aimed at reducing fraud during secondhand deals and classified ads.",
                  "Integrations with Stripe, Swish, BankID and Shipping Solutions.",
                  "Public API that enables platforms to integrate with the marketplace.",
                ],
              },
              {
                name: "Salestrigger",
                technologies: "Java, Quarkus, Websockets, MySQL, React.js, React Native, Redux.",
                date: "2020",
                points: [
                  "Developed a platform focused on gamification of sales competitions.",
                  "Visualization of organization activities and goals.",
                  "Real-time dashboards.",
                  "Created a prototype for a crossplatform mobile app using React Native.",
                ],
              },
            {
                name: "Order Management System",
                technologies: "C#, Asp.NET, Oracle PL/SQL, MSSQL, Azure.",
                date: "2019",
                points: [
                  "Internal order management system for one of Sweden's market-leading software and information companies.",
                ],
            },
        ]
    },
    {
        title: "Byggfakta Group",
        role: "Software Developer",
        period: "2016 - 2018",
        projects: [
            {
                name: "OMS for Advertisements",
                technologies: "PHP, Symfony, Doctrine, MySQL, Knockout.js",
                date: "2018",
                points: [
                    "Built a system to manage orders and customers for one of the organization's businesses focusing on the sale of magazines and advertisements.",
                ],
            },
            {
                name: "Websites and Ecommerce Solutions",
                technologies: "PHP, Laravel, Wordpress, WooCommerce, MySQL, Typescript",
                date: "2017",
                points: [
                    "Developed and maintained several websites for a medium sized media company.",
                    "Built a webhop using WooCommerce for selling digital goods and merchandise."
                ],
            },
            {
                name: "Maintenence of internal java and php systems",
                technologies: "",
                date: "2017",
                points: [
                    "Solo maintained about 10 internal Java/PHP based systems.",
                ],
            },
        ]
    },
    {
        title: "Docu Group Sweden",
        role: "Junior Developer",
        period: "2014 - 2016",
        projects: [
            {
                name: "SSIL",
                date: "2016",
                technologies: "PHP, Symfony, Doctrine, MySQL, Oracle PL/SQL, JQuery",
                points: [
                    "Developed an information product within health and social care that focused on matching the needs of municipalities, social and correctional services to find suitable treatment homes and accomodations for their clients.",
                ],
            },
            {
                name: "Citymark",
                date: "2015",
                technologies: "PHP, Symfony, Doctrine, MySQL, JQuery",
                points: [
                    "Developed a platform for the nordic real estate market delivering event based data for marketing and proactivity.",
                ],
            },
            {
                name: "Internal Tools and API's",
                date: "2014",
                technologies: "Java, SOAP, REST, Hibernate, Oracle PL/SQL, Linux, Bash",
                points: [
                    "Worked on a SOAP platform focused on delivering the organization's core data to numerous different european businesses.",
                    "Developed a middleware REST API for the organizations internal systems and databases.",
                    "Custom reports and statistics for internal use.",
                    "Integrations with third party services.",
                ],
            },
        ]
    },
];
