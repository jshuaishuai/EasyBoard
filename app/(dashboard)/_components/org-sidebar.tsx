import Link from "next/link";
import Image from "next/image";


const OrgSidebar = () => {
  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={60} height={60} />
      </Link>
    </div>
  );
};

export default OrgSidebar;
