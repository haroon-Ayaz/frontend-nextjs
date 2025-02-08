import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function useCurrentUser() {
  const [user, setUser] = useState({ role: "", email: "", fname: "" });
    const router = useRouter();

    useEffect(() => {
      // Ensure the code only runs on the client
      if (typeof window !== "undefined") {
        const storedRole = localStorage.getItem('userRole');
        const storedEmail = localStorage.getItem('userEmail');
        const storedFname = localStorage.getItem('fname');

        if (!storedRole) {
          router.push('/auth/login');
          return;
        }

        setUser({
          role: storedRole,
          email: storedEmail || "",
          fname: storedFname || ""
        });
      }
    }, [router]);

    return user;
  }

  export default useCurrentUser;
  