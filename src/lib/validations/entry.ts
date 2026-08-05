import * as z from "zod";

export const entryPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
  mood: z.string().nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
});
