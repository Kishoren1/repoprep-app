export async function parsePdf(file: File): Promise<string> {
  const pdfjsLib = await import("pdfjs-dist");

  if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();
  }

  const arrayBuffer = await file.arrayBuffer();

  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(arrayBuffer),
    verbosity: 0,
  });

  const pdf = await loadingTask.promise;

  if (pdf.numPages === 0) {
    throw new Error("PDF has no pages");
  }

  const pageTexts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const lines: string[] = [];
    let currentLine = "";
    let lastY: number | null = null;

    for (const item of content.items) {
      if (!("str" in item)) continue;
      const textItem = item as { str: string; transform: number[] };
      const y = Math.round(textItem.transform[5]);

      if (lastY !== null && Math.abs(y - lastY) > 2) {
        const trimmed = currentLine.trim();
        if (trimmed) lines.push(trimmed);
        currentLine = textItem.str;
      } else {
        currentLine +=
          currentLine &&
          !currentLine.endsWith(" ") &&
          textItem.str &&
          !textItem.str.startsWith(" ")
            ? " " + textItem.str
            : textItem.str;
      }

      lastY = y;
    }

    const lastLine = currentLine.trim();
    if (lastLine) lines.push(lastLine);

    const pageText = lines
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    if (pageText) pageTexts.push(`[Page ${i}]\n${pageText}`);
  }

  if (pageTexts.length === 0) {
    throw new Error(
      "No text could be extracted. The PDF may be image-only (scanned) — " +
        "OCR is not supported. Try copy-pasting the text manually.",
    );
  }

  return pageTexts.join("\n\n");
}

