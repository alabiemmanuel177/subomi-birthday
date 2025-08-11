import {
    Html, Head, Preview, Body, Container, Section, Heading, Text, Hr,
  } from "@react-email/components";
  
  type Props = {
    name: string;
    attending: boolean;
    gender?: "MALE" | "FEMALE";
    relation?: string | null;
    dateText?: string;     // e.g. "Saturday, 23rd August"
    startText?: string;    // e.g. "Arrivals 5:00 PM • Start 6:00 PM"
  };
  
  export default function RSVPConfirm({
    name,
    attending,
    gender,
    relation,
    dateText = "Saturday, 30th August",
    startText = "12pm prompt",
  }: Props) {
    const title = attending
      ? "You’re in! ✨"
      : "Thanks for letting us know 💌";
  
    return (
      <Html>
        <Head />
        <Preview>{title} — Subomi’s Denim & Diamonds</Preview>
        <Body style={styles.body}>
          <Container style={styles.card}>
            <Section>
              <Heading style={styles.h1}>Subomi’s 21st</Heading>
              <Text style={styles.tagline}>Denim and Diamonds and Silver</Text>
            </Section>
  
            <Hr style={styles.hr} />
  
            <Section>
              <Heading as="h2" style={styles.h2}>{title}</Heading>
              <Text style={styles.p}>
                Hi {name.split(" ")[0]}, thank you for your RSVP
                {attending ? " — we can’t wait to sparkle with you!" : "."}
              </Text>
  
              <Text style={styles.p}>
                <strong>Date:</strong> {dateText}<br />
                <strong>Time:</strong> {startText}<br />
                <strong>Dress Code:</strong> Blue denim with silver accents ✨
              </Text>
  
              {!!relation && (
                <Text style={styles.p}><strong>Relation:</strong> {relation}</Text>
              )}
              {!!gender && (
                <Text style={styles.p}><strong>Gender:</strong> {gender === "MALE" ? "Male" : "Female"}</Text>
              )}
  
              {attending ? (
                <Text style={styles.p}>
                  Venue details will be sent privately closer to the date. Get ready to shine!
                </Text>
              ) : (
                <Text style={styles.p}>
                  We’ll miss you this time — thanks for the heads up.
                </Text>
              )}
            </Section>
  
            <Hr style={styles.hr} />
  
            <Section>
              <Text style={styles.foot}>
                With 💙 for Olasubomi — Subie’s 21st
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
  
  const styles: Record<string, React.CSSProperties> = {
    body: {
      margin: 0,
      background: "#142642",
      color: "#F5F7F8",
      fontFamily: '"Cormorant Garamond", ui-serif, Georgia, serif',
    },
    card: {
      maxWidth: 560,
      margin: "24px auto",
      background: "#1a325b",
      borderRadius: 16,
      padding: "28px 28px 24px",
      border: "1px solid rgba(192,206,216,0.35)",
    },
    h1: {
      margin: 0,
      fontSize: 32,
      lineHeight: "36px",
      textAlign: "center",
      letterSpacing: "0.02em",
    },
    tagline: {
      marginTop: 6,
      textAlign: "center",
      opacity: 0.9,
    },
    hr: {
      borderColor: "rgba(192,206,216,0.35)",
      margin: "16px 0",
    },
    h2: {
      margin: "6px 0 8px",
      fontSize: 22,
    },
    p: {
      margin: "8px 0",
      fontSize: 16,
      lineHeight: "24px",
    },
    foot: {
      fontSize: 13,
      opacity: 0.9,
      textAlign: "center",
    },
  };
  