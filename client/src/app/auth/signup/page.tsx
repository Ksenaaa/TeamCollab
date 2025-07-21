import { PublicPage } from "@/components/publicPage/PublicPage";
import { SignUpModal } from "@/components/signUp/SignUpModal";

export default function PublicPageWithAuth() {
  return (
    <>
      <PublicPage />
      <SignUpModal />
    </>
  );
}
