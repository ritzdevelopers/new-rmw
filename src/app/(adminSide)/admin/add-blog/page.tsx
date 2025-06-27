import Breadcrumb from "@/components/ui/Breadcrumb";
import AddBlogData from "../../../../components/addBlogData/AddBlogData";

const page = () => {
  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Add new Blog</h1>
      </header>

      <Breadcrumb currentPage="Add-Blog" />

      <AddBlogData />

      <footer className="admin-footer">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default page;
