import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";

export const metadata: Metadata = {
  title: "Cookie-Richtlinie",
  description: "Informationen darüber, wie wir Cookies einsetzen.",
  robots: { index: true, follow: false },
};

export default function CookiesPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Cookie-Richtlinie" />
      <Section pad="tight">
        <Container>
          <Prose>
            <h2>Was sind Cookies?</h2>
            <p>
              Ein Cookie ist eine kleine Datei aus Buchstaben und Zahlen, die beim
              Besuch einer Website auf Ihren Computer heruntergeladen wird. Cookies
              helfen dabei, Ihren Computer wiederzuerkennen und die Benutzbarkeit
              der Website zu verbessern.
            </p>

            <h2>Wofür wir Cookies verwenden</h2>
            <ul>
              <li>Sicherheit und Betrugsprävention</li>
              <li>Bereitstellung unserer Dienste</li>
              <li>Performance-Messung und Analyse</li>
              <li>Verbesserung der Nutzererfahrung</li>
            </ul>

            <h2>Cookie-Kategorien</h2>
            <h3>Technisch notwendige Cookies</h3>
            <p>
              Diese Cookies sind für den Betrieb der Website erforderlich und
              können nicht deaktiviert werden. Sie werden in der Regel nur als
              Reaktion auf von Ihnen getätigte Aktionen gesetzt.
            </p>
            <h3>Analyse-Cookies (Google Tag Manager / Google Ads)</h3>
            <p>
              Diese Cookies helfen uns, das Verhalten der Besucher zu verstehen und
              unsere Website zu verbessern. Sie werden ausschließlich nach Ihrer
              ausdrücklichen Einwilligung aktiviert.
            </p>

            <h2>Cookies verwalten</h2>
            <p>
              Sie können Cookies über die Einstellungen Ihres Browsers steuern —
              etwa in Firefox, Chrome, Safari oder Edge. Weiterführende
              Informationen zur Verwaltung von Cookies finden Sie unter{" "}
              <a
                href="https://www.aboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                aboutcookies.org
              </a>{" "}
              und{" "}
              <a
                href="https://www.allaboutcookies.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                allaboutcookies.org
              </a>
              . Für Google-Analysedienste besteht zudem eine
              Opt-out-Möglichkeit.
            </p>

            <h2>Hinweis</h2>
            <p>
              Das Deaktivieren von Cookies kann zur Folge haben, dass bestimmte
              Bereiche oder Funktionen unserer Dienste nicht mehr zur Verfügung
              stehen. Wir behalten uns vor, diese Richtlinie von Zeit zu Zeit zu
              aktualisieren.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
