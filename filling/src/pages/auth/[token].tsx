import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Auth() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:8000/verify/${token}`, {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
    })();
  }, []);

  return (
    <div>
      <p>You are logged in with token: {token}</p>
    </div>
  );
}

export default Auth;
