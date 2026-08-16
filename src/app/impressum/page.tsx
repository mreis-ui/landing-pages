import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG.",
  robots: { index: true, follow: false },
};

export default function ImpressumPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Impressum" />
      <Section pad="tight">
        <Container>
          <Prose>
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              {company.name}
              <br />
              {company.street}
              <br />
              {company.city}
            </p>

            <h2>Vertreten durch</h2>
            <p>
              {company.role} {company.owner}
            </p>

            {company.registerNo && (
              <>
                <h2>Handelsregister</h2>
                <p>
                  Registergericht: {company.registerCourt}
                  <br />
                  Registernummer: {company.registerNo}
                </p>
              </>
            )}

            <h2>Kontakt</h2>
            <p>
              Telefon: {company.phone}
              <br />
              E-Mail:{" "}
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <br />
              Web: www.{company.domain}
            </p>

            <h2>Umsatzsteuer / Steuer</h2>
            <p>
              {company.vatId.startsWith("DE")
                ? "Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: "
                : "Steuernummer: "}
              {company.vatId}
            </p>

            <h2>Tätigkeit</h2>
            <p>{company.classification}</p>

            <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>
              {company.owner}
              <br />
              {company.street}, {company.city}
            </p>

            <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>

            <h2>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur
              Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberührt.
            </p>

            <h2>Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren
              Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich. Die verlinkten Seiten wurden zum
              Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
              jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht
              zumutbar.
            </p>

            <h2>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge
              Dritter sind als solche gekennzeichnet. Die Vervielfältigung,
              Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
              jeweiligen Autors bzw. Erstellers.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
