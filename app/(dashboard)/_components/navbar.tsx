"use client";

import { UserButton } from "@clerk/clerk-react";

const NavBar = () => {
    return (
        <div className="flex items-center  p-5 bg-green-500">
            <div className="hidden lg:flex lg:flex-1 bg-yellow-300">NavBar</div>
            <UserButton />
        </div>
    );
};

export default NavBar;
