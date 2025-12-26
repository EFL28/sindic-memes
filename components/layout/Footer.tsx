export const Footer = () => {
  return (
    <footer className="mt-auto pt-6 border-t border-card-border">
      <div className="text-center text-[10px] font-medium text-foreground/40 tracking-wider">
        <p className="mb-1">
          © {new Date().getFullYear()} Made with ❤️ for Sindic
        </p>
      </div>
    </footer>
  );
};
