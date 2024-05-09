"use client"

import { useEffect } from "react"
import Error from "next/error"
import * as Sentry from "@sentry/nextjs"

export default function GlobalError(props: { error: unknown }) {
  useEffect(() => {
    Sentry.captureException(props.error)
  }, [props.error])

  return (
    <html>
      <body>
        <Error statusCode={500} title="Error" />
      </body>
    </html>
  )
}
