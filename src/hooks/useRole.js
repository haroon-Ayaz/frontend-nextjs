import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function useRole() {
    const [role, setRole] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole');
        if (!storedRole) {
            router.push('/auth/login'); // Or handle differently
        } else {
            setRole(storedRole);
        }
    }, [router]);

    return role;
}

export default useRole;