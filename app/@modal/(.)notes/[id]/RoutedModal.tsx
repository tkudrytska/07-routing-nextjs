"use client";

import { useRouter } from "next/navigation";
import Modal from "../../../../components/Modal/Modal";

type Props = {
  children: React.ReactNode;
};

const RoutedModal = ({ children }: Props) => {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      {children}
    </Modal>
  );
}

export default RoutedModal;