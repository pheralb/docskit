import Button from "@/ui/button";
import { BsGear } from "react-icons/bs";

interface UserCardProps {
  pic: string;
  name: string;
  children?: React.ReactNode;
}

const UserCard = (props: UserCardProps) => {
  return (
    <div className="px-3 py-4 mt-4 mb-1 text-gray-300 rounded-md bg-neutral-800/60">
      <div className="flex items-center mb-3 space-x-3">
        <img src={props.pic} alt={props.name} className="h-5 rounded-full" />
        <p className="font-medium">{props.name}</p>
      </div>
      {props.children}
      <Button
        className="w-full shadow-none bg-neutral-700/20"
        icon={<BsGear size={15} />}
      >
        Settings
      </Button>
    </div>
  );
};

export default UserCard;
