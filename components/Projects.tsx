import ProjectStack from "@/components/ProjectStack";

type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string;
  stargazerCount: number;
  primaryLanguage: { name: string } | null;
};

async function getPinnedRepos(): Promise<Repo[]> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          user(login: "Squ1nty") {
            pinnedItems(first: 5, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  description
                  url
                  homepageUrl
                  stargazerCount
                  primaryLanguage { name }
                }
              }
            }
          }
        }
      `,
    }),
    cache: "no-store",
  });

  const json = await res.json();
  console.log("GitHub response:", JSON.stringify(json, null, 2));
  return json.data?.user?.pinnedItems?.nodes ?? [];
}

export default async function Projects() {
  const repos = await getPinnedRepos();
  return <ProjectStack repos={repos} />;
}