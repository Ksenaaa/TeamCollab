import { PublicPage } from "@/components/publicPage/PublicPage";
import { SignInModal } from "@/components/signIn/SignInModal";

export default async function Main() {
  return (
    <>
      <PublicPage />
      <SignInModal />
    </>
  );
}
