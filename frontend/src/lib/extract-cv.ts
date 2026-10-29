
const mammoth = await import("mammoth");
export async function extractCvText(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase();

  let text: string;

  if (extension === "pdf") {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");

    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

    const pdf = await pdfjs.getDocument({
      data: await file.arrayBuffer(),
    }).promise;

    const pages: string[] = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      pages.push(
        content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" "),
      );
    }

    text = pages.join("\n");
  } else if (extension === "docx") {
    // const mammoth = await import("mammoth/mammoth.browser");

    const result = await mammoth.extractRawText({
      arrayBuffer: await file.arrayBuffer(),
    });

    text = result.value;
  } else if (extension === "doc") {
    throw new Error(
      "Legacy .doc files are not supported. Please upload a PDF or DOCX file.",
    );
  } else {
    throw new Error("Please upload a PDF or DOCX file.");
  }

  return text
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}