const Footer = () => {
  return (
    <footer className="flex items-center justify-center border-t px-6 py-3 md:mx-20 lg:mx-32">
      <div className="flex items-center gap-2">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Movies App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
