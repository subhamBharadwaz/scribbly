export default function Background() {
  return (
    <div className="pointer-events-none fixed z-[-1] flex min-h-screen w-screen justify-center p-[120px_24px_160px_24px] before:absolute before:top-0 before:z-[2] before:h-full before:w-full before:bg-landing-gradient after:absolute after:top-0 after:z-[-1] after:h-full after:w-full after:bg-[url('../../public/grid.svg')] after:opacity-[.2] after:invert-[1]">
      <div className="absolute top-[80px] z-[3]  h-full w-full max-w-2xl bg-landing-gradient-2 opacity-[0.15] blur-[100px] saturate-[150%]" />
    </div>
  )
}
