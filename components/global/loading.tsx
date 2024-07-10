import Image from "next/image";

const Loading = () => {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <Image
                className="animate-pulse duration-700"
                src="/logo.svg"
                alt="logo"
                width={120}
                height={120}
            />
        </div>
    );
};

export default Loading;
