import { PublicPage } from "@/components/publicPage/PublicPage";
import { SignInModal } from "@/components/signIn/SignInModal";

export default function PublicPageWithAuth() {
  return (
    <>
      <PublicPage />
      <SignInModal />
    </>
  );
}
