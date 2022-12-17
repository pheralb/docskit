import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  open: boolean;
  close: () => void;
}

const Modal = (props: ModalProps) => {
  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={props.close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left text-white align-middle transition-all transform shadow-xl rounded-2xl bg-midnight">
                {props.title && (
                  <Dialog.Title
                    as="h3"
                    className="mb-4 text-lg font-medium leading-6 text-gray-400"
                  >
                    {props.title}
                  </Dialog.Title>
                )}
                {props.children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
