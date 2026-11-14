import "./PressmenTools.scss";
import parse from "html-react-parser";

export interface PressmenToolsProps {
    tipInfo: string;
    tipSelector: string;
}

export function PressmenTools ({tipInfo, tipSelector}: PressmenToolsProps) {
  return (
    <article className="pressmen-tools animate__animated animate__fadeIn animate__fast">
      <header className="pressmen-tools__header">
        <h2 className="pressmen-tools__title">Styles | {tipSelector}</h2>
      </header>
      <section className="pressmen-tools__main">
        {parse(tipInfo)}
      </section>
    </article>
  );
}
