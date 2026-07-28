import CertifSection from './CertifSection';
import LangTools from './LangTools';
import Me from './Me';

export default function About() {
  return (
    <section id="about" className="section-wrap">
      <div className="container">
        <Me />
        <LangTools />
        <CertifSection />
      </div>
    </section>
  )
}