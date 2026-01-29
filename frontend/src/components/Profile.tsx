"use client";
import { getProfile } from "@/hooks/useAuth";
import { User } from "@/types";
import Image from "next/image";
import Button from "./Button";
import { useEffect, useState } from "react";

export default function Profile() {
  const { userProfile, loading } = getProfile();
  const [user, setUser] = useState<User[]>([]);
console.log(userProfile);
  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    }
  }, [userProfile]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user.map((userData) => (
        <form action="">
          <div>
            <div>
              <Image
                src={userData.image}
                alt="Photo Profile"
                width={400}
                height={400}
                className="border rounded-full"
              />
            </div>
          </div>
          <div>
            <input type="text" placeholder="Nom" value={userData.username} />
            <input type="text" placeholder="Email" value={userData.email} />
            <input
              type="text"
              placeholder="Password"
              value={userData.password}
            />
            <Button>Modifier vos informations</Button>
          </div>
        </form>
      ))}
    </>
  );
}
