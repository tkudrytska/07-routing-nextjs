import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

type Props = {
  searchParams: Promise<{
    searchQuery?: string;
    page?: string;
  }>;
};

const Notes = async ({ searchParams }: Props) => {
  const { searchQuery = "", page = "1" } = await searchParams;

  const currentPage = Number(page);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default Notes;
