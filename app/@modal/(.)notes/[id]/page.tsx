import css from "./NotePreview.module.css";
import { fetchNoteById } from "../../../../lib/api";
import RoutedModal from "./RoutedModal";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id); 

  return (
    <RoutedModal>
      <div className={css.backdrop}>
        <div className={css.modal}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p>{note.tag}</p>
        </div>
      </div>
    </RoutedModal>
  );
};

export default NotePreview;