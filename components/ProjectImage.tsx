"use client";

import { useState } from "react";

type ProjectImageProps = {
  repoName: string;
  formattedName: string;
  liveUrl: string | null;
};

export default function ProjectImage({ repoName, formattedName, liveUrl }: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);

  const content = hasError ? (
    <p className="py-16 text-sm text-muted">Image Preview Not Available</p>
  ) : (
    <img
      src={`/projects/${repoName}.png`}
      alt={`${formattedName} preview`}
      className="h-full w-full object-cover"
      onError={() => setHasError(true)}
    />
  );

  return (
    <div className="mt-4 flex w-full max-w-2xl items-center justify-center overflow-hidden rounded-sm bg-[var(--card-bg)] md:rounded-xl">
      {liveUrl && !hasError ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full w-full cursor-pointer"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}