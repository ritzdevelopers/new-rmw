import { revalidatePath } from "next/cache";

/** Bust the /blogs listing cache after admin create/update/delete. */
export function revalidateBlogListingPages() {
  revalidatePath("/blogs");
}
