const Header = () => {
  return (
    <header className="bg-white p-4">
      <nav className="flex justify-between items-center">
        <div className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-yellow-500 text-2xl font-bold">
          <span>StaffBridge</span>
        </div>
        {/* Puedes agregar más elementos aquí, como botones o enlaces de navegación */}
      </nav>
    </header>
  );
};

export default Header;
