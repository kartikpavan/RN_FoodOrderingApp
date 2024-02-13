import { useContext, createContext, PropsWithChildren, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Profile } from "../types";

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  profile: Profile | null;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      // Fetch user profile
      if (session) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data || null);
      }
      setLoading(false);
    };
    fetchSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        profile,
        isAdmin: profile?.group === "ADMIN",
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
