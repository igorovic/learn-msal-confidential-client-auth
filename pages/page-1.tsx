import Link from "next/link";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

export default function Page1() {
  const { t } = useTranslation("common");
  return (
    <div className="container p-5">
      <Link href="/">
        <span className="font-bold text-blue-500 cursor-pointer">
          Return Home
        </span>
      </Link>
      <h2>{t("this is first page")}</h2>
    </div>
  );
}

export async function getStaticProps({
  locale,
}: GetStaticPropsContext<ParsedUrlQuery>) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", ["common", "footer"])),
      // Will be passed to the page component as props
    },
  };
}
