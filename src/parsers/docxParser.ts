export async function parseDocx(file: File): Promise<string> {
  const mammoth = await import("mammoth");

  const arrayBuffer = await file.arrayBuffer();

  const result = await mammoth.extractRawText({ arrayBuffer });

  if (result.messages.length > 0) {
    const warnings = result.messages
      .filter((m) => m.type === "warning")
      .map((m) => m.message)
      .join(", ");
    if (warnings) {
      console.warn(`[docxParser] Warnings for ${file.name}: ${warnings}`);
    }
  }

  return result.value.trim();
}

