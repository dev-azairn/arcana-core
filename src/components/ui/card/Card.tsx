import { cn } from "@/utils";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Card({
    children,
    className,
}: Props) {
    return (
        <div
            className={cn(
                "rounded-3xl",
                "border border-violet-800",
                "bg-[#151028]",
                "p-6",
                "shadow-xl",
                className
            )}
        >
            {children}
        </div>
    );
}