import AddBlogData from "../../../../components/addBlogData/AddBlogData";

const page = () => {
  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Add new Blog</h1>
      </header>
      <div className="breadcrumb-placeholder" aria-hidden="true">
        <h5>Home / Dashboard</h5>
      </div>

      <AddBlogData />

      <footer className="admin-footer">
        Designed and Developed by <strong>Ritz Media World</strong>
      </footer>
    </div>
  );
};

export default page;
