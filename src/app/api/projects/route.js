import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import Project from "@/models/Project";

export async function POST(request) {
    try {
        await connectDB();

        const formData = await request.formData();

        const title = formData.get("title");
        const city = formData.get("city");
        const projectType = formData.get("projectType");
        const shortDescription = formData.get("shortDescription");
        const fullDescription = formData.get("fullDescription");

        // System Info (Handling it as individual fields or a JSON string if sent that way, but assuming form fields for simplicity)
        const inverter = formData.get("inverter");
        const batteries = formData.get("batteries");
        const panels = formData.get("panels");
        const systemType = formData.get("systemType");

        // Images
        const coverImageFile = formData.get("coverImage");
        const galleryImageFiles = formData.getAll("galleryImages");

        // 1. Upload Cover Image
        let coverImageUrl = "";
        if (coverImageFile) {
            const buffer = Buffer.from(await coverImageFile.arrayBuffer());
            const base64 = `data:${coverImageFile.type};base64,${buffer.toString("base64")}`;
            const upload = await cloudinary.uploader.upload(base64, {
                folder: "projects/covers",
            });
            coverImageUrl = upload.secure_url;
        }

        // 2. Upload Gallery Images
        let galleryImageUrls = [];
        if (galleryImageFiles && galleryImageFiles.length > 0) {
            const uploadPromises = galleryImageFiles.map(async (file) => {
                const buffer = Buffer.from(await file.arrayBuffer());
                const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
                return cloudinary.uploader.upload(base64, {
                    folder: "projects/gallery",
                });
            });
            const uploads = await Promise.all(uploadPromises);
            galleryImageUrls = uploads.map(upload => upload.secure_url);
        }

        const newProject = await Project.create({
            title,
            city,
            projectType,
            shortDescription,
            fullDescription,
            systemInfo: {
                inverter,
                batteries,
                panels,
                systemType
            },
            coverImage: coverImageUrl,
            galleryImages: galleryImageUrls,
        });

        return NextResponse.json({ success: true, project: newProject });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectDB();
        const projects = await Project.find().sort({ date: -1 });
        return NextResponse.json(projects);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
