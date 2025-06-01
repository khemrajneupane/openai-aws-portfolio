"use client";
export default function PDFViewer() {
  return (
    <div style={{ height: "100vh" }}>
      <iframe
        src="/CV_Neupane.pdf"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      >
        <p>
          Your browser doesn&apos;t support PDFs.
          <a href="/documents/CV_Neupane.pdf">Download the file</a>.
        </p>
      </iframe>
    </div>
  );
}
