const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm">
        <p className="font-semibold text-white mb-1">ShopEasy</p>
        <p>Shop Smart, Shop Easy </p>
        <p className="mt-3 text-gray-500">&copy; {new Date().getFullYear()} ShopEasy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
