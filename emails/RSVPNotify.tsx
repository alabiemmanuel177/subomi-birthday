import {
    Html, Head, Preview, Body, Container, Section, Heading, Text, Hr,
  } from "@react-email/components";
  
  type Props = {
    name: string;
    email: string;
    phone?: string | null;
    relation?: string | null;
    gender?: "MALE" | "FEMALE";
    attending: boolean;
  };
  
  export default function RSVPNotify({
    name, email, phone, relation, gender, attending,
  }: Props) {
    return (
      <Html>
        <Head />
        <Preview>New RSVP — {name}</Preview>
        <Body style={styles.body}>
          <Container style={styles.card}>
            <Section>
              <Heading style={styles.h1}>New RSVP</Heading>
              <Text style={styles.tagline}>Subomi’s 21st — Admin Notification</Text>
            </Section>
            <Hr style={styles.hr} />
            <Section>
              <Text style={styles.p}><strong>Name:</strong> {name}</Text>
              <Text style={styles.p}><strong>Email:</strong> {email}</Text>
              {phone ? <Text style={styles.p}><strong>Phone:</strong> {phone}</Text> : null}
              {relation ? <Text style={styles.p}><strong>Relation:</strong> {relation}</Text> : null}
              {gender ? <Text style={styles.p}><strong>Gender:</strong> {gender}</Text> : null}
              <Text style={styles.p}><strong>Attending:</strong> {attending ? "Yes" : "No"}</Text>
            </Section>
            <Hr style={styles.hr} />
            <Section>
              <Text style={styles.foot}>
                View all RSVPs: {`/admin`} (passcode required)
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
      background: "#0e182b",
      color: "#F5F7F8",
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
    },
    card: {
      maxWidth: 560,
      margin: "24px auto",
      background: "#1a325b",
      borderRadius: 16,
      padding: "24px 24px 20px",
      border: "1px solid rgba(192,206,216,0.35)",
    },
    h1: { margin: 0, fontSize: 22 },
    tagline: { marginTop: 6, opacity: 0.9 },
    hr: { borderColor: "rgba(192,206,216,0.35)", margin: "16px 0" },
    p: { margin: "6px 0", fontSize: 15, lineHeight: "22px" },
    foot: { fontSize: 13, opacity: 0.9, textAlign: "center" },
  };
  