"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="errorPage">
      <h2>Sorry, something went very wrong 😔</h2>
      <button onClick={() => reset()}>{"Let's try again"}</button>
    </main>
  );
}
