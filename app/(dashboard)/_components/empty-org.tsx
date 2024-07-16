import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";


const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/elements.svg"
                alt="empty"
                width={200}
                height={200}
            />
            <h2 className="text-zxl font-semibold mt-6">Welcome to EasyBoard</h2>
            <p className="text-muted-foreground mt-2 text-sm">Create an organization to get started</p>

            <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg" >Create an organization</Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                        <CreateOrganization />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default EmptyOrg;
