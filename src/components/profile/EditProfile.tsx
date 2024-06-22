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
import { SubmitHandler, useForm } from "react-hook-form";
import { UserAvatar } from "../MainComponents";
import { useEffect, useRef, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { initAuth } from "@/lib/firebase";
import { retrieveUserByID } from "@/lib/data";
import { Account } from "@/lib/types";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";

export interface AccountWithFile extends Account {
    file?: File;
}

export default function EditProfile() {
    const [user, setUser] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const auth = initAuth();
    const router = useRouter();

    useEffect(() => {
        auth.authStateReady().then(async () => {
            if (auth.currentUser) {
                const userData = await retrieveUserByID(
                    auth.currentUser.uid as string,
                );
                setUser(userData);
            }
        });
    }, [auth]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AccountWithFile>({
        values: {
            username: user?.username as string,
            bio: user?.bio as string,
            displayName: user?.displayName as string,
            email: user?.email as string,
            imgUrl: user?.imgUrl as string,
        },
    });

    const [fileSelected, setFileSelected] = useState<File | undefined>(
        undefined,
    );
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

    const onSubmit: SubmitHandler<AccountWithFile> = async (data) => {
        setLoading(true);
        const formData = new FormData();
        if (fileSelected) {
            formData.append("file", fileSelected);
        }
        formData.append("uid", auth.currentUser?.uid as string);
        formData.append("data", JSON.stringify(data));

        const response = await fetch("/api/editProfile", {
            method: "PATCH",
            body: formData,
        });

        if (response.ok) {
            const data: Account = await response.json();
            if (auth.currentUser) {
                await updateProfile(auth?.currentUser, {
                    displayName: data.displayName,
                    photoURL: data.imgUrl,
                });
            }
        } else {
            console.error("Failed to upload file");
        }

        setLoading(false);
    };

    return (
        <Dialog
            onOpenChange={(props) => {
                if (!props) {
                    setFileSelected(undefined);
                    setPreview(null);
                }
            }}
        >
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
                                className="bg-transparent text-neutral-300 focus:outline-none"
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
                            <button type="button" onClick={uploadFile}>
                                <UserAvatar
                                    src={preview ? preview : user?.imgUrl}
                                    className="size-20"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-1 border-b border-neutral-700 py-4">
                        <label htmlFor="Display Name">Display Name</label>
                        <input
                            type="text"
                            className="bg-transparent text-neutral-300 focus:outline-none"
                            {...register("displayName", {
                                required: "This field is required",
                            })}
                        />
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
                            className="bg-transparent text-neutral-300 focus:outline-none"
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
                            disabled={loading}
                            className={`mt-4 w-full rounded-xl py-4 font-semibold text-black ${loading ? "bg-neutral-700" : "bg-white"}`}
                        >
                            {loading ? "Saving..." : "Done"}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
