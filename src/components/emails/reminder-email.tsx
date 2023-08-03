import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface ReminderEmailProps {
  firstName?: string
  fromEmail: string
}

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://scribbly.subhambharadwaz.in"

export default function ReminderEmail({
  firstName = "there",
  fromEmail,
}: ReminderEmailProps) {
  const previewText = `Hi ${firstName}, Don&apos;t Forget to Document Your Thoughts!`

  return (
    <Html>
      <Head>
        <title> Don&apos;t Forget to Document Your Thoughts!</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto bg-zinc-50 font-sans">
          <Container className="mx-auto my-[40px] max-w-2xl rounded p-4">
            <Img
              src="https://scribbly.s3.ap-south-1.amazonaws.com/logo_bqjpan.webp"
              width="70"
              height="50"
              alt="Scribbly"
              className="mx-auto my-0"
            />
            <Text className="-mt-3 text-center text-2xl font-bold text-purple-600">
              Scribbly
            </Text>

            <Section className="mt-4">
              <Heading className="text-center text-2xl font-semibold text-blue-600">
                Don&apos;t Forget to Document Your Thoughts!
              </Heading>
              <Hr className="my-4" />
              <Text className="m-0 text-base">Hi {firstName},</Text>
              <Text className="mt-6 text-base">
                Are you ready for today&apos;s dose of reflection and
                self-discovery? 🌟 It&apos;s time to keep your digital journal
                up to date with Scribbly! 🚀
              </Text>
              <Text className="mt-6 text-base">
                Your journal is your personal sanctuary, a place to explore your
                emotions, victories, and growth. Whether you had an exciting day
                or faced some challenges, taking a few moments to jot it all
                down can be incredibly rewarding. 🌈
              </Text>

              <Heading className="mt-6 text-xl font-semibold text-blue-600">
                Don&apos;t Wait - Start Journaling Now!
              </Heading>
              <Button
                href={`${baseUrl}/journal`}
                className="mt-2 rounded-md bg-blue-700 px-4 py-2 text-base text-blue-100"
              >
                Journal Now
              </Button>
              <Text className="mt-6 text-base">
                Just click the button above, and it will take you directly to
                your journal page, where you can pour your heart out and let
                your thoughts flow freely. 🌌
              </Text>
              <Img
                src="https://scribbly.s3.ap-south-1.amazonaws.com/journal_z0t8j8.webp"
                alt="Illustration of a girl writing in a journal"
                height={424}
                className="mt-10 aspect-video w-full object-cover"
              />
            </Section>

            <Section className="mt-4">
              <Text className="mt-6 text-base">
                Write a few lines, a list of highlights, or anything that comes
                to mind. Every entry counts, no matter how short or elaborate.
                You&apos;re making progress every step of the way! ⏳
              </Text>
              <Img
                src="https://scribbly.s3.ap-south-1.amazonaws.com/support_hrnaao.webp"
                alt="Illustration of a big tree and two people sitting on a bench"
                height={424}
                className="mt-10 aspect-video w-full object-cover"
              />
              <Text className="mt-6 text-base">
                At Scribbly, we&apos;re here to support you on this journey of
                self-discovery. If you need inspiration, check out our
                journaling prompts or reach out to our team for assistance.
                We&apos;re always thrilled to assist you. 🤝
              </Text>

              <Text className="mt-6 text-base">
                Keep shining, keep growing, and keep journaling! 🌟
              </Text>
            </Section>

            <Section className="mt-4">
              <Text className="text-base">Best regards,</Text>
              <Text className="-mt-2 text-base">Subham Bharadwaz</Text>
              <Text className="-mt-2 text-base">Scribbly Team</Text>
            </Section>

            <Section className="mt-4 text-center text-zinc-400">
              <Text className="my-4">
                {"The best way to get started is to get started."} Take a moment
                today, and let your thoughts flow onto the pages of your
                journal. You&apos;ll be amazed at the progress you&apos;ll make!
                🌟
                <Link
                  href={`mailto:${fromEmail}`}
                  className="text-blue-500 underline"
                >
                  {fromEmail}
                </Link>
              </Text>
              <Text className="mb-0 mt-4">
                @ Scribbly {new Date().getFullYear()}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
