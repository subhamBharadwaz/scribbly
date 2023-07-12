import { cn } from "@/lib/utils"

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string | null
  size?: "default" | "sm"
  children?: React.ReactNode
}
export function Header({
  title,
  description,
  size = "default",
  className,
  children,
  ...props
}: HeaderProps) {
  return (
    <div className={cn("space-y-3 px-2", className)} {...props}>
      <div className="grid gap-1">
        <h1
          className={cn(
            "line-clamp-1 text-3xl font-bold tracking-tight",
            size === "default" && "md:text-4xl"
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "line-clamp-2 text-muted-foreground",
              size === "default" && "text-lg"
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  )
}
