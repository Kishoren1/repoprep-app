import ExcelJS from "exceljs";

const MAX_ROWS_PER_SHEET = 500;

export async function parseXlsx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(arrayBuffer);

  if (workbook.worksheets.length === 0) {
    throw new Error("Workbook contains no sheets.");
  }

  const sections: string[] = [];

  for (const sheet of workbook.worksheets) {
    // Collect all non-empty rows as arrays of cell values
    const rows: string[][] = [];

    sheet.eachRow({ includeEmpty: false }, (row) => {
      const cells = (row.values as ExcelJS.CellValue[])
        // exceljs row.values is 1-indexed — index 0 is always undefined
        .slice(1)
        .map((cell) => {
          if (cell === null || cell === undefined) return "";

          // Rich text objects → plain string
          if (typeof cell === "object" && "richText" in cell) {
            return (cell as ExcelJS.CellRichTextValue).richText
              .map((r) => r.text)
              .join("");
          }

          // Date objects → ISO string
          if (cell instanceof Date) {
            return cell.toISOString();
          }

          // Formula results → use the cached result value
          if (typeof cell === "object" && "result" in cell) {
            const result = (cell as ExcelJS.CellFormulaValue).result;
            return result !== undefined && result !== null
              ? String(result)
              : "";
          }

          return String(cell);
        });

      rows.push(cells);
    });

    if (rows.length === 0) continue;

    const truncated = rows.length > MAX_ROWS_PER_SHEET;
    const visible = truncated ? rows.slice(0, MAX_ROWS_PER_SHEET) : rows;

    const csvLines = visible.map((row) =>
      row
        .map((cell) => {
          const s = cell.replace(/"/g, '""');
          return s.includes(",") || s.includes("\n") || s.includes('"')
            ? `"${s}"`
            : s;
        })
        .join(", "),
    );

    let block = `[Sheet: ${sheet.name}]\n${csvLines.join("\n")}`;
    if (truncated) {
      block += `\n\n[... truncated — showing ${MAX_ROWS_PER_SHEET} of ${rows.length} rows ...]`;
    }

    sections.push(block);
  }

  if (sections.length === 0) {
    throw new Error("No data found in workbook — all sheets appear empty.");
  }

  return sections.join("\n\n");
}

