import Link from "next/link";
import { useRouter } from "next/router";
export default function SwitchLng() {
  const router = useRouter();
  return (
    <div className="mt-10 grid content-center bg-gray-100">
      <h6 className="text-red-300">Change language</h6>
      <div className="grid grid-cols-2 p-8">
        <Link href={router.asPath} locale="fr">
          fr
        </Link>
        <Link href={router.asPath} locale="en">
          en
        </Link>
      </div>
    </div>
  );
}
