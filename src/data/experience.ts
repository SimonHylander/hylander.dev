export type Experience = {
  title: string;
  company_name: string;
  iconBg: string;
  date: string;
  isPresent: boolean;
  points: string[];
};

export const experiences: Experience[] = [
  {
    title: "Project Management System",
    company_name:
      "Java, Quarkus, Hibernate, MySQL, Typescript, Next.js, Zustand, TailwindCSS.",
    iconBg: "#2f2035",
    date: "2022",
    isPresent: true,
    points: [
      "Built internal tools and dashboards for a company specialized in private sewage and water.",
      "Project & user management.",
      "Data visualization.",
      "Third party integrations.",
    ],
  },
  {
    title: "Anti-fraud Marketplace",
    company_name:
      "Java, Quarkus, Hibernate, MySQL, Typescript, Next.js, Redux. Astro.",
    iconBg: "#2f2035",
    date: "2021",
    isPresent: true,
    points: [
      "Developed a marketplace aimed at reducing fraud during private deals and classified ads.",
      "Integrations with Stripe, Swish, BankID and Shipping Solutions.",
      "Public API that enables platforms to integrate with the marketplace.",
    ],
  },
  {
    title: "Gamification Platform",
    company_name: "Java, Quarkus, MySQL, React.js, Redux.",
    iconBg: "#2f2035",
    date: "2020",
    isPresent: false,
    points: [
      "Developed a platform focused on gamification of sales competitions.",
      "Visualization of organization activities and goals.",
      "Real-time dashboards.",
    ],
  },
  {
    title: "Order Management System",
    company_name: "C#, Asp.NET, Oracle PL/SQL, MSSQL, Azure.",
    iconBg: "#2f2035",
    date: "2019",
    isPresent: false,
    points: [
      "Internal order management system for one of Sweden's market-leading software and information companies.",
    ],
  },
  {
    title: "Project Management System",
    company_name:
      "Java, Quarkus, Spring Boot, Hibernate, PHP, MySQL, Angular, AWS.",
    iconBg: "#2f2035",
    date: "2018",
    isPresent: true,
    points: [
      "Swedens premier project and inventory management software aimed towards the construction industry.",
      "Rewrite of monolithic system into a scalable microservice architecture.",
      "Lead frontend developer.",
      "Architected a BFF solution to enable client teams to work independently of API team.",
      "Implemented distributed tracing to give us better monitoring and observability of the distributed system.",
      "Developed pricing model based on customer network usage.",
    ],
  },
  {
    title: "Order Management System",
    company_name: "PHP, Symfony, Doctrine, MySQL, Knockout.js",
    iconBg: "#2f2035",
    date: "2018",
    isPresent: false,
    points: [
      "Order and customer management for a company doing magazine and advertisement sales.",
    ],
  },
  {
    title: "Websites and Ecommerce Solution",
    company_name: "PHP, Laravel, Wordpress, WooCommerce, MySQL, Typescript",
    iconBg: "#2f2035",
    date: "2017",
    isPresent: false,
    points: [
      "Updated several websites for a medium sized media company as well as building a webshop for merchandise sales.",
    ],
  },
  {
    title: "Information Platform",
    company_name: "PHP, Symfony, Doctrine, MySQL, Oracle PL/SQL, JQuery",
    iconBg: "#2f2035",
    date: "2016",
    isPresent: false,
    points: [
      "Developed an information product within health and social care that focused on matching the needs of municipalities, social and correctional services to find suitable treatment homes and accomodations for their clients.",
    ],
  },
  {
    title: "Real Estate Platform",
    company_name: "PHP, Symfony, Doctrine, MySQL, JQuery",
    iconBg: "#2f2035",
    date: "2015",
    isPresent: false,
    points: [
      "Developed a nordic platform for the commercial real estate market delivering event based data for marketing and proactivity.",
    ],
  },
  {
    title: "Internal Tools and API's",
    company_name: "Java, SOAP, REST, Hibernate, Oracle PL/SQL, Linux, Bash",
    iconBg: "#2f2035",
    date: "2014",
    isPresent: false,
    points: [
      "Worked on a SOAP platform focused on delivering the organization's core data to numerous different european businesses.",
      "Developed a middleware REST API for the organizations different systems and databases.",
      "Custom reports and statistics for internal use.",
      "Integrations with third party services.",
    ],
  },
];
