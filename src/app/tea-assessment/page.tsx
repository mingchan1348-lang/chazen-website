"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// /tea-assessment and /tea-test used to render the identical quiz component under two
// separate URLs. /tea-test is the canonical route (it's what every nav link, CTA, and
// footer link on the site already points to), so this route now redirects there instead
// of duplicating the experience.
export default function TeaAssessmentPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/tea-test/");
  }, [router]);

  return (
    <main className="section">
      <div className="container text-center">
        <p className="text-sm text-ink/60">
          This page has moved. Redirecting to{" "}
          <Link href="/tea-test/" className="underline">
            the Tea Test
          </Link>
          ...
        </p>
      </div>
    </main>
  );
}
