import { editProfile } from "@/lib/actions";

export async function PATCH(req: Request) {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const uid = formData.get('uid') as string;
    const data = JSON.parse(formData.get('data') as string);

    const newData = await editProfile(uid, data, file)
    
    return Response.json(newData)
}