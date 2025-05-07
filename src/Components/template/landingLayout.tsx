export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen w-full grid-cols-[3fr_1fr] items-center justify-center border">
      {children}
    </div>
  );
}
