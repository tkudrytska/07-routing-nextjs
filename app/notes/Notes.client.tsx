"use client";

import css from "./Notes.module.css";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import Modal from "../../components/Modal/Modal";
import NoteList from "../../components/NoteList/NoteList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Pagination from "../../components/Pagination/Pagination";
import NoteForm from "../../components/NoteForm/NoteForm";

const NotesClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("searchQuery") ?? "";
  const currentPage = Number(searchParams.get("page") ?? "1");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedHandleSearch = useDebouncedCallback(
  (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set("searchQuery", value);
    } else {
      params.delete("searchQuery");
    }
    params.set("page", "1");
    router.push(`/notes?${params.toString()}`);
  },
  300
);

  const { data } = useQuery({
    queryKey: ["note", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/notes?${params.toString()}`);
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleCreateNote = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox text={searchQuery} onSearch={debouncedHandleSearch} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={handleCreateNote}>
          Create note +
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
};

export default NotesClient;
