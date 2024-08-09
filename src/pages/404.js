import React, { useEffect } from "react";
import { useRouter } from "next/router";
function Page() {
  const router = useRouter();

  return (
    <div>
      <h1>404 Page</h1>
      <p>Page not found</p>
    </div>
  );
}

export default Page;
