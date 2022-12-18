import { useState, ReactNode } from "react";
import { MaybeSession, TypedSupabaseClient } from "@/types/supabase";

import Button from "@/ui/button";
import Modal from "@/ui/modal";
import { BiArrowFromBottom, BiRocket } from "react-icons/bi";
import { GiDialPadlock } from "react-icons/gi";
import Alert from "../alert";
import { toast } from "react-hot-toast";
import { toastStyle } from "@/styles/toast";
import Input from "@/ui/input";
import { useNavigate } from "@remix-run/react";

interface ShareDocProps {
  supabase: TypedSupabaseClient;
  session: MaybeSession;
  slug?: string;
  public?: boolean;
  btnClass?: string;
  btnIcon?: ReactNode;
}

const ShareDoc = (props: ShareDocProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleShareModal = () => {
    setOpen(!open);
  };

  const handleMakePublic = async (status: boolean) => {
    try {
      const { error } = await props.supabase
        .from("docs")
        .update({ public: status })
        .eq("slug", props.slug);
      if (error) {
        toast(`Error: ${error.message}`, toastStyle);
      }
      if (status) {
        toast(`🎉 Document published`, toastStyle);
      } else {
        toast(`🔒 Your document is private`, toastStyle);
      }
      navigate(".", { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="border border-neutral-800"
        icon={<BiArrowFromBottom size={18} />}
      >
        Share
      </Button>
      <Modal open={open} close={handleShareModal} title="Share">
        {props.public ? (
          <>
            <p className="mb-2 text-sm text-gray-300">
              This document is public. Anyone with the link can view it:
            </p>
            <Input
              value={`https://docskit.vercel.app/doc/${props.slug}`}
              disabled={true}
            />
            <Button
              icon={<GiDialPadlock size={20} />}
              className="w-full mt-2 border border-neutral-700"
              onClick={() => handleMakePublic(false)}
            >
              Make private
            </Button>
          </>
        ) : (
          <>
            <Alert message="Your document is not public yet. Do not share sensitive or copyrighted content." />
            <p className="mt-5">Click here to publish the document:</p>
            <Button
              icon={<BiRocket size={20} />}
              className="w-full mt-2 border border-neutral-700"
              onClick={() => handleMakePublic(true)}
            >
              Publish
            </Button>
          </>
        )}
      </Modal>
    </>
  );
};

export default ShareDoc;
