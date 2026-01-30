import "./styles/app.css";

function App() {
  return (
    <>
      <h1>Jestem Adam</h1>
      <h2>Aspiruję na stanowisko Junior Front-end developera</h2>

      <p>
        W tym miejscu planuję zebrać moje projekty i pomysły, aby prezentować
        umiejętności i kompetnecje
      </p>
      <p>
        Do tej pory zebrałem
        <strong> 6 miesięcy komercyjnego doświadczenia</strong> na AGH
      </p>
      <p></p>

      <p className="read-the-docs">
        <a
          href="https://github.com/adamzagorski92/turbo-adam"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tutaj możesz obejrzeć kod źródłowy tej strony
        </a>
      </p>
      <p className="read-the-docs">
        <a
          href="https://www.linkedin.com/in/adazag/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tutaj mój Linkedin
        </a>
      </p>
      <p>
        <a
          href="https://www.adamzagorski.pl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tutaj trochę więcej o mnie
        </a>
      </p>
      <hr />
      <p>
        Stronę zbudowałem przy użyciu React, TypeScript i Turborepo na serwerze
        deweloperskim <a href="https://mikr.us/?r=adamzagorski">Mikrus</a>.
        Więcej informacji w kodzie źródłowym.
      </p>
    </>
  );
}

export default App;
