import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Button from "@/ui/button";
import Modal from "@/ui/modal";
import { BiCheck, BiTrash } from "react-icons/bi";
import { MaybeSession, TypedSupabaseClient } from "@/types/supabase";
import { toastStyle } from "@/styles/toast";
import { useNavigate } from "@remix-run/react";
import Alert from "../alert";

type InputTypes = {
  title: string;
  description: string;
};

interface EditDocProps {
  supabase: TypedSupabaseClient;
  session: MaybeSession;
  title?: string;
  description?: string;
  slug?: string;
  btnClass?: string;
  btnIcon?: React.ReactNode;
}

const EditDocInfo = ({
  title,
  description,
  slug,
  supabase,
  btnClass,
  btnIcon,
}: EditDocProps) => {
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
    try {
      const { error } = await supabase
        .from("docs")
        .update({ title: data.title, description: data.description })
        .eq("slug", slug);

      if (error) {
        toast(`Error: ${error.message}`, toastStyle);
      }
      toast(`Saved 🎉`, toastStyle);
      navigate(".", { replace: true });
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };

  const deleteDoc = async () => {
    try {
      const { error } = await supabase.from("docs").delete().eq("slug", slug);
      if (error) {
        toast(`Error: ${error.message}`, toastStyle);
      }
      toast(`🚧 Document deleted successfully`, toastStyle);
      navigate("/app");
    } catch (error) {
      console.log(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className={btnClass} icon={btnIcon}>
        Settings
      </Button>
      <Modal open={open} close={handleCreateModal} title="Settings">
        <h3 className="mb-1">Information:</h3>
        <div className="p-3 mb-3 border rounded-md border-neutral-800">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Title:</label>
            <input
              className="w-full px-3 py-2 mb-4 font-medium transition-all duration-200 border rounded-md shadow-sm outline-none bg-neutral-900 hover:bg-neutral-900 border-neutral-800 focus:ring-0"
              type="text"
              defaultValue={title}
              placeholder="Enter document title"
              {...register("title", { required: true })}
            />
            <label>Description:</label>
            <textarea
              className="w-full px-3 py-2 font-medium transition-all duration-200 border rounded-md shadow-sm outline-none bg-neutral-900 hover:bg-neutral-900 border-neutral-800 focus:ring-0"
              defaultValue={description}
              placeholder="Enter document description"
              {...register("description")}
            />
            {errors.title && <Alert message="Title is required" />}
            <div className="flex justify-end space-x-2">
              <Button
                type="submit"
                className="mt-2 border border-neutral-800"
                icon={<BiCheck size={19} />}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
        <h3>Danger:</h3>
        <Button
          className="w-full mt-2 text-red-400 border border-neutral-800"
          icon={<BiTrash size={19} />}
          onClick={deleteDoc}
        >
          Delete document
        </Button>
      </Modal>
    </>
  );
};

export default EditDocInfo;
