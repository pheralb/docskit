import { TypedSupabaseClient } from "@/types/supabase";
import Button from "@/ui/button";
import { useNavigate } from "@remix-run/react";
import { BiLogOut } from "react-icons/bi";

interface UserCardProps {
  pic: string;
  name: string;
  children?: React.ReactNode;
  supabase: TypedSupabaseClient;
}

const UserCard = ({ pic, name, children, supabase }: UserCardProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="px-3 py-4 mt-4 mb-1 text-gray-300 rounded-md bg-neutral-800/60">
      <div className="flex items-center mb-3 space-x-3">
        <img src={pic} alt={name} className="h-5 rounded-full" />
        <p className="font-medium">{name}</p>
      </div>
      {children}
      <Button
        className="w-full shadow-none bg-neutral-700/20"
        icon={<BiLogOut size={15} />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserCard;
