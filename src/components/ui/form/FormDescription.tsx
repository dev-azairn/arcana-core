export default function FormDescription({
    children,
}: React.PropsWithChildren) {
    return (
        <p className="text-sm text-slate-400">
            {children}
        </p>
    );
}