// src/components/ProjectLinks.tsx
import { GlobeIcon, RepoIcon } from "@/components/Icons";

type ProjectLinksProps = {
  repoUrl: string | null;
  liveUrl: string | null;
};

export default function ProjectLinks({ repoUrl, liveUrl }: ProjectLinksProps) {
  const hasLive = Boolean(liveUrl);
  const hasRepo = Boolean(repoUrl);

  if (!hasLive && !hasRepo) {
    return (
      <p className="mt-6 text-sm text-muted">
        No links available for this project.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 mt-6 sm:gap-4">
      {hasLive ? (
        <a
          href={liveUrl!}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:opacity-85 hover:scale-105"
        >
          <GlobeIcon className="h-5 w-5" />
          Live Site
        </a>
      ) : (
        <p className="flex items-center justify-center text-center text-xs text-muted">
          Live Site Not Available
        </p>
      )}

      {hasRepo ? (
        <a
          href={repoUrl!}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-all hover:bg-black/5 hover:scale-105"
        >
          <RepoIcon className="h-4 w-4" />
          Repository
        </a>
      ) : (
        <p className="flex items-center justify-center text-center text-xs text-muted">
          Repository Not Available
        </p>
      )}
    </div>
  );
}