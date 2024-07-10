"use client";

import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { AuthLoading, Authenticated, ConvexReactClient } from 'convex/react';

interface ConvexClientProviderProps {
    children: React.ReactNode;
}


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);


const ConvexClientProvider = ({ children }: ConvexClientProviderProps) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
};

export default ConvexClientProvider;
