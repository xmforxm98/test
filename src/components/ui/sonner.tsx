import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        style: {
          background: 'rgb(15 23 42)',
          border: '1px solid rgb(51 65 85)',
          color: 'rgb(226 232 240)',
        },
        className: 'group toast group-[.toaster]:bg-slate-900 group-[.toaster]:text-slate-100 group-[.toaster]:border-slate-700',
      }}
      {...props}
    />
  );
};

export { Toaster };
