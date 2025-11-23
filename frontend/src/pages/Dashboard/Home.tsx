import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";


export default function Home() {
  return (
    <>
        <PageMeta
            title="Dashboard | CVinsight"
            description="PLACEHOLDER DESCRIPTION FOR SEO"
        />
        <PageBreadcrumb pageTitle="Home" />
        <h1>Dashbord</h1>
    </>
  );
}
