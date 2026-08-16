import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/PageHeader";
import { Prose } from "@/components/Prose";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  robots: { index: true, follow: false },
};

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Datenschutzerklärung" />
      <Section pad="tight">
        <Container>
          <Prose>
            <p>
              Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Wir
              verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen
              Bestimmungen (DSGVO, BDSG, TDDDG). In dieser Datenschutzerklärung
              informieren wir Sie über die wichtigsten Aspekte der
              Datenverarbeitung im Rahmen unserer Website.
            </p>

            <h2>1. Verantwortlicher</h2>
            <p>
              <strong>{company.name}</strong>
              <br />
              {company.role} {company.owner}
              <br />
              {company.street}, {company.city}
              <br />
              Telefon: {company.phone}
              <br />
              E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>

            <h2>2. Zugriffsdaten / Server-Logfiles</h2>
            <p>
              Beim Aufruf unserer Website werden automatisch Informationen
              erfasst, die Ihr Browser übermittelt. Dies sind insbesondere:
            </p>
            <ul>
              <li>IP-Adresse des anfragenden Geräts</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Name und URL der abgerufenen Datei</li>
              <li>verwendeter Browser und ggf. das Betriebssystem</li>
              <li>Referrer-URL</li>
            </ul>
            <p>
              Die Verarbeitung erfolgt zur Gewährleistung eines reibungslosen
              Verbindungsaufbaus, einer komfortablen Nutzung sowie zur Auswertung
              der Systemsicherheit und -stabilität. Rechtsgrundlage ist unser
              berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO.
            </p>

            <h2>3. Hosting</h2>
            <p>
              Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133,
              Walnut, CA 91789, USA, gehostet. Beim Besuch unserer Website werden
              technische Zugriffsdaten auf den Servern von Vercel verarbeitet.
              Eine Datenübermittlung in die USA kann stattfinden; Vercel stellt
              hierfür geeignete Garantien (u. a.
              EU-Standardvertragsklauseln) bereit. Rechtsgrundlage ist Art. 6
              Abs. 1 lit. f DSGVO.
            </p>

            <h2>4. Kontaktaufnahme und Formulare</h2>
            <p>
              Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren,
              verarbeiten wir die von Ihnen angegebenen Daten (Name, E-Mail-Adresse,
              ggf. Telefonnummer, Betrieb und Ihre Nachricht) zur Bearbeitung Ihrer
              Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung
              bzw. Erfüllung eines Vertrags) bzw. Art. 6 Abs. 1 lit. f DSGVO. Die
              Daten werden gelöscht, sobald sie für die Zweckerreichung nicht mehr
              erforderlich sind und keine gesetzlichen Aufbewahrungspflichten
              entgegenstehen.
            </p>

            <h2>5. Cookies</h2>
            <p>
              Unsere Website verwendet Cookies. Technisch notwendige Cookies sind
              für den Betrieb der Website erforderlich und werden auf Grundlage von
              Art. 6 Abs. 1 lit. f DSGVO bzw. § 25 Abs. 2 TDDDG gesetzt.
              Analyse-Cookies werden ausschließlich nach Ihrer Einwilligung
              (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG) gesetzt. Weitere
              Informationen finden Sie in unserer{" "}
              <a href="/cookies">Cookie-Richtlinie</a>.
            </p>

            <h2>6. Webanalyse (Google Tag Manager / Google Ads)</h2>
            <p>
              Soweit Sie eingewilligt haben, nutzen wir den Google Tag Manager
              sowie Dienste von Google (z. B. Google Ads) der Google Ireland
              Limited, Gordon House, Barrow Street, Dublin 4, Irland. Diese Dienste
              können Cookies setzen und Nutzungsdaten verarbeiten. Rechtsgrundlage
              ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können
              Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.
            </p>

            <h2>7. Webanalyse mit Matomo (Self-Hosting)</h2>
            <p>
              Wir nutzen den Open-Source-Analysedienst Matomo, den wir auf
              eigenen Servern in Deutschland selbst hosten. Es werden keine Daten
              an Dritte übermittelt. Matomo ist bei uns{" "}
              <strong>cookielos</strong> konfiguriert und setzt keine Cookies;
              Ihre IP-Adresse wird vor der Speicherung gekürzt
              (anonymisiert). Eine Identifizierung einzelner Besucher findet
              nicht statt. Auf Grundlage dieser Daten werten wir die Nutzung
              unserer Website statistisch aus, um sie zu verbessern.
              Rechtsgrundlage ist unser berechtigtes Interesse an einer
              bedarfsgerechten Gestaltung unserer Website gemäß Art. 6 Abs. 1
              lit. f DSGVO. Da Matomo cookielos arbeitet und die Daten
              ausschließlich auf unseren eigenen Servern verarbeitet werden, ist
              hierfür keine Einwilligung erforderlich.
            </p>

            <h2>8. Empfänger / Auftragsverarbeitung</h2>
            <p>
              Eine Übermittlung Ihrer Daten an Dritte findet nur statt, soweit dies
              gesetzlich zulässig ist oder Sie eingewilligt haben. Mit
              Dienstleistern, die in unserem Auftrag Daten verarbeiten, schließen
              wir Verträge zur Auftragsverarbeitung nach Art. 28 DSGVO.
            </p>

            <h2>9. Ihre Rechte</h2>
            <p>Ihnen stehen nach der DSGVO insbesondere folgende Rechte zu:</p>
            <ul>
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
              <li>Recht auf Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
            </ul>
            <p>
              Zudem haben Sie das Recht, sich bei einer
              Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Zuständig
              ist u. a. die Landesbeauftragte für den Datenschutz Niedersachsen.
            </p>

            <h2>10. Datensicherheit</h2>
            <p>
              Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein,
              um Ihre Daten zu schützen. Die Datenübertragung auf unserer Website
              erfolgt SSL/TLS-verschlüsselt.
            </p>

            <h2>11. Aktualität</h2>
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
              stets den aktuellen rechtlichen Anforderungen entspricht oder um
              Änderungen unserer Leistungen umzusetzen. Es gilt die jeweils hier
              veröffentlichte Fassung.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
