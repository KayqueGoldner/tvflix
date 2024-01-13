import Logo from "./logo";
import MobileSidebar from "./sidebar/sidebar-mobile";
import SearchNav from "./search/search";

const Header = () => {
  return (
    <header className="h-[80px] flex justify-between items-center p-4 bg-outline">
      <Logo />
      <div className="flex items-center gap-x-4">
        <div className="hidden sm:block">
          <SearchNav />
        </div>
        <div className="lg:hidden block">
          <MobileSidebar />
        </div>
      </div>
    </header>
  );
}
 
export default Header;