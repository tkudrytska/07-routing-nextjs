import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{
    searchQuery?: string;
    page?: string;
  }>;
};

const Notes = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const query = await searchParams;

  const tag = slug[0] === "all" ? "" : slug[0];

  const searchQuery = query.searchQuery ?? "";
  const currentPage = Number(query.page ?? "1");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", searchQuery, currentPage, tag],
    queryFn: () => fetchNotes(searchQuery, currentPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default Notes;
