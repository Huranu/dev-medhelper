"use client";
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const CloseDialog = ({ className }: { className?: string }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className={cn("border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg", className)}
                >
                    <span className="relative z-10">Гарах</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900">Гарах</DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Таны энэхүү шинжилгээний үр дүн хадгалагдахгүй гэдгийг анхаарна уу! Та итгэлтэй байна уу?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        Үгүй
                    </Button>
                    <Button
                        onClick={() => router.push("/")}
                        className="bg-gradient-to-r from-[#39ae9f] to-[#2c8c80] text-white hover:scale-105 transition-all duration-300 rounded-lg"
                    >
                        Тийм
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CloseDialog;