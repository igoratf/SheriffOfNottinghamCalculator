export const PageHeader = ({
  title,
  className,
  size = "lg",
}: {
  title: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  console.log("sm", size);
  return (
    <h1
      className={`${className} ${size === "sm" ? "text-xl" : size === "md" ? "text-2xl" : "text-3xl"} font-bold bg-linear-to-tl from-slate-900 to-blue-700 bg-clip-text text-transparent`}
    >
      {title}
    </h1>
  );
};
