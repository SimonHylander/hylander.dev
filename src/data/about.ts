export type Language = {
  title: string;
  icon: string;
  libraries?: Library[];
};

export type Library = {
  name: string;
  href: string;
  value: number;
};

export const languages: Language[] = [
  {
    title: "Typescript",
    icon: "typescript",
    libraries: [
      {
        name: "Next.js",
        href: "https://nextjs.org/",
        value: 1000,
      },
      {
        name: "Node.js",
        href: "https://nodejs.org/en/about",
        value: 400,
      },
      {
        name: "React",
        href: "https://react.dev/",
        value: 600,
      },
      {
        name: "Redux",
        href: "https://redux.js.org/",
        value: 600,
      },
      {
        name: "Zustand",
        href: "https://zustand-demo.pmnd.rs/",
        value: 500,
      },
      {
        name: "Prisma",
        href: "https://www.prisma.io/",
        value: 400,
      },
      {
        name: "Vue.js",
        href: "https://vuejs.org/",
        value: 400,
      },
      {
        name: "Angular",
        href: "https://angular.io/",
        value: 300,
      },
      {
        name: "Svelte",
        href: "https://svelte.dev/",
        value: 250,
      },
      {
        name: "Express.js",
        href: "https://expressjs.com/",
        value: 200,
      },
      {
        name: "SolidJS",
        href: "https://www.solidjs.com/",
        value: 150,
      },
      {
        name: "JQuery",
        href: "https://jquery.com/",
        value: 150,
      },
    ],
  },
  {
    title: "Java",
    icon: "java",
    libraries: [
      {
        name: "Quarkus",
        href: "https://quarkus.io/",
        value: 1000,
      },
      {
        name: "Spring",
        href: "https://spring.io/",
        value: 800,
      },
      {
        name: "Hibernate",
        href: "https://hibernate.org/",
        value: 800,
      },
      {
        name: "Panache",
        href: "https://quarkus.io/guides/hibernate-orm-panache",
        value: 300,
      },
      {
        name: "Keycloak",
        href: "https://www.keycloak.org/",
        value: 600,
      },
      {
        name: "Flyway",
        href: "https://flywaydb.org/",
        value: 600,
      },
      {
        name: "Liquibase",
        href: "https://www.liquibase.org/",
        value: 300,
      },
      {
        name: "gRPC",
        href: "https://grpc.io/",
        value: 400,
      },
      {
        name: "JAX-RS",
        href: "https://docs.jboss.org/author/display/WFLY/Java%20API%20for%20RESTful%20Web%20Services%20(JAX-RS).html",
        value: 300,
      },
      {
        name: "Jackson",
        href: "https://github.com/FasterXML/jackson",
        value: 250,
      },
      {
        name: "JPA",
        href: "https://spring.io/guides/gs/accessing-data-jpa/",
        value: 400,
      },
      {
        name: "JDBC",
        href: "https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/",
        value: 300,
      },
      {
        name: "Websockets",
        href: "https://quarkus.io/guides/websockets",
        value: 250,
      },
      {
        name: "Qute",
        href: "https://quarkus.io/guides/qute",
        value: 200,
      },
      {
        name: "Quartz",
        href: "https://github.com/quartz-scheduler/quartz",
        value: 150,
      },

      {
        name: "JUnit",
        href: "https://junit.org/junit5/",
        value: 150,
      },
    ],
  },
  {
    title: "Golang",
    icon: "go",
    libraries: [
      {
        name: "Gin",
        href: "https://github.com/gin-gonic/gin",
        value: 1000,
      },
      {
        name: "Gorilla",
        href: "https://www.gorillatoolkit.org/",
        value: 800,
      },
      {
        name: "echo",
        href: "https://echo.labstack.com/",
        value: 650,
      },
      {
        name: "Gorm",
        href: "https://github.com/go-gorm/gorm",
        value: 600,
      },
      {
        name: "sqlx",
        href: "https://github.com/jmoiron/sqlx",
        value: 500,
      },
      {
        name: "graphql-go",
        href: "https://github.com/graphql-go/graphql",
        value: 450,
      },
      {
        name: "Envoy",
        href: "https://www.envoyproxy.io/",
        value: 500,
      },
      {
        name: "Jaeger",
        href: "https://www.jaegertracing.io/",
        value: 800,
      },
      {
        name: "viper",
        href: "https://github.com/spf13/viper",
        value: 300,
      },
      {
        name: "cobra",
        href: "https://github.com/spf13/cobra",
        value: 250,
      },
    ],
  },
  {
    title: "Rust",
    icon: "rust",
    libraries: [
      {
        name: "Actix",
        href: "https://actix.rs/",
        value: 1000,
      },
      {
        name: "Diesel",
        href: "https://diesel.rs/",
        value: 800,
      },
      {
        name: "Tokio",
        href: "https://tokio.rs/",
        value: 700,
      },
      {
        name: "Serde",
        href: "https://serde.rs/",
        value: 600,
      },
      {
        name: "Chrono",
        href: "https://github.com/chronotope/chrono",
        value: 400,
      },
      {
        name: "reqwest",
        href: "https://docs.rs/reqwest/0.9.15/reqwest/",
        value: 300,
      },
      {
        name: "Clap",
        href: "https://github.com/clap-rs/clap",
        value: 200,
      },
      {
        name: "Dialoguer",
        href: "https://github.com/console-rs/dialoguer",
        value: 150,
      },
    ],
  },
  {
    title: "PHP",
    icon: "php",
    libraries: [
      {
        name: "Symfony",
        href: "https://symfony.com/",
        value: 1000,
      },
      {
        name: "Lumen",
        href: "https://lumen.laravel.com/docs/10.x",
        value: 300,
      },
      {
        name: "Doctrine",
        href: "https://www.doctrine-project.org/",
        value: 500,
      },
      {
        name: "Laravel",
        href: "https://laravel.com/",
        value: 600,
      },
      {
        name: "CakePHP",
        href: "https://cakephp.org/",
        value: 250,
      },
      {
        name: "Twig",
        href: "https://twig.symfony.com/",
        value: 200,
      },
      {
        name: "PHPMailer",
        href: "https://github.com/PHPMailer/PHPMailer",
        value: 200,
      },
      {
        name: "Composer",
        href: "https://getcomposer.org/",
        value: 200,
      },
    ],
  },
  {
    title: "C#",
    icon: "csharp",
    libraries: [
      {
        name: "ASP.NET",
        href: "https://dotnet.microsoft.com/en-us/apps/aspnet",
        value: 1000,
      },
      {
        name: "MSSQL",
        href: "https://www.microsoft.com/en-us/sql-server/sql-server-downloads",
        value: 800,
      },
      {
        name: "PL/SQL",
        href: "https://www.oracle.com/database/technologies/appdev/plsql.html",
        value: 550,
      },
      {
        name: "Dapper",
        href: "https://github.com/DapperLib/Dapper",
        value: 650,
      },
      {
        name: "ElasticSearch",
        href: "https://www.elastic.co/",
        value: 150,
      },
      {
        name: "IdentityServer",
        href: "https://github.com/IdentityServer/IdentityServer4",
        value: 200,
      },
      {
        name: "SOAP",
        href: "https://www.soapui.org/",
        value: 300,
      },
      {
        name: "Swagger",
        href: "https://swagger.io/",
        value: 200,
      },
      {
        name: "EF Core",
        href: "https://learn.microsoft.com/en-us/ef/",
        value: 250,
      },
      {
        name: "Razor",
        href: "https://learn.microsoft.com/en-us/aspnet/core/razor-pages/",
        value: 200,
      },
    ],
  },
  /* {
    title: "SQL",
    icon: "mysql",
    libraries: [
      "SQLite",
      "MySQL",
      "PostgreSQL",
      "Oracle PL/SQL",
      "MSSQL",
      "Neo4j",
      "Amazon RDS",
      "DyanmoDB",
    ],
  }, */
];
