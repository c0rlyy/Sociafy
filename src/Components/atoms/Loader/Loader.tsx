type LoaderPropsT = {
  variant: "button" | "modal";
};

export default function Loader({ variant }: LoaderPropsT) {
  const baseLoaderClass =
    "border-2 border-t-transparent border-primary rounded-full animate-spin";

  const variantClasses = {
    button: "w-4 h-4",
    modal: "w-12 h-12",
  };

  const loaderClasses = [baseLoaderClass, variantClasses[variant]].join(" ");

  if (variant === "modal") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className={loaderClasses}></div>
      </div>
    );
  }

  return <div className={loaderClasses}></div>;
}
