export interface BragDoc {
    year: number;
    achievements: Achivement[];
  }

  export interface Achivement {
    name: string,
    company: string,
    description: string,
  }

export const bragdoc: BragDoc[] = [
    {
      year: 2025,
      achievements: [
        {
          name: "Led Client Platform Modernization",
          company: "Byggdagboken",
          description: "Took full ownership of the client team, including native apps and the web client. Introduced streamlined workflows and routines, significantly improving our ability to deliver high-quality user experiences.",
        },
        {
          name: "Modern Architecture Rollout",
          company: "Byggdagboken",
          description: "Spearheaded the transition from a legacy PHP/Angular.js stack to a modern Next.js architecture. Designed the foundation for scalable, maintainable frontend development.",
        },
        {
          name: "Progressive Migration Strategy",
          company: "Byggdagboken",
          description: "Implemented route-level A/B testing using CloudFront Functions, enabling a smooth and controlled rollout of the new app with minimal disruption.",
        },
        {
          name: "Backend-for-Frontend (BFF) Layer",
          company: "Byggdagboken",
          description: "Built a robust BFF layer to streamline client data access and aggregation, improving performance and reducing client-side complexity.",
        },
        {
          name: "Authentication System",
          company: "Byggdagboken",
          description: "Designed and implemented a secure OAuth2/OpenID-based authentication system to unify identity across platforms.",
        },
        {
          name: "Translation Management System",
          company: "Byggdagboken",
          description: "Developed an internal tool to manage translations with support for multiple formats (JSON, XML, Xcstrings), giving the team fine-grained control over internationalization",
        }
      ]
    }
  ];