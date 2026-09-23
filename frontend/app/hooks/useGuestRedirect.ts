import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authcontext";

export const useGuestRedirect = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    }
  }, [user, router]);

  return user;
};