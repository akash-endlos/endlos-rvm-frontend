import SidebarWithHeader from "@/components/sidebar/Sidebar";
import { store } from "@/redux/store";
import ProtectedRoute from "./AuthenticatedLayout";
import AuthenticatedLayout from "./AuthenticatedLayout";
import { useDispatch } from "react-redux";

function Layout({ children }) {
  const dispatch = useDispatch()
  const token = store.getState().auth.token
  return (
    <>
      <AuthenticatedLayout state={token}>
        <SidebarWithHeader >
          <main>{children}</main>
        </SidebarWithHeader>
      </AuthenticatedLayout>
    </>
  );
}

export default Layout;