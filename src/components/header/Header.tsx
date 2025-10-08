import { fetchHeaderData } from "@/app/_global/masterFunction";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const headerData = await fetchHeaderData();
  
  return <HeaderClient headerData = {headerData}/>;
};

export default Header;
