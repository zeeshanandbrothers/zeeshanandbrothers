import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import Project from "@/models/Project";

// Helper to upload buffer to Cloudinary using stream
const uploadToCloudinary = (file, folder) => {
    return new Promise(async (resolve, reject) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    return reject(error);
                }
                resolve(result);
            }
        ).end(buffer);
    });
};

export async function POST(request) {
    try {
        await connectDB();

        const formData = await request.formData();

        const title = formData.get("title");
        const city = formData.get("city");
        const projectType = formData.get("projectType");
        const shortDescription = formData.get("shortDescription");
        const fullDescription = formData.get("fullDescription");

        // System Info
        const inverter = formData.get("inverter");
        const batteries = formData.get("batteries");
        const panels = formData.get("panels");
        const systemType = formData.get("systemType");

        // Images
        const coverImageFile = formData.get("coverImage");
        const galleryImageFiles = formData.getAll("galleryImages");

        if (galleryImageFiles.length > 4) {
            return NextResponse.json({ error: "Maximum 4 gallery images allowed" }, { status: 400 });
        }

        // 1. Upload Cover Image
        let coverImageUrl = "";
        if (coverImageFile && typeof coverImageFile === 'object' && coverImageFile.size > 0) {
            const upload = await uploadToCloudinary(coverImageFile, "projects/covers");
            coverImageUrl = upload.secure_url;
        }

        // 2. Upload Gallery Images
        let galleryImageUrls = [];
        if (galleryImageFiles && galleryImageFiles.length > 0) {
            const validFiles = galleryImageFiles.filter(f => typeof f === 'object' && f.size > 0);
            if (validFiles.length > 0) {
                const uploads = await Promise.all(
                    validFiles.map(file => uploadToCloudinary(file, "projects/gallery"))
                );
                galleryImageUrls = uploads.map(upload => upload.secure_url);
            }
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
        console.error("Create Project Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const projectType = searchParams.get("projectType");

        let query = {};
        // If projectType is provided and not "all", add it to the query
        if (projectType && projectType !== "all") {
            query.projectType = projectType;
        }

        const projects = await Project.find(query).sort({ date: -1 });
        return NextResponse.json(projects);
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
