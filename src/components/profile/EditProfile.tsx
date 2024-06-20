"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/lib/redux/hooks";
import { Account } from "@/lib/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserAvatar } from "../MainComponents";
import { useRef, useState } from "react";

export default function EditProfile() {    
    const user = useAppSelector((state) => state.user.user);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Account>({
        values: {
            username: String(user?.username),
            bio: String(user?.bio),
            displayName: String(user?.displayName),
            email: String(user?.email),
            imgUrl: String(user?.imgUrl),
        },
    });
    
    const [fileSelected, setFileSelected] = useState<File>();
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadFile = () => {
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileSelected(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const onSubmit: SubmitHandler<Account> = async (data, e) => {};

    return (
        <Dialog>
            <DialogTrigger className="rounded-lg border border-neutral-700 py-1 font-semibold">
                Edit profile
            </DialogTrigger>
            <DialogContent className="border-neutral-700 bg-neutral-950 text-white">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Edit your profile information
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2"
                >
                    <div className="flex h-full items-center gap-2 border-b border-neutral-700 py-4">
                        <div className="flex w-full flex-col gap-1">
                            <label htmlFor="Username" className="font-bold">
                                Username
                            </label>
                            <input
                                type="text"
                                className="bg-transparent text-neutral-500 focus:outline-none"
                                {...register("username", {
                                    required: "This field is required",
                                })}
                            />
                            {errors.username && (
                                <span className="text-xs text-red-500">
                                    {errors.username.message}
                                </span>
                            )}
                        </div>
                        <div>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={handleUpload}
                                ref={fileInputRef}
                                hidden
                            />
                            <button onClick={uploadFile}>
                                <UserAvatar
                                    src={preview ? preview : user?.imgUrl}
                                    className="size-16 object-contain"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-1 border-b border-neutral-700 py-4">
                        <label htmlFor="Display Name">Display Name</label>
                        {/* <input
                            type="text"
                            className="bg-transparent text-neutral-500 focus:outline-none"
                            {...register("displayName", {
                                required: "This field is required",
                            })}
                        /> */}
                        {errors.displayName && (
                            <span className="text-xs text-red-500">
                                {errors.displayName.message}
                            </span>
                        )}
                    </div>
                    <div className="flex w-full flex-col gap-1 border-b border-neutral-700 py-4">
                        <label htmlFor="Bio">Bio</label>
                        <input
                            type="text"
                            className="bg-transparent text-neutral-500 focus:outline-none"
                            {...register("bio", {
                                required: "This field is required",
                            })}
                        />
                        {errors.bio && (
                            <span className="text-xs text-red-500">
                                {errors.bio.message}
                            </span>
                        )}
                    </div>
                    <DialogFooter>
                        <button
                            type="submit"
                            className="mt-4 w-full rounded-xl bg-white py-4 font-semibold text-black"
                        >
                            Done
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
