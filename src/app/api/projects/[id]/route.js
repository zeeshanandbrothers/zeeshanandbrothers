import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";

import cloudinary from "@/lib/cloudinary";

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const project = await Project.findById(id);
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const formData = await request.formData();

        const title = formData.get("title");
        const city = formData.get("city");
        const projectType = formData.get("projectType");
        const shortDescription = formData.get("shortDescription");
        const fullDescription = formData.get("fullDescription");

        const inverter = formData.get("inverter");
        const batteries = formData.get("batteries");
        const panels = formData.get("panels");
        const systemType = formData.get("systemType");

        // Images
        const coverImageFile = formData.get("coverImage");
        const galleryImageFiles = formData.getAll("galleryImages"); // New files
        const existingGalleryImages = formData.getAll("existingGalleryImages"); // Existing URLs kept

        // 1. Upload Cover Image if provided
        let coverImageUrl = formData.get("existingCoverImage"); // Default to existing
        if (coverImageFile && typeof coverImageFile === 'object') {
            const buffer = Buffer.from(await coverImageFile.arrayBuffer());
            const base64 = `data:${coverImageFile.type};base64,${buffer.toString("base64")}`;
            const upload = await cloudinary.uploader.upload(base64, {
                folder: "projects/covers",
            });
            coverImageUrl = upload.secure_url;
        }

        // 2. Upload New Gallery Images
        let newGalleryImageUrls = [];
        if (galleryImageFiles && galleryImageFiles.length > 0) {
            const validFiles = galleryImageFiles.filter(f => typeof f === 'object' && f.size > 0);
            if (validFiles.length > 0) {
                const uploadPromises = validFiles.map(async (file) => {
                    const buffer = Buffer.from(await file.arrayBuffer());
                    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;
                    return cloudinary.uploader.upload(base64, {
                        folder: "projects/gallery",
                    });
                });
                const uploads = await Promise.all(uploadPromises);
                newGalleryImageUrls = uploads.map(upload => upload.secure_url);
            }
        }

        // Combine existing (that were not removed) and new images
        // Note: The frontend should send 'existingGalleryImages' for *every* image that is kept.
        const updatedGallery = [...(existingGalleryImages || []), ...newGalleryImageUrls];

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            {
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
                galleryImages: updatedGallery,
            },
            { new: true }
        );

        return NextResponse.json({ success: true, project: updatedProject });

    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const project = await Project.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
