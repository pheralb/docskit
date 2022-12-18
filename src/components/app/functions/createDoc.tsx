import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Button from "@/ui/button";
import Modal from "@/ui/modal";
import { BiCheck } from "react-icons/bi";
import { MaybeSession, TypedSupabaseClient } from "@/types/supabase";
import { nanoid } from "nanoid";
import { toastStyle } from "@/styles/toast";
import { useNavigate } from "@remix-run/react";

type InputTypes = {
  title: string;
};

interface CreateDocProps {
  supabase: TypedSupabaseClient;
  session: MaybeSession;
  btnClass?: string;
  btnIcon?: React.ReactNode;
}

const CreateDoc = ({
  session,
  supabase,
  btnClass,
  btnIcon,
}: CreateDocProps) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>();
  const navigate = useNavigate();

  const handleCreateModal = () => {
    setOpen(!open);
  };

  const onSubmit: SubmitHandler<InputTypes> = async (data) => {
    const slug = nanoid(8);
    try {
      const { error } = await supabase
        .from("docs")
        .insert([
          {
            user_id: session?.user.id,
            title: data.title,
            slug,
          },
        ])
        .single();

      if (error) toast(`🚧 ${error.message}`, toastStyle);

      toast("✨ New document created", toastStyle);
      navigate(`/app/${slug}`);
    } catch (error) {
      toast(`🚧 ${error}`, toastStyle);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className={btnClass} icon={btnIcon}>
        New document
      </Button>
      <Modal open={open} close={handleCreateModal} title="Create new document">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="mb-1">Title:</label>
          <input
            className="w-full px-3 py-2 font-medium transition-all duration-200 border rounded-md shadow-sm outline-none bg-neutral-900 hover:bg-neutral-900 border-neutral-800 focus:ring-0"
            type="text"
            placeholder="Enter document title"
            {...register("title", { required: true })}
          />
          {errors.title && <span>This field is required</span>}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-2 bg-neutral-700"
              icon={<BiCheck size={19} />}
            >
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateDoc;
