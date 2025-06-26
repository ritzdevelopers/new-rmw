"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import {
  Home,
  FileText,
  ChevronDown,
  Menu,
  User,
  Monitor,
  House,
  MonitorCog,
} from "lucide-react";
import { cn } from "../../lib/utils";
import axios from "axios";
import Link from "next/link";
import LogoutButton from "../logout/Logout";
import Image from "next/image";
import "./Sidenav.css";
import { useRouter } from "next/navigation";
type ProfileType = {
  email: string;
  name: string;
  createdAt: string;
  profileImage: string;
};
type sidebarProps = {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
};
const Sidebar = ({ expanded, setExpanded }: sidebarProps) => {
  const pathname = usePathname(); // Get current URL path
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [blogOpen, setBlogOpen] = useState(false);
  const [expanded, setExpanded] = useState(false); // Sidebar toggle state
  const [webpagesLinks, setWebPagesLink] = useState(false);
  const [homePagesLinks, setHomePagesLinks] = useState(false);
  const [systemSettings, setSystemSettings] = useState(false);

  const [dbActive, setDBActive] = useState(false);
  const [blogActive, setBlogActive] = useState(false);
  const [webPageActive, setWebPageActive] = useState(false);
  const [homePageActive, setHomePageActive] = useState(false);
  const [systemPageActive, setSystemPageActive] = useState(false);
  const [createUserPageActive, setCreateUserPageActive] = useState(false);

  const [subMenuActive, setActiveSubMenu] = useState("");
  function handleActiveTabBG(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const span = e.currentTarget.querySelector("span");
    const blogText = span?.innerText || "No span found";

    if (blogText === "Create user") {
      setBlogActive(false);
      setDBActive(false);
      setWebPageActive(false);
      setHomePageActive(false);
      setSystemPageActive(false);
      setActiveSubMenu("");
       setCreateUserPageActive(true);
    } else if (blogText === "System Settings") {
      setBlogActive(false);
      setDBActive(false);
      setWebPageActive(false);
      setHomePageActive(false);
      setSystemPageActive(true);
      setActiveSubMenu("");
       setCreateUserPageActive(false);
    } else if (blogText === "Home") {
      setBlogActive(false);
      setDBActive(false);
      setWebPageActive(false);
      setHomePageActive(true);
      setSystemPageActive(false);
      setActiveSubMenu("");
       setCreateUserPageActive(false);
    } else if (blogText === "Web Pages") {
      setBlogActive(false);
      setDBActive(false);
      setWebPageActive(true);
      setHomePageActive(false);
      setSystemPageActive(false);
      setActiveSubMenu("");
       setCreateUserPageActive(false);
    } else if (blogText === "Blog") {
      setBlogActive(true);
      setDBActive(false);
      setWebPageActive(false);
      setHomePageActive(false);
      setSystemPageActive(false);
      setActiveSubMenu("");
       setCreateUserPageActive(false);
    } else if (blogText === "Dashboard") {
      setBlogActive(false);
      setDBActive(true);
      setWebPageActive(false);
      setHomePageActive(false);
      setSystemPageActive(false);
      setActiveSubMenu("");
       setCreateUserPageActive(false);
    }
  }

  useEffect(() => {
    axios
      .get("/api/profile")
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Error fetching profile data", error))
      .finally(() => setLoading(false));
  }, []);

  const router = useRouter();

  const handleClick = () => {
    router.push(`/admin/dashboard?isExtended=${expanded}`);
  };

  // 🔴 Hide sidebar for /admin/sign-in
  if (pathname === "/admin/sign-in") return null;

  return (
    <div className="flex">
      {/* Sidebar Toggle Button */}
      <div className="border-b cursor-pointer w-full border[#5D6871]">
        <button
          onClick={() => setExpanded(!expanded)}
          className="fixed top-1.5 pl-3 cursor-pointer dark:bg-gray-800  z-50"
        >
          <Menu className="w-6 h-6 cursor-pointer text-white dark:text-white" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "h-screen text-white shadow-lg pt-10 flex flex-col fixed  top-0 left-0 transition-all duration-300 bg-[#394A59]",
          expanded ? "w-56" : "w-16"
        )}
      >
        {/* Profile card */}
        {/* <div className="flex items-center relative top-6 gap-3 p-3 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer transition rounded-md">
          {loading ? (
            <p>...</p>
          ) : (
            <Image
              src={profile?.profileImage || "/profile-images/img-2.webp"}
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          {expanded && (
            <div className="flex flex-col">
              <span>{profile?.name}</span>
              <span>{profile?.email}</span>
            </div>
          )}
        </div> */}

        {/* Menu Items */}
        <nav className="flex flex-col mt-4 overflow-y-auto hide-scrollbar">
          <Link onClick={handleClick} href="/admin/dashboard">
            <div
              onClick={(e) => handleActiveTabBG(e)}
              style={{
                ...(!expanded
                  ? { borderWidth: "none" }
                  : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
                ...(dbActive && { backgroundColor: "#2E3B46" }),
              }}
              className="flex items-center gap-3 p-3 hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer transition"
            >
              <Home className="w-5 h-5" />
              {expanded && <span>Dashboard</span>}
            </div>
          </Link>

          {/* Blog with submenu */}
          <div
            style={{
              ...(!expanded
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...(blogActive && { backgroundColor: "#2E3B46" }),
            }}
            onClick={(e) => {
              setBlogOpen(!blogOpen), handleActiveTabBG(e);
            }}
            className="flex items-center gap-3 p-3 hover:bg-[#2E3B46] cursor-pointer transition justify-between"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              {expanded && <span>Blog</span>}
            </div>
            {expanded && (
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition",
                  blogOpen ? "rotate-180" : ""
                )}
                className={cn(
                  "w-4 h-4 transition",
                  blogOpen ? "rotate-180" : ""
                )}
              />
            )}
          </div>

          {/* Blog Submenu */}
          {expanded && blogOpen && (
            <div className="space-y-2">
              <Link href="/admin/add-blog">
                <div
                    onClick={()=>setActiveSubMenu("Add Blog")}
                 style={{
              ...(!blogOpen
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Add Blog") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer text-sm  pl-8 text-gray-200"
                >
                  Add Blog
                </div>
              </Link>
              <Link href="/admin/manage-blogs">
                <div
                    onClick={()=>setActiveSubMenu("Manage Blogs")}
                 style={{
              ...(!blogOpen
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Manage Blogs") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Manage Blogs
                </div>
              </Link>
            </div>
          )}

          {/* Websites Pages Links */}
          <div
            style={{
              ...(!expanded
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...(webPageActive && { backgroundColor: "#2E3B46" }),
            }}
            onClick={(e) => {
              setWebPagesLink(!webpagesLinks), handleActiveTabBG(e);
            }}
            className="flex items-center gap-3 p-3 hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer transition justify-between"
          >
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5" />
              {expanded && <span>Web Pages</span>}
            </div>
            {expanded && (
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition",
                  webpagesLinks ? "rotate-180" : ""
                )}
              />
            )}
          </div>

          {/* Website Pages Submenu */}

          {expanded && webpagesLinks && (
            <div className=" space-y-2">
              <Link href="/admin/content">
                <div
                    onClick={()=>setActiveSubMenu("Manage Page")}
                 style={{
              ...(!webpagesLinks
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Manage Page") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Manage Page
                </div>
              </Link>
              <Link href="/admin/menu">
                <div
                    onClick={()=>setActiveSubMenu("Manage Menu")}
                 style={{
              ...(!webpagesLinks
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Manage Menu") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Manage Menu
                </div>
              </Link>

              <Link href="/admin/menu_category">
                <div
                    onClick={()=>setActiveSubMenu("Manage Menu Category")}
                 style={{
              ...(!webpagesLinks
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Manage Menu Category") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Manage Menu Category
                </div>
              </Link>
            </div>
          )}

          {/* From Here New Home Pages Links Section Has Started */}
          <div
            style={{
              ...(!expanded
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...(homePageActive && { backgroundColor: "#2E3B46" }),
            }}
            onClick={(e) => {
              setHomePagesLinks(!homePagesLinks), handleActiveTabBG(e);
            }}
            className="flex items-center gap-3 p-3 hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer transition justify-between"
          >
            <div className="flex items-center gap-3">
              <House className="w-5 h-5" />
              {expanded && <span>Home</span>}
            </div>
            {expanded && (
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition",
                  homePagesLinks ? "rotate-180" : ""
                )}
              />
            )}
          </div>

          {/* Home Pages Sub-Menu */}

          {expanded && homePagesLinks && (
            <div
            
            className=" space-y-2">
              <Link href="/admin/why_choose_us">
                <div
                  onClick={()=>setActiveSubMenu("Why Choose Us")}
                 style={{
              ...(!homePagesLinks
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Why Choose Us") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Why Choose Us
                </div>
              </Link>
              <Link href="/admin/why_ritz_best">
                <div
                  onClick={()=>setActiveSubMenu("Why Ritz Best")}
                 style={{
              ...(!homePagesLinks
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Why Ritz Best") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Why Ritz Best
                </div>
              </Link>

              <Link href="/admin/our_vision">
                <div
                    onClick={()=>setActiveSubMenu("Our Vision")}
                 style={{
              ...(!homePagesLinks
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Our Vision") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Our Vision
                </div>
              </Link>

              <Link href="/admin/how_we_work">
                <div
                    onClick={()=>setActiveSubMenu("How We Work")}
                 style={{
              ...(!homePagesLinks
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "How We Work") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  How We Work
                </div>
              </Link>
              <Link href="/admin/services">
                <div
                    onClick={()=>setActiveSubMenu("Manage Services")}
                 style={{
              ...(!homePagesLinks
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Manage Services") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Manage Services
                </div>
              </Link>

              <Link href="/admin/home/customers">
                <div
                    onClick={()=>setActiveSubMenu("Manage Customers")}
                 style={{
              ...(!homePagesLinks
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Manage Customers") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Manage Customers
                </div>
              </Link>

              <Link href="/admin/home/testimonials">
                <div
                    onClick={()=>setActiveSubMenu("Manage Testimonial")}
                 style={{
              ...(!homePagesLinks
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Manage Testimonial") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Manage Testimonial
                </div>
              </Link>

              <Link href="/admin/home/networthy_assets">
                <div
                    onClick={()=>setActiveSubMenu("Networthy Assets")}
                 style={{
              ...(!homePagesLinks
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Networthy Assets") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Networthy Assets
                </div>
              </Link>
              <Link href="/admin/home/kaam_hai_mera">
                <div
                    onClick={()=>setActiveSubMenu("Kaam Hai Mera")}
                 style={{
              ...(!homePagesLinks
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Kaam Hai Mera") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Kaam Hai Mera
                </div>
              </Link>

              <Link href="/admin/update_titles">
                <div
                    onClick={()=>setActiveSubMenu("Update Title Descriptions")}
                 style={{
              ...(!homePagesLinks
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Update Title Descriptions") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Update Title Descriptions
                </div>
              </Link>
            </div>
          )}

          {/* From Here System Settings Links Section Has Started */}
          <div
            style={{
              ...(!expanded
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...(systemPageActive && { backgroundColor: "#2E3B46" }),
            }}
            onClick={(e) => {
              setSystemSettings(!systemSettings), handleActiveTabBG(e);
            }}
            className="flex items-center gap-3 p-3 hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer transition justify-between"
          >
            <div className="flex items-center gap-3">
              <MonitorCog className="w-5 h-5" />
              {expanded && <span>System Settings</span>}
            </div>
            {expanded && (
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition",
                  systemSettings ? "rotate-180" : ""
                )}
              />
            )}
          </div>

          {/* System Settings Sub-Menu */}

          {expanded && systemSettings && (
            <div className=" space-y-2">
              <Link href="/admin/listing/newsletter">
                <div
                onClick={()=>setActiveSubMenu("Manage Newsletter")}
                 style={{
              ...(!systemSettings
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Manage Newsletter") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Manage Newsletter
                </div>
              </Link>
              <Link href="/admin/mediabanner">
                <div
                   onClick={()=>setActiveSubMenu("Manage Home Slider")}
                 style={{
              ...(!systemSettings
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Manage Home Slider") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Manage Home Slider
                </div>
              </Link>

              <Link href="/admin/howitworks">
                <div
                   onClick={()=>setActiveSubMenu("Manage FAQs")}
                 style={{
              ...(!systemSettings
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Manage FAQs") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Manage FAQs
                </div>
              </Link>

              <Link href="/admin/enqury">
                <div
                   onClick={()=>setActiveSubMenu("Contact Enquiry")}
                 style={{
              ...(!systemSettings
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Contact Enquiry") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Contact Enquiry
                </div>
              </Link>
              <Link href="/admin/enquiry/enquiries">
                <div
                   onClick={()=>setActiveSubMenu("Enquiries")}
                 style={{
              ...(!systemSettings
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Enquiries") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Enquiries
                </div>
              </Link>

              <Link href="/admin/enquiry/career">
                <div
                   onClick={()=>setActiveSubMenu("Manage Career")}
                 style={{
              ...(!systemSettings
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Manage Career") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Manage Career
                </div>
              </Link>

              <Link href="/admin/ourteam">
                <div
                   onClick={()=>setActiveSubMenu("Manage Our Team")}
                 style={{
              ...(!systemSettings
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Manage Our Team") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Manage Our Team
                </div>
              </Link>

              <Link href="/admin/system-setting">
                <div
                   onClick={()=>setActiveSubMenu("Global Setting")}
                 style={{
              ...(!systemSettings
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Global Setting") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Global Setting
                </div>
              </Link>
              <Link href="/admin/web-story">
                <div
                   onClick={()=>setActiveSubMenu("Manage Web Story")}
                 style={{
              ...(!systemSettings
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...((subMenuActive === "Manage Web Story") && { backgroundColor: "#2E3B46" }),
            }}
                  className="p-2 pl-8 text-sm text-gray-200  hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer"
                >
                  Manage Web Story
                </div>
              </Link>
            </div>
          )}

          <Link
            style={{
              ...(!expanded
                ? { borderWidth: "none" }
                : { borderBottomWidth: "1px", borderBlockColor: "#EEEEEE" }),
              ...(createUserPageActive && { backgroundColor: "#2E3B46" }),
            }}
            href="/admin/register"
          >
            <div
              onClick={(e) => handleActiveTabBG(e)}
              className="flex items-center gap-3 p-3 hover:bg-[#2E3B46] dark:hover:bg-gray-700 cursor-pointer transition"
            >
              <User className="w-5 h-5" />
              {expanded && <span>Create user</span>}
            </div>
          </Link>
        </nav>

        {/* Logout */}
        <div className="mt-auto p-3">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;