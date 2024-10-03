import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ClearLocalStorageAndRedirect() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("username");

    router.push("/pragati");
  }, [router]);

  return (
    <div className="min-h-screen bg-[hsl(210,100%,6%)] text-[hsl(180,100%,90%)] flex items-center justify-center">
      <p className="text-2xl font-bold">Resetting...</p>
    </div>
  );
}
