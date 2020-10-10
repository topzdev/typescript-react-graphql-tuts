import { useRouter } from "next/router";
import { useEffect } from "react";
import { Url } from "url";
import { useMeQuery } from "../generated/graphql";
const useCheckLogin = (toPage: string) => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace(toPage + "?next=" + router.pathname);
    }
  }, [router, data, fetching]);
};

export default useCheckLogin;
