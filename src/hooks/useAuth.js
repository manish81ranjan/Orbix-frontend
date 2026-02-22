import { useAuth as useAuthContext } from "@/store/auth.store";

/**
 * useAuth
 * - Simple re-export hook
 * - Keeps imports clean across app
 */
export default function useAuth() {
  return useAuthContext();
}
