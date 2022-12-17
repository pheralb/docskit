import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/ui/button";
import Modal from "@/ui/modal";
import { BiCheck } from "react-icons/bi";
import { MaybeSession, TypedSupabaseClient } from "@/types/supabase";
import { nanoid } from "nanoid";

type InputTypes = {
  title: string;
};

interface CreateDocProps {
  supabase: TypedSupabaseClient;
  session: MaybeSession;
  btnClass?: string;
}

const CreateDoc = ({ session, supabase, btnClass }: CreateDocProps) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>();

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
      alert(error?.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className={btnClass}>
        New document
      </Button>
      <Modal open={open} close={handleCreateModal} title="Create new document">
        <form onSubmit={handleSubmit(onSubmit)}>
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
